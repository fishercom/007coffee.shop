using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Infrastructure.Data;
using Application.Interfaces;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;

// Load environment variables from .env file (if it exists)
// This must be done before creating the builder so that environment variables
// are available when the configuration system reads appsettings.json
var envPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", ".env");
if (File.Exists(envPath))
{
    DotNetEnv.Env.Load(envPath);
    Console.WriteLine($"Loaded environment variables from: {envPath}");
}
else
{
    Console.WriteLine($".env file not found at: {envPath}. Using system environment variables only.");
}

var builder = WebApplication.CreateBuilder(args);

// Manually map environment variables to configuration sections
// ASP.NET Core's configuration system requires specific naming conventions
// We'll override the configuration values with environment variables
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SMTP_HOST")))
{
    builder.Configuration["SmtpSettings:Host"] = Environment.GetEnvironmentVariable("SMTP_HOST");
}
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SMTP_PORT")))
{
    builder.Configuration["SmtpSettings:Port"] = Environment.GetEnvironmentVariable("SMTP_PORT");
}
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SMTP_USERNAME")))
{
    builder.Configuration["SmtpSettings:Username"] = Environment.GetEnvironmentVariable("SMTP_USERNAME");
}
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SMTP_PASSWORD")))
{
    builder.Configuration["SmtpSettings:Password"] = Environment.GetEnvironmentVariable("SMTP_PASSWORD");
}
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("SMTP_FROM_EMAIL")))
{
    builder.Configuration["SmtpSettings:FromEmail"] = Environment.GetEnvironmentVariable("SMTP_FROM_EMAIL");
}

if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY")))
{
    builder.Configuration["Stripe:SecretKey"] = Environment.GetEnvironmentVariable("STRIPE_SECRET_KEY");
}
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("STRIPE_PUBLISHABLE_KEY")))
{
    builder.Configuration["Stripe:PublishableKey"] = Environment.GetEnvironmentVariable("STRIPE_PUBLISHABLE_KEY");
}

if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("JWT_KEY")))
{
    builder.Configuration["Jwt:Key"] = Environment.GetEnvironmentVariable("JWT_KEY");
}
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("JWT_ISSUER")))
{
    builder.Configuration["Jwt:Issuer"] = Environment.GetEnvironmentVariable("JWT_ISSUER");
}
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("JWT_AUDIENCE")))
{
    builder.Configuration["Jwt:Audience"] = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
}

// Check for DATABASE_URL environment variable (Render)
var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
string connectionString;

if (!string.IsNullOrEmpty(databaseUrl))
{
    try 
    {
        var uri = new Uri(databaseUrl);
        var db = uri.AbsolutePath.Trim('/');
        var userInfo = uri.UserInfo.Split(':');
        var user = userInfo[0];
        var passwd = userInfo.Length > 1 ? userInfo[1] : "";
        var port = uri.Port > 0 ? uri.Port : 5432;
        // Only require SSL for production (non-localhost) connections
        var sslMode = uri.Host == "localhost" || uri.Host == "127.0.0.1" ? "Prefer" : "Require";
        connectionString = $"Host={uri.Host};Port={port};Database={db};Username={user};Password={passwd};Pooling=true;SSL Mode={sslMode};Trust Server Certificate=true;";
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error parsing DATABASE_URL: {ex.Message}");
        throw;
    }
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<AppDbContext>());
builder.Services.AddTransient<Infrastructure.Services.EmailService>();
builder.Services.AddTransient<IEmailService, Infrastructure.Services.EmailService>();

builder.Services.AddIdentity<Domain.Entities.ApplicationUser, Microsoft.AspNetCore.Identity.IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "https://007coffee.shop",
                "https://www.007coffee.shop",
                "https://coffee-shop-frontend-iazx.onrender.com"
              )
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key configuration is missing")))
    };
});

builder.Services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(Application.Products.Commands.CreateProductCommand).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(Application.Orders.Commands.CreateOrderCommand).Assembly);
    cfg.RegisterServicesFromAssembly(typeof(Application.Users.Commands.UpdateUserRolesCommand).Assembly);
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Automatic migrations and seeding
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<AppDbContext>();
    
    try 
    {
        var databaseCreator = dbContext.Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
        
            // Check if the critical 'Categories' table exists and 'Orders' has 'ShippingAddress'
            var schemaValid = false;
            try 
            {
                using (var command = dbContext.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = "SELECT \"ShippingAddress\" FROM \"Orders\" LIMIT 1";
                    dbContext.Database.OpenConnection();
                    using (var result = command.ExecuteReader())
                    {
                        schemaValid = true;
                    }
                }
            }
            catch 
            {
                schemaValid = false;
            }
            finally
            {
                dbContext.Database.CloseConnection();
            }

            if (!schemaValid)
            {
                Console.WriteLine("Database schema out of date (missing ShippingAddress). Performing clean slate initialization...");
                // WARNING: This deletes the database! Only for demo/dev environments.
                dbContext.Database.EnsureDeleted();
                dbContext.Database.EnsureCreated();
                Console.WriteLine("Database recreated successfully.");
            }
        else
        {
            Console.WriteLine("Database schema appears correct.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error initializing database: {ex.Message}");
        throw;
    }
    
    DbSeeder.Seed(dbContext);       // Seed products

    var userManager = services.GetRequiredService<UserManager<Domain.Entities.ApplicationUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    await DataSeeder.SeedAsync(userManager, roleManager); // Seed users and roles
}

app.Run();

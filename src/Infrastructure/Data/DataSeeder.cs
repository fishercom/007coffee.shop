using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(UserManager<Domain.Entities.ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            // Seed Roles
            string[] roleNames = { "Admin", "Member" };
            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }

            // Seed Admin User
            var admin = await userManager.FindByNameAsync("admin@example.com");
            if(admin == null)
            {
                var user = new Domain.Entities.ApplicationUser { UserName = "admin@example.com", Email = "admin@example.com", EmailConfirmed = true, FirstName = "Admin", LastName = "User" };
                await userManager.CreateAsync(user, "Admin@123");
                await userManager.AddToRoleAsync(user, "Admin");
            }

            // Seed Member User
            var member = await userManager.FindByNameAsync("member@example.com");
            if(member == null)
            {
                var user = new Domain.Entities.ApplicationUser { UserName = "member@example.com", Email = "member@example.com", EmailConfirmed = true, FirstName = "Member", LastName = "User" };
                await userManager.CreateAsync(user, "Member@123");
                await userManager.AddToRoleAsync(user, "Member");
            }
        }
    }
}

using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(UserManager<Domain.Entities.ApplicationUser> userManager)
        {
            var admin = await userManager.FindByNameAsync("admin@example.com");
            if(admin == null)
            {
                var user = new Domain.Entities.ApplicationUser { UserName = "admin@example.com", Email = "admin@example.com", EmailConfirmed = true, FirstName = "Admin", LastName = "User" };
                await userManager.CreateAsync(user, "Admin@123");
            }
        }
    }
}

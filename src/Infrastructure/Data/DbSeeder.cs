using Domain.Entities;
using System.Linq;

namespace Infrastructure.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext db)
        {
            if (!db.Products.Any())
            {
                db.Products.AddRange(
                    new Product { Name = "Product A", Description = "Description A", Price = 10 },
                    new Product { Name = "Product B", Description = "Description B", Price = 15.5M },
                    new Product { Name = "Product C", Description = "Description C", Price = 20 }
                );
                db.SaveChanges();
            }
        }
    }
}

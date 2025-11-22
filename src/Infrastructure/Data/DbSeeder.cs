using Domain.Entities;
using System.Linq;
using System.Collections.Generic;

namespace Infrastructure.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext db)
        {
            if (!db.Categories.Any())
            {
                var coffeeCategory = new Category { Name = "Coffee Beans", Description = "Premium coffee beans from around the world", ImageUrl = "https://picsum.photos/seed/coffee/800/600" };
                var equipmentCategory = new Category { Name = "Equipment", Description = "Coffee brewing equipment", ImageUrl = "https://picsum.photos/seed/equipment/800/600" };
                
                db.Categories.AddRange(coffeeCategory, equipmentCategory);
                db.SaveChanges(); // Save categories first to get their IDs
            }

            if (!db.Products.Any())
            {
                // Retrieve categories to assign to products
                var coffeeCategory = db.Categories.FirstOrDefault(c => c.Name == "Coffee Beans");
                var equipmentCategory = db.Categories.FirstOrDefault(c => c.Name == "Equipment");

                db.Products.AddRange(
                    new Product { Name = "Product A", Description = "Description A", Price = 10, Stock = 100, CategoryId = coffeeCategory?.Id ?? 1, ImageUrl = "https://images.pexels.com/photos/34092/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    new Product { Name = "Product B", Description = "Description B", Price = 15.5M, Stock = 50, CategoryId = coffeeCategory?.Id ?? 1, ImageUrl = "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                    new Product { Name = "Product C", Description = "Description C", Price = 20, Stock = 75, CategoryId = equipmentCategory?.Id ?? 2, ImageUrl = "https://images.pexels.com/photos/2558667/pexels-photo-2558667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
                );
                db.SaveChanges();
            }
        }
    }
}

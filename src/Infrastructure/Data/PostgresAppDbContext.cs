using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class PostgresAppDbContext : AppDbContext
    {
        public PostgresAppDbContext(DbContextOptions<PostgresAppDbContext> options) : base(options) { }
    }
}

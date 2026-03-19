using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SqliteAppDbContext : AppDbContext
    {
        public SqliteAppDbContext(DbContextOptions<SqliteAppDbContext> options) : base(options) { }
    }
}

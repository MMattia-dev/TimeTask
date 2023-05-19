using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TimeTask.Models;

namespace TimeTask.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<TimeTask.Models.TImeTask> TImeTask { get; set; } = default!;
        public DbSet<TimeTask.Models.Department> Department { get; set; } = default!;
        public DbSet<TimeTask.Models.Workers> Workers { get; set; } = default!;
    }
}
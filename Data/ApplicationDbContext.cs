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
        public DbSet<TimeTask.Models.Workers2> Workers2 { get; set; } = default!;
        public DbSet<TimeTask.Models.Time> Time { get; set; } = default!;
        public DbSet<TimeTask.Models.Leave> Leave { get; set; } = default!;
        public DbSet<TimeTask.Models.Opening> Opening { get; set; } = default!;
        public DbSet<TimeTask.Models.Period> Period { get; set; } = default!;
        public DbSet<TimeTask.Models.Holiday> Holiday { get; set; } = default!;
        public DbSet<TimeTask.Models.TaskName> TaskName { get; set; } = default!;
        public DbSet<TimeTask.Models.TaskName2> TaskName2 { get; set; } = default!;
        public DbSet<TimeTask.Models.Task> Task { get; set; } = default!;
        public DbSet<TimeTask.Models.Leave2> Leave2 { get; set; } = default!;
        public DbSet<TimeTask.Models.Leave3> Leave3 { get; set; } = default!;
        public DbSet<TimeTask.Models.Leave4> Leave4 { get; set; } = default!;
        public DbSet<TimeTask.Models.Hours> Hours { get; set; } = default!;
    }
}
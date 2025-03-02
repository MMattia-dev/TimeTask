﻿using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
        public DbSet<TimeTask.Models.Wallpaper> Wallpaper { get; set; } = default!;
        public DbSet<TimeTask.Models.Wallpaper2> Wallpaper2 { get; set; } = default!;
        public DbSet<TimeTask.Models.MainSettings> MainSettings { get; set; } = default!;
        public DbSet<TimeTask.Models.Reminders> Reminders { get; set; } = default!;
        public DbSet<TimeTask.Models.Reminders2> Reminders2 { get; set; } = default!;
        public DbSet<TimeTask.Models.Reminders3> Reminders3 { get; set; } = default!;
        public DbSet<TimeTask.Models.Reports> Reports { get; set; } = default!;
        public DbSet<TimeTask.Models.TimeSettings> TimeSettings { get; set; } = default!;
        public DbSet<TimeTask.Models.TimeSettings2> TimeSettings2 { get; set; } = default!;
        public DbSet<TimeTask.Models.Statistics> Statistics { get; set; } = default!;
        public DbSet<TimeTask.Models.Opening2> Opening2 { get; set; } = default!;
        public DbSet<TimeTask.Models.MainSettings2> MainSettings2 { get; set; } = default!;
        public DbSet<TimeTask.Models.TimeSettings3> TimeSettings3 { get; set; } = default!;
        public DbSet<TimeTask.Models.Task2> Task2 { get; set; } = default!;
        public DbSet<TimeTask.Models.TasksSettings> TasksSettings { get; set; } = default!;
        public DbSet<TimeTask.Models.PrivateScheduleList> PrivateScheduleList { get; set; } = default!;
        public DbSet<TimeTask.Models.DayTasksLimitExceptionForDepartments> DayTasksLimitExceptionForDepartments { get; set; } = default!;
        public DbSet<TimeTask.Models.AllowedToEditSchedule> AllowedToEditSchedule { get; set; } = default!;
        public DbSet<TimeTask.Models.UserIdentity> UserIdentity { get; set; } = default!;
        public DbSet<TimeTask.Models.Chat> Chat { get; set; } = default!;
        public DbSet<TimeTask.Models.ChatSettings> ChatSettings { get; set; } = default!;
        public DbSet<TimeTask.Models.Workstations> Workstations { get; set; } = default!;
        public DbSet<TimeTask.Models.Shifts> Shifts { get; set; } = default!;
    }
}
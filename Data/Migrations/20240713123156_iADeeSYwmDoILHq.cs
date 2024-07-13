using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class iADeeSYwmDoILHq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropColumn(
            //    name: "TaskNameID",
            //    table: "Task2");

            //migrationBuilder.AlterColumn<DateTime>(
            //    name: "Date",
            //    table: "Task2",
            //    type: "datetime2",
            //    nullable: false,
            //    defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
            //    oldClrType: typeof(DateTime),
            //    oldType: "datetime2",
            //    oldNullable: true);

            //migrationBuilder.AddColumn<string>(
            //    name: "TaskName",
            //    table: "Task2",
            //    type: "nvarchar(max)",
            //    nullable: true);

            migrationBuilder.CreateTable(
                name: "TasksSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    WorkScheduleView = table.Column<int>(type: "int", nullable: false),
                    FirstDayOfWeek = table.Column<int>(type: "int", nullable: false),
                    DayTasksLimit = table.Column<int>(type: "int", nullable: false),
                    ShowLeaves = table.Column<bool>(type: "bit", nullable: false),
                    ShowHolidays = table.Column<bool>(type: "bit", nullable: false),
                    AutoCopySchedule = table.Column<bool>(type: "bit", nullable: false),
                    StartCopyScheduleDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AutoDownloadSchedule = table.Column<bool>(type: "bit", nullable: false),
                    StartDownloadScheduleDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockScheduleEdit = table.Column<bool>(type: "bit", nullable: false),
                    LockTime = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksSettings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TasksSettings");

            //migrationBuilder.DropColumn(
            //    name: "TaskName",
            //    table: "Task2");

            //migrationBuilder.AlterColumn<DateTime>(
            //    name: "Date",
            //    table: "Task2",
            //    type: "datetime2",
            //    nullable: true,
            //    oldClrType: typeof(DateTime),
            //    oldType: "datetime2");

            //migrationBuilder.AddColumn<int>(
            //    name: "TaskNameID",
            //    table: "Task2",
            //    type: "int",
            //    nullable: true);
        }
    }
}

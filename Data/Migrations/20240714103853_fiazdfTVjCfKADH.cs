using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class fiazdfTVjCfKADH : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartDownloadScheduleDate",
                table: "TasksSettings",
                newName: "StartShareScheduleDate");

            migrationBuilder.RenameColumn(
                name: "AutoDownloadSchedule",
                table: "TasksSettings",
                newName: "AutoShareSchedule");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartShareScheduleDate",
                table: "TasksSettings",
                newName: "StartDownloadScheduleDate");

            migrationBuilder.RenameColumn(
                name: "AutoShareSchedule",
                table: "TasksSettings",
                newName: "AutoDownloadSchedule");
        }
    }
}

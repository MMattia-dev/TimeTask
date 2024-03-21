using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class qBgpkTgZqVdcWpk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Task2",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkerID = table.Column<int>(type: "int", nullable: false),
                    TaskNameID = table.Column<int>(type: "int", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    JobStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    JobEnd = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Task2", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Task2");
        }
    }
}

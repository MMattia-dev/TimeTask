using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class _02012025_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShiftId",
                table: "Workers2",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkstationId",
                table: "Workers2",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShiftId",
                table: "Workers2");

            migrationBuilder.DropColumn(
                name: "WorkstationId",
                table: "Workers2");
        }
    }
}

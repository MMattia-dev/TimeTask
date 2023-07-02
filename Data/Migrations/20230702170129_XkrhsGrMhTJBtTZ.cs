using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class XkrhsGrMhTJBtTZ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Leave4",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Max = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IfDays = table.Column<bool>(type: "bit", nullable: true),
                    IfWeeks = table.Column<bool>(type: "bit", nullable: true),
                    IfMonths = table.Column<bool>(type: "bit", nullable: true),
                    IfYears = table.Column<bool>(type: "bit", nullable: true),
                    IfWeekends = table.Column<bool>(type: "bit", nullable: true),
                    IfHolidays = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leave4", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Leave4");
        }
    }
}

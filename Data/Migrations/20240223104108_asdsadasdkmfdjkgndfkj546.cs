using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class asdsadasdkmfdjkgndfkj546 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MainSettings2",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PoraNocna_Poczatek = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PoraNocna_Koniec = table.Column<DateTime>(type: "datetime2", nullable: false),
                    WolnyPoniedzialek = table.Column<bool>(type: "bit", nullable: false),
                    WolnyWtorek = table.Column<bool>(type: "bit", nullable: false),
                    WolnaSroda = table.Column<bool>(type: "bit", nullable: false),
                    WolnyCzwartek = table.Column<bool>(type: "bit", nullable: false),
                    WolnyPiatek = table.Column<bool>(type: "bit", nullable: false),
                    WolnaSobota = table.Column<bool>(type: "bit", nullable: false),
                    WolnaNiedziela = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MainSettings2", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MainSettings2");
        }
    }
}

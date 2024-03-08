using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class xUAloAiUeTviPQm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimeSettings3",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkerId = table.Column<int>(type: "int", nullable: true),
                    OkresRozliczeniowy = table.Column<int>(type: "int", nullable: true),
                    jezeliTydzien = table.Column<bool>(type: "bit", nullable: true),
                    jezeliMiesiac = table.Column<bool>(type: "bit", nullable: true),
                    CzasPracy = table.Column<int>(type: "int", nullable: true),
                    MaksymalnaLiczbaNadgodzin = table.Column<int>(type: "int", nullable: true),
                    MaksymalnaLiczbaNadgodzinTydzien = table.Column<int>(type: "int", nullable: true),
                    NieprzerwanyOdpoczynek = table.Column<int>(type: "int", nullable: true),
                    PoraNocnaStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PoraNocnaKoniec = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CzyPoniedzialekWolny = table.Column<bool>(type: "bit", nullable: true),
                    CzyWtorekWolny = table.Column<bool>(type: "bit", nullable: true),
                    CzySrodaWolny = table.Column<bool>(type: "bit", nullable: true),
                    CzyCzwartekWolny = table.Column<bool>(type: "bit", nullable: true),
                    CzyPiatekWolny = table.Column<bool>(type: "bit", nullable: true),
                    CzySobotaWolny = table.Column<bool>(type: "bit", nullable: true),
                    CzyNiedzielaWolny = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSettings3", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeSettings3");
        }
    }
}

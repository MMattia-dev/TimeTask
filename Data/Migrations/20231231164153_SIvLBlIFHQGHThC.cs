﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TimeTask.Data.Migrations
{
    /// <inheritdoc />
    public partial class SIvLBlIFHQGHThC : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TimeSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkerId = table.Column<int>(type: "int", nullable: true),
                    OkresRozliczeniowy = table.Column<int>(type: "int", nullable: true),
                    CzasPracy = table.Column<int>(type: "int", nullable: true),
                    MaksymalnaLiczbaNadgodzin = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSettings", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TimeSettings");
        }
    }
}

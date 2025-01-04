using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TimeTask.Data;
using TimeTask.Models;

namespace TimeTask.Controllers
{
    [Authorize]
    public class ShiftsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ShiftsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Shifts
        public async Task<IActionResult> Index()
        {
            ViewBag.Workers = _context.Workers2;

              return _context.Shifts != null ? 
                          View(await _context.Shifts.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Shifts'  is null.");
        }

        // GET: Shifts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Shifts == null)
            {
                return NotFound();
            }

            var shifts = await _context.Shifts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shifts == null)
            {
                return NotFound();
            }

            return View(shifts);
        }

        // GET: Shifts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Shifts/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name")] Shifts shifts)
        {
            if (ModelState.IsValid)
            {
                _context.Add(shifts);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(shifts);
        }

        // GET: Shifts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Shifts == null)
            {
                return NotFound();
            }

            var shifts = await _context.Shifts.FindAsync(id);
            if (shifts == null)
            {
                return NotFound();
            }
            return View(shifts);
        }

        // POST: Shifts/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name")] Shifts shifts)
        {
            if (id != shifts.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(shifts);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ShiftsExists(shifts.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(shifts);
        }

        // GET: Shifts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Shifts == null)
            {
                return NotFound();
            }

            var shifts = await _context.Shifts
                .FirstOrDefaultAsync(m => m.Id == id);
            if (shifts == null)
            {
                return NotFound();
            }

            return View(shifts);
        }

        // POST: Shifts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Shifts == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Shifts'  is null.");
            }
            var shifts = await _context.Shifts.FindAsync(id);
            if (shifts != null)
            {
                _context.Shifts.Remove(shifts);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ShiftsExists(int id)
        {
          return (_context.Shifts?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet]
        public ActionResult NewShiftForm(int id)
        {
            string removeForm = "$('#QmRrlOQPQW').remove()";

            string form = "<div id=\"QmRrlOQPQW\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa zmiany:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"toPdQnPuvH\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"GuDpHEcfHN()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult AddNewShift(string name)
        {
            var newData = new Shifts()
            {
                Name = name
            };

            _context.Shifts.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpGet]
        public ActionResult EditShiftForm(int id)
        {
            var shiftName = _context.Shifts.FirstOrDefault(x => x.Id == id)?.Name;

            string removeForm = "$('#jwOsncySQjwD').remove()";

            string form = "<div id=\"jwOsncySQjwD\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa:</label>" +
                            "<input class=\"form-control\" value=\"" + shiftName + "\" autocomplete=\"off\" id=\"xEjLBIPqUXLK\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"KfdhlqmDXEsR(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult EditShift(int id, string name)
        {
            var row = _context.Shifts.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.Name = name;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult DeleteShiftForm(int id)
        {
            var shiftName = _context.Shifts.FirstOrDefault(x => x.Id == id)?.Name;

            string removeForm = "$('#UwCmLRqIRSZM').remove()";

            string form = "<div id=\"UwCmLRqIRSZM\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + shiftName + "\" />" +
                        "</div>" +
                        "<div class=\"btn-danger-div\">" +
                            "<input type=\"button\" value=\"Usuń\" onclick=\"dDlRcSCJZAuO(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult DeleteShift(int id)
        {
            var row = _context.Shifts.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Shifts.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult ShowShiftMembers(int id)
        {
            string removeForm = "$('#WnlkUXBVyfUSVNt').remove()";

            string tr = "";
            foreach (var row in _context.Workers2.Where(x => x.ShiftId == id))
            {
                var departmentName = _context.Department.First(x => x.Id == row.DepartmentID).Name;
                var name = row.Surname + " " + row.Name;
                var workstationName = _context.Workstations.FirstOrDefault(x => x.Id == row.WorkstationId)?.Name;
                var shiftName = _context.Shifts.FirstOrDefault(x => x.Id == row.ShiftId)?.Name;

                tr += "<tr>" +
                        "<td title=\"" + row.Id + "\">" + row.Id + "</td>" +
                        "<td title=\"" + name + "\">" + name + "</td>" +
                        "<td style=\"padding-left: 5px;\" title=\"" + departmentName + "\">" + departmentName + "</td>" +
                        "<td title=\"" + workstationName + "\">" + workstationName + "</td>" +
                        "<td style=\"padding-left: 5px;\" title=\"" + shiftName + "\">" + shiftName + "</td>" +
                    "</tr>";
            }

            string table = "<div class=\"eEwwYSDbqyMdghL\">" +
                "<table class=\"rHIpYUaJfTsSFHO CxPSUoeowrHAYjL sortable\" id=\"tableId_\">" +
                    "<thead>" +
                        "<tr>" +
                            "<th onclick=\"sortTable(0)\" title=\"id\"><ion-icon name=\"key\"></ion-icon></th>" +
                            "<th onclick=\"sortTable(1)\">Nazwisko i Imię</th>" + //style=\"width: 170px;\"
                            "<th onclick=\"sortTable(2)\">Dział</th>" +
                            "<th onclick=\"sortTable(3)\">Stanowisko</th>" +
                            "<th onclick=\"sortTable(4)\">Zmiana</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                        tr +
                    "</tbody>" +
                "</table>" +
                "</div>";


            string form = "<div id=\"WnlkUXBVyfUSVNt\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"AdMcjKPGypQwFuM\">" +
                        "<span class=\"hFzZLqJdsEqdlrx phzshsahNeRSjfT wbxnvJGiIuXUOzi\">" + _context.Shifts.FirstOrDefault(x => x.Id == id)?.Name + "</span>" +
                        table +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }



    }
}

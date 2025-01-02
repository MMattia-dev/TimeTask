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
    public class WorkstationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public WorkstationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Workstations
        public async Task<IActionResult> Index()
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;
            ViewBag.Workstations = _context.Workstations;

            return _context.Workstations != null ? 
                          View(await _context.Workstations.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Workstations'  is null.");
        }

        // GET: Workstations/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Workstations == null)
            {
                return NotFound();
            }

            var workstations = await _context.Workstations
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workstations == null)
            {
                return NotFound();
            }

            return View(workstations);
        }

        // GET: Workstations/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Workstations/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,DepartmentId,Name")] Workstations workstations)
        {
            if (ModelState.IsValid)
            {
                _context.Add(workstations);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(workstations);
        }

        // GET: Workstations/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Workstations == null)
            {
                return NotFound();
            }

            var workstations = await _context.Workstations.FindAsync(id);
            if (workstations == null)
            {
                return NotFound();
            }
            return View(workstations);
        }

        // POST: Workstations/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,DepartmentId,Name")] Workstations workstations)
        {
            if (id != workstations.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(workstations);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WorkstationsExists(workstations.Id))
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
            return View(workstations);
        }

        // GET: Workstations/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Workstations == null)
            {
                return NotFound();
            }

            var workstations = await _context.Workstations
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workstations == null)
            {
                return NotFound();
            }

            return View(workstations);
        }

        // POST: Workstations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Workstations == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Workstations'  is null.");
            }
            var workstations = await _context.Workstations.FindAsync(id);
            if (workstations != null)
            {
                _context.Workstations.Remove(workstations);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool WorkstationsExists(int id)
        {
          return (_context.Workstations?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet]
        public ActionResult NewWorkstationForm(int id)
        {
            var departments = "";
            foreach (var item in ((IEnumerable<Department>)_context.Department).OrderBy(x => x.Name))
            {
                if (item.Id == id)
                {
                    departments += "<option selected value=" + item.Id + ">" + item.Name + "</option>";
                }
                else
                {
                    departments += "<option value=" + item.Id + ">" + item.Name + "</option>";
                }
            }

            string removeForm = "$('#QmRrlOQPQW').remove()";

            string form = "<div id=\"QmRrlOQPQW\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Dział:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"OyRfwpeqzbeyVEW\">" +
                                departments +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa stanowiska:</label>" +
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
        public ActionResult AddNewWorkstation(int departmentId, string name)
        {
            var newData = new Workstations()
            {
                DepartmentId = departmentId,
                Name = name
            };

            _context.Workstations.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpGet]
        public ActionResult CreateDepartmentSelect()
        {
            var departments = (_context.Department).Select(x => x.Id);

            string departments_string = "";
            foreach (var item in (_context.Department).OrderBy(x => x.Name))
            {
                departments_string += "<div class=\"oJeaEVIeaFrjGFz\" id=\"" + item.Id + "\" onclick=\"WAknWoEDCgnvjyY(" + item.Id + ")\"><span>" + item.Name + "</span></div>";
            }

            string div = "<div class=\"IVnxgCORpPYL ijBuUPWrdXEngvb pKKeaPLlODAnOgN fetDyOODTumSTzB\" id=\"shwJrqmCKCOdpeV\">" +
                    departments_string +
                "</div>";

            if (div != "")
            {
                return Content(div);
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult ChangeDepartment(int? id)
        {
            var firstDepartmentID = ((IEnumerable<Department>)_context.Department).OrderBy(x => x.Name).FirstOrDefault()?.Id;
            int? departmentId = null;

            string? departmentName = "";
            List<Workstations> workstations = new List<Workstations>();

            if (id != null)
            {
                departmentName = (_context.Department).FirstOrDefault(x => x.Id == id)?.Name;
                workstations = ((IEnumerable<Workstations>)_context.Workstations).Where(x => x.DepartmentId == id).ToList();
                departmentId = id;
            }
            else
            {
                departmentName = (_context.Department).FirstOrDefault(x => x.Id == firstDepartmentID)?.Name;
                workstations = ((IEnumerable<Workstations>)_context.Workstations).Where(x => x.DepartmentId == firstDepartmentID).ToList();
                departmentId = firstDepartmentID;
            }

            var info = "";
            var table = "";

            foreach (var item in workstations)
            {
                info += "<tr class=\"EmRSNqsShbDnTsE\">" +
                                "<td>" + item.Id + "</td>" +
                                "<td>" + item.Name + "</td>" +
                                "<td>" + departmentName + "</td>" +
                                "<td>" + "" + "</td>" +
                                "<td>" +
                                    "<a onclick=\"IxsCvPIuWwZw(" + item.Id + ")\" title=\"Edytuj\"><ion-icon class=\"edit urlop\" name=\"create-outline\"></ion-icon></a>" +
                                    "<a onclick=\"kZINYLFZdSai(" + item.Id + ")\" title=\"Usuń\"><ion-icon class=\"delete urlop\" name=\"trash-outline\"></ion-icon></a>" +
                                "</td>" +
                            "</tr>";
            }

            if (workstations.Count() > 0)
            {
                table = "<table class=\"VUXahzbNUTWtiZa sortable\" id=\"tableId\">" +
                    "<thead>" +
                        "<tr>" +
                            "<th style=\"width: 100px;\"><span>ID</span></th>" +
                            "<th><span>Nazwa</span></th>" + 
                            "<th><span>Dział</span></th>" + 
                            "<th><span>Liczba pracowników</span></th>" + 
                            "<th style=\"width: 100px;\"><span>Opcje</span></th>" +
                        "</tr>" +
                    "</thead>" +
                    info +
                "</table>";
            }

            return Json(new { ContentResult = Content(table), DepartmentName = departmentName, DepartmentId = departmentId });
        }

        [HttpGet]
        public ActionResult EditWorkstation(int id)
        {
            var departmentId = ((IEnumerable<Workstations>)_context.Workstations).FirstOrDefault(x => x.Id == id)?.DepartmentId;
            var departmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == departmentId)?.Name;

            var workstationName = _context.Workstations.FirstOrDefault(x => x.Id == id)?.Name;

            string removeForm = "$('#jwOsncySQjwD').remove()";

            string form = "<div id=\"jwOsncySQjwD\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Dział:</label>" +
                            "<input disabled class=\"form-control\" value=\"" + departmentName + "\" autocomplete=\"off\" id=\"qxZnTneGdrVW\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa stanowiska:</label>" +
                            "<input class=\"form-control\" value=\"" + workstationName + "\" autocomplete=\"off\" id=\"xEjLBIPqUXLK\" />" +
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
        public ActionResult EditWorkstation(int id, string name)
        {
            var row = _context.Workstations.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.Name = name;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult DeleteWorkstationForm(int id)
        {
            var departmentId = ((IEnumerable<Workstations>)_context.Workstations).FirstOrDefault(x => x.Id == id)?.DepartmentId;
            var departmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == departmentId)?.Name;

            var workstationName = _context.Workstations.FirstOrDefault(x => x.Id == id)?.Name;

            string removeForm = "$('#UwCmLRqIRSZM').remove()";

            string form = "<div id=\"UwCmLRqIRSZM\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Dział:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + departmentName + "\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa stanowiska:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + workstationName + "\" />" +
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
        public ActionResult DeleteWorkstation(int id)
        {
            var row = _context.Workstations.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Workstations.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }





    }
}

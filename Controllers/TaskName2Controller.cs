using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TimeTask.Data;
using TimeTask.Models;

namespace TimeTask.Controllers
{
    public class TaskName2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public TaskName2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TaskName2
        public async Task<IActionResult> Index()
        {
              return _context.TaskName2 != null ? 
                          View(await _context.TaskName2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TaskName2'  is null.");
        }

        // GET: TaskName2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TaskName2 == null)
            {
                return NotFound();
            }

            var taskName2 = await _context.TaskName2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskName2 == null)
            {
                return NotFound();
            }

            return View(taskName2);
        }

        // GET: TaskName2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TaskName2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,DepartmentID")] TaskName2 taskName2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(taskName2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(taskName2);
        }

        // GET: TaskName2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TaskName2 == null)
            {
                return NotFound();
            }

            var taskName2 = await _context.TaskName2.FindAsync(id);
            if (taskName2 == null)
            {
                return NotFound();
            }
            return View(taskName2);
        }

        // POST: TaskName2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,DepartmentID")] TaskName2 taskName2)
        {
            if (id != taskName2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(taskName2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaskName2Exists(taskName2.Id))
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
            return View(taskName2);
        }

        // GET: TaskName2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TaskName2 == null)
            {
                return NotFound();
            }

            var taskName2 = await _context.TaskName2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskName2 == null)
            {
                return NotFound();
            }

            return View(taskName2);
        }

        // POST: TaskName2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TaskName2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TaskName2'  is null.");
            }
            var taskName2 = await _context.TaskName2.FindAsync(id);
            if (taskName2 != null)
            {
                _context.TaskName2.Remove(taskName2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaskName2Exists(int id)
        {
          return (_context.TaskName2?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        public ActionResult AddTask(string name, int departmentID)
        {
            var newData = new TaskName2()
            {
                Name = name,
                DepartmentID = departmentID,
            };

            _context.TaskName2.Add(newData);
            _context.SaveChanges();
            //return Json(new { success = true });
            return Json(new { newData.Id, newData.Name, newData.DepartmentID });
        }

        [HttpPost]
        public ActionResult EditTask(int id, string name, int departmentID)
        {
            var row = _context.TaskName2.FirstOrDefault(x => x.Id == id);
            if (row != null)
            {
                row.Name = name;
                row.DepartmentID = departmentID;
                _context.SaveChanges();
                //return Json(new { success = true });
                return Json(new { row.Name });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult RemoveTask(int id)
        {
            var row = _context.TaskName2.FirstOrDefault(x => x.Id == id);
            if (row != null)
            {
                _context.TaskName2.Remove(row);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult CreateDepartmentSelect()
        {
            string departments_string = "";
            foreach (var item in (_context.Department).OrderBy(x => x.Name))
            {
                departments_string += "<div class=\"oJeaEVIeaFrjGFz\" id=\"" + item.Id + "\" onclick=\"WAknWoEDCgnvjyY(" + item.Id + ")\"><span>" + item.Name + "</span></div>";
            }

            string div = "<div class=\"IVnxgCORpPYL ijBuUPWrdXEngvb pKKeaPLlODAnOgN ljIKYaVrfNBueSI\" id=\"shwJrqmCKCOdpeV\">" +
                    departments_string +
                "</div>";

            if (div != "")
            {
                return Content(div);
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult AddNewTaskForm(int id)
        {
            //string departments = "";
            //foreach (var item in (_context.Department).OrderBy(x => x.Name))
            //{
            //    departments += "<option value=\"" + item.Id + "\">" + item.Name + "</option>";
            //}
            string departments = "";
            foreach (var item in (_context.Department).OrderBy(x => x.Name))
            {
                if (item.Id == id)
                {
                    departments += "<option selected value=\"" + item.Id + "\">" + item.Name + "</option>";
                }
                else
                {
                    departments += "<option value=\"" + item.Id + "\">" + item.Name + "</option>";
                }
            }

            string removeForm = "$('#hJQarhdVtvVBOnk').remove()";

            string form = "<div id=\"hJQarhdVtvVBOnk\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form\">" +
                        "<div class=\"form-group\">" +
                            "<label>Nazwa zadania:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"IluduaIgOUVOGRf\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Dział:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"hdfoDuUOBPpvhSl\">" +
                                departments +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"zGWGBXreWGtGNcS()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult EditTaskForm(int id)
        {
            var taskName = (_context.TaskName2).FirstOrDefault(x => x.Id == id)?.Name;
            var taskDepartmentID = (_context.TaskName2).FirstOrDefault(x => x.Id == id)?.DepartmentID;
            var departmentName = (_context.Department).FirstOrDefault(x => x.Id == id)?.Name;

            string departments = "";
            foreach (var item in (_context.Department).OrderBy(x => x.Name))
            {
                if (item.Id == taskDepartmentID)
                {
                    departments += "<option selected value=\"" + item.Id + "\">" + item.Name + "</option>";
                }
                else
                {
                    departments += "<option value=\"" + item.Id + "\">" + item.Name + "</option>";
                }
            }

            string removeForm = "$('#jwOsncySQjwD').remove()";

            string form = "<div id=\"jwOsncySQjwD\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form\">" +
                        "<div class=\"form-group\">" +
                            "<label>Nazwa zadania:</label>" +
                            "<input class=\"form-control\" value=\"" + taskName + "\" autocomplete=\"off\" id=\"xEjLBIPqUXLK\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Dział:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"ZRfCdgttdnOCfXF\">" +
                                departments +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"KfdhlqmDXEsR(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult DeleteTaskForm(int id)
        {
            var taskName = (_context.TaskName2).FirstOrDefault(x => x.Id == id)?.Name;

            var departmentID = (_context.TaskName2).FirstOrDefault(x => x.Id == id)?.DepartmentID;
            var departmentName = (_context.Department).FirstOrDefault(x => x.Id == departmentID)?.Name;

            string removeForm = "$('#YUkuEpVsBmYTtjN').remove()";

            string form = "<div id=\"YUkuEpVsBmYTtjN\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_2\">" +
                        "<div class=\"IvBtEDulLESDYxK\">" +
                            "<span>" + taskName + "</span>" +
                        "</div>" +
                        //"<div class=\"IvBtEDulLESDYxK\">" +
                        //    "<span>Spowoduje to usunięcie zadań z tą nazwą we wszystkich grafikach dla działu " + departmentName + "! Upewnij się, że wszystkie potrzebne grafiki zostały pobrane!</span>" +
                        //"</div>" +
                        "<div class=\"btn-danger-div\">" +
                            "<input type=\"button\" value=\"Usuń\" onclick=\"aDkOgungYCvMbHN(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult ChangeDepartment(int id)
        {
            var departmentName = (_context.Department).FirstOrDefault(x => x.Id == id)?.Name;

            var tasks = (_context.TaskName2).Where(x => x.DepartmentID == id);
            var info = "";
            var table = "";

            foreach (var item in tasks)
            {
                info += "<tr class=\"EmRSNqsShbDnTsE\">" +
                                "<td>" + item.Id + "</td>" +
                                "<td>" + item.Name + "</td>" +
                                "<td>" + departmentName + "</td>" +
                                "<td>" +
                                    "<a onclick=\"MUdkksPiwwBklvN(" + item.Id + ")\" title=\"Edytuj\"><ion-icon class=\"edit urlop\" name=\"create-outline\"></ion-icon></a>" +
                                    "<a onclick=\"LXxUWyFdXJNnlvI(" + item.Id + ")\" title=\"Usuń\"><ion-icon class=\"delete urlop\" name=\"trash-outline\"></ion-icon></a>" +
                                "</td>" +
                            "</tr>";
            }

            if (tasks.Count() > 0)
            {
                table = "<table class=\"VUXahzbNUTWtiZa sortable\" id=\"tableId\">" +
                    "<thead>" +
                        "<tr>" +
                            "<th style=\"width: 100px;\"><span>ID</span></th>" +
                            "<th><span>Nazwa zadania</span></th>" +
                            "<th><span>Dział</span></th>" +
                            "<th><span>Opcje</span></th>" +
                        "</tr>" +
                    "</thead>" +
                    info +
                "</table>";
            }

            return Json(new { ContentResult = Content(table), DepartmentName = departmentName });
        }



    }
}

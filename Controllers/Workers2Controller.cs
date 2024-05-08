using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TimeTask.Data;
using TimeTask.Models;

namespace TimeTask.Controllers
{
    [Authorize]
    public class Workers2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Workers2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Workers2
        public async Task<IActionResult> Index()
        {
            ViewBag.Department = _context.Department;

            return _context.Workers2 != null ?
                          View(await _context.Workers2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Workers2'  is null.");
        }

        // GET: Workers2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Workers2 == null)
            {
                return NotFound();
            }

            var workers2 = await _context.Workers2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workers2 == null)
            {
                return NotFound();
            }

            return View(workers2);
        }

        // GET: Workers2/Create
        public IActionResult Create()
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;

            return View();
        }

        // POST: Workers2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Surname,DepartmentID,Employed")] Workers2 workers2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(workers2);
                await _context.SaveChangesAsync();
                //return RedirectToAction(nameof(Index));
                return RedirectToAction("Index", "Departments");
            }
            return View(workers2);
        }

        // GET: Workers2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;

            if (id == null || _context.Workers2 == null)
            {
                return NotFound();
            }

            var workers2 = await _context.Workers2.FindAsync(id);
            if (workers2 == null)
            {
                return NotFound();
            }
            return View(workers2);
        }

        // POST: Workers2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Surname,DepartmentID,Employed")] Workers2 workers2)
        {
            if (id != workers2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(workers2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Workers2Exists(workers2.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                //return RedirectToAction(nameof(Index));
                return RedirectToAction("Index", "Home");
            }
            return View(workers2);
        }

        // GET: Workers2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Workers2 == null)
            {
                return NotFound();
            }

            var workers2 = await _context.Workers2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workers2 == null)
            {
                return NotFound();
            }

            return View(workers2);
        }

        // POST: Workers2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Workers2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Workers2'  is null.");
            }
            var workers2 = await _context.Workers2.FindAsync(id);
            if (workers2 != null)
            {
                _context.Workers2.Remove(workers2);
            }

            await _context.SaveChangesAsync();
            //return RedirectToAction(nameof(Index));
            return RedirectToAction("Index", "Home");
        }

        private bool Workers2Exists(int id)
        {
            return (_context.Workers2?.Any(e => e.Id == id)).GetValueOrDefault();
        }






        public ActionResult GetWorker(int id)
        {
            var workers2s = (from c in _context.Workers2
                             where c.Id == id
                             select c).FirstOrDefault();

            return Json(workers2s);
        }

        [HttpPost]
        public ActionResult ChangeWorkerDepartment(int id, int departmentID)
        {
            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.DepartmentID = departmentID;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult DeleteWorkerWithEverythingElse(int id)
        {
            //usuń także wszystkie inne rowsy z workerID
            var timeSettingsID = ((IEnumerable<TimeSettings3>)_context.TimeSettings3).FirstOrDefault(x => x.WorkerId == id)?.Id;
            var taskID = ((IEnumerable<Task2>)_context.Task2).Where(x => x.WorkerID == id).Select(x => x.Id).ToList();
            var timesID = ((IEnumerable<Time>)_context.Time).Where(x => x.WorkerID == id).Select(x => x.Id).ToList();

            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Workers2.Remove(row);
                _context.SaveChanges();

                int count = 1;

                if (timeSettingsID != null)
                {
                    count++;
                }

                if (taskID.Count() != 0)
                {
                    count++;
                }

                if (timesID.Count() != 0)
                {
                    count++;
                }

                return Json(new { timeSettingsID, taskID, timesID, count });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult DeleteWorker(int id)
        {
            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Workers2.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult GetWorkerInfo(int id)
        {
            var timeSettingsID = ((IEnumerable<TimeSettings3>)_context.TimeSettings3).FirstOrDefault(x => x.WorkerId == id)?.Id;
            var taskID = ((IEnumerable<Task2>)_context.Task2).Where(x => x.WorkerID == id).Select(x => x.Id).ToList();
            var timesID = ((IEnumerable<Time>)_context.Time).Where(x => x.WorkerID == id).Select(x => x.Id).ToList();

            var workerSurname = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Surname;
            var workerName = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Name;

            var info = 0;
            if (timeSettingsID != null)
            {
                info++;
            }
            if (taskID.Count() > 0)
            {
                info += taskID.Count();
            }
            if (timesID.Count() > 0)
            {
                info += timesID.Count();
            }

            return Json(new { info, workerSurname, workerName });
        }

        [HttpPost]
        public ActionResult AddNewWorker(string name, string surname, int departmentID, bool employed)
        {
            var newData = new Workers2()
            {
                Name = name,
                Surname = surname,
                DepartmentID = departmentID,
                Employed = employed
            };

            _context.Workers2.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditWorker(int id, string name, string surname, int departmentID)
        {
            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.Name = name;
                row.Surname = surname;
                row.DepartmentID = departmentID;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult AddDepartmentForm()
        {
            string removeForm = "$('#XOrtKNkAwk').remove()";

            string form = "<div id=\"XOrtKNkAwk\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa działu:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"svFbsOqCAR\" />" +
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

        [HttpGet]
        public ActionResult AddNewWorkerForm()
        {
            var departments = "";
            foreach (var item in ((IEnumerable<Department>)_context.Department).OrderBy(x => x.Name))
            {
                departments += "<option value=" + item.Id + ">" + item.Name + "</option>";
            }

            string removeForm = "$('#QmRrlOQPQW').remove()";

            string form = "<div id=\"QmRrlOQPQW\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Imię:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"GVegODKbEh\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Nazwisko:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"toPdQnPuvH\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Dział:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"OyRfwpeqzbeyVEW\">" +
                                departments +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"TEqGSwRYnu()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult EditWorkerForm(int id)
        {
            var workerSurname = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Surname;
            var workerName = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Name;
            var workersDepartment = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.DepartmentID;

            string departments = "";
            foreach (var item in ((IEnumerable<Department>)_context.Department).OrderBy(x => x.Name))
            {
                if (item.Id == workersDepartment)
                {
                    departments += "<option selected value=" + item.Id + ">" + item.Name + "</option>";
                }
                else
                {
                    departments += "<option value=" + item.Id + ">" + item.Name + "</option>";
                }
            }

            string removeForm = "$('#jwOsncySQjwD').remove()";

            string form = "<div id=\"jwOsncySQjwD\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Imię:</label>" +
                            "<input class=\"form-control\" value=\"" + workerName + "\" autocomplete=\"off\" id=\"qxZnTneGdrVW\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Nazwisko:</label>" +
                            "<input class=\"form-control\" value=\"" + workerSurname + "\" autocomplete=\"off\" id=\"xEjLBIPqUXLK\" />" +
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
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult DeleteWorkerForm(int id)
        {
            var workerSurname = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Surname;
            var workerName = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Name;
            var workersDepartment = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.DepartmentID;
            var departmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == workersDepartment)?.Name;

            string removeForm = "$('#UwCmLRqIRSZM').remove()";

            string form = "<div id=\"UwCmLRqIRSZM\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Imię:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + workerName + "\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Nazwisko:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + workerSurname + "\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Dział:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + departmentName + "\" />" +
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

        [HttpGet]
        public ActionResult EditDepartmentForm(int id)
        {
            var departmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == id)?.Name;

            string removeForm = "$('#uLTJNrstvNEQ').remove()";

            string form = "<div id=\"uLTJNrstvNEQ\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa działu:</label>" +
                            "<input class=\"form-control\" value=\"" + departmentName + "\" autocomplete=\"off\" id=\"coVYuzZVCFxh\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Edytuj\" class=\"btn-custom\" onclick=\"KOdkyXQcUVJW(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult DeleteDepartmentForm(int id)
        {
            var departmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == id)?.Name;

            var text = "";
            var howManyWorkers = ((IEnumerable<Workers2>)_context.Workers2).Where(x => x.DepartmentID == id).Select(x => x.Id).ToList();
            if (howManyWorkers.Count() > 0)
            {
                var span = "";
                if (howManyWorkers.Count() == 1)
                {
                    span = "pracownika";
                }
                else if (howManyWorkers.Count() > 1)
                {
                    span = "pracowników";
                }
                text = "<div class=\"IvBtEDulLESDYxK\">" +
                        "<span>Dział zawiera " + howManyWorkers.Count() + " " + span + ". Czy jesteś pewny, że chcesz usunąć dział? (Pracownicy nie zostaną usunięci, ale nie będą przypisani do żadnego działu)</span>" +
                    "</div>";
            }

            string removeForm = "$('#PNujBEeIildr').remove()";

            string form = "<div id=\"PNujBEeIildr\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nazwa działu:</label>" +
                            "<input class=\"form-control\" value=\"" + departmentName + "\" disabled />" +
                        "</div>" +
                        text +
                        "<div class=\"btn-danger-div\">" +
                            "<input type=\"button\" value=\"Usuń\" onclick=\"adqwBJykaCzQ(" + id + ")\" />" +
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
            var workers = ((IEnumerable<Workers2>)_context.Workers2).Where(x => x.DepartmentID == id);

            string table = "";

            return Content(table);
            //return Json(workers);
        }



    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis.CSharp;
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
            ViewBag.Workers = _context.Workers2;

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

        [HttpGet]
        public ActionResult CreateDepartmentSelect()
        {
            //czy są pracownicy nieprzypisani
            var departments = (_context.Department).Select(x => x.Id);
            List<int> workersWithNoDepartment = new List<int>();

            foreach (var item in _context.Workers2)
            {
                if (!departments.Contains(item.DepartmentID))
                {
                    workersWithNoDepartment.Add(item.Id);
                }
            }

            string nieprzypisani = "";
            if (workersWithNoDepartment.Any())
            {
                nieprzypisani = "<div class=\"oJeaEVIeaFrjGFz\" id=\"null\" onclick=\"WAknWoEDCgnvjyY(null)\"><span style=\"color: orangered;\">Nieprzypisani</span></div>";
            }

            string departments_string = "";
            foreach (var item in (_context.Department).OrderBy(x => x.Name))
            {
                //var workerCountInDepartment = _context.Workers2.Where(x => x.DepartmentID == item.Id).Count();

                departments_string += "<div class=\"oJeaEVIeaFrjGFz\" id=\"" + item.Id + "\" onclick=\"WAknWoEDCgnvjyY(" + item.Id + ")\"><span>" + item.Name + "</span></div>";
                //departments_string += "<div class=\"oJeaEVIeaFrjGFz\" id=\"" + item.Id + "\" onclick=\"WAknWoEDCgnvjyY(" + item.Id + ")\">" +
                //        "<span>" + item.Name + "</span>" +
                //        "<span>(" + workerCountInDepartment + ")</span>" +
                //    "</div>";
            }

            string div = "<div class=\"IVnxgCORpPYL ijBuUPWrdXEngvb pKKeaPLlODAnOgN\" id=\"shwJrqmCKCOdpeV\">" +
                    nieprzypisani +
                    departments_string +
                "</div>";

            if (div != "")
            {
                return Content(div);
            }

            return Json(new { success = false });
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
        public ActionResult AddNewWorker(string name, string surname, int departmentID, int? workstation, int? shift) //bool employed
        {
            var newData = new Workers2()
            {
                Name = name,
                Surname = surname,
                DepartmentID = departmentID,
                //Employed = employed,
                WorkstationId = workstation,
                ShiftId = shift
            };

            _context.Workers2.Add(newData);
            _context.SaveChanges();
            //return Json(new { success = true });
            return Json(newData.Id);
        }

        [HttpPost]
        public ActionResult EditWorker(int id, string name, string surname, int departmentID, int? workstation, int? shift)
        {
            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.Name = name;
                row.Surname = surname;
                row.DepartmentID = departmentID;
                row.WorkstationId = workstation;
                row.ShiftId = shift;
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
        public ActionResult ChangeWorkstations(int id)
        {
            var workstations = _context.Workstations.Where(x => x.DepartmentId == id);
            string workstationsOptions = "<option selected></option>";
            foreach (var item in workstations)
            {
                workstationsOptions += "<option value=" + item.Id + ">" + item.Name + "</option>";
            }

            return Content(workstationsOptions);
        }

        [HttpGet]
        public ActionResult AddNewWorkerForm(int id)
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

            //
            var workstations = _context.Workstations.Where(x => x.DepartmentId == id);
            string workstationsOptions = "";
            foreach (var item in workstations)
            {
                workstationsOptions += "<option value=" + item.Id + ">" + item.Name + "</option>";
            }

            string shiftOptions = "";
            foreach (var item in _context.Shifts)
            {
                shiftOptions += "<option value=" + item.Id + ">" + item.Name + "</option>";
            }
            //

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
                        "<div class=\"form-group\">" +
                            "<label>Dział:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"OyRfwpeqzbeyVEW\" onchange=\"KHpqBjUFdnnaWxq(this)\">" +
                                departments +
                            "</select>" +
                        "</div>" +


						"<div class=\"form-group\">" +
							"<label>Stanowisko (opcjonalne):</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"cWSWdChjLlkqTlQ\">" +
							    "<option selected></option>" +
                                workstationsOptions +
                            "</select>" +
						"</div>" +
						"<div class=\"form-group form-group-margin\">" +
							"<label>Zmiana (opcjonalne):</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"VcVGBJCedKJagyX\">" +
							    "<option selected></option>" +
                                shiftOptions +
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

            var workstationId = _context.Workers2.FirstOrDefault(x => x.Id == id)?.WorkstationId;
            var shiftId = _context.Workers2.FirstOrDefault(x => x.Id == id)?.ShiftId;

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

            //
            var workstations = _context.Workstations.Where(x => x.DepartmentId == workersDepartment);
            string workstationsOptions = "";
            foreach (var item in workstations)
            {
                if (item.Id == workstationId)
                {
                    workstationsOptions += "<option selected value=" + item.Id + ">" + item.Name + "</option>";
                }
                else
                {
                    workstationsOptions += "<option value=" + item.Id + ">" + item.Name + "</option>";
                }       
            }

            string shiftOptions = "";
            foreach (var item in _context.Shifts)
            {
                if (item.Id == shiftId)
                {
                    shiftOptions += "<option selected value=" + item.Id + ">" + item.Name + "</option>";
                }
                else
                {
                    shiftOptions += "<option value=" + item.Id + ">" + item.Name + "</option>";
                }
            }
            //

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
                            //"<select class=\"form-control bYwPpsleuVCBkPv\" id=\"ZRfCdgttdnOCfXF\">" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"OyRfwpeqzbeyVEW\" onchange=\"KHpqBjUFdnnaWxq(this)\">" +
                                departments +
                            "</select>" +
                        "</div>" +


                        "<div class=\"form-group\">" +
                            "<label>Stanowisko (opcjonalne):</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"cWSWdChjLlkqTlQ\">" +
                                "<option selected></option>" +
                                workstationsOptions +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Zmiana (opcjonalne):</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"VcVGBJCedKJagyX\">" +
                                "<option selected></option>" +
                                shiftOptions +
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

            //
            var workerWorkstationId = _context.Workers2.FirstOrDefault(x => x.Id == id)?.WorkstationId;
            var workstationName = _context.Workstations.FirstOrDefault(x => x.Id == workerWorkstationId)?.Name;

            var workerShiftId = _context.Workers2.FirstOrDefault(x => x.Id == id)?.ShiftId;
            var shiftName = _context.Shifts.FirstOrDefault(x => x.Id == workerShiftId)?.Name;
            //

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
                        "<div class=\"form-group\">" +
                            "<label>Dział:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + departmentName + "\" />" +
                        "</div>" +


                        "<div class=\"form-group\">" +
                            "<label>Stanowisko:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + workstationName + "\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Zmiana:</label>" +
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
            var departmentName = (_context.Department).FirstOrDefault(x => x.Id == id)?.Name;

            var workers = ((IEnumerable<Workers2>)_context.Workers2).Where(x => x.DepartmentID == id);
            var info = "";
            var table = "";

            foreach (var item in workers)
            {
                var workstationName = _context.Workstations.FirstOrDefault(x => x.Id == item.WorkstationId)?.Name;
                var shiftName = _context.Shifts.FirstOrDefault(x => x.Id == item.ShiftId)?.Name;

                info += "<tr class=\"EmRSNqsShbDnTsE\">" +
                                "<td>" + item.Id + "</td>" +
                                "<td>" + item.Surname + "</td>" +
                                "<td>" + item.Name + "</td>" +
                                "<td>" + departmentName + "</td>" +

                                "<td>" + workstationName + "</td>" +
                                "<td>" + shiftName + "</td>" +

                                "<td>" +
                                    "<a onclick=\"IxsCvPIuWwZw(" + item.Id + ")\" title=\"Edytuj\"><ion-icon class=\"edit urlop\" name=\"create-outline\"></ion-icon></a>" +
                                    "<a onclick=\"deleteWorker(" + item.Id + ")\" title=\"Usuń\"><ion-icon class=\"delete urlop\" name=\"trash-outline\"></ion-icon></a>" +
                                "</td>" +
                            "</tr>";
            }

            if (workers.Count() > 0)
            {
                table = "<table class=\"VUXahzbNUTWtiZa sortable\" id=\"tableId\">" +
                    "<thead>" +
                        "<tr>" +
                            "<th style=\"width: 100px;\"><span>ID</span></th>" +
                            "<th style=\"width: 30%;\"><span>Nazwisko</span></th>" + // style=\"width: 30%;\"
							"<th><span>Imię</span></th>" +
                            "<th><span>Dział</span></th>" +

							"<th><span>Stanowisko</span></th>" +
							"<th><span>Zmiana</span></th>" +

							"<th style=\"width: 100px;\"><span>Opcje</span></th>" +
                        "</tr>" +
                    "</thead>" +
                    info +
                "</table>";
            }

            string editAndDeleteButtons = "<div class=\"IVnxgCORpPYL ijBuUPWrdXEngvb RlREsSaJYGSFniA\" onclick=\"sNYSYigDKYrjjtq(" + id + ")\" title=\"Edytuj\">" +
                    "<ion-icon name=\"create-outline\"></ion-icon>" +
                "</div>" +
                "<div class=\"IVnxgCORpPYL ijBuUPWrdXEngvb RlREsSaJYGSFniA\" onclick=\"bdoycBpPxFPywju(" + id + ")\" title=\"Usuń\">" +
                    "<ion-icon name=\"trash-outline\"></ion-icon>" +
                "</div>";

            return Json(new { ContentResult = Content(table), EditDeleteButton = Content(editAndDeleteButtons), DepartmentName = departmentName });
            //return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult WorkersWithoutDepartment()
        {
            var info = "";

            var departments = ((IEnumerable<Department>)_context.Department).Select(x => x.Id);
            List<int> workersWithNoDepartment = new List<int>();

            foreach (var item in _context.Workers2)
            {
                if (!departments.Contains(item.DepartmentID))
                {
                    workersWithNoDepartment.Add(item.Id);
                }
            }

            if (workersWithNoDepartment.Any())
            {
                foreach (var id_ in workersWithNoDepartment)
                {
                    var workers = ((IEnumerable<Workers2>)_context.Workers2).Where(x => x.Id == id_);
                    foreach (var item in workers)
                    {
                        var workstationName = _context.Workstations.FirstOrDefault(x => x.Id == item.WorkstationId)?.Name;
                        var shiftName = _context.Shifts.FirstOrDefault(x => x.Id == item.ShiftId)?.Name;

                        info += "<tr class=\"EmRSNqsShbDnTsE\">" +
                            "<td>" + item.Id + "</td>" +
                            "<td>" + item.Surname + "</td>" +
                            "<td>" + item.Name + "</td>" +
                            "<td style=\"color: orangered;\">Brak</td>" +

							"<td>" + workstationName + "</td>" +
							"<td>" + shiftName + "</td>" +

							"<td>" +
                                "<a onclick=\"IxsCvPIuWwZw(" + item.Id + ")\" title=\"Edytuj\"><ion-icon class=\"edit urlop\" name=\"create-outline\"></ion-icon></a>" +
                                "<a onclick=\"deleteWorker(" + item.Id + ")\" title=\"Usuń\"><ion-icon class=\"delete urlop\" name=\"trash-outline\"></ion-icon></a>" +
                            "</td>" +
                        "</tr>";
                    }
                }

                string table = "<table class=\"VUXahzbNUTWtiZa sortable\" id=\"tableId\">" +
                        "<thead>" +
                            "<tr>" +
                                "<th style=\"width: 100px;\"><span>ID</span></th>" +
                                "<th style=\"width: 30%;\"><span>Nazwisko</span></th>" +
                                "<th><span>Imię</span></th>" +
                                "<th><span>Dział</span></th>" +

								"<th><span>Stanowisko</span></th>" +
							    "<th><span>Zmiana</span></th>" +

                                "<th style=\"width: 100px;\"><span>Opcje</span></th>" +
                            "</tr>" +
                        "</thead>" +
                        info +
                    "</table>";

                //return Content(table);
                return Json(new { ContentResult = Content(table), DepartmentName = "Nieprzypisani" });
            }

            return Json(new { success = false });
        }







    }
}

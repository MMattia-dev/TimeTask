using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
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
    public class TasksController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Tasks
        public async Task<IActionResult> Index()
        {
            ViewBag.Departments = _context.Department;
            ViewBag.TaskNames = _context.TaskName2;
            ViewBag.Workers = _context.Workers2;
            ViewBag.Holiday = _context.Holiday;
            
            return _context.Task2 != null ? 
                          View(await _context.Task2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Task'  is null.");
        }

        public IActionResult Settings()
        {
            ViewBag.Departments = _context.Department;
            ViewBag.TaskNames = _context.TaskName2;
            ViewBag.Workers = _context.Workers2;

            return View();
        }

        // GET: Tasks/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Task == null)
            {
                return NotFound();
            }

            var task = await _context.Task
                .FirstOrDefaultAsync(m => m.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            return View(task);
        }

        // GET: Tasks/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Tasks/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerID,TaskNameID,Date,JobStart,JobEnd")] Models.Task task)
        {
            if (ModelState.IsValid)
            {
                _context.Add(task);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(task);
        }

        // GET: Tasks/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Task == null)
            {
                return NotFound();
            }

            var task = await _context.Task.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return View(task);
        }

        // POST: Tasks/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerID,TaskNameID,Date,JobStart,JobEnd")] Models.Task task)
        {
            if (id != task.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(task);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaskExists(task.Id))
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
            return View(task);
        }

        // GET: Tasks/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Task == null)
            {
                return NotFound();
            }

            var task = await _context.Task
                .FirstOrDefaultAsync(m => m.Id == id);
            if (task == null)
            {
                return NotFound();
            }

            return View(task);
        }

        // POST: Tasks/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Task == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Task'  is null.");
            }
            var task = await _context.Task.FindAsync(id);
            if (task != null)
            {
                _context.Task.Remove(task);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaskExists(int id)
        {
          return (_context.Task?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public int GetWeeksInYear(int year)
        {
            DateTimeFormatInfo dfi = DateTimeFormatInfo.InvariantInfo;
            DateTime date1 = new DateTime(year, 12, 31);
            Calendar cal = dfi.Calendar;
            return cal.GetWeekOfYear(date1, dfi.CalendarWeekRule, dfi.FirstDayOfWeek);
        }

        public int GetCurrentWeek(int year, int month, int day)
        {
            DateTimeFormatInfo dfi = DateTimeFormatInfo.InvariantInfo;
            DateTime date1 = new DateTime(year, month, day);
            Calendar cal = dfi.Calendar;
            return cal.GetWeekOfYear(date1, dfi.CalendarWeekRule, dfi.FirstDayOfWeek);
        }

        public ActionResult WeeksInYear(int year, int month, int day)
        {
            var result = new { weeks = GetWeeksInYear(year), currentWeek = GetCurrentWeek(year, month, day) };
            return Json(result);
        }



        public DateTime FirstDateOfWeekISO8601(int year, int weekOfYear)
        {
            DateTime jan1 = new DateTime(year, 1, 1);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;
            DateTime firstThursday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
            var weekNum = weekOfYear;
            if (firstWeek == 1)
            {
                weekNum -= 1;
            }
            var result = firstThursday.AddDays(weekNum * 7);

            return result.AddDays(-3);
        }

        public DateTime LastDateOfWeekISO8601(int year, int weekOfYear)
        {
            DateTime jan1 = new DateTime(year, 1, 1);
            int daysOffset = DayOfWeek.Thursday - jan1.DayOfWeek;
            DateTime firstThursday = jan1.AddDays(daysOffset);
            var cal = CultureInfo.CurrentCulture.Calendar;
            int firstWeek = cal.GetWeekOfYear(firstThursday, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
            var weekNum = weekOfYear;
            if (firstWeek == 1)
            {
                weekNum -= 1;
            }
            var result = firstThursday.AddDays(weekNum * 7);

            return result.AddDays(3);
        }

        public ActionResult DatesInChosenWeek(int year, int weekOfYear)
        {
            var result = Enumerable.Range(0, 1 + LastDateOfWeekISO8601(year, weekOfYear).Subtract(FirstDateOfWeekISO8601(year, weekOfYear)).Days).Select(x => FirstDateOfWeekISO8601(year, weekOfYear).AddDays(x)).ToArray();

            var result_ = new List<string>();
            foreach (var day in result)
            {
                foreach(var holiday in _context.Holiday)
                {
                    if (day.ToShortDateString() == holiday.Date.ToShortDateString())
                    {
                        result_.Add(day.ToShortDateString());
                    }
                }
            }



            //return Json(result);
            return Json(new
            {
                result, result_
            });
        }

        [HttpPost]
        public ActionResult AddTasks(int workerID, int? taskNameID, DateTime? date, DateTime? jobStart, DateTime? jobEnd)
        {
            var newData = new Task2()
            {
                WorkerID = workerID,
                TaskNameID = taskNameID,
                Date = date,
                JobStart = jobStart,
                JobEnd = jobEnd
            };

            _context.Task2.Add(newData);
            _context.SaveChanges();
            //return Json(new { success = true });
            return Json(newData.Id);
        }

        [HttpPost]
        public ActionResult RemoveTask(int id)
        {
            var row = _context.Task2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Task2.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult EditTask(int id, int? taskNameID, DateTime? jobStart, DateTime? jobEnd)
        {
            var row = _context.Task2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.TaskNameID = taskNameID;
                row.JobStart = jobStart;
                row.JobEnd = jobEnd;
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
        public ActionResult AddNewTaskForm()
        {
            string departments = "";
            foreach (var item in (_context.Department).OrderBy(x => x.Name))
            {
                departments += "<option value=\"" + item.Id + "\">" + item.Name + "</option>";
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

       



    }
}

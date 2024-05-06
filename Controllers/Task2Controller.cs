using System;
using System.Collections.Generic;
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
    public class Task2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Task2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Task2
        public async Task<IActionResult> Index()
        {
            ViewBag.Departments = _context.Department;
            ViewBag.TaskNames = _context.TaskName2;
            ViewBag.Workers = _context.Workers2;
            ViewBag.Holiday = _context.Holiday;

            return _context.Task2 != null ? 
                          View(await _context.Task2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Task2'  is null.");
        }

        public IActionResult Settings()
        {
            ViewBag.Departments = _context.Department;
            ViewBag.TaskNames = _context.TaskName2;
            ViewBag.Workers = _context.Workers2;

            return View();
        }

        // GET: Task2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Task2 == null)
            {
                return NotFound();
            }

            var task2 = await _context.Task2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (task2 == null)
            {
                return NotFound();
            }

            return View(task2);
        }

        // GET: Task2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Task2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerID,TaskNameID,Date,JobStart,JobEnd")] Task2 task2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(task2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(task2);
        }

        // GET: Task2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Task2 == null)
            {
                return NotFound();
            }

            var task2 = await _context.Task2.FindAsync(id);
            if (task2 == null)
            {
                return NotFound();
            }
            return View(task2);
        }

        // POST: Task2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerID,TaskNameID,Date,JobStart,JobEnd")] Task2 task2)
        {
            if (id != task2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(task2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Task2Exists(task2.Id))
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
            return View(task2);
        }

        // GET: Task2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Task2 == null)
            {
                return NotFound();
            }

            var task2 = await _context.Task2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (task2 == null)
            {
                return NotFound();
            }

            return View(task2);
        }

        // POST: Task2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Task2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Task2'  is null.");
            }
            var task2 = await _context.Task2.FindAsync(id);
            if (task2 != null)
            {
                _context.Task2.Remove(task2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Task2Exists(int id)
        {
          return (_context.Task2?.Any(e => e.Id == id)).GetValueOrDefault();
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
                foreach (var holiday in _context.Holiday)
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
                result,
                result_
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
            return Json(new { success = true });
            //return Json(newData.Id);
        }

        [HttpPost]
        public ActionResult RemoveTask(int id)
        {
            var row = _context.Task2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                //_context.Task2.Remove(row);
                //_context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult EditTask(int id, DateTime jobStart, DateTime jobEnd)
        {
            var row = _context.Task2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.JobStart = jobStart;
                row.JobEnd = jobEnd;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }



    }
}

using System;
using System.Collections.Generic;
using System.Diagnostics;
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
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        //public ActionResult WeeksInYear(int year, int month, int day)
        //{
        //    var result = new { weeks = GetWeeksInYear(year), currentWeek = GetCurrentWeek(year, month, day) };
        //    return Json(result);
        //}

        //[HttpGet]
        //public ActionResult CurrentWeek(int? savedYear)
        //{
        //    int? year;
        //    if (savedYear != null)
        //        year = savedYear;
        //    else
        //        year = DateTime.Now.Year;

        //    int month = DateTime.Now.Month;
        //    int day = DateTime.Now.Day;

        //    //return Json(new { weeks = GetWeeksInYear((int)year), currentWeek = GetCurrentWeek((int)year, month, day) });
        //    return Json(GetCurrentWeek((int)year, month, day));
        //}

        [HttpGet]
        public ActionResult Years(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            //year week
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int? year;
            if (savedYear != null)
            {
                year = savedYear;
            }
            else
            {
                year = DateTime.Now.Year;
            }

            int? week;
            if (savedWeek != null)
            {
                week = savedWeek;
            }
            else
            {
                week = GetCurrentWeek((int)year, month, day) + 1;
            }
            //

            //department
            int? department;
            if (savedDepartment != null)
            {
                department = savedDepartment;
            }
            else
            {
                department = (_context.Department).OrderBy(x => x.Name).FirstOrDefault()?.Id;
            }
            //

            int yearNow = DateTime.Now.Year;
            int prevYears = yearNow - 3;

            string html = "";
            for (int i = prevYears; i <= yearNow; i++)
            {
                if (savedYear != null)
                {
                    if (savedYear == i)
                    {
                        html += "<div onclick=\"CanjEZFvPetVidb(this, " + i + ", " + week + ", " + department + ")\" class=\"settings_a ugiECcrnKwaoVsb QbNQbKEvEMUpWaH\" id=\"MkoKdHskxQLfcuP__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                    else
                    {
                        html += "<div onclick=\"CanjEZFvPetVidb(this, " + i + ", " + week + ", " + department + ")\" class=\"settings_a ugiECcrnKwaoVsb\" id=\"MkoKdHskxQLfcuP__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                }
                else
                {
                    if (DateTime.Now.Year == i)
                    {
                        html += "<div onclick=\"CanjEZFvPetVidb(this, " + i + ", " + week + ", " + department + ")\" class=\"settings_a ugiECcrnKwaoVsb QbNQbKEvEMUpWaH\" id=\"MkoKdHskxQLfcuP__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                    else
                    {
                        html += "<div onclick=\"CanjEZFvPetVidb(this, " + i + ", " + week + ", " + department + ")\" class=\"settings_a ugiECcrnKwaoVsb\" id=\"MkoKdHskxQLfcuP__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                }
            }

            return Content(html);
        }

        [HttpGet]
        public ActionResult WeeksInYear(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            int? year;
            if (savedYear != null)
                year = savedYear;
            else
                year = DateTime.Now.Year;

            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int weeks = GetWeeksInYear((int)year);

            //department
            int? department;
            if (savedDepartment != null)
            {
                department = savedDepartment;
            }
            else
            {
                department = (_context.Department).OrderBy(x => x.Name).FirstOrDefault()?.Id;
            }
            //

            string div = "";
            for (int i = 1; i <= weeks; i++)
            {
                if (savedWeek != null)
                {
                    if (i == savedWeek)
                    {
                        div += "<div onclick=\"XyLurmdtOTQYvZU(this, " + year + ", " + i + ", " + department +")\" class=\"settings_a ugiECcrnKwaoVsb QbNQbKEvEMUpWaH\" id=\"fssIiZoJOhPhaRO__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                    else
                    {
                        div += "<div onclick=\"XyLurmdtOTQYvZU(this, " + year + ", " + i + ", " + department + ")\" class=\"settings_a ugiECcrnKwaoVsb\" id=\"fssIiZoJOhPhaRO__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                }
                else
                {
                    if (i == GetCurrentWeek((int)year, month, day) + 1)
                    {
                        div += "<div onclick=\"XyLurmdtOTQYvZU(this, " + year + ", " + i + ", " + department + ")\" class=\"settings_a ugiECcrnKwaoVsb QbNQbKEvEMUpWaH\" id=\"fssIiZoJOhPhaRO__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                    else
                    {
                        div += "<div onclick=\"XyLurmdtOTQYvZU(this, " + year + ", " + i + ", " + department + ")\" class=\"settings_a ugiECcrnKwaoVsb\" id=\"fssIiZoJOhPhaRO__\">" +
                            "<div class=\"settings_a_select\">" +
                                "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + i + "</span>" +
                            "</div>" +
                        "</div>";
                    }
                }
            }

            return Json(new { contentResult = Content(div), getCurrentWeek = GetCurrentWeek((int)year, month, day) });
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

        [HttpGet]
        public ActionResult CreateTable(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            //year week
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int? year;
            if (savedYear != null)
            {
                year = savedYear;
            }
            else
            {
                year = DateTime.Now.Year;
            }

            int? week;
            if (savedWeek != null)
            {
                week = savedWeek;
            }
            else
            {
                week = GetCurrentWeek((int)year, month, day) + 1;
            }
            //

            var departmentID = _context.Department.FirstOrDefault(x => x.Id == savedDepartment)?.Id;
            if (departmentID == null)
            {
                departmentID = _context.Department.OrderBy(x => x.Name).FirstOrDefault()?.Id;
            }






            return Json(DatesInChosenWeek((int)year, (int)week));
        }

        public ActionResult DatesInChosenWeek(int year, int weekOfYear)
        {
            var days = Enumerable.Range(0, 1 + LastDateOfWeekISO8601(year, weekOfYear).Subtract(FirstDateOfWeekISO8601(year, weekOfYear)).Days).Select(x => FirstDateOfWeekISO8601(year, weekOfYear).AddDays(x)).ToArray();

            string div = "<div class=\"GJakzZdfXNDmfZz\">" +
                            "<label id=\"task_lock_headers_id\" onchange=\"task_lock_headers_onchange(this)\">" +
                                "<input type=\"checkbox\" id=\"task_lock_headers_input\" />" +
                                "<svg id=\"lock1\" viewBox=\"-3.5 0 19 19\" width=\"32\" height=\"32\"><path d=\"M11.182 8.927v6.912a.794.794 0 0 1-.792.792H1.61a.794.794 0 0 1-.792-.792V8.927a.794.794 0 0 1 .792-.792h.654L1.956 7.11a3.534 3.534 0 0 1 6.769-2.035.554.554 0 1 1-1.062.32A2.426 2.426 0 0 0 3.017 6.79l.404 1.345h6.97a.794.794 0 0 1 .79.792zM7.108 11.47a1.108 1.108 0 1 0-1.583 1.001v1.849a.475.475 0 1 0 .95 0v-1.849a1.108 1.108 0 0 0 .633-1.001z\"></path></svg>" +
                                "<svg id=\"lock2\" viewBox=\"-3.5 0 19 19\" width=\"32\" height=\"32\"><path d=\"M11.182 8.927v6.912a.794.794 0 0 1-.792.792H1.61a.794.794 0 0 1-.792-.792V8.927a.794.794 0 0 1 .792-.792h.856V6.367a3.534 3.534 0 1 1 7.068 0v1.768h.856a.794.794 0 0 1 .792.792zm-2.756-2.56a2.426 2.426 0 1 0-4.852 0v1.768h4.852zM7.108 11.47a1.108 1.108 0 1 0-1.583 1.001v1.849a.475.475 0 0 0 .95 0v-1.849a1.108 1.108 0 0 0 .633-1.001z\"></path></svg>" +
                                "<span>zablokuj</span>" +
                                "<span>nagłówki</span>" +
                            "</label>" +
                        "</div>";

            var culture = new CultureInfo("pl-PL");
            List<string> dates = new List<string>();

            foreach (var day in days)
            {
                var holiday = (_context.Holiday).Select(x => x.Date.ToString("yyyy-MM-dd")).ToList();

                if (holiday.Contains(day.ToString("yyyy-MM-dd")))
                {
                    if (day.DayOfWeek == DayOfWeek.Sunday)
                    {
                        div += "<div class=\"XJsRKtmIfTCptru\"><span style=\"color: orangered;\">" + day.ToString("yyyy-MM-dd") + "</span><span style=\"color: orangered;\">" + day.ToString("ddd", culture) + "</span></div>";
                    }
                    else
                    {
                        div += "<div class=\"XJsRKtmIfTCptru\"><span style=\"color: orangered;\">" + day.ToString("yyyy-MM-dd") + "</span><span>" + day.ToString("ddd", culture) + "</span></div>";
                    }
                }
                else
                {
                    if (day.DayOfWeek == DayOfWeek.Sunday)
                    {
                        div += "<div class=\"XJsRKtmIfTCptru\"><span>" + day.ToString("yyyy-MM-dd") + "</span><span style=\"color: orangered;\">" + day.ToString("ddd", culture) + "</span></div>";
                    }
                    else
                    {
                        div += "<div class=\"XJsRKtmIfTCptru\"><span>" + day.ToString("yyyy-MM-dd") + "</span><span>" + day.ToString("ddd", culture) + "</span></div>";
                    }
                }

                dates.Add(day.ToString("yyyy-MM-dd"));
            }

            //return Json(new { contentResult = Content(div), dates });
            return Json(Content(div));
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
        public ActionResult GetDepartments(int? firstDepartment, int? savedDepartment)
        {
            string departments = "";

            if (firstDepartment != null)
            {
                foreach (var item in _context.Department.OrderBy(x => x.Name))
                {
                    if (savedDepartment != null)
                    {
                        if (savedDepartment == item.Id)
                        {
                            departments += "<div onclick=\"HMdMMtqNwVAguDt(this, " + item.Id + ")\" class=\"settings_a ugiECcrnKwaoVsb QbNQbKEvEMUpWaH\" id=\"jxcqHOZgFmYHYkI__\">" +
                                "<div class=\"settings_a_select\">" +
                                    "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + item.Name + "</span>" +
                                "</div>" +
                            "</div>";
                        }
                        else
                        {
                            departments += "<div onclick=\"HMdMMtqNwVAguDt(this, " + item.Id + ")\" class=\"settings_a ugiECcrnKwaoVsb\" id=\"jxcqHOZgFmYHYkI__\">" +
                                "<div class=\"settings_a_select\">" +
                                    "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + item.Name + "</span>" +
                                "</div>" +
                            "</div>";
                        }
                    }
                    else
                    {
                        if (firstDepartment == item.Id)
                        {
                            departments += "<div onclick=\"HMdMMtqNwVAguDt(this, " + item.Id + ")\" class=\"settings_a ugiECcrnKwaoVsb QbNQbKEvEMUpWaH\" id=\"jxcqHOZgFmYHYkI__\">" +
                                "<div class=\"settings_a_select\">" +
                                    "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + item.Name + "</span>" +
                                "</div>" +
                            "</div>";
                        }
                        else
                        {
                            departments += "<div onclick=\"HMdMMtqNwVAguDt(this, " + item.Id + ")\" class=\"settings_a ugiECcrnKwaoVsb\" id=\"jxcqHOZgFmYHYkI__\">" +
                                "<div class=\"settings_a_select\">" +
                                    "<span></span><span style=\"opacity: 1; margin-right: 20px;\">" + item.Name + "</span>" +
                                "</div>" +
                            "</div>";
                        }
                    }
                }
            }

            if (departments.Length > 0)
            {
                return Content(departments);
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult ClickOnDepartment(int? savedYear, int? savedWeek, int departmentID)
        {
            //year week
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int? year;
            if (savedYear != null)
            {
                year = savedYear;
            }
            else
            {
                year = DateTime.Now.Year;
            }

            int? week;
            if (savedWeek != null)
            {
                week = savedWeek;
            }
            else
            {
                week = GetCurrentWeek((int)year, month, day) + 1;
            }
            //

            var departmentName = _context.Department.FirstOrDefault(x => x.Id == departmentID)?.Name;
            if (departmentName == null)
            {
                departmentName = _context.Department.OrderBy(x => x.Name).FirstOrDefault()?.Name;
            }

            //return Json(departmentName);
            return Json(new { year, week, departmentName });
        }

        [HttpGet]
        public ActionResult GetTasks(int? firstDepartment, int? savedDepartment)
        {
            string tasks = "";

            if (firstDepartment != null)
            {
                foreach (var task in _context.TaskName2.OrderBy(x => x.Name))
                {
                    if (savedDepartment != null)
                    {
                        if (task.DepartmentID == savedDepartment)
                        {
                            tasks += "<div class=\"YgYDRNgkzyxgztO\" id=\"ekzMacYlAMvOgoy__\">" + //pGXQuswWwoZGMWg=\"" + task.Id + "\"   //id=\"" + task.DepartmentID + "\"
                                    "<svg onmousedown=\"uXPtoAMyTPOkWCV(this, " + task.Id + ")\" onmouseup=\"vhKnmbRGiUsyfyh(this)\" class=\"EpPTURkmdIzOSnq\" id2=\"" + task.Id + "\" viewBox=\"0 0 20 20\" height=\"20\" width=\"20\"><path d=\"M2.5 8C1.94772 8 1.5 7.55228 1.5 7C1.5 6.44772 1.94772 6 2.5 6H17.5C18.0523 6 18.5 6.44772 18.5 7C18.5 7.55228 18.0523 8 17.5 8H2.5Z\" /><path d=\"M2.5 11.25C1.94772 11.25 1.5 10.8023 1.5 10.25C1.5 9.69772 1.94772 9.25 2.5 9.25H17.5C18.0523 9.25 18.5 9.69772 18.5 10.25C18.5 10.8023 18.0523 11.25 17.5 11.25H2.5Z\" /><path d=\"M2.5 14.5C1.94772 14.5 1.5 14.0523 1.5 13.5C1.5 12.9477 1.94772 12.5 2.5 12.5H17.5C18.0523 12.5 18.5 12.9477 18.5 13.5C18.5 14.0523 18.0523 14.5 17.5 14.5H2.5Z\" /></svg>" +
                                    "<div>" +
                                        "<span>" + task.Name + "</span>" +
                                    "</div>" +
                                "</div>";
                        }
                    }
                    else
                    {
                        if (task.DepartmentID == firstDepartment)
                        {
                            tasks += "<div class=\"YgYDRNgkzyxgztO\" id=\"ekzMacYlAMvOgoy__\">" + //pGXQuswWwoZGMWg=\"" + task.Id + "\"   //id=\"" + task.DepartmentID + "\"
                                    "<svg onmousedown=\"uXPtoAMyTPOkWCV(this, " + task.Id + ")\" onmouseup=\"vhKnmbRGiUsyfyh(this)\" class=\"EpPTURkmdIzOSnq\" id2=\"" + task.Id + "\" viewBox=\"0 0 20 20\" height=\"20\" width=\"20\"><path d=\"M2.5 8C1.94772 8 1.5 7.55228 1.5 7C1.5 6.44772 1.94772 6 2.5 6H17.5C18.0523 6 18.5 6.44772 18.5 7C18.5 7.55228 18.0523 8 17.5 8H2.5Z\" /><path d=\"M2.5 11.25C1.94772 11.25 1.5 10.8023 1.5 10.25C1.5 9.69772 1.94772 9.25 2.5 9.25H17.5C18.0523 9.25 18.5 9.69772 18.5 10.25C18.5 10.8023 18.0523 11.25 17.5 11.25H2.5Z\" /><path d=\"M2.5 14.5C1.94772 14.5 1.5 14.0523 1.5 13.5C1.5 12.9477 1.94772 12.5 2.5 12.5H17.5C18.0523 12.5 18.5 12.9477 18.5 13.5C18.5 14.0523 18.0523 14.5 17.5 14.5H2.5Z\" /></svg>" +
                                    "<div>" +
                                        "<span>" + task.Name + "</span>" +
                                    "</div>" +
                                "</div>";
                        }
                    }
                }
            }

            if (tasks.Length > 0)
            {
                return Content(tasks);
            }

            return Json(new { success = false });
        }

        //[HttpGet]
        //public ActionResult GetWeek(int? savedWeek)
        //{
        //    int? week;
        //    if (savedWeek != null)
        //    {
        //        week = savedWeek;
        //    }
        //    else
        //    {
        //        week
        //    }
        //}








    }
}

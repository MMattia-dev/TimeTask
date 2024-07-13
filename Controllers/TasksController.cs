using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using Humanizer.Localisation.TimeToClockNotation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis.Differencing;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Newtonsoft.Json.Linq;
using NuGet.Packaging.Signing;
using NuGet.Protocol;
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
            ViewBag.Tasks = _context.Task2;

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

        public IActionResult TasksSettings()
        {
            ViewBag.Departments = _context.Department;

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

        [HttpGet]
        public ActionResult HowManyTasks(int? department)
        {
            int howManyTasksForDepartment = _context.TaskName2.Where(x => x.DepartmentID == department).Count();

            if (department == null)
            {
                int? firstDepartment = _context.Department.OrderBy(x => x.Name).FirstOrDefault()?.Id;
                if (firstDepartment == null)
                {
                    howManyTasksForDepartment = 0;
                }
                else
                {
                    howManyTasksForDepartment = _context.TaskName2.Where(x => x.DepartmentID == firstDepartment).Count();
                }
            }

            return Json(howManyTasksForDepartment);
        }

        public int GetYear(int? savedYear)
        {
            int year = DateTime.Now.Year;
            if (savedYear != null)
            {
                year = savedYear.Value;
            }

            return year;
        }

        public int GetWeek(int? savedWeek, int year, int month, int day)
        {
            int week = GetCurrentWeek(year, month, day) + 1;
            if (savedWeek != null)
            {
                week = savedWeek.Value;
            }

            return week;
        }

        public int GetDepartmentId(int? savedDepartment)
        {
            int? department = _context.Department.OrderBy(x => x.Name).FirstOrDefault()?.Id;
            if (savedDepartment != null)
            {
                department = savedDepartment.Value;
            }

            if (department != null)
            {
                return (int)department;
            }

            return 0;
        }

        [HttpGet]
        public ActionResult Years(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);
            int department = GetDepartmentId(savedDepartment);


            List<int> yearsFromDatabase = new List<int>
            {
                DateTime.Now.Year - 1
            };
            if (_context.Task2.Any())
            {
                foreach (var item in _context.Task2)
                {
                    //if (item.Date.HasValue)
                    //{
                    //    if (!yearsFromDatabase.Contains(item.Date.Value.Year))
                    //    {
                    //        yearsFromDatabase.Add(item.Date.Value.Year);
                    //    }
                    //}
                    if (!yearsFromDatabase.Contains(item.Date.Year))
                    {
                        yearsFromDatabase.Add(item.Date.Year);
                    }
                }
            }
            else
            {
                yearsFromDatabase.Add(DateTime.Now.Year);
            }
            yearsFromDatabase.Sort();
            

            string html = "";
            for (int i = yearsFromDatabase.First(); i <= yearsFromDatabase.Last(); i++)
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
            int year = GetYear(savedYear);

            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int weeks = GetWeeksInYear((int)year);

            int department = GetDepartmentId(savedDepartment);


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
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);
            int department = GetDepartmentId(savedDepartment);

            //days
            List<DateTime> days = getDatesInWeek((int)year, (int)week);

            //culture
            var culture = new CultureInfo("pl-PL");

            //workers
            string workers = "";
            var workersList = _context.Workers2.Where(x => x.DepartmentID == department).OrderBy(x => x.Name);
            foreach (var worker in workersList)
            {
                workers += "<th>" +
                        "<div>" +
                            "<span>" + worker.Surname + " " + worker.Name + "</span>" +
                            "<span>" + _context.Department.FirstOrDefault(x => x.Id == worker.DepartmentID)?.Name + "</span>" +
                        "</div>" +
                    "</th>";
            }

            //days string
            List<Tuple<DateTime, string>> daysANew = new List<Tuple<DateTime, string>>();
            foreach (var day_ in days)
            {
                var holiday = _context.Holiday.Select(x => x.Date.ToShortDateString()).ToList();
                if (holiday.Contains(day_.ToShortDateString()))
                {
                    if (day_.DayOfWeek == DayOfWeek.Sunday)
                    {
                        daysANew.Add(new Tuple<DateTime, string>(day_, "<td><span style=\"color: orangered;\">" + day_.ToString("yyyy-MM-dd") + "</span><br><span style=\"color: orangered;\">" + day_.ToString("ddd", culture) + "</span></td>"));
                    }
                    else
                    {
                        daysANew.Add(new Tuple<DateTime, string>(day_, "<td><span style=\"color: orangered;\">" + day_.ToString("yyyy-MM-dd") + "</span><br><span>" + day_.ToString("ddd", culture) + "</span></td>"));
                    }
                }
                else
                {
                    if (day_.DayOfWeek == DayOfWeek.Sunday)
                    {
                        daysANew.Add(new Tuple<DateTime, string>(day_, "<td><span>" + day_.ToString("yyyy-MM-dd") + "</span><br><span style=\"color: orangered;\">" + day_.ToString("ddd", culture) + "</span></td>"));
                    }
                    else
                    {
                        daysANew.Add(new Tuple<DateTime, string>(day_, "<td><span>" + day_.ToString("yyyy-MM-dd") + "</span><br><span>" + day_.ToString("ddd", culture) + "</span></td>"));
                    }
                }
            }
            daysANew.OrderBy(x => x.Item1);

            //rows
            string tr = "";
            for (int i = 0; i < daysANew.Count(); i++)
            {
                string tdForWorkers = "";
                foreach (var worker in workersList)
                {
                    var taskArray = _context.Task2.Where(x => x.WorkerID == worker.Id);

                    string? tasks = null;
                    string? jobEnter = null;
                    string? jobExit = null;
                    string deleteButton = "";

                    foreach (var task in taskArray)
                    {
                        //if (task.Date.HasValue && task.Date.Value.ToShortDateString() == daysANew[i].Item1.ToShortDateString())
                        //{
                        //    if (task.JobStart.HasValue && task.JobEnd.HasValue)
                        //    {
                        //        jobEnter = task.JobStart.Value.ToString("HH:mm");
                        //        jobExit = task.JobEnd.Value.ToString("HH:mm");
                        //        deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";
                        //    } 

                        //    if (task.TaskNameID != null)
                        //    {
                        //        tasks += "<div class=\"ZslufbFdcfCIeaW\">" +
                        //                "<span>" + _context.TaskName2.FirstOrDefault(x => x.Id == task.TaskNameID && x.DepartmentID == worker.DepartmentID)?.Name + "</span>" +
                        //                "<a onclick=\"aTdCbXqRfUSGyXc(this, " + task.Id + ")\" title=\"Usuń zadanie\"><ion-icon name=\"close\"></ion-icon></a>" +
                        //            "</div>";
                        //    }
                        //}
                        if (task.Date.ToShortDateString() == daysANew[i].Item1.ToShortDateString())
                        {
                            if (task.JobStart.HasValue && task.JobEnd.HasValue)
                            {
                                jobEnter = task.JobStart.Value.ToString("HH:mm");
                                jobExit = task.JobEnd.Value.ToString("HH:mm");
                                deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";
                            }

                            if (task.TaskName != null)
                            {
                                tasks += "<div class=\"ZslufbFdcfCIeaW\">" +
                                        "<span>" + task.TaskName + "</span>" +
                                        "<a onclick=\"aTdCbXqRfUSGyXc(this, " + task.Id + ")\" title=\"Usuń zadanie\"><ion-icon name=\"close\"></ion-icon></a>" +
                                    "</div>";
                            }
                        }
                    }

                    string jobStartInput = "<input type=\"time\" value=\"" + jobEnter + "\" onblur=\"wgddAsHIsXNWQkl(this)\"/>";
                    string jobEndInput = "<input type=\"time\" value=\"" + jobExit + "\" onblur=\"wgddAsHIsXNWQkl(this)\" />";

                    tdForWorkers += "<td worker=\"" + worker.Id + "\">" +
                            "<div class=\"LwxRoYhfmyzTlGm\">" +
                                jobStartInput +
                                "<span>-</span>" +
                                jobEndInput +
                                deleteButton +
                            "</div>" +
                            "<div class=\"AQzCKqmlrQJmxzn\">" +
                                tasks +
                            "</div>" +
                        "</td>";
                }

                tr += "<tr date=\"" + daysANew[i].Item1.ToString("yyyy-MM-dd") + "\">" +
                    daysANew[i].Item2 +
                    tdForWorkers +
                "</tr>";
            }

            //table
            string table = "<table class=\"task_table\" id=\"table\">" +
                    "<thead>" +
                        "<tr>" +
                            "<th id=\"yUTtmGBmFaoGjIS\"></th>" +
                            workers +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                        tr +
                    "</tbody>" +
                "</table>";

            return Json(new { table, week });
        }

        public List<DateTime> getDatesInWeek(int year, int weekOfYear)
        {
            var days = Enumerable.Range(0, 1 + LastDateOfWeekISO8601(year, weekOfYear).Subtract(FirstDateOfWeekISO8601(year, weekOfYear)).Days).Select(x => FirstDateOfWeekISO8601(year, weekOfYear).AddDays(x)).ToList();

            return days;
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

        [HttpPost]
        public ActionResult CopyWorkSchedule(int copyYear, int copyWeek, int destinyYear, int destinyWeek, int department)
        {
            if (destinyWeek != 0)
            {
                if (copyYear == destinyYear && copyWeek == destinyWeek)
                {
                    string removeForm = "$('#vcwaaOrnxVPZpSQ').remove()";
                    string messageDiv = "<div id=\"vcwaaOrnxVPZpSQ\" class=\"pGKcZvErUB pGKcZvErUB_\" style=\"z-index: 999; background-color: rgba(0, 0, 0, 0.4);\">" +
                                            "<form class=\"jbiihcodqinw\">" +
                                                "<span>Docelowy tydzień nie może być równy kopiowanemu!</span>" +
                                                "<div class=\"form-group\">" +
                                                    "<input type=\"button\" value=\"OK\" class=\"btn-custom\" onclick=\"" + removeForm + "\" />" +
                                                "</div>" +
                                            "</form>" +
                                        "</div>";

                    return Json(new { success = false, messageDiv = Content(messageDiv) });
                }
                else
                {
                    var copyDates = getDatesInWeek(copyYear, copyWeek);
                    var destinyDates = getDatesInWeek(destinyYear, destinyWeek);

                    List<Task2> copyArray = new List<Task2>();
                    foreach (var date in copyDates)
                    {
                        foreach (var worker in _context.Workers2)
                        {
                            var workerID = worker.Id;
                            foreach (var task in _context.Task2)
                            {
                                //if (task.Date.HasValue)
                                //{
                                //    if (task.WorkerID == workerID && worker.DepartmentID == department && task.Date.Value.ToShortDateString() == date.ToShortDateString())
                                //    {
                                //        var row = _context.Task2.FirstOrDefault(x => x.Id == task.Id);
                                //        if (row != null)
                                //        {
                                //            copyArray.Add(row);
                                //        }
                                //    }
                                //}
                                if (task.WorkerID == workerID && worker.DepartmentID == department && task.Date.ToShortDateString() == date.ToShortDateString())
                                {
                                    var row = _context.Task2.FirstOrDefault(x => x.Id == task.Id);
                                    if (row != null)
                                    {
                                        copyArray.Add(row);
                                    }
                                }
                            }
                        }
                    }

                    List<Task2> addData = new List<Task2>();

                    foreach (var item in copyArray)
                    {
                        //if (item.Date.HasValue)
                        //{
                        //    foreach (var newDate in destinyDates)
                        //    {
                        //        if (item.Date.Value.DayOfWeek == newDate.DayOfWeek) //dopasuj poniedziałek do poniedziałku, wtorek do wtorku, itd.
                        //        {
                        //            if (item.JobStart != null && item.JobEnd != null)
                        //            {
                        //                string copyTime_jobStart = item.JobStart.Value.ToString("HH:mm");
                        //                string copyTime_jobEnd = item.JobEnd.Value.ToString("HH:mm");

                        //                string jobStart_whole = newDate.ToString("yyyy-MM-dd") + " " + copyTime_jobStart;
                        //                string jobEnd_whole = newDate.ToString("yyyy-MM-dd") + " " + copyTime_jobEnd;

                        //                DateTime start = DateTime.ParseExact(jobStart_whole, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);
                        //                DateTime end = DateTime.ParseExact(jobEnd_whole, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);

                        //                var newData = new Task2()
                        //                {
                        //                    WorkerID = item.WorkerID,
                        //                    TaskNameID = item.TaskNameID,
                        //                    Date = newDate.Date,
                        //                    JobStart = start,
                        //                    JobEnd = end
                        //                };

                        //                addData.Add(newData);
                        //            }
                        //            else
                        //            {
                        //                var newData = new Task2()
                        //                {
                        //                    WorkerID = item.WorkerID,
                        //                    TaskNameID = item.TaskNameID,
                        //                    Date = newDate.Date,
                        //                    JobStart = null,
                        //                    JobEnd = null
                        //                };

                        //                addData.Add(newData);
                        //            }
                        //        }
                        //    }
                        //}
                        foreach (var newDate in destinyDates)
                        {
                            if (item.Date.DayOfWeek == newDate.DayOfWeek) //dopasuj poniedziałek do poniedziałku, wtorek do wtorku, itd.
                            {
                                if (item.JobStart != null && item.JobEnd != null)
                                {
                                    string copyTime_jobStart = item.JobStart.Value.ToString("HH:mm");
                                    string copyTime_jobEnd = item.JobEnd.Value.ToString("HH:mm");

                                    string jobStart_whole = newDate.ToString("yyyy-MM-dd") + " " + copyTime_jobStart;
                                    string jobEnd_whole = newDate.ToString("yyyy-MM-dd") + " " + copyTime_jobEnd;

                                    DateTime start = DateTime.ParseExact(jobStart_whole, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);
                                    DateTime end = DateTime.ParseExact(jobEnd_whole, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);

                                    var newData = new Task2()
                                    {
                                        WorkerID = item.WorkerID,
                                        TaskName = item.TaskName,
                                        Date = newDate.Date,
                                        JobStart = start,
                                        JobEnd = end
                                    };

                                    addData.Add(newData);
                                }
                                else
                                {
                                    var newData = new Task2()
                                    {
                                        WorkerID = item.WorkerID,
                                        TaskName = item.TaskName,
                                        Date = newDate.Date,
                                        JobStart = null,
                                        JobEnd = null
                                    };

                                    addData.Add(newData);
                                }
                            }
                        }
                    }

                    //sprawdz czy daty z destinyWeek nie istnieją w bazie
                    bool check = false;
                    if (addData.Any())
                    {
                        foreach (var row in addData)
                        {
                            foreach (var item in _context.Task2)
                            {
                                //if (row.Date.HasValue && item.Date.HasValue)
                                //{
                                //    if (row.Date.Value.ToShortDateString() == item.Date.Value.ToShortDateString() && row.WorkerID == item.WorkerID)
                                //    {
                                //        string removeForm = "$('#CDGkkjRFIPzoATj').remove()";
                                //        string messageDiv = "<div id=\"CDGkkjRFIPzoATj\" class=\"pGKcZvErUB pGKcZvErUB_\" style=\"z-index: 999; background-color: rgba(0, 0, 0, 0.4);\">" +
                                //                                "<form class=\"jbiihcodqinw\">" +
                                //                                    "<span>Grafik z docelowego tygodnia musi być pusty, aby kontynuować!</span>" +
                                //                                    "<div class=\"form-group\">" +
                                //                                        "<input type=\"button\" value=\"OK\" class=\"btn-custom\" onclick=\"" + removeForm + "\" />" +
                                //                                    "</div>" +
                                //                                "</form>" +
                                //                            "</div>";

                                //        return Json(new { success = false, messageDiv = Content(messageDiv) });
                                //    }
                                //    else
                                //    {
                                //        check = true;
                                //    }
                                //}
                                if (row.Date.ToShortDateString() == item.Date.ToShortDateString() && row.WorkerID == item.WorkerID)
                                {
                                    string removeForm = "$('#CDGkkjRFIPzoATj').remove()";
                                    string messageDiv = "<div id=\"CDGkkjRFIPzoATj\" class=\"pGKcZvErUB pGKcZvErUB_\" style=\"z-index: 999; background-color: rgba(0, 0, 0, 0.4);\">" +
                                                            "<form class=\"jbiihcodqinw\">" +
                                                                "<span>Grafik z docelowego tygodnia musi być pusty, aby kontynuować!</span>" +
                                                                "<div class=\"form-group\">" +
                                                                    "<input type=\"button\" value=\"OK\" class=\"btn-custom\" onclick=\"" + removeForm + "\" />" +
                                                                "</div>" +
                                                            "</form>" +
                                                        "</div>";

                                    return Json(new { success = false, messageDiv = Content(messageDiv) });
                                }
                                else
                                {
                                    check = true;
                                }
                            }
                        }
                    }
                    else
                    {
                        string removeForm = "$('#CDGkkjRFIPzoATj').remove()";
                        string messageDiv = "<div id=\"CDGkkjRFIPzoATj\" class=\"pGKcZvErUB pGKcZvErUB_\" style=\"z-index: 999; background-color: rgba(0, 0, 0, 0.4);\">" +
                                                "<form class=\"jbiihcodqinw\">" +
                                                    "<span>Kopiowany grafik jest pusty!</span>" +
                                                    "<div class=\"form-group\">" +
                                                        "<input type=\"button\" value=\"OK\" class=\"btn-custom\" onclick=\"" + removeForm + "\" />" +
                                                    "</div>" +
                                                "</form>" +
                                            "</div>";

                        return Json(new { success = false, messageDiv = Content(messageDiv) });
                    }

                    //

                    if (check)
                    {
                        string removeForm = "$('#JXhDXOLmxsWkFon').remove()";
                        string messageDiv = "<div id=\"JXhDXOLmxsWkFon\" class=\"pGKcZvErUB pGKcZvErUB_\" style=\"z-index: 999; background-color: rgba(0, 0, 0, 0.4);\">" +
                                                "<form class=\"jbiihcodqinw\">" +
                                                    "<span>Kopiowanie zakończone!</span>" +
                                                    "<div class=\"form-group\">" +
                                                        "<input type=\"button\" value=\"OK\" class=\"btn-custom\" onclick=\"" + removeForm + "\" />" +
                                                    "</div>" +
                                                "</form>" +
                                            "</div>";

                        foreach (var row in addData)
                        {
                            _context.Task2.Add(row);
                            _context.SaveChanges();

                            if (row.Equals(addData.Last()))
                            {
                                return Json(new { success = true, messageDiv = Content(messageDiv) });
                            }
                        }
                    }
                }
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult CopyWorkScheduleForm(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;


            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);
            int department = GetDepartmentId(savedDepartment);


            List<int> yearsFromDatabase = new List<int>
            {
                DateTime.Now.Year - 1
            };
            if (_context.Task2.Any())
            {
                foreach (var item in _context.Task2)
                {
                    //if (item.Date.HasValue)
                    //{
                    //    if (!yearsFromDatabase.Contains(item.Date.Value.Year))
                    //    {
                    //        yearsFromDatabase.Add(item.Date.Value.Year);
                    //    }
                    //}
                    if (!yearsFromDatabase.Contains(item.Date.Year))
                    {
                        yearsFromDatabase.Add(item.Date.Year);
                    }
                }
            }
            else
            {
                yearsFromDatabase.Add(DateTime.Now.Year);
            }
            yearsFromDatabase.Sort();


            string yearOptions = "";
            for (int i = yearsFromDatabase.First(); i <= yearsFromDatabase.Last(); i++)
            {
                if (savedYear != null)
                {
                    if (savedYear == i)
                    {
                        yearOptions += "<option selected>" + i + "</option>";
                    }
                    else
                    {
                        yearOptions += "<option>" + i + "</option>";
                    }
                }
                else
                {
                    if (DateTime.Now.Year == i)
                    {
                        yearOptions += "<option selected>" + i + "</option>";
                    }
                    else
                    {
                        yearOptions += "<option>" + i + "</option>";
                    }
                }
            }

            int weeks = GetWeeksInYear((int)year);
            string weekOptions = "";
            for (int i = 1; i <= weeks; i++)
            {
                if (savedWeek != null)
                {
                    if (i == savedWeek)
                    {
                        weekOptions += "<option selected>" + i + "</option>";
                    }
                    else
                    {
                        weekOptions += "<option>" + i + "</option>";
                    }
                }
                else
                {
                    if (i == GetCurrentWeek((int)year, month, day) + 1)
                    {
                        weekOptions += "<option selected>" + i + "</option>";
                    }
                    else
                    {
                        weekOptions += "<option>" + i + "</option>";
                    }
                }
            }

            string simpleWeeks = "<option selected disabled>-</option>";
            for (int i = 1; i <= weeks; i++)
            {
                simpleWeeks += "<option>" + i + "</option>";
            }


            string? departmentName = _context.Department.FirstOrDefault(x => x.Id == department)?.Name;

            string removeForm = "$('#pwFBWqdAoChTxAb').remove()";

            string form = "<div id=\"pwFBWqdAoChTxAb\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Kopiowany tydzień:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"ahTFhNgePFSjraf\">" +
                                yearOptions +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"KEYeauHuNLZPWCy\">" +
                                weekOptions +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<ion-icon name=\"arrow-down-outline\" class=\"fuRbuXSaYHCrfuV\"></ion-icon>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Docelowy tydzień:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"EGeBKVhjMnvAsVQ\">" +
                                yearOptions +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin2\">" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"zDthMDvUyTtutDb\" onchange=\"uOKeZlFghfhXJzQ(this)\">" +
                                simpleWeeks +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input disabled type=\"button\" value=\"Kopiuj grafik (" + departmentName + ")\" class=\"btn-custom\" onclick=\"VHWnkLNgLFRzozC(" + department + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult ClickOnDepartment(int? savedYear, int? savedWeek, int departmentID)
        {
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);           

            var departmentName = _context.Department.FirstOrDefault(x => x.Id == departmentID)?.Name;
            if (departmentName == null)
            {
                departmentName = _context.Department.OrderBy(x => x.Name).FirstOrDefault()?.Name;
            }

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
                            tasks += "<div class=\"YgYDRNgkzyxgztO\" id=\"ekzMacYlAMvOgoy__\">" +
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
                            tasks += "<div class=\"YgYDRNgkzyxgztO\" id=\"ekzMacYlAMvOgoy__\">" +
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

            return Json(false);
        }

        //[HttpPost]
        //public ActionResult AddTasks(int workerID, int? taskNameID, DateTime? date, DateTime? jobStart, DateTime? jobEnd)
        //{
        //    var newData = new Task2()
        //    {
        //        WorkerID = workerID,
        //        TaskNameID = taskNameID,
        //        Date = date,
        //        JobStart = jobStart,
        //        JobEnd = jobEnd
        //    };

        //    _context.Task2.Add(newData);
        //    _context.SaveChanges();
        //    return Json(newData.Id);
        //}
        [HttpPost]
        public ActionResult AddTasks(int workerID, string? taskName, DateTime date, DateTime? jobStart, DateTime? jobEnd)
        {
            var newData = new Task2()
            {
                WorkerID = workerID,
                TaskName = taskName,
                Date = date,
                JobStart = jobStart,
                JobEnd = jobEnd
            };

            _context.Task2.Add(newData);
            _context.SaveChanges();
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

        //[HttpPost]
        //public ActionResult EditTask(int id, int? taskNameID, DateTime? jobStart, DateTime? jobEnd)
        //{
        //    var row = _context.Task2.FirstOrDefault(e => e.Id == id);
        //    if (row != null)
        //    {
        //        row.TaskNameID = taskNameID;
        //        row.JobStart = jobStart;
        //        row.JobEnd = jobEnd;
        //        _context.SaveChanges();

        //        return Json(new { success = true });
        //    }

        //    return Json(new { success = false });
        //}
        [HttpPost]
        public ActionResult EditTask(int id, string? taskName, DateTime? jobStart, DateTime? jobEnd)
        {
            var row = _context.Task2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.TaskName = taskName;
                row.JobStart = jobStart;
                row.JobEnd = jobEnd;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        //[HttpPost]
        //public ActionResult AddTask_(int workerId, int? taskNameId, DateTime dateTime, TimeOnly? jobStart, TimeOnly? jobEnd, int numberOfElements)
        //{
        //    DateTime? start = null;
        //    DateTime? exit = null;
        //    if (jobStart != null)
        //        start = MergeDateAndTime(dateTime, jobStart);
        //    if (jobEnd != null)
        //        exit = MergeDateAndTime(dateTime, jobEnd);

        //    var taskName = _context.TaskName2.FirstOrDefault(x => x.Id == taskNameId)?.Name;

        //    var taskArray = _context.Task2.Where(x => x.WorkerID == workerId).OrderBy(x => x.Id);

        //    if (taskArray.Any())
        //    {
        //        if (numberOfElements > 0)
        //        {
        //            foreach (var item in taskArray)
        //            {
        //                if (item.Date.HasValue)
        //                {
        //                    if (item.Date.Value.ToShortDateString() == dateTime.ToShortDateString())
        //                    {
        //                        // add
        //                        var newData = new Task2()
        //                        {
        //                            WorkerID = workerId,
        //                            TaskNameID = taskNameId,
        //                            Date = dateTime,
        //                            JobStart = start,
        //                            JobEnd = exit,
        //                        };

        //                        _context.Task2.Add(newData);
        //                        _context.SaveChanges();

        //                        return Json(new { id = newData.Id, taskName });
        //                    }
        //                }
        //            }
        //        }
        //        else
        //        {
        //            if (!taskArray.Select(x => x.Date).Contains(dateTime))
        //            {
        //                // add
        //                var newData = new Task2()
        //                {
        //                    WorkerID = workerId,
        //                    TaskNameID = taskNameId,
        //                    Date = dateTime,
        //                    JobStart = start,
        //                    JobEnd = exit,
        //                };

        //                _context.Task2.Add(newData);
        //                _context.SaveChanges();

        //                return Json(new { id = newData.Id, taskName });
        //            }
        //            else
        //            {
        //                foreach (var item in taskArray)
        //                {
        //                    if (item.Date.HasValue)
        //                    {
        //                        if (item.Date.Value.ToShortDateString() == dateTime.ToShortDateString())
        //                        {
        //                            // edit
        //                            var row = _context.Task2.FirstOrDefault(e => e.Id == item.Id);
        //                            if (row != null)
        //                            {
        //                                row.TaskNameID = taskNameId;
        //                                _context.SaveChanges();

        //                                return Json(new { id = item.Id, taskName });
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    else
        //    {
        //        // add
        //        var newData = new Task2()
        //        {
        //            WorkerID = workerId,
        //            TaskNameID = taskNameId,
        //            Date = dateTime,
        //            JobStart = start,
        //            JobEnd = exit
        //        };

        //        _context.Task2.Add(newData);
        //        _context.SaveChanges();

        //        return Json(new { id = newData.Id, taskName });
        //    }

        //    return Json(false);
        //}
        [HttpPost]
        public ActionResult AddTask_(int workerId, int taskNameId, DateTime dateTime, TimeOnly? jobStart, TimeOnly? jobEnd, int numberOfElements)
        {
            DateTime? start = null;
            DateTime? exit = null;
            if (jobStart != null)
                start = MergeDateAndTime(dateTime, jobStart);
            if (jobEnd != null)
                exit = MergeDateAndTime(dateTime, jobEnd);

            var taskName = _context.TaskName2.FirstOrDefault(x => x.Id == taskNameId)?.Name;

            var taskArray = _context.Task2.Where(x => x.WorkerID == workerId).OrderBy(x => x.Id);

            if (taskArray.Any())
            {
                if (numberOfElements > 0)
                {
                    foreach (var item in taskArray)
                    {
                        if (item.Date.ToShortDateString() == dateTime.ToShortDateString())
                        {
                            // add
                            var newData = new Task2()
                            {
                                WorkerID = workerId,
                                TaskName = taskName,
                                Date = dateTime,
                                JobStart = start,
                                JobEnd = exit,
                            };

                            _context.Task2.Add(newData);
                            _context.SaveChanges();

                            return Json(new { id = newData.Id, taskName });
                        }
                    }
                }
                else
                {
                    if (!taskArray.Select(x => x.Date).Contains(dateTime))
                    {
                        // add
                        var newData = new Task2()
                        {
                            WorkerID = workerId,
                            TaskName = taskName,
                            Date = dateTime,
                            JobStart = start,
                            JobEnd = exit,
                        };

                        _context.Task2.Add(newData);
                        _context.SaveChanges();

                        return Json(new { id = newData.Id, taskName });
                    }
                    else
                    {
                        foreach (var item in taskArray)
                        {
                            if (item.Date.ToShortDateString() == dateTime.ToShortDateString())
                            {
                                // edit
                                var row = _context.Task2.FirstOrDefault(e => e.Id == item.Id);
                                if (row != null)
                                {
                                    row.TaskName = taskName;
                                    _context.SaveChanges();

                                    return Json(new { id = item.Id, taskName });
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                // add
                var newData = new Task2()
                {
                    WorkerID = workerId,
                    TaskName = taskName,
                    Date = dateTime,
                    JobStart = start,
                    JobEnd = exit
                };

                _context.Task2.Add(newData);
                _context.SaveChanges();

                return Json(new { id = newData.Id, taskName });
            }

            return Json(false);
        }

        [HttpPost]
        public ActionResult DeleteOrEditTask_Time(int workerID, DateTime date, List<int> arrayOfIds)
        {
            //czzROjFaPsDoZoT

            int numberOfElements_ = arrayOfIds.Count();
            if (numberOfElements_ > 0) //foreach item set jobStart and jobEnd to NULL
            {
                foreach (int id_ in arrayOfIds.OrderBy(x => x))
                {
                    var row = _context.Task2.FirstOrDefault(e => e.Id == id_);
                    if (row != null)
                    {
                        row.JobStart = null;
                        row.JobEnd = null;
                        _context.SaveChanges();
                    }

                    if (id_.Equals(arrayOfIds.Last()))
                    {
                        return Json(new { success = true });
                    }
                }
            }
            else //find id using workerID and Date, remove row
            {
                var taskArray = _context.Task2.Where(x => x.WorkerID == workerID).OrderBy(x => x.Id);
                foreach (var task in taskArray)
                {
                    //if (task.Date.HasValue)
                    //{
                    //    if (task.Date.Value.ToShortDateString() == date.ToShortDateString() && task.WorkerID == workerID)
                    //    {
                    //        var row = _context.Task2.FirstOrDefault(e => e.Id == task.Id);
                    //        if (row != null)
                    //        {
                    //            _context.Task2.Remove(row);
                    //            _context.SaveChanges();
                    //        }

                    //        return Json(new { success = true });
                    //    }
                    //}
                    if (task.Date.ToShortDateString() == date.ToShortDateString() && task.WorkerID == workerID)
                    {
                        var row = _context.Task2.FirstOrDefault(e => e.Id == task.Id);
                        if (row != null)
                        {
                            _context.Task2.Remove(row);
                            _context.SaveChanges();
                        }

                        return Json(new { success = true });
                    }
                }
            }

            return Json(false);
        }

        //[HttpPost]
        //public ActionResult DeleteOrEditTask_Task(int id, int numberOfElements)
        //{
        //    //aTdCbXqRfUSGyXc

        //    if (numberOfElements > 0)
        //    {
        //        if (numberOfElements > 1) //remove row
        //        {
        //            var row = _context.Task2.FirstOrDefault(e => e.Id == id);
        //            if (row != null)
        //            {
        //                _context.Task2.Remove(row);
        //                _context.SaveChanges();

        //                return Json(new { success = true });
        //            }
        //        }
        //        else
        //        {
        //            var row = _context.Task2.FirstOrDefault(e => e.Id == id);
        //            if (row != null)
        //            {
        //                if (row.JobStart == null && row.JobEnd == null) //remove row
        //                {
        //                    _context.Task2.Remove(row);
        //                    _context.SaveChanges();

        //                    return Json(new { success = true });
        //                }
        //                if (row.JobStart != null && row.JobEnd != null) //edit taskNameId into NULL
        //                {
        //                    row.TaskNameID = null;
        //                    _context.SaveChanges();

        //                    return Json(new { success = true });
        //                }
        //            }
        //        }
        //    }

        //    return Json(false);
        //}

        [HttpPost]
        public ActionResult DeleteOrEditTask_Task(int id, int numberOfElements)
        {
            //aTdCbXqRfUSGyXc

            if (numberOfElements > 0)
            {
                if (numberOfElements > 1) //remove row
                {
                    var row = _context.Task2.FirstOrDefault(e => e.Id == id);
                    if (row != null)
                    {
                        _context.Task2.Remove(row);
                        _context.SaveChanges();

                        return Json(new { success = true });
                    }
                }
                else
                {
                    var row = _context.Task2.FirstOrDefault(e => e.Id == id);
                    if (row != null)
                    {
                        if (row.JobStart == null && row.JobEnd == null) //remove row
                        {
                            _context.Task2.Remove(row);
                            _context.SaveChanges();

                            return Json(new { success = true });
                        }
                        if (row.JobStart != null && row.JobEnd != null) //edit taskNameId into NULL
                        {
                            row.TaskName = null;
                            _context.SaveChanges();

                            return Json(new { success = true });
                        }
                    }
                }
            }

            return Json(false);
        }

        //[HttpPost]
        //public ActionResult AddOrEditTime(int workerID, DateTime date, List<int> arrayOfIds, TimeOnly? jobStart, TimeOnly? jobEnd)
        //{
        //    if (jobStart != null && jobEnd != null)
        //    {
        //        int numberOfElements_ = arrayOfIds.Count();
        //        if (numberOfElements_ > 0)
        //        {
        //            foreach (int id_ in arrayOfIds.OrderBy(x => x))
        //            {
        //                var row = _context.Task2.FirstOrDefault(e => e.Id == id_);
        //                if (row != null)
        //                {
        //                    if (row.JobStart.HasValue && row.JobEnd.HasValue) //wypelnione jobStart i jobEnd, taski są
        //                    {
        //                        if (row.JobStart.Value.ToShortTimeString() != jobStart.Value.ToShortTimeString() || row.JobEnd.Value.ToShortTimeString() != jobEnd.Value.ToShortTimeString())
        //                        {
        //                            DateTime? start = MergeDateAndTime(date, jobStart);
        //                            DateTime? exit = MergeDateAndTime(date, jobEnd);

        //                            row.JobStart = start;
        //                            row.JobEnd = exit;
        //                            _context.SaveChanges();

        //                            if (row.Id.Equals(arrayOfIds.Last()))
        //                            {
        //                                return Json(new { success = true, addButton = false });
        //                            }
        //                        }
        //                    }
        //                    if (!row.JobStart.HasValue && !row.JobEnd.HasValue) //puste jobStart i jobEnd, taski są
        //                    {
        //                        DateTime? start = MergeDateAndTime(date, jobStart);
        //                        DateTime? exit = MergeDateAndTime(date, jobEnd);

        //                        row.JobStart = start;
        //                        row.JobEnd = exit;
        //                        _context.SaveChanges();

        //                        string deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";

        //                        if (row.Id.Equals(arrayOfIds.Last()))
        //                        {
        //                            return Json(new { success = true, addButton = true, contentResult = Content(deleteButton) });
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //        else
        //        {
        //            if (_context.Task2.Select(x => x.WorkerID).Contains(workerID))
        //            {
        //                var taskArray = _context.Task2.Where(x => x.WorkerID == workerID).OrderBy(x => x.Id);

        //                if (!taskArray.Select(x => x.Date).Contains(date)) //worker już w bazie, pusty dzien
        //                {
        //                    DateTime? start = MergeDateAndTime(date, jobStart);
        //                    DateTime? exit = MergeDateAndTime(date, jobEnd);

        //                    var newData = new Task2()
        //                    {
        //                        WorkerID = workerID,
        //                        TaskNameID = null,
        //                        Date = date,
        //                        JobStart = start,
        //                        JobEnd = exit
        //                    };

        //                    _context.Task2.Add(newData);
        //                    _context.SaveChanges();
        //                    string deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";

        //                    return Json(new { success = true, addButton = true, contentResult = Content(deleteButton) });
        //                }
        //                else
        //                {
        //                    foreach (var task in taskArray)
        //                    {
        //                        if (task.Date.HasValue)
        //                        {
        //                            if (task.Date.Value.ToShortDateString() == date.ToShortDateString())
        //                            {
        //                                if (task.JobStart.HasValue && task.JobEnd.HasValue)
        //                                {
        //                                    if (task?.JobStart.Value != null && task?.JobEnd.Value != null)
        //                                    {
        //                                        if (task.JobStart.Value.ToShortTimeString() != jobStart.Value.ToShortTimeString() || task.JobEnd.Value.ToShortTimeString() != jobEnd.Value.ToShortTimeString())
        //                                        {
        //                                            //worker już w bazie, godzina tez, taski nie
        //                                            var row = _context.Task2.FirstOrDefault(e => e.Id == task.Id);
        //                                            if (row != null)
        //                                            {
        //                                                DateTime? start = MergeDateAndTime(date, jobStart);
        //                                                DateTime? exit = MergeDateAndTime(date, jobEnd);

        //                                                row.JobStart = start;
        //                                                row.JobEnd = exit;
        //                                                _context.SaveChanges();

        //                                                return Json(new { success = true, addButton = false });
        //                                            }
        //                                        }
        //                                    }
        //                                }
        //                            }
        //                        }
        //                    }
        //                }
        //            }
        //            else //add
        //            {
        //                DateTime? start = MergeDateAndTime(date, jobStart);
        //                DateTime? exit = MergeDateAndTime(date, jobEnd);

        //                var newData = new Task2()
        //                {
        //                    WorkerID = workerID,
        //                    TaskNameID = null,
        //                    Date = date,
        //                    JobStart = start,
        //                    JobEnd = exit
        //                };

        //                _context.Task2.Add(newData);
        //                _context.SaveChanges();
        //                string deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";

        //                return Json(new { success = true, addButton = true, contentResult = Content(deleteButton) });
        //            }
        //        }
        //    }         

        //    return Json(new { success = false, addButton = false });
        //}

        [HttpPost]
        public ActionResult AddOrEditTime(int workerID, DateTime date, List<int> arrayOfIds, TimeOnly? jobStart, TimeOnly? jobEnd)
        {
            if (jobStart != null && jobEnd != null)
            {
                int numberOfElements_ = arrayOfIds.Count();
                if (numberOfElements_ > 0)
                {
                    foreach (int id_ in arrayOfIds.OrderBy(x => x))
                    {
                        var row = _context.Task2.FirstOrDefault(e => e.Id == id_);
                        if (row != null)
                        {
                            if (row.JobStart.HasValue && row.JobEnd.HasValue) //wypelnione jobStart i jobEnd, taski są
                            {
                                if (row.JobStart.Value.ToShortTimeString() != jobStart.Value.ToShortTimeString() || row.JobEnd.Value.ToShortTimeString() != jobEnd.Value.ToShortTimeString())
                                {
                                    DateTime? start = MergeDateAndTime(date, jobStart);
                                    DateTime? exit = MergeDateAndTime(date, jobEnd);

                                    row.JobStart = start;
                                    row.JobEnd = exit;
                                    _context.SaveChanges();

                                    if (row.Id.Equals(arrayOfIds.Last()))
                                    {
                                        return Json(new { success = true, addButton = false });
                                    }
                                }
                            }
                            if (!row.JobStart.HasValue && !row.JobEnd.HasValue) //puste jobStart i jobEnd, taski są
                            {
                                DateTime? start = MergeDateAndTime(date, jobStart);
                                DateTime? exit = MergeDateAndTime(date, jobEnd);

                                row.JobStart = start;
                                row.JobEnd = exit;
                                _context.SaveChanges();

                                string deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";

                                if (row.Id.Equals(arrayOfIds.Last()))
                                {
                                    return Json(new { success = true, addButton = true, contentResult = Content(deleteButton) });
                                }
                            }
                        }
                    }
                }
                else
                {
                    if (_context.Task2.Select(x => x.WorkerID).Contains(workerID))
                    {
                        var taskArray = _context.Task2.Where(x => x.WorkerID == workerID).OrderBy(x => x.Id);

                        if (!taskArray.Select(x => x.Date).Contains(date)) //worker już w bazie, pusty dzien
                        {
                            DateTime? start = MergeDateAndTime(date, jobStart);
                            DateTime? exit = MergeDateAndTime(date, jobEnd);

                            var newData = new Task2()
                            {
                                WorkerID = workerID,
                                TaskName = null,
                                Date = date,
                                JobStart = start,
                                JobEnd = exit
                            };

                            _context.Task2.Add(newData);
                            _context.SaveChanges();
                            string deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";

                            return Json(new { success = true, addButton = true, contentResult = Content(deleteButton) });
                        }
                        else
                        {
                            foreach (var task in taskArray)
                            {
                                if (task.Date.ToShortDateString() == date.ToShortDateString())
                                {
                                    if (task.JobStart.HasValue && task.JobEnd.HasValue)
                                    {
                                        if (task?.JobStart.Value != null && task?.JobEnd.Value != null)
                                        {
                                            if (task.JobStart.Value.ToShortTimeString() != jobStart.Value.ToShortTimeString() || task.JobEnd.Value.ToShortTimeString() != jobEnd.Value.ToShortTimeString())
                                            {
                                                //worker już w bazie, godzina tez, taski nie
                                                var row = _context.Task2.FirstOrDefault(e => e.Id == task.Id);
                                                if (row != null)
                                                {
                                                    DateTime? start = MergeDateAndTime(date, jobStart);
                                                    DateTime? exit = MergeDateAndTime(date, jobEnd);

                                                    row.JobStart = start;
                                                    row.JobEnd = exit;
                                                    _context.SaveChanges();

                                                    return Json(new { success = true, addButton = false });
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else //add
                    {
                        DateTime? start = MergeDateAndTime(date, jobStart);
                        DateTime? exit = MergeDateAndTime(date, jobEnd);

                        var newData = new Task2()
                        {
                            WorkerID = workerID,
                            TaskName = null,
                            Date = date,
                            JobStart = start,
                            JobEnd = exit
                        };

                        _context.Task2.Add(newData);
                        _context.SaveChanges();
                        string deleteButton = "<a class=\"MNewKOhqZkqNDeJ\" onclick=\"czzROjFaPsDoZoT(this)\" title=\"Usuń godziny\"><ion-icon name=\"close\"></ion-icon></a>";

                        return Json(new { success = true, addButton = true, contentResult = Content(deleteButton) });
                    }
                }
            }

            return Json(new { success = false, addButton = false });
        }

        public DateTime MergeDateAndTime(DateTime date, TimeOnly? time)
        {
            string timeString = "00:00";
            if (time != null)
            {
                timeString = time.Value.ToString("HH:mm");
            }

            string e = date.ToString("yyyy-MM-dd") + " " + timeString;
            DateTime dateTime = DateTime.ParseExact(e, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);

            return dateTime;
        }

        [HttpGet]
        public ActionResult DownloadTableForm(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);
            int department = GetDepartmentId(savedDepartment);

            string removeForm = "$('#FIfodjZXcJQcAEE').remove()";

            string form = "<div id=\"FIfodjZXcJQcAEE\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Pobierz PDF\" class=\"btn-download\" onclick=\"WfIEscZTJsEAoiw(" + year + "," + week + "," + department + ")\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Pobierz Excel\" class=\"btn-download\" onclick=\"uWpiumqJEoBHQnr(" + year + "," + week + "," + department + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult CreateTableToDownload(int year, int week, int department)
        {
            var culture = new CultureInfo("pl-PL");
            List<DateTime> days = getDatesInWeek((int)year, (int)week);
            var departmentName = _context.Department.FirstOrDefault(x => x.Id == department)?.Name;

            string workers = "<th>" + departmentName + "</th>";
            var workersList = _context.Workers2.Where(x => x.DepartmentID == department).OrderBy(x => x.Name).ToList();
            foreach (var worker in workersList)
            {
                workers += "<th>" + worker.Surname + " " + worker.Name + "</th>";
            }

            List<Tuple<DateTime, string>> daysANew = new List<Tuple<DateTime, string>>();
            foreach (var day_ in days)
            {
                var holiday = _context.Holiday.Select(x => x.Date.ToShortDateString()).ToList();
                if (holiday.Contains(day_.ToShortDateString()) || day_.DayOfWeek == DayOfWeek.Sunday)
                {
                    daysANew.Add(new Tuple<DateTime, string>(day_, "<span style=\"color: red;\">" + day_.ToString("yyyy-MM-dd") + " (" + day_.ToString("ddd") + ")</span>"));
                }
                else
                {
                    daysANew.Add(new Tuple<DateTime, string>(day_, "<span>" + day_.ToString("yyyy-MM-dd") + " (" + day_.ToString("ddd") + ")</span>"));
                }
            }
            daysANew.OrderBy(x => x.Item1);

            string tr = "";
            List<int> highestNumbers = new List<int>();
            //List<Task2> lista = new List<Task2>();
            List<int> ids = new List<int>();

            foreach (var day in daysANew)
            {
                int rowspan = 0;
                tr += "<tr>";
                foreach (var worker in workersList)
                {
                    int count = 0;

                    var taskArray = _context.Task2.Where(x => x.WorkerID == worker.Id);
                    foreach (var task in taskArray)
                    {
                        //if (task.Date.HasValue && task.Date.Value.ToShortDateString() == day.Item1.ToShortDateString())
                        //{
                        //    if (task.TaskNameID != null)
                        //    {
                        //        count++;
                        //        //lista.Add(task);
                        //        ids.Add(task.Id);
                        //    }
                        //}
                        if (task.Date.ToShortDateString() == day.Item1.ToShortDateString())
                        {
                            if (task.TaskName != null)
                            {
                                count++;
                                //lista.Add(task);
                                ids.Add(task.Id);
                            }
                        }
                    }
                    highestNumbers.Add(count);
                }
                rowspan = highestNumbers.Max() + 1;

                tr += "<td rowspan=\"" + rowspan + "\" class=\"dates\">" + day.Item2 + "</td>";

                foreach (var worker in workersList)
                {
                    var tasks = _context.Task2.Where(x => x.WorkerID == worker.Id);
                    foreach (var task in tasks)
                    {
                        //if (task.Date.HasValue && task.Date.Value.ToShortDateString() == day.Item1.ToShortDateString()) // && task.JobStart.HasValue && task.JobEnd.HasValue
                        //{
                        //    if (task.JobStart.HasValue && task.JobEnd.HasValue)
                        //    {
                        //        tr += "<td class=\"hours\">" + task.JobStart.Value.ToString("HH:mm") + " - " + task.JobEnd.Value.ToString("HH:mm") + "</td>";
                        //    }
                        //    else
                        //    {
                        //        tr += "<td class=\"hours\"></td>";
                        //    }

                        //    break;
                        //}
                        if (task.Date.ToShortDateString() == day.Item1.ToShortDateString()) // && task.JobStart.HasValue && task.JobEnd.HasValue
                        {
                            if (task.JobStart.HasValue && task.JobEnd.HasValue)
                            {
                                tr += "<td class=\"hours\">" + task.JobStart.Value.ToString("HH:mm") + " - " + task.JobEnd.Value.ToString("HH:mm") + "</td>";
                            }
                            else
                            {
                                tr += "<td class=\"hours\"></td>";
                            }

                            break;
                        }
                    }
                }
                tr += "</tr>";

                for (int i = 1; i < rowspan; i++)
                {
                    tr += "<tr class=\"tasks\">";
                    foreach (var worker in workersList)
                    {
                        tr += "<td id=\"nolCEYewpEzatms\" ySTSTxoKQmeigkh=\"" + day.Item1.ToString("yyyy-MM-dd") + "\" hQexneNrZZNwiTZ=\"" + worker.Id + "\"></td>";
                    }
                    tr += "</tr>";
                }

                //lista.Clear();
            }

            string table = "<table id=\"tableToDownloadId\">" +
                                "<thead>" +
                                    "<tr>" +
                                        workers +
                                    "</tr>" +
                                "</thead>" +
                                "<tbody>" +
                                tr +
                                "</tbody>" +
                            "</table>";

            string html = "<div class=\"tableBody\" id=\"block\" style=\"\">" + //display: none;
                                table +
                                "<a id=\"dlink\" style=\"display:none;\"></a>" +
                                "<input type=\"button\" onclick=\"OvdYNubWPJBjNuP()\" value=\"Populate cells\" />" +
                                "<input type=\"button\" onclick=\"$('#block').remove()\" value=\"Zamknij\" />" +
                            "</div>";

            if (workers.Length > 0)
            {
                return Json(new { contentResult = Content(html), departmentName, week, year, ids });
            }

            return Json(false);
        }

        [HttpGet]
        public ActionResult FillTasks(int id) //DateTime date, int worker, int task //List<int> ids_array
        {
            
            
            return Json(false);
        }

        [HttpGet]
        public ActionResult OtherSettingsForm(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);
            int department = GetDepartmentId(savedDepartment);

            var departmentName = _context.Department.FirstOrDefault(x => x.Id == department)?.Name;

            string removeForm = "$('#FMnrCopWCecUjag').remove()";

            string form = "<div id=\"FMnrCopWCecUjag\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group-margin\">" +
                            "<label>Dział:</label>" +
                            "<input type=\"text\" value=\"" + departmentName + "\" class=\"form-control\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Ustaw godziny dla wszystkich dla wybranego tygodnia\" class=\"btn-download tFlGIOwtMalkfgS\" onclick=\"KknXAduygEtFJvn()\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Ustaw zadanie dla wszystkich dla wybranego tygodnia\" class=\"btn-download tFlGIOwtMalkfgS\" onclick=\"USnvJSnvkJlVGaA()\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<a href=\"/Tasks/Settings\" type=\"button\" class=\"btn-download tFlGIOwtMalkfgS WguSTckZVkExEBx\">Przejdź do głównych ustawień</a>" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult AssignHoursForAllForm(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);
            int department = GetDepartmentId(savedDepartment);

            string removeForm = "$('#leJHkkOjgbGLkyn').remove()";

            string form = "<div id=\"leJHkkOjgbGLkyn\" class=\"pGKcZvErUB\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group fKmurRETigHLDYk\">" +
                            "<div>" +
                                "<label>Godzina od:</label>" +
                                "<input class=\"form-control\" type=\"time\" id=\"eYpvywdCgUdMWFB\" onkeyup=\"kBwJoRVnVZFOCVS(event)\" />" +
                            "</div>" +
                            "<span>-</span>" +
                            "<div>" +
                                "<label>Godzina do:</label>" +
                                "<input class=\"form-control\" type=\"time\" id=\"AsLyaHDkxjuuiPP\" onkeyup=\"kBwJoRVnVZFOCVS(event)\" />" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group-margin\">" +
                            "<label>Wybierz dni:</label>" +
                            "<div id=\"rJsRgTkikJFkTVs\" class=\"IVnxgCORpPYL ijBuUPWrdXEngvb STxfpYUfaLUAern\" onclick=\"NDBuqpieiEpridq(this, " + year + ", " + week + ", " + department + ")\">" +
                                "<div class=\"iNzvwDsTQXDyPIR\">" +
                                    "<span id=\"dUzUxfaNorqvNMm\" style=\"color: rgba(255, 255, 255, 0.5);\">Wybierz dni</span>" +
                                    "<div id=\"SBkLZHkCOnzAkgl\"></div>" +
                                    "<ion-icon name=\"chevron-down-outline\"></ion-icon>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input disabled id=\"lcgkhBMDzScROMd\" type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"ksDOTJUbXxnvIKA(" + department + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult DaysDiv(int year, int week)
        {
            List<DateTime> days = getDatesInWeek((int)year, (int)week);

            string daysString = "";
            foreach (var day in days)
            {
                daysString += "<div class=\"oJeaEVIeaFrjGFz ijEfZAzszvHWwUi\" onclick=\"NFjIyzElkiTJLTK(event, this)\" name=\"" + day.ToString("ddd") + "\" date=\"" + day + "\" id=\"" + day.Day + "\">" + // //dayofweek=\"" + day.Day + "\"
                        "<div class=\"JedpDSUGFTACLwa\">" +
                            "<svg viewBox=\"0 0 24 24\" height=\"22\" width=\"22\"><path fill=\"none\" d=\"M0 0h24v24H0z\"></path><path d=\"M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5zm2 \"></path></svg>" +
                            "<span>" + day.ToString("dddd") + "</span>" +
                        "</div>" +
						"<div class=\"GIdrLpiyNBHSpQV\">" +
                            "<span>(" + day.ToShortDateString() + ")</span>" +
                        "</div>" +
                    "</div>";
            }

            string div = "<div id=\"shwJrqmCKCOdpeV\" class=\"IVnxgCORpPYL ijBuUPWrdXEngvb pKKeaPLlODAnOgN ufrBpxEyiiUltaQ\">" +
                     daysString +
                "</div>";

            return Content(div);
        }

        [HttpPost]
        public ActionResult AssignHoursForAll(int department, List<DateTime> dates, TimeOnly hourFrom, TimeOnly hourTo)
        {
            int i = 0;
            bool isLastIteration = false;

            var workers = _context.Workers2.Where(x => x.DepartmentID == department);

            foreach (var date in dates)
            {
                var arrayOfIds = new List<int>();

                foreach (var worker in workers)
                {
                    var taskArray = _context.Task2.Where(x => x.WorkerID == worker.Id);
                    foreach (var task in taskArray)
                    {
                        //if (task.Date.HasValue && task.Date.Value.ToShortDateString() == date.ToShortDateString())
                        //{
                        //    arrayOfIds.Add(task.Id);
                        //}
                        if (task.Date.ToShortDateString() == date.ToShortDateString())
                        {
                            arrayOfIds.Add(task.Id);
                        }
                    }
                }

                if (arrayOfIds.Count() > 0)
                {
                    var taskArray = _context.Task2.ToList();
                    foreach (var worker in workers)
                    {
                        if (taskArray != null)
                        {
                            //if (taskArray.Where(x => x.Date.Value.ToShortDateString() == date.ToShortDateString()).Select(x => x.WorkerID).Contains(worker.Id))
                            //{
                            //    var foundRows = taskArray.Where(x => x.Date.Value.ToShortDateString() == date.ToShortDateString() && x.WorkerID == worker.Id);
                            //    if (foundRows != null)
                            //    {
                            //        foreach (var row in foundRows)
                            //        {
                            //            EditTask(row.Id, row.TaskNameID, MergeDateAndTime(row.Date.Value, hourFrom), MergeDateAndTime(row.Date.Value, hourTo));
                            //        }
                            //    }
                            //}
                            //else
                            //{
                            //    AddTasks(worker.Id, null, date, MergeDateAndTime(date, hourFrom), MergeDateAndTime(date, hourTo));
                            //}
                            if (taskArray.Where(x => x.Date.ToShortDateString() == date.ToShortDateString()).Select(x => x.WorkerID).Contains(worker.Id))
                            {
                                var foundRows = taskArray.Where(x => x.Date.ToShortDateString() == date.ToShortDateString() && x.WorkerID == worker.Id);
                                if (foundRows != null)
                                {
                                    foreach (var row in foundRows)
                                    {
                                        EditTask(row.Id, row.TaskName, MergeDateAndTime(row.Date, hourFrom), MergeDateAndTime(row.Date, hourTo));
                                    }
                                }
                            }
                            else
                            {
                                AddTasks(worker.Id, null, date, MergeDateAndTime(date, hourFrom), MergeDateAndTime(date, hourTo));
                            }
                        }
                    }
                }
                else
                {
                    foreach (var worker in workers)
                    {
                        AddTasks(worker.Id, null, date, MergeDateAndTime(date, hourFrom), MergeDateAndTime(date, hourTo));
                    }
				}

                foreach (var worker in workers)
                {
                    i++;

                    if (i == workers.Count() * dates.Count())
                    {
                        isLastIteration = true;
                    }
                }
            }

            if (isLastIteration)
            {
                return Json(new { success = true });
            }

            return Json(false);
        }

        [HttpGet]
        public ActionResult AssignTasksForAllForm(int? savedYear, int? savedWeek, int? savedDepartment)
        {
            int month = DateTime.Now.Month;
            int day = DateTime.Now.Day;

            int year = GetYear(savedYear);
            int week = GetWeek(savedWeek, year, month, day);
            int department = GetDepartmentId(savedDepartment);

            string options = "";
            foreach (var taskName in _context.TaskName2.Where(x => x.DepartmentID == department))
            {
                options += "<option value=\"" + taskName.Id + "\">" + taskName.Name + "</option>";
            }

            string removeForm = "$('#ziubgYIMDAkZxTP').remove()";

            string form = "<div id=\"ziubgYIMDAkZxTP\" class=\"pGKcZvErUB\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<label>Wybierz zadanie:</label>" +
                            "<select id=\"DFOtUXAzDWlbzYQ\" class=\"form-control\">" +
                                options +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group-margin\">" +
                            "<label>Wybierz dni:</label>" +
                            "<div id=\"rJsRgTkikJFkTVs\" class=\"IVnxgCORpPYL ijBuUPWrdXEngvb STxfpYUfaLUAern\" onclick=\"NDBuqpieiEpridq(this, " + year + ", " + week + ", " + department + ")\">" +
                                "<div class=\"iNzvwDsTQXDyPIR\">" +
                                    "<span id=\"dUzUxfaNorqvNMm\" style=\"color: rgba(255, 255, 255, 0.5);\">Wybierz dni</span>" +
                                    "<div id=\"SBkLZHkCOnzAkgl\"></div>" +
                                    "<ion-icon name=\"chevron-down-outline\"></ion-icon>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input disabled id=\"lcgkhBMDzScROMd\" type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"DfqpMwbIHeqYiyR(" + department + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        // [HttpPost]
        // public ActionResult AssignTaskForAll(int department, List<DateTime> dates, int taskNameId)
        // {
        //     int i = 0;
        //     bool isLastIteration = false;

        //     var workers = _context.Workers2.Where(x => x.DepartmentID == department);

        //     foreach (var date in dates)
        //     {
        //         var arrayOfIds = new List<int>();

        //         foreach (var worker in workers)
        //         {
        //             var taskArray = _context.Task2.Where(x => x.WorkerID == worker.Id);
        //             foreach (var task in taskArray)
        //             {
        //                 if (task.Date.HasValue && task.Date.Value.ToShortDateString() == date.ToShortDateString())
        //                 {
        //                     arrayOfIds.Add(task.Id);
        //                 }
        //             }
        //         }

        //         if (arrayOfIds.Count() > 0)
        //         {
        //             var taskArray = _context.Task2.ToList();
        //             foreach (var worker in workers)
        //             {
        //                 if (taskArray != null)
        //                 {
        //                     if (taskArray.Where(x => x.Date.Value.ToShortDateString() == date.ToShortDateString()).Select(x => x.WorkerID).Contains(worker.Id))
        //                     {
        //                         var foundRows = taskArray.Where(x => x.Date.Value.ToShortDateString() == date.ToShortDateString() && x.WorkerID == worker.Id);
        //                         if (foundRows != null)
        //                         {
        //                             foreach (var row in foundRows)
        //                             {
        //			//EditTask(row.Id, taskNameId, MergeDateAndTime(row.Date.Value, TimeOnly.FromDateTime(row.JobStart.Value)), MergeDateAndTime(row.Date.Value, TimeOnly.FromDateTime(row.JobEnd.Value)));
        //			AddTasks(row.WorkerID, taskNameId, date, row.JobStart.Value, row.JobEnd.Value);
        //                                 break;
        //		}
        //	}
        //}
        //                     else
        //                     {
        //                         AddTasks(worker.Id, taskNameId, date, null, null);
        //                     }
        //                 }
        //             }
        //         }
        //         else
        //         {
        //             foreach (var worker in workers)
        //             {
        //                 AddTasks(worker.Id, taskNameId, date, null, null);
        //             }
        //         }

        //         foreach (var worker in workers)
        //         {
        //             i++;

        //             if (i == workers.Count() * dates.Count())
        //             {
        //                 isLastIteration = true;
        //             }
        //         }
        //     }

        //     if (isLastIteration)
        //     {
        //         return Json(new { success = true });
        //     }

        //     return Json(false);
        // }

        [HttpPost]
        public ActionResult AssignTaskForAll(int department, List<DateTime> dates, int taskNameId)
        {
            var taskName = _context.TaskName2.FirstOrDefault(x => x.Id == taskNameId)?.Name;

            int i = 0;
            bool isLastIteration = false;

            var workers = _context.Workers2.Where(x => x.DepartmentID == department);

            foreach (var date in dates)
            {
                var arrayOfIds = new List<int>();

                foreach (var worker in workers)
                {
                    var taskArray = _context.Task2.Where(x => x.WorkerID == worker.Id);
                    foreach (var task in taskArray)
                    {
                        if (task.Date.ToShortDateString() == date.ToShortDateString())
                        {
                            arrayOfIds.Add(task.Id);
                        }
                    }
                }

                if (arrayOfIds.Count() > 0)
                {
                    var taskArray = _context.Task2.ToList();
                    foreach (var worker in workers)
                    {
                        if (taskArray != null)
                        {
                            if (taskArray.Where(x => x.Date.ToShortDateString() == date.ToShortDateString()).Select(x => x.WorkerID).Contains(worker.Id))
                            {
                                var foundRows = taskArray.Where(x => x.Date.ToShortDateString() == date.ToShortDateString() && x.WorkerID == worker.Id);
                                if (foundRows != null)
                                {
                                    foreach (var row in foundRows)
                                    {
                                        if (row != null)
                                        {
                                            if (row.JobStart.HasValue && row.JobEnd.HasValue)
                                            {
                                                if (row.TaskName != null)
                                                {
                                                    AddTasks(row.WorkerID, taskName, date, row.JobStart.Value, row.JobEnd.Value);
                                                }
                                                else
                                                {
                                                    EditTask(row.Id, taskName, row.JobStart.Value, row.JobEnd.Value);
                                                }
                                            }
                                            else
                                            {
                                                if (row.TaskName != null)
                                                {
                                                    AddTasks(row.WorkerID, taskName, date, null, null);
                                                }
                                                else
                                                {
                                                    EditTask(row.Id, taskName, null, null);
                                                }
                                            }
                                        }

                                        break;
                                    }
                                }
                            }
                            else
                            {
                                AddTasks(worker.Id, taskName, date, null, null);
                            }
                        }
                    }
                }
                else
                {
                    foreach (var worker in workers)
                    {
                        AddTasks(worker.Id, taskName, date, null, null);
                    }
                }

                foreach (var worker in workers)
                {
                    i++;

                    if (i == workers.Count() * dates.Count())
                    {
                        isLastIteration = true;
                    }
                }
            }

            if (isLastIteration)
            {
                return Json(new { success = true });
            }

            return Json(false);
        }



    }
}

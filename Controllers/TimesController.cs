using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis.Options;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using TimeTask.Data;
using TimeTask.Models;

namespace TimeTask.Controllers
{
    [Authorize]
    public class TimesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TimesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Times
        public async Task<IActionResult> Index()
        {
            ViewBag.Departments = _context.Department;
            ViewBag.Workers = _context.Workers2;
            ViewBag.Leave = _context.Leave4;
            ViewBag.TimeSetting = _context.TimeSettings3;
            ViewBag.Holiday = _context.Holiday;

            return _context.Time != null ?
                          View(await _context.Time.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Time'  is null.");
        }

        // GET: Times/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Time == null)
            {
                return NotFound();
            }

            var time = await _context.Time
                .FirstOrDefaultAsync(m => m.Id == id);
            if (time == null)
            {
                return NotFound();
            }

            return View(time);
        }

        // GET: Times/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Times/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerID,Enter,Exit,LeaveID,LeaveDate")] Time time)
        {
            if (ModelState.IsValid)
            {
                _context.Add(time);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(time);
        }

        // GET: Times/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Time == null)
            {
                return NotFound();
            }

            var time = await _context.Time.FindAsync(id);
            if (time == null)
            {
                return NotFound();
            }
            return View(time);
        }

        // POST: Times/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerID,Enter,Exit,LeaveID,LeaveDate")] Time time)
        {
            if (id != time.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(time);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TimeExists(time.Id))
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
            return View(time);
        }

        // GET: Times/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Time == null)
            {
                return NotFound();
            }

            var time = await _context.Time
                .FirstOrDefaultAsync(m => m.Id == id);
            if (time == null)
            {
                return NotFound();
            }

            return View(time);
        }

        // POST: Times/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Time == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Time'  is null.");
            }
            var time = await _context.Time.FindAsync(id);
            if (time != null)
            {
                _context.Time.Remove(time);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TimeExists(int id)
        {
            return (_context.Time?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public async Task<IActionResult> Leave()
        {
            ViewBag.Departments = _context.Department;
            ViewBag.Workers = _context.Workers2;
            ViewBag.Holiday = _context.Holiday;
            ViewBag.Leave = _context.Leave4;
            ViewBag.TimeSetting = _context.TimeSettings3;

            return _context.Time != null ?
                          View(await _context.Time.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Time'  is null.");
        }

        public async Task<IActionResult> Time()
        {
            ViewBag.Departments = _context.Department;
            ViewBag.Workers = _context.Workers2;
            ViewBag.Holiday = _context.Holiday;
            ViewBag.Leave = _context.Leave4;
            ViewBag.TimeSetting = _context.TimeSettings3;

            ViewBag.Hours = _context.Hours;

            return _context.Time != null ?
                          View(await _context.Time.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Time'  is null.");
        }

        //public ActionResult RefreshModel(int workerID)
        //{
        //    if (_context.Time.Any(x => x.WorkerID == workerID))
        //    {
        //        var newModel = _context.Time.Where(x => x.WorkerID == workerID);
        //        return Json(newModel);
        //    }

        //    return Json(new { success = false });
        //}

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
        public ActionResult AddTime(int workerID, DateTime enter, DateTime exit, int? leaveID, DateTime? leaveDate)
        {
            var newData = new Time()
            {
                WorkerID = workerID,
                Enter = enter,
                Exit = exit,
                LeaveID = leaveID,
                LeaveDate = leaveDate
            };

            _context.Time.Add(newData);
            _context.SaveChanges();
            //return Json(new { success = true });
            return Json(newData.Id);
        }

        [HttpPost]
        public ActionResult EditTime(int id, int workerID, DateTime enter, DateTime exit, int leaveID, DateTime? leaveDate)
        {
            var row = _context.Time.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.WorkerID = workerID;
                row.Enter = enter;
                row.Exit = exit;
                row.LeaveID = leaveID;
                row.LeaveDate = leaveDate;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult RemoveTime(int id)
        {
            var row = _context.Time.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Time.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddOkres(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = okresRozliczeniowy,
                jezeliTydzien = jezeliTydzien,
                jezeliMiesiac = jezeliMiesiac,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditOkres(int id, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.OkresRozliczeniowy = okresRozliczeniowy;
                row.jezeliTydzien = jezeliTydzien;
                row.jezeliMiesiac = jezeliMiesiac;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddCzasPracy(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = czasPracy,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditCzasPracy(int id, int? czasPracy)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzasPracy = czasPracy;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddMaksymalnaLiczbaNadgodzinTydzien(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = maksymalnaLiczbaNadgodzinTydzien,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditMaksymalnaLiczbaNadgodzinTydzien(int id, int? maksymalnaLiczbaNadgodzinTydzien)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.MaksymalnaLiczbaNadgodzinTydzien = maksymalnaLiczbaNadgodzinTydzien;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddMaksymalnaLiczbaNadgodzin(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = maksymalnaLiczbaNadgodzin,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditMaksymalnaLiczbaNadgodzin(int id, int? maksymalnaLiczbaNadgodzin)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.MaksymalnaLiczbaNadgodzin = maksymalnaLiczbaNadgodzin;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddNieprzerwanyOdpoczynek(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = nieprzerwanyOdpoczynek,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditNieprzerwanyOdpoczynek(int id, int? nieprzerwanyOdpoczynek)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.NieprzerwanyOdpoczynek = nieprzerwanyOdpoczynek;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddPoraNocna(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = poraNocnaStart,
                PoraNocnaKoniec = poraNocnaKoniec,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditPoraNocna(int id, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.PoraNocnaStart = poraNocnaStart;
                row.PoraNocnaKoniec = poraNocnaKoniec;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddNiedziela (int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = czyNiedzielaWolny
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditNiedziela(int id, bool? czyNiedzielaWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzyNiedzielaWolny = czyNiedzielaWolny;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddSobota(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = czySobotaWolny,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditSobota(int id, bool? czySobotaWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzySobotaWolny = czySobotaWolny;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddPiatek(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = czyPiatekWolny,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditPiatek(int id, bool? czyPiatekWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzyPiatekWolny = czyPiatekWolny;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddCzwartek(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = czyCzwartekWolny,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditCzwartek(int id, bool? czyCzwartekWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzyCzwartekWolny = czyCzwartekWolny;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddSroda(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = false,
                CzySrodaWolny = czySrodaWolny,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditSroda(int id, bool? czySrodaWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzySrodaWolny = czySrodaWolny;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddWtorek(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = false,
                CzyWtorekWolny = czyWtorekWolny,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditWtorek(int id, bool? czyWtorekWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzyWtorekWolny = czyWtorekWolny;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddPoniedzialek(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var newData = new TimeSettings3()
            {
                WorkerId = null,
                OkresRozliczeniowy = null,
                jezeliTydzien = null,
                jezeliMiesiac = null,
                CzasPracy = null,
                MaksymalnaLiczbaNadgodzin = null,
                MaksymalnaLiczbaNadgodzinTydzien = null,
                NieprzerwanyOdpoczynek = null,
                PoraNocnaStart = null,
                PoraNocnaKoniec = null,
                CzyPoniedzialekWolny = czyPoniedzialekWolny,
                CzyWtorekWolny = false,
                CzySrodaWolny = false,
                CzyCzwartekWolny = false,
                CzyPiatekWolny = false,
                CzySobotaWolny = false,
                CzyNiedzielaWolny = false
            };

            _context.TimeSettings3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditPoniedzialek(int id, bool? czyPoniedzialekWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.CzyPoniedzialekWolny = czyPoniedzialekWolny;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult ChangeWorkersBasedOnDepartment(int departmentID)
        {
            var workers = "";
            foreach (var item in ((IEnumerable<Workers2>)_context.Workers2).Where(x => x.DepartmentID == departmentID))
            {
                workers += "<option value=" + item.Id + ">" + item.Surname + " " + item.Name + "</option>";
            }

            return Content(workers);
        }

        [HttpGet]
        public ActionResult AddExceptionForWorkerForm()
        {
            var departments = "";
            foreach (var item in ((IEnumerable<Department>)_context.Department).OrderBy(x => x.Name))
            {
                departments += "<option value=" + item.Id + ">" + item.Name + "</option>";
            }

            var firstDepartmentIDOrderByName = ((IEnumerable<Department>)_context.Department).OrderBy(x => x.Name).FirstOrDefault()?.Id;
            var workersFirstDepartmentOrderByName = "";
            foreach (var item in ((IEnumerable<Workers2>)_context.Workers2).OrderBy(x => x.Surname).Where(y => y.DepartmentID == firstDepartmentIDOrderByName))
            {
                workersFirstDepartmentOrderByName += "<option value=" + item.Id + ">" + item.Surname + " " + item.Name + "</option>";
            }

            string removeForm = "$('#ftcuESUFJMUetmm').remove()";

            string form = "<div id=\"ftcuESUFJMUetmm\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_ form___\">" +
                        "<div class=\"form-group\">" +
                            "<label>Wybierz dział:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"dQIPREqlxghevrV\" onchange=\"dQIPREqlxghevrV_()\">" + departments + "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Wybierz pracownika:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"issyAJUIywIPgIQ\">" + workersFirstDepartmentOrderByName + "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Dobowy wymiar czasu pracy (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" maxlength=\"2\" id=\"zVbJqIMfPhbOnum\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Okres rozliczeniowy</label>" +
                            "<input class=\"form-control\" type=\"text\" maxlength=\"2\" id=\"ehgSlSwjIFIEMWH\" onkeypress=\"return isNumberKey(event)\" />" +
                            "<div style=\"height: 5px;\"></div>" +
                            "<select class=\"form-control\" id=\"kEYeEJKlcJcQFdL\">" +
                                "<option selected>-</option>" +
                                "<option>tydzień/tygodnie/tygodni</option>" +
                                "<option>miesiąc/miesiące/miesięcy</option>" +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Maks. nadgodzin w tygodniu (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" maxlength=\"2\" id=\"klyMbuAvknxCxgo\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Maks. nadgodzin w roku (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" maxlength=\"3\" id=\"KZzKslyEOOrVYOF\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nieprzerwany odpoczynek (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" maxlength=\"2\" id=\"WdWDgtaDQwkuFxr\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" id=\"cDoWdsoylXsqbSk\" onclick=\"cDoWdsoylXsqbSk_()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult AddWorkerException(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            int ifWorkerAlreadyInDatabase = ((IEnumerable<TimeSettings3>)_context.TimeSettings3).Count(x => x.WorkerId == workerID);
            if (ifWorkerAlreadyInDatabase == 0)
            {
                var newData = new TimeSettings3()
                {
                    WorkerId = workerID,
                    OkresRozliczeniowy = okresRozliczeniowy,
                    jezeliTydzien = jezeliTydzien,
                    jezeliMiesiac = jezeliMiesiac,
                    CzasPracy = czasPracy,
                    MaksymalnaLiczbaNadgodzin = maksymalnaLiczbaNadgodzin,
                    MaksymalnaLiczbaNadgodzinTydzien = maksymalnaLiczbaNadgodzinTydzien,
                    NieprzerwanyOdpoczynek = nieprzerwanyOdpoczynek,
                    PoraNocnaStart = null,
                    PoraNocnaKoniec = null,
                    CzyPoniedzialekWolny = null,
                    CzyWtorekWolny = null,
                    CzySrodaWolny = null,
                    CzyCzwartekWolny = null,
                    CzyPiatekWolny = null,
                    CzySobotaWolny = null,
                    CzyNiedzielaWolny = null
                };

                _context.TimeSettings3.Add(newData);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(false);
        }

        [HttpGet]
        public ActionResult EditExceptionForWorkerForm(int id)
        {
            var timeSettings = (IEnumerable<TimeSettings3>)_context.TimeSettings3;
            var workerID = (timeSettings).FirstOrDefault(x => x.Id == id)?.WorkerId;

            var workerSurname = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == workerID)?.Surname;
            var workerName = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == workerID)?.Name;
            var workerDepartmentID = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == workerID)?.DepartmentID;
            var workerDepartmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == workerDepartmentID)?.Name;           
            var dobowyWymiarCzasuPracy = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.CzasPracy;
            var okresRozliczeniowy = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.OkresRozliczeniowy;

            string jakiOkresRozliczeniowy = "";
            var okresRozliczeniowy_jezeliTydzien = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.jezeliTydzien;
            var okresRozliczeniowy_jezeliMiesiac = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.jezeliMiesiac;
            if (okresRozliczeniowy_jezeliTydzien == true && okresRozliczeniowy_jezeliMiesiac == false)
            {
                jakiOkresRozliczeniowy = "<option>-</option>" +
                    "<option selected>tydzień/tygodnie/tygodni</option>" +
                    "<option>miesiąc/miesiące/miesięcy</option>";
            }
            else if (okresRozliczeniowy_jezeliTydzien == false && okresRozliczeniowy_jezeliMiesiac == true)
            {
                jakiOkresRozliczeniowy = "<option>-</option>" +
                    "<option>tydzień/tygodnie/tygodni</option>" +
                    "<option selected>miesiąc/miesiące/miesięcy</option>";
            }
            else if (okresRozliczeniowy_jezeliTydzien == null && okresRozliczeniowy_jezeliMiesiac == null)
            {
                jakiOkresRozliczeniowy = "<option selected>-</option>" +
                    "<option>tydzień/tygodnie/tygodni</option>" +
                    "<option>miesiąc/miesiące/miesięcy</option>";
            }

            var maksymalnaLiczbaNadgodzinTydzien = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.MaksymalnaLiczbaNadgodzinTydzien;
            var maksymalnaLiczbaNadgodzinRok = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.MaksymalnaLiczbaNadgodzin;
            var nieprzerwanyOdpoczynek = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.NieprzerwanyOdpoczynek;


            string removeForm = "$('#bouHwUSUJAULmxy').remove()";

            string form = "<div id=\"bouHwUSUJAULmxy\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_ form__\">" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + workerDepartmentName + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + workerSurname + " " + workerName + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Dobowy wymiar czasu pracy (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + dobowyWymiarCzasuPracy + "\" maxlength=\"2\" id=\"qeavlfguoZjzrJJ\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Okres rozliczeniowy</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + okresRozliczeniowy + "\" maxlength=\"2\" id=\"qSFTqMAjJYMmIrO\" onkeypress=\"return isNumberKey(event)\" />" +
                            "<div style=\"height: 5px;\"></div>" +
                            "<select class=\"form-control\" id=\"QzUmEAmLsPWlpfK\">" +
                                jakiOkresRozliczeniowy +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Maks. nadgodzin w tygodniu (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + maksymalnaLiczbaNadgodzinTydzien + "\" maxlength=\"2\" id=\"gATdSghHoiZijAN\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Maks. nadgodzin w roku (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + maksymalnaLiczbaNadgodzinRok + "\" maxlength=\"3\" id=\"SEcPtfWbLyUxlmL\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nieprzerwany odpoczynek (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + nieprzerwanyOdpoczynek + "\" maxlength=\"2\" id=\"DrwWFscldmvtHOW\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Edytuj\" class=\"btn-custom\" id=\"THAxAvslRnLsHel\" onclick=\"THAxAvslRnLsHel_(" + id + ", " + workerID + ")\" />" + 
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult EditWorkerException(int id, int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.WorkerId = workerID;
                row.OkresRozliczeniowy = okresRozliczeniowy;
                row.jezeliTydzien = jezeliTydzien;
                row.jezeliMiesiac = jezeliMiesiac;
                row.CzasPracy = czasPracy;
                row.MaksymalnaLiczbaNadgodzin = maksymalnaLiczbaNadgodzin;
                row.MaksymalnaLiczbaNadgodzinTydzien = maksymalnaLiczbaNadgodzinTydzien;
                row.NieprzerwanyOdpoczynek = nieprzerwanyOdpoczynek;
                row.PoraNocnaStart = null;
                row.PoraNocnaKoniec = null;
                row.CzyPoniedzialekWolny = null;
                row.CzyWtorekWolny = null;
                row.CzySrodaWolny = null;
                row.CzyCzwartekWolny = null;
                row.CzyPiatekWolny = null;
                row.CzySobotaWolny = null;
                row.CzyNiedzielaWolny = null;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult DeleteExceptionForWorkerForm(int id)
        {
            var timeSettings = (IEnumerable<TimeSettings3>)_context.TimeSettings3;
            var workerID = (timeSettings).FirstOrDefault(x => x.Id == id)?.WorkerId;

            var workerSurname = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == workerID)?.Surname;
            var workerName = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == workerID)?.Name;
            var workerDepartmentID = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == workerID)?.DepartmentID;
            var workerDepartmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == workerDepartmentID)?.Name;
            var dobowyWymiarCzasuPracy = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.CzasPracy;
            var okresRozliczeniowy = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.OkresRozliczeniowy;

            string jakiOkresRozliczeniowy = "";
            var okresRozliczeniowy_jezeliTydzien = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.jezeliTydzien;
            var okresRozliczeniowy_jezeliMiesiac = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.jezeliMiesiac;
            if (okresRozliczeniowy_jezeliTydzien == true && okresRozliczeniowy_jezeliMiesiac == false)
            {
                jakiOkresRozliczeniowy = "tydzień/tygodnie/tygodni";
            }
            else if (okresRozliczeniowy_jezeliTydzien == false && okresRozliczeniowy_jezeliMiesiac == true)
            {
                jakiOkresRozliczeniowy = "miesiąc/miesiące/miesięcy";
            }
            else if (okresRozliczeniowy_jezeliTydzien == null && okresRozliczeniowy_jezeliMiesiac == null)
            {
                jakiOkresRozliczeniowy = "-";
            }

            var maksymalnaLiczbaNadgodzinTydzien = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.MaksymalnaLiczbaNadgodzinTydzien;
            var maksymalnaLiczbaNadgodzinRok = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.MaksymalnaLiczbaNadgodzin;
            var nieprzerwanyOdpoczynek = (timeSettings).FirstOrDefault(x => x.WorkerId == workerID)?.NieprzerwanyOdpoczynek;


            string removeForm = "$('#aekPvskkEgnnMQf').remove()";

            string form = "<div id=\"aekPvskkEgnnMQf\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_ form__\">" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + workerDepartmentName + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + workerSurname + " " + workerName + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Dobowy wymiar czasu pracy (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + dobowyWymiarCzasuPracy +"\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Okres rozliczeniowy</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + okresRozliczeniowy + "\" disabled />" +
                            "<div style=\"height: 5px;\"></div>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + jakiOkresRozliczeniowy + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Maks. nadgodzin w tygodniu (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + maksymalnaLiczbaNadgodzinTydzien + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Maks. nadgodzin w roku (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + maksymalnaLiczbaNadgodzinRok + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Nieprzerwany odpoczynek (godz.)</label>" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + nieprzerwanyOdpoczynek + "\" disabled />" +
                        "</div>" +
                        "<div class=\"btn-danger-div\">" +
                            "<input type=\"button\" value=\"Usuń\" id=\"TGdaSoYPTTTHTtr\" onclick=\"TGdaSoYPTTTHTtr_(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult RemoveWorkerException(int id)
        {
            var row = _context.TimeSettings3.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.TimeSettings3.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult AddLeaveSettingForm()
        {
            string removeForm = "$('#GpoavnFwAOos').remove()";

            string form = "<div id=\"GpoavnFwAOos\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" autocomplete=\"off\" placeholder=\"nazwa urlopu...\" id=\"oVxJeHhcExMV\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" autocomplete=\"off\" placeholder=\"komentarz (opcjonalnie)...\" id=\"kwYypucEEAnX\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control dGNCykvGtQxbazH\" type=\"number\" onkeypress=\"validate(this, event)\" placeholder=\"maks. długość urlopu (opcjonalnie)...\" id=\"IyWRFThVHhEX\" />" +
                            "<div class=\"eshTOvdrdlbtIkg\" id=\"radiocb\">" +
                                "<label><input id=\"cb1\" type=\"radio\" name=\"if\" />Dni</label>" +
                                "<label><input id=\"cb2\" type=\"radio\" name=\"if\" />Tygodnie</label>" +
                                "<label><input id=\"cb3\" type=\"radio\" name=\"if\" />Miesiące</label>" +
                                "<label><input id=\"cb4\" type=\"radio\" name=\"if\" />Lata</label>" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<div class=\"jwvLslukUqESfdP\">" +
                                "<span>Uwzględnij:</span>" +
                            "</div>" +
                            "<div class=\"eshTOvdrdlbtIkg\">" +
                                "<label><input id=\"cb5\" type=\"checkbox\" />Soboty i Niedzielę</label>" +
                                "<label><input id=\"cb6\" type=\"checkbox\" />Święta</label>" +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"BmJPiKFdcncS()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult AddLeave(int workerID, DateTime? enter, DateTime? exit, int leaveID, DateTime leaveDate)
        {
            var newData = new Time()
            {
                WorkerID = workerID,
                Enter = enter,
                Exit = exit,
                LeaveID = leaveID,
                LeaveDate = leaveDate
            };

            _context.Time.Add(newData);
            _context.SaveChanges();
            //return Json(new { success = true });
            return Json(newData.Id);
        }

        [HttpGet]
        public ActionResult EditLeaveSettingForm(int id) 
        {
            var leave = (IEnumerable<Leave4>)_context.Leave4;

            var leaveName = (leave).FirstOrDefault(x => x.Id == id)?.Name;
            var leaveComment = (leave).FirstOrDefault(x => x.Id == id)?.Description;
            var leaveMax = (leave).FirstOrDefault(x => x.Id == id)?.Max;
            
            var radios = "";
            var IfDays = (leave).FirstOrDefault(x => x.Id == id)?.IfDays;
            var IfWeeks = (leave).FirstOrDefault(x => x.Id == id)?.IfWeeks;
            var IfMonths = (leave).FirstOrDefault(x => x.Id == id)?.IfMonths;
            var IfYears = (leave).FirstOrDefault(x => x.Id == id)?.IfYears;
            if (IfDays == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" name=\"if\" checked />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" name=\"if\" />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" name=\"if\" />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" name=\"if\" />Lata</label>";
            }
            if (IfWeeks == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" name=\"if\" />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" name=\"if\" checked />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" name=\"if\" />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" name=\"if\" />Lata</label>";
            }
            if (IfMonths == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" name=\"if\" />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" name=\"if\" />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" name=\"if\" checked />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" name=\"if\" />Lata</label>";
            }
            if (IfYears == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" name=\"if\" />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" name=\"if\" />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" name=\"if\" />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" name=\"if\" checked />Lata</label>";
            }
            if (IfDays == false && IfWeeks == false && IfMonths == false && IfYears == false)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" name=\"if\" />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" name=\"if\" />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" name=\"if\" />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" name=\"if\" />Lata</label>";
            }

            var checkbox1 = "";
            var checkbox2 = "";
            var IfWeekends = (leave).FirstOrDefault(x => x.Id == id)?.IfWeekends;
            var IfHolidays = (leave).FirstOrDefault(x => x.Id == id)?.IfHolidays;
            if (IfWeekends == true)
                checkbox1 = "<label><input id=\"cb5_\" type=\"checkbox\" checked />Soboty i Niedzielę</label>";
            else
                checkbox1 = "<label><input id=\"cb5_\" type=\"checkbox\" />Soboty i Niedzielę</label>";
            if (IfHolidays == true)
                checkbox2 = "<label><input id=\"cb6_\" type=\"checkbox\" checked />Święta</label>";
            else
                checkbox2 = "<label><input id=\"cb6_\" type=\"checkbox\" />Święta</label>";


            string removeForm = "$('#nGWLQDZPlPSDQaC').remove()";

            string form = "<div id=\"nGWLQDZPlPSDQaC\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" value=\"" + leaveName + "\" autocomplete=\"off\" placeholder=\"nazwa urlopu...\" id=\"AazUHXhkXIbdKWH\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" value=\"" + leaveComment + "\" autocomplete=\"off\" placeholder=\"komentarz (opcjonalnie)...\" id=\"TDGIADzVjJqefsV\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control dGNCykvGtQxbazH\" value=\"" + leaveMax + "\" type=\"number\" onkeypress=\"validate(this, event)\" placeholder=\"maks. długość urlopu (opcjonalnie)...\" id=\"VumSHUqECwbXZcK\" />" +
                            "<div class=\"eshTOvdrdlbtIkg\" id=\"radiocb\">" +
                                radios +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<div class=\"jwvLslukUqESfdP\">" +
                                "<span>Uwzględnij:</span>" +
                            "</div>" +
                            "<div class=\"eshTOvdrdlbtIkg\">" +
                                checkbox1 +
                                checkbox2 +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"LkHTSbDyYLLvJeC(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult EditLeave(int id, int workerID, DateTime? enter, DateTime? exit, int leaveID, DateTime leaveDate)
        {
            var row = _context.Time.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.WorkerID = workerID;
                row.Enter = enter;
                row.Exit = exit;
                row.LeaveID = leaveID;
                row.LeaveDate = leaveDate;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult DeleteLeaveSettingForm(int id)
        {
            var leave = (IEnumerable<Leave4>)_context.Leave4;

            var leaveName = (leave).FirstOrDefault(x => x.Id == id)?.Name;
            var leaveComment = (leave).FirstOrDefault(x => x.Id == id)?.Description;
            var leaveMax = (leave).FirstOrDefault(x => x.Id == id)?.Max;

            var radios = "";
            var IfDays = (leave).FirstOrDefault(x => x.Id == id)?.IfDays;
            var IfWeeks = (leave).FirstOrDefault(x => x.Id == id)?.IfWeeks;
            var IfMonths = (leave).FirstOrDefault(x => x.Id == id)?.IfMonths;
            var IfYears = (leave).FirstOrDefault(x => x.Id == id)?.IfYears;
            if (IfDays == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" disabled checked />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" disabled />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" disabled />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" disabled />Lata</label>";
            }
            if (IfWeeks == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" disabled />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" disabled checked />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" disabled />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" disabled />Lata</label>";
            }
            if (IfMonths == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" disabled />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" disabled />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" disabled checked />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" disabled />Lata</label>";
            }
            if (IfYears == true)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" disabled />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" disabled />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" disabled />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" disabled checked />Lata</label>";
            }
            if (IfDays == false && IfWeeks == false && IfMonths == false && IfYears == false)
            {
                radios = "<label><input id=\"cb1_\" type=\"radio\" disabled />Dni</label>" +
                         "<label><input id=\"cb2_\" type=\"radio\" disabled />Tygodnie</label>" +
                         "<label><input id=\"cb3_\" type=\"radio\" disabled />Miesiące</label>" +
                         "<label><input id=\"cb4_\" type=\"radio\" disabled />Lata</label>";
            }

            var checkbox1 = "";
            var checkbox2 = "";
            var IfWeekends = (leave).FirstOrDefault(x => x.Id == id)?.IfWeekends;
            var IfHolidays = (leave).FirstOrDefault(x => x.Id == id)?.IfHolidays;
            if (IfWeekends == true)
                checkbox1 = "<label><input id=\"cb5_\" type=\"checkbox\" disabled checked />Soboty i Niedzielę</label>";
            else
                checkbox1 = "<label><input id=\"cb5_\" type=\"checkbox\" disabled />Soboty i Niedzielę</label>";
            if (IfHolidays == true)
                checkbox2 = "<label><input id=\"cb6_\" type=\"checkbox\" disabled checked />Święta</label>";
            else
                checkbox2 = "<label><input id=\"cb6_\" type=\"checkbox\" disabled />Święta</label>";


            string removeForm = "$('#YiAVCpnVzhDnOsL').remove()";

            string form = "<div id=\"YiAVCpnVzhDnOsL\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + leaveName + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" type=\"text\" value=\"" + leaveComment + "\" disabled />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control dGNCykvGtQxbazH\" type=\"text\" value=\"" + leaveMax + "\" disabled />" +
                            "<div class=\"eshTOvdrdlbtIkg\" id=\"radiocb\">" +
                                radios +
                            "</div>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<div class=\"jwvLslukUqESfdP\">" +
                                "<span>Uwzględnij:</span>" +
                            "</div>" +
                            "<div class=\"eshTOvdrdlbtIkg\">" +
                                checkbox1 +
                                checkbox2 +
                            "</div>" +
                        "</div>" +
                        "<div class=\"btn-danger-div\">" +
                            "<input type=\"button\" value=\"Usuń\" id=\"XSkMvvmEXCee\" onclick=\"dDlRcSCJZAuO(" + id + ")\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult RemoveLeave(int id)
        {
            var row = _context.Time.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Time.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }






    }
}

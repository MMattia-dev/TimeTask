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
            return Json(new { success = true });
            //return Json(newData.Id);
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
            return Json(new { success = true });
            //return Json(newData.Id);
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

        //[HttpPost]
        //public ActionResult AddWorkerException(int? workerID, int? okresRozliczeniowy, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek)
        //{
        //    var newData = new TimeSettings2()
        //    {
        //        WorkerId = workerID,
        //        OkresRozliczeniowy = okresRozliczeniowy,
        //        CzasPracy = czasPracy,
        //        MaksymalnaLiczbaNadgodzin = maksymalnaLiczbaNadgodzin,
        //        MaksymalnaLiczbaNadgodzinTydzien = maksymalnaLiczbaNadgodzinTydzien,
        //        NieprzerwanyOdpoczynek = nieprzerwanyOdpoczynek
        //    };

        //    _context.TimeSettings2.Add(newData);
        //    _context.SaveChanges();
        //    return Json(new { success = true });
        //}

        [HttpPost]
        public ActionResult AddWorkerException(int? workerID, int? okresRozliczeniowy, bool? jezeliTydzien, bool? jezeliMiesiac, int? czasPracy, int? maksymalnaLiczbaNadgodzin, int? maksymalnaLiczbaNadgodzinTydzien, int? nieprzerwanyOdpoczynek, DateTime? poraNocnaStart, DateTime? poraNocnaKoniec, bool? czyPoniedzialekWolny, bool? czyWtorekWolny, bool? czySrodaWolny, bool? czyCzwartekWolny, bool? czyPiatekWolny, bool? czySobotaWolny, bool? czyNiedzielaWolny)
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




    }
}

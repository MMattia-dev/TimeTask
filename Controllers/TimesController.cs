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






    }
}

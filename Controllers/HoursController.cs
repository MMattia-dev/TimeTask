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
    public class HoursController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HoursController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Hours
        public async Task<IActionResult> Index()
        {
              return _context.Hours != null ? 
                          View(await _context.Hours.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Hours'  is null.");
        }

        // GET: Hours/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Hours == null)
            {
                return NotFound();
            }

            var hours = await _context.Hours
                .FirstOrDefaultAsync(m => m.Id == id);
            if (hours == null)
            {
                return NotFound();
            }

            return View(hours);
        }

        // GET: Hours/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Hours/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,DepartmentID,Enter,Exit")] Hours hours)
        {
            if (ModelState.IsValid)
            {
                _context.Add(hours);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(hours);
        }

        // GET: Hours/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Hours == null)
            {
                return NotFound();
            }

            var hours = await _context.Hours.FindAsync(id);
            if (hours == null)
            {
                return NotFound();
            }
            return View(hours);
        }

        // POST: Hours/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,DepartmentID,Enter,Exit")] Hours hours)
        {
            if (id != hours.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(hours);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!HoursExists(hours.Id))
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
            return View(hours);
        }

        // GET: Hours/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Hours == null)
            {
                return NotFound();
            }

            var hours = await _context.Hours
                .FirstOrDefaultAsync(m => m.Id == id);
            if (hours == null)
            {
                return NotFound();
            }

            return View(hours);
        }

        // POST: Hours/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Hours == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Hours'  is null.");
            }
            var hours = await _context.Hours.FindAsync(id);
            if (hours != null)
            {
                _context.Hours.Remove(hours);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool HoursExists(int id)
        {
          return (_context.Hours?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        public ActionResult AddHours(int departmentID, DateTime enter, DateTime exit)
        {
            var newData = new Hours()
            {
                DepartmentID = departmentID,
                Enter = enter,
                Exit = exit,
            };

            _context.Hours.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditHours(int id, int departmentID, DateTime enter, DateTime exit)
        {
            var row = _context.Hours.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.DepartmentID = departmentID;
                row.Enter = enter;
                row.Exit = exit;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult RemoveHours(int id)
        {
            var row = _context.Hours.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Hours.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }






    }
}

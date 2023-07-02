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
    public class Leave4Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Leave4Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Leave4
        public async Task<IActionResult> Index()
        {
              return _context.Leave4 != null ? 
                          View(await _context.Leave4.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Leave4'  is null.");
        }

        // GET: Leave4/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Leave4 == null)
            {
                return NotFound();
            }

            var leave4 = await _context.Leave4
                .FirstOrDefaultAsync(m => m.Id == id);
            if (leave4 == null)
            {
                return NotFound();
            }

            return View(leave4);
        }

        // GET: Leave4/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Leave4/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Description,Max,IfDays,IfWeeks,IfMonths,IfYears,IfWeekends,IfHolidays")] Leave4 leave4)
        {
            if (ModelState.IsValid)
            {
                _context.Add(leave4);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(leave4);
        }

        // GET: Leave4/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Leave4 == null)
            {
                return NotFound();
            }

            var leave4 = await _context.Leave4.FindAsync(id);
            if (leave4 == null)
            {
                return NotFound();
            }
            return View(leave4);
        }

        // POST: Leave4/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,Max,IfDays,IfWeeks,IfMonths,IfYears,IfWeekends,IfHolidays")] Leave4 leave4)
        {
            if (id != leave4.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(leave4);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Leave4Exists(leave4.Id))
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
            return View(leave4);
        }

        // GET: Leave4/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Leave4 == null)
            {
                return NotFound();
            }

            var leave4 = await _context.Leave4
                .FirstOrDefaultAsync(m => m.Id == id);
            if (leave4 == null)
            {
                return NotFound();
            }

            return View(leave4);
        }

        // POST: Leave4/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Leave4 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Leave4'  is null.");
            }
            var leave4 = await _context.Leave4.FindAsync(id);
            if (leave4 != null)
            {
                _context.Leave4.Remove(leave4);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Leave4Exists(int id)
        {
          return (_context.Leave4?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        public ActionResult AddLeave(string name, string description, string max, bool ifDays, bool ifWeeks, bool ifMonths, bool ifYears, bool ifWeekends, bool ifHolidays)
        {
            var newData = new Leave4()
            {
                Name = name,
                Description = description,
                Max = max,
                IfDays = ifDays,
                IfWeeks = ifWeeks,
                IfMonths = ifMonths,
                IfYears = ifYears,
                IfWeekends = ifWeekends,
                IfHolidays = ifHolidays
            };

            _context.Leave4.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
            //return Json(newData.Id);
        }








    }
}

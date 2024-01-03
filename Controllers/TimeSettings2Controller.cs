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
    public class TimeSettings2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public TimeSettings2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TimeSettings2
        public async Task<IActionResult> Index()
        {
              return _context.TimeSettings2 != null ? 
                          View(await _context.TimeSettings2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TimeSettings2'  is null.");
        }

        // GET: TimeSettings2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TimeSettings2 == null)
            {
                return NotFound();
            }

            var timeSettings2 = await _context.TimeSettings2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSettings2 == null)
            {
                return NotFound();
            }

            return View(timeSettings2);
        }

        // GET: TimeSettings2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TimeSettings2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerId,OkresRozliczeniowy,CzasPracy,MaksymalnaLiczbaNadgodzin,MaksymalnaLiczbaNadgodzinTydzien,NieprzerwanyOdpoczynek")] TimeSettings2 timeSettings2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(timeSettings2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(timeSettings2);
        }

        // GET: TimeSettings2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TimeSettings2 == null)
            {
                return NotFound();
            }

            var timeSettings2 = await _context.TimeSettings2.FindAsync(id);
            if (timeSettings2 == null)
            {
                return NotFound();
            }
            return View(timeSettings2);
        }

        // POST: TimeSettings2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerId,OkresRozliczeniowy,CzasPracy,MaksymalnaLiczbaNadgodzin,MaksymalnaLiczbaNadgodzinTydzien,NieprzerwanyOdpoczynek")] TimeSettings2 timeSettings2)
        {
            if (id != timeSettings2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(timeSettings2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TimeSettings2Exists(timeSettings2.Id))
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
            return View(timeSettings2);
        }

        // GET: TimeSettings2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TimeSettings2 == null)
            {
                return NotFound();
            }

            var timeSettings2 = await _context.TimeSettings2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSettings2 == null)
            {
                return NotFound();
            }

            return View(timeSettings2);
        }

        // POST: TimeSettings2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TimeSettings2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TimeSettings2'  is null.");
            }
            var timeSettings2 = await _context.TimeSettings2.FindAsync(id);
            if (timeSettings2 != null)
            {
                _context.TimeSettings2.Remove(timeSettings2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TimeSettings2Exists(int id)
        {
          return (_context.TimeSettings2?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

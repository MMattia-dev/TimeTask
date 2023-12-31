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
    public class TimeSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TimeSettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TimeSettings
        public async Task<IActionResult> Index()
        {
              return _context.TimeSettings != null ? 
                          View(await _context.TimeSettings.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TimeSettings'  is null.");
        }

        // GET: TimeSettings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TimeSettings == null)
            {
                return NotFound();
            }

            var timeSettings = await _context.TimeSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSettings == null)
            {
                return NotFound();
            }

            return View(timeSettings);
        }

        // GET: TimeSettings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TimeSettings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerId,OkresRozliczeniowy,CzasPracy,MaksymalnaLiczbaNadgodzin")] TimeSettings timeSettings)
        {
            if (ModelState.IsValid)
            {
                _context.Add(timeSettings);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(timeSettings);
        }

        // GET: TimeSettings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TimeSettings == null)
            {
                return NotFound();
            }

            var timeSettings = await _context.TimeSettings.FindAsync(id);
            if (timeSettings == null)
            {
                return NotFound();
            }
            return View(timeSettings);
        }

        // POST: TimeSettings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerId,OkresRozliczeniowy,CzasPracy,MaksymalnaLiczbaNadgodzin")] TimeSettings timeSettings)
        {
            if (id != timeSettings.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(timeSettings);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TimeSettingsExists(timeSettings.Id))
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
            return View(timeSettings);
        }

        // GET: TimeSettings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TimeSettings == null)
            {
                return NotFound();
            }

            var timeSettings = await _context.TimeSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSettings == null)
            {
                return NotFound();
            }

            return View(timeSettings);
        }

        // POST: TimeSettings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TimeSettings == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TimeSettings'  is null.");
            }
            var timeSettings = await _context.TimeSettings.FindAsync(id);
            if (timeSettings != null)
            {
                _context.TimeSettings.Remove(timeSettings);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TimeSettingsExists(int id)
        {
          return (_context.TimeSettings?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

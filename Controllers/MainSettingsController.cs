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
    public class MainSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public MainSettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: MainSettings
        public async Task<IActionResult> Index()
        {
              return _context.MainSettings != null ? 
                          View(await _context.MainSettings.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.MainSettings'  is null.");
        }

        // GET: MainSettings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.MainSettings == null)
            {
                return NotFound();
            }

            var mainSettings = await _context.MainSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (mainSettings == null)
            {
                return NotFound();
            }

            return View(mainSettings);
        }

        // GET: MainSettings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MainSettings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name")] MainSettings mainSettings)
        {
            if (ModelState.IsValid)
            {
                _context.Add(mainSettings);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(mainSettings);
        }

        // GET: MainSettings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.MainSettings == null)
            {
                return NotFound();
            }

            var mainSettings = await _context.MainSettings.FindAsync(id);
            if (mainSettings == null)
            {
                return NotFound();
            }
            return View(mainSettings);
        }

        // POST: MainSettings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name")] MainSettings mainSettings)
        {
            if (id != mainSettings.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(mainSettings);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MainSettingsExists(mainSettings.Id))
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
            return View(mainSettings);
        }

        // GET: MainSettings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.MainSettings == null)
            {
                return NotFound();
            }

            var mainSettings = await _context.MainSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (mainSettings == null)
            {
                return NotFound();
            }

            return View(mainSettings);
        }

        // POST: MainSettings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.MainSettings == null)
            {
                return Problem("Entity set 'ApplicationDbContext.MainSettings'  is null.");
            }
            var mainSettings = await _context.MainSettings.FindAsync(id);
            if (mainSettings != null)
            {
                _context.MainSettings.Remove(mainSettings);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MainSettingsExists(int id)
        {
          return (_context.MainSettings?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

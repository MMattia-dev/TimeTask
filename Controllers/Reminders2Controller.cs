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
    public class Reminders2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Reminders2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Reminders2
        public async Task<IActionResult> Index()
        {
              return _context.Reminders2 != null ? 
                          View(await _context.Reminders2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Reminders2'  is null.");
        }

        // GET: Reminders2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Reminders2 == null)
            {
                return NotFound();
            }

            var reminders2 = await _context.Reminders2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reminders2 == null)
            {
                return NotFound();
            }

            return View(reminders2);
        }

        // GET: Reminders2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Reminders2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserID,ReminderDescription,CreatedDate,RemindDate")] Reminders2 reminders2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(reminders2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(reminders2);
        }

        // GET: Reminders2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Reminders2 == null)
            {
                return NotFound();
            }

            var reminders2 = await _context.Reminders2.FindAsync(id);
            if (reminders2 == null)
            {
                return NotFound();
            }
            return View(reminders2);
        }

        // POST: Reminders2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserID,ReminderDescription,CreatedDate,RemindDate")] Reminders2 reminders2)
        {
            if (id != reminders2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reminders2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Reminders2Exists(reminders2.Id))
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
            return View(reminders2);
        }

        // GET: Reminders2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Reminders2 == null)
            {
                return NotFound();
            }

            var reminders2 = await _context.Reminders2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reminders2 == null)
            {
                return NotFound();
            }

            return View(reminders2);
        }

        // POST: Reminders2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Reminders2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Reminders2'  is null.");
            }
            var reminders2 = await _context.Reminders2.FindAsync(id);
            if (reminders2 != null)
            {
                _context.Reminders2.Remove(reminders2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Reminders2Exists(int id)
        {
          return (_context.Reminders2?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

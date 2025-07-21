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
    public class Reminders3Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Reminders3Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Reminders3
        public async Task<IActionResult> Index()
        {
              return _context.Reminders3 != null ? 
                          View(await _context.Reminders3.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Reminders3'  is null.");
        }

        // GET: Reminders3/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Reminders3 == null)
            {
                return NotFound();
            }

            var reminders3 = await _context.Reminders3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reminders3 == null)
            {
                return NotFound();
            }

            return View(reminders3);
        }

        // GET: Reminders3/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Reminders3/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserID,Title,ReminderDescription,CreatedDate,RemindDate")] Reminders3 reminders3)
        {
            if (ModelState.IsValid)
            {
                _context.Add(reminders3);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(reminders3);
        }

        // GET: Reminders3/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Reminders3 == null)
            {
                return NotFound();
            }

            var reminders3 = await _context.Reminders3.FindAsync(id);
            if (reminders3 == null)
            {
                return NotFound();
            }
            return View(reminders3);
        }

        // POST: Reminders3/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserID,Title,ReminderDescription,CreatedDate,RemindDate")] Reminders3 reminders3)
        {
            if (id != reminders3.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reminders3);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Reminders3Exists(reminders3.Id))
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
            return View(reminders3);
        }

        // GET: Reminders3/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Reminders3 == null)
            {
                return NotFound();
            }

            var reminders3 = await _context.Reminders3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reminders3 == null)
            {
                return NotFound();
            }

            return View(reminders3);
        }

        // POST: Reminders3/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Reminders3 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Reminders3'  is null.");
            }
            var reminders3 = await _context.Reminders3.FindAsync(id);
            if (reminders3 != null)
            {
                _context.Reminders3.Remove(reminders3);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Reminders3Exists(int id)
        {
          return (_context.Reminders3?.Any(e => e.Id == id)).GetValueOrDefault();
        }






    }
}

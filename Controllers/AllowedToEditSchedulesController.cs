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
    public class AllowedToEditSchedulesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AllowedToEditSchedulesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: AllowedToEditSchedules
        public async Task<IActionResult> Index()
        {
              return _context.AllowedToEditSchedule != null ? 
                          View(await _context.AllowedToEditSchedule.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.AllowedToEditSchedule'  is null.");
        }

        // GET: AllowedToEditSchedules/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.AllowedToEditSchedule == null)
            {
                return NotFound();
            }

            var allowedToEditSchedule = await _context.AllowedToEditSchedule
                .FirstOrDefaultAsync(m => m.Id == id);
            if (allowedToEditSchedule == null)
            {
                return NotFound();
            }

            return View(allowedToEditSchedule);
        }

        // GET: AllowedToEditSchedules/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: AllowedToEditSchedules/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerId,DepartmentId")] AllowedToEditSchedule allowedToEditSchedule)
        {
            if (ModelState.IsValid)
            {
                _context.Add(allowedToEditSchedule);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(allowedToEditSchedule);
        }

        // GET: AllowedToEditSchedules/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.AllowedToEditSchedule == null)
            {
                return NotFound();
            }

            var allowedToEditSchedule = await _context.AllowedToEditSchedule.FindAsync(id);
            if (allowedToEditSchedule == null)
            {
                return NotFound();
            }
            return View(allowedToEditSchedule);
        }

        // POST: AllowedToEditSchedules/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerId,DepartmentId")] AllowedToEditSchedule allowedToEditSchedule)
        {
            if (id != allowedToEditSchedule.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(allowedToEditSchedule);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!AllowedToEditScheduleExists(allowedToEditSchedule.Id))
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
            return View(allowedToEditSchedule);
        }

        // GET: AllowedToEditSchedules/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.AllowedToEditSchedule == null)
            {
                return NotFound();
            }

            var allowedToEditSchedule = await _context.AllowedToEditSchedule
                .FirstOrDefaultAsync(m => m.Id == id);
            if (allowedToEditSchedule == null)
            {
                return NotFound();
            }

            return View(allowedToEditSchedule);
        }

        // POST: AllowedToEditSchedules/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.AllowedToEditSchedule == null)
            {
                return Problem("Entity set 'ApplicationDbContext.AllowedToEditSchedule'  is null.");
            }
            var allowedToEditSchedule = await _context.AllowedToEditSchedule.FindAsync(id);
            if (allowedToEditSchedule != null)
            {
                _context.AllowedToEditSchedule.Remove(allowedToEditSchedule);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool AllowedToEditScheduleExists(int id)
        {
          return (_context.AllowedToEditSchedule?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

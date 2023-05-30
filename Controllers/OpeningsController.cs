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
    public class OpeningsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OpeningsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Openings
        public async Task<IActionResult> Index()
        {
              return _context.Opening != null ? 
                          View(await _context.Opening.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Opening'  is null.");
        }

        // GET: Openings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Opening == null)
            {
                return NotFound();
            }

            var opening = await _context.Opening
                .FirstOrDefaultAsync(m => m.Id == id);
            if (opening == null)
            {
                return NotFound();
            }

            return View(opening);
        }

        // GET: Openings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Openings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerID,Year,DaysVacation,DaysOpening")] Opening opening)
        {
            if (ModelState.IsValid)
            {
                _context.Add(opening);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(opening);
        }

        // GET: Openings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Opening == null)
            {
                return NotFound();
            }

            var opening = await _context.Opening.FindAsync(id);
            if (opening == null)
            {
                return NotFound();
            }
            return View(opening);
        }

        // POST: Openings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerID,Year,DaysVacation,DaysOpening")] Opening opening)
        {
            if (id != opening.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(opening);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OpeningExists(opening.Id))
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
            return View(opening);
        }

        // GET: Openings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Opening == null)
            {
                return NotFound();
            }

            var opening = await _context.Opening
                .FirstOrDefaultAsync(m => m.Id == id);
            if (opening == null)
            {
                return NotFound();
            }

            return View(opening);
        }

        // POST: Openings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Opening == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Opening'  is null.");
            }
            var opening = await _context.Opening.FindAsync(id);
            if (opening != null)
            {
                _context.Opening.Remove(opening);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool OpeningExists(int id)
        {
          return (_context.Opening?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

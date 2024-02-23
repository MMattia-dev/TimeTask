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
    public class Opening2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Opening2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Opening2
        public async Task<IActionResult> Index()
        {
              return _context.Opening2 != null ? 
                          View(await _context.Opening2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Opening2'  is null.");
        }

        // GET: Opening2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Opening2 == null)
            {
                return NotFound();
            }

            var opening2 = await _context.Opening2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (opening2 == null)
            {
                return NotFound();
            }

            return View(opening2);
        }

        // GET: Opening2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Opening2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerID,Year,DaysVacation,DaysOpening,OvertimeOpening")] Opening2 opening2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(opening2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(opening2);
        }

        // GET: Opening2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Opening2 == null)
            {
                return NotFound();
            }

            var opening2 = await _context.Opening2.FindAsync(id);
            if (opening2 == null)
            {
                return NotFound();
            }
            return View(opening2);
        }

        // POST: Opening2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerID,Year,DaysVacation,DaysOpening,OvertimeOpening")] Opening2 opening2)
        {
            if (id != opening2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(opening2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Opening2Exists(opening2.Id))
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
            return View(opening2);
        }

        // GET: Opening2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Opening2 == null)
            {
                return NotFound();
            }

            var opening2 = await _context.Opening2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (opening2 == null)
            {
                return NotFound();
            }

            return View(opening2);
        }

        // POST: Opening2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Opening2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Opening2'  is null.");
            }
            var opening2 = await _context.Opening2.FindAsync(id);
            if (opening2 != null)
            {
                _context.Opening2.Remove(opening2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Opening2Exists(int id)
        {
          return (_context.Opening2?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

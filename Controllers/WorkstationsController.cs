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
    public class WorkstationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public WorkstationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Workstations
        public async Task<IActionResult> Index()
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;

            return _context.Workstations != null ? 
                          View(await _context.Workstations.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Workstations'  is null.");
        }

        // GET: Workstations/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Workstations == null)
            {
                return NotFound();
            }

            var workstations = await _context.Workstations
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workstations == null)
            {
                return NotFound();
            }

            return View(workstations);
        }

        // GET: Workstations/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Workstations/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,DepartmentId,Name")] Workstations workstations)
        {
            if (ModelState.IsValid)
            {
                _context.Add(workstations);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(workstations);
        }

        // GET: Workstations/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Workstations == null)
            {
                return NotFound();
            }

            var workstations = await _context.Workstations.FindAsync(id);
            if (workstations == null)
            {
                return NotFound();
            }
            return View(workstations);
        }

        // POST: Workstations/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,DepartmentId,Name")] Workstations workstations)
        {
            if (id != workstations.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(workstations);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WorkstationsExists(workstations.Id))
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
            return View(workstations);
        }

        // GET: Workstations/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Workstations == null)
            {
                return NotFound();
            }

            var workstations = await _context.Workstations
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workstations == null)
            {
                return NotFound();
            }

            return View(workstations);
        }

        // POST: Workstations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Workstations == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Workstations'  is null.");
            }
            var workstations = await _context.Workstations.FindAsync(id);
            if (workstations != null)
            {
                _context.Workstations.Remove(workstations);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool WorkstationsExists(int id)
        {
          return (_context.Workstations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

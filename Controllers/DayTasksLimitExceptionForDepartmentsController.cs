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
    public class DayTasksLimitExceptionForDepartmentsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public DayTasksLimitExceptionForDepartmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: DayTasksLimitExceptionForDepartments
        public async Task<IActionResult> Index()
        {
              return _context.DayTasksLimitExceptionForDepartments != null ? 
                          View(await _context.DayTasksLimitExceptionForDepartments.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.DayTasksLimitExceptionForDepartments'  is null.");
        }

        // GET: DayTasksLimitExceptionForDepartments/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.DayTasksLimitExceptionForDepartments == null)
            {
                return NotFound();
            }

            var dayTasksLimitExceptionForDepartments = await _context.DayTasksLimitExceptionForDepartments
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dayTasksLimitExceptionForDepartments == null)
            {
                return NotFound();
            }

            return View(dayTasksLimitExceptionForDepartments);
        }

        // GET: DayTasksLimitExceptionForDepartments/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: DayTasksLimitExceptionForDepartments/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,DepartmentId,DayTasksLimit")] DayTasksLimitExceptionForDepartments dayTasksLimitExceptionForDepartments)
        {
            if (ModelState.IsValid)
            {
                _context.Add(dayTasksLimitExceptionForDepartments);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(dayTasksLimitExceptionForDepartments);
        }

        // GET: DayTasksLimitExceptionForDepartments/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.DayTasksLimitExceptionForDepartments == null)
            {
                return NotFound();
            }

            var dayTasksLimitExceptionForDepartments = await _context.DayTasksLimitExceptionForDepartments.FindAsync(id);
            if (dayTasksLimitExceptionForDepartments == null)
            {
                return NotFound();
            }
            return View(dayTasksLimitExceptionForDepartments);
        }

        // POST: DayTasksLimitExceptionForDepartments/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,DepartmentId,DayTasksLimit")] DayTasksLimitExceptionForDepartments dayTasksLimitExceptionForDepartments)
        {
            if (id != dayTasksLimitExceptionForDepartments.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dayTasksLimitExceptionForDepartments);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DayTasksLimitExceptionForDepartmentsExists(dayTasksLimitExceptionForDepartments.Id))
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
            return View(dayTasksLimitExceptionForDepartments);
        }

        // GET: DayTasksLimitExceptionForDepartments/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.DayTasksLimitExceptionForDepartments == null)
            {
                return NotFound();
            }

            var dayTasksLimitExceptionForDepartments = await _context.DayTasksLimitExceptionForDepartments
                .FirstOrDefaultAsync(m => m.Id == id);
            if (dayTasksLimitExceptionForDepartments == null)
            {
                return NotFound();
            }

            return View(dayTasksLimitExceptionForDepartments);
        }

        // POST: DayTasksLimitExceptionForDepartments/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.DayTasksLimitExceptionForDepartments == null)
            {
                return Problem("Entity set 'ApplicationDbContext.DayTasksLimitExceptionForDepartments'  is null.");
            }
            var dayTasksLimitExceptionForDepartments = await _context.DayTasksLimitExceptionForDepartments.FindAsync(id);
            if (dayTasksLimitExceptionForDepartments != null)
            {
                _context.DayTasksLimitExceptionForDepartments.Remove(dayTasksLimitExceptionForDepartments);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DayTasksLimitExceptionForDepartmentsExists(int id)
        {
          return (_context.DayTasksLimitExceptionForDepartments?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

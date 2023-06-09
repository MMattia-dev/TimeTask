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
    public class TaskNamesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TaskNamesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TaskNames
        public async Task<IActionResult> Index()
        {
              return _context.TaskName != null ? 
                          View(await _context.TaskName.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TaskName'  is null.");
        }

        // GET: TaskNames/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TaskName == null)
            {
                return NotFound();
            }

            var taskName = await _context.TaskName
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskName == null)
            {
                return NotFound();
            }

            return View(taskName);
        }

        // GET: TaskNames/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TaskNames/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,DepartmentID")] TaskName taskName)
        {
            if (ModelState.IsValid)
            {
                _context.Add(taskName);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(taskName);
        }

        // GET: TaskNames/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TaskName == null)
            {
                return NotFound();
            }

            var taskName = await _context.TaskName.FindAsync(id);
            if (taskName == null)
            {
                return NotFound();
            }
            return View(taskName);
        }

        // POST: TaskNames/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,DepartmentID")] TaskName taskName)
        {
            if (id != taskName.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(taskName);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaskNameExists(taskName.Id))
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
            return View(taskName);
        }

        // GET: TaskNames/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TaskName == null)
            {
                return NotFound();
            }

            var taskName = await _context.TaskName
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskName == null)
            {
                return NotFound();
            }

            return View(taskName);
        }

        // POST: TaskNames/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TaskName == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TaskName'  is null.");
            }
            var taskName = await _context.TaskName.FindAsync(id);
            if (taskName != null)
            {
                _context.TaskName.Remove(taskName);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaskNameExists(int id)
        {
          return (_context.TaskName?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

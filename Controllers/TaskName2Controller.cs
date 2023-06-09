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
    public class TaskName2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public TaskName2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TaskName2
        public async Task<IActionResult> Index()
        {
              return _context.TaskName2 != null ? 
                          View(await _context.TaskName2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TaskName2'  is null.");
        }

        // GET: TaskName2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TaskName2 == null)
            {
                return NotFound();
            }

            var taskName2 = await _context.TaskName2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskName2 == null)
            {
                return NotFound();
            }

            return View(taskName2);
        }

        // GET: TaskName2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TaskName2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,DepartmentID")] TaskName2 taskName2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(taskName2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(taskName2);
        }

        // GET: TaskName2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TaskName2 == null)
            {
                return NotFound();
            }

            var taskName2 = await _context.TaskName2.FindAsync(id);
            if (taskName2 == null)
            {
                return NotFound();
            }
            return View(taskName2);
        }

        // POST: TaskName2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,DepartmentID")] TaskName2 taskName2)
        {
            if (id != taskName2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(taskName2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TaskName2Exists(taskName2.Id))
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
            return View(taskName2);
        }

        // GET: TaskName2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TaskName2 == null)
            {
                return NotFound();
            }

            var taskName2 = await _context.TaskName2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (taskName2 == null)
            {
                return NotFound();
            }

            return View(taskName2);
        }

        // POST: TaskName2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TaskName2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TaskName2'  is null.");
            }
            var taskName2 = await _context.TaskName2.FindAsync(id);
            if (taskName2 != null)
            {
                _context.TaskName2.Remove(taskName2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TaskName2Exists(int id)
        {
          return (_context.TaskName2?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public ActionResult AddTask(string name, int departmentID)
        {
            var newData = new TaskName2()
            {
                Name = name,
                DepartmentID = departmentID,
            };

            _context.TaskName2.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }



    }
}

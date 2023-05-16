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
    public class TImeTasksController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TImeTasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TImeTasks
        public async Task<IActionResult> Index()
        {
              return _context.TImeTask != null ? 
                          View(await _context.TImeTask.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TImeTask'  is null.");
        }

        // GET: TImeTasks/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TImeTask == null)
            {
                return NotFound();
            }

            var tImeTask = await _context.TImeTask
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tImeTask == null)
            {
                return NotFound();
            }

            return View(tImeTask);
        }

        // GET: TImeTasks/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TImeTasks/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,NameId,AvatarId,DepartmentId")] TImeTask tImeTask)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tImeTask);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(tImeTask);
        }

        // GET: TImeTasks/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TImeTask == null)
            {
                return NotFound();
            }

            var tImeTask = await _context.TImeTask.FindAsync(id);
            if (tImeTask == null)
            {
                return NotFound();
            }
            return View(tImeTask);
        }

        // POST: TImeTasks/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,NameId,AvatarId,DepartmentId")] TImeTask tImeTask)
        {
            if (id != tImeTask.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tImeTask);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TImeTaskExists(tImeTask.Id))
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
            return View(tImeTask);
        }

        // GET: TImeTasks/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TImeTask == null)
            {
                return NotFound();
            }

            var tImeTask = await _context.TImeTask
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tImeTask == null)
            {
                return NotFound();
            }

            return View(tImeTask);
        }

        // POST: TImeTasks/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TImeTask == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TImeTask'  is null.");
            }
            var tImeTask = await _context.TImeTask.FindAsync(id);
            if (tImeTask != null)
            {
                _context.TImeTask.Remove(tImeTask);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TImeTaskExists(int id)
        {
          return (_context.TImeTask?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

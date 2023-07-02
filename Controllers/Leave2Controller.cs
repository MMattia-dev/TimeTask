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
    public class Leave2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Leave2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Leave2
        public async Task<IActionResult> Index()
        {
              return _context.Leave2 != null ? 
                          View(await _context.Leave2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Leave2'  is null.");
        }

        // GET: Leave2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Leave2 == null)
            {
                return NotFound();
            }

            var leave2 = await _context.Leave2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (leave2 == null)
            {
                return NotFound();
            }

            return View(leave2);
        }

        // GET: Leave2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Leave2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Description,MaxDays")] Leave2 leave2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(leave2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(leave2);
        }

        // GET: Leave2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Leave2 == null)
            {
                return NotFound();
            }

            var leave2 = await _context.Leave2.FindAsync(id);
            if (leave2 == null)
            {
                return NotFound();
            }
            return View(leave2);
        }

        // POST: Leave2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,MaxDays")] Leave2 leave2)
        {
            if (id != leave2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(leave2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Leave2Exists(leave2.Id))
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
            return View(leave2);
        }

        // GET: Leave2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Leave2 == null)
            {
                return NotFound();
            }

            var leave2 = await _context.Leave2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (leave2 == null)
            {
                return NotFound();
            }

            return View(leave2);
        }

        // POST: Leave2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Leave2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Leave2'  is null.");
            }
            var leave2 = await _context.Leave2.FindAsync(id);
            if (leave2 != null)
            {
                _context.Leave2.Remove(leave2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Leave2Exists(int id)
        {
          return (_context.Leave2?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        public ActionResult AddLeave(string name, string description, int maxdays)
        {
            var newData = new Leave2()
            {
                Name = name,
                Description = description,
                MaxDays = maxdays
            };

            _context.Leave2.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
            //return Json(newData.Id);
        }



    }
}

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
    public class Leave3Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Leave3Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Leave3
        public async Task<IActionResult> Index()
        {
              return _context.Leave3 != null ? 
                          View(await _context.Leave3.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Leave3'  is null.");
        }

        // GET: Leave3/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Leave3 == null)
            {
                return NotFound();
            }

            var leave3 = await _context.Leave3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (leave3 == null)
            {
                return NotFound();
            }

            return View(leave3);
        }

        // GET: Leave3/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Leave3/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Description,MaxDays")] Leave3 leave3)
        {
            if (ModelState.IsValid)
            {
                _context.Add(leave3);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(leave3);
        }

        // GET: Leave3/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Leave3 == null)
            {
                return NotFound();
            }

            var leave3 = await _context.Leave3.FindAsync(id);
            if (leave3 == null)
            {
                return NotFound();
            }
            return View(leave3);
        }

        // POST: Leave3/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,MaxDays")] Leave3 leave3)
        {
            if (id != leave3.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(leave3);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Leave3Exists(leave3.Id))
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
            return View(leave3);
        }

        // GET: Leave3/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Leave3 == null)
            {
                return NotFound();
            }

            var leave3 = await _context.Leave3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (leave3 == null)
            {
                return NotFound();
            }

            return View(leave3);
        }

        // POST: Leave3/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Leave3 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Leave3'  is null.");
            }
            var leave3 = await _context.Leave3.FindAsync(id);
            if (leave3 != null)
            {
                _context.Leave3.Remove(leave3);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Leave3Exists(int id)
        {
          return (_context.Leave3?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        public ActionResult AddLeave(string name, string description, string maxdays)
        {
            var newData = new Leave3()
            {
                Name = name,
                Description = description,
                MaxDays = maxdays
            };

            _context.Leave3.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
            //return Json(newData.Id);
        }



    }
}

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
    public class Wallpaper2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Wallpaper2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Wallpaper2
        public async Task<IActionResult> Index()
        {
              return _context.Wallpaper2 != null ? 
                          View(await _context.Wallpaper2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Wallpaper2'  is null.");
        }

        // GET: Wallpaper2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Wallpaper2 == null)
            {
                return NotFound();
            }

            var wallpaper2 = await _context.Wallpaper2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (wallpaper2 == null)
            {
                return NotFound();
            }

            return View(wallpaper2);
        }

        // GET: Wallpaper2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Wallpaper2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Link,Chosen")] Wallpaper2 wallpaper2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(wallpaper2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(wallpaper2);
        }

        // GET: Wallpaper2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Wallpaper2 == null)
            {
                return NotFound();
            }

            var wallpaper2 = await _context.Wallpaper2.FindAsync(id);
            if (wallpaper2 == null)
            {
                return NotFound();
            }
            return View(wallpaper2);
        }

        // POST: Wallpaper2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Link,Chosen")] Wallpaper2 wallpaper2)
        {
            if (id != wallpaper2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(wallpaper2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Wallpaper2Exists(wallpaper2.Id))
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
            return View(wallpaper2);
        }

        // GET: Wallpaper2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Wallpaper2 == null)
            {
                return NotFound();
            }

            var wallpaper2 = await _context.Wallpaper2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (wallpaper2 == null)
            {
                return NotFound();
            }

            return View(wallpaper2);
        }

        // POST: Wallpaper2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Wallpaper2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Wallpaper2'  is null.");
            }
            var wallpaper2 = await _context.Wallpaper2.FindAsync(id);
            if (wallpaper2 != null)
            {
                _context.Wallpaper2.Remove(wallpaper2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Wallpaper2Exists(int id)
        {
          return (_context.Wallpaper2?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpPost]
        public ActionResult AddWallpaper(string link, bool chosen)
        {
            var newData = new Wallpaper2()
            {
                Link = link,
                Chosen = chosen
            };

            _context.Wallpaper2.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
            //return Json(newData.Id);
        }

        [HttpPost]
        public ActionResult RemoveWallpaper(int id)
        {
            var row = _context.Wallpaper2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Wallpaper2.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }







    }
}

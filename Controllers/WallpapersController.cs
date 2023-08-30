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
    public class WallpapersController : Controller
    {
        private readonly ApplicationDbContext _context;

        public WallpapersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Wallpapers
        public async Task<IActionResult> Index()
        {
              return _context.Wallpaper != null ? 
                          View(await _context.Wallpaper.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Wallpaper'  is null.");
        }

        // GET: Wallpapers/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Wallpaper == null)
            {
                return NotFound();
            }

            var wallpaper = await _context.Wallpaper
                .FirstOrDefaultAsync(m => m.Id == id);
            if (wallpaper == null)
            {
                return NotFound();
            }

            return View(wallpaper);
        }

        // GET: Wallpapers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Wallpapers/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Link")] Wallpaper wallpaper)
        {
            if (ModelState.IsValid)
            {
                _context.Add(wallpaper);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(wallpaper);
        }

        // GET: Wallpapers/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Wallpaper == null)
            {
                return NotFound();
            }

            var wallpaper = await _context.Wallpaper.FindAsync(id);
            if (wallpaper == null)
            {
                return NotFound();
            }
            return View(wallpaper);
        }

        // POST: Wallpapers/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Link")] Wallpaper wallpaper)
        {
            if (id != wallpaper.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(wallpaper);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!WallpaperExists(wallpaper.Id))
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
            return View(wallpaper);
        }

        // GET: Wallpapers/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Wallpaper == null)
            {
                return NotFound();
            }

            var wallpaper = await _context.Wallpaper
                .FirstOrDefaultAsync(m => m.Id == id);
            if (wallpaper == null)
            {
                return NotFound();
            }

            return View(wallpaper);
        }

        // POST: Wallpapers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Wallpaper == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Wallpaper'  is null.");
            }
            var wallpaper = await _context.Wallpaper.FindAsync(id);
            if (wallpaper != null)
            {
                _context.Wallpaper.Remove(wallpaper);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool WallpaperExists(int id)
        {
          return (_context.Wallpaper?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        [HttpPost]
        public ActionResult AddWallpaper(string link)
        {
            var newData = new Wallpaper()
            {
                Link = link,
            };

            _context.Wallpaper.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
            //return Json(newData.Id);
        }

        [HttpPost]
        public ActionResult RemoveWallpaper(int id)
        {
            var row = _context.Wallpaper.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Wallpaper.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }



    }
}

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
    public class MainSettings2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public MainSettings2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: MainSettings2
        public async Task<IActionResult> Index()
        {
              return _context.MainSettings2 != null ? 
                          View(await _context.MainSettings2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.MainSettings2'  is null.");
        }

        // GET: MainSettings2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.MainSettings2 == null)
            {
                return NotFound();
            }

            var mainSettings2 = await _context.MainSettings2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (mainSettings2 == null)
            {
                return NotFound();
            }

            return View(mainSettings2);
        }

        // GET: MainSettings2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MainSettings2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,PoraNocna_Poczatek,PoraNocna_Koniec,WolnyPoniedzialek,WolnyWtorek,WolnaSroda,WolnyCzwartek,WolnyPiatek,WolnaSobota,WolnaNiedziela")] MainSettings2 mainSettings2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(mainSettings2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(mainSettings2);
        }

        // GET: MainSettings2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.MainSettings2 == null)
            {
                return NotFound();
            }

            var mainSettings2 = await _context.MainSettings2.FindAsync(id);
            if (mainSettings2 == null)
            {
                return NotFound();
            }
            return View(mainSettings2);
        }

        // POST: MainSettings2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,PoraNocna_Poczatek,PoraNocna_Koniec,WolnyPoniedzialek,WolnyWtorek,WolnaSroda,WolnyCzwartek,WolnyPiatek,WolnaSobota,WolnaNiedziela")] MainSettings2 mainSettings2)
        {
            if (id != mainSettings2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(mainSettings2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MainSettings2Exists(mainSettings2.Id))
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
            return View(mainSettings2);
        }

        // GET: MainSettings2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.MainSettings2 == null)
            {
                return NotFound();
            }

            var mainSettings2 = await _context.MainSettings2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (mainSettings2 == null)
            {
                return NotFound();
            }

            return View(mainSettings2);
        }

        // POST: MainSettings2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.MainSettings2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.MainSettings2'  is null.");
            }
            var mainSettings2 = await _context.MainSettings2.FindAsync(id);
            if (mainSettings2 != null)
            {
                _context.MainSettings2.Remove(mainSettings2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MainSettings2Exists(int id)
        {
          return (_context.MainSettings2?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

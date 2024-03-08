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
    public class TimeSettings3Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public TimeSettings3Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TimeSettings3
        public async Task<IActionResult> Index()
        {
              return _context.TimeSettings3 != null ? 
                          View(await _context.TimeSettings3.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TimeSettings3'  is null.");
        }

        // GET: TimeSettings3/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TimeSettings3 == null)
            {
                return NotFound();
            }

            var timeSettings3 = await _context.TimeSettings3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSettings3 == null)
            {
                return NotFound();
            }

            return View(timeSettings3);
        }

        // GET: TimeSettings3/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TimeSettings3/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerId,OkresRozliczeniowy,jezeliTydzien,jezeliMiesiac,CzasPracy,MaksymalnaLiczbaNadgodzin,MaksymalnaLiczbaNadgodzinTydzien,NieprzerwanyOdpoczynek,PoraNocnaStart,PoraNocnaKoniec,CzyPoniedzialekWolny,CzyWtorekWolny,CzySrodaWolny,CzyCzwartekWolny,CzyPiatekWolny,CzySobotaWolny,CzyNiedzielaWolny")] TimeSettings3 timeSettings3)
        {
            if (ModelState.IsValid)
            {
                _context.Add(timeSettings3);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(timeSettings3);
        }

        // GET: TimeSettings3/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TimeSettings3 == null)
            {
                return NotFound();
            }

            var timeSettings3 = await _context.TimeSettings3.FindAsync(id);
            if (timeSettings3 == null)
            {
                return NotFound();
            }
            return View(timeSettings3);
        }

        // POST: TimeSettings3/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerId,OkresRozliczeniowy,jezeliTydzien,jezeliMiesiac,CzasPracy,MaksymalnaLiczbaNadgodzin,MaksymalnaLiczbaNadgodzinTydzien,NieprzerwanyOdpoczynek,PoraNocnaStart,PoraNocnaKoniec,CzyPoniedzialekWolny,CzyWtorekWolny,CzySrodaWolny,CzyCzwartekWolny,CzyPiatekWolny,CzySobotaWolny,CzyNiedzielaWolny")] TimeSettings3 timeSettings3)
        {
            if (id != timeSettings3.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(timeSettings3);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TimeSettings3Exists(timeSettings3.Id))
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
            return View(timeSettings3);
        }

        // GET: TimeSettings3/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TimeSettings3 == null)
            {
                return NotFound();
            }

            var timeSettings3 = await _context.TimeSettings3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (timeSettings3 == null)
            {
                return NotFound();
            }

            return View(timeSettings3);
        }

        // POST: TimeSettings3/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TimeSettings3 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TimeSettings3'  is null.");
            }
            var timeSettings3 = await _context.TimeSettings3.FindAsync(id);
            if (timeSettings3 != null)
            {
                _context.TimeSettings3.Remove(timeSettings3);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TimeSettings3Exists(int id)
        {
          return (_context.TimeSettings3?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

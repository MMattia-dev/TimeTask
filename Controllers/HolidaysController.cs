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
    public class HolidaysController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HolidaysController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Holidays
        public async Task<IActionResult> Index()
        {          
            //IList<DateTime> result = new PolandPublicHoliday().PublicHolidays(DateTime.Now.Year);
            //ViewBag.Public_Holidays = result;


            return _context.Holiday != null ? 
                          View(await _context.Holiday.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Holiday'  is null.");
        }

        // GET: Holidays/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Holiday == null)
            {
                return NotFound();
            }

            var holiday = await _context.Holiday
                .FirstOrDefaultAsync(m => m.Id == id);
            if (holiday == null)
            {
                return NotFound();
            }

            return View(holiday);
        }

        // GET: Holidays/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Holidays/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Date")] Models.Holiday holiday)
        {
            if (ModelState.IsValid)
            {
                _context.Add(holiday);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(holiday);
        }

        // GET: Holidays/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Holiday == null)
            {
                return NotFound();
            }

            var holiday = await _context.Holiday.FindAsync(id);
            if (holiday == null)
            {
                return NotFound();
            }
            return View(holiday);
        }

        // POST: Holidays/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Date")] Models.Holiday holiday)
        {
            if (id != holiday.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(holiday);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!HolidayExists(holiday.Id))
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
            return View(holiday);
        }

        // GET: Holidays/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Holiday == null)
            {
                return NotFound();
            }

            var holiday = await _context.Holiday
                .FirstOrDefaultAsync(m => m.Id == id);
            if (holiday == null)
            {
                return NotFound();
            }

            return View(holiday);
        }

        // POST: Holidays/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Holiday == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Holiday'  is null.");
            }
            var holiday = await _context.Holiday.FindAsync(id);
            if (holiday != null)
            {
                _context.Holiday.Remove(holiday);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool HolidayExists(int id)
        {
          return (_context.Holiday?.Any(e => e.Id == id)).GetValueOrDefault();
        }


        [HttpPost]
        public ActionResult AddHoliday(string name, DateTime date)
        {
            var newData = new Models.Holiday()
            {
                Name = name,
                Date = date,
            };

            _context.Holiday.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditHoliday(int id, string name, DateTime date)
        {
            var row = _context.Holiday.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.Name = name;
                row.Date = date;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }




    }
}

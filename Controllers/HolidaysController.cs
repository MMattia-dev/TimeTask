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

        [HttpPost]
        public ActionResult RemoveHoliday(int id)
        {
            var row = _context.Holiday.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Holiday.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpGet]
        public ActionResult AddForm()
        {
            string form = "<div id=\"GpoavnFwAOos\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" autocomplete=\"off\" placeholder=\"nazwa święta...\" id=\"oVxJeHhcExMV\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<input class=\"form-control\" type=\"date\" id=\"IyWRFThVHhEX\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"BmJPiKFdcncS()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"EjaqSVIBTCAu()\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult EditForm()
        {
            string form = "<div id=\"HnwuRhmRcJCZacg\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" +
                        "<div class=\"form-group\">" +
                            "<input class=\"form-control\" autocomplete=\"off\" placeholder=\"nazwa święta...\" id=\"WjuzdnDpZbVVtTO\" />" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<input class=\"form-control\" type=\"date\" id=\"osABhxQjWaMpiQP\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Edytuj\" class=\"btn-custom\" onclick=\"lwuUErBiOwfxbau()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"EjaqSVIBTCAu()\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpGet]
        public ActionResult DeleteForm()
        {
            string form = "<div id=\"YiAVCpnVzhDnOsL\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"jbiihcodqinw\">" +
                        "<div class=\"IvBtEDulLESDYxK\">" +
                            "<span id=\"ewZOdyapfFtPtMi\"></span>" +
                            "<span id=\"nZDLxLTZwFzAFCY\"></span>" +
                        "</div>" +
                        "<div class=\"btn-danger-div\" id=\"FamcDfiHIvhi\">" +
                            "<input type=\"button\" value=\"Usuń\" id=\"XSkMvvmEXCee\" onclick=\"dDlRcSCJZAuO()\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"EjaqSVIBTCAu()\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }


    }
}

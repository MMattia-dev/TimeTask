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
    public class Reminders3Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Reminders3Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Reminders3
        public async Task<IActionResult> Index()
        {
              return _context.Reminders3 != null ? 
                          View(await _context.Reminders3.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Reminders3'  is null.");
        }

        // GET: Reminders3/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Reminders3 == null)
            {
                return NotFound();
            }

            var reminders3 = await _context.Reminders3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reminders3 == null)
            {
                return NotFound();
            }

            return View(reminders3);
        }

        // GET: Reminders3/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Reminders3/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserID,Title,ReminderDescription,CreatedDate,RemindDate")] Reminders3 reminders3)
        {
            if (ModelState.IsValid)
            {
                _context.Add(reminders3);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(reminders3);
        }

        // GET: Reminders3/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Reminders3 == null)
            {
                return NotFound();
            }

            var reminders3 = await _context.Reminders3.FindAsync(id);
            if (reminders3 == null)
            {
                return NotFound();
            }
            return View(reminders3);
        }

        // POST: Reminders3/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserID,Title,ReminderDescription,CreatedDate,RemindDate")] Reminders3 reminders3)
        {
            if (id != reminders3.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(reminders3);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Reminders3Exists(reminders3.Id))
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
            return View(reminders3);
        }

        // GET: Reminders3/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Reminders3 == null)
            {
                return NotFound();
            }

            var reminders3 = await _context.Reminders3
                .FirstOrDefaultAsync(m => m.Id == id);
            if (reminders3 == null)
            {
                return NotFound();
            }

            return View(reminders3);
        }

        // POST: Reminders3/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Reminders3 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Reminders3'  is null.");
            }
            var reminders3 = await _context.Reminders3.FindAsync(id);
            if (reminders3 != null)
            {
                _context.Reminders3.Remove(reminders3);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Reminders3Exists(int id)
        {
          return (_context.Reminders3?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet]
        public ActionResult ReminderForm(string userId)
        {
            string removeForm = "$('#QmRrlOQPQW_').remove()";

            string form = "<div id=\"QmRrlOQPQW_\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_\">" + 
                        "<div class=\"form-group\">" +
                            "<label>Tytuł:</label>" +
                            "<input class=\"form-control\" id=\"eukQhRRxfSOLpnw\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Opis (opcjonalny):</label>" +
                            "<textarea class=\"form-control\" id=\"jDThjzzlsljpHvT\"></textarea>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Data przypomnienia:</label>" +
                            "<input class=\"form-control\" type=\"date\" id=\"XJUMGizHzectesQ\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"addReminder('" + userId + "')\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult AddReminder(string userId, string title, string? description, DateTime? reminderDate)
        {
            if (userId.Length > 0 && title.Length > 0)
            {
                var newData = new Reminders3()
                {
                    UserID = userId,
                    Title = title,
                    ReminderDescription = description,
                    CreatedDate = DateTime.Now.Date,
                    RemindDate = reminderDate
                };

                _context.Reminders3.Add(newData);
                _context.SaveChanges();

                return Json(true);
            }

            return Json(false);
        }






    }
}

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
    public class Opening2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Opening2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Opening2
        public async Task<IActionResult> Index()
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;

            return _context.Opening2 != null ? 
                          View(await _context.Opening2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Opening2'  is null.");
        }

        // GET: Opening2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Opening2 == null)
            {
                return NotFound();
            }

            var opening2 = await _context.Opening2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (opening2 == null)
            {
                return NotFound();
            }

            return View(opening2);
        }

        // GET: Opening2/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Opening2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,WorkerID,Year,DaysVacation,DaysOpening,OvertimeOpening")] Opening2 opening2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(opening2);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(opening2);
        }

        // GET: Opening2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Opening2 == null)
            {
                return NotFound();
            }

            var opening2 = await _context.Opening2.FindAsync(id);
            if (opening2 == null)
            {
                return NotFound();
            }
            return View(opening2);
        }

        // POST: Opening2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,WorkerID,Year,DaysVacation,DaysOpening,OvertimeOpening")] Opening2 opening2)
        {
            if (id != opening2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(opening2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Opening2Exists(opening2.Id))
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
            return View(opening2);
        }

        // GET: Opening2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Opening2 == null)
            {
                return NotFound();
            }

            var opening2 = await _context.Opening2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (opening2 == null)
            {
                return NotFound();
            }

            return View(opening2);
        }

        // POST: Opening2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Opening2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Opening2'  is null.");
            }
            var opening2 = await _context.Opening2.FindAsync(id);
            if (opening2 != null)
            {
                _context.Opening2.Remove(opening2);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool Opening2Exists(int id)
        {
          return (_context.Opening2?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet]
        public ActionResult NewOpeningForm(int id)
        {
            var workerSurname = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Surname;
            var workerName = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.Name;
            var workersDepartment = ((IEnumerable<Workers2>)_context.Workers2).FirstOrDefault(x => x.Id == id)?.DepartmentID;
            var departmentName = ((IEnumerable<Department>)_context.Department).FirstOrDefault(x => x.Id == workersDepartment)?.Name;



            string removeForm = "$('#QmRrlOQPQW_').remove()";

            string form = "<div id=\"QmRrlOQPQW_\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_ ZOVrPTgSspFJBET_\">" +
                        /*
                        "<div class=\"form-group\">" +
                            "<label>Imię:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"GVegODKbEh\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Nazwisko:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"toPdQnPuvH\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Dział:</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"OyRfwpeqzbeyVEW\" onchange=\"KHpqBjUFdnnaWxq(this)\">" +
                                departments +
                            "</select>" +
                        "</div>" +


                        "<div class=\"form-group\">" +
                            "<label>Stanowisko (opcjonalne):</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"cWSWdChjLlkqTlQ\">" +
                                "<option selected></option>" +
                                workstationsOptions +
                            "</select>" +
                        "</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Zmiana (opcjonalne):</label>" +
                            "<select class=\"form-control bYwPpsleuVCBkPv\" id=\"VcVGBJCedKJagyX\">" +
                                "<option selected></option>" +
                                shiftOptions +
                            "</select>" +
                        "</div>" +
                        */

                        "<span>Bilans otwarcia</span>" +

                        "<div class=\"form-group\">" +
                            "<label>Imię:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + workerName + "\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Nazwisko:</label>" +
                            "<input class=\"form-control\" disabled value=\"" + workerSurname + "\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Ilość przysługującego urlopu:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"\" maxlength=\"2\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<label>Ilość pozostałego do wykorzystania urlopu:</label>" +
                            "<input class=\"form-control\" autocomplete=\"off\" id=\"\" maxlength=\"2\" onkeypress=\"return isNumberKey(event)\" />" +
                        "</div>" +
                        //"<div class=\"form-group\">" +
                        //    "<label>Stan na rok:</label>" +
                        //    "<input class=\"form-control\" value=\"" + DateTime.Now.Year + "\" autocomplete=\"off\" id=\"\" maxlength=\"4\" onkeypress=\"return isNumberKey(event)\" />" +
                        //"</div>" +
                        "<div class=\"form-group form-group-margin\">" +
                            "<label>Stan na dzień:</label>" +
                            "<input class=\"form-control\" type=\"date\" id=\"\" />" +
                        "</div>" +




                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"\" />" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"Dodaj później\" class=\"btn-custom_\" onclick=\"" + removeForm + "\" />" +
                        "</div>" +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }



    }
}

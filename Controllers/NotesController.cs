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
    public class NotesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public NotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Notes
        public async Task<IActionResult> Index()
        {
              return _context.Note != null ? 
                          View(await _context.Note.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Note'  is null.");
        }

        // GET: Notes/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Note == null)
            {
                return NotFound();
            }

            var note = await _context.Note
                .FirstOrDefaultAsync(m => m.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            return View(note);
        }

        // GET: Notes/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Notes/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserID,NoteDescription,CreatedDate")] Note note)
        {
            if (ModelState.IsValid)
            {
                _context.Add(note);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(note);
        }

        // GET: Notes/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Note == null)
            {
                return NotFound();
            }

            var note = await _context.Note.FindAsync(id);
            if (note == null)
            {
                return NotFound();
            }
            return View(note);
        }

        // POST: Notes/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserID,NoteDescription,CreatedDate")] Note note)
        {
            if (id != note.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(note);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!NoteExists(note.Id))
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
            return View(note);
        }

        // GET: Notes/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Note == null)
            {
                return NotFound();
            }

            var note = await _context.Note
                .FirstOrDefaultAsync(m => m.Id == id);
            if (note == null)
            {
                return NotFound();
            }

            return View(note);
        }

        // POST: Notes/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Note == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Note'  is null.");
            }
            var note = await _context.Note.FindAsync(id);
            if (note != null)
            {
                _context.Note.Remove(note);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool NoteExists(int id)
        {
          return (_context.Note?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet]
        public ActionResult NoteForm(int id, string userId)
        {
            string title = "";
            string description = "";
            string button = "";
            string edit = "";
            string formClass = "";

            if (id == 0)
            {
                //nowa notatka
                //title = "<input class=\"form-control\" id=\"eukQhRRxfSOLpnw\" />";
                title = "<div class=\"form-group\">" +
                            "<label>Tytuł:</label>" +
                            "<input class=\"form-control\" id=\"eukQhRRxfSOLpnw\" />" +
                        "</div>";

                //description = "<textarea class=\"form-control\" id=\"jDThjzzlsljpHvT\"></textarea>";

                description = "<div class=\"form-group form-group-margin\">" +
                                "<label>Notatka:</label>" +
                                "<textarea class=\"form-control\" id=\"jDThjzzlsljpHvT\"></textarea>" +
                              "</div>";

                button = "<input type=\"button\" value=\"Zapisz\" class=\"btn-custom\" onclick=\"addNote('" + userId + "')\" />";
            }
            else
            {
                //edytuj notatkę
                //title = "<input disabled class=\"form-control showOnly\" id=\"eukQhRRxfSOLpnw\" value=\"" + _context.Note.First(x => x.Id == id).Title + "\" />";

                title = "<div class=\"form-group\">" +
                            //"<label>Tytuł:</label>" +
                            //"<input disabled class=\"form-control showOnly\" id=\"eukQhRRxfSOLpnw\" value=\"" + _context.Note.First(x => x.Id == id).Title + "\" />" +
                            "<div class=\"form-group-title\">" + _context.Note.First(x => x.Id == id).Title + "</div>" +
                        "</div>";

                if (_context.Note.FirstOrDefault(x => x.Id == id)?.NoteDescription != null)
                {
                    //description = "<textarea disabled class=\"form-control showOnly\" id=\"jDThjzzlsljpHvT\">" + _context.Note.FirstOrDefault(x => x.Id == id)?.NoteDescription + "</textarea>";

                    description = "<div class=\"form-group form-group-margin\">" +
                                    //"<label>Notatka:</label>" +
                                    //"<textarea disabled class=\"form-control showOnly\" id=\"jDThjzzlsljpHvT\">" + _context.Note.FirstOrDefault(x => x.Id == id)?.NoteDescription + "</textarea>" +
                                    "<div class=\"form-group-description\">" + _context.Note.FirstOrDefault(x => x.Id == id)?.NoteDescription + "</div>" +
                                  "</div>";
                }

                edit = "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk XyrCtgZmYtYrOIv\" onclick=\"enableEditingNote(this, " + id + ")\" title=\"Edytuj\"><ion-icon name=\"create\"></ion-icon></div>";

                formClass = "form_s";
            }

            string removeForm = "$('#QmRrlOQPQW_').remove()";

            string form = "<div id=\"QmRrlOQPQW_\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"form_ "+ formClass +"\">" +
                        title +
                        description +
                        "<div class=\"form-group\" id=\"ZCgKNAepuiycabt\">" +
                            button +
                        "</div>" +
                        "<div class=\"form-group\" id=\"wRuWInrLLyzEnrp\">" +
                        //
                        "</div>" +
                        edit +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        [HttpPost]
        public ActionResult AddNote(string userId, string title, string description)
        {
            if (userId.Length > 0 && title != null && description != null)
            {
                var newData = new Note()
                {
                    UserID = userId,
                    Title = title,
                    NoteDescription = description,
                    CreatedDate = DateTime.Now.Date,
                };

                _context.Note.Add(newData);
                _context.SaveChanges();

                return Json(true);
            }

            return Json(false);


            //return Json(userId);



        }







    }
}

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
    public class ChatsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ChatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Chats
        public async Task<IActionResult> Index()
        {
              return _context.Chat != null ? 
                          View(await _context.Chat.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Chat'  is null.");
        }

        // GET: Chats/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Chat == null)
            {
                return NotFound();
            }

            var chat = await _context.Chat
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chat == null)
            {
                return NotFound();
            }

            return View(chat);
        }

        // GET: Chats/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Chats/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,SenderUserId,ReceiverUserId,MessageText,MessageSentDate,SentFileLocation,IfMessageRead")] Chat chat)
        {
            if (ModelState.IsValid)
            {
                _context.Add(chat);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(chat);
        }

        // GET: Chats/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Chat == null)
            {
                return NotFound();
            }

            var chat = await _context.Chat.FindAsync(id);
            if (chat == null)
            {
                return NotFound();
            }
            return View(chat);
        }

        // POST: Chats/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,SenderUserId,ReceiverUserId,MessageText,MessageSentDate,SentFileLocation,IfMessageRead")] Chat chat)
        {
            if (id != chat.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(chat);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ChatExists(chat.Id))
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
            return View(chat);
        }

        // GET: Chats/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Chat == null)
            {
                return NotFound();
            }

            var chat = await _context.Chat
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chat == null)
            {
                return NotFound();
            }

            return View(chat);
        }

        // POST: Chats/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Chat == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Chat'  is null.");
            }
            var chat = await _context.Chat.FindAsync(id);
            if (chat != null)
            {
                _context.Chat.Remove(chat);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ChatExists(int id)
        {
          return (_context.Chat?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet]
        public ActionResult FilterDiv(string u)
        {
            var userWorkerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == u)?.WorkerId;
            var userDepartmentId = _context.Workers2.FirstOrDefault(x => x.Id == userWorkerId)?.DepartmentID;
            //var userDepartmentName = _context.Department.FirstOrDefault(x => x.Id == userDepartmentId)?.Name;

            var departmentsOptions = "<option value\"all\">Wszyscy</option>";
            foreach (var department in _context.Department.OrderBy(x => x.Name))
            {
                if (userDepartmentId == department.Id)
                {
					departmentsOptions += "<option selected value=\"" + department.Id + "\">" + department.Name + "</option>";
				}
                else
                {
					departmentsOptions += "<option value=\"" + department.Id + "\">" + department.Name + "</option>";
				}
                
            }

            string div = "<div class=\"chatFilter\">" +
					"<a class=\"chatMinimize filterClose\" title=\"Zamknij\" onclick=\"scQisAIXdDGVbXF(this)\">" +
						"<ion-icon name=\"close-outline\"></ion-icon>" +
                    "</a>" +
					"<div class=\"chatFilterParent\">" +
						"<div class=\"chatFilterDepartment\">" +
							"<label>Pokaż osoby z działu:</label>" +
							"<select class=\"form-control xNiaHJPRvUxJGBW\">" +
								departmentsOptions +
                            "</select>" +
                        "</div>" +
						"<div style=\"height: 1px; width: 100%; background-color: rgba(255, 255, 255, 0.1);\"></div>" +
                        "<div class=\"chatFilterDepartment\">" +
                            "<label>Pokaż rozmowy w obrębie czasu:</label>" +
                            "<div class=\"chatFilterDates\">" +
                                "<input type=\"date\" class=\"form-control xNiaHJPRvUxJGBW PZrqDDIccpmCYkx\" />" +
                                "<span>-</span>" +
                                "<input type=\"date\" class=\"form-control xNiaHJPRvUxJGBW PZrqDDIccpmCYkx\" />" +
                            "</div>" +
                        "</div>" +


                    "</div>" +
                "</div>";

            return Content(div);
        }








    }
}

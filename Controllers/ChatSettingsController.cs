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
    public class ChatSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ChatSettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: ChatSettings
        public async Task<IActionResult> Index()
        {
              return _context.ChatSettings != null ? 
                          View(await _context.ChatSettings.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.ChatSettings'  is null.");
        }

        // GET: ChatSettings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.ChatSettings == null)
            {
                return NotFound();
            }

            var chatSettings = await _context.ChatSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chatSettings == null)
            {
                return NotFound();
            }

            return View(chatSettings);
        }

        // GET: ChatSettings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: ChatSettings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,chatBackground,userChatColor,senderChatColor")] ChatSettings chatSettings)
        {
            if (ModelState.IsValid)
            {
                _context.Add(chatSettings);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(chatSettings);
        }

        // GET: ChatSettings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.ChatSettings == null)
            {
                return NotFound();
            }

            var chatSettings = await _context.ChatSettings.FindAsync(id);
            if (chatSettings == null)
            {
                return NotFound();
            }
            return View(chatSettings);
        }

        // POST: ChatSettings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,chatBackground,userChatColor,senderChatColor")] ChatSettings chatSettings)
        {
            if (id != chatSettings.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(chatSettings);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ChatSettingsExists(chatSettings.Id))
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
            return View(chatSettings);
        }

        // GET: ChatSettings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.ChatSettings == null)
            {
                return NotFound();
            }

            var chatSettings = await _context.ChatSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (chatSettings == null)
            {
                return NotFound();
            }

            return View(chatSettings);
        }

        // POST: ChatSettings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.ChatSettings == null)
            {
                return Problem("Entity set 'ApplicationDbContext.ChatSettings'  is null.");
            }
            var chatSettings = await _context.ChatSettings.FindAsync(id);
            if (chatSettings != null)
            {
                _context.ChatSettings.Remove(chatSettings);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ChatSettingsExists(int id)
        {
          return (_context.ChatSettings?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

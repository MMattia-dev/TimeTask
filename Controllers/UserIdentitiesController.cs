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
    public class UserIdentitiesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserIdentitiesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: UserIdentities
        public async Task<IActionResult> Index()
        {
              return _context.UserIdentity != null ? 
                          View(await _context.UserIdentity.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.UserIdentity'  is null.");
        }

        // GET: UserIdentities/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.UserIdentity == null)
            {
                return NotFound();
            }

            var userIdentity = await _context.UserIdentity
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userIdentity == null)
            {
                return NotFound();
            }

            return View(userIdentity);
        }

        // GET: UserIdentities/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: UserIdentities/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,WorkerId,GroupId")] UserIdentity userIdentity)
        {
            if (ModelState.IsValid)
            {
                _context.Add(userIdentity);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(userIdentity);
        }

        // GET: UserIdentities/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.UserIdentity == null)
            {
                return NotFound();
            }

            var userIdentity = await _context.UserIdentity.FindAsync(id);
            if (userIdentity == null)
            {
                return NotFound();
            }
            return View(userIdentity);
        }

        // POST: UserIdentities/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,WorkerId,GroupId")] UserIdentity userIdentity)
        {
            if (id != userIdentity.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(userIdentity);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserIdentityExists(userIdentity.Id))
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
            return View(userIdentity);
        }

        // GET: UserIdentities/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.UserIdentity == null)
            {
                return NotFound();
            }

            var userIdentity = await _context.UserIdentity
                .FirstOrDefaultAsync(m => m.Id == id);
            if (userIdentity == null)
            {
                return NotFound();
            }

            return View(userIdentity);
        }

        // POST: UserIdentities/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.UserIdentity == null)
            {
                return Problem("Entity set 'ApplicationDbContext.UserIdentity'  is null.");
            }
            var userIdentity = await _context.UserIdentity.FindAsync(id);
            if (userIdentity != null)
            {
                _context.UserIdentity.Remove(userIdentity);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UserIdentityExists(int id)
        {
          return (_context.UserIdentity?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

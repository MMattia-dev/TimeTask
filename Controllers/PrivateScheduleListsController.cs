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
    public class PrivateScheduleListsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PrivateScheduleListsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: PrivateScheduleLists
        public async Task<IActionResult> Index()
        {
              return _context.PrivateScheduleList != null ? 
                          View(await _context.PrivateScheduleList.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.PrivateScheduleList'  is null.");
        }

        // GET: PrivateScheduleLists/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.PrivateScheduleList == null)
            {
                return NotFound();
            }

            var privateScheduleList = await _context.PrivateScheduleList
                .FirstOrDefaultAsync(m => m.Id == id);
            if (privateScheduleList == null)
            {
                return NotFound();
            }

            return View(privateScheduleList);
        }

        // GET: PrivateScheduleLists/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PrivateScheduleLists/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,WorkerId,GroupId")] PrivateScheduleList privateScheduleList)
        {
            if (ModelState.IsValid)
            {
                _context.Add(privateScheduleList);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(privateScheduleList);
        }

        // GET: PrivateScheduleLists/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.PrivateScheduleList == null)
            {
                return NotFound();
            }

            var privateScheduleList = await _context.PrivateScheduleList.FindAsync(id);
            if (privateScheduleList == null)
            {
                return NotFound();
            }
            return View(privateScheduleList);
        }

        // POST: PrivateScheduleLists/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,WorkerId,GroupId")] PrivateScheduleList privateScheduleList)
        {
            if (id != privateScheduleList.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(privateScheduleList);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PrivateScheduleListExists(privateScheduleList.Id))
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
            return View(privateScheduleList);
        }

        // GET: PrivateScheduleLists/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.PrivateScheduleList == null)
            {
                return NotFound();
            }

            var privateScheduleList = await _context.PrivateScheduleList
                .FirstOrDefaultAsync(m => m.Id == id);
            if (privateScheduleList == null)
            {
                return NotFound();
            }

            return View(privateScheduleList);
        }

        // POST: PrivateScheduleLists/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.PrivateScheduleList == null)
            {
                return Problem("Entity set 'ApplicationDbContext.PrivateScheduleList'  is null.");
            }
            var privateScheduleList = await _context.PrivateScheduleList.FindAsync(id);
            if (privateScheduleList != null)
            {
                _context.PrivateScheduleList.Remove(privateScheduleList);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PrivateScheduleListExists(int id)
        {
          return (_context.PrivateScheduleList?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

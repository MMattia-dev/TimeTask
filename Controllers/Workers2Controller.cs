using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using TimeTask.Data;
using TimeTask.Models;

namespace TimeTask.Controllers
{
    public class Workers2Controller : Controller
    {
        private readonly ApplicationDbContext _context;

        public Workers2Controller(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Workers2
        public async Task<IActionResult> Index()
        {
              return _context.Workers2 != null ? 
                          View(await _context.Workers2.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Workers2'  is null.");
        }

        // GET: Workers2/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Workers2 == null)
            {
                return NotFound();
            }

            var workers2 = await _context.Workers2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workers2 == null)
            {
                return NotFound();
            }

            return View(workers2);
        }

        // GET: Workers2/Create
        public IActionResult Create()
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;

            return View();
        }

        // POST: Workers2/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Surname,DepartmentID,Employed")] Workers2 workers2)
        {
            if (ModelState.IsValid)
            {
                _context.Add(workers2);
                await _context.SaveChangesAsync();
                //return RedirectToAction(nameof(Index));
                return RedirectToAction("Index", "Departments");
            }
            return View(workers2);
        }

        // GET: Workers2/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;

            if (id == null || _context.Workers2 == null)
            {
                return NotFound();
            }

            var workers2 = await _context.Workers2.FindAsync(id);
            if (workers2 == null)
            {
                return NotFound();
            }
            return View(workers2);
        }

        // POST: Workers2/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Surname,DepartmentID,Employed")] Workers2 workers2)
        {
            if (id != workers2.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(workers2);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!Workers2Exists(workers2.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                //return RedirectToAction(nameof(Index));
                return RedirectToAction("Index", "Home");
            }
            return View(workers2);
        }

        // GET: Workers2/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Workers2 == null)
            {
                return NotFound();
            }

            var workers2 = await _context.Workers2
                .FirstOrDefaultAsync(m => m.Id == id);
            if (workers2 == null)
            {
                return NotFound();
            }

            return View(workers2);
        }

        // POST: Workers2/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Workers2 == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Workers2'  is null.");
            }
            var workers2 = await _context.Workers2.FindAsync(id);
            if (workers2 != null)
            {
                _context.Workers2.Remove(workers2);
            }
            
            await _context.SaveChangesAsync();
            //return RedirectToAction(nameof(Index));
            return RedirectToAction("Index", "Home");
        }

        private bool Workers2Exists(int id)
        {
          return (_context.Workers2?.Any(e => e.Id == id)).GetValueOrDefault();
        }



        public ActionResult GetWorker(int id)
        {
            var workers2s = (from c in _context.Workers2
                             where c.Id == id
                             select c).FirstOrDefault();

            return Json(workers2s);
        }

        [HttpPost]
        public ActionResult ChangeWorkerDepartment(int id, int departmentID)
        {
            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.DepartmentID = departmentID;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult DeleteWorker(int id)
        {
            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.Workers2.Remove(row);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }

        [HttpPost]
        public ActionResult AddNewWorker(string name, string surname, int departmentID, bool employed)
        {
            var newData = new Workers2()
            {
                Name = name,
                Surname = surname,
                DepartmentID = departmentID,
                Employed = employed
            };

            _context.Workers2.Add(newData);
            _context.SaveChanges();
            return Json(new { success = true });
        }

        [HttpPost]
        public ActionResult EditWorker(int id, string name, string surname)
        {
            var row = _context.Workers2.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                row.Name = name;
                row.Surname = surname;
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(new { success = false });
        }




    }
}

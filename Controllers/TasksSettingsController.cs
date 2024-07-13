using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using TimeTask.Data;
using TimeTask.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TimeTask.Controllers
{
    public class TasksSettingsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TasksSettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: TasksSettings
        public async Task<IActionResult> Index()
        {
              return _context.TasksSettings != null ? 
                          View(await _context.TasksSettings.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.TasksSettings'  is null.");
        }

        // GET: TasksSettings/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.TasksSettings == null)
            {
                return NotFound();
            }

            var tasksSettings = await _context.TasksSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tasksSettings == null)
            {
                return NotFound();
            }

            return View(tasksSettings);
        }

        // GET: TasksSettings/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: TasksSettings/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,UserId,WorkScheduleView,FirstDayOfWeek,DayTasksLimit,ShowLeaves,ShowHolidays,AutoCopySchedule,StartCopyScheduleDate,AutoDownloadSchedule,StartDownloadScheduleDate,LockScheduleEdit,LockTime")] TasksSettings tasksSettings)
        {
            if (ModelState.IsValid)
            {
                _context.Add(tasksSettings);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(tasksSettings);
        }

        // GET: TasksSettings/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.TasksSettings == null)
            {
                return NotFound();
            }

            var tasksSettings = await _context.TasksSettings.FindAsync(id);
            if (tasksSettings == null)
            {
                return NotFound();
            }
            return View(tasksSettings);
        }

        // POST: TasksSettings/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,UserId,WorkScheduleView,FirstDayOfWeek,DayTasksLimit,ShowLeaves,ShowHolidays,AutoCopySchedule,StartCopyScheduleDate,AutoDownloadSchedule,StartDownloadScheduleDate,LockScheduleEdit,LockTime")] TasksSettings tasksSettings)
        {
            if (id != tasksSettings.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(tasksSettings);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TasksSettingsExists(tasksSettings.Id))
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
            return View(tasksSettings);
        }

        // GET: TasksSettings/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.TasksSettings == null)
            {
                return NotFound();
            }

            var tasksSettings = await _context.TasksSettings
                .FirstOrDefaultAsync(m => m.Id == id);
            if (tasksSettings == null)
            {
                return NotFound();
            }

            return View(tasksSettings);
        }

        // POST: TasksSettings/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.TasksSettings == null)
            {
                return Problem("Entity set 'ApplicationDbContext.TasksSettings'  is null.");
            }
            var tasksSettings = await _context.TasksSettings.FindAsync(id);
            if (tasksSettings != null)
            {
                _context.TasksSettings.Remove(tasksSettings);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TasksSettingsExists(int id)
        {
          return (_context.TasksSettings?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        public ActionResult TasksSettingsAddOrEdit(byte[] WpMXiAZVwrrkfTh, int workScheduleView, int firstDayOfWeek, int dayTasksLimit, bool showLeaves, bool showHolidays, bool autoCopySchedule, DateTime? startCopyScheduleDate, bool autoDownloadSchedule, DateTime? startDownloadScheduleDate, bool lockScheduleEdit, int lockTime)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            if (taskSettingsArray.Any())
            {
                //edit
                var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
                if (row != null)
                {
                    if (row.WorkScheduleView != workScheduleView)
                    {
                        row.WorkScheduleView = workScheduleView;
                    }
                    if (row.FirstDayOfWeek != firstDayOfWeek)
                    {
                        row.FirstDayOfWeek = firstDayOfWeek;
                    }
                    if (row.DayTasksLimit != dayTasksLimit)
                    {
                        row.DayTasksLimit = dayTasksLimit;
                    }
                    if (row.ShowLeaves != showLeaves)
                    {
                        row.ShowLeaves = showLeaves;
                    }
                    if (row.ShowHolidays != showHolidays)
                    {
                        row.ShowHolidays = showHolidays;
                    }
                    if (row.AutoCopySchedule != autoCopySchedule)
                    {
                        row.AutoCopySchedule = autoCopySchedule;
                    }
                    if (row.StartCopyScheduleDate != startCopyScheduleDate)
                    {
                        row.StartCopyScheduleDate = startCopyScheduleDate;
                    }
                    if (row.AutoDownloadSchedule != autoDownloadSchedule)
                    {
                        row.AutoDownloadSchedule = autoDownloadSchedule;
                    }
                    if (row.StartDownloadScheduleDate != startDownloadScheduleDate)
                    {
                        row.StartDownloadScheduleDate = startDownloadScheduleDate;
                    }
                    if (row.LockScheduleEdit != lockScheduleEdit)
                    {
                        row.LockScheduleEdit = lockScheduleEdit;
                    }
                    if (row.LockTime != lockTime)
                    {
                        row.LockTime = lockTime;
                    }

                    _context.SaveChanges();

                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,
                    WorkScheduleView = workScheduleView,
                    FirstDayOfWeek = firstDayOfWeek,
                    DayTasksLimit = dayTasksLimit,
                    ShowLeaves = showLeaves,
                    ShowHolidays = showHolidays,
                    AutoCopySchedule = autoCopySchedule,
                    StartCopyScheduleDate = startCopyScheduleDate,
                    AutoDownloadSchedule = autoDownloadSchedule,
                    StartDownloadScheduleDate = startDownloadScheduleDate,
                    LockScheduleEdit = lockScheduleEdit,
                    LockTime = lockTime
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();

                return Json(new { success = true });
            }

            return Json(false);
        }







    }
}

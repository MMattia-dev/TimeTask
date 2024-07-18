using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
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

        public DateTime MergeDateAndTime(DateTime date, TimeOnly? time)
        {
            string timeString = "00:00";
            if (time != null)
            {
                timeString = time.Value.ToString("HH:mm");
            }

            string e = date.ToString("yyyy-MM-dd") + " " + timeString;
            DateTime dateTime = DateTime.ParseExact(e, "yyyy-MM-dd HH:mm", CultureInfo.InvariantCulture);

            return dateTime;
        }

        public ActionResult CWIKXSnlsspiXYE(byte[] WpMXiAZVwrrkfTh, int workScheduleView)
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
                    row.WorkScheduleView = workScheduleView;
                    _context.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = workScheduleView,    //
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult QnejSftKzHnXHGh(byte[] WpMXiAZVwrrkfTh, int firstDayOfWeek)
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
                    row.FirstDayOfWeek = firstDayOfWeek;
                    _context.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = firstDayOfWeek,        //
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult lviiRZwkMwhqaFz(byte[] WpMXiAZVwrrkfTh, int dayTasksLimit)
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
                    row.DayTasksLimit = dayTasksLimit;
                    _context.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = dayTasksLimit,          //
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult aYDBWeCxsbWbRXT(byte[] WpMXiAZVwrrkfTh, bool showLeaves)
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
                    row.ShowLeaves = showLeaves;
                    _context.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = showLeaves,                //
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult tTuvgjjIbKgMnAT(byte[] WpMXiAZVwrrkfTh, bool showHolidays)
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
                    row.ShowHolidays = showHolidays;
                    _context.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = showHolidays,            //
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult eRLkNpeUUCgmaTG(byte[] WpMXiAZVwrrkfTh, bool lockAddingToHolidays)
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
                    row.LockAddingToHolidays = lockAddingToHolidays;
                    _context.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = lockAddingToHolidays, //
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult pITtnYRlNsBToxu(byte[] WpMXiAZVwrrkfTh, bool showOnlyInitials)
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
                    row.ShowOnlyInitials = showOnlyInitials;
                    _context.SaveChanges();
                    return Json(new { success = true });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = showOnlyInitials,    //
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult nrnghIGnHUEBHwZ(byte[] WpMXiAZVwrrkfTh, bool enablePrivateSchedule)
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
                    row.EnablePrivateSchedule = enablePrivateSchedule;
                    _context.SaveChanges();
                    return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"NquudTpGloVzKoB\" onclick=\"blyVpYCtnXKDgCn()\">lista osób</span>") });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = enablePrivateSchedule, //
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"NquudTpGloVzKoB\" onclick=\"blyVpYCtnXKDgCn()\">lista osób</span>") });
            }

            return Json(false);
        }

        public ActionResult ZwaEFuuPmrMYBqS(byte[] WpMXiAZVwrrkfTh, bool allowOthersToEdit)
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
                    row.AllowOthersToEdit = allowOthersToEdit;
                    _context.SaveChanges();
                    return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"pCAkeIBbalSqCTB_\" onclick=\"vCLpIjekJHmTCDZ()\">lista dozwolonych osób</span>") });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = allowOthersToEdit,  //
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"pCAkeIBbalSqCTB_\" onclick=\"vCLpIjekJHmTCDZ()\">lista dozwolonych osób</span>") });
            }

            return Json(false);
        }

        public ActionResult TDDLDmIHYjVfcuh(byte[] WpMXiAZVwrrkfTh, bool lockScheduleEdit, int lockTime, string GvwTTLESihOmLhQ)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            string select = "<select class=\"form-control PpUlJWeIciRKSTQ\" id=\"qAIabAYRAJSWgqK_\" onchange=\"qAIabAYRAJSWgqK('" + GvwTTLESihOmLhQ + "')\">" +
                    "<option selected>Tydzień</option>" +
                    "<option>Miesiąc</option>" +
                    "<option>Rok</option>" +
                "</select>";

            if (taskSettingsArray.Any())
            {
                //edit
                var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
                if (row != null)
                {
                    row.LockScheduleEdit = lockScheduleEdit;
                    row.LockTime = lockTime;
                    _context.SaveChanges();
                    return Json(new { success = true, select = Content(select) });
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                        //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = lockScheduleEdit,    //
                    LockTime = lockTime,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true, select = Content(select) });
            }

            return Json(false);
        }

        public ActionResult juChQgTUCIkTtOm(byte[] WpMXiAZVwrrkfTh, int lockTime)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            //edit
            var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
            if (row != null)
            {
                row.LockTime = lockTime;
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult jjuMOIhJgObMnkV(byte[] WpMXiAZVwrrkfTh, bool autoCopySchedule, string GvwTTLESihOmLhQ)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            string div = "<div id=\"ItYujZvGhAXoNJw\">" +
                    "<div class=\"VjYAEBHWVZOOXnf KwklCFLXfXUydOj\">" +
                        "<span>Rozpocznij od dnia:</span>" +
                        "<input class=\"form-control\" type=\"date\" value=\"" + DateTime.Today.ToString("yyyy-MM-dd") + "\" id=\"oPEStVVIUxnydDp_\" onchange=\"oPEStVVIUxnydDp('" + GvwTTLESihOmLhQ + "')\" />" +
                    "</div>" +
                    "<div class=\"VjYAEBHWVZOOXnf\">" +
                        "<span>Powtarzaj:</span>" +
                        "<select class=\"form-control HZDznQEKaNVLIxx\" id=\"gBTdQeDEXrAZpsu_\" onchange=\"gBTdQeDEXrAZpsu('" + GvwTTLESihOmLhQ + "')\">" +
                            "<option selected>co tydzień</option>" +
                            "<option>co miesiąc</option>" +
                        "</select>" +
                    "</div>" +
                "</div>";

            if (taskSettingsArray.Any())
            {
                //edit
                var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
                if (row != null)
                {
                    if (autoCopySchedule)
                    {
                        row.AutoCopySchedule = autoCopySchedule;
                        row.StartCopyScheduleDate = MergeDateAndTime(DateTime.Today, null);
                        row.RepeatAutoCopySchedule = 0;
                        _context.SaveChanges();
                        return Json(new { success = true, div = Content(div) });
                    }
                    else
                    {
                        row.AutoCopySchedule = autoCopySchedule;
                        row.StartCopyScheduleDate = null;
                        row.RepeatAutoCopySchedule = 0;
                        _context.SaveChanges();
                        return Json(new { success = true });
                    }
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                                                    //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = autoCopySchedule,                                //
                    StartCopyScheduleDate = MergeDateAndTime(DateTime.Today, null),     //
                    AutoShareSchedule = false,
                    StartShareScheduleDate = null,
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,                                         //
                    RepeatAutoShareSchedule = 0
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true, div = Content(div) });
            }

            return Json(false);
        }

        public ActionResult diUskrbpMczAOwe(byte[] WpMXiAZVwrrkfTh, DateTime startCopyScheduleDate)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            //edit
            var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
            if (row != null)
            {
                row.StartCopyScheduleDate = startCopyScheduleDate;
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult rbEQghxgwXxjXzA(byte[] WpMXiAZVwrrkfTh, int repeatAutoCopySchedule)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            //edit
            var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
            if (row != null)
            {
                row.RepeatAutoCopySchedule = repeatAutoCopySchedule;
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult ukDCUiaPPTbFNUr(byte[] WpMXiAZVwrrkfTh, bool autoShareSchedule, string GvwTTLESihOmLhQ)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            string div = "<div id=\"pNstugmIpmEENyd\">" +
                    "<div class=\"VjYAEBHWVZOOXnf KwklCFLXfXUydOj\">" +
                        "<span>Rozpocznij od dnia:</span>" +
                        "<input class=\"form-control\" type=\"date\" value=\"" + DateTime.Today.ToString("yyyy-MM-dd") + "\" id=\"XcUHXPHttLovDJu_\" onchange=\"XcUHXPHttLovDJu('" + GvwTTLESihOmLhQ + "')\" />" +
                    "</div>" +
                    "<div class=\"VjYAEBHWVZOOXnf\">" +
                        "<span>Powtarzaj:</span>" +
                        "<select class=\"form-control HZDznQEKaNVLIxx\" id=\"YcyAWdmiezAOUBV_\" onchange=\"YcyAWdmiezAOUBV('" + GvwTTLESihOmLhQ + "')\">" +
                            "<option selected>co tydzień</option>" +
                            "<option>co miesiąc</option>" +
                        "</select>" +
                    "</div>" +
                "</div>";

            if (taskSettingsArray.Any())
            {
                //edit
                var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
                if (row != null)
                {
                    if (autoShareSchedule)
                    {
                        row.AutoShareSchedule = autoShareSchedule;
                        row.StartShareScheduleDate = MergeDateAndTime(DateTime.Today, null);
                        row.RepeatAutoShareSchedule = 0;
                        _context.SaveChanges();
                        return Json(new { success = true, div = Content(div) });
                    }
                    else
                    {
                        row.AutoShareSchedule = autoShareSchedule;
                        row.StartShareScheduleDate = null;
                        row.RepeatAutoShareSchedule = 0;
                        _context.SaveChanges();
                        return Json(new { success = true });
                    }
                }
            }
            else
            {
                //add
                var newData = new TasksSettings()
                {
                    UserId = userId,                                                    //
                    WorkScheduleView = 0,
                    FirstDayOfWeek = 0,
                    DayTasksLimit = 10,
                    ShowLeaves = false,
                    ShowHolidays = false,
                    AutoCopySchedule = false,
                    StartCopyScheduleDate = null,
                    AutoShareSchedule = autoShareSchedule,                              //
                    StartShareScheduleDate = MergeDateAndTime(DateTime.Today, null),    //
                    LockScheduleEdit = false,
                    LockTime = 0,
                    ShowOnlyInitials = false,
                    AllowOthersToEdit = false,
                    UserGroupId = null,
                    LockAddingToHolidays = false,
                    EnablePrivateSchedule = false,
                    RepeatAutoCopySchedule = 0,
                    RepeatAutoShareSchedule = 0                                         //
                };

                _context.TasksSettings.Add(newData);
                _context.SaveChanges();
                return Json(new { success = true, div = Content(div) });
            }

            return Json(false);
        }

        public ActionResult XJjyLULKstxMRZK(byte[] WpMXiAZVwrrkfTh, DateTime startShareScheduleDate)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            //edit
            var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
            if (row != null)
            {
                row.StartShareScheduleDate = startShareScheduleDate;
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult jdEewtdRqcJGuIS(byte[] WpMXiAZVwrrkfTh, int repeatAutoShareSchedule)
        {
            byte[] encryptedUserId = WpMXiAZVwrrkfTh;
            var userId = Data.Encryption.EncryptionHelper.Decrypt(encryptedUserId);

            var taskSettingsArray = _context.TasksSettings.Where(x => x.UserId == userId);

            //edit
            var row = _context.TasksSettings.FirstOrDefault(x => x.UserId == userId);
            if (row != null)
            {
                row.RepeatAutoShareSchedule = repeatAutoShareSchedule;
                _context.SaveChanges();
                return Json(new { success = true });
            }

            return Json(false);
        }

        public ActionResult ShowPrivateListForm()
        {
            string removeForm = "$('#WnlkUXBVyfUSVNt').remove()";

            var privateScheduleList = _context.PrivateScheduleList;
            string tr = "";
            foreach (var row in privateScheduleList)
            {
                var workersArray = _context.Workers2.First(x => x.Id == row.WorkerId);
                var departmentName = _context.Department.First(x => x.Id == workersArray.DepartmentID).Name;
                var name = workersArray.Surname + " " + workersArray.Name;

                tr += "<tr>" +
                        "<td title=\"" + row.Id + "\">" + row.Id + "</td>" +
                        "<td title=\"" + departmentName + "\">" + departmentName + "</td>" +
                        "<td title=\"" + name + "\">" + name + "</td>" +
                        "<td>" +
                            "<a onclick=\"GAQosyFmQwieNft(this, " + row.Id + ")\">Usuń</a>" +
                        "</td>" +
                    "</tr>";
            }

            string table = "<div class=\"eEwwYSDbqyMdghL\">" +
                "<table class=\"rHIpYUaJfTsSFHO\">" +
                    "<thead>" +
                        "<tr>" +
                            "<th title=\"id\"><ion-icon name=\"key\"></ion-icon></th>" +
                            "<th>Dział</th>" +
                            "<th>Nazwisko i Imię</th>" +
                            "<th></th>" +
                        "<tr>" +
                    "</thead>" +
                    "<tbody>" +
                        tr +
                        AddTr() +
                    "</tbody>" +
                "</table>" +
                "</div>";


            string form = "<div id=\"WnlkUXBVyfUSVNt\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"AdMcjKPGypQwFuM\">" +
                        "<span class=\"hFzZLqJdsEqdlrx phzshsahNeRSjfT wbxnvJGiIuXUOzi\">Prywatne grafiki - lista</span>" +
                        table +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        public ActionResult GetWorkers(int departmentId)
        {
            string options = "<option selected disabled>--Wybierz--</option>";
            foreach (var worker in _context.Workers2.Where(x => x.DepartmentID == departmentId).OrderBy(x => x.Surname))
            {
                if (!_context.PrivateScheduleList.Select(x => x.WorkerId).Contains(worker.Id))
                {
                    options += "<option value=\"" + worker.Id + "\">" + worker.Surname + " " + worker.Name + "</option>";
                }
            }

            return Content(options);
        }

        public ActionResult PostPrivateSchedule(int workerId)
        {
            var newData = new PrivateScheduleList()
            {
                WorkerId = workerId,
            };

            _context.PrivateScheduleList.Add(newData);
            _context.SaveChanges();

            var workersArray = _context.Workers2.First(x => x.Id == workerId);
            var departmentName = _context.Department.First(x => x.Id == workersArray.DepartmentID).Name;
            var name = workersArray.Surname + " " + workersArray.Name;

            string newTr = "<tr>" +
                        "<td title=\"" + newData.Id + "\">" + newData.Id + "</td>" +
                        "<td title=\"" + departmentName + "\">" + departmentName + "</td>" +
                        "<td title=\"" + name + "\">" + name + "</td>" +
                        "<td>" +
                            "<a onclick=\"GAQosyFmQwieNft(this, " + newData.Id + ")\">Usuń</a>" +
                        "</td>" +
                    "</tr>";

            //lista osób (liczba osób)

            return Json(new { tr = Content(newTr), tr2 = Content(AddTr()) });
        }

        public ActionResult RemovePrivateScheduleRow(int id)
        {
            var row = _context.PrivateScheduleList.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.PrivateScheduleList.Remove(row);
                _context.SaveChanges();

                return Json(AddTr());
            }

            return Json(false);
        }

        public string AddTr()
        {
            string departmentsOptions = "<option selected disabled>--Wybierz--</option>";
            foreach (var department in _context.Department.OrderBy(x => x.Name))
            {
                List<int> list = new List<int>();
                foreach (var worker in _context.Workers2.Where(x => x.DepartmentID == department.Id))
                {
                    if (!_context.PrivateScheduleList.Select(x => x.WorkerId).Contains(worker.Id))
                    {
                        list.Add(worker.Id);
                    }
                }

                if (list.Any())
                {
                    departmentsOptions += "<option value=\"" + department.Id + "\">" + department.Name + "</option>";
                }
            }

            string newTr2 = "<tr id=\"dzpHswVEgOuhbEo\">" +
                            "<td title=\"Dodaj nową osobę\"><ion-icon name=\"add-outline\"></ion-icon></td>" +
                            "<td class=\"eCLCYNmbmlOrFSF\">" +
                                "<select class=\"form-control\" onchange=\"JkdfhMQViSLmhkI(this)\">" +
                                    departmentsOptions +
                                "</select>" +
                            "</td>" +
                            "<td class=\"eCLCYNmbmlOrFSF\">" +
                                "<select disabled class=\"form-control\" onchange=\"xFWQqAJBnCBpKJb(this)\" id=\"xFWQqAJBnCBpKJb_\">" +
                                    "<option>--Wybierz--</option>" +
                                "</select>" +
                            "</td>" +
                            "<td></td>" +
                        "</tr>";

            return newTr2;
        }

        public string AddTr2()
        {
            string departmentsOptions = "<option selected disabled>--Wybierz--</option>";
            foreach (var department in _context.Department.OrderBy(x => x.Name))
            {
                List<int> list = new List<int>();
                if (!_context.DayTasksLimitExceptionForDepartments.Select(x => x.DepartmentId).Contains(department.Id))
                {
                    list.Add(department.Id);
                }

                if (list.Any())
                {
                    departmentsOptions += "<option value=\"" + department.Id + "\">" + department.Name + "</option>";
                }
            }

            string limit = "<option>--Wybierz--</option>";
            for (int i = 10; i >= 1; i--)
            {
                limit += "<option value=\"" + i + "\">" + i + "</option>";
            }

            string newTr2 = "<tr id=\"dzpHswVEgOuhbEo\">" +
                            "<td title=\"Dodaj nowy dział\"><ion-icon name=\"add-outline\"></ion-icon></td>" +
                            "<td class=\"eCLCYNmbmlOrFSF\">" +
                                "<select class=\"form-control\" onchange=\"NVfGsCLOTlTvFpa(this)\" id=\"NVfGsCLOTlTvFpa_\">" +
                                    departmentsOptions +
                                "</select>" +
                            "</td>" +
                            "<td class=\"eCLCYNmbmlOrFSF\">" +
                                "<select disabled class=\"form-control\" onchange=\"dPeoUrjVuXwlYwP(this)\" id=\"xFWQqAJBnCBpKJb_\">" +
                                    limit +
                                "</select>" +
                            "</td>" +
                            "<td></td>" +
                        "</tr>";

            return newTr2;
        }

        public ActionResult DayTasksLimitExceptionForDepartmentsForm()
        {
            string removeForm = "$('#TJYBmCvnwJKVnYd').remove()";

            var array = _context.DayTasksLimitExceptionForDepartments;
            string tr = "";

            if (array.Any())
            {
                foreach (var row in array)
                {
                    var departmentName = _context.Department.FirstOrDefault(x => x.Id == row.DepartmentId)?.Name;

                    tr += "<tr>" +
                            "<td title=\"" + row.Id + "\">" + row.Id + "</td>" +
                            "<td class=\"VXpzVpGPRbXLGTy\" title=\"" + departmentName + "\">" + departmentName + "</td>" +
                            "<td class=\"BtlBMWzsKzlwKDR\" title=\"" + row.DayTasksLimit + "\">" + row.DayTasksLimit + "</td>" +
                            "<td>" +
                                "<a onclick=\"TOcOvMfyvdIqAPS(this, " + row.Id + ")\">Usuń</a>" +
                            "</td>" +
                        "</tr>";
                }
            }

            string table = "<div class=\"eEwwYSDbqyMdghL\">" +
                    "<table class=\"rHIpYUaJfTsSFHO\">" +
                        "<thead>" +
                            "<tr>" +
                                "<th title=\"id\"><ion-icon name=\"key\"></ion-icon></th>" +
                                "<th class=\"VXpzVpGPRbXLGTy\">Dział</th>" +
                                "<th class=\"BtlBMWzsKzlwKDR\">Limit zadań</th>" +
                                "<th></th>" +
                            "</tr>" +
                        "</thead>" +
                        "<tbody>" +
                            tr +
                            AddTr2() +
                        "</tbody>" +
                    "</table>" +
                "</div>";

            string form = "<div id=\"TJYBmCvnwJKVnYd\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"AdMcjKPGypQwFuM\">" +
                        "<span class=\"hFzZLqJdsEqdlrx phzshsahNeRSjfT wbxnvJGiIuXUOzi\">Limit zadań - lista</span>" +
                        table +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }
        public ActionResult DayTasksLimitExceptionForDepartmentsPost(int departmentId, int tasksLimit)
        {
            var newData = new DayTasksLimitExceptionForDepartments()
            {
                DepartmentId = departmentId,
                DayTasksLimit = tasksLimit
            };

            _context.DayTasksLimitExceptionForDepartments.Add(newData);
            _context.SaveChanges();

            var departmentName = _context.Department.First(x => x.Id == departmentId).Name;

            string newTr = "<tr>" +
                        "<td title=\"" + newData.Id + "\">" + newData.Id + "</td>" +
                        "<td title=\"" + departmentName + "\">" + departmentName + "</td>" +
                        "<td title=\"" + newData.DayTasksLimit + "\">" + newData.DayTasksLimit + "</td>" +
                        "<td>" +
                            "<a onclick=\"TOcOvMfyvdIqAPS(this, " + newData.Id + ")\">Usuń</a>" +
                        "</td>" +
                    "</tr>";

            return Json(new { tr = Content(newTr), tr2 = Content(AddTr2()) });
        }

        public ActionResult DayTasksLimitExceptionForDepartmentsRemove(int id)
        {
            var row = _context.DayTasksLimitExceptionForDepartments.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.DayTasksLimitExceptionForDepartments.Remove(row);
                _context.SaveChanges();

                return Json(AddTr2());
            }

            return Json(false);
        }

        public string AddTr3()
        {
            string workers = "<option selected disabled>--Wybierz--</option>";
            foreach (var worker in _context.Workers2.OrderBy(x => x.DepartmentID))
            {
                workers += "<option value=\"" + worker.Id + "\">" + worker.Surname + " " + worker.Name + " (" + _context.Department.First(x => x.Id == worker.DepartmentID).Name + ")</option>";
            }

            string departmentsOptions = "<option selected disabled>--Wybierz--</option>";
            foreach (var department in _context.Department.OrderBy(x => x.Name))
            {
                departmentsOptions += "<option value=\"" + department.Id + "\">" + department.Name + "</option>";
            }

            string newTr2 = "<tr id=\"dzpHswVEgOuhbEo\">" +
                            "<td title=\"Dodaj nowy dział\"><ion-icon name=\"add-outline\"></ion-icon></td>" +
                            "<td class=\"eCLCYNmbmlOrFSF\">" +
                                "<select class=\"form-control\" onchange=\"jUPppSZJVxzCUha(this)\" id=\"jUPppSZJVxzCUha_\">" +
                                    workers +
                                "</select>" +
                            "</td>" +
                            "<td class=\"eCLCYNmbmlOrFSF\">" +
                                "<select disabled class=\"form-control\" onchange=\"xSfEDycxtdtGZgN(this)\" id=\"xSfEDycxtdtGZgN_\">" +
                                    departmentsOptions +
                                "</select>" +
                            "</td>" +
                            "<td></td>" +
                        "</tr>";

            return newTr2;
        }

        public ActionResult AllowedToEditScheduleForm()
        {
            string removeForm = "$('#YqBrQVpkndLZzaa').remove()";

            var allowedToEditSchedule = _context.AllowedToEditSchedule;
            string tr = "";
            foreach (var row in allowedToEditSchedule)
            {
                var workersArray = _context.Workers2.First(x => x.Id == row.WorkerId);
                var name = workersArray.Surname + " " + workersArray.Name;
                //var departmentName = _context.Department.First(x => x.Id == workersArray.DepartmentID).Name;
                var departmentName = _context.Department.First(x => x.Id == row.DepartmentId).Name;

                tr += "<tr>" +
                        "<td title=\"" + row.Id + "\">" + row.Id + "</td>" +
                        "<td class=\"VXpzVpGPRbXLGTy\" title=\"" + name + " (" + _context.Department.First(x => x.Id == workersArray.DepartmentID).Name + ")\">" + name + " (" + _context.Department.First(x => x.Id == workersArray.DepartmentID).Name + ")</td>" +
                        "<td class=\"BtlBMWzsKzlwKDR\" title=\"" + departmentName + "\">" + departmentName + "</td>" +
                        "<td>" +
                            "<a onclick=\"grtJxEXjDniewcb(this, " + row.Id + ")\">Usuń</a>" +
                        "</td>" +
                    "</tr>";
            }

            string table = "<div class=\"eEwwYSDbqyMdghL\">" +
                "<table class=\"rHIpYUaJfTsSFHO\">" +
                    "<thead>" +
                        "<tr>" +
                            "<th title=\"id\"><ion-icon name=\"key\"></ion-icon></th>" +
                            "<th class=\"VXpzVpGPRbXLGTy\">Nazwisko i Imię (Dział)</th>" +
                            "<th class=\"BtlBMWzsKzlwKDR\">Dział</th>" +
                            "<th></th>" +
                        "<tr>" +
                    "</thead>" +
                    "<tbody>" +
                        tr +
                        AddTr3() +
                    "</tbody>" +
                "</table>" +
                "</div>";


            string form = "<div id=\"YqBrQVpkndLZzaa\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form class=\"AdMcjKPGypQwFuM\">" +
                        "<span class=\"hFzZLqJdsEqdlrx phzshsahNeRSjfT wbxnvJGiIuXUOzi\">Edycja grafików - lista dozwolonych osób</span>" +
                        table +
                        "<div class=\"BnDZmDEehCCybzG LPbaczkZTGFbIBk\" onclick=\"" + removeForm + "\">" +
                            "<svg viewBox=\"0 0 470 470\" height=\"15\" width=\"15\"><path d=\"M310.4,235.083L459.88,85.527c12.545-12.546,12.545-32.972,0-45.671L429.433,9.409c-12.547-12.546-32.971-12.546-45.67,0L234.282,158.967L85.642,10.327c-12.546-12.546-32.972-12.546-45.67,0L9.524,40.774c-12.546,12.546-12.546,32.972,0,45.671l148.64,148.639L9.678,383.495c-12.546,12.546-12.546,32.971,0,45.67l30.447,30.447c12.546,12.546,32.972,12.546,45.67,0l148.487-148.41l148.792,148.793c12.547,12.546,32.973,12.546,45.67,0l30.447-30.447c12.547-12.546,12.547-32.972,0-45.671L310.4,235.083z\"></path></svg>" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Content(form);
        }

        public ActionResult AllowedToEditSchedulePost(int departmentId, int workerId)
        {
            var newData = new AllowedToEditSchedule()
            {
                WorkerId = workerId,
                DepartmentId = departmentId
            };

            _context.AllowedToEditSchedule.Add(newData);
            _context.SaveChanges();

            var workersArray = _context.Workers2.First(x => x.Id == workerId);  
            var name = workersArray.Surname + " " + workersArray.Name;
            var departmentName = _context.Department.First(x => x.Id == departmentId).Name;

            string newTr = "<tr>" +
                        "<td title=\"" + newData.Id + "\">" + newData.Id + "</td>" +
                        "<td class=\"VXpzVpGPRbXLGTy\" title=\"" + name + " (" + _context.Department.First(x => x.Id == workersArray.DepartmentID).Name + ")\">" + name + " (" + _context.Department.First(x => x.Id == workersArray.DepartmentID).Name + ")</td>" +
                        "<td class=\"BtlBMWzsKzlwKDR\" title=\"" + departmentName + "\">" + departmentName + "</td>" +
                        "<td>" +
                            "<a onclick=\"grtJxEXjDniewcb(this, " + newData.Id + ")\">Usuń</a>" +
                        "</td>" +
                    "</tr>";

            return Json(new { tr = Content(newTr), tr2 = Content(AddTr3()) });
        }

        public ActionResult AllowedToEditScheduleRemove(int id)
        {
            var row = _context.AllowedToEditSchedule.FirstOrDefault(e => e.Id == id);
            if (row != null)
            {
                _context.AllowedToEditSchedule.Remove(row);
                _context.SaveChanges();

                return Json(AddTr3());
            }

            return Json(false);
        }

        public ActionResult nMGlijSPHjLmvGt()
        {
            string form = "<div id=\"gxIYmUVtuQuFwST\" class=\"pGKcZvErUB\" style=\"display: none;\">" +
                    "<form>" +
                        "<div class=\"IvBtEDulLESDYxK\">" +
                            "<span>Osoby wpisane na listę nie będą widoczne w grafiku. Nikt oprócz ich samych nie będzie miał wglądu do ich grafików (z wyjątkiem osób przygotowujących plan).</span>" +
                        "</div>" +
                        "<div class=\"form-group\">" +
                            "<input type=\"button\" value=\"OK\" class=\"btn-download\" onclick=\"$('#gxIYmUVtuQuFwST').remove();\" />" +
                        "</div>" +
                    "</form>" +
                "</div>";

            return Json(form);
        }



    }
}

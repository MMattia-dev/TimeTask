using System;
using System.Collections.Generic;
using System.Globalization;
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
                    return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"NquudTpGloVzKoB\" onclick=\"\">lista osób</span>") });
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
                return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"NquudTpGloVzKoB\" onclick=\"\">lista osób</span>") });
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
                    return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"pCAkeIBbalSqCTB_\" onclick=\"\">lista dozwolonych osób</span>") });
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
                return Json(new { success = true, span = Content("<span class=\"pCAkeIBbalSqCTB\" id=\"pCAkeIBbalSqCTB_\" onclick=\"\">lista dozwolonych osób</span>") });
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




    }
}

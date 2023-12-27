using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Net.NetworkInformation;
using TimeTask.Data;
using TimeTask.Models;

namespace TimeTask.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        //public HomeController(ILogger<HomeController> logger)
        //{
        //    _logger = logger;
        //}

        public readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public IActionResult Index()
        {
            ViewBag.Department = _context.Department;
            ViewBag.Workers = _context.Workers2;
            ViewBag.Wallpaper = _context.Wallpaper2;
			ViewBag.Holiday = _context.Holiday;
            ViewBag.Reminders = _context.Reminders3;


			return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Settings()
        {
            return View();
        }

		[HttpPost]
		public ActionResult AddReminder(string userID, string title, string? reminderDescription, DateTime createdDate, DateTime? remindDate)
		{
			var newData = new Reminders3()
			{
				UserID = userID,
                Title = title,
				ReminderDescription = reminderDescription,
				CreatedDate = DateTime.Now.Date,
				RemindDate = remindDate
			};

			_context.Reminders3.Add(newData);
			_context.SaveChanges();
			return Json(new { success = true });
		}








	}
}
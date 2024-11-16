using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using FluentFTP;
using FluentFTP.Rules;
using ICSharpCode.SharpZipLib.Core;
using ICSharpCode.SharpZipLib.Zip;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NuGet.Protocol.Plugins;
using TimeTask.Data;
using TimeTask.Data.FTP;
using TimeTask.Models;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static TimeTask.Data.FTP.FtpService;

namespace TimeTask.Controllers
{
    public class ChatsController : Controller
    {
        private readonly ApplicationDbContext _context;
		private readonly UserTrackerService _userTrackerService;
		private readonly FtpService _ftpService;
		private readonly IWebHostEnvironment _environment;

		public ChatsController(ApplicationDbContext context, UserTrackerService userTrackerService, FtpService ftpService, IWebHostEnvironment environment)
		{
			_context = context;
			_userTrackerService = userTrackerService;
			_ftpService = ftpService;
			_environment = environment;
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

		//public int GetDepartmentId(int? savedDepartment)
		//{
		//	int? department = _context.Department.OrderBy(x => x.Name).FirstOrDefault()?.Id;
		//	if (savedDepartment != null)
		//	{
		//		department = savedDepartment.Value;
		//	}

		//	if (department != null)
		//	{
		//		return (int)department;
		//	}

		//	return 0;
		//}

		public string GetUserId()
		{
			var claimsIdentity = User.Identity as ClaimsIdentity;
			var userID = "";
			if (claimsIdentity != null)
			{
				var userIdClaim = claimsIdentity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
				if (userIdClaim != null)
				{
					userID = userIdClaim.Value;
				}
			}

			return userID;
		}

		public async Task<string> WriteOptionsForSelectFilterDiv(IOrderedQueryable<Department> departments, string receiverId)
		{
			//var departmentsOptions = "";

			var options = new ConcurrentBag<string>();

			await System.Threading.Tasks.Task.Run(() =>
			{
				var workers = _context.Workers2;
				var users = _context.UserIdentity.Where(user => workers.Any(worker => worker.Id == user.WorkerId));
				var chat = _context.Chat.Where(message => users.Any(user => message.SenderUserId == user.UserId && message.IfMessageRead == false) && message.ReceiverUserId == receiverId);

				foreach (var dep in departments)
				{
					List<int?> departments = new List<int?>();
					foreach (var user in chat)
					{
						var userWorkerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == user.SenderUserId)?.WorkerId;
						var userDepartmentId = _context.Workers2.FirstOrDefault(x => x.Id == userWorkerId)?.DepartmentID;

						departments.Add(userDepartmentId);
					}
					var departmentsCount = departments.GroupBy(x => x).Select(y => new { DepartmentId = y.Key, Count = y.Count() }).ToArray();



				}


			});

			return string.Join("", options);
		}

		[HttpGet]
		public async Task<string> AddOptionsForFilterDiv(int? savedDepartment, string receiverId)
		{
			int? department = null;
			if (savedDepartment != null)
			{
				department = savedDepartment;
			}
			else
			{
				var userWorkerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == receiverId)?.WorkerId;
				var userDepartmentId = _context.Workers2.FirstOrDefault(x => x.Id == userWorkerId)?.DepartmentID;
				department = userDepartmentId;
			}

			var departmentsOptions = "";
			var departments1 = _context.Department.OrderBy(x => x.Name);

			var workers = _context.Workers2;
			var users = _context.UserIdentity.Where(user => workers.Any(worker => worker.Id == user.WorkerId));
			var chat = _context.Chat.Where(message => users.Any(user => message.SenderUserId == user.UserId && message.IfMessageRead == false) && message.ReceiverUserId == receiverId);

			foreach (var dep in departments1)
			{
				List<int?> departments = new List<int?>();
				foreach (var user in chat)
				{
					var userWorkerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == user.SenderUserId)?.WorkerId;
					var userDepartmentId = _context.Workers2.FirstOrDefault(x => x.Id == userWorkerId)?.DepartmentID;

					departments.Add(userDepartmentId);
				}
				var departmentsCount = departments.GroupBy(x => x).Select(y => new { DepartmentId = y.Key, Count = y.Count() }).ToArray();

				if (department == dep.Id)
				{
					var count = departmentsCount.FirstOrDefault(x => x.DepartmentId == dep.Id)?.Count;
					if (count > 0)
					{
						departmentsOptions += "<option selected value=\"" + dep.Id + "\">" + dep.Name + " (" + count + ")</option>";
					}
					else
					{
						departmentsOptions += "<option selected value=\"" + dep.Id + "\">" + dep.Name + "</option>";
					}
				}
				else
				{
					var count = departmentsCount.FirstOrDefault(x => x.DepartmentId == dep.Id)?.Count;
					if (count > 0)
					{
						departmentsOptions += "<option value=\"" + dep.Id + "\">" + dep.Name + " (" + count + ")</option>";
					}
					else
					{
						departmentsOptions += "<option value=\"" + dep.Id + "\">" + dep.Name + "</option>";
					}
				}
			}

			return departmentsOptions;
		}

		[HttpGet]
		public async Task<ActionResult> FilterDiv() //int? savedDepartment
		{
			var loggedUser = GetUserId();
			var receiverId = loggedUser;

			string div = "<div class=\"chatFilter\">" +
                    "<a class=\"chatMinimize filterClose\" title=\"Zamknij\" onclick=\"scQisAIXdDGVbXF(this)\">" +
                        "<ion-icon name=\"close-outline\"></ion-icon>" +
                    "</a>" +
                    "<div class=\"chatFilterParent\">" +
						"<div class=\"chatFilterDepartment\">" +
							"<label>Pokaż osoby z działu:</label>" +
							"<select class=\"form-control xNiaHJPRvUxJGBW\" onchange=\"zpUZfWoTJUsolOJ(this)\">" +
							"</select>" +
                        "</div>" +
                    "</div>" +
                "</div>";

			return Json(new { contentResult = Content(div), receiverId });
        }

		//[HttpGet]
		//public ActionResult ChatBackground(string loggedUser)
		//{
		//	var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == loggedUser);
		//	if (row != null)
		//	{

		//	}
		//	else
		//	{
		//		string div = "<div class=\"chatFilter\" id=\"colorPicker\">" +
		//				"<a class=\"chatMinimize filterClose\" title=\"Zamknij\" onclick=\"scQisAIXdDGVbXF(this)\">" +
		//					"<ion-icon name=\"close-outline\"></ion-icon>" +
		//				"</a>" +
		//				//"<div class=\"color-picker\" data-theme=\"dark\">                    <div class=\"color-picker-controls\">                <div class=\"color-picker-controls-group\" style=\"display: flex; flex-direction: row;height: 160px;\">                            <div class=\"color-picker-wheel-control\">                        <canvas id=\"wheel-canvas\" class=\"wheel-canvas\" height=\"140\" width=\"140\"></canvas>                        <div class=\"color-picker-wheel-control-thumb\" style=\"top: 65px; left: 65px; background-color: rgb(255, 255, 255); --darkreader-inline-bgcolor: #181a1b;\" data-value1=\"360\" data-value2=\"0\" data-darkreader-inline-bgcolor=\"\"></div>                    </div>                            <div class=\"color-picker-brightness-control\">                        <canvas id=\"brightness-canvas\" class=\"brightness-canvas\" width=\"6\" height=\"138\"></canvas>                        <div class=\"color-picker-brightness-control-thumb\" style=\"bottom: 0px; left: -2px; background-color: rgb(255, 255, 255); top: -5px; --darkreader-inline-bgcolor: #181a1b;\" data-value=\"100\" data-darkreader-inline-bgcolor=\"\"></div>                    </div>                        </div>                <div class=\"color-picker-controls-group\" style=\"flex: 1; padding-top: 0;\">                    <div class=\"color-picker-input-controls\">                        <div class=\"color-picker-input-controls-tab-headers\">                            <button data-tab=\"rgb\">RGB</button>                            <button data-tab=\"hsv\" class=\"selected\">HSV</button>                            <button data-tab=\"hex\">HEX</button>                        </div>                        <div class=\"color-picker-input-controls-tabs\">                            <div class=\"color-picker-input-controls-tab\" data-tab=\"rgb\">                                <div class=\"color-picker-red-input range-input-control\" data-value=\"0\" data-step=\"0.01\" data-min=\"0\" data-max=\"255\">                                    <div class=\"range-input-enter-block\">                                        <input class=\"range-input\" type=\"number\">                                    </div>                                    <div class=\"range-input-details-block\">                                        <span class=\"range-input-progress\" style=\"width: 100%;\"></span>                                        <span class=\"range-input-label\">R:</span>                                        <span class=\"range-input-value\">255</span>                                    </div>                                </div>                                <div class=\"color-picker-green-input range-input-control\" data-value=\"0\" data-step=\"0.01\" data-min=\"0\" data-max=\"255\">                                    <div class=\"range-input-enter-block\">                                        <input class=\"range-input\" type=\"number\">                                    </div>                                    <div class=\"range-input-details-block\">                                        <span class=\"range-input-progress\" style=\"width: 100%;\"></span>                                        <span class=\"range-input-label\">G:</span>                                        <span class=\"range-input-value\">255</span>                                    </div>                                </div>                                <div class=\"color-picker-blue-input range-input-control\" data-value=\"0\" data-step=\"0.01\" data-min=\"0\" data-max=\"255\">                                    <div class=\"range-input-enter-block\">                                        <input class=\"range-input\" type=\"number\">                                    </div>                                    <div class=\"range-input-details-block\">                                        <span class=\"range-input-progress\" style=\"width: 100%;\"></span>                                        <span class=\"range-input-label\">B:</span>                                        <span class=\"range-input-value\">255</span>                                    </div>                                </div>                            </div>                            <div class=\"color-picker-input-controls-tab selected\" data-tab=\"hsv\">                                <div class=\"color-picker-hue-input range-input-control\" data-value=\"0\" data-step=\"0.01\" data-min=\"0\" data-max=\"360\">                                    <div class=\"range-input-enter-block\">                                        <input class=\"range-input\" type=\"number\">                                    </div>                                    <div class=\"range-input-details-block\">                                        <span class=\"range-input-progress\" style=\"width: 100%;\"></span>                                        <span class=\"range-input-label\">H:</span>                                        <span class=\"range-input-value\">360</span>                                    </div>                                </div>                                <div class=\"color-picker-saturation-input range-input-control\" data-value=\"0\" data-step=\"0.01\" data-min=\"0\" data-max=\"100\">                                    <div class=\"range-input-enter-block\">                                        <input class=\"range-input\" type=\"number\">                                    </div>                                    <div class=\"range-input-details-block\">                                        <span class=\"range-input-progress\" style=\"width: 0%;\"></span>                                        <span class=\"range-input-label\">S:</span>                                        <span class=\"range-input-value\">0</span>                                    </div>                                </div>                                <div class=\"color-picker-brightness-input range-input-control\" data-value=\"0\" data-step=\"0.01\" data-min=\"0\" data-max=\"100\">                                    <div class=\"range-input-enter-block\">                                        <input class=\"range-input\" type=\"number\">                                    </div>                                    <div class=\"range-input-details-block\">                                        <span class=\"range-input-progress\" style=\"width: 100%;\"></span>                                        <span class=\"range-input-label\">V:</span>                                        <span class=\"range-input-value\">100</span>                                    </div>                                </div>                            </div>                            <div class=\"color-picker-input-controls-tab\" data-tab=\"hex\">                                <div class=\"color-picker-hex-input text-input-control\" data-value=\"000000\" data-is-alphanumeric=\"true\">                                    <div class=\"text-input-enter-block\">                                        <input class=\"text-input\" type=\"text\">                                    </div>                                    <div class=\"text-input-details-block\">                                        <span class=\"text-input-label\">Hex:</span>                                        <span class=\"text-input-value\">FFFFFF</span>                                    </div>                                </div>                            </div>                            <div class=\"color-picker-alpha-input range-input-control\" data-value=\"255\" data-step=\"0.01\" data-min=\"0\" data-max=\"255\">                                <div class=\"range-input-enter-block\">                                    <input class=\"range-input\" type=\"number\">                                </div>                                <div class=\"range-input-details-block\">                                    <span class=\"range-input-progress\" style=\"width: 100%;\"></span>                                    <span class=\"range-input-label\">A:</span>                                    <span class=\"range-input-value\">255</span>                                </div>                            </div>                        </div>                    </div>                        </div>            </div>                </div>" +
		//				"" +
		//				//"<color-picker id=\"picker\"></color-picker>" +
		//				//"<button id=\"example\">Launch</button>" +
		//				"" +
		//				"" +
		//				"" +
		//				"" +
		//				"" +
		//			"</div>";

		//		return Content(div);
		//	}

		//	return Json(false);
		//}

		[HttpPost]
		public ActionResult ChangeUserChatColor(string loggedUser, string userChatColor)
		{
			var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == loggedUser);
			if (row != null)
			{
				row.userChatColor = userChatColor;
				_context.SaveChanges();
			}
			else
			{
				var newData = new ChatSettings()
				{
					UserId = loggedUser,
					chatBackground = null,
					userChatColor = userChatColor,
					senderChatColor = null
				};

				_context.ChatSettings.Add(newData);
				_context.SaveChanges();
			}

			var spanColor = SpanColor(userChatColor);

			return Json(new { rgb = HexToRgb(userChatColor), spanColor, resetButton = "<a id=\"resetUserChatColor\" onclick=\"resetUserChatColor(this, `" + loggedUser + "`)\">Reset</a>" });
		}

		[HttpPost]
		public ActionResult ChangeChatBackground(string loggedUser, string backgroundColor)
		{
			var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == loggedUser);
			if (row != null)
			{
				row.chatBackground = backgroundColor;
				_context.SaveChanges();
			}
			else
			{
				var newData = new ChatSettings()
				{
					UserId = loggedUser,
					chatBackground = backgroundColor,
					userChatColor = null,
					senderChatColor = null
				};

				_context.ChatSettings.Add(newData);
				_context.SaveChanges();
			}

			return Json(new { rgb = HexToRgba(backgroundColor), resetButton = "<a id=\"resetChatBackground\" onclick=\"resetChatBackground(this, `" + loggedUser + "`)\">Reset</a>" });
		}

		[HttpPost]
		public ActionResult RemoveUserChatColor(string loggedUser)
		{
			var userColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == loggedUser)?.UserColor;

			var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == loggedUser);
			if (row != null)
			{
				//_context.ChatSettings.Remove(row);
				//_context.SaveChanges();

				//return Json(true);

				if (row.userChatColor != null)
				{
					row.userChatColor = null;
					_context.SaveChanges();

					//return Json(new { success = true });
				}

				if (row.chatBackground == null && row.userChatColor == null && row.senderChatColor == null)
				{
					_context.ChatSettings.Remove(row);
					_context.SaveChanges();

					//return Json(new { success = true, userColor });
				}
			}

			var spanColor = SpanColor(userColor);

			return Json(new { success = true, spanColor, userColor });
		}

		[HttpPost]
		public ActionResult RemoveChatBackground(string loggedUser)
		{
			var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == loggedUser);
			if (row != null)
			{
				//_context.ChatSettings.Remove(row);
				//_context.SaveChanges();

				//return Json(true);

				if (row.chatBackground != null)
				{
					row.chatBackground = null;
					_context.SaveChanges();

					//return Json(true);
				}

				if (row.chatBackground == null && row.userChatColor == null && row.senderChatColor == null)
				{
					_context.ChatSettings.Remove(row);
					_context.SaveChanges();
				}
			}

			return Json(false);
		}

		[HttpGet]
		public ActionResult SettingsDiv()
		{
			var loggedUser = GetUserId();
			var userColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == loggedUser)?.UserColor;
			var userBackgroundColor = _context.ChatSettings.FirstOrDefault(x => x.UserId == loggedUser)?.chatBackground;
			var userChatColor = _context.ChatSettings.FirstOrDefault(x => x.UserId == loggedUser)?.userChatColor;

			string chatBackground = "";
			string resetChatBackground = "";
			if (userBackgroundColor != null)
			{
				chatBackground = userBackgroundColor;
				resetChatBackground = "<a id=\"resetChatBackground\" onclick=\"resetChatBackground(this, `" + loggedUser + "`)\">Reset</a>";
			}
			else
			{
				chatBackground = "#fdffff";
			}

			string userChatColor_ = "";
			string resetUserChatColor = "";
			if (userChatColor != null)
			{
				userChatColor_ = userChatColor;
				resetUserChatColor = "<a id=\"resetUserChatColor\" onclick=\"resetUserChatColor(this, `" + loggedUser + "`)\">Reset</a>";
			}
			else
			{
				userChatColor_ = userColor;
			}

			string div = "<div class=\"chatFilter\">" +
					"<a class=\"chatMinimize filterClose\" title=\"Zamknij\" onclick=\"scQisAIXdDGVbXF(this)\">" +
						"<ion-icon name=\"close-outline\"></ion-icon>" +
					"</a>" +
					"<div class=\"chatFilterParent\">" +
						"<div class=\"chatSetting\">" +
							"<label>" + //onclick=\"chatBackground(`" + loggedUser + "`)\"
										//"<div style=\"background-color: transparent;\"></div>" +
								"<input type=\"color\" id=\"chatBackgroundColorPicker\" value=\"" + chatBackground + "\" onchange=\"chatBackground(this, `" + loggedUser + "`)\" />" +
								"<span>Wybierz tło czatu</span>" +
							"</label>" +
							//"<div class=\"link\" onclick=\"chatBackground(`" + loggedUser + "`)\"><span>Wybierz tło czatu</span></div>" +
							resetChatBackground +
						"</div>" +
						"<div class=\"line\"></div>" +
						"<div class=\"chatSetting\">" +
							"<label>" +
								//"<input type=\"color\" value=\"" + userColor + "\" onchange=\"changeUserColor(this, event)\" />" +
								//"<div style=\"background-color: " + userColor + ";\"></div>" +
								"<input type=\"color\" id=\"userChatColor\" value=\"" + userChatColor_ + "\" onchange=\"userChatColor(this, `" + loggedUser + "`)\" />" +
								"<span>Twój kolor czatu</span>" +
							"</label>" +
							resetUserChatColor +
						"</div>" +
						"<div class=\"line\"></div>" +
						"<div class=\"chatSetting\">" +
							"<label>" +
								//"<input type=\"color\" value=\"\" onchange=\"changeReceiversColor(this, event)\" />" +
								"<div style=\"background-color: transparent;\"></div>" +
								"<span>Kolor czatu nadawcy</span>" +
							"</label>" +
							"<ion-icon name=\"help-circle\" title=\"Ustaw odpowiedni dla siebie kolor dla wszystkich nadawców\"></ion-icon>" +
						"</div>" +


					"</div>" +
				"</div>";

			return Json(new { div, loggedUser });
		}

        [HttpGet]
        public ActionResult ReceiveUsers(int? savedDepartment)
        {
			string replacement = "<div class=\"emptyConversation receiverNotSelected\">" +
										"<span>W celu rozpoczęcia rozmowy, kliknij na jedną z osób po lewej stronie.</span>" +
									"</div>";

			//return Content(UsersDiv(savedDepartment));
			return Json(new { contentResult = Content(UsersDiv(savedDepartment)), div = replacement });
        }

		public string SpanColor(string? color)
		{
			string spanColor = "";

			Color col_ = ColorTranslator.FromHtml(color);
			if (col_.R * 0.2126 + col_.G * 0.7152 + col_.B * 0.0722 < 255 / 2)
			{
				//dark color
				spanColor = "white";
			}
			else
			{
				//light color
				spanColor = "black";
			}

			return spanColor;
		}

		public string UsersDiv(int? savedDepartment)
        {
			string div = "";

			List<Workers2> workers = new List<Workers2>();
			if (savedDepartment == null)
			{
				//wybierz dział zalogowanego usera
				var userWorkerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == GetUserId())?.WorkerId;
				var userDepartmentId = _context.Workers2.FirstOrDefault(x => x.Id == userWorkerId)?.DepartmentID;

				workers = _context.Workers2.Where(x => x.DepartmentID == userDepartmentId).OrderBy(x => x.Name).ToList();
			}
			else
			{
				workers = _context.Workers2.Where(x => x.DepartmentID == savedDepartment).OrderBy(x => x.Name).ToList();
			}

			List<UserIdentity> users = new List<UserIdentity>();

			foreach (var worker in workers)
			{
				var u = _context.UserIdentity.FirstOrDefault(x => x.WorkerId == worker.Id);
				if (u != null)
				{
					users.Add(u);
				}
			}

			foreach (var user in users)
			{
				var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == user.UserId);
				var userChatColor = "";
				if (row != null)
				{
					userChatColor = row.userChatColor;
				}
				else
				{
					userChatColor = user.UserColor;
				}


				var worker = _context.Workers2.OrderBy(x => x.Surname).FirstOrDefault(x => x.Id == user.WorkerId);
				if (worker != null)
				{
					var userName = worker.Name;
					var userSurname = worker.Surname;

					if (user.UserId != GetUserId())
					{
						string span = "<span style=\"color: " + SpanColor(userChatColor) + ";\">" + userName.FirstOrDefault().ToString() + userSurname.FirstOrDefault().ToString() + "</span>";

						div += "<div class=\"chatUser\" title=\"Wybierz\" onclick=\"ltmkkPVQpNisKCP(this, '" + user.UserId + "')\">" +
									"<div class=\"avatar\" style=\"background-color:" + userChatColor + ";\">" +
										//"<div class=\"avatar\">" +
										span +
										//"<ion-icon name=\"person-circle-outline\"></ion-icon>" +
									"</div>" +
									"<span> " + userName + " </span>" +
									"<div class=\"chatUserUnreadMessageCountParent\"></div>" +
									"<div class=\"chatUserStatus\"></div>" +
									//"<div class=\"chatUserStatus online\" title=\"online\"></div>" + //detect if user is online or not
									//"<div class=\"chatUserStatus afk\" title=\"Zaraz wracam\"></div>" +
									//"<div class=\"chatUserStatus offline\" title=\"offline\"></div>" +
								"</div>";
					}
				}
			}

			return div;
		}

        [HttpGet]
        public ActionResult ShowChatMinimized()
        {
			string chatMinimized = "<div class=\"chatMinimized\" title=\"Otwórz czat\" onclick=\"ZtMJSUFaxcMCRVo()\">" +
					"<ion-icon name=\"chatbubbles\"></ion-icon>" +
					//"<div class=\"chatMinimizedNewMessages\" title=\"Nieprzeczytane wiadomości\">" +
					//	"<span>2</span>" +
					//"</div>" +
				"</div>";

            return Content(chatMinimized);
		}

		public static string HexToRgba(string hexColor)
		{
			if (hexColor.StartsWith("#"))
				hexColor = hexColor.Substring(1);

			int r = Convert.ToInt32(hexColor.Substring(0, 2), 16);
			int g = Convert.ToInt32(hexColor.Substring(2, 2), 16);
			int b = Convert.ToInt32(hexColor.Substring(4, 2), 16);

			float opacity = 0.2f; // 50% opacity

			return $"rgba({r}, {g}, {b}, {opacity.ToString(CultureInfo.InvariantCulture)})";
		}

		public static string HexToRgb(string hexColor)
		{
			if (hexColor.StartsWith("#"))
				hexColor = hexColor.Substring(1);

			int r = Convert.ToInt32(hexColor.Substring(0, 2), 16);
			int g = Convert.ToInt32(hexColor.Substring(2, 2), 16);
			int b = Convert.ToInt32(hexColor.Substring(4, 2), 16);

			return $"rgb({r}, {g}, {b})";
		}

		[HttpGet]
        public ActionResult ShowChat(int? savedDepartment)
        {
			string chatBackground = "";
			string chatBackgroundRGBA = "";
			var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == GetUserId());
			if (row != null)
			{
				if (row.chatBackground != null)
				{
					chatBackground = row.chatBackground;
					chatBackgroundRGBA = HexToRgba(chatBackground);
				}
			}

			string chat = "<div class=\"chat\" id=\"chat\" style=\"background-color:" + chatBackgroundRGBA + ";\">" +
					"<div class=\"chatUsers\">" +
						"<div class=\"chatDepartment\" title=\"Wybierz dział\" onclick=\"YElWMlpiHOvShrB(this)\">" +
							"<ion-icon name=\"filter-outline\"></ion-icon>" +
							"<div class=\"unreadMessagesFilterParent\">" +
								//"<div class=\"unreadMessagesFilter\">" +
								//	"<span>1</span>" +
								//"</div>" +
							"</div>" +
						"</div>" +
						UsersDiv(savedDepartment) +
					"</div>" +
					"<div class=\"chatParent\">" +
							"<div class=\"chatMessages\">" +
								"<div class=\"chatHeader\" id=\"chatheader\">" +
									"<div class=\"chatMinimizeDiv\">" +
										"<div class=\"chatStatus\">" +
											"<span class=\"status\"></span>" +
											"<span class=\"statusText\"></span>" +

										//"<span class=\"status online\"></span>" +
										//"<span class=\"statusText\">Online</span>" +
										//"<span class=\"status afk\"></span>" +
										//                                 "<span class=\"statusText\">Zaraz wracam</span>" +
										//"<span class=\"status offline\"></span>" +
										//                                 "<span class=\"statusText\">Offline</span>" +
										"</div>" +
									"</div>" +
									"<div class=\"chatMinimizeDiv\">" +
										//"<a class=\"chatMinimize\" onclick=\"\" title=\"Załącz plik\">" +
										//                                  "<ion-icon name=\"attach-outline\"></ion-icon>" +
										//                              "</a>" +
										"<a class=\"chatMinimize\" onclick=\"showChatSettings()\" title=\"Ustawienia\">" +
											"<ion-icon name=\"settings-sharp\"></ion-icon>" +
										"</a>" +
										//"<a class=\"chatMinimize\" onclick=\"\" title=\"Zmień kolor wiadomości\">" +
										//	"<div class=\"chatColor\" style=\"background-color: @color;\"></div>" +
										//"</a>" +
										"<a class=\"chatMinimize\" onclick=\"tqMrMyJEPoAgJSW()\" title=\"Minimalizuj\">" +
											"<ion-icon name=\"chevron-down\"></ion-icon>" +
										"</a>" +
									"</div>" +
								"</div>" +
								"<div class=\"chatMessagesBubbles\">" +
									"<div class=\"emptyConversation receiverNotSelected\">" +
										"<span>W celu rozpoczęcia rozmowy, kliknij na jedną z osób po lewej stronie.</span>" +
									"</div>" +
									//"<div class=\"emptyConversation\">" +
									//                               "<span>Napisz wiadomość i kliknij wyślij, aby rozpocząć rozmowę.</span>" +
									//                               "<ion-icon name=\"arrow-down-outline\"></ion-icon>" +
									//                           "</div>" +
									"" +
								"</div>" +
							"</div>" +
							"<div class=\"chatText\">" +
                                //"<div class=\"textAreaDiv\">" +
                                //    "<textarea placeholder=\"...\"></textarea>" +
                                //    "<a title=\"Załącz plik\">" +
                                //        "<ion-icon name=\"attach-outline\"></ion-icon>" +
                                //    "</a>" +
                                //"</div>" +
                                //"<a onclick=\"\" title=\"Wyślij\"><ion-icon name=\"arrow-up-outline\"></ion-icon></a>" +
                            "</div>" +
						"</div>" +
				"</div>";


			//return Json(new { chat, chatBackgroundRGBA });
			return Content(chat);

            //return Json(new { chat = Content(chat), chatMinimized = Content(chatMinimized) });
        }

		//private string GetMimeType(string fileName)
		//{
		//	// Extract the file extension
		//	string extension = System.IO.Path.GetExtension(fileName).ToLower();

		//	// Determine the MIME type based on file extension
		//	switch (extension)
		//	{
		//		case ".jpg":
		//		case ".jpeg":
		//			return "image/jpeg";
		//		case ".png":
		//			return "image/png";
		//		case ".gif":
		//			return "image/gif";
		//		case ".bmp":
		//			return "image/bmp";
		//		case ".tiff":
		//		case ".tif":
		//			return "image/tiff";
		//		case ".svg":
		//			return "image/svg+xml";
		//		default:
		//			throw new ArgumentException("Unsupported image format");
		//	}
		//}

		//public ActionResult GetImageFromFtp(string receiver, DateTime messageDate, string encryptedFileName, string decryptedFileName, string decryptedFileType)
		//{
		//	string ftpUrl = "ftp://127.0.0.1/chat/" + receiver + "/" + messageDate.ToString("yyyyMMddHHmm") + "/" + encryptedFileName + "." + decryptedFileType;
		//	string ftpUsername = "TimeTaskFTP";
		//	string ftpPassword = "Kromolski666745!";

		//	// Download image from FTP
		//	WebClient ftpClient = new WebClient();
		//	ftpClient.Credentials = new NetworkCredential(ftpUsername, ftpPassword);

		//	// Download the image data as byte array from FTP
		//	byte[] imageData = ftpClient.DownloadData(ftpUrl);

		//	// Determine the MIME type based on the file extension
		//	string mimeType = GetMimeType(ftpUrl);


		//	// Return the image as a File result with the correct MIME type
		//	return File(imageData, mimeType);

		//}

		public string GetFileFromZip(string receiver, DateTime messageDate, string encryptedFileName, string decryptedFileName, string decryptedFileType)
		{

			//"C:/Users/Kromolski/FTP/chat/" + receiver + "/" + date.ToString("yyyyMMddHHmm");
			//string path = "C:/Users/Kromolski/FTP/chat/" + receiver + "/" + messageDate.ToString("yyyyMMddHHmm");


			//string sharedFolderPath = Path.Combine(_environment.WebRootPath, "Uploads");
			//var receiverFolderPath = Path.Combine(sharedFolderPath, "/chat/" + receiver + "/" + messageDate.ToString("yyyyMMddHHmm") + "/" + encryptedFileName + "." + decryptedFileType);



			//string uploadsFolderPath = Path.Combine(_environment.WebRootPath, "Uploads");

			//string chatFolderPath = Path.Combine(uploadsFolderPath, "chat");
			string chatFolderPath = Path.Combine("Uploads", "chat");

			//if (GetUserId() == receiver)
			//{
			//	chatFolderPath = Path.Combine("C:\\Users\\Kromolski\\source\\repos\\TimeTask\\wwwroot\\Uploads", "chat");
			//}

			string receiverFolder = Path.Combine(chatFolderPath, receiver);

			string dateFolderName = messageDate.ToString("yyyyMMddHHmmss");
			string dateFolderPath = Path.Combine(receiverFolder, dateFolderName);

			string fileName = encryptedFileName + "." + decryptedFileType;
			string filePath = Path.Combine(dateFolderPath, fileName);

			return filePath;
			//return "C:/Users/Kromolski/FTP/chat/83b749e7-4525-440c-8224-68c36808655d/202410121638/vbQXxR4ucDn_TJASVBhyvteHtRH_SPLDDComlK3+ZJo=.jpg";














			//var receiverFolderPath = "C:/Users/Kromolski/FTP/chat/" + receiver;
			//var receiverFolderPath = "/chat/" + receiver;
			//var dateFolder = receiverFolderPath + "/" + messageDate.ToString("yyyyMMddHHmm");
			//var file = dateFolder + "/" + encryptedFileName + "." + decryptedFileType;

			//var file = "/chat/" + receiver + "/" + messageDate.ToString("yyyyMMddHHmm") + "/" + encryptedFileName + "." + decryptedFileType;
			//var file = "ftp://127.0.0.1/chat/" + receiver + "/" + messageDate.ToString("yyyyMMddHHmm") + "/" + encryptedFileName + "." + decryptedFileType;





			//string ftpServer = "127.0.0.1";
			//string ftpUsername = "TimeTaskFTP";
			//string ftpPassword = "Kromolski666745!";

			//var file = $"ftp://{ftpUsername}:{ftpPassword}@{ftpServer}/chat/" + receiver + "/" + messageDate.ToString("yyyyMMddHHmm") + "/" + encryptedFileName + "." + decryptedFileType;
			//var file = $"ftp://{ftpServer}/chat/" + receiver + "/" + messageDate.ToString("yyyyMMddHHmm") + "/" + encryptedFileName + "." + decryptedFileType;

			//return file;







			//var receiverFolderPath = "C:/Users/Kromolski/FTP/chat/" + receiver;
			//var dateFolder = receiverFolderPath + "/" + messageDate.ToString("yyyyMMddHHmm");
			//var zipFilePath = dateFolder + "/" + encryptedFileName + ".zip";
			////var zipFilePath = dateFolder + "/" + decryptedFileName + ".zip";

			//string password = Data.Encryption.EncryptionFiles.Encrypt(Data.Encryption.EncryptionFiles.Encrypt(decryptedFileType));
			//string tempFolderPath = Path.GetTempPath();
			////string fileNameInZip = decryptedFileName + "." + decryptedFileType;
			////string fileNameInZip = encryptedFileName;
			//string fileNameInZip = encryptedFileName + "." + decryptedFileType;
			//string tempFilePath = Path.Combine(tempFolderPath, fileNameInZip);






			//try
			//{
			//	using (FileStream fs = System.IO.File.OpenRead(zipFilePath))
			//	using (ICSharpCode.SharpZipLib.Zip.ZipFile zipFile = new ICSharpCode.SharpZipLib.Zip.ZipFile(fs))
			//	{
			//		if (!string.IsNullOrEmpty(password))
			//		{
			//			zipFile.Password = password;
			//		}

			//		ZipEntry entry = zipFile.GetEntry(fileNameInZip);
			//		if (entry != null)
			//		{
			//			using (Stream zipStream = zipFile.GetInputStream(entry))
			//			using (FileStream tempFile = System.IO.File.Create(tempFilePath))
			//			{
			//				zipStream.CopyTo(tempFile);  // Copy file content to the temp location

			//				//byte[] buffer = new byte[4096];
			//				//int bytesRead;
			//				//while ((bytesRead = zipStream.Read(buffer, 0, buffer.Length)) > 0)
			//				//{
			//				//	tempFile.Write(buffer, 0, bytesRead);
			//				//}

			//			}

			//			return password;
			//		}
			//		else
			//		{
			//			return "File not found in the ZIP";
			//		}
			//	}

			//	// Process.Start(tempFilePath); // Example: Open file in associated program
			//}
			//catch (Exception ex)
			//{
			//	return "Error";
			//}




			//using (FileStream fs = System.IO.File.OpenRead(zipFilePath))
			//{
			//	using (ICSharpCode.SharpZipLib.Zip.ZipFile zipFile = new ICSharpCode.SharpZipLib.Zip.ZipFile(fs))
			//	{
			//		// Set the password
			//		zipFile.Password = Data.Encryption.EncryptionFiles.Encrypt(Data.Encryption.EncryptionFiles.Encrypt(decryptedFileType));

			//		// Find the file in the ZIP archive
			//		ZipEntry entry = zipFile.GetEntry(encryptedFileName);


			//		if (entry != null && entry.IsCrypted && entry.AESKeySize == 256)
			//		{
			//			// Open the stream for the encrypted file
			//			using (Stream zipStream = zipFile.GetInputStream(entry))
			//			using (StreamReader reader = new StreamReader(zipStream))
			//			{
			//				// Read and display the file content
			//				string fileContent = reader.ReadToEnd();
			//				//Console.WriteLine(fileContent);

			//				return fileContent;
			//			}

			//		}
			//		else
			//		{
			//			return "Not found";
			//		}


			//	}
			//}


			//return "";
		}

		//public byte[] GetImgByte(string ftpFilePath)
		//{
		//	WebClient ftpClient = new WebClient();
		//	ftpClient.Credentials = new NetworkCredential("TimeTaskFTP", "Kromolski666745!");

		//	byte[] imageByte = ftpClient.DownloadData(ftpFilePath);

		//	//byte[] imageByte = _ftpClient.DownloadFile(ftpFilePath);
		//	return imageByte;
		//}

		//public static Bitmap ByteToImage(byte[] blob)
		//{
		//	MemoryStream mStream = new MemoryStream();
		//	byte[] pData = blob;
		//	mStream.Write(pData, 0, Convert.ToInt32(pData.Length));
		//	Bitmap bm = new Bitmap(mStream, false);
		//	mStream.Dispose();
		//	return bm;
		//}

		[HttpGet]
		public async Task<ActionResult> ShowChatMessages_Refresh(string sender, string receiver)
		{
			var culture = new CultureInfo("pl-PL");

			string? senderColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == sender)?.UserColor;

			/**/
			var chatSettings = _context.ChatSettings.FirstOrDefault(x => x.UserId == sender);
			if (chatSettings != null)
			{
				if (chatSettings.userChatColor != null)
				{
					senderColor = chatSettings.userChatColor;
				}

			}
			/**/
			string spanSenderColor = SpanColor(senderColor);

			string? receiverColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == receiver)?.UserColor;
			/**/
			var chatSettings_ = _context.ChatSettings.FirstOrDefault(x => x.UserId == receiver);
			if (chatSettings_ != null)
			{
				if (chatSettings_.userChatColor != null)
				{
					receiverColor = chatSettings_.userChatColor;
				}

			}
			/**/
			string spanReceiverColor = SpanColor(receiverColor);

			string textDiv = "";

			var loggedUser = GetUserId();
			if (loggedUser == sender)
			{
				//return Json("jesteś wysyłającym");
				textDiv = "<div class=\"textAreaDiv\">" +
						"<textarea placeholder=\"...\" id=\"textAreaMessage\" spellcheck=\"false\" onkeydown=\"sendMessageEnter(event)\"></textarea>" +
						"<a title=\"Załącz plik (Maks. 5 MB)\" onclick=\"MiOzrGaouyRUWPc('" + receiver + "')\">" +
							"<ion-icon name=\"attach-outline\"></ion-icon>" +
						"</a>" +
						//"<input type=\"file\" style=\"display: none;\" id=\"xVAsGpOGwCDwhAc\" onclick=\"MiOzrGaouyRUWPc_(event, this, '" + receiver + "')\" />" +
					"</div>" +
					"<a id=\"sendMessage\" onclick=\"vKbmXcDAKBSEZqf('" + receiver + "')\" title=\"Wyślij\"><ion-icon name=\"arrow-up-outline\"></ion-icon></a>";
			}
			if (loggedUser == receiver)
			{
				//return Json("jesteś odbierającym");
				textDiv = "<div class=\"textAreaDiv\">" +
						"<textarea placeholder=\"...\" id=\"textAreaMessage\" spellcheck=\"false\" onkeydown=\"sendMessageEnter(event)\"></textarea>" +
						"<a title=\"Załącz plik (Maks. 5 MB)\" onclick=\"MiOzrGaouyRUWPc('" + sender + "')\">" +
							"<ion-icon name=\"attach-outline\"></ion-icon>" +
						"</a>" +
						//"<input type=\"file\" style=\"display: none;\" id=\"xVAsGpOGwCDwhAc\" onclick=\"MiOzrGaouyRUWPc_(event, this, '" + sender + "')\" />" +
					"</div>" +
					"<a id=\"sendMessage\" onclick=\"vKbmXcDAKBSEZqf('" + sender + "')\" title=\"Wyślij\"><ion-icon name=\"arrow-up-outline\"></ion-icon></a>";
			}

			string messages = "";

			var chatArray = _context.Chat.Where(x => x.ReceiverUserId == receiver && x.SenderUserId == sender || x.ReceiverUserId == sender && x.SenderUserId == receiver);

			if (chatArray.Count() > 0)
			{
				//musi wyjść większe niż zero, jeżeli dodanie do bazy się powiodło

				var dates = chatArray.Select(x => x.MessageSentDate.Date);
				var dates_ = dates.Distinct();
				foreach (var date in dates_.OrderBy(x => x))
				{
					messages += "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
					   "<div class=\"chatDateStamp\" onclick=\"bubblesAccordion(this)\">" +
							"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
						"</div>"; // + </div>

					List<Chat> chats = new List<Chat>();
					foreach (var row in chatArray)
					{
						if (row.MessageSentDate.ToShortDateString() == date.ToShortDateString())
						{
							chats.Add(row);

							//jeżeli ma więcej niż 30 dni -> nie pokazuj ale stwórz przycisk do pokazania tych wiadomości (podobny do daty )
						}
					}

					foreach (var row in chats.OrderBy(x => x.MessageSentDate))
					{
						string bubbles = "";

						if (loggedUser == sender)
						{
							//return Json("wysyłajacy");
							if (row.ReceiverUserId == sender)
							{
								if (row.IfDeleted)
								{
									bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div class=\"bubble deleted receiver\">" +
											"<span>Wiadomość usunięta</span>" +
											"<div class=\"tail\"></div>" +
										"</div>" +
									"</div>";
								}
								else
								{
									string decryptedMessage = "";
									byte[] byteMessage = new byte[0];
									if (row.MessageText != null)
									{
										byteMessage = Convert.FromBase64String(row.MessageText);
									}
									decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);


									string classes = "";
									if (row.IfMessageRead)
										classes = "bubble receiver";
									else
										classes = "bubble receiver unread";



									if (row.AttachmentName == null && row.AttachmentFileType == null)
									{
										string div = "";
										string classes2 = "";
										if (IfImage("." + decryptedMessage.Split(".").Last()))
										{
											div = "<img src='" + decryptedMessage + "'>";
											classes2 = "picture";
										}
										else if (IfVideo("." + decryptedMessage.Split(".").Last()))
										{
											div = "<video autoplay loop muted><source src=\"" + decryptedMessage + "\"></video>";
											classes2 = "picture";
										}
										else
										{
											div = "<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>";
											//classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(event, `" + row.MessageSentDate.ToString("dd.MM.yyyy") + "`, `" + row.MessageSentDate.ToString("HH:mm") + "`)\">" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
											"</div>" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
										"</div>";
									}
									if (row.AttachmentName != null && row.AttachmentFileType != null)
									{
										string base64Encrypted_AttachmentName = row.AttachmentName.Replace('_', '/').Replace('-', '\\');
										string base64Encrypted_AttachmentFileType = row.AttachmentFileType.Replace('_', '/').Replace('-', '\\');

										byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
										byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

										string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
										string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

										string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;

										//czy decryptedAttachmentFileType jest obrazem
										string div = "";
										string imagePath = GetFileFromZip(receiver, row.MessageSentDate, row.AttachmentName, decryptedAttachmentName, decryptedAttachmentFileType);
										if (IfImage(Path.GetExtension(imagePath))) //IfImage(decryptedAttachmentFileType)
										{
											div = "<img src='" + imagePath + "'>";
										}
										else
										{
											div = "<span>" + fileName + "</span>";
										}


										string classes2 = "";
										if (IfImage("." + decryptedAttachmentFileType))
										{
											classes2 = "picture";
										}
										else
										{
											classes2 = "file";
										}


										bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(event, `" + row.MessageSentDate.ToString("dd.MM.yyyy") + "`, `" + row.MessageSentDate.ToString("HH:mm") + "`)\">" +
												//"<span>" + fileName + "</span>" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
											"</div>" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
										"</div>";
									}



									//bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
									//	"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
									//		"<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>" +
									//		"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
									//	"</div>" +
									//	"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//		"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
									//	"</div>" +
									//"</div>";
								}
							}
							if (row.SenderUserId == sender)
							{
								if (row.IfDeleted)
								{
									bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											"<div class=\"bubble deleted sender\">" +
											"<span>Wiadomość usunięta</span>" +
											"<div class=\"tail\"></div>" +
										"</div>" +
									"</div>";
								}
								else
								{
									string decryptedMessage = "";
									byte[] byteMessage = new byte[0];
									if (row.MessageText != null)
									{
										byteMessage = Convert.FromBase64String(row.MessageText);
									}
									decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);


									string classes = "";
									string messageReadStatusIcon = "";
									if (row.IfMessageRead)
									{
										//messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye\"></ion-icon></div>";
										messageReadStatusIcon = "";
										classes = "bubble sender";
									}
									else
									{
										messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";
										classes = "bubble sender unread";
									}



									if (row.AttachmentName == null && row.AttachmentFileType == null)
									{
										string div = "";
										string classes2 = "";
										if (IfImage("." + decryptedMessage.Split(".").Last()))
										{
											div = "<img src='" + decryptedMessage + "'>";
											classes2 = "picture";
										}
										else if (IfVideo("." + decryptedMessage.Split(".").Last()))
										{
											div = "<video autoplay loop muted><source src=\"" + decryptedMessage + "\"></video>";
											classes2 = "picture";
										}
										else
										{
											div = "<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>";
											//classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(event," + row.Id + ", '" + sender + "', '" + receiver + "')\">" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
												messageReadStatusIcon +
											"</div>" +
										"</div>";
									}
									if (row.AttachmentName != null && row.AttachmentFileType != null)
									{
										string base64Encrypted_AttachmentName = row.AttachmentName.Replace('_', '/').Replace('-', '\\');
										string base64Encrypted_AttachmentFileType = row.AttachmentFileType.Replace('_', '/').Replace('-', '\\');

										byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
										byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

										string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
										string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

										string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;

										//czy decryptedAttachmentFileType jest obrazem
										string div = "";
										string imagePath = GetFileFromZip(receiver, row.MessageSentDate, row.AttachmentName, decryptedAttachmentName, decryptedAttachmentFileType);
										if (IfImage(Path.GetExtension(imagePath))) //IfImage(decryptedAttachmentFileType)
										{
											//div = "<img src=\"" + imagePath + "\">";
											div = "<img src='" + imagePath + "'>";
											//div = "<img src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";
											//div = "<img a=\"" + ByteToImage(GetImgByte(imagePath)) + "\" src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";

											//div = "<img src=\"" + GetImgByte(imagePath) + "\">";
										}
										else
										{
											div = "<span>" + fileName + "</span>";
										}

										//div = "<img alt=\"" + Path.GetExtension(imagePath) + "\" src=\"" + imagePath + "\">";
										//div = "<img alt=\"" + row.MessageSentDate.ToString("yyyyMMddHHmm") + "\" src=\"" + imagePath + "\">";

										string classes2 = "";
										if (IfImage("." + decryptedAttachmentFileType))
										{
											classes2 = "picture";
										}
										else
										{
											classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(event," + row.Id + ", '" + sender + "', '" + receiver + "')\">" +
												//"<span>" + fileName + "</span>" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
												messageReadStatusIcon +
											"</div>" +
										"</div>";
									}


									//bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
									//	"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//		"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
									//	"</div>" +
									//	"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this," + row.Id + ", '" + sender + "', '" + receiver + "')\">" +
									//		"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
									//		"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
									//		messageReadStatusIcon +
									//	"</div>" +
									//"</div>";
								}
							}
						}
						if (loggedUser == receiver)
						{
							//return Json("odbierający");
							if (row.ReceiverUserId == receiver)
							{
								if (row.IfDeleted)
								{
									bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div class=\"bubble deleted receiver\">" +
											"<span>Wiadomość usunięta</span>" +
											"<div class=\"tail\"></div>" +
										"</div>" +
									"</div>";
								}
								else
								{
									string decryptedMessage = "";
									byte[] byteMessage = new byte[0];
									if (row.MessageText != null)
									{
										byteMessage = Convert.FromBase64String(row.MessageText);
									}
									decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);


									string classes = "";
									if (row.IfMessageRead)
										classes = "bubble receiver";
									else
										classes = "bubble receiver unread";




									if (row.AttachmentName == null && row.AttachmentFileType == null)
									{
										string div = "";
										string classes2 = "";
										if (IfImage("." + decryptedMessage.Split(".").Last()))
										{
											div = "<img src='" + decryptedMessage + "'>";
											classes2 = "picture";
										}
										else if (IfVideo("." + decryptedMessage.Split(".").Last()))
										{
											div = "<video autoplay loop muted><source src=\"" + decryptedMessage + "\"></video>";
											classes2 = "picture";
										}
										else
										{
											div = "<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>";
											//classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClickReceiver(event, `" + row.MessageSentDate.ToString("dd.MM.yyyy") + "`, `" + row.MessageSentDate.ToString("HH:mm") + "`)\">" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
											"</div>" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
										"</div>";
									}
									if (row.AttachmentName != null && row.AttachmentFileType != null)
									{
										string base64Encrypted_AttachmentName = row.AttachmentName.Replace('_', '/').Replace('-', '\\');
										string base64Encrypted_AttachmentFileType = row.AttachmentFileType.Replace('_', '/').Replace('-', '\\');

										byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
										byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

										string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
										string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

										string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;

										//czy decryptedAttachmentFileType jest obrazem
										string div = "";
										string imagePath = GetFileFromZip(receiver, row.MessageSentDate, row.AttachmentName, decryptedAttachmentName, decryptedAttachmentFileType);
										if (IfImage(Path.GetExtension(imagePath))) //IfImage(decryptedAttachmentFileType)
										{
											//div = "<img src=\"" + imagePath + "\">";
											div = "<img src='" + imagePath + "'>";
											//div = "<img src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";
											//div = "<img a=\"" + ByteToImage(GetImgByte(imagePath)) + "\" src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";

											//div = "<img src=\"" + GetImgByte(imagePath) + "\">";
										}
										else
										{
											div = "<span>" + fileName + "</span>";
										}

										//div = "<img alt=\"" + Path.GetExtension(imagePath) + "\" src=\"" + imagePath + "\">";
										//div = "<img alt=\"" + row.MessageSentDate.ToString("yyyyMMddHHmm") + "\" src=\"" + imagePath + "\">";

										string classes2 = "";
										if (IfImage("." + decryptedAttachmentFileType))
										{
											classes2 = "picture";
										}
										else
										{
											classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClickReceiver(event, `" + row.MessageSentDate.ToString("dd.MM.yyyy") + "`, `" + row.MessageSentDate.ToString("HH:mm") + "`)\">" +
												//"<span>" + fileName + "</span>" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
											"</div>" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
										"</div>";
									}




									//bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
									//	"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
									//		"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
									//		"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
									//	"</div>" +
									//	"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//		"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
									//	"</div>" +
									//"</div>";
								}
							}
							if (row.SenderUserId == receiver)
							{
								if (row.IfDeleted)
								{
									bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											"<div class=\"bubble deleted sender\">" +
											"<span>Wiadomość usunięta</span>" +
											"<div class=\"tail\"></div>" +
										"</div>" +
									"</div>";
								}
								else
								{
									string decryptedMessage = "";
									byte[] byteMessage = new byte[0];
									if (row.MessageText != null)
									{
										byteMessage = Convert.FromBase64String(row.MessageText);
									}
									decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);


									string classes = "";
									string messageReadStatusIcon = "";
									if (row.IfMessageRead)
									{
										//messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye\"></ion-icon></div>";
										messageReadStatusIcon = "";
										classes = "bubble sender";
									}
									else
									{
										messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";
										classes = "bubble sender unread";
									}



									if (row.AttachmentName == null && row.AttachmentFileType == null)
									{
										string div = "";
										string classes2 = "";
										if (IfImage("." + decryptedMessage.Split(".").Last()))
										{
											div = "<img src='" + decryptedMessage + "'>";
											classes2 = "picture";
										}
										else if (IfVideo("." + decryptedMessage.Split(".").Last()))
										{
											div = "<video autoplay loop muted><source src=\"" + decryptedMessage + "\"></video>";
											classes2 = "picture";
										}
										else
										{
											div = "<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>";
											//classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClick(event," + row.Id + ", '" + sender + "', '" + receiver + "')\">" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
												messageReadStatusIcon +
											"</div>" +
										"</div>";
									}
									if (row.AttachmentName != null && row.AttachmentFileType != null)
									{
										string base64Encrypted_AttachmentName = row.AttachmentName.Replace('_', '/').Replace('-', '\\');
										string base64Encrypted_AttachmentFileType = row.AttachmentFileType.Replace('_', '/').Replace('-', '\\');

										byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
										byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

										string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
										string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

										string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;

										//czy decryptedAttachmentFileType jest obrazem
										string div = "";
										string imagePath = GetFileFromZip(receiver, row.MessageSentDate, row.AttachmentName, decryptedAttachmentName, decryptedAttachmentFileType);
										if (IfImage(Path.GetExtension(imagePath))) //IfImage(decryptedAttachmentFileType)
										{
											//div = "<img src=\"" + imagePath + "\">";
											div = "<img src='" + imagePath + "'>";
											//div = "<img src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";
											//div = "<img a=\"" + ByteToImage(GetImgByte(imagePath)) + "\" src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";

											//div = "<img src=\"" + GetImgByte(imagePath) + "\">";
										}
										else
										{
											div = "<span>" + fileName + "</span>";
										}

										//div = "<img alt=\"" + Path.GetExtension(imagePath) + "\" src=\"" + imagePath + "\">";
										//div = "<img alt=\"" + row.MessageSentDate.ToString("yyyyMMddHHmm") + "\" src=\"" + imagePath + "\">";

										string classes2 = "";
										if (IfImage("." + decryptedAttachmentFileType))
										{
											classes2 = "picture";
										}
										else
										{
											classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClick(event," + row.Id + ", '" + sender + "', '" + receiver + "')\">" +
												//"<span>" + fileName + "</span>" +
												div +
												"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
												messageReadStatusIcon +
											"</div>" +
										"</div>";
									}



									//bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
									//	"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//		"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
									//	"</div>" +
									//	"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClick(this," + row.Id + ", '" + sender + "', '" + receiver + "')\">" +
									//		"<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>" +
									//		"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
									//		messageReadStatusIcon +
									//	"</div>" +
									//"</div>";
								}
							}
						}

						messages += bubbles;
					}

					messages += "</div>";
				}

				return Json(new { messages, textDiv, loggedUser, senderId = sender });
			}
			else
			{
				return Json("dodanie do bazy nie powiodło się");
			}
		}

        [HttpGet]
        public ActionResult ShowChatMessages(string receiverUserId)
        {
			var culture = new CultureInfo("pl-PL");

			var senderUserId = GetUserId(); //currently logged in user!!!

			var senderColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == senderUserId)?.UserColor;
			/**/
			var chatSettings = _context.ChatSettings.FirstOrDefault(x => x.UserId == senderUserId);
			if (chatSettings != null)
			{
				if (chatSettings.userChatColor != null)
				{
					senderColor = chatSettings.userChatColor;
				}

			}
			/**/
			string spanSenderColor = SpanColor(senderColor);

			var receiverColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == receiverUserId)?.UserColor;

			/**/
			var chatSettings_ = _context.ChatSettings.FirstOrDefault(x => x.UserId == receiverUserId);
			if (chatSettings_ != null)
			{
				if (chatSettings_.userChatColor != null)
				{
					receiverColor = chatSettings_.userChatColor;
				}

			}
			/**/
			string spanReceiverColor = SpanColor(receiverColor);

			string div = "<div class=\"emptyConversation\">" +
								"<span>Napisz wiadomość i kliknij wyślij, aby rozpocząć rozmowę.</span>" +
								"<ion-icon name=\"arrow-down-outline\"></ion-icon>" +
							 "</div>";

			string textDiv = "<div class=\"textAreaDiv\">" +
					"<textarea placeholder=\"...\" id=\"textAreaMessage\" spellcheck=\"false\" onkeydown=\"sendMessageEnter(event)\"></textarea>" +
					"<a title=\"Załącz plik (Maks. 5 MB)\" onclick=\"MiOzrGaouyRUWPc('" + receiverUserId + "')\">" +
						"<ion-icon name=\"attach-outline\"></ion-icon>" +
					"</a>" +
					//"<input type=\"file\" style=\"display: none;\" id=\"xVAsGpOGwCDwhAc\" onclick=\"MiOzrGaouyRUWPc_(event, this, '" + receiverUserId + "')\" />" +
				"</div>" +
				"<a id=\"sendMessage\" onclick=\"vKbmXcDAKBSEZqf('" + receiverUserId + "')\" title=\"Wyślij\"><ion-icon name=\"arrow-up-outline\"></ion-icon></a>";

            string messages = "";

			var chatArray = _context.Chat.Where(x => x.ReceiverUserId == receiverUserId && x.SenderUserId == senderUserId || x.ReceiverUserId == senderUserId && x.SenderUserId == receiverUserId);
            if (chatArray.Count() > 0)
            {
                var dates = chatArray.Select(x => x.MessageSentDate.Date);
                var dates_ = dates.Distinct();
                foreach (var date in dates_.OrderBy(x => x))
                {
                    messages += "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
					   "<div class=\"chatDateStamp\" onclick=\"bubblesAccordion(this)\">" +
                            "<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
                        "</div>"; // + </div>

                    List<Chat> chats = new List<Chat>();
                    foreach (var row in chatArray)
                    {
                        if (row.MessageSentDate.ToShortDateString() == date.ToShortDateString())
                        {
                            chats.Add(row);
                        }
                    }

                    foreach (var row in chats.OrderBy(x => x.MessageSentDate))
                    {
						if (row != null)
						{
							string bubbles = "";
							if (row.ReceiverUserId == senderUserId)
							{
								if (row.IfDeleted)
								{
									bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div class=\"bubble deleted receiver\">" +
											"<span>Wiadomość usunięta</span>" +
											"<div class=\"tail\"></div>" +
										"</div>" +
									"</div>";
								}
								else
								{
									string decryptedMessage = "";
									byte[] byteMessage = new byte[0];
									if (row.MessageText != null)
									{
										byteMessage = Convert.FromBase64String(row.MessageText);
									}
									decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);


									string classes = "";
									if (row.IfMessageRead)
										classes = "bubble receiver";
									else
										classes = "bubble receiver unread";



									if (row.AttachmentName == null && row.AttachmentFileType == null)
									{
										string div_ = "";
										string classes2 = "";
										if (IfImage("." + decryptedMessage.Split(".").Last()))
										{
											div_ = "<img src='" + decryptedMessage + "'>";
											classes2 = "picture";
										}
										else if (IfVideo("." + decryptedMessage.Split(".").Last()))
										{
											div_ = "<video autoplay loop muted><source src=\"" + decryptedMessage + "\"></video>";
											classes2 = "picture";
										}
										else
										{
											div_ = "<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>";
											//classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(event, `" + row.MessageSentDate.ToString("dd.MM.yyyy") + "`, `" + row.MessageSentDate.ToString("HH:mm") + "`)\">" +
												div_ +
												"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
											"</div>" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
										"</div>";
									}
									if (row.AttachmentName != null && row.AttachmentFileType != null)
									{
										string base64Encrypted_AttachmentName = row.AttachmentName.Replace('_', '/').Replace('-', '\\');
										string base64Encrypted_AttachmentFileType = row.AttachmentFileType.Replace('_', '/').Replace('-', '\\');

										byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
										byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

										string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
										string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

										string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;

										//czy decryptedAttachmentFileType jest obrazem
										string div_ = "";
										string imagePath = GetFileFromZip(receiverUserId, row.MessageSentDate, row.AttachmentName, decryptedAttachmentName, decryptedAttachmentFileType);
										if (IfImage(Path.GetExtension(imagePath))) //IfImage(decryptedAttachmentFileType)
										{
											//div_ = "<img src=\"" + imagePath + "\">";
											div_ = "<img src='" + imagePath + "'>";
											//div_ = "<img src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";
											//div_ = "<img a=\"" + ByteToImage(GetImgByte(imagePath)) + "\" src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";

											//div_ = "<img src=\"" + GetImgByte(imagePath) + "\">";
										}
										else
										{
											div_ = "<span>" + fileName + "</span>";
										}

										//div_ = "<img alt=\"" + Path.GetExtension(imagePath) + "\" src=\"" + imagePath + "\">";
										//div_ = "<img alt=\"" + row.MessageSentDate.ToString("yyyyMMddHHmm") + "\" src=\"" + imagePath + "\">";

										string classes2 = "";
										if (IfImage("." + decryptedAttachmentFileType))
										{
											classes2 = "picture";
										}
										else
										{
											classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(event, `" + row.MessageSentDate.ToString("dd.MM.yyyy") + "`, `" + row.MessageSentDate.ToString("HH:mm") + "`)\">" +
												//"<span>" + fileName + "</span>" +
												div_ +
												"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
											"</div>" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
										"</div>";
									}



									//bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
									//	"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
									//		"<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>" +
									//		"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
									//	"</div>" +
									//	"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//		"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
									//	"</div>" +
									//"</div>";
								}
							}

							if (row.SenderUserId == senderUserId)
							{
								if (row.IfDeleted)
								{
									bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											"<div class=\"bubble deleted sender\">" +
											"<span>Wiadomość usunięta</span>" +
											"<div class=\"tail\"></div>" +
										"</div>" +
									"</div>";
								}
								else
								{
									string decryptedMessage = "";
									byte[] byteMessage = new byte[0];
									if (row.MessageText != null)
									{
										byteMessage = Convert.FromBase64String(row.MessageText);
									}
									decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);


									string classes = "";
									string messageReadStatusIcon = "";
									if (row.IfMessageRead)
									{
										//messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye\"></ion-icon></div>";
										messageReadStatusIcon = "";
										classes = "bubble sender";
									}
									else
									{
										messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";
										classes = "bubble sender unread";
									}




									if (row.AttachmentName == null && row.AttachmentFileType == null)
									{
										string div_ = "";
										string classes2 = "";
										if (IfImage("." + decryptedMessage.Split(".").Last()))
										{
											div_ = "<img src='" + decryptedMessage + "'>";
											classes2 = "picture";
										}
										else if (IfVideo("." + decryptedMessage.Split(".").Last()))
										{
											div_ = "<video autoplay loop muted><source src=\"" + decryptedMessage + "\"></video>";
											classes2 = "picture";
										}
										else
										{
											div_ = "<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>";
											//classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(event," + row.Id + ", '" + senderUserId + "', '" + receiverUserId + "')\">" +
												div_ +
												"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
												messageReadStatusIcon +
											"</div>" +
										"</div>";
									}
									if (row.AttachmentName != null && row.AttachmentFileType != null)
									{
										string base64Encrypted_AttachmentName = row.AttachmentName.Replace('_', '/').Replace('-', '\\');
										string base64Encrypted_AttachmentFileType = row.AttachmentFileType.Replace('_', '/').Replace('-', '\\');

										byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
										byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

										string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
										string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

										string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;

										//czy decryptedAttachmentFileType jest obrazem
										string div_ = "";
										string imagePath = GetFileFromZip(receiverUserId, row.MessageSentDate, row.AttachmentName, decryptedAttachmentName, decryptedAttachmentFileType);
										if (IfImage(Path.GetExtension(imagePath))) //IfImage(decryptedAttachmentFileType)
										{
											//div_ = "<img src=\"" + imagePath + "\">";
											div_ = "<img src='" + imagePath + "'>";
											//div_ = "<img src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";
											//div_ = "<img a=\"" + ByteToImage(GetImgByte(imagePath)) + "\" src=\"" + ByteToImage(GetImgByte(imagePath)) + "\">";

											//div_ = "<img src=\"" + GetImgByte(imagePath) + "\">";
										}
										else
										{
											div_ = "<span>" + fileName + "</span>";
										}

										//div_ = "<img alt=\"" + Path.GetExtension(imagePath) + "\" src=\"" + imagePath + "\">";
										//div_ = "<img alt=\"" + row.MessageSentDate.ToString("yyyyMMddHHmm") + "\" src=\"" + imagePath + "\">";

										string classes2 = "";
										if (IfImage("." + decryptedAttachmentFileType))
										{
											classes2 = "picture";
										}
										else
										{
											classes2 = "file";
										}

										bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
											//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											//	"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
											//"</div>" +
											"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + " " + classes2 + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(event," + row.Id + ", '" + senderUserId + "', '" + receiverUserId + "')\">" +
												//"<span>" + fileName + "</span>" +
												div_ +
												"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
												messageReadStatusIcon +
											"</div>" +
										"</div>";
									}

									//bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
									//	"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//		"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
									//	"</div>" +
									//	"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this," + row.Id + ", '" + senderUserId + "', '" + receiverUserId + "')\">" +
									//		"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
									//		"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
									//		messageReadStatusIcon +
									//	"</div>" +
									//"</div>";
								}
							}

							messages += bubbles;
						}
                    }

                    messages += "</div>";
                }

                return Json(new { messages, arrayNotEmpty = true, textDiv, senderUserId });
            }
            else
            {
                return Json(new { div, arrayNotEmpty = false, textDiv, senderUserId });
			}
		}

		public bool IfVideo(string fileType)
		{
			string[] imageArray = { ".mp4", ".webm", ".ogg" };

			if (imageArray.Contains(fileType))
			{
				return true;
			}

			return false;
		}

		public bool IfImage(string fileType)
		{
			//string[] imageArray = { "png", "jpg", "jpeg", "gif", "bmp", "tiff", "tif" };
			string[] imageArray = { ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".tif" };

			if (imageArray.Contains(fileType))
			{
				return true;
			}

			//foreach (var image in imageArray)
			//{
			//	if (image == fileType)
			//	{
			//		return true;
			//	}
			//}

			return false;
		}

		public string BubbleSender(string senderColor, string spanSenderColor, string? message, string hour, int id, string senderUserId, string receiverUserId, string? attachmentName, string? attachmentFileType)
		{
			string messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";

			/**/
			//var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == senderUserId);
			//if (row != null)
			//{
			//	if (row.userChatColor != null)
			//	{
			//		senderColor = row.userChatColor;
			//	}
			//}
			/**/

			string bubble = "";
			if (attachmentName == null && attachmentFileType == null)
			{
				byte[] byteMessage = Convert.FromBase64String(message);
				string decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);

				bubble = "<div class=\"chatMessagesBubblesContainer sender\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
									//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//	"<span>" + hour + "</span>" +
									//"</div>" +
									"<div id=\"bubbleId_" + id + "\" class=\"bubble sender unread\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(event," + id + ", '" + senderUserId + "', '" + receiverUserId + "')\">" +
										"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
										"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
										messageReadStatusIcon +
									"</div>" +
								"</div>";
			}
			if (attachmentName != null && attachmentFileType != null) 
			{
				string base64Encrypted_AttachmentName = attachmentName.Replace('_', '/').Replace('-', '\\');
				string base64Encrypted_AttachmentFileType = attachmentFileType.Replace('_', '/').Replace('-', '\\');

				byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
				byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

				string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
				string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);


				string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;


				////return decryptedAttachmentName;


				////byte[] byteAttachmentName = Convert.FromBase64String(attachmentName);
				////byte[] byteAttachmentFileType = Convert.FromBase64String(attachmentFileType);

				////string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
				////string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

				//string div = "";
				//if (IfImage(decryptedAttachmentFileType))
				//{
				//	//div = "<img src=\"\" />";

				//	//string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;
				//	string fileName = decryptedAttachmentName + decryptedAttachmentFileType;

				//	div = "<span>" + fileName + "</span>";
				//}
				//else
				//{
				//	//string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;
				//	string fileName = decryptedAttachmentName + decryptedAttachmentFileType;

				//	div = "<span>" + fileName + "</span>";
				//}

				string classes = "";
				string backgroundColor = "";
				if (IfImage("." + decryptedAttachmentFileType))
				{
					classes = "bubble sender unread picture";
					backgroundColor = "transparent";
				}
				else
				{
					classes = "bubble sender unread file";
					backgroundColor = senderColor;
				}

				bubble = "<div class=\"chatMessagesBubblesContainer sender\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
									//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
									//	"<span>" + hour + "</span>" +
									//"</div>" +
									"<div id=\"bubbleId_" + id + "\" class=\"" + classes + "\" style=\"background-color:" + backgroundColor + "\" onclick=\"bubbleClick(event," + id + ", '" + senderUserId + "', '" + receiverUserId + "')\">" +
										//"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
										//div +
										fileName +
										"<div class=\"tail\" style=\"border-top-color:" + backgroundColor + ";\"></div>" +
										messageReadStatusIcon +
									"</div>" +
								"</div>";
			}			

			return bubble;
		}

		public string BubbleReceiver(string senderColor, string spanSenderColor, string? message, string hour, int id, string? attachmentName, string? attachmentFileType)
		{
			/**/
			//var row = _context.ChatSettings.FirstOrDefault(x => x.UserId == GetUserId());
			//if (row != null)
			//{
			//	if (row.userChatColor != null)
			//	{
			//		senderColor = row.userChatColor;
			//	}
			//}
			/**/

			string bubble = "";
			if (attachmentName == null && attachmentFileType == null)
			{
				byte[] byteMessage = Convert.FromBase64String(message);
				string decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);

				//string date = _context.Chat.FirstOrDefault(x => x.Id == id).MessageSentDate.ToString("dd.MM.yyyy");
				string? date = _context.Chat.FirstOrDefault(x => x.Id == id)?.MessageSentDate.ToString("dd.MM.yyyy");

				bubble = "<div class=\"chatMessagesBubblesContainer receiver\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
										"<div id=\"bubbleId_" + id + "\" class=\"bubble receiver unread\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClickReceiver(event, `" + date + "`, `" + hour + "`)\">" +
											"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
										"</div>" +
										//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
										//	"<span>" + hour + "</span>" +
										//"</div>" +
									"</div>";
			}
			if (attachmentName != null && attachmentFileType != null)
			{
				string base64Encrypted_AttachmentName = attachmentName.Replace('_', '/').Replace('-', '\\');
				string base64Encrypted_AttachmentFileType = attachmentFileType.Replace('_', '/').Replace('-', '\\');

				byte[] byteAttachmentName = Convert.FromBase64String(base64Encrypted_AttachmentName);
				byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);

				string decryptedAttachmentName = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentName);
				string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);


				string fileName = decryptedAttachmentName + "." + decryptedAttachmentFileType;

				string classes = "";
				string backgroundColor = "";
				if (IfImage("." + decryptedAttachmentFileType))
				{
					classes = "bubble receiver unread picture";
					backgroundColor = "transparent";
				}
				else
				{
					classes = "bubble receiver unread file";
					backgroundColor = senderColor;
				}

				//string date = _context.Chat.FirstOrDefault(x => x.Id == id).MessageSentDate.ToString("dd.MM.yyyy");
				string? date = _context.Chat.FirstOrDefault(x => x.Id == id)?.MessageSentDate.ToString("dd.MM.yyyy");

				bubble = "<div class=\"chatMessagesBubblesContainer receiver\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
										"<div id=\"bubbleId_" + id + "\" class=\"" + classes + "\" style=\"background-color:" + backgroundColor + "\" onclick=\"bubbleClickReceiver(event, `" + date + "`, `" + hour + "`)\">" +
											"<span>" + fileName + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + backgroundColor + ";\"></div>" +
										"</div>" +
										//"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
										//	"<span>" + hour + "</span>" +
										//"</div>" +
									"</div>";
			}

			//byte[] byteMessage = Convert.FromBase64String(message);
			//string decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);

			//string bubble = "<div class=\"chatMessagesBubblesContainer receiver\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
			//						"<div id=\"bubbleId_" + id + "\" class=\"bubble receiver unread\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
			//							"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
			//							"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
			//						"</div>" +
			//						"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
			//							"<span>" + hour + "</span>" +
			//						"</div>" +
			//					"</div>";

			return bubble;
		}

		public async Task<Tuple<string, bool, List<int>>> Bubble(string loggedInUser, string sender, string receiver, string? message, DateTime date, string? attachmentName, bool ifMessageRead, bool ifDeleted, string? attachmentFileType)
		{
			bool handler = false;

			var senderColor = _context.UserIdentity.First(x => x.UserId == sender).UserColor;
			/**/
			var chatSettings = _context.ChatSettings.FirstOrDefault(x => x.UserId == sender);
			if (chatSettings != null)
			{
				if (chatSettings.userChatColor != null)
				{
					senderColor = chatSettings.userChatColor;
				}
			}
			/**/
			string spanSenderColor = SpanColor(senderColor);

			//
			//string? messageEncrypted = null;
			//if (message != null)
			//{
			//	messageEncrypted = Data.Encryption.EncryptionHelper.Encrypt(message);
			//}

			//string? attachmentNameEncrypted = null;
			//if (attachmentName != null)
			//{
			//	attachmentNameEncrypted = Data.Encryption.EncryptionFiles.Encrypt(attachmentName);
			//}

			//string? attachmentFileTypeEncrypted = null;
			//if (attachmentFileType != null)
			//{
			//	attachmentFileTypeEncrypted = Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType);
			//}
			//

			string bubble = "";
			if (loggedInUser == sender)
			{
				string? text_ = "";
				string date_ = "";
				int id = 0;

				if (!handler)
				{
					string? messageEncrypted1 = null;
					if (message != null)
					{
						messageEncrypted1 = Data.Encryption.EncryptionHelper.Encrypt(message);
					}

					string? attachmentNameEncrypted1 = null;
					if (attachmentName != null)
					{
						attachmentNameEncrypted1 = Data.Encryption.EncryptionFiles.Encrypt(attachmentName);
					}

					string? attachmentFileTypeEncrypted1 = null;
					if (attachmentFileType != null)
					{
						attachmentFileTypeEncrypted1 = Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType);
					}

					var newData = new Chat()
					{
						SenderUserId = sender,
						ReceiverUserId = receiver,
						MessageText = messageEncrypted1,
						MessageSentDate = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second),
						//AttachmentName = attachmentName,
						AttachmentName = attachmentNameEncrypted1,
						//AttachmentFileType = attachmentFileType,
						AttachmentFileType = attachmentFileTypeEncrypted1,
						IfMessageRead = ifMessageRead,
						IfDeleted = ifDeleted
					};

					_context.Chat.Add(newData);
					await _context.SaveChangesAsync();

					text_ = newData.MessageText;
					date_ = newData.MessageSentDate.ToString("HH:mm");
					id = newData.Id;

					handler = true;
				}


				string? attachmentNameEncrypted2 = null;
				if (attachmentName != null)
				{
					attachmentNameEncrypted2 = Data.Encryption.EncryptionFiles.Encrypt(attachmentName);
				}

				string? attachmentFileTypeEncrypted2 = null;
				if (attachmentFileType != null)
				{
					attachmentFileTypeEncrypted2 = Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType);
				}

				//bubble = BubbleSender(senderColor, spanSenderColor, text_, date_, id, sender, receiver, attachmentName, attachmentFileType);
				//bubble = BubbleSender(senderColor, spanSenderColor, text_, date_, id, sender, receiver, Data.Encryption.EncryptionFiles.Encrypt(attachmentName), Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType));
				bubble = BubbleSender(senderColor, spanSenderColor, text_, date_, id, sender, receiver, attachmentNameEncrypted2, attachmentFileTypeEncrypted2);
			}
			if (loggedInUser == receiver)
			{
				//if (message != null)
				//{
				//	bubble = BubbleReceiver(senderColor, spanSenderColor, Data.Encryption.EncryptionHelper.Encrypt(message), date.ToString("HH:mm"), 0, Data.Encryption.EncryptionFiles.Encrypt(attachmentName), Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType));
				//}

				//bubble = BubbleReceiver(senderColor, spanSenderColor, Data.Encryption.EncryptionHelper.Encrypt(message), date.ToString("HH:mm"), 0, attachmentName, attachmentFileType);

				string? messageEncrypted3 = null;
				if (message != null)
				{
					messageEncrypted3 = Data.Encryption.EncryptionHelper.Encrypt(message);
				}

				string? attachmentNameEncrypted3 = null;
				if (attachmentName != null)
				{
					attachmentNameEncrypted3 = Data.Encryption.EncryptionFiles.Encrypt(attachmentName);
				}

				string? attachmentFileTypeEncrypted3 = null;
				if (attachmentFileType != null)
				{
					attachmentFileTypeEncrypted3 = Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType);
				}

				//bubble = BubbleReceiver(senderColor, spanSenderColor, messageEncrypted, date.ToString("HH:mm"), 0, attachmentName, attachmentFileType);
				bubble = BubbleReceiver(senderColor, spanSenderColor, messageEncrypted3, date.ToString("HH:mm"), 0, attachmentNameEncrypted3, attachmentFileTypeEncrypted3);
			}

			string? messageEncrypted = null;
			if (message != null)
			{
				messageEncrypted = Data.Encryption.EncryptionHelper.Encrypt(message);
			}

			string? attachmentNameEncrypted = null;
			if (attachmentName != null)
			{
				attachmentNameEncrypted = Data.Encryption.EncryptionFiles.Encrypt(attachmentName);
			}

			string? attachmentFileTypeEncrypted = null;
			if (attachmentFileType != null)
			{
				attachmentFileTypeEncrypted = Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType);
			}

			//
			//var duplicates = CheckForDuplicates(sender, receiver, Data.Encryption.EncryptionHelper.Encrypt(message), new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second), attachmentName, attachmentFileType);
			//var duplicates = CheckForDuplicates(sender, receiver, Data.Encryption.EncryptionHelper.Encrypt(message), new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second), Data.Encryption.EncryptionFiles.Encrypt(attachmentName), Data.Encryption.EncryptionFiles.Encrypt(attachmentFileType));
			var duplicates = CheckForDuplicates(sender, receiver, messageEncrypted, new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second), attachmentNameEncrypted, attachmentFileTypeEncrypted);

			bool areThereAnyDuplicates = false;
			if (duplicates.Count > 1)
			{
				areThereAnyDuplicates = true;

				return new Tuple<string, bool, List<int>>(bubble, areThereAnyDuplicates, duplicates);
			}
			//

			//return bubble;
			return new Tuple<string, bool, List<int>>(bubble, areThereAnyDuplicates, duplicates);
		}

		[HttpPost]
		public async Task<ActionResult> AddToChat_(string sender, string receiver, string message)
		{
			var culture = new CultureInfo("pl-PL");

			//dzisiejsza data
			var date = DateTime.Now;

			var chatArray = _context.Chat.Where(x => x.SenderUserId == sender && x.ReceiverUserId == receiver || x.SenderUserId == receiver && x.ReceiverUserId == sender);
			if (chatArray.Any())
			{
				List<Chat> chats = new List<Chat>();
				foreach (var row in chatArray)
				{
					if (row.MessageSentDate.ToShortDateString() == date.ToShortDateString())
					{
						chats.Add(row);
					}
				}

				if (chats.Any())
				{
					//data dzisiejsza już istnieje
					Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, message, date, null, false, false, null);

					return Json(new { dateCheck = true, bubble = bubble.Item1, anyDuplicates = bubble.Item2, firstConversation = false, today = date.ToShortDateString(), receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });
				}
				else
				{
					//data dzisiejsza nie istnieje
					Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, message, date, null, false, false, null);

					string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
						   "<div class=\"chatDateStamp\" onclick=\"bubblesAccordion(this)\">" +
								"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
							"</div>" +
							bubble.Item1 +
							"</div>";

					return Json(new { dateCheck = false, firstConversation = false, messages, anyDuplicates = bubble.Item2, receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });
				}
			}
			else
			{
				//nie istnieje w bazie (użytkownicy nie czatowali)
				Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, message, date, null, false, false, null);

				string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
						   "<div class=\"chatDateStamp\" onclick=\"bubblesAccordion(this)\">" +
								"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
							"</div>" +
							bubble.Item1 +
							"</div>";

				return Json(new { dateCheck = false, firstConversation = true, messages, anyDuplicates = bubble.Item2, receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });				
			}
		}

		public List<int> CheckForDuplicates(string sender, string receiver, string? message, DateTime date, string? attachmentName, string? attachmentFileType)
		{
			var duplicates = _context.Chat
			.Where(g => g.SenderUserId == sender && g.ReceiverUserId == receiver && g.MessageText == message && g.MessageSentDate == date && g.AttachmentName == attachmentName && g.AttachmentFileType == attachmentFileType)
			.Select(x => x.Id)
			.ToList();

			return duplicates;
		}

		[HttpPost]
		public async Task<ActionResult> Rem(List<int> array)
		{
			try
			{
				if (array.Count > 1)
				{
					array.RemoveAt(0);
					foreach (var id in array)
					{
						var row = _context.Chat.FirstOrDefault(x => x.Id == id);
						if (row != null)
						{
							_context.Chat.Remove(row);
							await _context.SaveChangesAsync();
						}
					}

					return Json(true);
				}
			}
			catch (Exception ex)
			{
				//return Json(ex);
			}

			return Json(false);
		}

		[HttpGet]
		public ActionResult DeleteButton(int id, string sender, string receiver)
		{
			
			string openButton = "";
			string dateSpan = "";
			var chat = _context.Chat.FirstOrDefault(x => x.Id == id);
			if (chat != null)
			{
				if (chat.MessageText != null) // || chat.AttachmentFileType != null
				{
					byte[] byteMessage = Convert.FromBase64String(chat.MessageText);
					string decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);

					//string base64Encrypted_AttachmentFileType = chat.AttachmentFileType.Replace('_', '/').Replace('-', '\\');
					//byte[] byteAttachmentFileType = Convert.FromBase64String(base64Encrypted_AttachmentFileType);
					//string decryptedAttachmentFileType = Data.Encryption.EncryptionFiles.Decrypt(byteAttachmentFileType);

					if (IfImage("." + decryptedMessage.Split(".").Last()) || IfVideo("." + decryptedMessage.Split(".").Last())) // || IfImage("." + decryptedAttachmentFileType)
					{
						//openButton = "<div title=\"Otwórz\" class=\"bubbleSettings\" onclick=\"openImage('" + chat.MessageText + "')\">" +
						//		"<ion-icon name=\"open-outline\"></ion-icon>" +
						//	"</div>";

						openButton = "<div title=\"Otwórz\" class=\"chatMessageOptionsOption\" onclick=\"openImage('" + chat.MessageText + "')\">" +
								"<ion-icon name=\"open-outline\"></ion-icon>" +
								"<span>Otwórz</span>" +
							"</div>";
					}

					dateSpan = "<div class=\"chatMessageOptionsOption chatMessageOptionsOptionSpan\">" +
							"<ion-icon name=\"information-circle-outline\"></ion-icon>" +
							"<div>" +
								"<span>" + chat.MessageSentDate.ToString("dd.MM.yyyy") + "</span>" +
								"<span>" + chat.MessageSentDate.ToString("HH:mm") + "</span>" +
							"</div>" +
						"</div>";
				}
			}

			/*
			string button = "<div class=\"bubbleSettingsParent\">" + openButton +
					"<div title=\"Usuń wiadomość\" class=\"bubbleSettings\" onclick=\"removeMessage(" + id + ", '" + sender + "', '" + receiver + "')\">" +
						"<ion-icon name=\"trash-outline\"></ion-icon>" +
					"</div>" +
				"</div>";

			return Content(button);
			*/

			string deleteButton = "<div title=\"Usuń\" class=\"chatMessageOptionsOption\" onclick=\"removeMessage(" + id + ", '" + sender + "', '" + receiver + "')\">" +
								"<ion-icon name=\"trash-outline\"></ion-icon>" +
								"<span style=\"color: orangered;\">Usuń</span>" +
							"</div>";

			string optionsDiv = "<div style=\"display: none;\" class=\"chatMessageOptions\" id=\"chatMessageOptionsId\">" +
					dateSpan +
					openButton +
					//"<div style=\"width: 100%; height: 1px; background-color: rgba(255, 255, 255, 0.2);\"></div>" +
					deleteButton +
				"</div>";



			return Content(optionsDiv);
		}

		[HttpGet]
		public ActionResult Info(string date, string hours)
		{
			string dateSpan = "<div class=\"chatMessageOptionsOption chatMessageOptionsOptionSpan\">" +
							"<ion-icon name=\"information-circle-outline\"></ion-icon>" +
							"<div>" +
								"<span>" + date + "</span>" +
								"<span>" + hours + "</span>" +
							"</div>" +
						"</div>";

			string infoDiv = "<div style=\"display: none;\" class=\"chatMessageOptions\" id=\"chatMessageOptionsId\">" +
					dateSpan +
				"</div>";

			return Content(infoDiv);
		}

		[HttpGet]
		public ActionResult OpenLink(string message)
		{
			string encryptedMessage = message;

			byte[] byteMessage = Convert.FromBase64String(encryptedMessage);
			string decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);

			return Json(decryptedMessage);
		}

		[HttpPost]
		public async Task<ActionResult> RemoveMessage(int id, string sender, string receiver)
		{
			var row = _context.Chat.FirstOrDefault(e => e.Id == id);
			if (row != null)
			{
				row.MessageText = null;
				row.IfDeleted = true;
				await _context.SaveChangesAsync();

				string messageRemovedDiv = "";
				if (GetUserId() == sender)
				{
					messageRemovedDiv = "<div class=\"bubble deleted sender\">" +
							"<span>Wiadomość usunięta</span>" +
							"<div class=\"tail\"></div>" +
						"</div>";
				}
				if (GetUserId() == receiver)
				{
					messageRemovedDiv = "<div class=\"bubble deleted receiver\">" +
							"<span>Wiadomość usunięta</span>" +
							"<div class=\"tail\"></div>" +
						"</div>";
				}

				return Json(new { success = true, messageRemovedDiv });
			}

			return Json(false);
		}

		[HttpGet]
		public ActionResult NotifyReceiverWhenChatIsOpen(string receiverId, int? savedDepartment)
		{
			var loggedUser = GetUserId();
			if (loggedUser == receiverId)
			{
				var userWorkerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == receiverId)?.WorkerId;
				var userDepartmentId = _context.Workers2.FirstOrDefault(x => x.Id == userWorkerId)?.DepartmentID;
				
				int? department = null;
				if (savedDepartment != null)
				{
					department = savedDepartment;
				}
				else
				{
					department = userDepartmentId;
				}

				var workersForFilterButton = _context.Workers2.Where(x => x.DepartmentID != department);
				var users = _context.UserIdentity.Where(user => workersForFilterButton.Any(worker => worker.Id == user.WorkerId));
				var chat = _context.Chat.Where(message => users.Any(user => message.SenderUserId == user.UserId && message.IfMessageRead == false) && message.ReceiverUserId == receiverId);
				int filterUnreadMessagesCounter = chat.Count();

				string filterUnreadMessagesCounterDiv = "";
				if (filterUnreadMessagesCounter > 9)
				{
					filterUnreadMessagesCounterDiv = "<div class=\"unreadMessagesFilter\"><span>" + "9+" + "</span></div>";
				}
				else
				{
					filterUnreadMessagesCounterDiv = "<div class=\"unreadMessagesFilter\"><span>" + filterUnreadMessagesCounter + "</span></div>";
				}

				var workersForChosenDepartment = _context.Workers2.Where(x => x.DepartmentID == department);
				var users_ = _context.UserIdentity.Where(user => workersForChosenDepartment.Any(worker => worker.Id == user.WorkerId));
				var chat_ = _context.Chat.Where(message => users_.Any(user => message.SenderUserId == user.UserId && message.IfMessageRead == false) && message.ReceiverUserId == receiverId);

				var senderCounts = chat_
					.GroupBy(x => x.SenderUserId)
					.Select(y => new { SenderId = y.Key, Count = y.Count() }).ToArray();

				List<Tuple<string, string>> array = new List<Tuple<string, string>>();
				foreach (var row in senderCounts)
				{
					if (row.Count > 9)
					{
						array.Add(new Tuple<string, string>(row.SenderId, "<div class=\"chatUserUnreadMessageCount\"><span>" + "9+" + "</span></div>"));
					}
					else
					{
						array.Add(new Tuple<string, string>(row.SenderId, "<div class=\"chatUserUnreadMessageCount\"><span>" + row.Count + "</span></div>"));
					}
				}

				return Json(new { filterUnreadMessagesCounter = Content(filterUnreadMessagesCounterDiv), count = filterUnreadMessagesCounter, receiverId, array });
			}

			return Json(false);
		}

		[HttpGet]
		public  ActionResult NotifyReceiver(string receiverId)
		{
			var loggedUser = GetUserId();
			if (loggedUser == receiverId)
			{
				var rows = _context.Chat.Where(x => x.ReceiverUserId == receiverId);
				if (rows != null)
				{
					List<Chat> messages = new List<Chat>();

					foreach (var row in rows)
					{
						if (row.IfMessageRead == false)
						{
							messages.Add(row);
						}
					}

					if (messages.Count > 0)
					{
						string chatMinimizedUnreadMessagesCount = "";
						if (messages.Count > 9)
						{
							chatMinimizedUnreadMessagesCount = "<ion-icon name=\"chatbubbles\"></ion-icon>" +
							"<div class=\"chatMinimizedNewMessages\" title=\"Nieprzeczytane wiadomości\">" +
								"<span>" + "9+" + "</span>" +
							"</div>";
						}
						else
						{
							chatMinimizedUnreadMessagesCount = "<ion-icon name=\"chatbubbles\"></ion-icon>" +
							"<div class=\"chatMinimizedNewMessages\" title=\"Nieprzeczytane wiadomości\">" +
								"<span>" + messages.Count + "</span>" +
							"</div>";
						}

						return Json(new { messages, contentResult = Content(chatMinimizedUnreadMessagesCount) });
					}
				}
			}

			return Json(false);
		}

		[HttpGet]
		public string GetCurrentlyLoggedUserId()
		{
			var loggedUser = GetUserId();

			return loggedUser;
		}

		[HttpPost]
		public async Task<ActionResult> UpdateIfMessageRead(List<int> arrayOfMessageIds)
		{
			string senderId = "";
			string receiverId = "";
			var array = _context.Chat.Where(x => arrayOfMessageIds.Any(y => y == x.Id) && x.IfMessageRead == false);
			foreach (var item in array)
			{
				senderId = item.SenderUserId;
				receiverId = item.ReceiverUserId;
				item.IfMessageRead = true;
			}
			await _context.SaveChangesAsync();

			return Json(new { success = true, array = arrayOfMessageIds, senderId, receiverId  });
		}

		[HttpGet]
		public ActionResult CheckIfMessageWasRead(int id)
		{
			var row = _context.Chat.FirstOrDefault(x => x.Id == id);
			if (row != null)
			{
				if (row.IfMessageRead)
				{
					return Json(true);
				}
			}

			return Json(false);
		}

		[HttpGet]
		public ActionResult GetSender(string id)
		{
			string[] loggedInUsers = _userTrackerService.GetLoggedInUsersArray();

			if (id != null)
			{
				int? workerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == id)?.WorkerId;
				string? name = _context.Workers2.FirstOrDefault(x => x.Id == workerId)?.Name + " " + _context.Workers2.FirstOrDefault(x => x.Id == workerId)?.Surname;

				if (loggedInUsers.Contains(id))
				{
					return Json(new { name, logged = true });
				}
				else
				{
					return Json(new { name, logged = false });
				}
			}

			return Json(false);
		}

		[HttpGet]
		public ActionResult AttachForm(string receiver)
		{
			string sender = GetUserId();

			string div = "<div class=\"chatAttach\" style=\"display: none;\">" +
					"<div class=\"chatAttachheader\">" +
						"<span>Wyślij plik</span>" +
						"<div class=\"chatAttachClose\" onclick=\"closeAttachForm()\">" +
							"<ion-icon name=\"close-outline\"></ion-icon>" +
						"</div>" +
					"</div>" +
					"<div class=\"chatAttachDrop\">" +
						"<div class=\"chatAttachDropText\">" +
							"<ion-icon name=\"download-outline\"></ion-icon>" +
							"<span>...kliknij, lub przeciągnij i upuść plik...<br />(Maks. 5 MB)</span>" +
						"</div>" +
						"<input type=\"file\" onchange=\"fileAttach(event, '" + sender + "', '" + receiver + "')\" />" +
					"</div>" +
				"</div>";

			return Json(div);
		}

		[HttpPost]
		public ActionResult AttachSendButton() //string sender, string receiver
        {
			string button = "<div class=\"chatAttachDrop\" id=\"sendButtonAttach\">" +
						"<div class=\"sendAttachButton\" title=\"Wyślij\" id=\"sendAttach\">" + //onclick=\"sendAttach()\"
						"<ion-icon name=\"arrow-up-outline\"></ion-icon>" +
					"</div>" +
				"</div>";

			return Json(new { button });
		}

		[HttpGet]
		public async Task<ActionResult> DownloadFile()
		{
			return Json(false);
		}

		[HttpPost]
		public async Task<ActionResult> UploadFile(IFormFile file) //Task<IActionResult> UploadFile(IFormFile file) //string sender, string receiver, string fileName_
		{
			try
			{
				if (file == null || file.Length == 0)
				{
					return BadRequest("No file was uploaded.");
				}

				var date = DateTime.Now;
				var date_ = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second);

				string additionalDataJson = Request.Headers["X-Additional-Data"];
				var additionalData = JsonConvert.DeserializeObject<Dictionary<string, object>>(additionalDataJson);

				string sender = additionalData["senderId"].ToString();
				string receiver = additionalData["receiverId"].ToString();

				// See if there is receiver and date folder
				//var receiverFolderPath = "C:/Users/Kromolski/FTP/chat/" + receiver + "/" + date.ToString("yyyyMMddHHmm");





				//

				//string Folder = HttpContext.Current.Server.MapPath(Path);
				//string Path = Path.Combine(Folder, file.FileName);

				//string sharedFolderPath = Path.Combine(_environment.WebRootPath, "~/Uploads/");
				//var receiverFolderPath = Path.Combine(sharedFolderPath, "/chat/" + receiver + "/" + date.ToString("yyyyMMddHHmm"));

				//ServerSavePath = Path.Combine(Server.MapPath("~/upload/") + InputFileName);
				//file.SaveAs(ServerSavePath);



				//



				//

				// Get the physical path of the Uploads folder
				string uploadsFolderPath = Path.Combine(_environment.WebRootPath, "Uploads");

				// Create "chat" folder inside "Uploads"
				string chatFolderPath = Path.Combine(uploadsFolderPath, "chat");

				// Ensure the "chat" folder exists
				if (!Directory.Exists(chatFolderPath))
				{
					Directory.CreateDirectory(chatFolderPath);
				}

				// Create "receiver" folder inside "chat"
				string receiverFolder = Path.Combine(chatFolderPath, receiver);

				// Ensure the "receiver" folder exists
				if (!Directory.Exists(receiverFolder))
				{
					Directory.CreateDirectory(receiverFolder);
				}

				// Create a date-based folder with the format yyyyMMddHHmm inside "chat"
				//string dateFolderName = date.ToString("yyyyMMddHHmm");
				string dateFolderName = date.ToString("yyyyMMddHHmmss");
				string dateFolderPath = Path.Combine(receiverFolder, dateFolderName);

				// Ensure the date folder exists
				if (!Directory.Exists(dateFolderPath))
				{
					Directory.CreateDirectory(dateFolderPath);
				}

				string receiverFolderPath = dateFolderPath;

				//





				//if (!Directory.Exists(receiverFolderPath))
				//{
				//	Directory.CreateDirectory(receiverFolderPath);
				//}

				string originalExtension = Path.GetExtension(file.FileName);
				string newFileName = Data.Encryption.EncryptionFiles.Encrypt(Path.GetFileNameWithoutExtension(file.FileName)) + originalExtension;

				string filePath = Path.Combine(receiverFolderPath, newFileName);

				using (var stream = System.IO.File.Create(filePath))
				{
					await file.CopyToAsync(stream);
				}


				return Json(receiverFolderPath);

			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}


			//if (fileName_ != null && fileName_.Length > 0) //file != null && file.Length > 0
			//{
			//	try
			//	{
			//		var date = DateTime.Now;
			//		var date_ = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second);

			//		//string additionalDataJson = Request.Headers["X-Additional-Data"];
			//		//var additionalData = JsonConvert.DeserializeObject<Dictionary<string, object>>(additionalDataJson);

			//		//string sender = additionalData["senderId"].ToString();
			//		//string receiver = additionalData["receiverId"].ToString();

			//		//string originalExtension = Path.GetExtension(file.FileName);
			//		//string originalExtension = fileName_.Split(".")[1];

			//		//string newFileName = Data.Encryption.EncryptionFiles.Encrypt(Path.GetFileNameWithoutExtension(file.FileName));
			//		//string newFileName = Data.Encryption.EncryptionFiles.Encrypt(fileName_.Split(".")[0]);
			//		//string newFileName = fileName_;
			//		//string newFileName = Data.Encryption.EncryptionFiles.Encrypt(fileName_.Split(".")[0]) + "." + originalExtension;

			//		//string fileName = newFileName;
			//		string fileName = fileName_;

			//                 //var localFilePath = Path.Combine(Path.GetTempPath(), fileName).Replace("/", "\\");
			//                 //var localFilePath = Path.Combine(Path.GetTempPath(), fileName);

			//		//var localZipPath = Path.ChangeExtension(fileName, ".zip");

			//		// Save the uploaded file temporarily
			//		//using (var stream = new FileStream(localFilePath, FileMode.Create))
			//		//{
			//		//	await file.CopyToAsync(stream);
			//		//}

			//		//using (var stream = new FileStream(localFilePath, FileMode.Create))
			//		//{
			//		//	var formFile = new FormFile(stream, 0, stream.Length, null, Path.GetFileName(stream.Name));

			//		//	if (formFile != null)
			//		//	{
			//		//		await formFile.CopyToAsync(stream);
			//		//	}
			//		//}

			//		string wwwPath = _environment.WebRootPath;
			//		string contentPath = _environment.ContentRootPath;







			//		// Zip the file with AES encryption
			//		//using (var fsOut = System.IO.File.Create(localZipPath))
			//		//using (var zipOutputStream = new ZipOutputStream(fsOut))
			//		//{
			//		//	zipOutputStream.SetLevel(9); // 0-9, 9 being the highest compression
			//		//								 //zipOutputStream.Password = Data.Encryption.EncryptionFiles.Encrypt(fileName);
			//		//								 //zipOutputStream.Password = "12345";
			//		//	zipOutputStream.Password = Data.Encryption.EncryptionFiles.Encrypt(Data.Encryption.EncryptionFiles.Encrypt(originalExtension));

			//		//	var zipEntry = new ZipEntry(fileName);
			//		//	zipEntry.AESKeySize = 256; // Use AES-256 encryption
			//		//	zipOutputStream.PutNextEntry(zipEntry);

			//		//	using (var fsInput = System.IO.File.OpenRead(localFilePath))
			//		//	{
			//		//		StreamUtils.Copy(fsInput, zipOutputStream, new byte[4096]);
			//		//	}
			//		//	zipOutputStream.CloseEntry();
			//		//}

			//		// See if there is receiver folder
			//		var receiverFolderPath = "C:/Users/Kromolski/FTP/chat/" + receiver;
			//		if (!Directory.Exists(receiverFolderPath))
			//		{
			//			Directory.CreateDirectory(receiverFolderPath);
			//		}

			//		// See if there is a date folder within receiver folder
			//		var dateFolder = receiverFolderPath + "/" + date.ToString("yyyyMMddHHmm");
			//                 if (!Directory.Exists(dateFolder))
			//		{
			//			Directory.CreateDirectory(dateFolder);
			//		}

			//                 //Define your remote file path
			//                 //var remoteFilePath = "/chat/" + receiver + "/" + date.ToString("yyyyMMddHHmm") + "/" + localZipPath.Split("\\").LastOrDefault();
			//                 var remoteFilePath = "/chat/" + receiver + "/" + date.ToString("yyyyMMddHHmm") + "/" + localFilePath.Split("\\").LastOrDefault();

			//		// Call your UploadFileAsync method
			//		//await _ftpService.UploadFileAsync(localZipPath, remoteFilePath);
			//		await _ftpService.UploadFileAsync(localFilePath, remoteFilePath);

			//		// Clean up the temporary files
			//		System.IO.File.Delete(localFilePath);
			//		//System.IO.File.Delete(localZipPath);
			//		System.IO.File.Delete(localFilePath);

			//		//string attachmentFileType = Data.Encryption.EncryptionFiles.Encrypt(originalExtension);

			//		//// After uploading file, save relevant data into database
			//		//SaveFileNameToDatabase(sender, receiver, fileName, date_, attachmentFileType);

			//		//if (SaveFileNameToDatabase(sender, receiver, fileName, date_, attachmentFileType))
			//		//{
			//		//	// Call your UploadFileAsync method
			//		//	await _ftpService.UploadFileAsync(localZipPath, remoteFilePath);

			//		//	// Clean up the temporary files
			//		//	System.IO.File.Delete(localFilePath);
			//		//	System.IO.File.Delete(localZipPath);

			//		//	return Json(new { success = true, senderId = sender, receiverId = receiver, loggedUser = GetUserId() });
			//		//}

			//		return Json(new { success = true, message = "File uploaded successfully" });
			//	}
			//	catch (Exception ex)
			//	{
			//		return StatusCode(500, $"Internal server error: {ex.Message}");
			//	}
			//}

			//return Json(new { success = false, message = "No file was uploaded" });
			return Json(new { success = false });
		}

		[HttpPost]
		public async Task<ActionResult> AddAttachmentToChat(string sender, string receiver, string fileName_)
		{
			var culture = new CultureInfo("pl-PL");

			var date = DateTime.Now;

			var chatArray = _context.Chat.Where(x => x.SenderUserId == sender && x.ReceiverUserId == receiver || x.SenderUserId == receiver && x.ReceiverUserId == sender);
			if (chatArray.Any())
			{
				List<Chat> chats = new List<Chat>();
				foreach (var row in chatArray)
				{
					if (row.MessageSentDate.ToShortDateString() == date.ToShortDateString())
					{
						chats.Add(row);
					}
				}

				if (chats.Any())
				{
					//data dzisiejsza już istnieje
					Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, null, date, fileName_.Split(".")[0], false, false, fileName_.Split(".")[1]);

					return Json(new { dateCheck = true, bubble = bubble.Item1, anyDuplicates = bubble.Item2, firstConversation = false, today = date.ToShortDateString(), receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });
				}
				else
				{
					//data dzisiejsza nie istnieje
					Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, null, date, fileName_.Split(".")[0], false, false, fileName_.Split(".")[1]);

					string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
						   "<div class=\"chatDateStamp\" onclick=\"bubblesAccordion(this)\">" +
								"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
							"</div>" +
							bubble.Item1 +
							"</div>";

					return Json(new { dateCheck = false, firstConversation = false, messages, anyDuplicates = bubble.Item2, receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });
				}
			}
			else
			{
				//nie istnieje w bazie (użytkownicy nie czatowali)
				Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, null, date, fileName_.Split(".")[0], false, false, fileName_.Split(".")[1]);

				string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
						   "<div class=\"chatDateStamp\" onclick=\"bubblesAccordion(this)\">" +
								"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
							"</div>" +
							bubble.Item1 +
							"</div>";

				return Json(new { dateCheck = false, firstConversation = true, messages, anyDuplicates = bubble.Item2, receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });
			}
		}

		private bool SaveFileNameToDatabase(string sender, string receiver, string attachmentName, DateTime date, string attachmentFileType)
		{
			try
			{
                var newData = new Chat()
                {
                    SenderUserId = sender,
                    ReceiverUserId = receiver,
                    MessageText = null,
                    MessageSentDate = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second),
                    AttachmentName = attachmentName,
					AttachmentFileType = attachmentFileType,
                    IfMessageRead = false,
                    IfDeleted = false
                };

				_context.Chat.Add(newData);
				_context.SaveChanges();

				return true;
            }
			catch(Exception ex)
			{
                StatusCode(500, $"Internal server error: {ex.Message}");
            }

			return false;
        }

		






	}
}

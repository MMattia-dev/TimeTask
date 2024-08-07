﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Runtime.Intrinsics.Arm;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using NuGet.Protocol.Plugins;
using TimeTask.Data;
using TimeTask.Models;
using static System.Net.Mime.MediaTypeNames;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

				workers = _context.Workers2.Where(x => x.DepartmentID == userDepartmentId).ToList();
			}
			else
			{
				workers = _context.Workers2.Where(x => x.DepartmentID == savedDepartment).ToList();
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
				var worker = _context.Workers2.OrderBy(x => x.Surname).FirstOrDefault(x => x.Id == user.WorkerId);
				if (worker != null)
				{
					var userName = worker.Name;
					var userSurname = worker.Surname;

					if (user.UserId != GetUserId())
					{
						string span = "<span style=\"color: " + SpanColor(user.UserColor) + ";\">" + userName.FirstOrDefault().ToString() + userSurname.FirstOrDefault().ToString() + "</span>";

						div += "<div class=\"chatUser\" title=\"Wybierz\" onclick=\"ltmkkPVQpNisKCP(this, '" + user.UserId + "')\">" +
									"<div class=\"avatar\" style=\"background-color:" + user.UserColor + ";\">" +
										span +
									"</div>" +
									"<span> " + userName + " </span>" +
									"<div class=\"chatUserUnreadMessageCountParent\">" +
										//"<div class=\"chatUserUnreadMessageCount\">" +
										//	"<span>1</span>" +
										//"</div>" +
									"</div>" +
									"<div class=\"chatUserStatus online\" title=\"online\"></div>" + //detect if user is online or not
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

        [HttpGet]
        public ActionResult ShowChat(int? savedDepartment)
        {
			string chat = "<div class=\"chat\" id=\"chat\">" +
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
										//"<a class=\"chatMinimize\" onclick=\"\" title=\"Ustawienia\">" +
										//                                  "<ion-icon name=\"settings-sharp\"></ion-icon>" +
										//                              "</a>" +
										//"<a class=\"chatMinimize\" onclick=\"\" title=\"Zmień kolor wiadomości\">" +
										//                                  "<div class=\"chatColor\" style=\"background-color: @color;\"></div>" +
										//                              "</a>" +
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



            return Content(chat);
            //return Json(new { chat = Content(chat), chatMinimized = Content(chatMinimized) });
        }

		[HttpGet]
		public async Task<ActionResult> ShowChatMessages_Refresh(string sender, string receiver)
		{
			var culture = new CultureInfo("pl-PL");

			string? senderColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == sender)?.UserColor;
			string spanSenderColor = SpanColor(senderColor);

			string? receiverColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == receiver)?.UserColor;
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
					   "<div class=\"chatDateStamp\">" +
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
									

									bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
										"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
											"<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
										"</div>" +
										"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
										"</div>" +
									"</div>";
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
									string title = "";
									if (row.IfMessageRead)
									{
										//messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye\"></ion-icon></div>";
										messageReadStatusIcon = "";
										classes = "bubble sender";
										title = "";
									}
									else
									{
										messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";
										classes = "bubble sender unread";
										title = "Wiadomość nie została jeszcze przeczytana";
									}


									bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
										"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
										"</div>" +
										"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this," + row.Id + ", '" + sender + "', '" + receiver + "')\" title=\"" + title + "\">" +
											"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
											messageReadStatusIcon +
										"</div>" +
									"</div>";
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


									bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
										"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
											"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
										"</div>" +
										"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
										"</div>" +
									"</div>";
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
									string title = "";
									if (row.IfMessageRead)
									{
										//messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye\"></ion-icon></div>";
										messageReadStatusIcon = "";
										classes = "bubble sender";
										title = "";
									}
									else
									{
										messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";
										classes = "bubble sender unread";
										title = "Wiadomość nie została jeszcze przeczytana";
									}


									bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
										"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
										"</div>" +
										"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClick(this," + row.Id + ", '" + sender + "', '" + receiver + "')\" title=\"" + title + "\">" +
											"<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
											messageReadStatusIcon +
										"</div>" +
									"</div>";
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
			string spanSenderColor = SpanColor(senderColor);

			var receiverColor = _context.UserIdentity.FirstOrDefault(x => x.UserId == receiverUserId)?.UserColor;
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
                       "<div class=\"chatDateStamp\">" +
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


									bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
										"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
											"<span style=\"color:" + spanReceiverColor + ";\">" + decryptedMessage + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + receiverColor + ";\"></div>" +
										"</div>" +
										"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
										"</div>" +
									"</div>";
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
									string title = "";
									if (row.IfMessageRead)
									{
										//messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye\"></ion-icon></div>";
										messageReadStatusIcon = "";
										classes = "bubble sender";
										title = "";
									}
									else
									{
										messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";
										classes = "bubble sender unread";
										title = "Wiadomość nie została jeszcze przeczytana";
									}


									bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
										"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
											"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
										"</div>" +
										"<div id=\"bubbleId_" + row.Id + "\" class=\"" + classes + "\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this," + row.Id + ", '" + senderUserId + "', '" + receiverUserId + "')\" title=\"" + title + "\">" +
											"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
											"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
											messageReadStatusIcon +
										"</div>" +
									"</div>";
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

		public string BubbleSender(string senderColor, string spanSenderColor, string message, string hour, int id, string senderUserId, string receiverUserId)
		{
			byte[] byteMessage = Convert.FromBase64String(message);
			string decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);

			string messageReadStatusIcon = "<div class=\"messageReadStatusIcon\"><ion-icon name=\"eye-off\"></ion-icon></div>";
			string title = "Wiadomość nie została jeszcze przeczytana";

			string bubble = "<div class=\"chatMessagesBubblesContainer sender\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
									"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
										"<span>" + hour + "</span>" +
									"</div>" +
									"<div id=\"bubbleId_" + id +"\" class=\"bubble sender unread\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this," + id + ", '" + senderUserId + "', '" + receiverUserId + "')\" title=\"" + title + "\">" +
										"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
										"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
										messageReadStatusIcon +
									"</div>" +
								"</div>";

			return bubble;
		}

		public string BubbleReceiver(string senderColor, string spanSenderColor, string message, string hour, int id)
		{
			byte[] byteMessage = Convert.FromBase64String(message);
			string decryptedMessage = Data.Encryption.EncryptionHelper.Decrypt(byteMessage);

			string bubble = "<div class=\"chatMessagesBubblesContainer receiver\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
									"<div id=\"bubbleId_" + id + "\" class=\"bubble receiver unread\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
										"<span style=\"color:" + spanSenderColor + ";\">" + decryptedMessage + "</span>" +
										"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
									"</div>" +
									"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
										"<span>" + hour + "</span>" +
									"</div>" +
								"</div>";

			return bubble;
		}

		public async Task<Tuple<string, bool, List<int>>> Bubble(string loggedInUser, string sender, string receiver, string message, DateTime date, string? fileLocation, bool ifMessageRead, bool ifDeleted)
		{
			bool handler = false;

			var senderColor = _context.UserIdentity.First(x => x.UserId == sender).UserColor;
			string spanSenderColor = SpanColor(senderColor);

			//

			string bubble = "";
			if (loggedInUser == sender)
			{
				string text_ = "";
				string date_ = "";
				int id = 0;
				if (!handler)
				{
					var newData = new Chat()
					{
						SenderUserId = sender,
						ReceiverUserId = receiver,
						MessageText = Data.Encryption.EncryptionHelper.Encrypt(message),
						MessageSentDate = new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second),
						SentFileLocation = fileLocation,
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
				
				bubble = BubbleSender(senderColor, spanSenderColor, text_, date_, id, sender, receiver);
			}
			if (loggedInUser == receiver)
			{
				bubble = BubbleReceiver(senderColor, spanSenderColor, Data.Encryption.EncryptionHelper.Encrypt(message), date.ToString("HH:mm"), 0);
			}

			//
			var duplicates = CheckForDuplicates(sender, receiver, Data.Encryption.EncryptionHelper.Encrypt(message), new DateTime(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second), fileLocation);

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
					Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, message, date, null, false, false);

					return Json(new { dateCheck = true, bubble = bubble.Item1, anyDuplicates = bubble.Item2, firstConversation = false, today = date.ToShortDateString(), receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });
				}
				else
				{
					//data dzisiejsza nie istnieje
					Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, message, date, null, false, false);

					string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
						   "<div class=\"chatDateStamp\">" +
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
				Tuple<string, bool, List<int>> bubble = await Bubble(GetUserId(), sender, receiver, message, date, null, false, false);

				string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
						   "<div class=\"chatDateStamp\">" +
								"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
							"</div>" +
							bubble.Item1 +
							"</div>";

				return Json(new { dateCheck = false, firstConversation = true, messages, anyDuplicates = bubble.Item2, receiver = false, loggedUser = GetUserId(), senderId = sender, duplicates = bubble.Item3, receiverId = receiver });				
			}
		}

		public List<int> CheckForDuplicates(string sender, string receiver, string? message, DateTime date, string? sentFileLocation)
		{
			var duplicates = _context.Chat
			.Where(g => g.SenderUserId == sender && g.ReceiverUserId == receiver && g.MessageText == message && g.MessageSentDate == date && g.SentFileLocation == sentFileLocation)
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
			string button = "<div title=\"Usuń wiadomość\" class=\"bubbleSettings\" onclick=\"removeMessage(" + id + ", '" + sender + "', '" + receiver + "')\">" +
					"<ion-icon name=\"trash-outline\"></ion-icon>" +
				"</div>";

			return Content(button);
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
			//List<Chat> notifySenderArray = new List<Chat>();
			string senderId = "";
			string receiverId = "";
			var array = _context.Chat.Where(x => arrayOfMessageIds.Any(y => y == x.Id) && x.IfMessageRead == false);
			foreach (var item in array)
			{
				//notifySenderArray.Add(item);
				senderId = item.SenderUserId;
				receiverId = item.ReceiverUserId;
				item.IfMessageRead = true;
			}
			await _context.SaveChangesAsync();

			//return Json(new { success = true, array = arrayOfMessageIds, notifySenderArray  });
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
			if (id != null)
			{
				int? workerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == id)?.WorkerId;
				string? name = _context.Workers2.FirstOrDefault(x => x.Id == workerId)?.Name + " " + _context.Workers2.FirstOrDefault(x => x.Id == workerId)?.Surname;

				return Json("<span>" + name + "</span>");
			}

			return Json(false);
		}




	}
}

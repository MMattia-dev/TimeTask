using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
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

		[HttpGet]
        public ActionResult FilterDiv(int? savedDepartment)
        {
            //var departmentid = GetDepartmentId(savedDepartment);

			var departmentsOptions = "";
			if (savedDepartment != null)
            {
                //departmentsOptions += "<option value\"0\">Wszyscy</option>";

				foreach (var department in _context.Department.OrderBy(x => x.Name))
				{
					if (savedDepartment == department.Id)
					{
						departmentsOptions += "<option selected value=\"" + department.Id + "\">" + department.Name + "</option>";
					}
					else
					{
						departmentsOptions += "<option value=\"" + department.Id + "\">" + department.Name + "</option>";
					}
				}
			}
            else
            {
				var userWorkerId = _context.UserIdentity.FirstOrDefault(x => x.UserId == GetUserId())?.WorkerId;
				var userDepartmentId = _context.Workers2.FirstOrDefault(x => x.Id == userWorkerId)?.DepartmentID;

				//departmentsOptions += "<option value\"0\">Wszyscy</option>";

				foreach (var department in _context.Department.OrderBy(x => x.Name))
				{
					if (userDepartmentId == department.Id)
					{
						departmentsOptions += "<option selected value=\"" + department.Id + "\">" + department.Name + "</option>";
					}
					else
					{
						departmentsOptions += "<option value=\"" + department.Id + "\">" + department.Name + "</option>";
					}
				}
			}

            string div = "<div class=\"chatFilter\">" +
                    "<a class=\"chatMinimize filterClose\" title=\"Zamknij\" onclick=\"scQisAIXdDGVbXF(this)\">" +
                        "<ion-icon name=\"close-outline\"></ion-icon>" +
                    "</a>" +
                    "<div class=\"chatFilterParent\">" +
						"<div class=\"chatFilterDepartment\">" +
							"<label>Pokaż osoby z działu:</label>" +
							"<select class=\"form-control xNiaHJPRvUxJGBW\" onchange=\"zpUZfWoTJUsolOJ(this)\">" +
								departmentsOptions +
                            "</select>" +
                        "</div>" +
                        //"<div style=\"height: 1px; width: 100%; background-color: rgba(255, 255, 255, 0.1);\"></div>" +
                        //"<div class=\"chatFilterDepartment\">" +
                        //    "<label>Pokaż rozmowy w obrębie czasu:</label>" +
                        //    "<div class=\"chatFilterDates\">" +
                        //        "<input type=\"date\" class=\"form-control xNiaHJPRvUxJGBW PZrqDDIccpmCYkx\" onchange=\"qXzbjsbQuevQnyh()\" id=\"qXzbjsbQuevQnyh_\" />" +
                        //        "<span>-</span>" +
                        //        "<input type=\"date\" class=\"form-control xNiaHJPRvUxJGBW PZrqDDIccpmCYkx\" onchange=\"hAAYoQIiJMwDFCV()\" id=\"hAAYoQIiJMwDFCV_\" />" +
                        //    "</div>" +
                        //"</div>" +
                    "</div>" +
                "</div>";

            return Content(div);
            //return Json(savedDepartment);
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

		public string SpanColor(string color)
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
				var userWorkerId = _context.UserIdentity.First(x => x.UserId == GetUserId()).WorkerId;
				var userDepartmentId = _context.Workers2.First(x => x.Id == userWorkerId).DepartmentID;

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
						"</div>" +
						UsersDiv(savedDepartment) +
					"</div>" +
					"<div class=\"chatParent\">" +
							"<div class=\"chatMessages\">" +
								"<div class=\"chatHeader\" id=\"chatheader\">" +
									"<div class=\"chatMinimizeDiv\">" +
										"<div class=\"chatStatus\">" +
											"<span class=\"status online\"></span>" +
											"<span class=\"statusText\">Online</span>" +
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
        public ActionResult ShowChatMessages(string receiverUserId)
        {
			var culture = new CultureInfo("pl-PL");

			var senderUserId = GetUserId();

			var senderColor = _context.UserIdentity.First(x => x.UserId == senderUserId).UserColor;
			string spanSenderColor = SpanColor(senderColor);

			var receiverColor = _context.UserIdentity.First(x => x.UserId == receiverUserId).UserColor;
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
				"<a id=\"sendMessage\" r=\"" + receiverUserId + "\" onclick=\"vKbmXcDAKBSEZqf('" + receiverUserId + "')\" title=\"Wyślij\"><ion-icon name=\"arrow-up-outline\"></ion-icon></a>";

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
								bubbles += "<div class=\"chatMessagesBubblesContainer receiver\">" +
									"<div class=\"bubble receiver\" style=\"background-color:" + receiverColor + "\" onclick=\"bubbleClickReceiver(this)\" onmouseout=\"bubbleOutReceiver(this)\">" +
										"<span style=\"color:" + spanReceiverColor + ";\">" + row.MessageText + "</span>" +
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
								bubbles += "<div class=\"chatMessagesBubblesContainer sender\">" +
									"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
										"<span>" + row.MessageSentDate.ToString("HH:mm") + "</span>" +
									"</div>" +
									"<div class=\"bubble sender\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this, event, " + row.Id + ")\">" +
										"<span style=\"color:" + spanSenderColor + ";\">" + row.MessageText + "</span>" +
										"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
									"</div>" +
								"</div>";
							}
                        }

                        messages += bubbles;
                    }

                    messages += "</div>";
                }

                return Json(new { messages, arrayNotEmpty = true, textDiv });
            }
            else
            {
                return Json(new { div, arrayNotEmpty = false, textDiv });
			}
        }

		public string BubbleSender()
		{
			string bubble = "";

			return bubble;
		}

		public string BubbleReceiver()
		{
			string bubble = "";

			return bubble;
		}

		[HttpPost]
		public async Task<ActionResult> AddToChat_(string sender, string receiver, string message)
		{
			if (GetUserId() == sender)
			{
				return Json("jesteś nadawcą");
			}
			if (GetUserId() == receiver)
			{
				return Json("jesteś odbiorcą");
			}

			//var culture = new CultureInfo("pl-PL");

			////kolor
			//var senderColor = _context.UserIdentity.First(x => x.UserId == sender).UserColor;
			//string spanSenderColor = SpanColor(senderColor);

			////var receiverColor = _context.UserIdentity.First(x => x.UserId == receiver).UserColor;
			////string spanReceiverColor = SpanColor(receiverColor);
			////

			////dzisiejsza data
			//var date = DateTime.Now;

			//var chatArray = _context.Chat.Where(x => x.SenderUserId == sender && x.ReceiverUserId == receiver || x.SenderUserId == receiver && x.ReceiverUserId == sender);
			//if (chatArray.Any())
			//{

			//}
			//else
			//{

			//}

			return Json(false);
		}

        [HttpPost]
        public async Task<ActionResult> AddToChat(string receiver, string message)
        {
			var culture = new CultureInfo("pl-PL");

			//kolor
			var senderColor = _context.UserIdentity.First(x => x.UserId == GetUserId()).UserColor;
			string spanSenderColor = SpanColor(senderColor);
			//

			var date = DateTime.Now;
            var chatArray = _context.Chat.Where(x => x.SenderUserId == GetUserId() && x.ReceiverUserId == receiver || x.SenderUserId == receiver && x.ReceiverUserId == GetUserId());
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

					//dodaj do bazy
					var newData = new Chat()
					{
						SenderUserId = GetUserId(),
						ReceiverUserId = receiver,
						MessageText = message,
						MessageSentDate = date,
						SentFileLocation = null,
						IfMessageRead = false,
						IfDeleted = false,
					};

					_context.Chat.Add(newData);
					await _context.SaveChangesAsync();

					string bubble = "<div class=\"chatMessagesBubblesContainer sender\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
							"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
                                "<span>" + newData.MessageSentDate.ToString("HH:mm") + "</span>" +
							"</div>" +
                            "<div class=\"bubble sender\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this, event, " + newData.Id + ")\">" +
                                "<span style=\"color:" + spanSenderColor + ";\">" + newData.MessageText + "</span>" +
                                "<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
                            "</div>" +
                        "</div>";

                    return Json(new { dateCheck = true, bubble, firstConversation = false, today = date.ToShortDateString() });
                }
                else
                {
					//data dzisiejsza nie istnieje

					//dodaj do bazy
					var newData = new Chat()
					{
						SenderUserId = GetUserId(),
						ReceiverUserId = receiver,
						MessageText = message,
						MessageSentDate = date,
						SentFileLocation = null,
						IfMessageRead = false,
						IfDeleted = false,
					};

					_context.Chat.Add(newData);
					await _context.SaveChangesAsync();

					string bubble = "<div class=\"chatMessagesBubblesContainer sender\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
							"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
								"<span>" + newData.MessageSentDate.ToString("HH:mm") + "</span>" +
							"</div>" +
							"<div class=\"bubble sender\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this, event, " + newData.Id + ")\">" +
								"<span style=\"color:" + spanSenderColor + ";\">" + newData.MessageText + "</span>" +
								"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
							"</div>" +
						"</div>";

					string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
					   "<div class=\"chatDateStamp\">" +
							"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
						"</div>" +
						bubble +
						"</div>";

					return Json(new { dateCheck = false, firstConversation = false, messages });
				}
            }
            else
            {
				//nie istnieje w bazie (użytkownicy nie czatowali)

				//dodaj do bazy
				var newData = new Chat()
				{
					SenderUserId = GetUserId(),
					ReceiverUserId = receiver,
					MessageText = message,
					MessageSentDate = date,
					SentFileLocation = null,
					IfMessageRead = false,
					IfDeleted = false,
				};

				_context.Chat.Add(newData);
				await _context.SaveChangesAsync();

				string bubble = "<div class=\"chatMessagesBubblesContainer sender\" style=\"animation: message 0.15s ease-out 0s forwards;\">" +
						"<div class=\"chatTimeStamp\" style=\"display: none;\">" +
							"<span>" + newData.MessageSentDate.ToString("HH:mm") + "</span>" +
						"</div>" +
						"<div class=\"bubble sender\" style=\"background-color:" + senderColor + "\" onclick=\"bubbleClick(this, event, " + newData.Id + ")\">" +
							"<span style=\"color:" + spanSenderColor + ";\">" + newData.MessageText + "</span>" +
							"<div class=\"tail\" style=\"border-top-color:" + senderColor + ";\"></div>" +
						"</div>" +
					"</div>";

				string messages = "<div id=\"dateParent\" date=\"" + date.ToShortDateString() + "\">" +
					   "<div class=\"chatDateStamp\">" +
							"<div></div><span>" + date.ToString("dd MMMM yyyy", culture) + "</span><div></div>" +
						"</div>" +
						bubble +
						"</div>";

				return Json(new { dateCheck = false, firstConversation = true, messages });
			}
		}

		[HttpGet]
		public ActionResult DeleteButton(int id)
		{
			string button = "<div title=\"Usuń wiadomość\" class=\"bubbleSettings\" id=\"bubbleSettingsId\" onclick=\"removeMessage(this, " + id + ")\">" +
					"<ion-icon name=\"trash-outline\"></ion-icon>" +
				"</div>";

			return Content(button);
		}

		[HttpPost]
		public async Task<ActionResult> RemoveMessage(int id)
		{
			var row = _context.Chat.FirstOrDefault(e => e.Id == id);
			if (row != null)
			{
				row.IfDeleted = true;
				await _context.SaveChangesAsync();

				string messageRemovedDiv = "<div class=\"bubble deleted sender\">" +
							"<span>Wiadomość usunięta</span>" +
							"<div class=\"tail\"></div>" +
						"</div>";

				return Json(new { success = true, messageRemovedDiv });
			}

			return Json(false);
		}





	}
}

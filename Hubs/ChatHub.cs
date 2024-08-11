using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.SignalR;
using NuGet.Protocol.Plugins;
using System.Net;
using System.Security.Claims;
using TimeTask.Controllers;

namespace TimeTask.Hubs
{
    public class ChatHub : Hub
    {
		private readonly UserTrackerService _userTrackerService;

		public ChatHub(UserTrackerService userTrackerService)
		{
			_userTrackerService = userTrackerService;
		}

		public override Task OnConnectedAsync()
		{
			//var username = Context.User?.Identity?.Name;
			var username = GetUserId();
			if (username != null)
			{
				_userTrackerService.AddUser(username);
			}
			return base.OnConnectedAsync();
		}

		public override Task OnDisconnectedAsync(Exception exception)
		{
			//var username = Context.User?.Identity?.Name;
			var username = GetUserId();
			if (username != null)
			{
				_userTrackerService.RemoveUser(username);
			}
			return base.OnDisconnectedAsync(exception);
		}

		public string GetUserId()
		{
			var claimsIdentity = Context.User?.Identity as ClaimsIdentity;
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

		public async Task SendMessage(string receiver, string message)
		{
			await Clients.Users(GetUserId(), receiver).SendAsync("ReceiveMessage", GetUserId(), receiver, message);
		}

		public async Task RemoveMessage(int id, string sender, string receiver)
		{
			await Clients.Users(sender, receiver).SendAsync("MessageRemoved", id, sender, receiver);
		}

		public async Task CheckUsersLoggedIn()
		{
			string[] loggedInUsers = _userTrackerService.GetLoggedInUsersArray();

			//await Clients.All.SendAsync("LoggedInUsers", loggedInUsers);
			//await Clients.Caller.SendAsync("LoggedInUsers", loggedInUsers);
			await Clients.All.SendAsync("LoggedInUsers");
		}
	}
}

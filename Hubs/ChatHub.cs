using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.SignalR;
using NuGet.Protocol.Plugins;
using System.Security.Claims;
using TimeTask.Controllers;

namespace TimeTask.Hubs
{
    public class ChatHub : Hub
    {
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
	}
}

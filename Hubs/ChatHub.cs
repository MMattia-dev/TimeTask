using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.SignalR;
using NuGet.Protocol.Plugins;
using System.Security.Claims;

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

		public async Task SendMessage(string receiver, string message) //string user, 
		{
			//await Clients.All.SendAsync("ReceiveMessage", user, message);

			//await Clients.All.SendAsync("ReceiveMessage", receiver, message);

			//await Clients.All.SendAsync("ReceiveMessage", GetUserId(), receiver, message);

			await Clients.Users(GetUserId(), receiver).SendAsync("ReceiveMessage", GetUserId(), receiver, message);


		}
	}
}

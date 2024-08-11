using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Options;
using TimeTask.Hubs;

namespace TimeTask
{
	public class CustomSignInManager<TUser> : SignInManager<TUser> where TUser : class
	{
		private readonly UserTrackerService _userTrackerService;
		private readonly IHubContext<ChatHub> _hubContext;

		public CustomSignInManager(UserTrackerService userTrackerService, IHubContext<ChatHub> hubContext, UserManager<TUser> userManager,
		IHttpContextAccessor contextAccessor, IUserClaimsPrincipalFactory<TUser> claimsFactory,
		IOptions<IdentityOptions> optionsAccessor, ILogger<SignInManager<TUser>> logger,
		IAuthenticationSchemeProvider schemes, IUserConfirmation<TUser> confirmation)
		: base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger, schemes, confirmation)
		{
			_userTrackerService = userTrackerService;
			_hubContext = hubContext;
		}

		public override async Task SignInAsync(TUser user, AuthenticationProperties authenticationProperties, string authenticationMethod = null)
		{
			await base.SignInAsync(user, authenticationProperties, authenticationMethod);
			var username = await UserManager.GetUserNameAsync(user);
			_userTrackerService.AddUser(username);
			await _hubContext.Clients.All.SendAsync("UserLoggedIn", username);
		}

		public override async Task SignOutAsync()
		{
			var username = Context.User.Identity.Name;
			await base.SignOutAsync();
			_userTrackerService.RemoveUser(username);
			await _hubContext.Clients.All.SendAsync("UserLoggedOut", username);
		}
	}
}

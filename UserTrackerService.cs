namespace TimeTask
{
	public class UserTrackerService
	{
		private readonly HashSet<string> _loggedInUsers = new HashSet<string>();

		public void AddUser(string username)
		{
			lock (_loggedInUsers)
			{
				_loggedInUsers.Add(username);
			}
		}

		public void RemoveUser(string username)
		{
			lock (_loggedInUsers)
			{
				_loggedInUsers.Remove(username);
			}
		}

		public string[] GetLoggedInUsersArray()
		{
			lock (_loggedInUsers)
			{
				return _loggedInUsers.ToArray();
			}
		}

		public List<string> GetLoggedInUsersList()
		{
			lock (_loggedInUsers)
			{
				return _loggedInUsers.ToList();
			}
		}
	}
}

namespace TimeTask.Models
{
	public class ChatGroups
	{
		public int Id { get; set; }
		public required string GroupName { get; set; }
		public required string MemberUserId { get; set; }
	}
}

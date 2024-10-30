namespace TimeTask.Models
{
	public class ChatSettings
	{
		public int Id { get; set; }
		public required string UserId { get; set; }
		public string? chatBackground { get; set; }
		public string? userChatColor { get; set; }
		public string? senderChatColor { get; set; }
	}
}

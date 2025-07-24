using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
	public class Reminders3
	{
		public int Id { get; set; }
		public required string UserID { get; set; }
		public required string Title { get; set; }
		public string? ReminderDescription { get; set; }
		public required DateTime CreatedDate { get; set; } = DateTime.Now;
		public DateTime? RemindDate { get; set; }
	}
}

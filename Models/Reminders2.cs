namespace TimeTask.Models
{
	public class Reminders2
	{
		public int Id { get; set; }
		public string UserID { get; set; }
		public string ReminderDescription { get; set; }
		public DateTime CreatedDate { get; set; } = DateTime.Now;
		public DateTime? RemindDate { get; set; }
	}
}

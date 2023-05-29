using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
	public class Time
	{
		public int Id { get; set; }
		public int WorkerID { get; set; }

		//Czas Pracy
		[DataType(DataType.DateTime)]
		public DateTime? Enter { get; set; }

		[DataType(DataType.DateTime)]
		public DateTime? Exit { get; set; }
		//

		//Urlop
		public int? LeaveID { get; set; }

		[DataType(DataType.Date)]
		public DateTime? LeaveDate { get; set; }
		//
	}
}

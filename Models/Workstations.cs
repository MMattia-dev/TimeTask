namespace TimeTask.Models
{
	public class Workstations //Stanowiska
	{
		public int Id { get; set; }
		public required int DepartmentId { get; set; }
		public required string Name { get; set; }
		
	}
}

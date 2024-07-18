namespace TimeTask.Models
{
    public class AllowedToEditSchedule
    {
        public int Id { get; set; }
        public int WorkerId { get; set; } //osoba która może edytować grafik
        public int DepartmentId { get; set; } //dział który może ta osoba edytować
    }
}

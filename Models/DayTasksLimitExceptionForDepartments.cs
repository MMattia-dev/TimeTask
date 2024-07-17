namespace TimeTask.Models
{
    public class DayTasksLimitExceptionForDepartments
    {
        public int Id { get; set; }
        public int DepartmentId { get; set; }
        public int DayTasksLimit { get; set; } //10 (domyślny), potem od 9 do 1
    }
}

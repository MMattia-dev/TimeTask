namespace TimeTask.Models
{
    public class TaskName2
    {
        //obowiązki i zadania do grafiku
        public int Id { get; set; }
        public string Name { get; set; }
        public int? DepartmentID { get; set; }
        //jeżeli departmentID jest puste to znaczy dla wszystkich
    }
}

using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Workers2
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int DepartmentID { get; set; }
        public bool Employed { get; set; }
    }
}

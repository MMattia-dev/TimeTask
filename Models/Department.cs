using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Department
    {
        public int Id { get; set; }

        [Display(Name = "Nazwa działu")]
        public string Name { get; set; }
    }
}

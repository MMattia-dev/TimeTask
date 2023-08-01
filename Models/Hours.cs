using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Hours
    {
        public int Id { get; set; }
        public int? DepartmentID { get; set; } //dla jakiego działu

        [DataType(DataType.Time)]
        public DateTime Enter { get; set; } //wejście

        [DataType(DataType.Time)]
        public DateTime Exit { get; set; } //wyjście
    }
}

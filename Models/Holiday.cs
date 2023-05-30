using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Holiday
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
    }
}

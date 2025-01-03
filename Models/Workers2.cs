using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Workers2
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required int DepartmentID { get; set; }
        public bool Employed { get; set; }
        public int? WorkstationId { get; set; }
        public int? ShiftId { get; set; }
    }
}

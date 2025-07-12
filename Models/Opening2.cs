using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Opening2
    {
        public int Id { get; set; }
        public required int WorkerID { get; set; }
        public required int Year { get; set; }
        public required int DaysVacation { get; set; }
        public int? DaysOpening { get; set; } //opcjonalne
        public float? OvertimeOpening { get; set; } //Nadgodziny pod koniec roku -> na początku następnego // opcjonalne

        [DataType(DataType.Date)]
        public required DateTime DateFrom { get; set; } //stan na dzień
    }
}

using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Opening2
    {
        public int Id { get; set; }
        public int WorkerID { get; set; }
        public int Year { get; set; }
        public int DaysVacation { get; set; }
        public int DaysOpening { get; set; }
        public float OvertimeOpening { get; set; } //Nadgodziny pod koniec roku -> na początku następnego

        [DataType(DataType.Date)]
        public required DateTime DateFrom { get; set; } //stan na dzień
    }
}

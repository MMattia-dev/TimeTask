using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Task2
    {
        public int Id { get; set; }
        public int WorkerID { get; set; } //imie i nazwisko pracownika
        public int? TaskNameID { get; set; } //nazwa zadania

        [DataType(DataType.Date)]
        public DateTime? Date { get; set; } //data pracy

        [DataType(DataType.DateTime)]
        public DateTime? JobStart { get; set; } //godzina rozpoczecia pracy

        [DataType(DataType.DateTime)]
        public DateTime? JobEnd { get; set; } //godzina zakonczenia pracy
    }
}

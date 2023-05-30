using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Period
    {
        public int Id { get; set; }

        //Rozliczenie co X miesięcy
        [Range(1, 3)]
        [MaxLength(1)]
        [Required(ErrorMessage = "Pole nie może być puste!")]
        [Display(Name = "Wpisz cyfrę od 1 do 4 i naciśnij 'Zapisz'.\nOkres będzie rozliczany co <liczba wpisana w polu> miesięcy.")]
        public int Every_X_Months { get; set; }
    }
}

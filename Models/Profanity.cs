using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Profanity
    {
        //Wulgaryzmy, niegrzeczne słowa i inne niedopuszczane słowa , które będzie można filtrować przez nazwy użytkowników, itd.
        //albo kiedy będzie rejestrował nowe konto

        public int Id { get; set; }

        [MaxLength(450)]
        public required string Name { get; set; }
    }
}

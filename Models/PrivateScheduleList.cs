using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class PrivateScheduleList
    {
        //tabela która określa którzy pracownicy mają prywatne grafiki (inni pracownicy nie mogą zobaczyć ich grafików)
        public int Id { get; set; }

        //[MaxLength(450)]
        //public required string UserId { get; set; } //AspNetUsersId
        public int WorkerId { get; set; }
        //public int? GroupId { get; set; } //id grupy do której należy użytkownik, opcjonalne. (więcej w modelu Groups)
    }
}

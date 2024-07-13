using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace TimeTask.Models
{
    public class UserIdentity
    {
        //model służący do zidentyfikowania pracownika w "dbo.AspNetUsers"
        public int Id { get; set; }

        [MaxLength(450)]
        public required string AspNetUsersId { get; set; }
        public int WorkerId { get; set; }
        public int? GroupId { get; set; } //id grupy do której należy użytkownik, opcjonalne. (więcej w modelu Groups)

    }
}

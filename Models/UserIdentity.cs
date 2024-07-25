using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class UserIdentity
    {
        //model służący do zidentyfikowania pracownika w "dbo.AspNetUsers"
        //służy również do identyfikacji do czatu
        //linkowanie kont itd. //osobna strona w ustawieniach
        public int Id { get; set; }

        [MaxLength(450)]
        public required string UserId { get; set; } //AspNetUsersId
        public int WorkerId { get; set; }
        public int? GroupId { get; set; } //id grupy do której należy użytkownik, opcjonalne. (więcej w modelu Groups)
        public string? UserAvatar { get; set; } //awatar usera
        public required string UserColor { get; set; } //kolor domyślnego awatara
    }
}

using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class Groups
    {
        //grupy do których należą użytkownicy (nazwy firm czy coś)
        //każdy użytkownik, który założy konto będzie miał możliwość tworzenia kont dla pracowników,
        //którzy w ten sposób będą mieli wgląd na własne dane tj. grafik dla własnego działu,
        //grafik tylko dla siebie (na którym nie widać innych pracowników), wgląd na dane tj. nadgodziny, niedogodziny, urlopy, czas pracy itd.

        //Każdy użytkownik który założy konto będzie miał status "Głównego konta",
        //który będzie miał uprawnienia "administratorskie" dla własnej grupy, ale będzie on mógł przenieść to uprawnienie (albo dać kolejnej osobie)
        //na kogoś innego z własnej grupy (musi być co najmniej jeden "Admin")

        public int Id { get; set; }

        [MaxLength(450)]
        public required string UserId { get; set; }

        [MaxLength(450)]
        public string? GroupName { get; set; }
    }
}

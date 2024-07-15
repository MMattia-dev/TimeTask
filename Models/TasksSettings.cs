using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class TasksSettings
    {
        public int Id { get; set; }

        [MaxLength(450)]
        public required string UserId { get; set; } //zaszyfrowane
        public int WorkScheduleView { get; set; } //0 = tygodniowy(domyślny), 1 = miesięczny
        public int FirstDayOfWeek { get; set; } //0 = Poniedziałek(domyślny), 1 = Niedziela
        public int DayTasksLimit { get; set; } //10 (domyślny), potem od 9 do 1
        public bool ShowLeaves { get; set; } //pokaż urlopy w grafiku //false = default
        public bool ShowHolidays { get; set; } //pokaż dni świąteczne w grafiku //false = default
        public bool AutoCopySchedule { get; set; } //false = defualt
        public DateTime? StartCopyScheduleDate { get; set; } //data rozpoczęcia automatycznego powielania grafiku
        public bool AutoShareSchedule { get; set; } //false = defualt
        public DateTime? StartShareScheduleDate { get; set; } //data rozpoczęcia automatycznego udostępniania grafiku
        public bool LockScheduleEdit { get; set; } //zablokuj możliwość edycji grafiku po upływie wybranego czasu //false = default
        public int LockTime { get; set; } //0 = tydzień (default), 1 = miesiąc, 2 = rok
        public bool ShowOnlyInitials { get; set; } //czy ma pokazywać tylko inicjały imion i nazwisk //false = defualt
        public bool AllowOthersToEdit { get; set; } //Włącz możliwość edycji grafiku przez innych pracowników //false = defualt
        public int? UserGroupId { get; set; } //id grupy do której należy użytkownik //może być puste //użytkownik nie musi należeć do grupy żeby aplikacja działała, ale niektóre funkcje mogą być zablokowane
        public bool LockAddingToHolidays { get; set; } //Zablokuj możliwość dodawania zadań do dni świątecznych //false = defualt
        public bool EnablePrivateSchedule { get; set; } //Włącz prywatne grafiki (Każdy pracownik będzie widział tylko swój grafik, nie będzie miał wglądu do grafików innych pracowników ze swojego działu) //false = default
        public int RepeatAutoCopySchedule { get; set; } //Powtarzaj powielanie grafiku //0 = co tydzień (default), 1 = co miesiąc
        public int RepeatAutoShareSchedule { get; set; } //Powtarzaj udostępnianie grafiku //0 = co tydzień (default), 1 = co miesiąc

        //które kolumny dotyczą grup a które nie?
    }
}

using System.ComponentModel.DataAnnotations;

namespace TimeTask.Models
{
    public class TasksSettings
    {
        public int Id { get; set; }

        [MaxLength(450)]
        public required string UserId { get; set; }
        public int WorkScheduleView { get; set; } //0 = tygodniowy(domyślny), 1 = miesięczny
        public int FirstDayOfWeek { get; set; } //0 = Poniedziałek(domyślny), 1 = Niedziela
        public int DayTasksLimit { get; set; } //7 (domyślny), potem od 6 do 1
        public bool ShowLeaves { get; set; } //pokaż urlopy w grafiku
        public bool ShowHolidays { get; set; } //pokaż dni świąteczne w grafiku
        public bool AutoCopySchedule { get; set; }
        public DateTime? StartCopyScheduleDate { get; set; } //data rozpoczęcia automatycznego powielania grafiku
        public bool AutoDownloadSchedule { get; set; }
        public DateTime? StartDownloadScheduleDate { get; set; } //data rozpoczęcia automatycznego pobierania grafiku
        public bool LockScheduleEdit { get; set; } //zablokuj możliwość edycji grafiku po upływie wybranego czasu
        public int LockTime { get; set; } //0 = tydzień, 1 = miesiąc, 2 = rok
        public bool ShowOnlyInitials { get; set; } //czy ma pokazywać tylko inicjały imion i nazwisk 
        public bool AllowOthersToEdit { get; set; } //Włącz możliwość edycji grafiku przez innych pracowników
    }
}

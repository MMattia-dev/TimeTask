namespace TimeTask.Models
{
    public class Leave4
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; } // Komentarz
        public string? Max { get; set; } // (kiedyś MaxDays) - INTeger - maksymalna liczba dni, tygodni, miesięcy, lat
        //
        public bool? IfDays { get; set; } // wybór pomiędzy dniami, tygodniami, miesiącami, latami
        public bool? IfWeeks { get; set; }
        public bool? IfMonths { get; set; } 
        public bool? IfYears { get; set; } 
        //
        public bool? IfWeekends { get; set; } // czy soboty i niedziele wliczać do urlopu?
        public bool? IfHolidays { get; set; } // czy święta wliczać do urlopu?
    }
}

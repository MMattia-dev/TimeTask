namespace TimeTask.Models
{
    public class Shifts //Zmiany - grupy zmianowe, np. na produkcję albo magazyn
    {
        public int Id { get; set; }
        public required string Name { get; set; } //Nazwa grupy zmianowej
    }
}

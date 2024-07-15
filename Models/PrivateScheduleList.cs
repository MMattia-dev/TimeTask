namespace TimeTask.Models
{
    public class PrivateScheduleList
    {
        //tabela która określa którzy pracownicy mają prywatne grafiki (inni pracownicy nie mogą zobaczyć ich grafików)
        public int Id { get; set; }
        public required string UserId { get; set; }

    }
}

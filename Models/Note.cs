namespace TimeTask.Models
{
    public class Note
    {
        public int Id { get; set; }
        public required string UserID { get; set; }
        public required string Title { get; set; }
        public required string NoteDescription { get; set; }
        public required DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}

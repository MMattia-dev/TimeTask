namespace TimeTask.Models
{
	public class Chat
	{
		public int Id { get; set; }
		public required string SenderUserId { get; set; }
		public required string ReceiverUserId { get; set; }
		public required string MessageText { get; set; }
		public DateTime MessageSentDate { get; set; }
		public string? SentFileLocation { get; set; }
		public bool IfMessageRead { get; set; } //domyślnie false, zmień na true jeżeli odbiorca otworzy wiadomości nadawcy po 2 sekundach
		public bool IfDeleted { get; set; } //domyślnie false, jeżeli osoba naciśnie "usuń" zmień status na true ale nie usuwaj wiersza
	}
}

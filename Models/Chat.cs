namespace TimeTask.Models
{
	public class Chat
	{
		public int Id { get; set; }
		public required string SenderUserId { get; set; }
		public required string ReceiverUserId { get; set; }
		public string? MessageText { get; set; } //może (ale nie musi) być null jeżeli user będzie wysyłał tylko plik
		public DateTime MessageSentDate { get; set; }
		public string? AttachmentName { get; set; }
		public bool IfMessageRead { get; set; } //domyślnie false, zmień po 2 sekundach na true, jeżeli odbiorca otworzy wiadomości nadawcy 
		public bool IfDeleted { get; set; } //domyślnie false, jeżeli osoba naciśnie "usuń" zmień status na true ale nie usuwaj wiersza w bazie
	}
}

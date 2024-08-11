using FluentFTP;
using System.IO;
using System.Threading.Tasks;

namespace TimeTask.Data.FTP
{
	public class FtpService
	{
		private readonly string _host;
		private readonly string _username;
		private readonly string _password;

		public FtpService(string host, string username, string password)
		{
			_host = host;
			_username = username;
			_password = password;
		}



		public async Task UploadFileAsync(string localFilePath, string remoteFilePath)
		{
			using (var client = new AsyncFtpClient(_host, _username, _password))
			{
				await client.Connect();
				await client.UploadFile(localFilePath, remoteFilePath);
			}
		}

		public async Task DownloadFileAsync(string remoteFilePath, string localFilePath)
		{
			using (var client = new AsyncFtpClient(_host, _username, _password))
			{
				await client.Connect();
				await client.DownloadFile(localFilePath, remoteFilePath);
			}
		}
	}
}

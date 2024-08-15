using System.Security.Cryptography;
using System.Text;

namespace TimeTask.Data.Encryption
{
    public class EncryptionFiles
    {
        public static readonly string Key = "lGv0zbb8hr4r4vw+c1snAg==";

        public static string Encrypt(string plainText)
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(Key);
                aes.IV = iv;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
                        {
                            streamWriter.Write(plainText);
                        }

                        array = memoryStream.ToArray();
                    }
                }
            }

            //return Convert.ToBase64String(array);

            // Convert to Base64
            string base64Encrypted = Convert.ToBase64String(array);

            // Replace / and \ with safe characters
            string safeEncrypted = base64Encrypted.Replace('/', '_').Replace('\\', '-');

            return safeEncrypted;
        }

        public static string Decrypt(byte[] ciphertext)
        {
            // Convert byte array to string to replace back safe characters
            string base64Encrypted = Encoding.UTF8.GetString(ciphertext);

            // Revert the custom replacements back to original / and \
            base64Encrypted = base64Encrypted.Replace('_', '/').Replace('-', '\\');

            // Convert the safe Base64 string back to original byte array
            byte[] originalCiphertext = Convert.FromBase64String(base64Encrypted);

            byte[] iv = new byte[16];

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(Key);
                aes.IV = iv;

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                byte[] decryptedBytes;
                using (var msDecrypt = new MemoryStream(ciphertext))
                {
                    using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                    {
                        using (var msPlain = new MemoryStream())
                        {
                            csDecrypt.CopyTo(msPlain);
                            decryptedBytes = msPlain.ToArray();
                        }
                    }
                }
                return Encoding.UTF8.GetString(decryptedBytes);
            }
        }
    }
}

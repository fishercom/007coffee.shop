using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var host = smtpSettings["Host"];
            var port = int.Parse(smtpSettings["Port"] ?? "587");
            var username = smtpSettings["Username"];
            var password = smtpSettings["Password"];
            var fromEmail = smtpSettings["FromEmail"] ?? "orders@007coffee.shop";

            if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                Console.WriteLine($"[Mock Email Service] To: {to}, Subject: {subject}, Body: {body}");
                return;
            }

            try 
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("007 Coffee Shop", fromEmail));
                message.To.Add(new MailboxAddress("", to));
                message.Subject = subject;

                var bodyBuilder = new BodyBuilder { HtmlBody = body };
                message.Body = bodyBuilder.ToMessageBody();

                using (var client = new SmtpClient())
                {
                    // For Port 587, use StartTls. For Port 465, use SslOnConnect.
                    var secureSocketOptions = port == 465 ? SecureSocketOptions.SslOnConnect : SecureSocketOptions.StartTls;
                    
                    // Bypass certificate validation if necessary (MailKit makes this easy)
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    await client.ConnectAsync(host, port, secureSocketOptions);
                    await client.AuthenticateAsync(username, password);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                    
                    Console.WriteLine($"Email sent successfully to {to} via {host} (MailKit)");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"SMTP Error for {to}: {ex.Message}");
                throw;
            }
        }
    }
}

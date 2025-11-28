using MediatR;
using System.Collections.Generic;

namespace Application.Users.Commands
{
    public class UpdateUserCommand : IRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public IList<string> Roles { get; set; } = new List<string>();
    }
}

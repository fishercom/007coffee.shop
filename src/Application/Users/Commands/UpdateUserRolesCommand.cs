using MediatR;
using System.Collections.Generic;

namespace Application.Users.Commands
{
    public class UpdateUserRolesCommand : IRequest
    {
        public string UserId { get; set; } = string.Empty;
        public IList<string> Roles { get; set; } = new List<string>();
    }
}

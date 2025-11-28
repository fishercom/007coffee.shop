using MediatR;

namespace Application.Users.Commands
{
    public class DeleteUserCommand : IRequest
    {
        public string UserId { get; set; } = string.Empty;
    }
}

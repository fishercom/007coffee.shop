using MediatR;

namespace Application.Users.Commands
{
    public class ChangePasswordCommand : IRequest<Unit>
    {
        public string UserId { get; set; }
        public ChangePasswordDto ChangePassword { get; set; }
    }
}

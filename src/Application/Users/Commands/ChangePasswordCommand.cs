using MediatR;

namespace Application.Users.Commands
{
    public class ChangePasswordCommand : IRequest<Unit>
    {
        public string UserId { get; set; } = string.Empty;
        public ChangePasswordDto ChangePassword { get; set; } = new ChangePasswordDto();
    }
}

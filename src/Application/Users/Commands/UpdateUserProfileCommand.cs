using MediatR;

namespace Application.Users.Commands
{
    public class UpdateUserProfileCommand : IRequest<Unit>
    {
        public string UserId { get; set; } = string.Empty;
        public UpdateUserProfileDto UserProfile { get; set; } = new UpdateUserProfileDto();
    }
}

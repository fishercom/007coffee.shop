using MediatR;

namespace Application.Users.Queries
{
    public class GetUserProfileQuery : IRequest<UserProfileDto>
    {
        public string UserId { get; set; }
    }
}

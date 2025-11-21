using MediatR;

namespace Application.Users.Queries
{
    public class GetUserWithRolesQuery : IRequest<UserDto?>
    {
        public string Id { get; set; } = string.Empty;
    }
}

using MediatR;
using System.Collections.Generic;

namespace Application.Users.Queries
{
    public class GetAllUsersQuery : IRequest<IEnumerable<UserDto>>
    {
    }
}

using MediatR;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Queries
{
    public class GetUserProfileQueryHandler : IRequestHandler<GetUserProfileQuery, UserProfileDto>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetUserProfileQueryHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<UserProfileDto> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);

            if (user == null)
            {
                return null; // Or throw an exception
            }

            return new UserProfileDto
            {
                Id = user.Id,
                Email = user.Email,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber
            };
        }
    }
}

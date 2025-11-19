using MediatR;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public class UpdateUserProfileCommandHandler : IRequestHandler<UpdateUserProfileCommand, Unit>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UpdateUserProfileCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Unit> Handle(UpdateUserProfileCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);

            if (user == null)
            {
                // Handle user not found, e.g., throw an exception
                return Unit.Value;
            }

            user.FirstName = request.UserProfile.FirstName;
            user.LastName = request.UserProfile.LastName;
            user.PhoneNumber = request.UserProfile.PhoneNumber;

            await _userManager.UpdateAsync(user);

            return Unit.Value;
        }
    }
}

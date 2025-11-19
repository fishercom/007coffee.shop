using MediatR;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Users.Commands
{
    public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Unit>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public ChangePasswordCommandHandler(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Unit> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);

            if (user == null)
            {
                // Handle user not found, e.g., throw an exception
                return Unit.Value;
            }

            var changePasswordResult = await _userManager.ChangePasswordAsync(
                user,
                request.ChangePassword.CurrentPassword,
                request.ChangePassword.NewPassword
            );

            if (!changePasswordResult.Succeeded)
            {
                // Handle errors, e.g., throw an exception with details from changePasswordResult.Errors
            }

            return Unit.Value;
        }
    }
}

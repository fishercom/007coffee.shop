using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Users.Queries;
using Application.Users.Commands;

namespace WebAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserProfileController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<UserProfileDto>> GetUserProfile()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var query = new GetUserProfileQuery { UserId = userId };
            var userProfile = await _mediator.Send(query);

            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUserProfile([FromBody] UpdateUserProfileDto userProfileDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var command = new UpdateUserProfileCommand { UserId = userId, UserProfile = userProfileDto };
            await _mediator.Send(command);

            return NoContent();
        }

        [HttpPut("change-password")]
        public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }

            var command = new ChangePasswordCommand { UserId = userId, ChangePassword = changePasswordDto };
            await _mediator.Send(command);

            return NoContent();
        }
    }
}

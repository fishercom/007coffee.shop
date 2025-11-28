using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Users.Queries;
using Application.Users.Commands;

namespace WebAPI.Controllers
{
    [Authorize(Roles = "Admin")] // All endpoints in this controller require Admin role
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            var users = await _mediator.Send(new GetAllUsersQuery());
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUserWithRoles(string id)
        {
            var user = await _mediator.Send(new GetUserWithRolesQuery { Id = id });
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}/roles")]
        public async Task<IActionResult> UpdateUserRoles(string id, [FromBody] UpdateUserRolesCommand command)
        {
            if (id != command.UserId)
            {
                return BadRequest("User ID in route does not match body.");
            }

            await _mediator.Send(command);
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserCommand command)
        {
            var userId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetUserWithRoles), new { id = userId }, new { id = userId });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserCommand command)
        {
            if (id != command.UserId)
            {
                return BadRequest("User ID in route does not match body.");
            }

            await _mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            await _mediator.Send(new DeleteUserCommand { UserId = id });
            return NoContent();
        }
    }
}

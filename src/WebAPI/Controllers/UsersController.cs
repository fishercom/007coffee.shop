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
    }
}

using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Application.Orders.Queries;
using Application.Orders.Commands;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrdersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders()
        {
            var orders = await _mediator.Send(new GetOrdersQuery());
            return Ok(orders);
        }

        [Authorize] // For admin or order owner
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            var order = await _mediator.Send(new GetOrderByIdQuery { Id = id });
            if (order == null)
            {
                return NotFound();
            }

            // check if the user is authorized to view this order
            if (!User.IsInRole("Admin") && User.FindFirstValue(ClaimTypes.NameIdentifier) != order.UserId)
            {
                return Forbid();
            }

            return Ok(order);
        }

        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetUserOrders(string userId)
        {
            // Ensure the requesting user can only see their own orders unless they are an admin
            if (!User.IsInRole("Admin") && User.FindFirstValue(ClaimTypes.NameIdentifier) != userId)
            {
                return Forbid(); // Return 403 Forbidden
            }

            var orders = await _mediator.Send(new GetUserOrdersQuery { UserId = userId });
            return Ok(orders);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder([FromBody] CreateOrderCommand command)
        {
            // Automatically set the UserId from the authenticated user
            command.UserId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? string.Empty;
            if (string.IsNullOrEmpty(command.UserId))
            {
                return Unauthorized("User is not authenticated.");
            }

            var orderId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetOrder), new { id = orderId }, orderId);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusCommand command)
        {
            if (id != command.OrderId)
            {
                return BadRequest();
            }

            await _mediator.Send(command);
            return NoContent();
        }
    }
}

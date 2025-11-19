using MediatR;
using Microsoft.AspNetCore.Mvc;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Application.Products.Queries;
using Application.Products.Commands;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ProductsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Product>>> Get()
        {
            var products = await _mediator.Send(new GetProductsQuery());
            return Ok(products);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> Get(int id)
        {
            var product = await _mediator.Send(new GetProductByIdQuery(id));
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Product>> Post([FromBody] CreateProductCommand command)
        {
            var product = await _mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] UpdateProductCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            var result = await _mediator.Send(command);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _mediator.Send(new DeleteProductCommand(id));
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

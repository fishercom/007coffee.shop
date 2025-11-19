using MediatR;
using Domain.Entities;

namespace Application.Products.Commands
{
    public record CreateProductCommand(string Name, string Description, decimal Price) : IRequest<Product>;
}

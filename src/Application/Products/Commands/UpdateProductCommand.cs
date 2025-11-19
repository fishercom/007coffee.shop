using MediatR;

namespace Application.Products.Commands
{
    public record UpdateProductCommand(int Id, string Name, string Description, decimal Price) : IRequest<bool>;
}

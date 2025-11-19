using MediatR;

namespace Application.Products.Commands
{
    public record DeleteProductCommand(int Id) : IRequest<bool>;
}

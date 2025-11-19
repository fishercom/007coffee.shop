using MediatR;
using Domain.Entities;

namespace Application.Products.Queries
{
    public record GetProductByIdQuery(int Id) : IRequest<Product>;
}

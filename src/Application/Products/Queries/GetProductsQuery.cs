using MediatR;
using Domain.Entities;
using System.Collections.Generic;

namespace Application.Products.Queries
{
    public record GetProductsQuery() : IRequest<List<Product>>;
}

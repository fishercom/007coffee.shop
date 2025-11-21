using MediatR;
using System.Collections.Generic;

namespace Application.Products.Queries
{
    public class GetProductsQuery : IRequest<IEnumerable<ProductDto>>
    {
    }
}

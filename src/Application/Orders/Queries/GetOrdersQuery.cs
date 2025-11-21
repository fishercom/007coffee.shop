using MediatR;
using System.Collections.Generic;

namespace Application.Orders.Queries
{
    public class GetOrdersQuery : IRequest<IEnumerable<OrderDto>>
    {
    }
}

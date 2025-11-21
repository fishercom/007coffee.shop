using MediatR;
using System.Collections.Generic;

namespace Application.Orders.Queries
{
    public class GetUserOrdersQuery : IRequest<IEnumerable<OrderDto>>
    {
        public string UserId { get; set; } = string.Empty;
    }
}

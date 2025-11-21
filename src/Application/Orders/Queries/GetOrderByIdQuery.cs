using MediatR;

namespace Application.Orders.Queries
{
    public class GetOrderByIdQuery : IRequest<OrderDto?>
    {
        public int Id { get; set; }
    }
}

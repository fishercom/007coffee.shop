using MediatR;

namespace Application.Orders.Commands
{
    public class UpdateOrderStatusCommand : IRequest
    {
        public int OrderId { get; set; }
        public string NewStatus { get; set; } = string.Empty;
    }
}

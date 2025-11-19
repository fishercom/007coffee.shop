using Application.Interfaces;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Products.Commands
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, bool>
    {
        private readonly IApplicationDbContext _context;

        public UpdateProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _context.Products.FindAsync(new object[] { request.Id }, cancellationToken);

            if (product == null)
            {
                return false;
            }

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

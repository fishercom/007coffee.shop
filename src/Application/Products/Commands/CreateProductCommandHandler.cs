using Application.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Products.Commands
{
    public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Product>
    {
        private readonly IApplicationDbContext _context;

        public CreateProductCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Product> Handle(CreateProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync(cancellationToken);

            return product;
        }
    }
}

using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace Application.Categories.Commands
{
    public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteCategoryCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Categories.FindAsync(request.Id);

            if (entity == null)
            {
                throw new Exception($"Category with id {request.Id} not found");
            }

            var hasProducts = await _context.Products.AnyAsync(p => p.CategoryId == request.Id, cancellationToken);
            if (hasProducts)
            {
                // Or handle this case as per business logic, maybe prevent deletion
                throw new Exception("Cannot delete category with associated products.");
            }

            _context.Categories.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

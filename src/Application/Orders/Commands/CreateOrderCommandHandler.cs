using Application.Interfaces;
using MediatR;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Application.Orders.Commands
{
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public CreateOrderCommandHandler(IApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<int> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);
            if (user == null)
            {
                throw new Exception($"User with ID {request.UserId} not found.");
            }

            var order = new Order
            {
                UserId = request.UserId,
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                ShippingAddress = request.ShippingAddress,
                ShippingCity = request.ShippingCity,
                ShippingPostalCode = request.ShippingPostalCode,
                ShippingCountry = request.ShippingCountry,
                OrderItems = new List<OrderItem>()
            };

            decimal totalAmount = 0;

            foreach (var itemDto in request.Items)
            {
                var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == itemDto.ProductId, cancellationToken);
                if (product == null)
                {
                    throw new Exception($"Product with ID {itemDto.ProductId} not found.");
                }

                if (product.Stock < itemDto.Quantity)
                {
                    throw new Exception($"Not enough stock for product {product.Name}. Available: {product.Stock}, Requested: {itemDto.Quantity}.");
                }

                var orderItem = new OrderItem
                {
                    ProductId = itemDto.ProductId,
                    Quantity = itemDto.Quantity,
                    UnitPrice = product.Price,
                    Product = product // Set navigation property for email template
                };
                order.OrderItems.Add(orderItem);
                totalAmount += orderItem.Quantity * orderItem.UnitPrice;

                product.Stock -= orderItem.Quantity;
            }

            order.TotalAmount = totalAmount;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync(cancellationToken);

            // Send Email Confirmation
            try 
            {
                var emailBody = Application.Common.EmailTemplates.GetOrderConfirmationEmail(order);
                await _emailService.SendEmailAsync(user.Email, $"Order Confirmation #{order.Id} - 007 Coffee Shop", emailBody);
            }
            catch (Exception ex)
            {
                // Log error but don't fail the order
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }

            return order.Id;
        }
    }
}

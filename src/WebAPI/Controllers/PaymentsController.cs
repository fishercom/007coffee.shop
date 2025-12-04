using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IApplicationDbContext _context;

        public PaymentsController(IConfiguration configuration, IApplicationDbContext context)
        {
            _configuration = configuration;
            _context = context;
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        }

        [HttpPost("create-payment-intent")]
        public async Task<ActionResult<CreatePaymentIntentResponse>> CreatePaymentIntent([FromBody] CreatePaymentIntentRequest request)
        {
            var totalAmount = await CalculateOrderAmount(request.Items);

            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = await paymentIntentService.CreateAsync(new PaymentIntentCreateOptions
            {
                Amount = totalAmount,
                Currency = "usd",
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
            });

            return new CreatePaymentIntentResponse
            {
                ClientSecret = paymentIntent.ClientSecret,
            };
        }

        private async Task<long> CalculateOrderAmount(List<PaymentItemDto> items)
        {
            long total = 0;
            var productIds = items.Select(i => i.ProductId).ToList();
            var products = await _context.Products
                .Where(p => productIds.Contains(p.Id))
                .ToListAsync();

            foreach (var item in items)
            {
                var product = products.FirstOrDefault(p => p.Id == item.ProductId);
                if (product != null)
                {
                    // Assuming product.Price is decimal
                    total += (long)(product.Price * 100) * item.Quantity;
                }
            }
            return total;
        }
    }

    public class CreatePaymentIntentRequest
    {
        public List<PaymentItemDto> Items { get; set; }
    }

    public class PaymentItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class CreatePaymentIntentResponse
    {
        public string ClientSecret { get; set; }
    }
}

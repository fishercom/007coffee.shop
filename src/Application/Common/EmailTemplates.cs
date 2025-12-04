using Domain.Entities;
using System;
using System.Text;
using System.Globalization;

namespace Application.Common
{
    public static class EmailTemplates
    {
        public static string GetOrderConfirmationEmail(Order order)
        {
            var sb = new StringBuilder();
            var culture = CultureInfo.GetCultureInfo("en-US");

            sb.Append(@"
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background-color: #2C2C2C; color: #D4A373; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; letter-spacing: 1px; }
        .content { padding: 30px; }
        .greeting { font-size: 18px; margin-bottom: 20px; }
        .order-info { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #D4A373; }
        .section-title { font-size: 16px; font-weight: bold; color: #2C2C2C; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
        .order-details { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .order-details th { text-align: left; padding: 10px; background-color: #f1f1f1; color: #555; font-size: 14px; }
        .order-details td { padding: 10px; border-bottom: 1px solid #eee; font-size: 14px; }
        .total-row td { font-weight: bold; font-size: 16px; color: #2C2C2C; border-top: 2px solid #D4A373; }
        .footer { background-color: #2C2C2C; color: #888; text-align: center; padding: 20px; font-size: 12px; }
        .btn { display: inline-block; background-color: #D4A373; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>007 Coffee Shop</h1>
        </div>
        <div class='content'>
            <p class='greeting'>Hello,</p>
            <p>Thank you for your order! We are excited to get your premium coffee ready for you.</p>
            
            <div class='order-info'>
                <p style='margin: 5px 0;'><strong>Order ID:</strong> #" + order.Id + @"</p>
                <p style='margin: 5px 0;'><strong>Date:</strong> " + order.OrderDate.ToString("MMMM dd, yyyy", culture) + @"</p>
            </div>

            <div class='section-title'>Shipping Address</div>
            <p style='margin-top: 5px;'>" + order.ShippingAddress + @"<br>
               " + order.ShippingCity + ", " + order.ShippingPostalCode + @"<br>
               " + order.ShippingCountry + @"</p>

            <div class='section-title'>Order Summary</div>
            <table class='order-details'>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th style='text-align: center;'>Qty</th>
                        <th style='text-align: right;'>Price</th>
                    </tr>
                </thead>
                <tbody>");

            foreach (var item in order.OrderItems)
            {
                var productName = item.Product != null ? item.Product.Name : "Product #" + item.ProductId;
                sb.Append($@"
                    <tr>
                        <td>{productName}</td>
                        <td style='text-align: center;'>{item.Quantity}</td>
                        <td style='text-align: right;'>{item.UnitPrice.ToString("C", culture)}</td>
                    </tr>");
            }

            sb.Append($@"
                    <tr class='total-row'>
                        <td colspan='2' style='text-align: right;'>Total</td>
                        <td style='text-align: right;'>{order.TotalAmount.ToString("C", culture)}</td>
                    </tr>
                </tbody>
            </table>
            
            <div style='text-align: center;'>
                <a href='http://localhost:3000/orders' class='btn'>View Your Order</a>
            </div>
        </div>
        <div class='footer'>
            <p>&copy; {DateTime.Now.Year} 007 Coffee Shop. All rights reserved.</p>
            <p>123 Coffee Lane, Brew City, BC 12345</p>
        </div>
    </div>
</body>
</html>");

            return sb.ToString();
        }
    }
}

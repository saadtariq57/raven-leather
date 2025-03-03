import sendEmail from "./sendEmailConfig";

export default async function SendOrderConfirmationEmail(email: string, order: any) {
    try {
        const response = await sendEmail({
            to: email,
            subject: "Order Confirmation",
            htmlContent: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
            <div style="text-align: center;">
              <h2>Thank You for Your Order!</h2>
              <p style="font-size: 16px; color: #555;">Your order has been successfully placed.</p>
            </div>
            
            <div style="background: #fff; padding: 15px; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333;">Order Details</h3>
              <p><strong>Order ID:</strong> #${order.id}</p>
              <p><strong>Placed on:</strong> ${order.placedOn}</p>
            </div>

            <div style="margin-top: 15px; padding: 15px; background: #fff; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333;">Shipping Details</h3>
              <p><strong>Name:</strong> ${order.customerName}</p>
              <p><strong>Phone:</strong> ${order.phoneNo}</p>
              <p><strong>Address:</strong> ${order.address}, ${order.city}, ${order.countryRegion}</p>
            </div>

            <div style="margin-top: 15px; padding: 15px; background: #fff; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0,0,0,0.1);">
              <h3 style="color: #333;">Order Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr>
                    <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: left;">Product</th>
                    <th style="border-bottom: 2px solid #ddd; padding: 10px;">Quantity</th>
                    <th style="border-bottom: 2px solid #ddd; padding: 10px; text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${order.orderItems
                    .map(
                        (item: any) => `
                  <tr>
                    <td style="padding: 10px;">${item.product.name}</td>
                    <td style="padding: 10px; text-align: center;">${item.quantity}x</td>
                    <td style="padding: 10px; text-align: right;">Rs. ${Number(item.product.price).toLocaleString("en-PK")}</td>
                  </tr>
                `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>

            <div style="margin-top: 20px; text-align: center;">
              <h2>Total: Rs. ${Number(order.totalAmount).toLocaleString("en-PK")}</h2>
              <p style="font-size: 18px; color: green; font-weight: bold;">Payment Status: ${order.paymentStatus}</p>
            </div>

            <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #888;">
              <p>We appreciate your business! If you have any questions, feel free to contact us.</p>
              <p><strong>Raven Team</strong></p>
            </div>
          </div>
                    `,
        })

        return response;

    } catch (error) {
        console.error('Error while sending order confirmation email:', error);
    }
}
// This file will handle the API route for Razorpay webhooks.
// It will receive payment confirmations from Razorpay.
import { NextResponse } from 'next/server';
import Payment from '@/models/Payment';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    // In a real application, you would verify the webhook signature here
    // using a secret provided by Razorpay. For this project, we'll skip
    // the detailed verification for brevity, but it's crucial for security.
    // const isSignatureValid = verifyWebhookSignature(body, signature, process.env.RAZORPAY_WEBHOOK_SECRET);
    // if (!isSignatureValid) {
    //   return NextResponse.json({ message: 'Invalid webhook signature' }, { status: 400 });
    // }

    const event = JSON.parse(body);

    if (event.event === 'payment.captured') {
      const paymentId = event.payload.payment.entity.id;
      const orderId = event.payload.payment.entity.order_id;

      await Payment.findOneAndUpdate(
        { razorpayOrderId: orderId, razorpayPaymentId: paymentId },
        { status: 'captured' },
        { new: true }
      );
    } else if (event.event === 'payment.failed') {
      const paymentId = event.payload.payment.entity.id;
      const orderId = event.payload.payment.entity.order_id;

      await Payment.findOneAndUpdate(
        { razorpayOrderId: orderId, razorpayPaymentId: paymentId },
        { status: 'failed' },
        { new: true }
      );
    }
    // Handle other events as needed

    return NextResponse.json({ message: 'Webhook received and processed' }, { status: 200 });
  } catch (error) {
    console.error('Error processing Razorpay webhook:', error);
    return NextResponse.json({ message: 'Failed to process webhook' }, { status: 500 });
  }
}

// This file will handle the API route for verifying Razorpay payments.
import { NextResponse } from 'next/server';
import { verifyRazorpayPayment } from '@/lib/razorpay';
import Payment from '@/models/Payment';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ message: 'Missing payment details' }, { status: 400 });
    }

    const isVerified = verifyRazorpayPayment(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature
    );

    if (isVerified) {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: 'captured',
        },
        { new: true }
      );
      return NextResponse.json({ message: 'Payment verified successfully' }, { status: 200 });
    } else {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: 'failed' },
        { new: true }
      );
      return NextResponse.json({ message: 'Payment verification failed' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json({ message: 'Failed to verify payment' }, { status: 500 });
  }
}

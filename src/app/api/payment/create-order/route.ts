// This file will handle the API route for creating Razorpay orders.
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { createRazorpayOrder } from '@/lib/razorpay';
import Payment from '@/models/Payment';
import dbConnect from '@/lib/dbConnect';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { amount, templateId } = await req.json();

    if (!amount || !templateId) {
      return NextResponse.json({ message: 'Amount and templateId are required' }, { status: 400 });
    }

    const order = await createRazorpayOrder(amount, 'INR');

    const newPayment = new Payment({
      userId: session.user.id,
      templateId,
      razorpayOrderId: order.id,
      amount,
      status: 'created',
    });

    await newPayment.save();

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
  }
}

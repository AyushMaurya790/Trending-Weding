import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Invite from '@/models/Invite';
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { templateId } = await req.json();

    if (!templateId) {
      return NextResponse.json(
        { error: 'Template ID is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Mock payment - simulate successful payment
    // In production, this would call Razorpay API

    // Create a new invite after successful payment
    const slug = nanoid(10);
    const invite = await Invite.create({
      userId: session.user.id,
      templateId,
      slug,
      isPurchased: true,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment successful',
      inviteId: invite._id.toString(),
      slug: invite.slug,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Payment processing failed' },
      { status: 500 }
    );
  }
}

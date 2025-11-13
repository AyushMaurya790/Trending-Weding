
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CustomInvite from '@/models/CustomInvite';
import Template from '@/models/Template'; // Needed to populate template details if fetching
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const { userId, templateId, customFields, publicUrl, isPaid } = await req.json();

    if (userId !== session.user.id) {
      return NextResponse.json({ message: 'Unauthorized user ID' }, { status: 403 });
    }

    const newCustomInvite = new CustomInvite({
      userId,
      templateId,
      customFields,
      publicUrl,
      isPaid,
    });

    await newCustomInvite.save();
    return NextResponse.json(newCustomInvite, { status: 201 });
  } catch (error) {
    console.error('Error saving custom invite:', error);
    return NextResponse.json({ message: 'Failed to save custom invite' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await dbConnect();
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }

    const invite = await CustomInvite.findOne({ publicUrl: `/invite/${slug}` }).populate('templateId');

    if (!invite) {
      return NextResponse.json({ message: 'Invite not found' }, { status: 404 });
    }

    return NextResponse.json(invite);
  } catch (error) {
    console.error('Error fetching public invite:', error);
    return NextResponse.json({ message: 'Failed to fetch public invite' }, { status: 500 });
  }
}

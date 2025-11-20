import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Invite from '@/models/Invite';

export async function GET(
  { params }: { params: { templateId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const invite = await Invite.findOne({
      userId: session.user.id,
      templateId: params.templateId,
    }).sort({ updatedAt: -1 });

    if (!invite) {
      return NextResponse.json(
        { error: 'No invite found for this template' },
        { status: 404 }
      );
    }

    return NextResponse.json(invite);
  } catch (error) {
    console.error('Error fetching invite by template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invite' },
      { status: 500 }
    );
  }
}

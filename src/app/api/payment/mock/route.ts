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
    const slug = nanoid(10);
    const invite = await Invite.create({
      userId: session.user.id,
      templateId,
      slug,
      isPurchased: true,
      heroGroomName: 'Abhishek',
      heroBrideName: 'Kanika',
      heroImage: '/assets/couple.png',
      grandparents: 'Smt. Lata Devi & Sm. Kamal Kapoor',
      groomParents: 'Mrs. Reena & Mr. Rajiv Kapoor',
      brideParents: 'Mrs. Reena & Mr. Rajiv Kapoor',
      inviteText: 'You to join us in the wedding celebrations of',
      daughterOfText: 'Daughter of',
      coupleName1: 'Abhishek',
      coupleName2: 'Anjali',
      weddingDate: 'Saturday, 21 June 2035',
      weddingVenue: '123 Anywhere St., City, ST 12345',
      events: [
        {
          eventName: 'Mehandi',
          weekDay: 'Friday',
          date: '2025-12-25',
          location: 'Taj Exotica Resort, Goa',
          locationLink: '',
          venue: 'Taj Exotica Resort, Goa',
          time: '6pm Onwards',
        },
        {
          eventName: 'Haldi',
          weekDay: 'Friday',
          date: '2025-12-25',
          location: 'Taj Exotica Resort, Goa',
          locationLink: '',
          venue: 'Taj Exotica Resort, Goa',
          time: '6pm Onwards',
        },
        {
          eventName: 'Shaddi',
          weekDay: 'Saturday',
          date: '2025-12-26',
          location: 'Taj Exotica Resort, Goa',
          locationLink: '',
          venue: 'Taj Exotica Resort, Goa',
          time: '7pm Onwards',
        },
           {
          eventName: 'Mehandi',
          weekDay: 'Friday',
          date: '2025-12-25',
          location: 'Taj Exotica Resort, Goa',
          locationLink: '',
          venue: 'Taj Exotica Resort, Goa',
          time: '6pm Onwards',
        },
        {
          eventName: 'Haldi',
          weekDay: 'Friday',
          date: '2025-12-25',
          location: 'Taj Exotica Resort, Goa',
          locationLink: '',
          venue: 'Taj Exotica Resort, Goa',
          time: '6pm Onwards',
        },
        {
          eventName: 'Shaddi',
          weekDay: 'Saturday',
          date: '2025-12-26',
          location: 'Taj Exotica Resort, Goa',
          locationLink: '',
          venue: 'Taj Exotica Resort, Goa',
          time: '7pm Onwards',
        },
      ],
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

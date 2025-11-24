import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    // Get all contacts, sorted by newest first
    const contacts = await Contact.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      contacts,
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
    });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name, email, phone, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Create contact submission
    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      phone: phone || '',
      message,
      status: 'new',
    });

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact submission error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

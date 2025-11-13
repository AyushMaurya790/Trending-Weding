// This file will handle API routes for templates.
// It will include GET to fetch all templates and POST to add new templates (admin).
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/dbConnect';
import Template from '@/models/Template';
import User from '@/models/User'; // Assuming User model is needed to check admin status

export async function GET() {
  await dbConnect();
  try {
    const templates = await Template.find({});
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ message: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !(session.user as any).isAdmin) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const body = await req.json();
    const newTemplate = new Template(body);
    await newTemplate.save();
    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error('Error adding template:', error);
    return NextResponse.json({ message: 'Failed to add template' }, { status: 500 });
  }
}

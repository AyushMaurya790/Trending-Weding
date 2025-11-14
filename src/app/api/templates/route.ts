import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Template from '@/models/Template';

export async function GET() {
  try {
    await dbConnect();

    const templates = await Template.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Template from '@/models/Template';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { title, description, slug, price, imageUrl } = await req.json();

    // Validation
    if (!title || !description || !slug || !price || !imageUrl) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingTemplate = await Template.findOne({ slug });
    if (existingTemplate) {
      return NextResponse.json(
        { message: 'Template with this slug already exists' },
        { status: 409 }
      );
    }

    // Create template
    const template = await Template.create({
      title,
      description,
      slug,
      price: parseFloat(price),
      imageUrl,
    });

    return NextResponse.json(
      {
        message: 'Template created successfully',
        template: {
          id: template._id,
          title: template.title,
          slug: template.slug,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Template creation error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to create template' },
      { status: 500 }
    );
  }
}

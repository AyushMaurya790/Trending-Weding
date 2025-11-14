const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-invites';

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
}, { timestamps: true });

// Template Schema
const TemplateSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  category: { type: String, default: 'wedding' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Template = mongoose.models.Template || mongoose.model('Template', TemplateSchema);

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create demo user
    console.log('Creating demo user...');
    const hashedPassword = await bcrypt.hash('demo123', 10);
    
    await User.findOneAndUpdate(
      { email: 'demo@example.com' },
      {
        name: 'Demo User',
        email: 'demo@example.com',
        password: hashedPassword,
      },
      { upsert: true, new: true }
    );
    console.log('Demo user created: demo@example.com / demo123');

    // Create sample templates
    console.log('Creating sample templates...');
    const templates = [
      {
        title: 'Classic Elegance',
        description: 'A timeless design for your special day.',
        imageUrl: '/assets/template-classic.jpg',
        price: 1999,
      },
      {
        title: 'Modern Minimalist',
        description: 'Sleek and simple, yet profoundly beautiful.',
        imageUrl: '/assets/template-modern.jpg',
        price: 2499,
      },
      {
        title: 'Floral Fantasy',
        description: 'Embrace the beauty of nature with vibrant florals.',
        imageUrl: '/assets/template-floral.jpg',
        price: 2999,
      },
      {
        title: 'Royal Heritage',
        description: 'Traditional designs with a regal touch.',
        imageUrl: '/assets/template-royal.jpg',
        price: 3499,
      },
      {
        title: 'Garden Romance',
        description: 'Fresh and romantic botanical themes.',
        imageUrl: '/assets/template-garden.jpg',
        price: 2799,
      },
      {
        title: 'Vintage Charm',
        description: 'Nostalgic designs with classic appeal.',
        imageUrl: '/assets/template-vintage.jpg',
        price: 2599,
      },
    ];

    for (const template of templates) {
      await Template.findOneAndUpdate(
        { title: template.title },
        template,
        { upsert: true, new: true }
      );
    }
    console.log(`Created ${templates.length} sample templates`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

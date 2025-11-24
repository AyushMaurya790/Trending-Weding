# Wedding Invitation Platform

A professional, responsive wedding invitation marketplace where users can browse, purchase, and customize beautiful wedding invitation templates.

## Features

- 🎨 **Professional Templates** - Beautiful, responsive wedding invitation designs
- 🔐 **Secure Authentication** - Login system using NextAuth.js
- ✏️ **Live Editor** - Real-time preview while editing invitations
- 💾 **Auto-Save** - Changes automatically saved every 5 seconds
- 🖼️ **Image Upload** - Cloudinary integration for multiple image uploads
- 📅 **Event Management** - Add multiple events with dates, locations, and map links
- 🔗 **Easy Sharing** - Share invitations via WhatsApp and social media
- ⏱️ **Countdown Timer** - Display days until the wedding
- 📱 **Fully Responsive** - Perfect on all devices

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** NextAuth.js
- **Database:** MongoDB with Mongoose
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Image Upload:** Cloudinary
- **Date Handling:** Day.js
- **Payment:** Mock Razorpay integration (ready for production)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```env
   MONGODB_URI=mongodb://localhost:27017/wedding-invites
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
   ```

3. **Seed the database** (Optional - creates demo user and sample templates)
   ```bash
   node scripts/seed.js
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

If you ran the seed script, use these credentials to login:

- **Email:** demo@example.com
- **Password:** demo123

## Project Structure

```
web-tem/
├── public/              # Static assets
│   └── assets/          # Template images
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── about/       # About page
│   │   ├── api/         # API routes
│   │   │   ├── auth/    # Authentication
│   │   │   ├── invites/ # Invite CRUD
│   │   │   ├── payment/ # Mock payment
│   │   │   └── templates/ # Template listing
│   │   ├── contact/     # Contact page
│   │   ├── editor/      # Template editor
│   │   ├── invite/      # Public invite view
│   │   ├── login/       # Login page
│   │   └── template/    # Template listing & details
│   ├── components/      # Reusable React components
│   ├── lib/             # Utility functions & DB connection
│   ├── models/          # Mongoose models
│   └── types/           # TypeScript type definitions
├── scripts/             # Database seed scripts
└── package.json
```

## Key Pages

- **Home (`/`)** - Landing page with features and CTA
- **Templates (`/template`)** - Browse all templates
- **Template Detail (`/template/[id]`)** - View template demo
- **Login (`/login`)** - User authentication
- **Editor (`/editor/[id]`)** - Edit purchased invitation
- **Public Invite (`/invite/[slug]`)** - Shareable invitation link
- **About (`/about`)** - Company information
- **Contact (`/contact`)** - Contact form

## Features in Detail

### Template Editor Fields

- Groom & Bride names
- Family names and details
- Multiple events with:
  - Event name
  - Date (auto-populates weekday)
  - Location with map link
- Image gallery (up to 10 images)
- WhatsApp link
- Multiple social media links
- Countdown date
- 4 extra custom fields

### Payment Flow

The platform now supports both real payment processing with Razorpay and a mock payment option for testing:

1. **Real Payments**: Uses the `/api/payment` endpoint with Razorpay integration
2. **Mock Payments**: Uses the `/api/payment/mock` endpoint for testing without actual charges

To enable real payments:
1. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env.local`
2. Use the new [PaymentButton](./src/components/PaymentButton.tsx) component for frontend integration
3. Test with the provided Postman collection or curl commands

For testing without actual payments, use the mock endpoint which bypasses Razorpay entirely.

## Deployment

Deploy on [Vercel](https://vercel.com) (recommended) or any platform supporting Next.js.

## Support

For support, email info@weddinginvites.com


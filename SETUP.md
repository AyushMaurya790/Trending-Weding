# Quick Setup Guide

## Immediate Next Steps

### 1. Setup Environment Variables

Create `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# MongoDB - Use local or MongoDB Atlas
MONGODB_URI=mongodb://localhost:27017/wedding-invites

# NextAuth - Generate a secret: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret-here

# Cloudinary - Get from cloudinary.com dashboard
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-preset-name
```

### 2. Install Dependencies (if not already done)

```bash
npm install
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# macOS: brew install mongodb-community
# Windows: Download from mongodb.com
# Linux: sudo apt-get install mongodb

# Start MongoDB
# macOS: brew services start mongodb-community
# Windows/Linux: mongod
```

**Option B: MongoDB Atlas (Cloud - Recommended)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update MONGODB_URI in .env.local

### 4. Setup Cloudinary (for image uploads)

1. Create account at https://cloudinary.com
2. Go to Settings → Upload
3. Create upload preset (set as "Unsigned")
4. Copy Cloud Name and Preset Name to .env.local

### 5. Seed Database (Optional but Recommended)

```bash
node scripts/seed.js
```

This creates:
- Demo user (demo@example.com / demo123)
- 6 sample templates

### 6. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Testing the Application

### 1. Browse as Guest
- Visit homepage (/)
- Browse templates (/template)
- View template details (/template/1)
- View About page (/about)
- View Contact page (/contact)

### 2. Login
- Click "Login" in navbar
- Use: demo@example.com / demo123

### 3. Purchase Template
- Go to /template
- Click "Buy Now" on any template
- Mock payment will process
- Redirects to editor

### 4. Edit Invitation
- Fill in all fields:
  - Couple names
  - Family details
  - Add events
  - Upload images (needs Cloudinary setup)
  - Add social links
  - Set counter date
- Watch live preview update
- Changes auto-save every 5 seconds

### 5. Share Invitation
- Click "Copy Share Link" in editor
- Open link in new tab
- View public invitation

## Common Issues

### MongoDB Connection Error
- Check if MongoDB is running
- Verify MONGODB_URI in .env.local
- For Atlas: Check IP whitelist

### Image Upload Not Working
- Verify Cloudinary credentials
- Check upload preset is "Unsigned"
- Check browser console for errors

### Auto-save Not Working
- Check browser console
- Verify API routes are accessible
- Check MongoDB connection

### NextAuth Error
- Generate new NEXTAUTH_SECRET
- Verify NEXTAUTH_URL matches your domain
- Clear browser cookies

## File Structure Reference

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   ├── about/page.tsx        # About page
│   ├── contact/page.tsx      # Contact page
│   ├── login/page.tsx        # Login page
│   ├── template/
│   │   ├── page.tsx          # Template listing
│   │   └── [id]/page.tsx     # Template detail
│   ├── editor/
│   │   └── [id]/page.tsx     # Invitation editor
│   ├── invite/
│   │   └── [slug]/page.tsx   # Public invite view
│   └── api/
│       ├── auth/[...nextauth]/route.ts  # Authentication
│       ├── templates/route.ts           # Get templates
│       ├── invites/
│       │   ├── [id]/route.ts           # Get/Update invite
│       │   └── slug/[slug]/route.ts    # Public invite API
│       └── payment/
│           └── mock/route.ts           # Mock payment
├── components/
│   ├── Navbar.tsx            # Navigation bar
│   ├── Footer.tsx            # Footer
│   ├── TemplateCard.tsx      # Template card component
│   ├── AnimationWrapper.tsx  # Animation wrapper
│   └── SessionProviderWrapper.tsx
├── lib/
│   └── dbConnect.ts          # MongoDB connection
├── models/
│   ├── User.ts               # User schema
│   ├── Template.ts           # Template schema
│   └── Invite.ts             # Invite schema
└── types/
    └── next-auth.d.ts        # NextAuth type definitions
```

## Production Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard:
   - MONGODB_URI
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (https://your-domain.vercel.app)
   - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
   - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
4. Deploy!

### Environment Variables for Production

Remember to update:
- NEXTAUTH_URL to your production domain
- Use MongoDB Atlas (not local MongoDB)
- Generate new NEXTAUTH_SECRET for production

## Need Help?

1. Check README.md for detailed documentation
2. Check browser console for errors
3. Check terminal/server logs
4. Verify all environment variables are set

## Next Steps for Production

- [ ] Add real template images to public/assets/
- [ ] Integrate real Razorpay payment
- [ ] Setup email notifications
- [ ] Add RSVP tracking
- [ ] Setup analytics
- [ ] Add SEO optimization
- [ ] Add error boundaries
- [ ] Add loading states
- [ ] Add form validation
- [ ] Add rate limiting

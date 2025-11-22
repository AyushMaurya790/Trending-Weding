# Template Editor Flow - Implementation Guide

## Overview
Implemented a complete dynamic template editing system where users can:
1. View template demos with static data
2. Edit templates in a split-view editor (form + live preview)
3. Auto-save changes every 5 seconds
4. Share public links to edited templates

## Architecture

### Components Made Dynamic

#### 1. `TempHero.tsx`
- **Props**: `groomName`, `brideName`, `heroImage`
- **Default Values**: Abhishek, Kanika, /assets/couple.png
- Displays the hero section with couple names overlaid on images

#### 2. `InviteSection.tsx`
- **Props**: 
  - `shlok` - Sacred text (ॐ श्री गणेशाय नम)
  - `groomParents`, `brideParents`
  - `inviteText` - Invitation message
  - `daughterOfText` - Relationship text
  - `coupleName1`, `coupleName2` - Couple names for invite section
  - `weddingDate`, `weddingVenue` - Event details
- All previously hard-coded text is now editable

#### 3. `EventShow.tsx`
- **Props**: 
  - `events[]` - Array of event objects
  - `eventsSectionTitle` - "On the following events"
  - `mapSectionText`, `mapClickText` - Map section labels
  - `mapLink` - Google Maps link
- Displays 0-N events dynamically

### Data Model

Extended `Invite` schema (`src/models/Invite.ts`) with:
- Hero section fields (heroGroomName, heroBrideName, heroImage)
- Invite section fields (shlok, parents, grandparents, etc.)
- Event section fields (eventsSectionTitle, etc.)
- Events array with venue, time, date, location
- All fields have sensible defaults matching original template

### Editor (`src/app/editor/[id]/page.tsx`)

**Layout**: Two-column split view
- **Left**: Scrollable form with sections:
  - Hero Section (groom/bride names)
  - Invitation Details (shlok, blessings, family info)
  - Events (add/remove, auto-weekday from date)
  - Images (Cloudinary upload, max 10)
  - Contact & Social (WhatsApp, social links)
  - Extra Fields (counter date, custom fields)

- **Right**: Live template preview
  - Renders `TempHero`, `InviteSection`, `EventShow` with form data
  - Scaled down to fit in preview pane
  - Updates in real-time as user types

**Features**:
- Auto-save every 5 seconds after last change
- Manual "Save Now" button
- "Copy Share Link" button for public URL
- Shows save status ("Saving...", "Saved X seconds ago")
- Pre-fills weekday when event date is selected
- Image upload via Cloudinary
- Add/remove events and social links dynamically

### Payment Flow (`src/app/api/payment/mock/route.ts`)

When user clicks "Buy Now":
1. Creates new Invite record with template defaults
2. Seeds with sample events (Mehandi, Haldi, Shaddi)
3. Initializes all text fields with template defaults
4. Redirects to `/editor/[inviteId]`

### Public Share (`src/app/invite/[slug]/page.tsx`)

- Renders the **actual template components** (TempHero, InviteSection, EventShow)
- Fetches invite data via `/api/invites/slug/[slug]`
- No edit controls, just clean template display
- Users can share this URL with guests

### Template Demo (`src/app/template/[id]/page.tsx`)

- Shows template with default static values
- Users can see what the template looks like before purchasing

## User Flow

### Flow 1: View Demo
1. User browses templates on `/template`
2. Clicks "View Demo" on `TemplateCard`
3. Navigates to `/template/[id]` showing static template preview
4. Sees TempHero, InviteSection, EventShow with default data

### Flow 2: Edit Template (Direct)
1. User clicks "Edit" on `TemplateCard`
2. If not authenticated → redirect to login
3. Navigates to `/editor/[templateId]` (creates invite on-the-fly if needed)
4. Sees split-view editor with form + live preview
5. Edits any field → preview updates immediately
6. Auto-saves every 5 seconds
7. Clicks "Save Now" for immediate save
8. Clicks "Copy Share Link" to get public URL

### Flow 3: Buy & Edit
1. User clicks "Buy Now" on `TemplateCard`
2. If not authenticated → redirect to login
3. Calls `/api/payment/mock` which creates invite with defaults
4. Redirects to `/editor/[inviteId]`
5. User edits template (same as Flow 2)

### Flow 4: Share & View
1. After editing, user clicks "Copy Share Link"
2. Shares `/invite/[slug]` URL via WhatsApp, social media, etc.
3. Recipients open link → see beautiful template with user's edits
4. No edit controls visible, just final invitation

## File Changes Summary

### Modified Files:
- ✅ `src/models/Invite.ts` - Added 20+ new fields for template data
- ✅ `src/components/tempHero.tsx` - Made dynamic with props
- ✅ `src/components/inviteSection.tsx` - Made dynamic with props  
- ✅ `src/components/EventShow.tsx` - Made dynamic with props
- ✅ `src/app/editor/[id]/page.tsx` - Complete rewrite with split-view
- ✅ `src/app/invite/[slug]/page.tsx` - Use template components
- ✅ `src/app/template/[id]/page.tsx` - Simplified to show template
- ✅ `src/app/api/payment/mock/route.ts` - Seed template defaults

### Backup Files (can delete):
- `src/app/editor/[id]/page-old.tsx`
- `src/app/invite/[slug]/page-old.tsx`

## Testing Checklist

1. ✅ View template demo at `/template/[id]` → see static content
2. ✅ Click "Edit" → redirects to editor with split view
3. ✅ Edit hero names → preview updates immediately
4. ✅ Edit shlok, blessings → preview reflects changes
5. ✅ Add events → shows in preview
6. ✅ Remove events → removed from preview
7. ✅ Wait 5+ seconds → auto-save triggers
8. ✅ Click "Save Now" → manual save
9. ✅ Click "Copy Share Link" → clipboard has URL
10. ✅ Open `/invite/[slug]` → see edited template (no edit controls)
11. ✅ Share link works for non-authenticated users

## Key Features Implemented

### ✅ Real-time Preview
Form changes instantly reflect in the right-side template preview

### ✅ Auto-save
Debounced save 5 seconds after last edit, with visual feedback

### ✅ Template Fidelity
Public shared links render the **exact same components** as the editor preview

### ✅ Extensibility
Easy to add more templates by:
1. Creating new component variants (TempHero2, InviteSection2, etc.)
2. Adding template type field to Invite model
3. Conditionally rendering components in editor/public pages

### ✅ All Static Content Editable
Every piece of text from the original template (names, dates, blessings, event titles, etc.) is now editable via form fields

## Next Steps (Future Enhancements)

1. **Multiple Template Designs**: Add template selector in editor
2. **Real Payment Integration**: Replace mock with Razorpay
3. **Image Cropping**: Add image editor for hero images
4. **Custom Fonts**: Allow users to choose fonts
5. **Color Schemes**: Let users customize colors
6. **Preview Modes**: Mobile/desktop preview toggle
7. **Version History**: Save multiple versions, allow rollback
8. **Collaboration**: Share edit access with others

## Environment Variables Required

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## Running the Project

```bash
npm install
npm run dev
```

Navigate to `http://localhost:3000/template` to see templates.

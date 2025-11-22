# Template System Guide

## Adding New Templates

Follow these steps to add a new template (takes only 2 minutes!):

### Step 1: Create Template Folder
```
src/app/template/templates/
  └── your-template-name/
      └── index.tsx
```

### Step 2: Create Template Component

```tsx
'use client';
import TempHero from "@/components/tempHero";
import InviteSection from "@/components/inviteSection";
// ... import other components you need

export default function YourTemplateName() {
  return (
    <div className="min-h-screen bg-[your-color] overflow-hidden">
      {/* Add your components here */}
      <TempHero />
      <InviteSection />
      {/* ... */}
    </div>
  );
}
```

### Step 3: Register Template

Open `registry.ts` and add your template:

```typescript
export const templateRegistry: Record<string, TemplateConfig> = {
  classic: { ... },
  floral: { ... },
  
  // Add your new template:
  'your-template-name': {
    component: require('./your-template-name').default,
    name: 'Your Display Name',
    description: 'Brief description of your template'
  },
};
```

### Step 4: Add to Database

Make sure your template exists in MongoDB with matching slug:

```javascript
{
  title: "Your Display Name",
  slug: "your-template-name",  // Must match folder name
  description: "Brief description",
  imageUrl: "/path/to/preview.jpg",
  price: 999
}
```

## That's It! 🎉

Your template is now accessible at:
- `/template/your-template-name` - Demo view
- Automatically works with editor and buy flow

## Available Templates

Current templates in the system:
- **classic** - Traditional wedding invitation
- **floral** - Floral design template
- **modern** - Modern minimalist template (example)

## File Structure

```
templates/
├── registry.ts           # Template registry (register here)
├── README.md            # This file
├── classic/
│   └── index.tsx        # Classic template component
├── floral/
│   └── index.tsx        # Floral template component
└── modern/
    └── index.tsx        # Modern template component (example)
```

## Tips

1. **Slug naming**: Use lowercase with hyphens (e.g., `royal-gold`, `minimalist-white`)
2. **Component naming**: Use PascalCase (e.g., `RoyalGoldTemplate`, `MinimalistWhiteTemplate`)
3. **Background colors**: Customize in the main div's className
4. **Reuse components**: All templates can use existing components (TempHero, InviteSection, etc.)
5. **Custom components**: You can create template-specific components in the template folder

## Scalability

This system can easily handle:
- ✅ 10 templates
- ✅ 100 templates
- ✅ 1000+ templates

Just keep adding to the registry!

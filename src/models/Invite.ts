import mongoose, { Schema, Model, models } from 'mongoose';

export interface IEvent {
  eventName: string;
  weekDay: string;
  date: string; // Format: MM/DD/YYYY
  location: string;
  locationLink: string;
}

export interface ISocialLink {
  platform: string;
  url: string;
}

export interface IInvite {
  _id: string;
  userId: string;
  templateId: string;
  slug: string;
  heroGroomName: string; 
  heroBrideName: string;
  grandparents: string; 
  groomParents: string; 
  brideParents: string; 
  inviteText: string; 
  daughterOfText: string; 
  coupleName1: string; 
  coupleName2: string; 
  weddingDate: string; 
  weddingVenue: string; 
  groomName: string;
  bridalName: string;
  groomFamilyName: string;
  bridalFamilyName: string;
  familyDetails: string;
  events: IEvent[];
  images: string[]; 
  heroImage: string; 
  whatsappLink: string;
  socialLinks: ISocialLink[];
    counterDate: string;
  isPurchased: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InviteSchema = new Schema<IInvite>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    templateId: {
      type: String,
      required: true,
      ref: 'Template',
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    heroGroomName: {
      type: String,
      default: 'Abhishek',
    },
    heroBrideName: {
      type: String,
      default: 'Kanika',
    },
    grandparents: {
      type: String,
      default: 'Smt. Lata Devi & Sm. Kamal Kapoor',
    },
    groomParents: {
      type: String,
      default: 'Mrs. Reena & Mr. Rajiv Kapoor',
    },
    brideParents: {
      type: String,
      default: 'Mrs. Reena & Mr. Rajiv Kapoor',
    },
    inviteText: {
      type: String,
      default: 'You to join us in the wedding celebrations of',
    },
    daughterOfText: {
      type: String,
      default: 'Daughter of',
    },
    coupleName1: {
      type: String,
      default: 'Abhishek',
    },
    coupleName2: {
      type: String,
      default: 'Anjali',
    },
    weddingDate: {
      type: String,
      default: 'Saturday, 21 June 2035',
    },
    weddingVenue: {
      type: String,
      default: '123 Anywhere St., City, ST 12345',
    },
    
    groomName: {
      type: String,
      default: '',
    },
    bridalName: {
      type: String,
      default: '',
    },
    groomFamilyName: {
      type: String,
      default: '',
    },
    bridalFamilyName: {
      type: String,
      default: '',
    },
    familyDetails: {
      type: String,
      default: '',
    },
    events: [
      {
        eventName: String,
        weekDay: String,
        date: String,
        location: String,
        locationLink: String,
      },
    ],
    images: [String],
    heroImage: {
      type: String,
      default: '/assets/couple.png',
    },
    whatsappLink: {
      type: String,
      default: '',
    },
    socialLinks: [
      {
        platform: String,
        url: String,
      },
    ],
     counterDate: {
      type: String,
      default: '',
    },
    
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Invite: Model<IInvite> =
  models.Invite || mongoose.model<IInvite>('Invite', InviteSchema);

export default Invite;

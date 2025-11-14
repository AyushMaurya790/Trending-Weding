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
  groomName: string;
  bridalName: string;
  shlok: string;
  groomFamilyName: string;
  bridalFamilyName: string;
  familyDetails: string;
  events: IEvent[];
  images: string[]; // Cloudinary URLs
  whatsappLink: string;
  socialLinks: ISocialLink[];
  counterDate: string;
  extraField1: string;
  extraField2: string;
  extraField3: string;
  extraField4: string;
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
    groomName: {
      type: String,
      default: '',
    },
    bridalName: {
      type: String,
      default: '',
    },
    shlok: {
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
    extraField1: {
      type: String,
      default: '',
    },
    extraField2: {
      type: String,
      default: '',
    },
    extraField3: {
      type: String,
      default: '',
    },
    extraField4: {
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

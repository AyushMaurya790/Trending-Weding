import mongoose, { Schema, Model, models } from 'mongoose';

export interface ITemplate {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema = new Schema<ITemplate>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: 'wedding',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Template: Model<ITemplate> =
  models.Template || mongoose.model<ITemplate>('Template', TemplateSchema);

export default Template;

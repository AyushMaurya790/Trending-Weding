// This file defines the Mongoose schema and model for a Template.
import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  jsonData: {
    fields: Array<{ name: string; label: string; type: string }>;
  };
  animationSettings: object;
  createdAt: Date;
}

const TemplateSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  jsonData: {
    fields: [
      {
        name: { type: String, required: true },
        label: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
  },
  animationSettings: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Template = mongoose.models.Template || mongoose.model<ITemplate>('Template', TemplateSchema);

export default Template;

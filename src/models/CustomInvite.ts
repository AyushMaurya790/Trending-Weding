// This file defines the Mongoose schema and model for a CustomInvite.
import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomInvite extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  templateId: mongoose.Schema.Types.ObjectId;
  customFields: object;
  publicUrl: string;
  isPaid: boolean;
  createdAt: Date;
}

const CustomInviteSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
  customFields: { type: Object, required: true },
  publicUrl: { type: String, required: true, unique: true },
  isPaid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const CustomInvite = mongoose.models.CustomInvite || mongoose.model<ICustomInvite>('CustomInvite', CustomInviteSchema);

export default CustomInvite;

import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  isAdmin: { type: Boolean, default: false },
  purchasedTemplates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template' }],
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model('User', UserSchema);

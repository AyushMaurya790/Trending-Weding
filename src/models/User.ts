import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  purchasedTemplates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Template' }],
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model('User', UserSchema);

// This file defines the Mongoose schema and model for a Payment.
import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  templateId: mongoose.Schema.Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  amount: number;
  status: string;
  createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, required: true }, // e.g., 'created', 'authorized', 'captured', 'failed'
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment;

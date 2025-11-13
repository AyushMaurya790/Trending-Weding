// This file will contain the Razorpay configuration and utility functions.
// It's currently a placeholder and will be populated with actual logic.
import Razorpay from 'razorpay';

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function createRazorpayOrder(amount: number, currency: string) {
  const options = {
    amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
    currency,
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1, // auto capture
  };

  try {
    const order = await instance.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
}

export function verifyRazorpayPayment(body: any, signature: string) {
  // Logic to verify payment signature
  // This typically involves creating an HMAC SHA256 hash of the order_id + payment_id
  // and comparing it with the razorpay_signature
  return true; // Placeholder
}

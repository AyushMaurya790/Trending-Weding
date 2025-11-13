// This file will contain general utility functions for the application.
// It's currently a placeholder and will be populated with actual logic.

export function formatCurrency(amount: number, currency: string = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function generatePublicSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with single hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single hyphen
}

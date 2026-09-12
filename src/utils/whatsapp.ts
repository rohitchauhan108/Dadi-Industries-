import { Product, CartItem } from '../types';

export const WHATSAPP_PHONE = '91863000405';
export const WHATSAPP_DISPLAY_PHONE = '+91 86300 00405';

/**
 * Creates a formatted WhatsApp URL for ordering a specific product variant
 */
export function createWhatsAppProductOrderUrl(
  product: Product,
  weight: string,
  quantity: number,
  unitPrice: number,
  notes?: string
): string {
  const total = unitPrice * quantity;
  const hindiBadge = product.hindiName ? ` (${product.hindiName})` : '';

  const message = `*Namaste Dadi Industries!* 🫙\n\n` +
    `I would like to place a *Direct WhatsApp Order* for:\n\n` +
    `📦 *Product:* ${product.name}${hindiBadge}\n` +
    `⚖️ *Jar Weight:* ${weight}\n` +
    `🔢 *Quantity:* ${quantity} jar${quantity > 1 ? 's' : ''}\n` +
    `💰 *Total Price:* ₹${total} (₹${unitPrice} / jar)\n` +
    (notes ? `📝 *Note:* ${notes}\n` : '') +
    `\n📍 *Next Steps:*\n` +
    `Please share your UPI ID / Payment QR code and estimated courier delivery time for my pincode. Dhanyawaad!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a formatted WhatsApp URL for ordering the full basket / cart contents
 */
export function createWhatsAppCartOrderUrl(
  items: CartItem[],
  subtotal: number,
  discount: number,
  shipping: number,
  total: number
): string {
  const itemsList = items
    .map((item, idx) => {
      const itemTotal = item.unitPrice * item.quantity;
      return `${idx + 1}. *${item.product.name}* (${item.selectedWeight}) x ${item.quantity} = ₹${itemTotal}`;
    })
    .join('\n');

  const discountLine = discount > 0 ? `• Discount: -₹${discount}\n` : '';
  const shippingLine = shipping === 0 ? '• Shipping: FREE' : `• Shipping: ₹${shipping}`;

  const message = `*Namaste Dadi Industries!* 🫙\n\n` +
    `I would like to place an *Order for My Cart Items*:\n\n` +
    `${itemsList}\n\n` +
    `🧾 *Summary:*\n` +
    `• Subtotal: ₹${subtotal}\n` +
    `${discountLine}` +
    `${shippingLine}\n` +
    `*⭐ Total Payable: ₹${total}*\n\n` +
    `Please confirm the order, share UPI payment details, and dispatch timeframe. Thank you!`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Creates a WhatsApp URL for general inquiries, wholesale, or custom orders
 */
export function createWhatsAppInquiryUrl(customMessage?: string): string {
  const defaultText = `*Namaste Dadi Industries!*\n\nI have an inquiry regarding your authentic traditional pickles and pantry items. Please assist me.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(customMessage || defaultText)}`;
}

/**
 * Safely opens WhatsApp link in a new tab
 */
export function openWhatsApp(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer');
}

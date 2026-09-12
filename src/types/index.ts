export interface ProductVariant {
  weight: string; // e.g. "250g", "500g", "1kg"
  price: number; // in INR ₹
  originalPrice?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  description: string;
  category: 'aachar' | 'candy' | 'murabba' | 'chutney';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  weight: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  image: string;
  galleryImages: string[];
  spiceLevel: 'Mild' | 'Medium' | 'Teekha (Spicy)' | 'Extra Teekha';
  oilType: string;
  ingredients: string[];
  shelfLife: string;
  storageInfo: string;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  pairingSuggestions: string[];
  nutritionPer100g?: {
    energy: string;
    protein: string;
    carbohydrates: string;
    fat: string;
    sodium: string;
  };
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  emoji: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  unitPrice: number;
  quantity: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  joinedDate: string;
  avatar?: string;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'cod' | 'netbanking';
  orderDate: string;
  estimatedDelivery: string;
  status?: 'Processing' | 'Dispatched' | 'In Transit' | 'Delivered';
  userId?: string;
}

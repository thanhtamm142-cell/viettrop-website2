export interface Product {
  id: string;
  name: string;
  vietnameseName: string;
  tagline: string;
  price: number; // in AUD
  originalPrice?: number; // in AUD
  weight: string;
  category: 'all' | 'mango' | 'jackfruit' | 'banana' | 'discovery-pack';
  categoryLabel: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  origin: string;
  textureNote: string;
  ingredients: string[];
  ingredientsNote: string;
  nutrition: {
    servingSize: string;
    servingsPerPack: number;
    per100g: {
      energy: string;
      protein: string;
      fatTotal: string;
      fatSaturated: string;
      carbsTotal: string;
      sugars: string;
      sodium: string;
      dietaryFibre?: string;
    };
    perServing: {
      energy: string;
      protein: string;
      fatTotal: string;
      fatSaturated: string;
      carbsTotal: string;
      sugars: string;
      sodium: string;
      dietaryFibre?: string;
    };
  };
  storage: string;
  shippingInfo: string;
  demoReviews: Array<{
    id: string;
    author: string;
    location: string;
    rating: number;
    date: string;
    title: string;
    content: string;
  }>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  summary: string;
  content: string[]; // markdown-like or paragraph array
  relatedProductIds: string[];
}

export interface FAQItem {
  id: string;
  category: 'Ingredients & Quality' | 'Origins & Sourcing' | 'Storage & Freshness' | 'Australian Shipping' | 'Demonstration & Ordering';
  question: string;
  answer: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  suburb: string;
  state: string;
  postcode: string;
  shippingMethod: 'standard' | 'express';
  deliveryNotes?: string;
}

export interface OrderConfirmation {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  shippingDetails: CheckoutFormData;
  estimatedDelivery: string;
}

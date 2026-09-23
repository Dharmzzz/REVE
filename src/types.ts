export interface Product {
  id: string;
  name: string;
  collection: 'Urban Essentials' | 'Trail Explorer' | 'Street Style' | 'Athletic Performance' | 'Eco Classics' | 'Digital Gift Cards';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  materials: string[];
  colors: string[];
  sizes: number[];
  inStock: boolean;
  sustainableImpact: string;
}

export interface CartItem {
  product: Product;
  size?: number | string;
  color?: string;
  quantity: number;
  giftCardDetails?: {
    recipientEmail: string;
    senderName: string;
    message: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  source?: string;
  escalated?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'Orders & Shipping' | 'Returns & Exchanges' | 'Sustainability' | 'Sizing & Care';
  question: string;
  answer: string;
}

import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // 1. Urban Essentials ($79 - $99)
  {
    id: 'ue-01',
    name: 'The Rêve Slipstream Low',
    collection: 'Urban Essentials',
    price: 89,
    originalPrice: 110,
    rating: 4.9,
    reviewsCount: 342,
    image: 'assets/product-urban-cream.jpg',
    badge: 'Best Seller',
    description: 'Minimalist everyday low-top engineered for all-day urban comfort. Breathable organic cotton canvas upper paired with a natural vulcanized rubber sole and moisture-wicking cork insole.',
    materials: ['Organic Cotton Canvas', 'Natural Tree Rubber Sole', 'Sustainably Harvested Cork Insole'],
    colors: ['Oatmeal Cream & Sage Green', 'Natural Cork'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    sustainableImpact: '6.5 kg CO2 offset • Zero virgin plastics • 1 Tree Planted'
  },
  {
    id: 'ue-02',
    name: 'Metro Canvas Cruiser',
    collection: 'Urban Essentials',
    price: 79,
    originalPrice: 95,
    rating: 4.8,
    reviewsCount: 188,
    image: 'assets/product-urban-obsidian.jpg',
    badge: 'Eco Choice',
    description: 'Clean, featherweight daily trainer in matte obsidian charcoal with raw caramel sand gum sole and reinforced eyelets. Perfect for city walks, cycling, and relaxed office wear.',
    materials: ['GOTS Certified Organic Cotton', 'Natural Sand Gum Outsole', 'Algae Bloom Foam Padding'],
    colors: ['Matte Obsidian Charcoal', 'Caramel Sand Gum'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    sustainableImpact: '8 ocean bottles diverted • 100% biodegradable upper'
  },

  // 2. Trail Explorer ($119 - $149)
  {
    id: 'te-01',
    name: 'Summit Ridge All-Terrain',
    collection: 'Trail Explorer',
    price: 139,
    originalPrice: 165,
    rating: 4.95,
    reviewsCount: 215,
    image: 'assets/product-trail-green.jpg',
    badge: 'Trail Ready',
    description: 'Rugged eco-adventure hiker featuring deep lugged outsoles made from recycled car tires, PFC-free water-resistant ripstop nylon, alpine pine styling, and amber climbing cord laces.',
    materials: ['Upcycled Ripstop Nylon', 'Recycled Tire Lug Sole', 'Organic Hemp Lining', 'PFC-Free Waterproofing'],
    colors: ['Alpine Pine & Granite Grey', 'Amber Cords'],
    sizes: [7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    inStock: true,
    sustainableImpact: '1 reclaimed car tire per 2 pairs • Water repellent without toxic fluorocarbons'
  },

  // 3. Street Style ($89 - $129)
  {
    id: 'ss-01',
    name: 'Vanguard Mycelium Retro',
    collection: 'Street Style',
    price: 119,
    originalPrice: 145,
    rating: 4.88,
    reviewsCount: 290,
    image: 'assets/product-street-mint.jpg',
    badge: 'Trending',
    description: 'Bold retro skate silhouette crafted from breakthrough mushroom mycelium leather in chalk white with mint green wave accents and natural gum outsoles.',
    materials: ['Mushroom Mycelium Bio-Leather', 'Recycled Ocean Plastic Lining', 'Sugar Cane EVA Midsole'],
    colors: ['Chalk White & Mint Green', 'Raw Gum'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    sustainableImpact: '90% lower carbon footprint than cow leather • 100% vegan'
  },
  {
    id: 'ss-02',
    name: 'Downtown Skate Low',
    collection: 'Street Style',
    price: 99,
    originalPrice: 120,
    rating: 4.79,
    reviewsCount: 175,
    image: 'assets/product-street-indigo.jpg',
    badge: 'Popular',
    description: 'Retro 90s court skate sneaker built with deep indigo denim upper, vintage cream suede panels, and honey gum rubber soles. Grippy, stylish, and durable.',
    materials: ['Post-Consumer Indigo Denim', 'Vintage Ecru Suede Accents', 'Honey Gum Rubber'],
    colors: ['Deep Indigo Blue', 'Vintage Cream', 'Honey Gum'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    sustainableImpact: 'Diverts 1.2 lbs denim textile waste from landfills'
  },

  // 4. Athletic Performance ($129 - $169)
  {
    id: 'ap-01',
    name: 'AeroPulse Bio Runner',
    collection: 'Athletic Performance',
    price: 149,
    originalPrice: 175,
    rating: 4.96,
    reviewsCount: 412,
    badge: 'Staff Pick',
    image: 'assets/product-runner-sunset.jpg',
    description: 'Ultralight performance road runner in high-energy sunset coral & electric amber. Engineered with responsive Bloom algae EVA midsoles that clean 35 gallons of fresh water per pair.',
    materials: ['Bloom Algae EVA Foam', 'Gradient Bio-Mesh', 'Castor Seed Orthotic Insole'],
    colors: ['Sunset Coral & Amber', 'Charcoal Carbon', 'Solar Tangerine'],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    inStock: true,
    sustainableImpact: 'Cleans 35 gallons of lake water • 25% lighter than petroleum foams'
  },
  {
    id: 'ap-02',
    name: 'Kinetics Cross-Trainer',
    collection: 'Athletic Performance',
    price: 159,
    originalPrice: 185,
    rating: 4.91,
    reviewsCount: 168,
    badge: 'High Energy',
    image: 'assets/product-runner-mint.jpg',
    description: 'Dynamic multidirectional cross-trainer engineered with sculpted aerodynamic Bio-Nylon mesh in crisp white and mint green, delivering explosive energy return and lateral stability.',
    materials: ['Aerodynamic Bio-Nylon Mesh', 'Sculpted Algae Bloom Midsole', 'Zero-Drop Cushioning'],
    colors: ['Crisp White & Glacier Mint'],
    sizes: [8, 8.5, 9, 9.5, 10, 10.5, 11],
    inStock: true,
    sustainableImpact: '100% closed loop recyclable at end of life'
  },

  // 5. Eco Classics ($99 - $119)
  {
    id: 'ec-01',
    name: 'Heritage Court 1974',
    collection: 'Eco Classics',
    price: 109,
    originalPrice: 130,
    rating: 4.94,
    reviewsCount: 520,
    badge: 'Iconic',
    image: 'assets/product-classic-terracotta.jpg',
    description: 'Timeless tennis court silhouette handcrafted in rich warm terracotta clay suede and crisp off-white canvas with a natural speckled cork heel tab and caramel herringbone sole.',
    materials: ['Terracotta Suede & Bio-Leather', 'Raw Cork Heel Cushion', 'Natural Caramel Latex Outsole'],
    colors: ['Warm Terracotta Clay', 'Burnt Ochre', 'Crisp Off-White'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    inStock: true,
    sustainableImpact: '100% chrome-free vegetable tanning • Recycled cotton lining'
  },

  // 6. Digital Gift Cards ($25 - $200)
  {
    id: 'gc-01',
    name: 'Rêve Digital Eco Gift Card',
    collection: 'Digital Gift Cards',
    price: 50,
    rating: 5.0,
    reviewsCount: 310,
    badge: '1 Tree Planted',
    image: 'assets/product-giftcard.jpg',
    description: 'The gift of conscious choices. Delivered immediately via email with a custom message. Never expires, zero plastic packaging, and plants a tree in your recipient\'s name.',
    materials: ['100% Digital Delivery', 'Zero Physical Packaging', 'Global Reforestation Contribution'],
    colors: ['Botanical Forest Green & Gold Digital Card'],
    sizes: [25, 50, 100, 200],
    inStock: true,
    sustainableImpact: 'Zero shipping emissions • 1 verified tree planted via One Tree Planted'
  }
];

export const COLLECTIONS = [
  'All Products',
  'Urban Essentials',
  'Trail Explorer',
  'Street Style',
  'Athletic Performance',
  'Eco Classics',
  'Digital Gift Cards'
] as const;

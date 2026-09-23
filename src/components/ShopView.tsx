import React, { useState } from 'react';
import { PRODUCTS, COLLECTIONS } from '../data/products';
import { Product, CartItem } from '../types';
import { Sparkles, Check, Gift, Search, SlidersHorizontal, ArrowRight, ShieldCheck } from 'lucide-react';

interface ShopViewProps {
  initialCollection?: string;
  onAddToCart: (item: CartItem) => void;
  onOpenChatWithQuery: (query: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialCollection = 'All Products',
  onAddToCart,
  onOpenChatWithQuery,
}) => {
  const [selectedCollection, setSelectedCollection] = useState<string>(initialCollection);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<{ [productId: string]: number }>({});
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  // Gift card state
  const [giftCardTier, setGiftCardTier] = useState<number>(50);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [giftNote, setGiftNote] = useState('');

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCollection =
      selectedCollection === 'All Products' || p.collection === selectedCollection;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCollection && matchesSearch;
  });

  const handleSizeSelect = (productId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddShoeToCart = (product: Product) => {
    if (product.collection === 'Digital Gift Cards') {
      onAddToCart({
        product: { ...product, price: giftCardTier },
        size: giftCardTier,
        color: 'Digital',
        quantity: 1,
        giftCardDetails: {
          recipientEmail: recipientEmail || 'friend@example.com',
          senderName: recipientName || 'Conscious Giver',
          message: giftNote || 'Enjoy a step toward sustainable style!',
        },
      });
      showToast(`Added $${giftCardTier} Digital Gift Card to bag!`);
      return;
    }

    const size = selectedSizes[product.id] || product.sizes[0];
    onAddToCart({
      product,
      size,
      color: product.colors[0],
      quantity: 1,
    });
    showToast(`Added ${product.name} (US ${size}) to bag!`);
  };

  const showToast = (message: string) => {
    setAddedToast(message);
    setTimeout(() => {
      setAddedToast(null);
    }, 2800);
  };

  return (
    <div className="shop-page-container">
      {/* Toast Notification */}
      {addedToast && (
        <div className="cart-toast-banner">
          <Check size={16} className="text-mint" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <section className="shop-header">
        <div className="shop-header-content">
          <span className="shop-eyebrow">Circular Footwear Collection</span>
          <h1 className="shop-title">Engineered For Earth. Made For Movement.</h1>
          <p className="shop-subtitle">
            Explore 5 specialized eco-collections crafted with zero toxic adhesives, post-consumer
            ocean plastics, harvested algae, and renewable wild rubber.
          </p>
        </div>

        {/* Collection Pricing Guide Pills */}
        <div className="collection-pricing-bar">
          <div className="pricing-tag">
            <span className="tier-name">Urban Essentials:</span> <strong>$79–$99</strong>
          </div>
          <div className="pricing-tag">
            <span className="tier-name">Trail Explorer:</span> <strong>$119–$149</strong>
          </div>
          <div className="pricing-tag">
            <span className="tier-name">Street Style:</span> <strong>$89–$129</strong>
          </div>
          <div className="pricing-tag">
            <span className="tier-name">Athletic Performance:</span> <strong>$129–$169</strong>
          </div>
          <div className="pricing-tag">
            <span className="tier-name">Eco Classics:</span> <strong>$99–$119</strong>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="shop-controls-bar">
        <div className="collection-pills-scroll">
          {COLLECTIONS.map((c) => (
            <button
              key={c}
              className={`filter-pill ${selectedCollection === c ? 'is-active' : ''}`}
              onClick={() => setSelectedCollection(c)}
            >
              {c === 'Digital Gift Cards' && <Gift size={14} className="mr-1" />}
              {c}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-field"
            placeholder="Search materials, styles, or specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => {
          const isGiftCard = product.collection === 'Digital Gift Cards';
          const currentSize = selectedSizes[product.id] || (isGiftCard ? giftCardTier : product.sizes[0]);

          return (
            <div key={product.id} className="minimal-product-card">
              <div
                className="card-media-wrapper"
                onClick={() => setActiveProductModal(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card-image"
                  loading="lazy"
                />
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
                <span className="product-collection-chip">{product.collection}</span>
              </div>

              <div className="card-info">
                <div className="card-title-row">
                  <h3
                    className="product-card-title"
                    onClick={() => setActiveProductModal(product)}
                  >
                    {product.name}
                  </h3>
                  <div className="product-price-wrapper">
                    <span className="product-price">${isGiftCard ? giftCardTier : product.price}</span>
                    {product.originalPrice && (
                      <span className="product-original-price">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <p className="product-card-desc">{product.description}</p>

                {/* Material tags */}
                <div className="materials-tags-row">
                  {product.materials.map((m, idx) => (
                    <span key={idx} className="material-tag">
                      {m}
                    </span>
                  ))}
                </div>

                {/* Size or Tier Selector */}
                <div className="size-selector-row">
                  <span className="size-label">
                    {isGiftCard ? 'Select Tier:' : 'Select US Size:'}
                  </span>
                  <div className="sizes-pill-group">
                    {isGiftCard ? (
                      [25, 50, 100, 200].map((tier) => (
                        <button
                          key={tier}
                          className={`size-pill-btn ${giftCardTier === tier ? 'active' : ''}`}
                          onClick={() => setGiftCardTier(tier)}
                        >
                          ${tier}
                        </button>
                      ))
                    ) : (
                      product.sizes.map((s) => (
                        <button
                          key={s}
                          className={`size-pill-btn ${currentSize === s ? 'active' : ''}`}
                          onClick={() => handleSizeSelect(product.id, s)}
                        >
                          {s}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                <div className="impact-snippet">
                  <Sparkles size={13} className="text-forest" />
                  <span>{product.sustainableImpact}</span>
                </div>

                {/* Add to Cart Actions */}
                <div className="card-action-row">
                  <button
                    className="btn-minimal btn-minimal-primary w-full"
                    onClick={() => handleAddShoeToCart(product)}
                  >
                    {isGiftCard ? `Add $${giftCardTier} Gift Card` : `Add to Bag • $${product.price}`}
                  </button>
                  <button
                    className="btn-minimal btn-minimal-outline quick-view-btn"
                    onClick={() => setActiveProductModal(product)}
                    title="View Details"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="empty-search-state">
          <p>No eco-footwear matched your query "{searchQuery}".</p>
          <button
            className="btn-minimal btn-minimal-outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCollection('All Products');
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Dedicated Digital Gift Card Spotlight */}
      <section className="gift-card-spotlight-section">
        <div className="gift-card-spotlight-card">
          <div className="spotlight-left">
            <span className="spotlight-badge">Conscious Gifting</span>
            <h2 className="spotlight-title">Rêve Digital Eco Gift Card</h2>
            <p className="spotlight-text">
              Zero packaging waste. Instant inbox delivery. Never expires. Plus, 1 tree is planted
              globally with every gift card purchased.
            </p>
            <div className="gift-tier-picker">
              {[25, 50, 100, 200].map((tier) => (
                <button
                  key={tier}
                  className={`gift-tier-btn ${giftCardTier === tier ? 'is-selected' : ''}`}
                  onClick={() => setGiftCardTier(tier)}
                >
                  ${tier}
                </button>
              ))}
            </div>
            <div className="gift-form-fields">
              <input
                type="email"
                placeholder="Recipient's Email Address"
                className="minimal-input"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Personal Note (optional)"
                className="minimal-input"
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
              />
            </div>
            <button
              className="btn-minimal btn-minimal-primary spotlight-cta"
              onClick={() => {
                const gcProduct = PRODUCTS.find((p) => p.collection === 'Digital Gift Cards')!;
                onAddToCart({
                  product: { ...gcProduct, price: giftCardTier },
                  size: giftCardTier,
                  color: 'Digital Certificate',
                  quantity: 1,
                  giftCardDetails: {
                    recipientEmail: recipientEmail || 'friend@example.com',
                    senderName: recipientName || 'Thoughtful Friend',
                    message: giftNote || 'Enjoy a step toward sustainable style!',
                  },
                });
                showToast(`Added $${giftCardTier} Digital Gift Card to your bag!`);
              }}
            >
              <Gift size={16} /> Send ${giftCardTier} Digital Gift Card
            </button>
          </div>
          <div className="spotlight-right">
            <div className="virtual-card-preview">
              <div className="vc-brand">Rêve Eco</div>
              <div className="vc-amount">${giftCardTier}</div>
              <div className="vc-tagline">1 Card = 1 Tree Planted</div>
              <div className="vc-code">REVE-GIFT-••••-2025</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {activeProductModal && (
        <div className="modal-backdrop" onClick={() => setActiveProductModal(null)}>
          <div className="minimal-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-tag">{activeProductModal.collection}</span>
              <button
                className="modal-close-btn"
                onClick={() => setActiveProductModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-body-grid">
              <div className="modal-media">
                <img src={activeProductModal.image} alt={activeProductModal.name} />
              </div>
              <div className="modal-details">
                <h2 className="modal-title">{activeProductModal.name}</h2>
                <div className="modal-price">${activeProductModal.price}</div>
                <p className="modal-desc">{activeProductModal.description}</p>

                <div className="modal-section">
                  <h4 className="modal-subheading">Sustainable Materials</h4>
                  <ul className="modal-materials-list">
                    {activeProductModal.materials.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4 className="modal-subheading">Environmental Impact</h4>
                  <p className="modal-impact-text">{activeProductModal.sustainableImpact}</p>
                </div>

                <div className="modal-section">
                  <h4 className="modal-subheading">Available Colors</h4>
                  <div className="modal-colors-row">
                    {activeProductModal.colors.map((c, i) => (
                      <span key={i} className="color-chip">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-footer-cta">
                  <button
                    className="btn-minimal btn-minimal-primary w-full"
                    onClick={() => {
                      handleAddShoeToCart(activeProductModal);
                      setActiveProductModal(null);
                    }}
                  >
                    Add to Bag • ${activeProductModal.price}
                  </button>
                  <button
                    className="btn-minimal btn-minimal-outline w-full"
                    onClick={() => {
                      onOpenChatWithQuery(`Tell me more about ${activeProductModal.name} and the ${activeProductModal.collection} collection.`);
                      setActiveProductModal(null);
                    }}
                  >
                    Ask AI Assistant About This Shoe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

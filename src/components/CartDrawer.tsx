import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, Gift } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 75;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <h3>Your Eco Bag</h3>
            <span className="cart-count-sub">({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
          </div>
          <button className="cart-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="free-shipping-meter">
          <div className="meter-label">
            {isFreeShipping ? (
              <span className="text-forest font-semibold">🎉 You unlocked FREE US Carbon-Neutral Shipping!</span>
            ) : (
              <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for FREE Shipping</span>
            )}
          </div>
          <div className="meter-bar-track">
            <div
              className="meter-bar-fill"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="cart-items-scroll">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <p>Your eco bag is currently empty.</p>
              <button className="btn-minimal btn-minimal-primary mt-3" onClick={onClose}>
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="cart-item-row">
                <div className="cart-item-img-wrap">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <h4 className="cart-item-name">{item.product.name}</h4>
                    <button
                      className="cart-item-remove"
                      onClick={() => onRemoveItem(idx)}
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="cart-item-meta">
                    {item.product.collection === 'Digital Gift Cards' ? (
                      <span className="text-mint font-medium flex items-center gap-1">
                        <Gift size={12} /> Email Delivery
                      </span>
                    ) : (
                      <span>Size: US {item.size} • {item.color}</span>
                    )}
                  </div>

                  {item.giftCardDetails && (
                    <div className="gift-card-cart-sub">
                      <span>To: {item.giftCardDetails.recipientEmail}</span>
                    </div>
                  )}

                  <div className="cart-item-bottom">
                    <div className="qty-stepper">
                      <button
                        onClick={() => onUpdateQuantity(idx, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={13} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(idx, 1)}>
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="cart-item-price">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span className="summary-price">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Shipping</span>
              <span className="summary-shipping">
                {isFreeShipping ? 'FREE' : '$6.00'}
              </span>
            </div>
            <div className="cart-eco-perk">
              <ShieldCheck size={14} className="text-forest" />
              <span>Includes 60-Day Free Trial & Carbon Offset</span>
            </div>

            {checkoutComplete ? (
              <div className="checkout-success-banner">
                <CheckCircle2 size={24} className="text-forest" />
                <span>Thank you! Your demo order has been placed.</span>
              </div>
            ) : (
              <button
                className="btn-minimal btn-minimal-primary w-full checkout-action-btn"
                onClick={handleCheckout}
              >
                <span>Proceed to Checkout • ${(subtotal + (isFreeShipping ? 0 : 6)).toFixed(2)}</span>
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

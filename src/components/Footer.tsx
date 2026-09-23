import React, { useState } from 'react';
import { ArrowRight, Leaf, ShieldCheck, Heart, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, filter?: string) => void;
  onOpenChatWithQuery: (query: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenChatWithQuery }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="minimal-footer">
      <div className="footer-top-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="logo-symbol">R</span>
            <span className="logo-text">êve Eco</span>
          </div>
          <p className="footer-bio">
            Pioneering circular footwear. Zero virgin plastics, zero toxic glues, and carbon-neutral
            steps designed for the mindful modern lifestyle.
          </p>
          <div className="footer-trust-pills">
            <span className="trust-chip"><Leaf size={12} /> PETA-Approved Vegan</span>
            <span className="trust-chip"><ShieldCheck size={12} /> 60-Day Trial</span>
          </div>
        </div>

        {/* 5 Collections Links */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Collections</h4>
          <ul>
            <li>
              <button onClick={() => onNavigate('shop', 'Urban Essentials')}>
                Urban Essentials ($79–$99)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', 'Trail Explorer')}>
                Trail Explorer ($119–$149)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', 'Street Style')}>
                Street Style ($89–$129)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', 'Athletic Performance')}>
                Athletic Performance ($129–$169)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', 'Eco Classics')}>
                Eco Classics ($99–$119)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('shop', 'Digital Gift Cards')}>
                Digital Gift Cards ($25–$200)
              </button>
            </li>
          </ul>
        </div>

        {/* Sustainability & Story Links */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Sustainability</h4>
          <ul>
            <li>
              <button onClick={() => onNavigate('about')}>Our Genesis & Story</button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')}>2025 Commitments (1M Trees)</button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')}>Bloom Algae & Mycelium</button>
            </li>
            <li>
              <button onClick={() => onOpenChatWithQuery('What is the carbon footprint of your shoes?')}>
                Carbon Footprint Report
              </button>
            </li>
            <li>
              <button onClick={() => onOpenChatWithQuery('Tell me about your recycling and takeback program')}>
                Circular Takeback Program
              </button>
            </li>
          </ul>
        </div>

        {/* Help & Support Links */}
        <div className="footer-nav-col">
          <h4 className="footer-heading">Care & Support</h4>
          <ul>
            <li>
              <button onClick={() => onNavigate('help')}>60-Day Trial & Returns</button>
            </li>
            <li>
              <button onClick={() => onNavigate('help')}>Shipping Rates & Timelines</button>
            </li>
            <li>
              <button onClick={() => onNavigate('help')}>Sizing & Care Guide</button>
            </li>
            <li>
              <button onClick={() => onNavigate('help')}>Contact Human Support</button>
            </li>
            <li>
              <button onClick={() => onOpenChatWithQuery('How do I contact customer support?')}>
                24/7 AI Assistance
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="footer-newsletter-col">
          <h4 className="footer-heading">Stay Connected</h4>
          <p className="newsletter-desc">
            Receive clean updates on new seasonal drops, tree planting counts, and zero-waste initiatives.
          </p>
          {subscribed ? (
            <div className="newsletter-success">
              <Check size={16} /> Thank you for joining our movement!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>
          )}
          <span className="newsletter-privacy">We respect your inbox. Unsubscribe at any time.</span>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p className="copyright-text">
          © {new Date().getFullYear()} Rêve Eco Inc. All rights reserved. Walk softly, leave no trace.
        </p>
        <div className="bottom-badges">
          <span>Carbon-Neutral Verified</span>
          <span>•</span>
          <span>Fair Labor Audited</span>
          <span>•</span>
          <span>PETA Approved</span>
        </div>
      </div>
    </footer>
  );
};

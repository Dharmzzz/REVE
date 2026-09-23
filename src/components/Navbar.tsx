import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquare, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, filter?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenChat,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnchorClick = (anchorId: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="navbar-pill">
        <button
          className="brand-logo"
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span className="logo-symbol">R</span>
          <span className="logo-text">êve Eco</span>
        </button>

        <div className="nav-links desktop-only">
          <button
            className={`nav-link-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className="nav-link-btn"
            onClick={() => handleAnchorClick('mission')}
          >
            Mission
          </button>
          <button
            className="nav-link-btn"
            onClick={() => handleAnchorClick('lifestyle')}
          >
            Lifestyle
          </button>
          <button
            className="nav-link-btn"
            onClick={() => handleAnchorClick('impact')}
          >
            Impact
          </button>
          <button
            className="nav-link-btn"
            onClick={() => handleAnchorClick('community')}
          >
            Community
          </button>
          <button
            className="nav-link-btn"
            onClick={() => handleAnchorClick('product')}
          >
            Product
          </button>
          <button
            className={`nav-link-btn ${currentView === 'shop' ? 'active' : ''}`}
            onClick={() => onNavigate('shop')}
          >
            Shop (5 Lines)
          </button>
          <button
            className={`nav-link-btn ${currentView === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            Sustainability
          </button>
          <button
            className={`nav-link-btn ${currentView === 'help' ? 'active' : ''}`}
            onClick={() => onNavigate('help')}
          >
            Help & FAQ
          </button>
        </div>

        <div className="nav-actions">
          <button
            className="action-btn chat-trigger-btn"
            onClick={onOpenChat}
            title="Ask AI Eco Assistant"
          >
            <Sparkles size={16} className="text-mint animate-pulse" />
            <span className="action-text">Ask AI</span>
          </button>

          <button
            className="action-btn cart-btn"
            onClick={onOpenCart}
            title="View Cart"
            aria-label="View Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          <button
            className="mobile-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="logo-text">Rêve Eco</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="mobile-nav-links">
              <button
                className={`mobile-nav-btn ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
              >
                Home
              </button>
              <button
                className="mobile-nav-btn"
                onClick={() => {
                  handleAnchorClick('mission');
                  setMobileMenuOpen(false);
                }}
              >
                Mission
              </button>
              <button
                className="mobile-nav-btn"
                onClick={() => {
                  handleAnchorClick('lifestyle');
                  setMobileMenuOpen(false);
                }}
              >
                Lifestyle
              </button>
              <button
                className="mobile-nav-btn"
                onClick={() => {
                  handleAnchorClick('impact');
                  setMobileMenuOpen(false);
                }}
              >
                Impact
              </button>
              <button
                className="mobile-nav-btn"
                onClick={() => {
                  handleAnchorClick('community');
                  setMobileMenuOpen(false);
                }}
              >
                Community
              </button>
              <button
                className="mobile-nav-btn"
                onClick={() => {
                  handleAnchorClick('product');
                  setMobileMenuOpen(false);
                }}
              >
                Product
              </button>
              <button
                className={`mobile-nav-btn ${currentView === 'shop' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('shop');
                  setMobileMenuOpen(false);
                }}
              >
                Shop (5 Lines)
              </button>
              <button
                className={`mobile-nav-btn ${currentView === 'about' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('about');
                  setMobileMenuOpen(false);
                }}
              >
                Sustainability & Story
              </button>
              <button
                className={`mobile-nav-btn ${currentView === 'help' ? 'active' : ''}`}
                onClick={() => {
                  onNavigate('help');
                  setMobileMenuOpen(false);
                }}
              >
                Help & FAQ
              </button>
            </div>
            <div className="mobile-menu-footer">
              <button
                className="btn-minimal btn-minimal-primary w-full"
                onClick={() => {
                  onOpenChat();
                  setMobileMenuOpen(false);
                }}
              >
                <Sparkles size={16} /> Open Chat Assistant
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

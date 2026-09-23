import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { AboutView } from './components/AboutView';
import { HelpView } from './components/HelpView';
import { CartDrawer } from './components/CartDrawer';
import { ChatWidget } from './components/ChatWidget';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { CartItem } from './types';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'about' | 'help'>('home');
  const [shopFilter, setShopFilter] = useState<string>('All Products');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalChatQuery, setExternalChatQuery] = useState<string | null>(null);

  const handleNavigate = (view: string, filter?: string) => {
    setCurrentView(view as any);
    if (filter) {
      setShopFilter(filter);
    } else {
      setShopFilter('All Products');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === newItem.product.id && i.size === newItem.size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenChatWithQuery = (query: string) => {
    setExternalChatQuery(query);
    setIsChatOpen(true);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Main Views */}
      <main className="main-content">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenChatWithQuery={handleOpenChatWithQuery}
            onAddToCartDirect={(prodId) => {
              const p = PRODUCTS.find((item) => item.id === prodId) || PRODUCTS[0];
              handleAddToCart({
                product: p,
                size: p.sizes[0],
                color: p.colors[0],
                quantity: 1,
              });
              setIsCartOpen(true);
            }}
          />
        )}

        {currentView === 'shop' && (
          <ShopView
            initialCollection={shopFilter}
            onAddToCart={handleAddToCart}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            onExploreShop={() => handleNavigate('shop')}
            onOpenChatWithQuery={handleOpenChatWithQuery}
          />
        )}

        {currentView === 'help' && (
          <HelpView onOpenChatWithQuery={handleOpenChatWithQuery} />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Interactive AI Chatbot Widget */}
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        externalQuery={externalChatQuery}
        onClearExternalQuery={() => setExternalChatQuery(null)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenChatWithQuery={handleOpenChatWithQuery}
      />
    </div>
  );
};

export default App;

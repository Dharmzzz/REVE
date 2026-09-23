import React, { useState, useEffect } from 'react';
import { ArrowRight, Recycle, Leaf, Trees, Droplets, Globe, Sprout, BookOpen, Check, ShieldCheck, RefreshCw, Sparkles, Send } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string, filter?: string) => void;
  onOpenChatWithQuery: (query: string) => void;
  onAddToCartDirect: (productId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenChatWithQuery,
  onAddToCartDirect,
}) => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Counter animation state
  const [treesCount, setTreesCount] = useState(0);
  const [waterCount, setWaterCount] = useState(0);
  const [co2Count, setCo2Count] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;

    const timer = setInterval(() => {
      start++;
      const progress = Math.min(start / steps, 1);
      setTreesCount(Math.floor(progress * 50000));
      setWaterCount(Math.floor(progress * 1200000));
      setCo2Count(Math.floor(progress * 750));

      if (progress >= 1) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSuccess(false);
      }, 4000);
    }
  };

  return (
    <div className="home-view-wrapper">
      {/* ===== 1. VIDEO HERO SECTION ===== */}
      <section className="video-hero" id="hero">
        <video
          className="video-hero-bg"
          autoPlay
          muted
          loop
          playsInline
          poster="assets/shoes2.jpg"
        >
          <source src="assets/hrovid.mp4" type="video/mp4" />
          <source src="hero.mp4" type="video/mp4" />
        </video>

        {/* Subtle overlays for text legibility */}
        <div className="video-hero-overlay video-hero-overlay--base" />
        <div className="video-hero-overlay video-hero-overlay--gradient" />
        <div className="video-hero-overlay video-hero-overlay--vignette" />
        <div className="video-hero-overlay video-hero-overlay--glow" />

        {/* Centered hero content */}
        <div className="video-hero-content">
          <span className="video-hero-eyebrow">
            <Check size={12} className="eyebrow-icon" /> Steps That Count
          </span>
          <h1 className="video-hero-title">Walk your values</h1>
          <p className="video-hero-subtext">
            Sustainable sneakers designed for style, comfort, and the planet.
            Every step creates measurable impact.
          </p>
          <div className="video-hero-buttons">
            <button
              className="vhero-btn vhero-btn--primary"
              onClick={() => onNavigate('shop')}
            >
              Shop Now
            </button>
            <a href="#impact" className="vhero-btn vhero-btn--outline">
              See Impact
            </a>
          </div>
        </div>

        {/* Partner/Sustainability strip */}
        <div className="video-hero-partners">
          <p className="partners-label">Trusted by teams focused on</p>
          <div className="partners-logos">
            <span>Patagonia</span>
            <span>Allbirds</span>
            <span>Veja</span>
            <span>Rothy's</span>
            <span>Everlane</span>
          </div>
        </div>

        <div className="hero-scroll-indicator" id="scrollIndicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ===== 2. MISSION SECTION ===== */}
      <section className="mission" id="mission">
        <div className="mission-container">
          <div className="mission-image">
            <img
              src="assets/shoes3.jpg"
              alt="Steps That Count campaign poster — sneaker on moss"
            />
          </div>
          <div className="mission-text">
            <p className="section-eyebrow">Our Mission</p>
            <h2 className="section-title">
              Steps That Count<br />
              <span className="text-accent">For a Healthy Planet</span>
            </h2>
            <p className="mission-description">
              At Rêve Eco, we believe footwear should leave a positive footprint.
              Every pair is crafted from recycled ocean plastics, organic cotton, and
              plant-based materials — without sacrificing the style and comfort your
              generation demands.
            </p>
            <p className="mission-description">
              From recycled material uppers to cork and natural rubber soles, every
              component is chosen to minimize environmental impact while maximizing
              performance and aesthetics.
            </p>
            <div className="mission-tags">
              <span className="tag"><Recycle size={14} className="tag-icon" /> Recycled Materials</span>
              <span className="tag"><Leaf size={14} className="tag-icon" /> Plant-Based Soles</span>
              <span className="tag"><Trees size={14} className="tag-icon" /> Sustainable Leather</span>
              <span className="tag"><Droplets size={14} className="tag-icon" /> Water Conscious</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. LIFESTYLE SECTION ===== */}
      <section className="lifestyle" id="lifestyle">
        <div className="lifestyle-parallax">
          <img
            src="assets/shoes2.jpg"
            alt="Lifestyle street shot — young person walking through urban environment"
            className="parallax-img"
          />
        </div>
        <div className="lifestyle-overlay">
          <div className="lifestyle-content">
            <h2 className="lifestyle-title">Walk the Talk</h2>
            <p className="lifestyle-subtitle">
              Real style. Real streets. Real impact.<br />
              Made for the generation that walks its values.
            </p>
          </div>
        </div>
      </section>

      {/* ===== 4. IMPACT STATS SECTION ===== */}
      <section className="impact" id="impact">
        <div className="impact-container">
          <div className="impact-header">
            <p className="section-eyebrow">Our Impact</p>
            <h2 className="section-title">
              Walk the Talk<br />
              <span className="text-accent">For a Healthier Planet</span>
            </h2>
          </div>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon"><Trees size={28} /></div>
              <div className="impact-number">{treesCount.toLocaleString()}+</div>
              <p className="impact-label">Trees Planted</p>
              <p className="impact-detail">
                Through our reforestation partners across 12 countries
              </p>
            </div>
            <div className="impact-card">
              <div className="impact-icon"><Droplets size={28} /></div>
              <div className="impact-number">{waterCount.toLocaleString()}</div>
              <p className="impact-label">Liters of Water Saved</p>
              <p className="impact-detail">
                Compared to conventional shoe manufacturing processes
              </p>
            </div>
            <div className="impact-card">
              <div className="impact-icon"><Globe size={28} /></div>
              <div className="impact-number">{co2Count.toLocaleString()}</div>
              <p className="impact-label">Tons of CO₂ Offset</p>
              <p className="impact-detail">
                Carbon neutral operations since day one of production
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5. COMMUNITY SECTION ===== */}
      <section className="community" id="community">
        <div className="community-bg">
          <img
            src="assets/shoes5.jpg"
            alt="Full campaign poster — Every Step Shapes Tomorrow"
          />
        </div>
        <div className="community-overlay" />
        <div className="community-content">
          <p className="section-eyebrow section-eyebrow--light">The Movement</p>
          <h2 className="community-title">Every Step Shapes Tomorrow</h2>
          <p className="community-subtitle">
            Join a community of changemakers. Skaters, activists, dreamers — united
            by the belief that what you wear can change the world.
          </p>
          <button
            className="btn btn-primary btn-glow"
            onClick={() => onNavigate('shop')}
          >
            Join the Movement
          </button>
        </div>
      </section>

      {/* ===== 6. PRODUCT FEATURES SECTION WITH INTERACTIVE TOOLTIPS ===== */}
      <section className="product" id="product">
        <div className="product-container">
          <div className="product-image">
            <img
              src="assets/product-urban-cream.jpg"
              alt="Rêve Eco Slipstream Low — cream canvas with sage green accents and cork speckled sole"
            />
          </div>
          <div className="product-details">
            <p className="section-eyebrow">The Shoe</p>
            <h2 className="section-title">
              Crafted with Purpose.<br />
              <span className="text-accent">Designed for You.</span>
            </h2>
            <div className="features-list">
              {/* Feature 1 */}
              <div
                className={`feature-item ${activeTooltip === 1 ? 'has-tooltip-open is-expanded' : ''}`}
                onMouseEnter={() => setActiveTooltip(1)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 1 ? null : 1)}
              >
                <div className="feature-item-header">
                  <div className="feature-icon"><Recycle size={20} /></div>
                  <div className="feature-item-heading">
                    <h3 className="feature-title">Recycled Mesh Upper</h3>
                    <p className="feature-desc">
                      Made from 12 recycled plastic bottles, breathable and lightweight.
                    </p>
                  </div>
                </div>

                {/* In-flow expandable description box */}
                <div className={`feature-expand-drawer ${activeTooltip === 1 ? 'is-open' : ''}`}>
                  <div className="expand-drawer-inner">
                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Leaf size={14} className="text-forest" /> How the Materials Were Acquired
                      </h5>
                      <p className="drawer-text">
                        Post-consumer plastic bottles are intercepted from ocean coastlines and waterways, cleaned, shredded into micro-flakes, and melted into fine polyester yarn. The yarn is precision-knitted into a breathable, high-tensile mesh upper. Each pair directly diverts 12 plastic bottles from marine ecosystems.
                      </p>
                    </div>

                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Globe size={14} className="text-forest" /> Environmental Impact
                      </h5>
                      <p className="drawer-text">
                        Reduces petroleum reliance by 75% compared to virgin synthetic polyester, eliminates 2.5 kg of greenhouse CO₂ emissions per shoe, and prevents discarded plastic from deteriorating into dangerous ocean microplastics.
                      </p>
                    </div>

                    <div className="drawer-badges-row">
                      <span className="drawer-pill">12 Ocean Bottles Diverted</span>
                      <span className="drawer-pill">75% Less Petroleum</span>
                      <span className="drawer-pill">-2.5 kg CO₂</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div
                className={`feature-item ${activeTooltip === 2 ? 'has-tooltip-open is-expanded' : ''}`}
                onMouseEnter={() => setActiveTooltip(2)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 2 ? null : 2)}
              >
                <div className="feature-item-header">
                  <div className="feature-icon"><Sprout size={20} /></div>
                  <div className="feature-item-heading">
                    <h3 className="feature-title">Plant-Based Sole</h3>
                    <p className="feature-desc">
                      Natural rubber and cork composite. Grippy, durable, and biodegradable.
                    </p>
                  </div>
                </div>

                {/* In-flow expandable description box */}
                <div className={`feature-expand-drawer ${activeTooltip === 2 ? 'is-open' : ''}`}>
                  <div className="expand-drawer-inner">
                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Trees size={14} className="text-forest" /> How the Materials Were Acquired
                      </h5>
                      <p className="drawer-text">
                        Tapped responsibly from wild Amazonian Hevea rubber trees using non-destructive tapping incisions, blended with renewable cork oak bark hand-stripped in Portugal without felling trees (the bark naturally regenerates every 9 years), and bonded with natural latex binders.
                      </p>
                    </div>

                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Globe size={14} className="text-forest" /> Environmental Impact
                      </h5>
                      <p className="drawer-text">
                        100% biodegradable and non-toxic within 10 years at end-of-life. Periodic cork harvesting actually stimulates cork oak forests to absorb 3–5× more carbon dioxide. Leaves zero petroleum synthetic rubbers or persistent microplastics in runoff water.
                      </p>
                    </div>

                    <div className="drawer-badges-row">
                      <span className="drawer-pill">100% Biodegradable</span>
                      <span className="drawer-pill">3–5× CO₂ Sequestered</span>
                      <span className="drawer-pill">Zero Petroleum Rubber</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div
                className={`feature-item ${activeTooltip === 3 ? 'has-tooltip-open is-expanded' : ''}`}
                onMouseEnter={() => setActiveTooltip(3)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 3 ? null : 3)}
              >
                <div className="feature-item-header">
                  <div className="feature-icon"><Leaf size={20} /></div>
                  <div className="feature-item-heading">
                    <h3 className="feature-title">Sustainable Bio-Leather Trim</h3>
                    <p className="feature-desc">
                      Vegetable-tanned and apple bio-leather accents in natural earthy tones.
                    </p>
                  </div>
                </div>

                {/* In-flow expandable description box */}
                <div className={`feature-expand-drawer ${activeTooltip === 3 ? 'is-open' : ''}`}>
                  <div className="expand-drawer-inner">
                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Sparkles size={14} className="text-forest" /> How the Materials Were Acquired
                      </h5>
                      <p className="drawer-text">
                        Upcycled from regional industrial apple juice pomace (discarded peels and cores that would otherwise emit methane in landfills), combined with vegetable-tanned accents treated with ancient organic tree bark tannins (mimosa and chestnut) rather than hazardous chemical chromium salts.
                      </p>
                    </div>

                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Globe size={14} className="text-forest" /> Environmental Impact
                      </h5>
                      <p className="drawer-text">
                        Eliminates 90% of toxic chemical wastewater produced by conventional chrome leather tanning. Wastewater is fully biodegradable, saves 40% freshwater during processing, and upcycles food industry waste into high-durability luxury footwear.
                      </p>
                    </div>

                    <div className="drawer-badges-row">
                      <span className="drawer-pill">Zero Chromium Toxins</span>
                      <span className="drawer-pill">Upcycled Apple Waste</span>
                      <span className="drawer-pill">40% Less Water</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div
                className={`feature-item ${activeTooltip === 4 ? 'has-tooltip-open is-expanded' : ''}`}
                onMouseEnter={() => setActiveTooltip(4)}
                onMouseLeave={() => setActiveTooltip(null)}
                onClick={() => setActiveTooltip(activeTooltip === 4 ? null : 4)}
              >
                <div className="feature-item-header">
                  <div className="feature-icon"><BookOpen size={20} /></div>
                  <div className="feature-item-heading">
                    <h3 className="feature-title">Organic Cotton Lining</h3>
                    <p className="feature-desc">
                      GOTS-certified organic cotton interior for plush all-day comfort.
                    </p>
                  </div>
                </div>

                {/* In-flow expandable description box */}
                <div className={`feature-expand-drawer ${activeTooltip === 4 ? 'is-open' : ''}`}>
                  <div className="expand-drawer-inner">
                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Droplets size={14} className="text-forest" /> How the Materials Were Acquired
                      </h5>
                      <p className="drawer-text">
                        Sourced directly from GOTS-certified fair-trade organic farming cooperatives grown entirely without synthetic pesticides, chemical fertilizers, or GMO seeds. Hand-picked to preserve fiber softness and spun with low-impact botanical plant dyes.
                      </p>
                    </div>

                    <div className="drawer-subblock">
                      <h5 className="drawer-subheading">
                        <Globe size={14} className="text-forest" /> Environmental Impact
                      </h5>
                      <p className="drawer-text">
                        Uses 91% less freshwater and 62% less energy than conventional industrial cotton farming. Protects groundwater from toxic pesticide runoff, safeguards farmworker health, and sequesters up to 0.5 tonnes of carbon dioxide per hectare annually.
                      </p>
                    </div>

                    <div className="drawer-badges-row">
                      <span className="drawer-pill">GOTS Certified Organic</span>
                      <span className="drawer-pill">91% Less Freshwater</span>
                      <span className="drawer-pill">Zero Toxic Pesticides</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => onNavigate('shop')}
            >
              Shop The Collections — From $79
            </button>
          </div>
        </div>
      </section>

      {/* ===== 7. ALL 5 COLLECTIONS SHOWCASE (WITH NEW DIVERSE COLORWAYS) ===== */}
      <section className="home-collections-showcase">
        <div className="section-head text-center">
          <span className="section-tag">Diverse Colorways & Specialized Lines</span>
          <h2 className="section-heading">5 Collections Built For Your Lifestyle</h2>
          <p className="section-desc">
            Explore diverse natural colorways — from warm terracotta and deep indigo to sunset coral and obsidian charcoal.
          </p>
        </div>

        <div className="collections-showcase-grid">
          {/* Collection 1 */}
          <div
            className="showcase-card"
            onClick={() => onNavigate('shop', 'Urban Essentials')}
          >
            <div className="showcase-img-wrap">
              <img src="assets/product-urban-cream.jpg" alt="Urban Essentials Cream & Sage" />
              <span className="colorway-tag">Oatmeal Cream & Sage</span>
            </div>
            <div className="showcase-info">
              <span className="showcase-price">$79 – $99</span>
              <h3>Urban Essentials</h3>
              <p>Breathable organic cotton canvas with natural speckled cork soles.</p>
            </div>
          </div>

          {/* Collection 2 */}
          <div
            className="showcase-card"
            onClick={() => onNavigate('shop', 'Eco Classics')}
          >
            <div className="showcase-img-wrap">
              <img src="assets/product-classic-terracotta.jpg" alt="Eco Classics Warm Terracotta" />
              <span className="colorway-tag">Warm Terracotta & Cork</span>
            </div>
            <div className="showcase-info">
              <span className="showcase-price">$99 – $119</span>
              <h3>Eco Classics</h3>
              <p>Heritage court sneaker in rich clay suede with caramel latex outsoles.</p>
            </div>
          </div>

          {/* Collection 3 */}
          <div
            className="showcase-card"
            onClick={() => onNavigate('shop', 'Athletic Performance')}
          >
            <div className="showcase-img-wrap">
              <img src="assets/product-runner-sunset.jpg" alt="Athletic Performance Sunset Coral" />
              <span className="colorway-tag">Sunset Coral & Amber</span>
            </div>
            <div className="showcase-info">
              <span className="showcase-price">$129 – $169</span>
              <h3>Athletic Performance</h3>
              <p>High-energy road runner powered by fresh water-cleaning Bloom algae foam.</p>
            </div>
          </div>

          {/* Collection 4 */}
          <div
            className="showcase-card"
            onClick={() => onNavigate('shop', 'Street Style')}
          >
            <div className="showcase-img-wrap">
              <img src="assets/product-street-indigo.jpg" alt="Street Style Deep Indigo" />
              <span className="colorway-tag">Deep Indigo & Honey Gum</span>
            </div>
            <div className="showcase-info">
              <span className="showcase-price">$89 – $129</span>
              <h3>Street Style</h3>
              <p>Retro 90s court skate sneaker made from upcycled denim and vulcanized gum.</p>
            </div>
          </div>

          {/* Collection 5 */}
          <div
            className="showcase-card"
            onClick={() => onNavigate('shop', 'Trail Explorer')}
          >
            <div className="showcase-img-wrap">
              <img src="assets/product-trail-green.jpg" alt="Trail Explorer Pine & Granite" />
              <span className="colorway-tag">Alpine Pine & Granite</span>
            </div>
            <div className="showcase-info">
              <span className="showcase-price">$119 – $149</span>
              <h3>Trail Explorer</h3>
              <p>Rugged eco-hiker with deep lugged recycled tire soles and amber cords.</p>
            </div>
          </div>

          {/* Collection 6: Minimalist Obsidian */}
          <div
            className="showcase-card"
            onClick={() => onNavigate('shop', 'Urban Essentials')}
          >
            <div className="showcase-img-wrap">
              <img src="assets/product-urban-obsidian.jpg" alt="Metro Cruiser Obsidian Charcoal" />
              <span className="colorway-tag">Obsidian Charcoal & Sand</span>
            </div>
            <div className="showcase-info">
              <span className="showcase-price">$79 – $99</span>
              <h3>Metro Cruiser</h3>
              <p>Low-profile city trainer in matte obsidian with raw caramel sand soles.</p>
            </div>
          </div>
        </div>

        <div className="showcase-cta-bar">
          <button
            className="btn-minimal btn-minimal-primary"
            onClick={() => onNavigate('shop')}
          >
            <span>Explore All Footwear In Shop</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ===== 8. CTA / NEWSLETTER SECTION ===== */}
      <section className="cta" id="cta">
        <div className="cta-container">
          <div className="cta-image">
            <img
              src="assets/shoes6.jpg"
              alt="Minimalist poster — Steps That Count"
            />
          </div>
          <div className="cta-content">
            <h2 className="cta-title">Walk Your Values</h2>
            <p className="cta-subtitle">
              Be the first to know about new drops, sustainability stories, and
              exclusive offers. No spam — just steps that count.
            </p>
            {newsletterSuccess ? (
              <div className="newsletter-success-box">
                <Check size={20} className="text-forest" />
                <span>Thank you! A tree has been planted in your honor.</span>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleNewsletterSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="form-input"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary btn-form">
                    Join Us
                  </button>
                </div>
                <p className="form-note">
                  <Leaf size={14} className="form-note-icon text-forest" /> We plant a tree for every sign-up. Already <strong>50,000+</strong> planted.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

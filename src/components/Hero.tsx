import React from 'react';
import { ArrowRight, Leaf, ShieldCheck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onStoryClick }) => {
  return (
    <section className="hero-section">
      <video
        className="hero-video-bg"
        autoPlay
        muted
        loop
        playsInline
        poster="assets/shoes2.jpg"
      >
        <source src="assets/hrovid.mp4" type="video/mp4" />
        <source src="hero.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Overlays */}
      <div className="hero-overlay hero-overlay-base" />
      <div className="hero-overlay hero-overlay-gradient" />
      <div className="hero-overlay hero-overlay-glow" />

      {/* Hero Content */}
      <div className="hero-container">
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          <span>Steps That Count</span>
        </div>

        <h1 className="hero-title mint-haze-text">
          Walk your values
        </h1>

        <p className="hero-subtitle">
          Sustainable sneakers designed for timeless style, all-day comfort, and planetary restoration.
          Crafted from ocean plastics, harvested algae, and wild rubber.
        </p>

        <div className="hero-cta-group">
          <button className="btn-minimal btn-minimal-primary hero-btn" onClick={onExploreClick}>
            <span>Explore Collections</span>
            <ArrowRight size={17} />
          </button>
          <button className="btn-minimal btn-minimal-outline hero-btn" onClick={onStoryClick}>
            <span>Our Sustainability Story</span>
          </button>
        </div>

        {/* Minimalist Trust Features */}
        <div className="hero-features">
          <div className="feature-pill">
            <Leaf size={15} className="feature-icon" />
            <span>100% Vegan & Bio-Based</span>
          </div>
          <div className="feature-pill">
            <RefreshCw size={15} className="feature-icon" />
            <span>60-Day Free Trial</span>
          </div>
          <div className="feature-pill">
            <ShieldCheck size={15} className="feature-icon" />
            <span>Net Carbon Neutral</span>
          </div>
        </div>
      </div>
    </section>
  );
};

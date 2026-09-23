import React from 'react';
import { Leaf, Trees, Wind, Droplets, Globe, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutViewProps {
  onExploreShop: () => void;
  onOpenChatWithQuery: (query: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onExploreShop,
  onOpenChatWithQuery,
}) => {
  return (
    <div className="about-page-container">
      {/* Editorial Header */}
      <section className="about-hero">
        <span className="about-eyebrow">Our Philosophy</span>
        <h1 className="about-hero-title">
          We believe the best shoes leave <span className="text-forest">no trace</span> behind.
        </h1>
        <p className="about-hero-lead">
          Founded with a relentless vision: replace petroleum-based footwear with regenerative,
          bio-circular innovations without sacrificing modern street aesthetic or athletic performance.
        </p>
      </section>

      {/* Impact Stats Grid */}
      <section className="impact-metrics-section">
        <div className="impact-metric-card">
          <div className="metric-number">120,000+</div>
          <div className="metric-label">Ocean Bottles Diverted</div>
          <p className="metric-sub">Spun into high-tensile breathable linings & laces</p>
        </div>
        <div className="impact-metric-card">
          <div className="metric-number">1,000,000</div>
          <div className="metric-label">Trees 2025 Pledge</div>
          <p className="metric-sub">Partnered with One Tree Planted across 4 continents</p>
        </div>
        <div className="impact-metric-card">
          <div className="metric-number">100%</div>
          <div className="metric-label">Vegan & Cruelty Free</div>
          <p className="metric-sub">PETA certified with zero animal glues or leathers</p>
        </div>
        <div className="impact-metric-card">
          <div className="metric-number">0%</div>
          <div className="metric-label">Virgin Plastics</div>
          <p className="metric-sub">Every ounce of polymer is post-consumer or bio-synthesized</p>
        </div>
      </section>

      {/* 2025 Commitments Section */}
      <section className="commitments-section">
        <div className="section-head">
          <span className="section-tag">Accountability</span>
          <h2 className="section-heading">Our 2025 Sustainability Commitments</h2>
          <p className="section-desc">
            We don't make vague promises. Our goals are tied to measurable, independently audited milestones.
          </p>
        </div>

        <div className="commitments-grid">
          <div className="commitment-card">
            <div className="commitment-icon-wrap">
              <Wind size={24} className="text-forest" />
            </div>
            <h3 className="commitment-title">100% Renewable Energy</h3>
            <p className="commitment-text">
              By end of 2025, 100% of electricity powering our Tier-1 cutting, stitching, and assembly
              facilities will come from solar and wind installations.
            </p>
            <div className="commitment-status">
              <CheckCircle2 size={16} className="text-forest" /> <span>On Track (82% Achieved)</span>
            </div>
          </div>

          <div className="commitment-card">
            <div className="commitment-icon-wrap">
              <Droplets size={24} className="text-forest" />
            </div>
            <h3 className="commitment-title">50% Packaging Reduction</h3>
            <p className="commitment-text">
              Eliminating 50% of global packaging weight by engineering custom origami-fold,
              100% post-consumer unbleached kraft boxes that require zero tape or inserts.
            </p>
            <div className="commitment-status">
              <CheckCircle2 size={16} className="text-forest" /> <span>On Track (65% Achieved)</span>
            </div>
          </div>

          <div className="commitment-card">
            <div className="commitment-icon-wrap">
              <Trees size={24} className="text-forest" />
            </div>
            <h3 className="commitment-title">1 Million Trees Planted</h3>
            <p className="commitment-text">
              1 shoe = 1 tree planted. 1 gift card = 1 tree planted. We restore native biodiversity
              in degraded Amazonian and Sub-Saharan biomes.
            </p>
            <div className="commitment-status">
              <CheckCircle2 size={16} className="text-forest" /> <span>460,000+ Planted to Date</span>
            </div>
          </div>

          <div className="commitment-card">
            <div className="commitment-icon-wrap">
              <Globe size={24} className="text-forest" />
            </div>
            <h3 className="commitment-title">Certified Net-Zero Scope 1-3</h3>
            <p className="commitment-text">
              Balancing every gram of carbon emitted from raw material cultivation to end-of-life recycling
              via verified high-permanence carbon mineralization.
            </p>
            <div className="commitment-status">
              <CheckCircle2 size={16} className="text-forest" /> <span>Audited Carbon Neutral</span>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Innovation Breakdown */}
      <section className="materials-section">
        <div className="section-head">
          <span className="section-tag">Regenerative Chemistry</span>
          <h2 className="section-heading">What Your Shoes Are Actually Made Of</h2>
        </div>

        <div className="materials-grid">
          <div className="material-feature">
            <div className="material-pill-badge">Outsoles</div>
            <h4>Wild Amazonian Rubber & Recycled Tires</h4>
            <p>
              Tapped responsibly from wild rubber trees in Brazil without felling a single tree, mixed
              with vulcanized reground passenger car tires for impenetrable grip and durability.
            </p>
          </div>

          <div className="material-feature">
            <div className="material-pill-badge">Midsoles</div>
            <h4>Bloom™ Algae EVA Foam</h4>
            <p>
              Harvested from over-bloomed waterways. Each pair cleans up to 35 gallons of water and
              returns vital oxygen to fragile aquatic ecosystems.
            </p>
          </div>

          <div className="material-feature">
            <div className="material-pill-badge">Uppers</div>
            <h4>Mushroom Mycelium & Apple Bio-Leather</h4>
            <p>
              Grown vertically with 90% less water and carbon than traditional cow leather, paired
              with organic cotton canvas certified by the Global Organic Textile Standard.
            </p>
          </div>

          <div className="material-feature">
            <div className="material-pill-badge">Insoles</div>
            <h4>Harvested Cork & Castor Seed Foam</h4>
            <p>
              Naturally antibacterial, shock-absorbing cork hand-stripped from cork oak trees (which
              regenerate bark every 9 years) and castor plant seed oil cushioning.
            </p>
          </div>
        </div>
      </section>

      {/* Story Narrative Callout */}
      <section className="story-callout-card">
        <div className="story-callout-content">
          <span className="story-callout-tag">The Rêve Story</span>
          <h3>"We refused to accept that walking forward meant stepping backward for our planet."</h3>
          <p>
            It started on a coastline littered with synthetic sneaker soles that take 1,000 years to decompose.
            We spent 3 years in labs collaborating with materials scientists, botanists, and sneaker designers
            to craft shoes that look sublime, perform at peak athletic levels, and return harmlessly to nature.
          </p>
          <div className="story-cta-row">
            <button className="btn-minimal btn-minimal-primary" onClick={onExploreShop}>
              <span>Shop All 5 Collections</span>
              <ArrowRight size={16} />
            </button>
            <button
              className="btn-minimal btn-minimal-outline"
              onClick={() => onOpenChatWithQuery('Tell me more about Rêve Eco’s story and circular takeback program')}
            >
              Ask AI About Circular Program
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

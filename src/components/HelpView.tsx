import React, { useState } from 'react';
import { FAQS } from '../data/faq';
import { ChevronDown, ChevronUp, Search, RefreshCw, Truck, HelpCircle, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface HelpViewProps {
  onOpenChatWithQuery: (query: string) => void;
}

export const HelpView: React.FC<HelpViewProps> = ({ onOpenChatWithQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const categories = ['All', 'Orders & Shipping', 'Returns & Exchanges', 'Sustainability', 'Sizing & Care'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faqSearch.trim() === '' ||
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div className="help-page-container">
      {/* Header */}
      <section className="help-header">
        <span className="help-eyebrow">Customer Care & Guidance</span>
        <h1 className="help-title">How can we help your journey?</h1>
        <p className="help-subtitle">
          Find instant answers to questions on sizing, shipping, our 60-day trial policy, and material care.
        </p>

        {/* Search Bar */}
        <div className="help-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. shipping time, 60-day return, gift cards)..."
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
          />
        </div>
      </section>

      {/* 4-Step Return Guide Visual */}
      <section className="returns-flow-section">
        <div className="section-head text-center">
          <span className="section-tag">Hassle-Free Policy</span>
          <h2 className="section-heading">60-Day Trial & 4-Step Easy Returns</h2>
          <p className="section-desc">
            Take your sneakers outside, test them on pavements and trails. If you don't love them within 60 days, return or exchange with 100% free return shipping.
          </p>
        </div>

        <div className="flow-steps-grid">
          <div className="flow-step-card">
            <div className="flow-step-num">01</div>
            <h4>Initiate in 60s</h4>
            <p>Enter your order ID & zip code into our automated self-service returns portal.</p>
          </div>
          <div className="flow-step-card">
            <div className="flow-step-num">02</div>
            <h4>Print Free Label</h4>
            <p>Instantly download a 100% prepaid carbon-neutral USPS/UPS shipping barcode label.</p>
          </div>
          <div className="flow-step-card">
            <div className="flow-step-num">03</div>
            <h4>Drop at Hub</h4>
            <p>Drop the original box at any nearby post office, drop box, or authorized parcel counter.</p>
          </div>
          <div className="flow-step-card">
            <div className="flow-step-num">04</div>
            <h4>Instant Credit</h4>
            <p>As soon as scanned, your exchange is dispatched or full refund issued to original card in 48h.</p>
          </div>
        </div>
      </section>

      {/* Shipping Rates Table */}
      <section className="shipping-rates-section">
        <div className="section-head">
          <span className="section-tag">Transparency</span>
          <h2 className="section-heading">Worldwide Shipping Rates & Times</h2>
        </div>

        <div className="shipping-table-wrapper">
          <table className="shipping-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>Destination</th>
                <th>Estimated Delivery</th>
                <th>Cost</th>
                <th>Carbon Footprint</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Standard US</strong></td>
                <td>Continental United States</td>
                <td>3–5 Business Days</td>
                <td><span className="highlight-tag">FREE over $75</span> (or $6 flat)</td>
                <td>100% Offset (USPS Ground)</td>
              </tr>
              <tr>
                <td><strong>Express US</strong></td>
                <td>Continental United States</td>
                <td>1–2 Business Days</td>
                <td>$15.00 Flat</td>
                <td>100% Offset (Air Express)</td>
              </tr>
              <tr>
                <td><strong>International</strong></td>
                <td>Canada, Europe, Asia, Australia</td>
                <td>5–10 Business Days</td>
                <td>$22.00 Flat (DDP included)</td>
                <td>Carbon-Neutral Ocean/Air</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="faq-accordion-section">
        <div className="section-head">
          <span className="section-tag">Knowledge Base</span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
        </div>

        {/* Category Pills */}
        <div className="faq-category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div key={faq.id} className={`faq-card ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.question}</span>
                  <span className="faq-icon">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer-pane">
                    <p>{faq.answer}</p>
                    <div className="faq-footer-action">
                      <button
                        className="faq-ask-link"
                        onClick={() => onOpenChatWithQuery(`Tell me more about: "${faq.question}"`)}
                      >
                        <Sparkles size={13} /> Ask AI Assistant for more details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact Form & AI Assistant Handoff */}
      <section className="contact-section">
        <div className="contact-grid">
          <div className="contact-info-col">
            <span className="contact-badge">Human Support</span>
            <h2 className="contact-title">Still have questions? We're here for you.</h2>
            <p className="contact-p">
              Our eco-specialist support team is based in Portland, OR and responds within 4 hours
              during business days.
            </p>
            <div className="contact-channels">
              <div className="channel-item">
                <strong>Email:</strong> support@reve-eco.com
              </div>
              <div className="channel-item">
                <strong>Hours:</strong> Mon – Fri, 8am – 6pm EST
              </div>
              <div className="channel-item">
                <strong>Live Chat:</strong> Available 24/7 with our AI Assistant
              </div>
            </div>
            <button
              className="btn-minimal btn-minimal-primary mt-4"
              onClick={() => onOpenChatWithQuery('I have a question about my order')}
            >
              <Sparkles size={16} /> Open 24/7 AI Chat Assistant
            </button>
          </div>

          <div className="contact-form-col">
            {contactSubmitted ? (
              <div className="contact-success-card">
                <CheckCircle2 size={40} className="text-forest mb-2" />
                <h3>Message Received!</h3>
                <p>Thank you for reaching out. An eco-specialist will reply to your email shortly.</p>
              </div>
            ) : (
              <form className="minimal-contact-form" onSubmit={handleContactSubmit}>
                <h3>Send Us A Note</h3>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Sizing, Return, or Materials question"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist you today?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn-minimal btn-minimal-primary w-full">
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

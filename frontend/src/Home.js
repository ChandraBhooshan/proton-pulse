import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="proton-home">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Powering the Future with{" "}
            <span className="neon-text">Intelligent Technology</span>
          </h1>
          <p className="hero-subtitle">
            ProtonPulse helps businesses innovate faster through AI, cloud
            computing, and next-generation software solutions.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="abstract-shape shape-1"></div>
          <div className="abstract-shape shape-2"></div>
        </div>
      </section>

      {/* 2. Trusted By Section */}
      <section className="trusted-section">
        <p>Trusted by innovative teams worldwide</p>
        <div className="logo-ticker">
          {/* Placeholders for client logos */}
          <span>Acme Corp</span>
          <span>GlobalTech</span>
          <span>Nexus</span>
          <span>Stellar</span>
          <span>AeroDynamics</span>
        </div>
      </section>

      {/* 3. Services Section */}
      {/* <section className="services-section">
        <h2>Our Services</h2>
        <div className="grid-container">
          {servicesData.map((service, index) => (
            <div className="card service-card" key={index}>
              <i className={`fas ${service.icon} neon-icon`}></i>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a href="#learn-more" className="text-link">
                Learn More &rarr;
              </a>
            </div>
          ))}
        </div>
      </section> */}

      {/* 4. Features Section */}
      <section className="features-section">
        <h2>Why We Stand Out</h2>
        <div className="grid-container">
          {featuresData.map((feature, index) => (
            <div className="card feature-card" key={index}>
              <h3>{feature.title}</h3>
              <p>Engineered for maximum efficiency and security at scale.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose ProtonPulse */}
      <section className="why-choose-section">
        <div className="split-layout">
          <div className="split-text">
            <h2>Transforming Industries</h2>
            <p>
              With years of expertise and an industry-leading approach, we
              ensure your transition into the future is seamless and secure.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Projects Delivered</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Global Clients</p>
            </div>
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Uptime Guaranteed</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Technical Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Showcase */}
      <section className="product-showcase">
        <h2>Featured Platform</h2>
        <div className="product-mockup">
          <div className="mockup-screen">
            <div className="mockup-header">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
            <div className="mockup-body">
              Data Visualization Dashboard Active...
            </div>
          </div>
          <div className="product-info">
            <h3>Proton Analytics Core</h3>
            <p>Unify your data streams with our AI-driven insights engine.</p>
            <button className="btn btn-primary">Explore Product</button>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-card">
          <p className="quote">
            "ProtonPulse completely overhauled our legacy cloud infrastructure.
            The speed and security improvements are night and day."
          </p>
          <div className="author">
            <div className="author-avatar"></div>
            <div>
              <h4>Sarah Jenkins</h4>
              <p>CTO, Nexus Corp</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing Preview */}
      {/* <section className="pricing-section">
        <h2>Simple, Transparent Pricing</h2>
        <div className="pricing-grid">
          {pricingData.map((plan, index) => (
            <div
              className={`card pricing-card ${plan.isPopular ? "popular" : ""}`}
              key={index}
            >
              {plan.isPopular && <div className="badge">Most Popular</div>}
              <h3>{plan.title}</h3>
              <p className="price">{plan.price}</p>
              <ul className="plan-features">
                <li>Core Features</li>
                <li>API Access</li>
                <li>Support Tier</li>
              </ul>
              <button
                className={`btn ${plan.isPopular ? "btn-primary" : "btn-secondary"}`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section> */}

      {/* 9. Call-To-Action */}
      <section className="cta-section">
        <h2>Ready to Accelerate Your Digital Journey?</h2>
        <button className="btn btn-primary btn-large">
          Book a Free Consultation
        </button>
      </section>

      {/* 10. Footer */}
      <footer className="footer-section">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>ProtonPulse</h3>
            <p>Powering the future.</p>
          </div>
          <div className="footer-links">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <div className="input-group">
              <input type="email" placeholder="Enter your email" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} ProtonPulse Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// --- Data Arrays ---

// const servicesData = [
//   {
//     title: "AI Solutions",
//     icon: "fa-robot",
//     desc: "Custom machine learning models and intelligent automation.",
//   },
//   {
//     title: "Cloud Infrastructure",
//     icon: "fa-cloud",
//     desc: "Scalable, secure, and globally distributed cloud environments.",
//   },
//   {
//     title: "Web Development",
//     icon: "fa-code",
//     desc: "High-performance React and Node.js applications.",
//   },
//   {
//     title: "Mobile App Development",
//     icon: "fa-mobile-alt",
//     desc: "Native and cross-platform mobile experiences.",
//   },
//   {
//     title: "Data Analytics",
//     icon: "fa-chart-network",
//     desc: "Real-time dashboards and predictive analytics.",
//   },
//   {
//     title: "Cybersecurity",
//     icon: "fa-shield-alt",
//     desc: "Enterprise-grade threat detection and mitigation.",
//   },
// ];

const featuresData = [
  { title: "Scalable Architecture" },
  { title: "Real-Time Analytics" },
  { title: "Enterprise Security" },
  { title: "Lightning Fast Performance" },
  { title: "24/7 Support" },
  { title: "Global Infrastructure" },
];

// const pricingData = [
//   { title: "Starter", price: "$49/mo", isPopular: false },
//   { title: "Professional", price: "$199/mo", isPopular: true },
//   { title: "Enterprise", price: "Custom", isPopular: false },
// ];

export default Home;

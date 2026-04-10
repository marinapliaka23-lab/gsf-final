import { useState, useEffect, useRef } from "react";
import "@/App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Images - relative paths for external hosting
const IMAGES = {
  logo: "/assets/logo.svg",
  hero: "/assets/pic4.png",
  gallery1: "/assets/pic3.png",
  gallery2: "/assets/q18.jpg",
  gallery3: "/assets/pic5.png",
};

// Marquee items
const marqueeItems = [
  "INFRASTRUCTURE", "MONITORING", "LOGISTICS", "AGRICULTURE", 
  "DEMINING", "SURVEILLANCE", "MAPPING", "DELIVERY"
];

// Applications data - exact text from user (5 items, no 6th)
const applications = [
  {
    title: "Inspection of Critical Infrastructure",
    description: "Bridges, power grids, and dams need constant care. Sending people to inspect them can be slow and dangerous. Our drones do this work safely from the air. They use high-resolution cameras and sensors to find small cracks or structural faults early."
  },
  {
    title: "Environmental and Industrial Monitoring",
    description: "Protecting nature requires accurate data. Our UAVs fly over forests, rivers, and industrial zones to gather this data safely. They can detect early signs of wildfires, measure air quality, and monitor factory emissions."
  },
  {
    title: "Transportation of Civilian Goods",
    description: "Our heavy-lift drones transport essential civilian goods, medical supplies, and rescue equipment directly to where they are needed. They are designed to carry significant weight securely over long distances."
  },
  {
    title: "Humanitarian Demining",
    description: "Our technology helps clear these areas safely. We equip drones with specialized scanners to map fields from above. They identify dangerous metal objects in the ground without putting human operators at risk."
  },
  {
    title: "Field Irrigation and Agriculture",
    description: "Our drones help farmers grow food more efficiently. They scan large fields to see exactly which plants need water. They can also spray water or safe fertilizers with extreme precision. This method saves thousands of liters of clean water. It reduces costs for farmers and ensures a larger, healthier food supply for the public."
  }
];

// Intersection Observer hook
const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
};

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refs for animations
  const [heroRef, heroInView] = useInView();
  const [aboutRef, aboutInView] = useInView();
  const [appsRef, appsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Header with Logo and Navigation */}
      <header className="site-header">
        <img src={IMAGES.logo} alt="Logo" className="site-logo" />
        <nav className="header-nav">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#applications" onClick={(e) => { e.preventDefault(); scrollTo('applications'); }}>Solutions</a>
          <button className="btn-header" onClick={() => scrollTo('contact')}>Contact Us</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" ref={heroRef} data-testid="hero-section">
        <div className="hero-bg">
          <img src={IMAGES.hero} alt="UAV Technology" />
        </div>
        <div className="hero-content">
          <h1 className={heroInView ? 'animate-fade-up delay-1' : ''}>
            <span className="hero-line-desktop">Advanced UAV Technology<br />for a Better Tomorrow.</span>
            <span className="hero-line-mobile">Advanced UAV Technology for<br />a Better Tomorrow.</span>
          </h1>
          <p className={`hero-subtitle ${heroInView ? 'animate-fade-up delay-2' : ''}`}>
            We design and manufacture reliable unmanned aerial vehicles for everyday civilian needs.
          </p>
          <div className={`hero-buttons ${heroInView ? 'animate-fade-up delay-3' : ''}`}>
            <button className="btn-primary" onClick={() => scrollTo('applications')} data-testid="discover-btn">
              Discover Our Solutions
              <span>→</span>
            </button>
            <button className="btn-ghost" onClick={() => scrollTo('contact')} data-testid="contact-btn">
              Contact Us
            </button>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="section" id="about" ref={aboutRef} data-testid="about-section">
        <div className="container">
          <div className="about-centered">
            <span className={`label ${aboutInView ? 'animate-fade-up delay-1' : ''}`}>
              About Us
            </span>
            <h2 className={aboutInView ? 'animate-fade-up delay-2' : ''}>
              Proven Engineering.<br />Scalable Solutions.
            </h2>
            <p className={aboutInView ? 'animate-fade-up delay-3' : ''}>
              For over five years, our team has developed advanced aerial platforms. Today, more than 400 dedicated professionals work in our facilities. We design, test, and build drones that solve real-world problems. Every system we manufacture is built to strict international standards to ensure total safety and stability in the air.
            </p>
            <div className={`about-stats-centered ${aboutInView ? 'animate-fade-up delay-4' : ''}`}>
              <div>
                <div className="stat-number">5+</div>
                <div className="stat-label">Years</div>
              </div>
              <div>
                <div className="stat-number">400+</div>
                <div className="stat-label">Professionals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <div className="gallery-strip" data-testid="gallery">
        <div className="gallery-item image-reveal">
          <img src={IMAGES.gallery1} alt="Drone over city" />
        </div>
        <div className="gallery-item image-reveal">
          <img src={IMAGES.gallery2} alt="Drone analytics" />
        </div>
        <div className="gallery-item image-reveal">
          <img src={IMAGES.gallery3} alt="Drone at sunset" />
        </div>
      </div>

      {/* Applications */}
      <section className="section" id="applications" ref={appsRef} data-testid="applications-section">
        <div className="container">
          <div className={`applications-header ${appsInView ? 'animate-fade-up delay-1' : ''}`}>
            <h2>Civil & Industrial<br />Applications</h2>
          </div>
          <div className="applications-grid-wrapper">
            <div className="applications-grid-top">
              {applications.slice(0, 3).map((app, index) => (
                <div 
                  className={`app-card ${appsInView ? 'animate-fade-up' : ''}`}
                  style={{ animationDelay: `${0.1 * (index + 1)}s`, opacity: appsInView ? 1 : 0 }}
                  key={index}
                  data-testid={`app-card-${index}`}
                >
                  <div className="app-number">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                </div>
              ))}
            </div>
            <div className="applications-grid-bottom">
              {applications.slice(3, 5).map((app, index) => (
                <div 
                  className={`app-card ${appsInView ? 'animate-fade-up' : ''}`}
                  style={{ animationDelay: `${0.1 * (index + 4)}s`, opacity: appsInView ? 1 : 0 }}
                  key={index + 3}
                  data-testid={`app-card-${index + 3}`}
                >
                  <div className="app-number">{String(index + 4).padStart(2, '0')}</div>
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact-section" id="contact" ref={contactRef} data-testid="contact-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className={`label ${contactInView ? 'animate-fade-left delay-1' : ''}`}>
                Contact
              </span>
              <h2 className={contactInView ? 'animate-fade-left delay-2' : ''}>
                Let's Build a Safer Future Together.
              </h2>
              <p className={contactInView ? 'animate-fade-left delay-3' : ''}>
                Our team is ready to discuss how our civilian UAVs can solve your specific challenges. We are open to partnerships, technological demonstrations, and international cooperation. Reach out to learn how we can support your community.
              </p>
            </div>
            <div className={`contact-form ${contactInView ? 'animate-fade-right delay-3' : ''}`} style={{ background: '#ffffff', padding: '48px' }}>
              <form onSubmit={handleSubmit} data-testid="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name" style={{ color: '#555' }}>Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      data-testid="input-name"
                      style={{ borderBottom: '1px solid #ccc', color: '#0a0a0a' }}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" style={{ color: '#555' }}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      data-testid="input-email"
                      style={{ borderBottom: '1px solid #ccc', color: '#0a0a0a' }}
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="message" style={{ color: '#555' }}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project"
                    required
                    data-testid="input-message"
                    style={{ borderBottom: '1px solid #ccc', color: '#0a0a0a' }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={loading}
                  data-testid="submit-btn"
                  style={{ width: '100%', justifyContent: 'center', background: '#0a0a0a', color: '#fff' }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  <span>→</span>
                </button>
                {submitted && (
                  <div className="success-message" data-testid="success-message" style={{ background: '#0a0a0a', color: '#fff' }}>
                    Thank you. We'll be in touch shortly.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <img src={IMAGES.logo} alt="Logo" />
        </div>
        <nav className="footer-nav">
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About</a>
          <a href="#applications" onClick={(e) => { e.preventDefault(); scrollTo('applications'); }}>Solutions</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;

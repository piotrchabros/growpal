import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [spotsLeft] = useState(3)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.15 }
    )

    sectionsRef.current.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const registerSection = (id: string) => (el: HTMLElement | null) => {
    if (el) sectionsRef.current.set(id, el)
  }

  const isVisible = (id: string) => visibleSections.has(id)

  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  const faqs = [
    {
      q: 'Why are you doing this for free?',
      a: 'I\'m building a portfolio of ecommerce growth case studies. Your success is my proof of concept. I bring 15+ years of IT and business expertise — this is a strategic investment, not charity.',
    },
    {
      q: 'What\'s the catch?',
      a: 'No catch. You cover your own ad spend (min. 2,000 PLN/month gross). I handle everything else — strategy, setup, optimization, reporting. I only ask that I can use anonymized results as case studies.',
    },
    {
      q: 'What does "AI-powered" actually mean?',
      a: 'I use AI tools for audience analysis, creative generation, bid optimization, and performance forecasting. This means faster iteration, smarter targeting, and better ROAS than traditional manual management.',
    },
    {
      q: 'How long is the commitment?',
      a: 'Minimum 3 months so we have enough data to optimize properly. After that, you can continue or take over the campaigns yourself — I\'ll hand over everything.',
    },
    {
      q: 'Which platforms do you run ads on?',
      a: 'Primarily Meta (Facebook & Instagram) and Google Ads. Depending on your product and audience, we might also explore TikTok Ads or Pinterest.',
    },
    {
      q: 'What if my budget is slightly below 2,000 PLN?',
      a: 'The 2,000 PLN minimum ensures we have enough data for AI optimization to work effectively. Below that threshold, results become unreliable. If you\'re close, let\'s talk.',
    },
  ]

  return (
    <div className="page">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">
            <span className="logo-icon">G</span>
            <span className="logo-text">growpal</span>
          </div>
          <button className="nav-cta" onClick={scrollToApply}>
            Apply for free spot
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-inner">
          <div className="urgency-badge">
            <span className="pulse" />
            Only {spotsLeft} free spots available
          </div>
          <h1 className="hero-title">
            I'll grow your ecommerce store
            <br />
            <span className="hero-accent">with AI-powered ads.</span>
            <br />
            <span className="hero-free">For free.</span>
          </h1>
          <p className="hero-sub">
            15+ years in IT. Serial entrepreneur. Now I'm looking for 3 small ecommerce brands
            to run their paid advertising — no management fee, no contracts, no BS.
            You just cover the ad spend.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToApply}>
              Apply now — it's free
            </button>
            <span className="hero-note">Min. ad budget: 2,000 PLN/month</span>
          </div>
        </div>
        <div className="hero-gradient" />
      </header>

      {/* Stats Bar */}
      <section
        className={`stats ${isVisible('stats') ? 'visible' : ''}`}
        id="stats"
        ref={registerSection('stats')}
      >
        <div className="stats-inner">
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Years in IT</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Businesses built</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">AI</span>
            <span className="stat-label">Powered optimization</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">0 PLN</span>
            <span className="stat-label">Management fee</span>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section
        className={`section problem ${isVisible('problem') ? 'visible' : ''}`}
        id="problem"
        ref={registerSection('problem')}
      >
        <div className="section-inner">
          <h2 className="section-tag">The reality</h2>
          <h3 className="section-title">You know marketing matters.<br />But it's a minefield.</h3>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">$</div>
              <h4>Agencies are expensive</h4>
              <p>Most charge 2,000–5,000 PLN/month just for management — on top of your ad spend. For a small store, that's brutal.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">?</div>
              <h4>DIY means guessing</h4>
              <p>You've tried running ads yourself. The interface is confusing, results are inconsistent, and you're not sure what's working.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">~</div>
              <h4>Time you don't have</h4>
              <p>You're already handling inventory, shipping, customer service, and everything else. Marketing falls to the bottom of the list.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section
        className={`section offer ${isVisible('offer') ? 'visible' : ''}`}
        id="offer"
        ref={registerSection('offer')}
      >
        <div className="section-inner">
          <h2 className="section-tag">The offer</h2>
          <h3 className="section-title">Full ad management.<br />Zero management fee.</h3>
          <p className="section-sub">
            Here's exactly what you get — completely free — when you're selected as one of 3 partner brands.
          </p>
          <div className="offer-grid">
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <h4>Ad strategy & research</h4>
              <p>Deep dive into your niche, competitors, and ideal customer profile using AI-powered audience analysis.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h4>Campaign setup</h4>
              <p>Full configuration of Meta Ads & Google Ads — pixel tracking, conversion events, campaign structure.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7-7"/></svg>
              </div>
              <h4>AI creative generation</h4>
              <p>AI-generated ad copy and creative concepts tailored to your brand — tested and iterated at speed.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h4>Ongoing optimization</h4>
              <p>Daily monitoring, A/B testing, bid adjustments, and audience refinement to maximize your ROAS.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
              <h4>Transparent reporting</h4>
              <p>Weekly performance reports with clear metrics — spend, ROAS, CPA, and actionable next steps.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h4>Direct access to me</h4>
              <p>No account managers or juniors. You work directly with me — 15+ years of experience, no middlemen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className={`section how ${isVisible('how') ? 'visible' : ''}`}
        id="how"
        ref={registerSection('how')}
      >
        <div className="section-inner">
          <h2 className="section-tag">How it works</h2>
          <h3 className="section-title">From application to results<br />in 3 simple steps.</h3>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h4>Apply & get selected</h4>
                <p>Fill out a short application below. I'll review your store, niche, and goals. If we're a good fit, you're in.</p>
              </div>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h4>Strategy & launch</h4>
                <p>I'll audit your current setup, build a tailored ad strategy using AI, and launch your first campaigns within 7 days.</p>
              </div>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h4>Optimize & grow</h4>
                <p>Continuous AI-driven optimization. Weekly check-ins. Monthly strategy reviews. Watch your store grow.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        className={`section about ${isVisible('about') ? 'visible' : ''}`}
        id="about"
        ref={registerSection('about')}
      >
        <div className="section-inner">
          <div className="about-layout">
            <div className="about-photo">
              <div className="about-photo-placeholder">
                <span>PC</span>
              </div>
            </div>
            <div className="about-text">
              <h2 className="section-tag">About me</h2>
              <h3 className="section-title">IT veteran. Entrepreneur.<br />Now your growth partner.</h3>
              <p>
                I've spent over 15 years building and scaling technology — from software engineering
                to running my own IT businesses. Along the way, I learned a hard truth:
                <strong> great products don't sell themselves.</strong>
              </p>
              <p>
                Running my own companies taught me that marketing isn't optional — it's oxygen.
                I dove deep into growth marketing, paid acquisition, and AI-powered optimization.
                Now I want to combine my technical background with modern marketing to help small
                ecommerce brands punch above their weight.
              </p>
              <p>
                This isn't a side project or a hobby. I'm building something real — and I need
                3 brands willing to grow with me.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section
        className={`section requirements ${isVisible('requirements') ? 'visible' : ''}`}
        id="requirements"
        ref={registerSection('requirements')}
      >
        <div className="section-inner">
          <h2 className="section-tag">Requirements</h2>
          <h3 className="section-title">Is this right for you?</h3>
          <div className="req-columns">
            <div className="req-col req-yes">
              <h4>You're a good fit if:</h4>
              <ul>
                <li>You run a small ecommerce store (any niche)</li>
                <li>You can invest min. 2,000 PLN/month in ad spend</li>
                <li>You're willing to commit for at least 3 months</li>
                <li>You want to grow but lack marketing expertise</li>
                <li>You're open to AI-driven approaches</li>
              </ul>
            </div>
            <div className="req-col req-no">
              <h4>This isn't for you if:</h4>
              <ul>
                <li>Your store isn't live or has no products listed</li>
                <li>You can't commit to the minimum ad budget</li>
                <li>You want instant overnight results</li>
                <li>You're not willing to share store access/data</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className={`section faq ${isVisible('faq') ? 'visible' : ''}`}
        id="faq"
        ref={registerSection('faq')}
      >
        <div className="section-inner">
          <h2 className="section-tag">FAQ</h2>
          <h3 className="section-title">Questions you probably have.</h3>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{faq.q}</span>
                  <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Apply */}
      <section
        className={`section cta ${isVisible('apply') ? 'visible' : ''}`}
        id="apply"
        ref={registerSection('apply')}
      >
        <div className="section-inner">
          <div className="cta-box">
            <div className="urgency-badge">
              <span className="pulse" />
              Only {spotsLeft} spots remaining
            </div>
            <h3 className="cta-title">Ready to grow your store?</h3>
            <p className="cta-sub">
              Drop me a message with your store URL and a few words about your brand.
              I'll review every application personally and get back to you within 48 hours.
            </p>
            <a
              href="mailto:hello@growpal.pl?subject=GrowPal%20Application&body=Hi!%0A%0AMy%20store%20URL:%20%0AMy%20niche:%20%0AMonthly%20revenue%20(approx):%20%0AWhat%20I%20want%20to%20achieve:%20"
              className="btn-primary btn-large"
            >
              Apply now — send me a message
            </a>
            <p className="cta-note">
              No commitment until we both agree it's a fit. Your data stays confidential.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="logo">
            <span className="logo-icon">G</span>
            <span className="logo-text">growpal</span>
          </div>
          <p className="footer-copy">&copy; {new Date().getFullYear()} growpal. AI-powered growth for small ecommerce.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

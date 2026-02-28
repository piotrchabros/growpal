import { useState, useEffect, useRef } from 'react'
import './App.css'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

type Page = 'landing' | 'privacy' | 'terms'

function getPageFromHash(): Page {
  const hash = window.location.hash
  if (hash === '#polityka-prywatnosci') return 'privacy'
  if (hash === '#regulamin') return 'terms'
  return 'landing'
}

function App() {
  const [page, setPage] = useState<Page>(getPageFromHash)
  const [spotsLeft] = useState(3)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showStickyBar, setShowStickyBar] = useState(false)
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

  useEffect(() => {
    const onScroll = () => {
      setShowStickyBar(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      setPage(getPageFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
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
      q: 'Dlaczego robisz to za darmo?',
      a: 'Buduję portfolio case studies ze wzrostu ecommerce. Twój sukces to mój dowód kompetencji. Wnoszę 15+ lat doświadczenia w IT i biznesie — to strategiczna inwestycja w budowanie mojego portfolio.',
    },
    {
      q: 'Jaki jest haczyk?',
      a: 'Żaden. Pokrywasz własny budżet reklamowy (min. 2 000 zł brutto/mies.). Ja zajmuję się całą resztą — strategią, konfiguracją, optymalizacją i raportowaniem. Jedyne, o co proszę, to możliwość wykorzystania zanonimizowanych wyników jako case studies.',
    },
    {
      q: 'Co właściwie oznacza "napędzane AI"?',
      a: 'Korzystam z narzędzi AI do analizy odbiorców, generowania kreacji, optymalizacji stawek i prognozowania wyników. Oznacza to szybsze iteracje, trafniejsze targetowanie i lepszy ROAS niż przy tradycyjnym ręcznym zarządzaniu.',
    },
    {
      q: 'Jak długo trwa zobowiązanie?',
      a: 'Minimum 3 miesiące — tyle potrzebujemy, żeby zebrać wystarczającą ilość danych do skutecznej optymalizacji. Po tym czasie możesz kontynuować współpracę lub przejąć kampanie — przekażę Ci wszystko.',
    },
    {
      q: 'Na jakich platformach prowadzisz reklamy?',
      a: 'Głównie Meta (Facebook i Instagram) oraz Google Ads. W zależności od produktu i grupy docelowej możemy też rozważyć TikTok Ads lub Pinterest.',
    },
    {
      q: 'Co jeśli mój budżet jest nieco poniżej 2 000 zł?',
      a: 'Minimum 2 000 zł zapewnia wystarczającą ilość danych, aby optymalizacja AI działała skutecznie. Poniżej tego progu wyniki stają się niewiarygodne. Jeśli jesteś blisko — porozmawiajmy.',
    },
  ]

  if (page === 'privacy') return <PrivacyPolicy />
  if (page === 'terms') return <Terms />

  return (
    <div className="page">
      {/* Nawigacja */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="logo">
            <img src="/logo.png" alt="growpal" className="logo-img" />
            <span className="logo-text">GrowPal</span>
          </div>
          <button className="nav-cta" onClick={scrollToApply}>
            Aplikuj o darmowe miejsce
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-inner">
          <div className="urgency-badge">
            <span className="pulse" />
            Tylko {spotsLeft} darmowe miejsca
          </div>
          <h1 className="hero-title">
            Rozwinę Twój sklep ecommerce
            <br />
            <span className="hero-accent">reklamami napędzanymi AI.</span>
            <br />
            <span className="hero-free">Za darmo.</span>
          </h1>
          <p className="hero-sub">
            15+ lat w IT. Przedsiębiorca z wieloletnim doświadczeniem. Szukam 3 małych marek ecommerce,
            dla których poprowadzę płatną reklamę — bez opłat za zarządzanie, bez umów, bez ukrytych kosztów.
            Ty pokrywasz tylko budżet reklamowy.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToApply}>
              Aplikuj teraz — to nic nie kosztuje
            </button>
            <span className="hero-note">Min. budżet reklamowy: 2 000 zł brutto/mies.</span>
          </div>
        </div>
        <div className="hero-gradient" />
      </header>

      {/* Pasek statystyk */}
      <section
        className={`stats ${isVisible('stats') ? 'visible' : ''}`}
        id="stats"
        ref={registerSection('stats')}
      >
        <div className="stats-inner">
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Lat w IT</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">6</span>
            <span className="stat-label">Zbudowane firmy</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">AI</span>
            <span className="stat-label">Optymalizacja</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-number">0 zł</span>
            <span className="stat-label">Opłata za zarządzanie</span>
          </div>
        </div>
      </section>

      {/* Sekcja problemu */}
      <section
        className={`section problem ${isVisible('problem') ? 'visible' : ''}`}
        id="problem"
        ref={registerSection('problem')}
      >
        <div className="section-inner">
          <h2 className="section-tag">Problem</h2>
          <h3 className="section-title">Wiesz, że marketing jest kluczowy.<br />Ale to pole minowe.</h3>
          <div className="problem-grid">
            <div className="problem-card">
              <div className="problem-icon">$</div>
              <h4>Agencje są drogie</h4>
              <p>Większość pobiera 2 000–5 000 zł/mies. tylko za zarządzanie — do tego dochodzi budżet reklamowy. Dla małego sklepu to dużo.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">?</div>
              <h4>Samodzielnie to loteria</h4>
              <p>Próbowałeś prowadzić reklamy sam. Interfejs jest zagmatwany, wyniki niestabilne i nie wiadomo, co tak naprawdę działa.</p>
            </div>
            <div className="problem-card">
              <div className="problem-icon">~</div>
              <h4>Czas, którego nie masz</h4>
              <p>Już zajmujesz się magazynem, wysyłką, obsługą klienta i tysiącem innych rzeczy. Marketing spada na koniec listy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency banner */}
      <div className="urgency-strip">
        <span className="pulse" />
        Zostały tylko <strong>{spotsLeft} miejsca</strong> — nie czekaj, aż będzie za późno.
        <button className="urgency-strip-cta" onClick={scrollToApply}>Aplikuj teraz</button>
      </div>

      {/* Sekcja oferty */}
      <section
        className={`section offer ${isVisible('offer') ? 'visible' : ''}`}
        id="offer"
        ref={registerSection('offer')}
      >
        <div className="section-inner">
          <h2 className="section-tag">Oferta</h2>
          <h3 className="section-title">Pełne zarządzanie reklamami.<br />Zero opłat za obsługę.</h3>
          <p className="section-sub">
            Oto dokładnie co otrzymujesz — całkowicie za darmo — gdy zostaniesz jedną z 3 partnerskich marek.
          </p>
          <div className="offer-grid">
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <h4>Strategia i analiza reklam</h4>
              <p>Dogłębna analiza Twojej niszy, konkurencji i profilu idealnego klienta z wykorzystaniem AI.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h4>Konfiguracja kampanii</h4>
              <p>Pełna konfiguracja Meta Ads i Google Ads — pixel tracking, zdarzenia konwersji, struktura kampanii.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 2v10l7-7"/></svg>
              </div>
              <h4>Kreacje generowane przez AI</h4>
              <p>Teksty reklamowe i koncepty kreatywne dopasowane do Twojej marki — testowane i iterowane z dużą prędkością.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h4>Ciągła optymalizacja</h4>
              <p>Codzienny monitoring, testy A/B, dostosowywanie stawek i zawężanie grup odbiorców, by zmaksymalizować ROAS.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
              <h4>Przejrzyste raporty</h4>
              <p>Cotygodniowe raporty wyników z czytelnymi metrykami — wydatki, ROAS, CPA i konkretne kolejne kroki.</p>
            </div>
            <div className="offer-card">
              <div className="offer-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h4>Bezpośredni kontakt ze mną</h4>
              <p>Żadnych account managerów ani juniorów. Pracujesz bezpośrednio ze mną — 15+ lat doświadczenia, bez pośredników.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Jak to działa */}
      <section
        className={`section how ${isVisible('how') ? 'visible' : ''}`}
        id="how"
        ref={registerSection('how')}
      >
        <div className="section-inner">
          <h2 className="section-tag">Jak to działa</h2>
          <h3 className="section-title">Od zgłoszenia do wyników<br />w 3 prostych krokach.</h3>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h4>Aplikuj i zostań wybrany</h4>
                <p>Wypełnij krótkie zgłoszenie poniżej. Przejrzę Twój sklep, niszę i cele. Jeśli do siebie pasujemy — zaczynamy.</p>
              </div>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h4>Strategia i start</h4>
                <p>Zaudytuję Twoją obecną konfigurację, zbuduję dopasowaną strategię reklamową z pomocą AI i uruchomię pierwsze kampanie w ciągu 7 dni.</p>
              </div>
            </div>
            <div className="step-line" />
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h4>Optymalizuj i rozwijaj się</h4>
                <p>Ciągła optymalizacja napędzana AI. Cotygodniowe check-iny. Miesięczne przeglądy strategii. Patrz, jak Twój sklep rośnie.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency banner */}
      <div className="urgency-strip">
        <span className="pulse" />
        Liczba miejsc ograniczona do <strong>{spotsLeft} firm</strong> — zgłoś się, zanim ktoś Cię wyprzedzi.
        <button className="urgency-strip-cta" onClick={scrollToApply}>Zarezerwuj miejsce</button>
      </div>

      {/* O mnie */}
      <section
        className={`section about ${isVisible('about') ? 'visible' : ''}`}
        id="about"
        ref={registerSection('about')}
      >
        <div className="section-inner">
          <div className="about-layout">
            <div className="about-photo">
              <img src="/piotr_chabros.png" alt="Piotr Chabros" className="about-photo-img" />
            </div>
            <div className="about-text">
              <h2 className="section-tag">O mnie</h2>
              <h3 className="section-title">Weteran IT. Przedsiębiorca.<br />Teraz Twój partner wzrostu.</h3>
              <p>
                Mam ponad 15 lat doświadczenia w IT jako full-stack web developer i jestem właścicielem
                ponad 6 firm. Wszystkie skupiają się wokół ecommerce — m.in.{' '}
                <a href="https://bespokesoft.pl" target="_blank" rel="noopener noreferrer">BespokeSoft</a> (software house),{' '}
                <a href="https://sitespector.app" target="_blank" rel="noopener noreferrer">SiteSpector</a> (SaaS do audytów stron i sklepów internetowych),{' '}
                <a href="https://growgpt.app" target="_blank" rel="noopener noreferrer">GrowGPT</a> (SaaS zwiększający konwersję w sklepach) oraz{' '}
                <a href="https://growshop.ai" target="_blank" rel="noopener noreferrer">GrowShop</a> (agencja marketingowa, leadgen, AI i consulting dla ecommerce).
              </p>
              <p>
                Właśnie dlatego, że cały mój ekosystem biznesowy kręci się wokół ecommerce,
                szukam marek, którym mogę pomóc rosnąć — budując jednocześnie portfolio case studies
                dla mojej agencji marketingowej. Twój sukces to mój dowód kompetencji.
              </p>
              <p>
                To nie jest projekt poboczny ani hobby. Łączę 15+ lat doświadczenia technicznego
                z nowoczesnym marketingiem napędzanym AI — i potrzebuję 3 marek gotowych rosnąć razem ze mną.
              </p>
              <a href="https://www.linkedin.com/in/pchabros/" target="_blank" rel="noopener noreferrer" className="about-linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Mój profil LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Wymagania */}
      <section
        className={`section requirements ${isVisible('requirements') ? 'visible' : ''}`}
        id="requirements"
        ref={registerSection('requirements')}
      >
        <div className="section-inner">
          <h2 className="section-tag">Wymagania</h2>
          <h3 className="section-title">Czy to jest dla Ciebie?</h3>
          <div className="req-columns">
            <div className="req-col req-yes">
              <h4>Pasujesz, jeśli:</h4>
              <ul>
                <li>Prowadzisz mały sklep ecommerce (dowolna nisza)</li>
                <li>Możesz zainwestować min. 2 000 zł brutto/mies. w budżet reklamowy</li>
                <li>Jesteś gotowy na współpracę przez minimum 3 miesiące</li>
                <li>Chcesz rosnąć, ale brakuje Ci wiedzy marketingowej</li>
                <li>Jesteś otwarty na podejście oparte o AI</li>
              </ul>
            </div>
            <div className="req-col req-no">
              <h4>To nie jest dla Ciebie, jeśli:</h4>
              <ul>
                <li>Twój sklep nie jest jeszcze uruchomiony lub nie ma produktów</li>
                <li>Nie możesz zobowiązać się do minimalnego budżetu reklamowego</li>
                <li>Oczekujesz natychmiastowych wyników z dnia na dzień</li>
                <li>Nie chcesz udostępnić dostępu do sklepu i danych</li>
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
          <h3 className="section-title">Pytania, które pewnie masz</h3>
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

      {/* Urgency banner */}
      <div className="urgency-strip">
        <span className="pulse" />
        Przyjmuję tylko <strong>{spotsLeft} sklepy</strong> — potem program zostaje zamknięty.
        <button className="urgency-strip-cta" onClick={scrollToApply}>Aplikuj teraz</button>
      </div>

      {/* CTA / Aplikuj */}
      <section
        className={`section cta ${isVisible('apply') ? 'visible' : ''}`}
        id="apply"
        ref={registerSection('apply')}
      >
        <div className="section-inner">
          <div className="cta-box">
            <div className="urgency-badge">
              <span className="pulse" />
              Tylko {spotsLeft} darmowe miejsca
            </div>
            <h3 className="cta-title">Gotowy, żeby rozwinąć swój sklep?</h3>
            <p className="cta-sub">
              Wypełnij formularz poniżej. Każde zgłoszenie przeglądam osobiście
              i odpowiadam w ciągu 48 godzin.
            </p>
            <div className="ghl-form-wrapper">
              <iframe
                src="https://api.leadconnectorhq.com/widget/form/pFJvyAoeJmYAqQkV48Ak"
                id="inline-pFJvyAoeJmYAqQkV48Ak"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="GrowPal"
                data-height="874"
                data-layout-iframe-id="inline-pFJvyAoeJmYAqQkV48Ak"
                data-form-id="pFJvyAoeJmYAqQkV48Ak"
                title="Formularz zgłoszeniowy GrowPal"
              />
            </div>
            <p className="cta-note">
              Żadnych zobowiązań, dopóki oboje nie uznamy, że do siebie pasujemy. Twoje dane pozostają poufne.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky urgency bar */}
      <div className={`sticky-urgency ${showStickyBar ? 'visible' : ''}`}>
        <div className="sticky-urgency-inner">
          <span>
            <span className="pulse" />
            Tylko <strong>{spotsLeft} darmowe miejsca</strong> — nie zwlekaj!
          </span>
          <button className="btn-primary btn-small" onClick={scrollToApply}>
            Aplikuj teraz
          </button>
        </div>
      </div>

      {/* Stopka */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="logo">
            <img src="/logo.png" alt="growpal" className="logo-img" />
            <span className="logo-text">growpal</span>
          </div>
          <div className="footer-links">
            <a href="#polityka-prywatnosci" className="footer-link">Polityka Prywatności</a>
            <a href="#regulamin" className="footer-link">Regulamin</a>
          </div>
          <p className="footer-copy">&copy; {new Date().getFullYear()} GrowPal. Wzrost napędzany AI dla małego ecommerce.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

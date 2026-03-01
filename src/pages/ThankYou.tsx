function ThankYou() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="logo">
            <img src="/logo.png" alt="growpal" className="logo-img" />
            <span className="logo-text">GrowPal</span>
          </a>
          <a href="/" className="nav-cta">
            Wróć na stronę główną
          </a>
        </div>
      </nav>

      <main className="thankyou-page">
        <div className="thankyou-inner">
          <div className="thankyou-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1>Dzięki za zgłoszenie!</h1>
          <p className="thankyou-sub">
            Twoje zgłoszenie do GrowPal Sprint zostało przesłane. Przejrzę je osobiście
            i odezwę się w ciągu <strong>48 godzin</strong>.
          </p>
          <p className="thankyou-sub">
            <strong>Na Twój adres email wysłaliśmy potwierdzenie z dodatkowymi informacjami.</strong> Jeśli nie widzisz wiadomości, sprawdź folder spam/wiadomości-śmieci.
          </p>
          <div className="thankyou-steps">
            <h2>Co dalej?</h2>
            <ol>
              <li>Sprawdzam Twój sklep, niszę i cele</li>
              <li>Kontaktuję się z Tobą — mail lub telefon</li>
              <li>Jeśli pasujemy — ruszamy ze Sprintem</li>
            </ol>
          </div>
          <a href="/" className="btn-primary">
            Wróć na stronę główną
          </a>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <a href="/" className="logo">
            <img src="/logo.png" alt="growpal" className="logo-img" />
            <span className="logo-text">GrowPal</span>
          </a>
          <div className="footer-links">
            <a href="#polityka-prywatnosci" className="footer-link">Polityka Prywatności</a>
            <a href="#regulamin" className="footer-link">Regulamin</a>
          </div>
          <p className="footer-copy">&copy; {new Date().getFullYear()} GrowPal. 3-miesięczny Sprint wzrostu dla ecommerce.</p>
        </div>
      </footer>
    </div>
  )
}

export default ThankYou

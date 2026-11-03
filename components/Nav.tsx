'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#security', label: 'Security' },
  { href: '#merchants', label: 'For shops' },
  { href: '#progress', label: 'Progress' },
];

const WHATSAPP = 'https://wa.me/2349134409739';

function Logo() {
  return (
    <span className="mark">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round">
        <path d="M5 8V6a1 1 0 011-1h2M16 5h2a1 1 0 011 1v2M19 16v2a1 1 0 01-1 1h-2M8 19H6a1 1 0 01-1-1v-2" />
        <circle cx="9.5" cy="11" r="1.1" fill="#F5C518" stroke="none" />
        <circle cx="14.5" cy="11" r="1.1" fill="#F5C518" stroke="none" />
        <path d="M9.5 14.5a3.4 3.4 0 005 0" />
      </svg>
    </span>
  );
}

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`nav${stuck ? ' stuck' : ''}`}>
        <div className="wrap bar">
          <a className="logo" href="#top">
            <Logo />
            CASAIPAY
          </a>
          <nav className="links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="cta">
            <a className="btn sm btn-white" href={WHATSAPP} target="_blank" rel="noopener">
              WhatsApp
            </a>
            <a className="btn sm btn-gold primary" href="/app">
              Try the demo
            </a>
          </div>
          <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className={`mobile${open ? ' open' : ''}`}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={WHATSAPP} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
          WhatsApp us
        </a>
        <a href="/app" onClick={() => setOpen(false)}>
          Try the demo
        </a>
      </div>
    </>
  );
}

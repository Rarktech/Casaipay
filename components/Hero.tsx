'use client';

import { useState } from 'react';

export default function Hero({ mockAvatar }: { mockAvatar: string }) {
  const [live, setLive] = useState(false);

  return (
    <>
      <section className="hero" id="top">
        <div className="wrap grid">
          <div>
            <span className="pill p-gold hero-pill">Biometric payment infrastructure for Nigeria</span>
            <h1 style={{marginTop: "22px"}}>Your face<br />is your<br /><span className="navy-t">account.</span></h1>
            <p className="lead">Millions of Nigerians are locked out of digital money because it assumes a smartphone, an account number and a signal. CASAIPAY replaces all three with the one thing everybody already has.</p>
            <div className="actions">
              <a className="btn btn-gold" href="/app/">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M4 12h16"/></svg>
                Try the live demo
              </a>
              <a className="btn btn-white" href="#how">See how it works</a>
            </div>
            <p className="note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              A working prototype, not a mockup. Nothing you enter leaves your device.
            </p>
          </div>

          <div className="phone-stage">
            <div className="float-card fc-1">
              <span className="ic t-mint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg>
              </span>
              <span><b style={{fontSize: "13.5px"}}>Chidi verified</b><br /><span style={{fontSize: "11.5px", color: "var(--ink-3)"}}>in 1.4 seconds</span></span>
            </div>
            <div className="float-card fc-2">
              <span className="ic t-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h16l-1 11H5L4 9zM4 9l1.5-5h13L20 9"/></svg>
              </span>
              <span><b style={{fontSize: "13.5px"}}>₦3,500 paid</b><br /><span style={{fontSize: "11.5px", color: "var(--ink-3)"}}>no card, no cash</span></span>
            </div>

            <div className="phone">
              <div className="screen">
                {live ? (
                  <iframe
                    src="/app/#/u/home"
                    title="CASAIPAY interactive prototype"
                    allow="camera; clipboard-write"
                  />
                ) : (
                <div className="mock">
                  <div className="mock-top">
                    <span className="mock-av"><img src={mockAvatar} alt="" /></span>
                    <span><span style={{fontSize: "10px", color: "var(--ink-3)", display: "block"}}>Welcome back,</span>
                      <b style={{fontSize: "13px"}}>Chidi Okafor</b></span>
                  </div>
                  <div className="mock-card">
                    <div className="rule"></div>
                    <div style={{fontSize: "9px", letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(254,246,214,.6)", marginTop: "13px"}}>Your balance</div>
                    <div style={{fontFamily: "var(--font-d)", fontSize: "25px", fontWeight: "600", letterSpacing: "-.03em", marginTop: "4px"}}>
                      <span style={{fontSize: ".62em", color: "rgba(255,255,255,.6)"}}>₦</span>47,500.00</div>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px"}}>
                      <span style={{fontSize: "11px", color: "rgba(255,255,255,.7)"}}>@chidi</span>
                      <span style={{background: "rgba(245,197,24,.18)", color: "var(--gold)", fontSize: "9px", fontWeight: "700", padding: "4px 8px", borderRadius: "99px", letterSpacing: ".05em"}}>TIER 2</span>
                    </div>
                  </div>
                  <div className="mock-row">
                    <span className="mock-chip">↙ Request</span>
                    <span className="mock-chip">↗ Send</span>
                    <span className="mock-add">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#101418" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                    </span>
                  </div>
                  <div className="mock-grid">
                    <div className="mock-tile"><i>📱</i>Airtime</div>
                    <div className="mock-tile"><i>🌐</i>Data</div>
                    <div className="mock-tile"><i>⚡</i>Power</div>
                    <div className="mock-tile"><i>✈️</i>Flights</div>
                  </div>
                  <div className="mock-list">
                    <div style={{fontFamily: "var(--font-d)", fontSize: "14px", fontWeight: "600", marginBottom: "4px"}}>Transactions</div>
                    <div className="mock-item"><span className="ic">↗</span>
                      <span><span className="t">Mama Ngozi Stores</span><br /><span className="s">09:42 · Shop</span></span>
                      <span className="a">−₦3,500</span></div>
                    <div className="mock-item"><span className="ic" style={{background: "var(--mint)"}}>↙</span>
                      <span><span className="t">Musa Ibrahim</span><br /><span className="s">09:15 · CASAIPAY</span></span>
                      <span className="a" style={{color: "var(--mint-ink)"}}>+₦10,000</span></div>
                    <div className="mock-item"><span className="ic" style={{background: "#E8EDFA"}}>↗</span>
                      <span><span className="t">Ikeja Electric</span><br /><span className="s">08:30 · Bill</span></span>
                      <span className="a">−₦5,000</span></div>
                  </div>
                </div>
                )}
              </div>
              {!live && (
                  <button className="btn sm btn-navy phone-try" onClick={() => setLive(true)}>
                    Tap to try it live
                  </button>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

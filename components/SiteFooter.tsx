export default function SiteFooter() {
  return (
    <>
      <footer>
        <div className="wrap">
          <div className="foot">
            <div className="col" style={{flex: "1", minWidth: "240px"}}>
              <a className="logo" href="#top">
                <span className="mark">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 8V6a1 1 0 011-1h2M16 5h2a1 1 0 011 1v2M19 16v2a1 1 0 01-1 1h-2M8 19H6a1 1 0 01-1-1v-2"/>
                    <circle cx="9.5" cy="11" r="1.1" fill="#F5C518" stroke="none"/>
                    <circle cx="14.5" cy="11" r="1.1" fill="#F5C518" stroke="none"/>
                    <path d="M9.5 14.5a3.4 3.4 0 005 0"/></svg>
                </span>CASAIPAY
              </a>
              <p className="body" style={{marginTop: "16px", maxWidth: "34ch", fontSize: "14px"}}>Send online. Claim offline. Powered by identity.</p>
            </div>
            <div className="col"><h5>Product</h5>
              <a href="#how">How it works</a><a href="#security">Security</a>
              <a href="/app">Customer demo</a><a href="/app#/m/home">Merchant demo</a></div>
            <div className="col"><h5>Company</h5>
              <a href="#progress">Progress</a>
              <a href="https://www.linkedin.com/in/casaipay-ltd-24384a409" target="_blank" rel="noopener">LinkedIn</a>
              <a href="mailto:CASAIPAY15@gmail.com?subject=CASAIPAY%20—%20investor%20enquiry">Investors</a></div>
            <div className="col"><h5>Talk to us</h5>
              <a href="https://wa.me/2349134409739" target="_blank" rel="noopener">WhatsApp · 0913 440 9739</a>
              <a href="https://wa.me/2348142951619" target="_blank" rel="noopener">WhatsApp · 0814 295 1619</a>
              <a href="mailto:CASAIPAY15@gmail.com">CASAIPAY15@gmail.com</a></div>
            <div className="col"><h5>Legal</h5>
              <a href="#top">Terms</a><a href="#top">Privacy</a><a href="#top">Complaints</a></div>
          </div>
          <div className="foot-note">
            <span>© <span id="yr">2026</span> CASAIPAY. Registered in Nigeria.</span>
            <span>This site links to an interactive prototype. It moves no real money.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

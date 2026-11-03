export default function Gap() {
  return (
    <>
      <section className="sec">
        <div className="wrap">
          <div className="band rv">
            <span className="pill p-gold">The gap</span>
            <h2 style={{color: "#fff", marginTop: "20px", maxWidth: "16ch"}}>Not another payment app</h2>
            <p className="lead" style={{marginTop: "16px", maxWidth: "62ch"}}>Moniepoint, OPay, Paystack and Flutterwave already move money brilliantly. CASAIPAY asks a different question — and sits between two that nobody has answered together.</p>

            <div className="qs">
              <div className="q">
                <span className="eyebrow">A financial institution asks</span>
                <p>“Can I trust this customer?”</p>
              </div>
              <div className="bridge">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </div>
              <div className="q">
                <span className="eyebrow">A customer asks</span>
                <p>“Can I reach my money when I need it?”</p>
              </div>
            </div>

            <p className="lead" style={{marginTop: "38px", maxWidth: "64ch"}}>We are not building because fintech is growing. We are building because there is still a gap between institutions and millions of people — especially in informal economies where traditional systems struggle. That makes CASAIPAY an infrastructure layer the ecosystem plugs into, not one more app competing for the same transactions.</p>
          </div>
        </div>
      </section>
    </>
  );
}

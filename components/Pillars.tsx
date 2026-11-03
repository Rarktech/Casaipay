export default function Pillars() {
  return (
    <>
      <section className="sec" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow">The infrastructure</span>
            <h2 style={{marginTop: "14px"}}>Four pieces, one identity layer</h2>
          </div>
          <div className="cards">
            <div className="card rv">
              <span className="ic t-gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3M9 10v.5M15 10v.5M9 14.5a4 4 0 006 0"/></svg>
              </span>
              <h3>Biometric identity</h3>
              <p>Face and fingerprint replace account numbers, debit cards and smartphones. Who you are becomes the credential.</p>
            </div>
            <div className="card rv">
              <span className="ic t-mint">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8"/></svg>
              </span>
              <h3>Money that finds a person</h3>
              <p>Funds move to a verified identity rather than an account, so a recipient can be paid before they have ever opened one.</p>
            </div>
            <div className="card rv">
              <span className="ic t-blush">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 9h16l-1 11H5L4 9zM4 9l1.5-5h13L20 9M9 13v3M15 13v3"/></svg>
              </span>
              <h3>Community agent network</h3>
              <p>Trusted local shops become verification, onboarding and cash-out points. The agent's existing Android phone is the terminal — no hardware to buy.</p>
            </div>
            <div className="card rv">
              <span className="ic t-navy">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>
              </span>
              <h3>AI-powered rails</h3>
              <p>Identity verification, fraud detection, routing to the nearest agent, and clean integration with partner banks and licensed providers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function Security() {
  return (
    <>
      <section className="sec" id="security" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow">Security</span>
            <h2 style={{marginTop: "14px"}}>Designed for a real market, not a lab</h2>
            <p className="lead">Cameras fail in bad light. People get watched at the counter. Sometimes a person is not paying by choice. Each of these is a design problem, and each has an answer built in.</p>
          </div>
          <div className="cards three">
            <div className="card rv">
              <span className="ic t-gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              <h3>You choose the lock</h3>
              <p>Face ID alone, face plus passcode, or either one. A cracked lens or a dark stall shouldn't stop somebody buying rice.</p>
            </div>
            <div className="card rv">
              <span className="ic t-navy">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 11h14v10H5zM8 11V7a4 4 0 018 0v4"/></svg>
              </span>
              <h3>A keypad that reshuffles</h3>
              <p>Passcode digits move position after every tap, so watching somebody's fingers across a counter reveals nothing.</p>
            </div>
            <div className="card rv">
              <span className="ic t-blush">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v5M12 16v.5"/></svg>
              </span>
              <h3>Distress unlock</h3>
              <p>A second passcode — or a deliberate expression — opens the account showing a smaller balance you set. The payment completes, the real money stays put, and help is alerted quietly.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

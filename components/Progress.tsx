export default function Progress() {
  return (
    <>
      <section className="sec" id="progress" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow">Where we are</span>
            <h2 style={{marginTop: "14px"}}>Honest about the stage</h2>
            <p className="lead">Concept and prototype are done. The MVP is in build. Everything after that depends on this round, so it's framed by what the money unlocks rather than by calendar dates.</p>
          </div>
          <div className="rail">
            <div className="phase done rv"><div className="dot"></div><h4>Concept</h4>
              <p>Product, brand and go-to-market defined. CAC registration secured.</p></div>
            <div className="phase done rv"><div className="dot"></div><h4>Prototype</h4>
              <p>A working end-to-end demo of registration, verification and the payment flow.</p></div>
            <div className="phase now rv"><div className="dot"></div><h4>MVP &amp; regulation</h4>
              <p>Real-time build, biometric infrastructure, and the start of the CBN pathway.</p></div>
            <div className="phase rv"><div className="dot"></div><h4>Pilot &amp; agents</h4>
              <p>First agent network live, first real transactions, first evidence for a Series A.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

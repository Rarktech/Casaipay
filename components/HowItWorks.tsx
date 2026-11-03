export default function HowItWorks() {
  return (
    <>
      <section className="sec" id="how" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv">
            <span className="eyebrow">How it works</span>
            <h2 style={{marginTop: "14px"}}>Six steps from exclusion to inclusion</h2>
            <p className="lead">Money can be sent to someone who has never opened a bank account, and collected in cash from a shop down the road.</p>
          </div>
          <div className="steps">
            <div className="step rv"><div className="n">1</div><h4>Register the recipient</h4>
              <p>The sender enters a name and links a biometric identity. No account number needed.</p></div>
            <div className="step rv"><div className="n">2</div><h4>Send the money</h4>
              <p>The transfer is initiated exactly like any other payment.</p></div>
            <div className="step rv"><div className="n">3</div><h4>Money meets identity</h4>
              <p>CASAIPAY binds the payment to the recipient's biometric profile, not to an account.</p></div>
            <div className="step rv"><div className="n">4</div><h4>Walk to a nearby agent</h4>
              <p>The recipient visits any CASAIPAY agent with their personal code.</p></div>
            <div className="step rv"><div className="n">5</div><h4>Face confirms it's them</h4>
              <p>Verification happens on the agent's ordinary Android phone. No special hardware.</p></div>
            <div className="step rv"><div className="n">6</div><h4>Cash is released</h4>
              <p>And a CASAIPAY ID is issued, opening the door to savings, credit and insurance.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

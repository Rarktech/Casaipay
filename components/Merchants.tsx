export default function Merchants({ tillAvatar }: { tillAvatar: string }) {
  return (
    <>
      <section className="sec" id="merchants" style={{paddingTop: "0"}}>
        <div className="wrap split rev">
          <div className="col-a rv">
            <div className="till">
              <div style={{display: "flex", alignItems: "center", gap: "11px"}}>
                <span className="till-row av" style={{padding: "0", border: "0", margin: "0", width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden"}}>
                  <img src={tillAvatar} alt="" /></span>
                <span><b style={{fontSize: "14px"}}>Mama Ngozi Stores</b><br />
                  <span style={{fontSize: "11.5px", color: "rgba(255,255,255,.5)"}}>Ariaria Market, Aba</span></span>
              </div>
              <div style={{fontSize: "10px", letterSpacing: ".09em", textTransform: "uppercase", color: "rgba(254,246,214,.6)", marginTop: "24px"}}>Today's sales</div>
              <div className="sales">₦24,500.00</div>
              <div style={{fontSize: "12px", color: "rgba(255,255,255,.55)", marginTop: "6px"}}>11 payments · wallet ₦86,300.00</div>
              <div className="till-btn">⌗ Charge a customer</div>
              <div className="till-row"><span className="av"></span>
                <span><b style={{fontSize: "12.5px"}}>Chidi Okafor</b><br /><span style={{fontSize: "10.5px", color: "rgba(255,255,255,.5)"}}>09:42 · Face ID</span></span>
                <span style={{marginLeft: "auto", fontSize: "12.5px", fontWeight: "600", color: "var(--gold)"}}>+₦3,500</span></div>
              <div className="till-row"><span className="av"></span>
                <span><b style={{fontSize: "12.5px"}}>Musa Ibrahim</b><br /><span style={{fontSize: "10.5px", color: "rgba(255,255,255,.5)"}}>09:15 · Face ID</span></span>
                <span style={{marginLeft: "auto", fontSize: "12.5px", fontWeight: "600", color: "var(--gold)"}}>+₦12,000</span></div>
            </div>
          </div>
          <div className="rv">
            <span className="eyebrow">For shops and agents</span>
            <h2 style={{marginTop: "14px"}}>A till that runs on the phone already in the drawer</h2>
            <p className="lead" style={{marginTop: "16px"}}>A customer arrives with no cash and no card. The shop asks for a CASAIPAY ID, types the amount, and hands over the phone. The customer's face approves it and the money lands.</p>
            <ul className="checks">
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>No POS terminal.</b> Any Android phone becomes a verification point of sale.</span></li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>The customer's screen is private.</b> The interface visibly changes hands, and their balance stays hidden unless they reveal it.</span></li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>Money out, not just in.</b> Pay suppliers, settle to the bank, or send to any CASAIPAY ID.</span></li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>Earn as an agent.</b> Take cash claims and onboard neighbours for a share of every transaction.</span></li>
            </ul>
            <a className="btn btn-navy" style={{marginTop: "32px"}} href="/app#/m/home">Open the merchant demo</a>
          </div>
        </div>
      </section>
    </>
  );
}

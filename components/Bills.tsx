export default function Bills() {
  return (
    <>
      <section className="sec" style={{paddingTop: "0"}}>
        <div className="wrap split">
          <div className="col-a rv">
            <span className="eyebrow">Everyday use</span>
            <h2 style={{marginTop: "14px"}}>A reason to open it every day</h2>
            <p className="lead" style={{marginTop: "16px"}}>Identity is the foundation, but nobody adopts infrastructure. They adopt something useful. So the wallet handles the bills a Nigerian household actually pays.</p>
            <ul className="checks">
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>Airtime and data</b> across MTN, Airtel, Glo and 9mobile</span></li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>Electricity</b> for every disco, with the token on the receipt</span></li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>TV, water, internet, school fees</b> and betting wallets</span></li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>Domestic flights</b> booked and paid straight from the balance</span></li>
              <li><span className="tick"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5.2 5.2L20 7"/></svg></span>
                <span><b>Transfers to any Nigerian bank</b>, and free between CASAIPAY IDs</span></li>
            </ul>
          </div>
          <div className="rv">
            <div className="cards" style={{gridTemplateColumns: "1fr 1fr", marginTop: "0", gap: "14px"}}>
              <div className="card" style={{padding: "24px"}}><span className="ic t-gold" style={{width: "42px", height: "42px", borderRadius: "13px", marginBottom: "14px"}}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><path d="M7 2h10v20H7zM11 18.5h2"/></svg></span>
                <h4>Airtime</h4><p style={{fontSize: "13.5px", marginTop: "6px"}}>From ₦100</p></div>
              <div className="card" style={{padding: "24px"}}><span className="ic t-blush" style={{width: "42px", height: "42px", borderRadius: "13px", marginBottom: "14px"}}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg></span>
                <h4>Electricity</h4><p style={{fontSize: "13.5px", marginTop: "6px"}}>Token on receipt</p></div>
              <div className="card" style={{padding: "24px"}}><span className="ic t-navy" style={{width: "42px", height: "42px", borderRadius: "13px", marginBottom: "14px"}}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z"/></svg></span>
                <h4>Data</h4><p style={{fontSize: "13.5px", marginTop: "6px"}}>All four networks</p></div>
              <div className="card" style={{padding: "24px"}}><span className="ic t-mint" style={{width: "42px", height: "42px", borderRadius: "13px", marginBottom: "14px"}}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h20v10H2zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"/></svg></span>
                <h4>Flights</h4><p style={{fontSize: "13.5px", marginTop: "6px"}}>Domestic routes</p></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

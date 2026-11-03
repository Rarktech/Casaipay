export default function Team() {
  return (
    <>
      <section className="sec" style={{paddingTop: "0"}}>
        <div className="wrap">
          <div className="sec-head rv"><span className="eyebrow">Team</span>
            <h2 style={{marginTop: "14px"}}>Who's building it</h2></div>
          <div className="team">
            <article className="member rv">
              <img src="/img/team/dike.webp" alt="Dikeocha Precious" loading="lazy" width="520" height="520" />
              <h4>Dikeocha Precious</h4>
              <div className="role">CEO &amp; Co-Founder</div>
              <p>Carries the vision, and the responsibility of turning the idea into something real.</p>
            </article>
            <article className="member rv">
              <img src="/img/team/deborah.webp" alt="Deborah Enu" loading="lazy" width="520" height="520" />
              <h4>Deborah Enu</h4>
              <div className="role">COO &amp; Co-Founder</div>
              <p>Shapes the company, challenges the vision, and turns big ideas into something executable.</p>
            </article>
            <article className="member rv">
              <img src="/img/team/richard.webp" alt="Eze Richard Peter" loading="lazy" width="520" height="520" />
              <h4>Eze Richard Peter</h4>
              <div className="role">CTO &amp; Co-Founder</div>
              <p>Translates the vision into technology that actually works at scale.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

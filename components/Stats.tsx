export default function Stats() {
  return (
    <>
      <section className="stats">
        <div className="wrap grid">
          <div className="stat rv"><div className="v" data-count="28.8" data-suffix="M">0</div>
            <div className="l">Nigerian adults financially excluded</div><div className="src">EFInA, 2023</div></div>
          <div className="stat rv"><div className="v" data-count="64" data-suffix="%">0</div>
            <div className="l">Formal financial inclusion rate</div><div className="src">EFInA, 2023</div></div>
          <div className="stat rv"><div className="v" data-count="58" data-prefix="~" data-suffix="%">0</div>
            <div className="l">Of GDP from the informal economy</div><div className="src">Estimated, 57–58%</div></div>
          <div className="stat rv"><div className="v" data-count="200" data-prefix="₦" data-suffix="T+">0</div>
            <div className="l">Annual informal economic activity</div><div className="src">Estimated</div></div>
        </div>
      </section>
    </>
  );
}

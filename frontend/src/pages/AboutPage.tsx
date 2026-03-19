export default function AboutPage() {
  return (
    <div className="page about-page">
      <h1 className="about-title">About the AI Lab</h1>
      <p className="about-intro">
        A space for anyone to walk in and build something in 30 minutes —
        even with zero coding experience. You describe your idea, the AI builds it.
      </p>

      <section className="about-section">
        <h2>How It Works</h2>
        <div className="about-steps">
          <div className="about-step">
            <div className="step-num">1</div>
            <div className="step-text">
              Open Cursor and type <code>/new-game</code> to start your adventure
            </div>
          </div>
          <div className="about-step">
            <div className="step-num">2</div>
            <div className="step-text">
              Describe what you want — enemies, power-ups, colors, anything
            </div>
          </div>
          <div className="about-step">
            <div className="step-num">3</div>
            <div className="step-text">
              Test in your browser, iterate, and type <code>/finish</code> to ship it to the arcade
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>The Rules</h2>
        <ul className="about-rules">
          <li>Your game fits on one screen — no scrolling worlds</li>
          <li>Shapes, colors, and emojis are your sprites</li>
          <li>Every game has a score, a way to lose, and a way to restart</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Credits</h2>
        <p>Built by the AI Lab team. Games created by lab visitors like you.</p>
      </section>
    </div>
  )
}

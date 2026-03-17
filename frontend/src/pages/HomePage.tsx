import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GameCard, { type GameEntry } from '../components/GameCard'

export default function HomePage() {
  const [featured, setFeatured] = useState<GameEntry | null>(null)

  useEffect(() => {
    fetch('/games/games.json')
      .then((r) => r.json())
      .then((games: GameEntry[]) => {
        if (games.length > 0) {
          setFeatured(games[Math.floor(Math.random() * games.length)])
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="page home-page">
      <section className="hero">
        <h1 className="hero-title">AI Lab Arcade</h1>
        <p className="hero-sub">
          Build a game in 30 minutes. No experience needed.
        </p>
      </section>

      {featured && (
        <section className="featured-section">
          <h2 className="section-label">Featured Game</h2>
          <GameCard game={featured} />
        </section>
      )}

      <Link to="/games" className="btn-primary">
        Browse All Games
      </Link>
    </div>
  )
}

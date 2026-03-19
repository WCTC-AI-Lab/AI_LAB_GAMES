import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GameCard, { type GameEntry } from '../components/GameCard'

export default function HomePage() {
  const [featured, setFeatured] = useState<GameEntry | null>(null)
  const [sidebarGames, setSidebarGames] = useState<GameEntry[]>([])

  useEffect(() => {
    fetch('/games/games.json')
      .then((r) => r.json())
      .then((games: GameEntry[]) => {
        if (games.length > 0) {
          // Pick one random game for featured
          const featuredIndex = Math.floor(Math.random() * games.length)
          setFeatured(games[featuredIndex])
          
          // Pick 3 other random games (excluding featured) and shuffle
          const otherGames = games.filter((_, i) => i !== featuredIndex)
          const shuffled = [...otherGames].sort(() => Math.random() - 0.5)
          setSidebarGames(shuffled.slice(0, 3))
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

      <div className="home-games-layout">
        {featured && (
          <div className="featured-row">
            <section className="featured-section featured-large">
              <h2 className="section-label">Featured Game</h2>
              <GameCard game={featured} />
            </section>
            <Link to="/games" className="btn-primary">
              Browse All Games
            </Link>
          </div>
        )}

        {sidebarGames.length > 0 && (
          <section className="more-games-section">
            <h2 className="section-label">More Games</h2>
            <div className="more-games-row">
              {sidebarGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import GameCard, { type GameEntry } from '../components/GameCard'

export default function GamesPage() {
  const [games, setGames] = useState<GameEntry[]>([])

  useEffect(() => {
    fetch('/games/games.json')
      .then((r) => r.json())
      .then((data: GameEntry[]) => {
        // Shuffle so every visit feels different
        const shuffled = [...data].sort(() => Math.random() - 0.5)
        setGames(shuffled)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="page games-page">
      <div className="games-layout">
        <aside className="games-sidebar">
          <h3 className="sidebar-title">All Games</h3>
          <ul className="sidebar-list">
            {games.map((g) => (
              <li key={g.id}>
                <NavLink
                  to={`/games/${g.id}`}
                  className={({ isActive }) =>
                    'sidebar-item' + (isActive ? ' active' : '')
                  }
                >
                  {g.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </aside>
        <main className="games-main">
          <h2 className="section-label">Games</h2>
          <div className="games-grid">
            {games.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

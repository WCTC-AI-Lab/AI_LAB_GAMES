import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { GameEntry } from '../components/GameCard'

export default function PlayPage() {
  const { id } = useParams<{ id: string }>()
  const [game, setGame] = useState<GameEntry | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/games/games.json')
      .then((r) => r.json())
      .then((games: GameEntry[]) => {
        const found = games.find((g) => g.id === id)
        if (found) setGame(found)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [id])

  if (notFound) {
    return (
      <div className="play-page">
        <div className="play-not-found">
          <h2>Game not found</h2>
          <Link to="/games" className="btn-secondary">Browse Games</Link>
        </div>
      </div>
    )
  }

  if (!game) return null

  return (
    <div className="play-page">
      <div className="play-bar">
        <Link to="/games" className="play-back">&larr; Back to Games</Link>
        <h2 className="play-title">{game.name}</h2>
      </div>
      <iframe
        src={game.path}
        title={game.name}
        className="play-frame"
        allow="autoplay"
      />
    </div>
  )
}

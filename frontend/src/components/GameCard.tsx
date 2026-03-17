import { Link } from 'react-router-dom'

export type GameEntry = {
  id: string
  name: string
  description: string
  path: string
  thumbnail: string
  author: string
  tags: string[]
}

export default function GameCard({ game }: { game: GameEntry }) {
  return (
    <Link to={`/games/${game.id}`} className="game-card">
      <div className="game-card-thumb">
        <img
          src={game.thumbnail}
          alt={game.name}
          onError={(e) => {
            const el = e.currentTarget
            el.style.display = 'none'
            el.parentElement!.classList.add('game-card-thumb-fallback')
          }}
        />
        <span className="game-card-thumb-text">{game.name}</span>
      </div>
      <div className="game-card-body">
        <h3 className="game-card-title">{game.name}</h3>
        <p className="game-card-desc">{game.description}</p>
        <div className="game-card-meta">
          <span>{game.author}</span>
          <span>{game.tags.join(' · ')}</span>
        </div>
      </div>
    </Link>
  )
}

import { useEffect, useRef, useState } from 'react'
import './App.css'

const FIELD_WIDTH = 800
const FIELD_HEIGHT = 500
const PADDLE_WIDTH = 12
const PADDLE_HEIGHT = 80
const BALL_SIZE = 14
const PADDLE_SPEED = 400 // px per second
const BASE_BALL_SPEED = 380 // px per second
const BALL_SPEED_GROWTH = 0.2

type Vec2 = {
  x: number
  y: number
}

type Cell = {
  x: number
  y: number
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function SnakeGame() {
  const GRID_SIZE = 20
  const CELL_SIZE = 22
  const TICK_MS = 120

  const [snake, setSnake] = useState<Cell[]>([
    { x: 8, y: 10 },
    { x: 7, y: 10 },
    { x: 6, y: 10 },
  ])
  const [direction, setDirection] = useState<Cell>({ x: 1, y: 0 })
  const [food, setFood] = useState<Cell>({ x: 12, y: 10 })
  const [score, setScore] = useState(0)
  const [isDead, setIsDead] = useState(false)

  const dirRef = useRef(direction)
  const pendingDirRef = useRef<Cell | null>(null)

  dirRef.current = direction

  const randomFood = (body: Cell[]): Cell => {
    // Simple retry until empty cell
    for (let i = 0; i < 100; i++) {
      const candidate = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
      if (!body.some((c) => c.x === candidate.x && c.y === candidate.y)) {
        return candidate
      }
    }
    return { x: 0, y: 0 }
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'w' ||
        e.key === 'a' ||
        e.key === 's' ||
        e.key === 'd' ||
        e.key === ' ' ||
        e.key === 'Enter'
      ) {
        e.preventDefault()
      }

      if (isDead && (e.key === ' ' || e.key === 'Enter')) {
        // restart
        setSnake([
          { x: 8, y: 10 },
          { x: 7, y: 10 },
          { x: 6, y: 10 },
        ])
        setDirection({ x: 1, y: 0 })
        dirRef.current = { x: 1, y: 0 }
        setFood({ x: 12, y: 10 })
        setScore(0)
        setIsDead(false)
        return
      }

      let next: Cell | null = null
      if (e.key === 'ArrowUp' || e.key === 'w') next = { x: 0, y: -1 }
      else if (e.key === 'ArrowDown' || e.key === 's') next = { x: 0, y: 1 }
      else if (e.key === 'ArrowLeft' || e.key === 'a') next = { x: -1, y: 0 }
      else if (e.key === 'ArrowRight' || e.key === 'd') next = { x: 1, y: 0 }

      if (!next) return

      // Prevent instant reversal
      const cur = dirRef.current
      if (cur.x + next.x === 0 && cur.y + next.y === 0) return
      pendingDirRef.current = next
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isDead])

  useEffect(() => {
    if (isDead) return

    const id = setInterval(() => {
      setSnake((prev) => {
        const body = [...prev]
        const curDir = pendingDirRef.current ?? dirRef.current
        pendingDirRef.current = null
        if (curDir.x !== dirRef.current.x || curDir.y !== dirRef.current.y) {
          dirRef.current = curDir
          setDirection(curDir)
        }

        const head = body[0]
        const nextHead = { x: head.x + curDir.x, y: head.y + curDir.y }

        // Wall collision
        if (
          nextHead.x < 0 ||
          nextHead.y < 0 ||
          nextHead.x >= GRID_SIZE ||
          nextHead.y >= GRID_SIZE
        ) {
          setIsDead(true)
          return prev
        }

        // Self collision
        if (body.some((c) => c.x === nextHead.x && c.y === nextHead.y)) {
          setIsDead(true)
          return prev
        }

        const newBody = [nextHead, ...body]

        // Eat food
        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore((s) => s + 1)
          setFood(randomFood(newBody))
          return newBody
        }

        newBody.pop()
        return newBody
      })
    }, TICK_MS)

    return () => clearInterval(id)
  }, [food, isDead])

  const boardPx = GRID_SIZE * CELL_SIZE

  return (
    <div className="snake-root">
      <h2 className="snake-title">Snake</h2>
      <div className="snake-info">
        <span>Score: {score}</span>
        <span>Controls: Arrow keys / WASD</span>
      </div>
      <div
        className="snake-board"
        style={{ width: boardPx, height: boardPx }}
      >
        {snake.map((segment, idx) => (
          <div
            key={idx}
            className={idx === 0 ? 'snake-cell snake-head' : 'snake-cell'}
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          />
        ))}
        <div
          className="snake-food"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
          }}
        />
        {isDead && (
          <div className="snake-overlay">
            <div className="snake-overlay-card">
              <div>Game Over</div>
              <div>Final score: {score}</div>
              <div className="snake-overlay-hint">Press Space or Enter to restart</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [leftPaddleY, setLeftPaddleY] = useState(() => FIELD_HEIGHT / 2 - PADDLE_HEIGHT / 2)
  const [rightPaddleY, setRightPaddleY] = useState(() => FIELD_HEIGHT / 2 - PADDLE_HEIGHT / 2)
  const [ballPos, setBallPos] = useState<Vec2>(() => ({
    x: FIELD_WIDTH / 2 - BALL_SIZE / 2,
    y: FIELD_HEIGHT / 2 - BALL_SIZE / 2,
  }))
  const [ballVel, setBallVel] = useState<Vec2>(() => {
    const len = Math.hypot(1, 0.35)
    return { x: 1 / len, y: 0.35 / len } // unit direction vector
  })
  const [scoreLeft, setScoreLeft] = useState(0)
  const [scoreRight, setScoreRight] = useState(0)

  const keysRef = useRef<{ [key: string]: boolean }>({})
  const lastTimeRef = useRef<number | null>(null)
  const roundTimeRef = useRef(0) // seconds since last serve
  const ballVelRef = useRef<Vec2>({
    x: ballVel.x,
    y: ballVel.y,
  })
  const leftPaddleYRef = useRef(leftPaddleY)
  const rightPaddleYRef = useRef(rightPaddleY)

  leftPaddleYRef.current = leftPaddleY
  rightPaddleYRef.current = rightPaddleY
  ballVelRef.current = ballVel

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
      }
      keysRef.current[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Game loop
  useEffect(() => {
    let frameId: number

    const resetBall = (direction: 1 | -1) => {
      roundTimeRef.current = 0
      setBallPos({
        x: FIELD_WIDTH / 2 - BALL_SIZE / 2,
        y: FIELD_HEIGHT / 2 - BALL_SIZE / 2,
      })
      const offset = Math.random() * 0.6 - 0.3
      const len = Math.hypot(1, offset) || 1
      const dir = {
        x: (direction * 1) / len,
        y: offset / len,
      }
      ballVelRef.current = dir
      setBallVel(dir)
    }

    const step = (timestamp: number) => {
      if (lastTimeRef.current == null) {
        lastTimeRef.current = timestamp
        frameId = requestAnimationFrame(step)
        return
      }

      const dt = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp
      roundTimeRef.current += dt

      const currentSpeed =
        BASE_BALL_SPEED * (1 + BALL_SPEED_GROWTH * Math.log(1 + roundTimeRef.current))

      // Paddles
      setLeftPaddleY((prev) => {
        let next = prev
        if (keysRef.current['w']) next -= PADDLE_SPEED * dt
        if (keysRef.current['s']) next += PADDLE_SPEED * dt
        return clamp(next, 0, FIELD_HEIGHT - PADDLE_HEIGHT)
      })

      setRightPaddleY((prev) => {
        let next = prev
        if (keysRef.current['arrowup']) next -= PADDLE_SPEED * dt
        if (keysRef.current['arrowdown']) next += PADDLE_SPEED * dt
        return clamp(next, 0, FIELD_HEIGHT - PADDLE_HEIGHT)
      })

      // Ball + collisions
      setBallPos((prevPos) => {
        let { x, y } = prevPos
        let dirX = ballVelRef.current.x
        let dirY = ballVelRef.current.y

        x += dirX * currentSpeed * dt
        y += dirY * currentSpeed * dt

        // Top/bottom walls
        if (y <= 0) {
          y = 0
          dirY = Math.abs(dirY)
        } else if (y + BALL_SIZE >= FIELD_HEIGHT) {
          y = FIELD_HEIGHT - BALL_SIZE
          dirY = -Math.abs(dirY)
        }

        // Left paddle
        const leftX = 30
        if (
          x <= leftX + PADDLE_WIDTH &&
          x >= leftX &&
          y + BALL_SIZE >= leftPaddleYRef.current &&
          y <= leftPaddleYRef.current + PADDLE_HEIGHT &&
          dirX < 0
        ) {
          x = leftX + PADDLE_WIDTH
          dirX = Math.abs(dirX)
          const hitPos =
            (y + BALL_SIZE / 2 - (leftPaddleYRef.current + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2)
          dirY = hitPos * 1.1
        }

        // Right paddle
        const rightX = FIELD_WIDTH - 30 - PADDLE_WIDTH
        if (
          x + BALL_SIZE >= rightX &&
          x + BALL_SIZE <= rightX + PADDLE_WIDTH &&
          y + BALL_SIZE >= rightPaddleYRef.current &&
          y <= rightPaddleYRef.current + PADDLE_HEIGHT &&
          dirX > 0
        ) {
          x = rightX - BALL_SIZE
          dirX = -Math.abs(dirX)
          const hitPos =
            (y + BALL_SIZE / 2 - (rightPaddleYRef.current + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2)
          dirY = hitPos * 1.1
        }

        // Scoring
        if (x + BALL_SIZE < 0) {
          setScoreRight((s) => s + 1)
          resetBall(1)
          return prevPos
        }
        if (x > FIELD_WIDTH) {
          setScoreLeft((s) => s + 1)
          resetBall(-1)
          return prevPos
        }

        // Normalize and apply updated direction
        const len = Math.hypot(dirX, dirY) || 1
        const nx = dirX / len
        const ny = dirY / len

        if (nx !== ballVel.x || ny !== ballVel.y) {
          const nextDir = { x: nx, y: ny }
          ballVelRef.current = nextDir
          setBallVel(nextDir)
        }

        return { x, y }
      })

      frameId = requestAnimationFrame(step)
    }

    frameId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(frameId)
      lastTimeRef.current = null
    }
  }, [])

  return (
    <div className="page-root">
      <div className="pong-root">
        <h1 className="pong-title">2-Player Pong</h1>
        <div className="pong-scores">
          <span>Player 1: {scoreLeft}</span>
          <span>Player 2: {scoreRight}</span>
        </div>
        <div
          className="pong-field"
          style={{ width: FIELD_WIDTH, height: FIELD_HEIGHT }}
        >
          <div
            className="pong-paddle pong-paddle-left"
            style={{ top: leftPaddleY, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}
          />
          <div
            className="pong-paddle pong-paddle-right"
            style={{ top: rightPaddleY, width: PADDLE_WIDTH, height: PADDLE_HEIGHT }}
          />
          <div
            className="pong-ball"
            style={{ left: ballPos.x, top: ballPos.y, width: BALL_SIZE, height: BALL_SIZE }}
          />
          <div className="pong-center-line" />
        </div>
        <div className="pong-controls">
          <div>
            <strong>Player 1</strong>: W / S
          </div>
          <div>
            <strong>Player 2</strong>: ↑ / ↓
          </div>
        </div>
      </div>

      <div className="divider" />

      <SnakeGame />
    </div>
  )
}

export default App

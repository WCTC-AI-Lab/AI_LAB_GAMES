import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import PlayPage from './pages/PlayPage'
import AboutPage from './pages/AboutPage'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/games/:id" element={<PlayPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

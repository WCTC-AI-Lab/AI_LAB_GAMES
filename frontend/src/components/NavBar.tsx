import { NavLink } from 'react-router-dom'

const LIVE_APP_URL = 'https://zealous-coast-060765e0f.2.azurestaticapps.net/'
const DEV_APP_URL = '#' // Placeholder for now

export default function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        AI Lab Arcade
      </NavLink>
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/about">About</NavLink>
        <div className="navbar-deploy-links">
          <a 
            href={LIVE_APP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="deploy-link live-link"
          >
            Live App
          </a>
          <a 
            href={DEV_APP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="deploy-link dev-link"
            style={{ opacity: DEV_APP_URL === '#' ? 0.5 : 1, cursor: DEV_APP_URL === '#' ? 'not-allowed' : 'pointer' }}
          >
            Dev App
          </a>
        </div>
      </div>
    </nav>
  )
}

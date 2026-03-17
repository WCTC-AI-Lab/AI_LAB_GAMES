import { NavLink } from 'react-router-dom'

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
      </div>
    </nav>
  )
}

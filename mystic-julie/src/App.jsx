import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MerchPage from './pages/MerchPage'
import SponsorPage from './pages/SponsorPage'
import ConnectPage from './pages/ConnectPage'
import ContentPage from './pages/ContentPage'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('mystic-julie-theme') === 'dark'
    }
    return false
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    window.localStorage.setItem('mystic-julie-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <>
      <nav className="top-nav">
        <NavLink className="brand" to="/">
          @mysticjuliettv
        </NavLink>
        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/content">Content</NavLink>
          <NavLink to="/merch">Merch</NavLink>
          <NavLink to="/sponsor">Sponsors</NavLink>
          <NavLink to="/connect">Contact Me!</NavLink>
          <button
            type="button"
            className={`theme-toggle ${darkMode ? 'is-dark' : 'is-light'}`}
            onClick={() => setDarkMode((value) => !value)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="theme-toggle-handle" aria-hidden="true">
              {darkMode ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/content" element={<ContentPage />} />
        <Route path="/merch" element={<MerchPage />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="/connect" element={<ConnectPage />} />
      </Routes>
    </>
  )
}

export default App

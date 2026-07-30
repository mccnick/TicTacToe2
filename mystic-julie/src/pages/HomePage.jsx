import { useEffect, useState } from 'react'
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube, FaDiscord, FaHeart, FaCrown, FaTwitch } from 'react-icons/fa6'
import heroImg from '../assets/profile-pic.jpeg'
import '../App.css'

const socialLinks = [
  { label: 'Twitch', url: 'https://www.twitch.tv/mysticjulie', icon: <FaTwitch /> },
  { label: 'YouTube', url: 'https://www.youtube.com/@mysticjuliettv', icon: <FaYoutube /> },
  { label: 'Instagram', url: 'https://www.instagram.com/mysticjuliettv/', icon: <FaInstagram /> },
  { label: 'TikTok', url: 'https://www.tiktok.com/@mysticjuliettv', icon: <FaTiktok /> },
  { label: 'Twitter/X', url: 'https://x.com/mysticjuliettv', icon: <FaXTwitter /> },
  { label: 'Discord', url: 'https://discord.com/invite/YpkEYhy9qs', icon: <FaDiscord /> },
]

function HomePage() {
  const [isLive, setIsLive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [followers, setFollowers] = useState(null)
  const [followersError, setFollowersError] = useState(false)

  useEffect(() => {
    const checkTwitchStatus = async () => {
      try {
        const response = await fetch('/api/twitch-status')
        if (response.ok) {
          const data = await response.json()
          setIsLive(data.isLive)
        } else {
          setIsLive(false)
        }
      } catch (error) {
        console.error('Failed to fetch Twitch status:', error)
        setIsLive(false)
      } finally {
        setIsLoading(false)
      }
    }

    const fetchFollowerCount = async () => {
      try {
        const response = await fetch('/api/twitch-followers')
        if (response.ok) {
          const data = await response.json()
          if (typeof data.total === 'number') {
            setFollowers(data.total)
            return
          }
        }
        setFollowersError(true)
      } catch (error) {
        console.error('Failed to fetch Twitch followers:', error)
        setFollowersError(true)
      }
    }

    checkTwitchStatus()
    fetchFollowerCount()

    const interval = setInterval(checkTwitchStatus, 180000)
    return () => clearInterval(interval)
  }, [])

  const followerLabel = followers
    ? `${new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 1,
      }).format(followers)}+`
    : followersError
    ? 'Follower count unavailable'
    : '...'

  return (
    <div className="page-shell">
      <header id="home" className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">✿ Twitch streamer ({followerLabel}) • content creator for <a href="https://www.aftermathesports.com/">AfterMath Esports</a> ✿</p>
          <h1>Hi, I’m Julie!</h1>
          <p className="intro">
            I’m a variety streamer on Twitch (and YouTube!) who loves Just Chatting, playing games,
            and more! Please join the stream and say hello :)
          </p>

          <div className="cta-row">
            <a className="btn btn-primary" href="https://www.twitch.tv/mysticjulie" target="_blank" rel="noreferrer">
              Watch me live on Twitch ✨
            </a>
            <a className="btn btn-secondary" href="https://discord.com/invite/YpkEYhy9qs" target="_blank" rel="noreferrer">
              Join my Discord Community 💖
            </a>
          </div>

          {/* Dynamic Live Status Indicator */}
          {!isLoading && (
            <div className="live-status-container" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isLive ? (
                <>
                  <div className="pulsing-dot" style={{ width: '12px', height: '12px', backgroundColor: '#ff5c5c', borderRadius: '50%', boxShadow: '0 0 8px #ff5c5c' }}></div>
                  <span style={{ color: '#ff5c5c', fontWeight: 'bold', letterSpacing: '0.5px' }}>LIVE NOW ON TWITCH</span>
                </>
              ) : (
                <>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#888', borderRadius: '50%' }}></div>
                  <span style={{ color: '#aaa', fontWeight: '500', letterSpacing: '0.5px' }}>CURRENTLY OFFLINE</span>
                </>
              )}
            </div>
          )}

        </div>

        <div className="hero-visual">
          <img src={heroImg} alt="Mystic Julie branding artwork" />
          <div className="badge">
            <strong>Content Creator from:</strong>
            <span>Alberta, Canada</span>
            <span>(Mountain Time)</span>
          </div>
        </div>
      </header>

{/* --- NEW CONDITIONAL LIVE STREAM SECTION --- */}
      {isLive && (
        <section 
          className="trailer-panel" 
          id="live-stream" 
          style={{ marginTop: '24px', padding: '12px' }} // <-- Overrides the default 24px padding
        >
          <div className="embed-wrapper">
            <iframe
// MYSTIC JULIE (Ready for launch)
              src="https://player.twitch.tv/?channel=mysticjulie&parent=localhost&parent=mysticjulie.com&parent=www.mysticjulie.com&autoplay=true&muted=false"
              
              // TRASHLEY (For testing right now)
             // src="https://player.twitch.tv/?channel=trashley&parent=localhost&parent=mysticjulie.com&parent=www.mysticjulie.com&autoplay=true&muted=false"
              allowFullScreen
              title="mysticjulie Twitch Stream"
            ></iframe>
          </div>
        </section>
      )}
      {/* ------------------------------------------- */}

      <section className="support-section" id="support" style={{ marginTop: '24px' }}>
        <h2>Ways to support me :DD</h2>
        <div className="support-links cta-row" aria-label="Support links">
          <a className="btn btn-secondary" href="https://www.twitch.tv/mysticjulie/subscribe" target="_blank" rel="noreferrer">
            <FaTwitch />
            <span style={{ marginLeft: 8 }}>Subscribe on Twitch!</span>
          </a>
          <a className="btn btn-secondary" href="https://streamelements.com/mysticjulie/tip" target="_blank" rel="noreferrer">
            <FaHeart />
            <span style={{ marginLeft: 8 }}>Tip Jar Donation (PayPal)</span>
          </a>
          <a className="btn btn-secondary" href="https://throne.com/mysticjuliettv" target="_blank" rel="noreferrer">
            <FaCrown />
            <span style={{ marginLeft: 8 }}>Throne Wishlist (Gifts)</span>
          </a>
        </div>
      </section>

      <section className="links-section" id="socials">
        <h2> Follow me on my socials :) </h2>
        <div className="social-links social-links-grid" aria-label="Mystic Julie social links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
              <span>{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* --- NEW SPOTIFY EMBED SECTION --- */}
      <section id="spotify-player" style={{ marginTop: '24px', width: '100%' }}>
        <iframe 
          data-testid="embed-iframe" 
          style={{ borderRadius: '12px', border: 'none' }} 
          src="https://open.spotify.com/embed/track/11LVusiZcEO0gl0tpHVBCa?utm_source=generator&theme=0&si=c20e724a88c84dbe" 
          width="100%" 
          height="152" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          title="Spotify Embed"
        ></iframe>
      </section>
      {/* --------------------------------- */}

    </div>
  )
}

export default HomePage
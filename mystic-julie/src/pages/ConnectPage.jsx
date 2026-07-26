import '../App.css'
import creatorImage from '../assets/mystic-julie-content-creator.jpeg'

function ConnectPage() {
  return (
    <div className="page-shell">
      {/* Removed contact-panel-grid, added centered-panel */}
      <section className="panel contact-panel centered-panel">
        <div className="contact-panel-copy">
          <h2>Let’s stay connected, contact me!</h2>
          <p>
            Business inquiries and collaborations: <a href="mailto:mystical582@gmail.com">mystical582@gmail.com</a>
          </p>
          <img
            className="contact-image"
            src={creatorImage}
            alt="mysticulie content creator"
          />
        </div>
      </section>
    </div>
  )
}

export default ConnectPage
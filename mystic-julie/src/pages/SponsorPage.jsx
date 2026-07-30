import '../App.css'
import alfricEdenImage from '../assets/alfric-eden.jpeg'
import amesports from '../assets/Aftermath-Esports.jpeg'

function SponsorPage() {
  return (
    <div className="page-shell">
      <section className="panel sponsor-panel sponsor-panel-grid">
        <div className="sponsor-panel-copy">
          <h2>Aelfric Eden</h2>
          <p>
            Support my channel on Aelfric Eden and use code <strong>"myst25"</strong> at checkout.
          </p>
          <a
            className="btn btn-primary"
            href="https://www.aelfriceden.com/?tw_source=google&tw_adid=618776589059&utm_campaign=1629698785&tw_source=google&tw_adid=618776589059&tw_campaign=1629698785&tw_kwdid=aud-772302520220%3Akwd-1728793032842&gad_source=1&gad_campaignid=1629698785&gbraid=0AAAAAC51cPLqp1V5sNRLTyt8nSqKxPwFa&gclid=CjwKCAjwt7XQBhBkEiwAtStpp-ePIxhfmu7-t7dk4MxwSNwe3ovzJYPXHYzpiKlDlmfXo0lW5Y3pXBoCyRQQAvD_BwE"
            target="_blank"
            rel="noreferrer"
          >
            Shop Aelfric Eden
          </a>
        </div>

        <div className="sponsor-panel-visual">
          <img
            className="sponsor-image"
            src={alfricEdenImage}
            alt="Aelfric Eden discount code"
          />
        </div>
      </section>
      <section className="panel sponsor-panel sponsor-panel-grid">
        <div className="sponsor-panel-copy">
          <h2>Aftermath Esports</h2>
          <p>
            I am a content creator for Aftermath Esports, please check them out below!
          </p>
          <a
            className="btn btn-primary"
            href="https://www.aftermathesports.com/"
            target="_blank"
            rel="noreferrer"
          >
            Aftermath Esports
          </a>
        </div>

        <div className="sponsor-panel-visual">
          <img
            className="sponsor-image"
            src={amesports}
            alt="Aelfric Eden discount code"
          />
        </div>
      </section>
    </div>
  )
}

export default SponsorPage

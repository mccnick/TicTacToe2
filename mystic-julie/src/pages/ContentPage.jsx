import '../App.css'

const trailerVideo = {
  title: 'Channel Trailer',
  url: 'https://www.twitch.tv/videos/2629823914',
  embedUrl:
    'https://player.twitch.tv/?video=2629823914&parent=localhost&parent=mysticjulie.com&parent=www.mysticjulie.com&autoplay=false',
  description:
    'Check out my Twitch channel trailer!',
}

const highlightClip = {
    title: 'IRL Picnic :DD',
    embedUrl:
      'https://clips.twitch.tv/embed?clip=HedonisticEnticingOwlDxAbomb-s--cBj6OeBkB6bxL&parent=localhost&parent=mysticjulie.com&parent=www.mysticjulie.com',
    description: 'Funny clip of this dog eating our food!! hehe',
}

const clipVideos = [
  {
      title: 'Valorant Ace Clip',
  embedUrl:
    'https://clips.twitch.tv/embed?clip=MiniatureCreativeGoblinStoneLightning-wMSkUbFUcS7YSooQ&parent=localhost&parent=mysticjulie.com&parent=www.mysticjulie.com',
  description: 'Check out my ace during a tournament scrim :o',
  },
  {
    title: 'Funny IRL Stream Moment during a 24hr Stream with Alisa_Veez!',
    embedUrl:
      'https://clips.twitch.tv/embed?clip=GenerousVibrantKangarooEleGiggle-q2FOJxrRJjyQdaVC&parent=localhost&parent=mysticjulie.com&parent=www.mysticjulie.com',
    description: 'LOL',
  },
  {
    title: 'A nasty clutch on Valorant :DD',
    embedUrl:
      'https://clips.twitch.tv/embed?clip=LovelyVenomousLeopardShadyLulu-W_CQY0i6jAcXUFvF&parent=localhost&parent=mysticjulie.com&parent=www.mysticjulie.com',
      description: 'WOOOO',
  }
]

function ContentPage() {
  return (
    <div className="page-shell">
      <section className="panel content-panel">
        <div className="panel-header-row">
          <h2>Check out my channel trailer and some of my favorite clips :DD</h2>
          <a
            className="btn btn-secondary"
            href="https://www.twitch.tv/mysticjulie/clips?range=all"
            target="_blank"
            rel="noreferrer"
          >
            👉 All My Clips 👈
          </a>
        </div>

        <div className="trailer-panel">
          <div className="trailer-header">
            <h3>{trailerVideo.title}</h3>
            <p>{trailerVideo.description}</p>
          </div>

          <div className="embed-wrapper">
            <iframe
              title="Channel trailer"
              src={trailerVideo.embedUrl}
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </div>

        <div className="trailer-panel">
          <div className="trailer-header">
            <h3>{highlightClip.title}</h3>
            <p>{highlightClip.description}</p>
          </div>

          <div className="embed-wrapper">
            <iframe
              title="Valorant ace clip"
              src={highlightClip.embedUrl}
              allowFullScreen
              frameBorder="0"
              scrolling="no"
            />
          </div>
        </div>

        {clipVideos.map((clip) => (
          <div key={clip.title} className="trailer-panel">
            <div className="trailer-header">
              <h3>{clip.title}</h3>
              <p>{clip.description}</p>
            </div>

            <div className="embed-wrapper">
              <iframe
                title={clip.title}
                src={clip.embedUrl}
                allowFullScreen
                frameBorder="0"
                scrolling="no"
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ContentPage
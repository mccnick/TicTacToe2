import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5178
const CLIENT_ID = process.env.TWITCH_CLIENT_ID
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET
const CHANNEL_LOGIN = process.env.TWITCH_CHANNEL_LOGIN || 'mysticjulie'

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.warn('Twitch client ID and secret are required. Set TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET in .env.')
}

let tokenCache = {
  value: null,
  expiresAt: 0,
}

// 1. THIS FUNCTION STAYS EXACTLY THE SAME AS YOUR ORIGINAL CODE
async function getAppAccessToken() {
  const now = Date.now()
  if (tokenCache.value && tokenCache.expiresAt > now + 10000) {
    return tokenCache.value
  }

  const url = new URL('https://id.twitch.tv/oauth2/token')
  url.searchParams.set('client_id', CLIENT_ID)
  url.searchParams.set('client_secret', CLIENT_SECRET)
  url.searchParams.set('grant_type', 'client_credentials')

  // Reverted this back to fetching the token url
  const response = await fetch(url.toString(), {
    method: 'POST',
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(`Failed to fetch Twitch token: ${data.message || response.statusText}`)
  }

  tokenCache = {
    value: data.access_token,
    expiresAt: now + (data.expires_in || 3600) * 1000,
  }
  return data.access_token
}

async function getTwitchUserId(accessToken) {
  const response = await fetch(`https://api.twitch.tv/helix/users?login=${CHANNEL_LOGIN}`, {
    headers: {
      'Client-ID': CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await response.json()
  if (!response.ok || !data.data?.length) {
    throw new Error('Failed to fetch Twitch user info')
  }
  return data.data[0].id
}

// 2. THIS IS THE ONLY PLACE THE NEW ENDPOINT GOES
app.get('/api/twitch-followers', async (req, res) => {
  try {
    const accessToken = await getAppAccessToken()
    const userId = await getTwitchUserId(accessToken)
    
    // Updated endpoint below!
    const response = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}`, {
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    })
    
    const data = await response.json()
    if (!response.ok) {
      throw new Error('Failed to fetch Twitch followers')
    }
    
    // The new API still returns the total count in the same way, 
    // so this line works perfectly as-is:
    res.json({ total: data.total }) 
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to fetch Twitch followers' })
  }
})

app.get('/api/twitch-status', async (req, res) => {
  try {
    const accessToken = await getAppAccessToken()
    const userId = await getTwitchUserId(accessToken)
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        'Client-ID': CLIENT_ID,
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error('Failed to fetch Twitch live status')
    }
    res.json({ isLive: Boolean(data.data?.length) })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Unable to fetch Twitch status' })
  }
})

app.listen(PORT, () => {
  console.log(`Twitch proxy ready at http://localhost:${PORT}`)
})
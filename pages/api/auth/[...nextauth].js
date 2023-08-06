import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

const scope = "user-top-read user-read-email user-read-private"
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const basic = Buffer.from(client_id + ':' + client_secret).toString('base64')

async function refreshAccessToken(token) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }),
  })
  const data = await response.json()
  return {
    ...token,
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? token.refreshToken,
    accessTokenExpires: Date.now() + data.expires_in * 1000,
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      authorization: {
        params: {scope},
      },
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accesTokenExpires = account.expires_at
        return token
      }

      return await refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  }
}

export default NextAuth(authOptions)
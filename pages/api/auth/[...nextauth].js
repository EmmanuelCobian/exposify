import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

const scope = "user-top-read user-read-email user-read-private"

const allowedUsers = [
  'rcobian2321@gmail.com',
  'alexbeltram120@gmail.com',
  'meme11648@gmail.com',
  'd39146@gmail.com',
  'jvalera5678@gmail.com',
  'jeffdaniel365@yahoo.com',
  'maxwellzking@gmail.com',
  'andybabson@gmail.com',
  'abarrios20@icloud.com',
  'ecobian12310@gmail.com'
]

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope }
      }
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user?.email && allowedUsers.includes(user?.email)
    },
    async jwt({ token, account }) {
      if (account?.access_token) {
        token.access_token = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.access_token
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('error=OAuthCallback')) {
        console.log('MADE IT HERE')
        return `${baseUrl}/auth/unauthorized`
      }
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return baseUrl
    }
  },
  pages: {
    error: '/auth/unauthorized'
  }
}

const authHandler = NextAuth(authOptions);
export default async function handler(...params) {
  await authHandler(...params);
}
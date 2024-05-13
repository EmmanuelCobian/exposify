import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"

const scope = "user-top-read user-read-email user-read-private"

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
    async signIn({user}) {
      let allowedUsers = ['rcobian2321@gmail.com', 'alexbeltram120@gmail.com', 'meme11648@gmail.com', 'd39146@gmail.com', 'jvalera5678@gmail.com', 'jeffdaniel365@yahoo.com', 'maxwellzking@gmail.com', 'andybabson@gmail.com', 'abarrios20@icloud.com', 'ecobian12310@gmail.com']
      if (allowedUsers.includes(user.email)) {
        return true
      }
      return false
    },
    async jwt({token, user, account, profile, isNewUser}) {
      if (account?.access_token) {
        token.access_token = account.access_token
      }
      return token
    },
    async session({session, user, token }) {
      session.accessToken = token.access_token
      return session
    }
  }
}

export default NextAuth(authOptions)
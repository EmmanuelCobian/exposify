import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { getUsersTop } from '../../lib/spotify'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }

  const response = (await getUsersTop(session.accessToken, 'artists', 'long_term'))
  const {items} = await response.json()

  return res.status(200).json({items})
}

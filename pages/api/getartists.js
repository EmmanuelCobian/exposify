import { authOptions } from './auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { getArtists } from '../../lib/spotify'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "You must be logged in." })
    return
  }

  const response = (await getArtists(session.accessToken, '20nWuvMfCct9xv73hRYO7O%2C5j3PVTaVrMlssk4IC0kumd%2C6uPySFAh7ybNc4f3wLzUWc%2C21LNnhb2HeDDw2DoCTH0cW%2C4sXb22eyy3cbr6C2qNg6CB%2C0zGRuj0aQ3mM6i2dQoO8h0'))
  const {artists} = await response.json()
  return res.status(200).json({artists})
}

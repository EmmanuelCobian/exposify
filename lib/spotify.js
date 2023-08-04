const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists'
const TOP_ENDPOINT = 'https://api.spotify.com/v1/me/top/'
const GET_ARTIST_ENDPOINT = 'https://api.spotify.com/v1/artists'

export const getUsersPlaylists = async (auth_code) => {
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${auth_code}`,
    },
  })
}

export const getUsersTop = async (auth_code, type, range, limit) => {
  return fetch(TOP_ENDPOINT + type + '?time_range=' + range + '&limit=' + limit, {
    headers: {
      Authorization: `Bearer ${auth_code}`,
    },
  })
}

export const getArtists = async (auth_code, artists) => {
  return fetch(GET_ARTIST_ENDPOINT + '?ids=' + artists, {
    headers: {
      Authorization: `Bearer ${auth_code}`,
    },
  })
}
import { useState } from 'react'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from 'react-bootstrap/Navbar'
import { Container, Button, Row, Col } from 'react-bootstrap'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session} = useSession()
  const [list, setList] = useState([])
  const [artists, setArtists] = useState([])
  const [avgPop, setAvgPop] = useState(0)

  const getMyPlaylists = async () => {
    const res = await fetch('/api/playlists')
    const {items} = await res.json()
    setList(items)
  }

  const getMyTopArtists = async () => {
    const res = await fetch('/api/topartists')
    const {items} = await res.json()
    let cumSum = 0
    for (let i = 0; i < items.length; i++) {
      let popularity = items[i].popularity
      cumSum += popularity
    }
    setAvgPop(cumSum / items.length)
    setArtists(items)
  }

  const getArtists = async () => {
    const res = await fetch('/api/getartists')
    const {artists} = await res.json()
    let cumSum = 0
    for (let i = 0; i < artists.length; i++) {
      let popularity = artists[i].popularity
      cumSum += popularity
    }
    setAvgPop(cumSum / artists.length)
    setArtists(artists)
  }

  if (session) {
    return (
      <>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">Spotify API</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <span>{session.user.name}</span>
              </Navbar.Text>
              <Button className='ms-2' variant='outline-primary' onClick={() => signOut()}>Sign out</Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        
        <section className='text-center'>
          <Container>
            <Button variant='info' onClick={() => getArtists()}>Get my top artists</Button>
            <Row>
              {artists.map((item) => (
                <Col key={item.id}>
                  <h6>{item.name}, {item.popularity}</h6>
                  <img src={item.images[0]?.url} width="100" height="100"/>
                </Col>
              ))}
            </Row>
            <p>Average score: {avgPop}</p>
          </Container>
        </section>
      </>
    );
  }
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Spotify API</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Button className='ms-2' variant='outline-primary' onClick={() => signIn()}>Sign in</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <p className='text-center'>You're not signed in</p>
    </>
  );
}
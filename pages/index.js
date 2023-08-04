import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from 'react-bootstrap/Navbar'
import { Container, Button, Row, Col } from 'react-bootstrap'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import SEO from '../components/seo'
import ArtistList from '../components/artistsList'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const {data: session, status} = useSession()
  const [span, setSpan] = useState('short')
  const [limit, setLimit] = useState(10)
  const [artists, setArtists] = useState([])
  const [avgPop, setAvgPop] = useState(0)
  const [resultState, setResultState] = useState('')
  const reactionsTitles = {
    '':'',
    'low':'Oh ok 🙄',
    'mid':"Don't get ahead of yourself",
    'high':'Local 🥱',
  }
  const reactionsDesc = {
    '':'',
    'low':'You wanna be different sooooooo bad',
    'mid':"Local x normie spot the difference (level impossible)",
    'high':"Where's the flavor?? Like.... Log off",
  }

  const getMyTopArtists = async (time, limit) => {
    const res = await fetch('/api/topartists_' + time + '_' + limit)
    const {items} = await res.json()
    let cumSum = 0
    for (let i = 0; i < items.length; i++) {
      let popularity = items[i].popularity
      cumSum += popularity
    }
    const result = cumSum / items.length
    setAvgPop(result)
    setArtists(items)
    return result
  }

  const getUniqueScore = async (timeRange, limit) => {
    setSpan(timeRange)
    setLimit(limit)
    const popularity = await getMyTopArtists(timeRange, limit)
    if (popularity <= 50) {
      setResultState('low')
    } else if (popularity <= 85) {
      setResultState('mid')
    } else {
      setResultState('high')
    }
  }

  useEffect(() => {
    if (status == 'authenticated') {
      getUniqueScore('short', 10)
      var element = document.getElementById("results")
      setTimeout(() => element.scrollIntoView(), 500)
      
    }
  }, [status])

  return (
    <>
      <SEO pageTitle={"Exposify"} pageDescription={"Welcome!"}/>

      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Exposify</Navbar.Brand>
            {session ? 
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <span>{session.user.name}</span>
              </Navbar.Text>
              <Button className='ms-3' variant='outline-success' onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
            </Navbar.Collapse>
            : 
            <Navbar.Collapse className="justify-content-end">
              <Button className='ms-2' variant='success' onClick={() => signIn('spotify', { callbackUrl: '/' })}>Sign in with <i className='bi bi-spotify ms-1' /></Button>
            </Navbar.Collapse>}
        </Container>
      </Navbar>

      <section id='landing' className={styles.landing}>
        <Container>
          <h3 className='fs-1'>What Does Your <br/>Artist Taste Mean?</h3>
          <p className='w-50 mx-auto'>Some text taking about some random stuff and some more sentences talking about some other more things that idk what i'll put here yet</p>
          {session ? 
            <Button className={styles.landingBtn} href='#results' onClick={() => getUniqueScore('short', 10)}>Check Me Out</Button>
          :
          <Button className={styles.landingBtn} href='#results' onClick={() => signIn('spotify', { callbackUrl: '/' })}>Sign in with <i className='bi bi-spotify ms-1' /></Button>
          }
        </Container>
      </section>

      <section id='results' className={styles.results}>
          {resultState ? 
          <Container>
            <div className='text-center my-5'>
              <div className='my-5'>
                <h4>{reactionsTitles[resultState]}</h4>
                <p>{reactionsDesc[resultState]}</p>
              </div>
              <h3>Don't believe it? <br/>Here's the proof</h3>
              <p>Below are your top artists as of late</p>
            </div>
            <div className='text-center mb-3'>
              <ToggleButtonGroup type="radio" name="time-options" defaultValue={1}>
                <ToggleButton variant='outline-success' id="short-term" value={1} onChange={() => getUniqueScore('short', limit)}>
                  Last Month
                </ToggleButton>
                <ToggleButton variant='outline-success' id="mid-term" value={2} onChange={() => getUniqueScore('mid', limit)} className='mx-2'>
                  Last 6 Months
                </ToggleButton>
                <ToggleButton variant='outline-success' id="long-term" value={3} onChange={() => getUniqueScore('long', limit)}>
                  Last Year
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div className='text-center mb-3'>
              <ToggleButtonGroup type="radio" name="qty-options" defaultValue={1}>
                <ToggleButton variant='outline-success' id="10" value={1} onChange={() => getUniqueScore(span, 10)}>
                  10
                </ToggleButton>
                <ToggleButton variant='outline-success' id="20" value={2} onChange={() => getUniqueScore(span, 20)} className='mx-1'>
                  20
                </ToggleButton>
                <ToggleButton variant='outline-success' id="40" value={3} onChange={() => getUniqueScore(span, 40)}>
                  40
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
            <ArtistList artists={artists}/>
          </Container>
          : <div></div>}
      </section>

      <footer id='footer' className={styles.footer}>
        <p>Made by Emmanuel Cobian Duarte</p>
        <a className={styles.socials} href='mailto:emmanuel12310@berkeley.edu'><i className='bi bi-github fs-3 me-2'/></a>
        <a className={styles.socials} href='https://www.linkedin.com/in/emmanuel-cobian/' target='_blank'><i className='bi bi-linkedin fs-3'/></a>
      </footer>
    </>
  )
}
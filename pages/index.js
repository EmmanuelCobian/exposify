import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from 'react-bootstrap/Navbar'
import { Container, Button, Row, Col } from 'react-bootstrap'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import classnames from 'classnames'
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
  const [resDescIndex, setResDescIndex] = useState(0)
  const reactionsTitles = {
    '':'',
    'low':'Rare Breed',
    'mid':'Reformed Normie 👏',
    'high':'Local 🥱',
    'clouds':'NPC 🤖',
  }
  const reactionsDesc = {
    '':[''],
    'low':['Wow. Didn\t think people like you would exist, much less use this app. Good for you :)', 'You are either a music major or depressed (hopefully not both)', 'You are the definition of \"scaring the hoes\"'],
    'mid':['You\'ve outgrown your old ways, and for the better. Well done.', 'You must think your taste is elite (it probably is)',],
    'high':['You should check out your Discover Weekly playlist more often', 'Statistically speaking, your taste is mid', 'Just becuase you don\'t hear them on the radio doesn\'t mean they\'re underground', 'You have the taste of the average TikTok user'],
    'clouds':['Not that it\'s a bad thing, but maybe look into something new. Maybe you\'ll like it.', 'It\'s just a phase...It\'s just a phase...It\'s just a phase...', '2.0 GPA type activities', 'You talk about your high school years a litle bit too much'],
  }

  const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b)
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
  }

  const getMyTopArtists = async (time, limit) => {
    const res = await fetch('/api/topartists_' + time + '_' + limit)
    const {items} = await res.json()
    let cumSum = 0
    let popularities = []

    for (let i = 0; i < items.length; i++) {
      let popularity = items[i].popularity
      popularities.push(popularity)
      cumSum += popularity
    }

    const middle = median(popularities)
    const mean = cumSum / items.length
    const result = Math.min(middle, mean)
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
      setResDescIndex(Math.floor(Math.random() * reactionsDesc['low'].length))
    } else if (popularity <= 75) {
      setResultState('mid')
      setResDescIndex(Math.floor(Math.random() * reactionsDesc['mid'].length))
    } else if (popularity <= 83) {
      setResultState('high')
      setResDescIndex(Math.floor(Math.random() * reactionsDesc['high'].length))
    } else {
      setResultState('clouds')
      setResDescIndex(Math.floor(Math.random() * reactionsDesc['clouds'].length))
    }
  }

  useEffect(() => {
    if (status == 'authenticated') {
      getUniqueScore('short', 10)
      var element = document.getElementById("results")
      setTimeout(() => element.scrollIntoView(), 1000)
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
              <Button className={styles.navSignOut} onClick={() => signOut({ callbackUrl: '/' })}>Sign out</Button>
            </Navbar.Collapse>
            : 
            <Navbar.Collapse className="justify-content-end">
              <Button className={styles.navSignIn} onClick={() => signIn('spotify', { callbackUrl: '/' })}>Sign in with <i className='bi bi-spotify ms-1' /></Button>
            </Navbar.Collapse>}
        </Container>
      </Navbar>

      <section id='landing' className={styles.landing}>
        <Container>
          <h3 className='fs-1'>What Does Your <br/>Top Artists Say About You?</h3>
          <p className='w-50 mx-auto'>Learn more about what your top artists say about you by signing into your Spotify account below!</p>
          {session ? 
            <Button className={styles.landingBtn} href='#results' onClick={() => getUniqueScore('short', 10)}>Check Me Out</Button>
          :
          <Button className={styles.landingBtn} href='#results' onClick={() => signIn('spotify', { callbackUrl: '/' })}>Sign in with <i className='bi bi-spotify ms-1' /></Button>
          }
        </Container>
      </section>

      <section id='results' className={styles.results}>
          {resultState &&
          <div>
            <div className={styles.resHeader}>
              <h3 className={'mb-5'}>Your top artists say you're a(n)...</h3>
              <h3 className={styles.reactionTitle}>{reactionsTitles[resultState]}</h3>
              <p className={classnames('fs-5', styles.reactionDesc)}>{reactionsDesc[resultState][resDescIndex]}</p>
            </div>
            <div className={styles.stackedWaves}>
            <Container>
              <div className='text-center my-5'>
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
            </div>
          </div>
          }
      </section>

      <footer id='footer' className={styles.footer}>
        <p>Made by Emmanuel Cobian Duarte</p>
        <a className={styles.socials} href='https://github.com/EmmanuelCobian' target='_blank'><i className='bi bi-github fs-3 me-2'/></a>
        <a className={styles.socials} href='https://www.linkedin.com/in/emmanuel-cobian/' target='_blank'><i className='bi bi-linkedin fs-3'/></a>
      </footer>
    </>
  )
}
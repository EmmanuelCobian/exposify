import styles from '@/styles/Unauthorized.module.css'
import { Container, Button } from "react-bootstrap";

export default function Unauthorized() {
  return (
    <section id="landing" className={styles.landing}>
        <Container>
            <h1>Unauthorized</h1>
            <p className='lead w-75 mx-auto'>Unfortunately, due to the limits placed by spotify on apps in beta, not everyone has access to this application. For access, please contact the owner.</p>
            <Button className={styles.navSignIn} href='/'>Back Home</Button>
        </Container>
    </section>
  )
}
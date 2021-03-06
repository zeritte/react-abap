import React from 'react'
import Container from '@material-ui/core/Container'
import { Header } from '../../common'

const About = props => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Header />
          <div style={{ textAlign: 'center' }}>
            <h1>About</h1>
            <p>Developed by SDC Turkey</p>
          </div>
        </main>
      </Container>
    </React.Fragment>
  )
}

export default About

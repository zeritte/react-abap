import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Header } from '../../common'

const ParticularCase = props => {
  const { case_id } = props.match.params
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Header />
          <div>
            <h1>Case {case_id} Page</h1>
            <p>Will be filled out later on</p>
          </div>
        </main>
      </Container>
    </React.Fragment>
  )
}

export default ParticularCase

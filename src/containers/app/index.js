import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import { SignIn, SignUp } from '../session'
import { AllCases, ParticularCase } from '../cases/'

const App = () => {
  return (
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/cases" component={AllCases} />
      <Route path="/cases/:case_id" component={ParticularCase} />
    </main>
  )
}

export default App

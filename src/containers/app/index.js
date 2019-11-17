import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import { SignIn, SignUp } from '../session'

const App = () => {
  return (
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
    </main>
  )
}

export default App

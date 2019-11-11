import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import { history } from '../../store'
import { SignIn, SignUp } from '../session'
import { connect } from 'react-redux'
import { logout } from '../../modules/actions'

import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 3,
    justifyContent: 'center'
  },
  toolbarSecondary: {
    justifyContent: 'center',
    overflowX: 'auto'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}))

const sections = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Cases', href: '/cases' }
]

const App = props => {
  const classes = useStyles()
  return (
    <main>
      {history.location.pathname !== '/sign-in' &&
      history.location.pathname !== '/sign-up' ? (
        <div>
          <Toolbar className={classes.toolbar}>
            <Button style={{ flex: 0.5 }} size="small">
              {' '}
            </Button>
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              className={classes.toolbarTitle}>
              VF Cookbook
            </Typography>
            {props.isLoggedIn ? (
              <Button
                style={{ flex: 0.5 }}
                onClick={props.logout}
                variant="outlined"
                size="small">
                Sign out
              </Button>
            ) : (
              <Button
                href="/sign-in"
                style={{ flex: 0.5 }}
                variant="outlined"
                size="small">
                Sign in / Sign up
              </Button>
            )}
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            className={classes.toolbarSecondary}>
            {sections.map(section => (
              <Link
                color="inherit"
                noWrap
                key={section}
                variant="body2"
                href={section.href}
                className={classes.toolbarLink}>
                {section.name}
              </Link>
            ))}
          </Toolbar>
        </div>
      ) : null}
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
    </main>
  )
}

const mapStateToProps = ({ main }) => ({
  name: main.name,
  isLoggedIn: main.isLoggedIn
})

export default connect(
  mapStateToProps,
  {
    logout
  }
)(App)

import React, { useEffect, useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { logout } from './modules/actions'
import { store } from './store'

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

const sections = [{ name: 'Home', href: '/' }, { name: 'About', href: '/about' }, { name: 'Cases', href: '/cases' }]

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(store.getState().main.isLoggedIn)
  }, [store.getState().main])
  const logOut = () => store.dispatch(logout())
  const classes = useStyles()
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Button style={{ flex: 0.5 }} size="small">
          {' '}
        </Button>
        <Typography component="h2" variant="h5" color="inherit" align="center" noWrap className={classes.toolbarTitle}>
          VF Cookbook
        </Typography>
        {isLoggedIn ? (
          <Button style={{ flex: 0.5 }} onClick={logOut} variant="outlined" size="small">
            Sign out
          </Button>
        ) : (
          <Button href="/sign-in" style={{ flex: 0.5 }} variant="outlined" size="small">
            Sign in / Sign up
          </Button>
        )}
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.href}
            variant="body2"
            href={section.href}
            className={classes.toolbarLink}>
            {section.name}
          </Link>
        ))}
      </Toolbar>
    </div>
  )
}

export const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          SDC Turkey 2020
        </Typography>
      </Container>
    </footer>
  )
}

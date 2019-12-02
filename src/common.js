import React, { useEffect, useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import { logout } from './modules/actions'
import { store } from './store'
import { diff as DiffEditor } from 'react-ace'
import 'ace-builds/src-noconflict/mode-abap'
import 'ace-builds/src-noconflict/theme-github'

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
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const sections = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Cases', href: '/cases' }
]

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
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}>
          VF Cookbook
        </Typography>
        {isLoggedIn ? (
          <Button
            style={{ flex: 0.5 }}
            onClick={logOut}
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
            key={section.name}
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
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p">
          SDC Turkey 2020
        </Typography>
      </Container>
    </footer>
  )
}

export const CaseCard = ({ vfcase }) => {
  const classes = useStyles()
  return (
    <Grid item key={vfcase.id} xs={12} md={6}>
      <CardActionArea component="a" href={'/cases/' + vfcase.id}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {vfcase.name}
              </Typography>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  {vfcase.domain}
                </Typography>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  {vfcase.impact}
                </Typography>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  {vfcase.type}
                </Typography>
              </Grid>
              <Typography color="primary">more info...</Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export const AddSolutionModal = ({ handleClose, show, caseName }) => {
  const classes = useStyles()
  const [code, setCode] = useState(['wrong code here', 'fixed version here'])

  return (
    <Modal aria-labelledby="title" aria-describedby="description" open={show}>
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        className={classes.paper}>
        <h2 id="title">Add new solution for case '{caseName}'</h2>
        <p id="description">Before & After</p>
        <DiffEditor
          value={code}
          onChange={e => setCode(e)}
          height="400px"
          width="650px"
          mode="abap"
          name="diff-editor"
          theme="github"
        />
        <p id="footnote">Footnote</p>
        <Button style={{ marginLeft: 650 }} onClick={handleClose}>
          Close
        </Button>
      </div>
    </Modal>
  )
}

import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { signUp } from '../../modules/actions'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const SignUp = props => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if (props.isLoggedIn) props.goToApp()
  }, [props.isLoggedIn])
  const signUp = () => {
    props.signUp(name, email, password)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowEmail" color="primary" />}
                label="I agree the terms & conditions."
              />
            </Grid> */}
            <Grid item xs>
              <Typography style={{ color: 'darkred' }}>
                {props.signUpError
                  ? props.signUpError.map(err => err + `\n`)
                  : null}
              </Typography>
            </Grid>
          </Grid>
          <Button
            onClick={signUp}
            fullWidth
            variant="contained"
            color="primary"
            disabled={props.signUpLoading}
            className={classes.submit}>
            {props.signUpLoading ? '...' : 'Sign Up'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

const mapStateToProps = ({ main }) => ({
  signInLoading: main.signUpLoading,
  isLoggedIn: main.isLoggedIn,
  signUpError: main.signUpError
})

export default connect(
  mapStateToProps,
  { signUp, goToApp: () => push('/') }
)(SignUp)

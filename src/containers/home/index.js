import React, { useEffect, useState } from 'react'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'

import { Header } from '../../common'
import { connect } from 'react-redux'
import { logout, fetchAllCases } from '../../modules/actions'

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: 'relative',
    marginBottom: theme.spacing(4)
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  },
  textField: {
    backgroundColor: 'white',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  }
}))

const Home = props => {
  const classes = useStyles()
  const [search, setSearch] = useState('')
  const filterCases = () => {
    if (search.length > 0)
      return props.vfCasesDashboard.filter(vfcase =>
        vfcase.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    return []
  }
  useEffect(() => {
    props.fetchAllCases()
  }, [])
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Header isLoggedIn={props.isLoggedIn} logout={props.logout} />
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={8}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" gutterBottom>
                    Virtual Forge Test Case Search
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    className={classes.textField}
                    label="Search"
                    margin="normal"
                    variant="outlined"
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}
          {/* Sub featured posts */}
          <Grid container spacing={4}>
            {props.vfCasesDashboard ? (
              filterCases().map(vfcase => (
                <Grid item key={vfcase.id} xs={12} md={6}>
                  <CardActionArea component="a" href="/cases/">
                    <Card className={classes.card}>
                      <div className={classes.cardDetails}>
                        <CardContent>
                          <Typography component="h2" variant="h5">
                            {vfcase.name}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {vfcase.date}
                          </Typography>
                          <Typography variant="subtitle1" paragraph>
                            {vfcase.description}
                          </Typography>
                          <Typography variant="subtitle1" color="primary">
                            More info
                          </Typography>
                        </CardContent>
                      </div>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))
            ) : props.vfCasesDashboardLoading ? (
              '...'
            ) : (
              <Typography variant="subtitle1" paragraph>
                {props.vfCasesDashboardError}
              </Typography>
            )}
          </Grid>
          {/* End sub featured posts */}
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  role: main.role,
  name: main.name,
  isLoggedIn: main.isLoggedIn,
  vfCasesDashboard: main.vfCasesDashboard,
  vfCasesDashboardLoading: main.vfCasesDashboardLoading,
  vfCasesDashboardError: main.vfCasesDashboardError
})

export default connect(
  mapStateToProps,
  {
    fetchAllCases,
    logout,
    goToAbout: () => push('/about-us')
  }
)(Home)

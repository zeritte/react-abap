import React, { useEffect, useState } from 'react'
import { push } from 'connected-react-router'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'

import { Header, CaseCard } from '../../common'
import { connect } from 'react-redux'
import { fetchAllCases } from '../../modules/actions'

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
      return props.allCases.filter(
        vfcase =>
          vfcase.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          vfcase.case_id.toLocaleLowerCase().includes(search.toLocaleLowerCase())
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
          <Header />
          {/* Begin search */}
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
          {/* End search */}
          {/* Cases */}
          <center>
            {props.allCases ? (
              <Grid container spacing={4}>
                {filterCases().map(vfcase => (
                  <CaseCard vfcase={vfcase} />
                ))}
              </Grid>
            ) : props.allCasesLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="subtitle1" color="error" paragraph>
                {props.allCasesError}
              </Typography>
            )}
            {/* Cases */}
          </center>
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  role: main.role,
  name: main.name,
  allCases: main.allCases,
  allCasesLoading: main.allCasesLoading,
  allCasesError: main.allCasesError
})

export default connect(
  mapStateToProps,
  {
    fetchAllCases,
    goToAbout: () => push('/about-us')
  }
)(Home)

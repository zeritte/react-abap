import React, { useEffect } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Header, CaseCard } from '../../common'
import CircularProgress from '@material-ui/core/CircularProgress'

import { connect } from 'react-redux'
import { fetchAllCases } from '../../modules/actions'

//const useStyles = makeStyles(theme => ({}))

const AllCases = props => {
  //const classes = useStyles()
  useEffect(() => {
    props.fetchAllCases()
  }, [])
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Header />
          <center>
            <h1>All Cases</h1>
            {props.allCases ? (
              <Grid container spacing={4}>
                {props.allCases.map(vfcase => (
                  <CaseCard key={vfcase.id} vfcase={vfcase} />
                ))}
              </Grid>
            ) : props.allCasesLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="subtitle1" color="error" paragraph>
                {props.allCasesError}
              </Typography>
            )}
          </center>
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  allCases: main.allCases,
  allCasesLoading: main.allCasesLoading,
  allCasesError: main.allCasesError
})

export default connect(
  mapStateToProps,
  { fetchAllCases }
)(AllCases)

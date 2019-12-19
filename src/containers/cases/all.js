import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Header, CaseCard, AddCaseModal } from '../../common'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { connect } from 'react-redux'
import { fetchAllCases, fetchRelatedData, addCase } from '../../modules/actions'

const AllCases = props => {
  useEffect(() => {
    props.fetchAllCases()
    props.fetchRelatedData()
  }, [])
  const [showAddCaseModal, setShowAddCaseModal] = useState(false)
  const [alert, setAlert] = useState(null)
  const alertUser = () => {
    if (!!alert)
      return (
        <Dialog
          open={!!alert}
          onClose={() => setAlert(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{alert.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {alert.description}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )
  }
  const addModal = () => (
    <AddCaseModal
      show={showAddCaseModal}
      saveFunction={params => {
        props.addCase({ ...params }, setAlert)
        setShowAddCaseModal(false)
      }}
      handleClose={() => setShowAddCaseModal(false)}
      impacts={props.impacts}
      types={props.types}
      domains={props.domains}
    />
  )
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Header />
          <center>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button style={{ flex: 0.2 }}> </Button>
              <h1 style={{ flex: 1 }}>All Cases</h1>
              <Button
                style={{ flex: 0.2 }}
                disabled={props.role === 'member' || !props.isLoggedIn}
                onClick={() => setShowAddCaseModal(true)}>
                <h3>Add case</h3>
              </Button>
            </div>
            {props.allCases ? (
              <Grid container spacing={4}>
                {props.allCases
                  .filter(vfcase =>
                    props.role === 'member' || !props.isLoggedIn
                      ? vfcase.is_active
                      : vfcase
                  )
                  .map(vfcase => (
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
            {alertUser()}
            {addModal()}
          </center>
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  role: main.role,
  isLoggedIn: main.isLoggedIn,
  allCases: main.allCases,
  allCasesLoading: main.allCasesLoading,
  allCasesError: main.allCasesError,
  domains: main.domains,
  types: main.types,
  impacts: main.impacts
})

export default connect(
  mapStateToProps,
  { fetchAllCases, fetchRelatedData, addCase }
)(AllCases)

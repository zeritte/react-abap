import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Header, SolutionCard, ApproveSolutionModal } from '../../common'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { connect } from 'react-redux'
import { fetchSolutionsInReview, approveSolution } from '../../modules/actions'

const SolutionsInReview = props => {
  useEffect(() => {
    props.fetchSolutionsInReview()
  }, [])

  const [solutionToBeApproved, setSolutionToBeApproved] = useState(null)
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
  const seeDetailsModal = () => {
    if (solutionToBeApproved) {
      return (
        <ApproveSolutionModal
          show={true}
          caseName={solutionToBeApproved.vf_case_name}
          approveFunction={() => {
            props.approveSolution(solutionToBeApproved.id, setAlert)
            setSolutionToBeApproved(null)
          }}
          handleClose={() => setSolutionToBeApproved(null)}
          id={solutionToBeApproved.id}
          footnote={solutionToBeApproved.footnote_en}
          before={solutionToBeApproved.before_en}
          after={solutionToBeApproved.after_en}
        />
      )
    }
  }
  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Header />
          <center>
            <h1 style={{ flex: 1 }}>Solutions waiting for a review</h1>
            {props.solutionsInReview ? (
              props.solutionsInReview.length > 0 ? (
                <Grid container spacing={4}>
                  {props.solutionsInReview.map(solution => (
                    <SolutionCard
                      key={solution.id}
                      solution={solution}
                      clickFunction={() => setSolutionToBeApproved(solution)}
                    />
                  ))}
                </Grid>
              ) : (
                <Typography variant="subtitle1" paragraph>
                  There is no solution to review.
                </Typography>
              )
            ) : props.solutionsInReviewLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="subtitle1" color="error" paragraph>
                {props.solutionsInReviewError}
              </Typography>
            )}
            {alertUser()}
            {seeDetailsModal()}
          </center>
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  role: main.role,
  isLoggedIn: main.isLoggedIn,
  solutionsInReview: main.solutionsInReview,
  solutionsInReviewLoading: main.solutionsInReviewLoading,
  solutionsInReviewError: main.solutionsInReviewError
})

export default connect(
  mapStateToProps,
  { fetchSolutionsInReview, approveSolution }
)(SolutionsInReview)

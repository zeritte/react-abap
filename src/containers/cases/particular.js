import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import {
  Header,
  AddSolutionModal,
  EditSolutionModal,
  EditCaseModal
} from '../../common'
import AceDiff from 'ace-diff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { connect } from 'react-redux'
import {
  fetchParticularcase,
  addSolution,
  updateSolution,
  updateCase,
  fetchRelatedData
} from '../../modules/actions'
require('brace/theme/monokai')
require('brace/mode/abap')

const ParticularCase = props => {
  const [showAddSolutionModal, setShowAddSolutionModal] = useState(false)
  const [solutionToBeEdited, setSolutionToBeEdited] = useState(null)
  const [alert, setAlert] = useState(null)
  const [showEditCase, setShowEditCase] = useState(false)
  const { case_id } = props.match.params
  useEffect(() => {
    props.fetchParticularcase(case_id)
    props.fetchRelatedData()
  }, [])
  useEffect(() => {
    if (props.particularCase && props.particularCase.solutions)
      props.particularCase.solutions
        .filter(solution => solution.is_approved)
        .forEach(solution => {
          new AceDiff({
            element: `#editor${solution.id}`,
            left: {
              content: solution.before_en,
              editable: false,
              copyLinkEnabled: false
            },
            right: {
              content: solution.after_en,
              editable: false,
              copyLinkEnabled: false
            },
            autoScrollEditorIntoView: true,
            mode: 'ace/mode/abap',
            theme: 'ace/theme/monokai',
            minLines: 10,
            maxLines: 30
          })
        })
    return () => {}
  }, [props.particularCase])

  const renderSolutions = () => {
    return (
      <Carousel showThumbs={false} useKeyboardArrows>
        {props.particularCase.solutions
          .filter(solution => solution.is_approved)
          .map(solution => {
            return (
              <div
                style={{
                  border: '1px solid',
                  borderColor: '#424242',
                  padding: 30,
                  height: '100%',
                  backgroundColor: '#303030'
                }}
                key={`editor${solution.id}`}>
                {props.userId === solution.created_by_id ? (
                  <Button
                    onClick={() => setSolutionToBeEdited(solution)}
                    color="secondary"
                    style={{ position: 'absolute', right: '60px' }}>
                    Edit
                  </Button>
                ) : null}
                <div
                  style={{
                    position: 'relative',
                    margin: '0 auto',
                    height: 300,
                    width: '80%'
                  }}>
                  <div id={`editor${solution.id}`} className="acediff" />
                </div>
                <div
                  style={{ paddingTop: 20 }}
                  dangerouslySetInnerHTML={{
                    __html: solution.footnote_en
                  }}
                />
                <div
                  key="other-details"
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <p>Author: {solution.created_by}</p>
                  <p>Created At: {solution.created_at}</p>
                </div>
              </div>
            )
          })}
      </Carousel>
    )
  }

  const editModal = () => {
    if (solutionToBeEdited) {
      return (
        <EditSolutionModal
          show={true}
          caseName={props.particularCase.name}
          saveFunction={params => {
            props.updateSolution(
              { ...params, vf_case_id: case_id },
              solutionToBeEdited.id,
              setAlert
            )
            setSolutionToBeEdited(null)
          }}
          handleClose={() => setSolutionToBeEdited(null)}
          _footnote={solutionToBeEdited.footnote_en}
          before={solutionToBeEdited.before_en}
          after={solutionToBeEdited.after_en}
        />
      )
    }
  }

  const editCaseModal = () => {
    if (showEditCase) {
      return (
        <EditCaseModal
          show={showEditCase}
          saveFunction={params => {
            props.updateCase({ ...params }, case_id, setAlert)
            setShowEditCase(false)
          }}
          handleClose={() => setShowEditCase(false)}
          impacts={props.impacts}
          types={props.types}
          domains={props.domains}
          vf_case={props.particularCase}
        />
      )
    }
  }

  const addModal = () => {
    return (
      <AddSolutionModal
        show={showAddSolutionModal}
        caseName={props.particularCase.name}
        saveFunction={params => {
          props.addSolution({ ...params, vf_case_id: case_id }, setAlert)
          setShowAddSolutionModal(false)
        }}
        handleClose={() => setShowAddSolutionModal(false)}
      />
    )
  }

  const clickOnAdd = () => {
    if (props.isLoggedIn) setShowAddSolutionModal(true)
    else props.history.push('/sign-in')
  }

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

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Header />
          {props.particularCase ? (
            !props.particularCase.is_active &&
            (props.isMember || !props.isLoggedIn) ? (
              <Typography
                style={{ paddingTop: 20 }}
                variant="h5"
                color="error"
                align="center"
                paragraph>
                This case is not active.
              </Typography>
            ) : (
              <div style={{ width: '100%' }}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between'
                    }}>
                    <h1>{props.particularCase.name}</h1>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row'
                      }}>
                      {!props.isMember && props.isLoggedIn ? (
                        <Button onClick={() => setShowEditCase(true)}>
                          <h3>Edit case</h3>
                        </Button>
                      ) : null}
                      <Button onClick={clickOnAdd}>
                        <h3>Add solution</h3>
                      </Button>
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: props.particularCase.content_en
                    }}
                  />
                  <div style={{ paddingBottom: 50 }}>{renderSolutions()}</div>
                </div>
                {addModal()}
                {editModal()}
                {alertUser()}
                {editCaseModal()}
              </div>
            )
          ) : props.particularCaseLoading ? (
            <center>
              <CircularProgress />
            </center>
          ) : (
            <Typography
              variant="subtitle1"
              color="error"
              align="center"
              paragraph>
              {props.particularCaseError}
            </Typography>
          )}
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  name: main.name,
  isLoggedIn: main.isLoggedIn,
  userId: main.userId,
  role: main.role,
  isMember: main.isMember,
  particularCase: main.particularCase,
  particularCaseLoading: main.particularCaseLoading,
  particularCaseError: main.particularCaseError,
  domains: main.domains,
  types: main.types,
  impacts: main.impacts
})

export default connect(
  mapStateToProps,
  {
    fetchParticularcase,
    addSolution,
    updateSolution,
    updateCase,
    fetchRelatedData
  }
)(ParticularCase)

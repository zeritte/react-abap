import React, { useEffect, useState } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { Header, AddSolutionModal, EditSolutionModal } from '../../common'
import AceDiff from 'ace-diff'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'

import { connect } from 'react-redux'
import {
  fetchParticularcase,
  addSolution,
  saveSolution
} from '../../modules/actions'
require('brace/theme/monokai')
require('brace/mode/abap')

const ParticularCase = props => {
  const [showAddSolutionModal, setShowAddSolutionModal] = useState(false)
  const [solutionToBeEdited, setSolutionToBeEdited] = useState(null)
  const { case_id } = props.match.params
  useEffect(() => {
    props.fetchParticularcase(case_id)
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
                  padding: 30,
                  height: '100%',
                  backgroundColor: 'white'
                }}
                key={`editor${solution.id}`}>
                {props.userId === solution.created_by_id ? (
                  <Button
                    onClick={() => setSolutionToBeEdited(solution)}
                    color="secondary"
                    style={{ position: 'absolute', right: '50px' }}>
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
                <p>{solution.footnote_en}</p>
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
            props.saveSolution({ ...params, case_id })
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

  const addModal = () => (
    <AddSolutionModal
      show={showAddSolutionModal}
      caseName={props.particularCase.name}
      saveFunction={params => {
        props.addSolution({ ...params, case_id })
        setShowAddSolutionModal(false)
      }}
      handleClose={() => setShowAddSolutionModal(false)}
    />
  )

  const clickOnAdd = () => {
    if (props.isLoggedIn) setShowAddSolutionModal(true)
    else props.history.push('/sign-in')
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Header />
          {props.particularCase ? (
            <div style={{ width: '100%' }}>
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <h1>{props.particularCase.name}</h1>
                  <Button onClick={clickOnAdd}>
                    <h3>Add solution</h3>
                  </Button>
                  {addModal()}
                  {editModal()}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.particularCase.content_en
                  }}
                />
                <div style={{ paddingBottom: 50 }}>{renderSolutions()}</div>
              </div>
            </div>
          ) : (
            <center>
              <CircularProgress />
            </center>
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
  particularCase: main.particularCase,
  particularCaseLoading: main.particularCaseLoading,
  particularCaseError: main.particularCaseError
})

export default connect(
  mapStateToProps,
  { fetchParticularcase, addSolution, saveSolution }
)(ParticularCase)

import React, { useState, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  Header,
  DataCard,
  AddRelatedModal,
  EditRelatedModal,
  UserCard
} from '../../common'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { connect } from 'react-redux'
import {
  fetchRelatedData,
  createRelatedData,
  updateRelatedData,
  deleteRelatedData,
  updateUser,
  fetchAllUsers
} from '../../modules/actions'

const Admin = props => {
  useEffect(() => {
    props.fetchRelatedData()
    props.fetchAllUsers()
  }, [])
  const [addModal, setAddModal] = useState(null)
  const [update, setUpdate] = useState(null)
  const [sectionName, setSectionName] = useState(null)
  const [alert, setAlert] = useState(null)
  const sectionRenderer = section => {
    return (
      <div>
        <div
          style={{
            paddingTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <h2 style={{ flex: 1 }}>{section.toUpperCase()}</h2>
          <Button style={{ flex: 0.2 }} onClick={() => setAddModal(section)}>
            <h3>Add {section.slice(0, -1)}</h3>
          </Button>
        </div>
        <Grid container spacing={4}>
          {props[section].map(x => (
            <DataCard
              key={x.id}
              card={x}
              openModal={e => {
                setUpdate(e)
                setSectionName(section.slice(0, -1))
              }}
            />
          ))}
        </Grid>
      </div>
    )
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
  const createModal = () => {
    if (!!addModal)
      return (
        <AddRelatedModal
          show={addModal.slice(0, -1)}
          saveFunction={params => {
            props.createRelatedData(
              addModal,
              { [addModal.slice(0, -1)]: params },
              setAlert
            )
            setAddModal(null)
          }}
          handleClose={() => setAddModal(null)}
        />
      )
  }
  const updateModal = () => {
    if (!!update)
      return (
        <EditRelatedModal
          show={update}
          section={sectionName}
          saveFunction={params => {
            props.updateRelatedData(
              sectionName,
              { [sectionName]: params },
              update.id,
              setAlert
            )
            setUpdate(null)
          }}
          handleClose={() => setUpdate(null)}
          deleteFunction={(name, id) => {
            props.deleteRelatedData(name, id, setAlert)
            setUpdate(null)
          }}
        />
      )
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Header />
          <center>
            <h1>Admin Panel</h1>
            <h2>USERS</h2>
            {props.allUsers ? (
              <Grid container spacing={2}>
                {props.allUsers.map(user => (
                  <UserCard
                    key={user.id}
                    user={user}
                    updateFunction={params => props.updateUser(user.id, params)}
                  />
                ))}
              </Grid>
            ) : props.allUsersLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="subtitle1" color="error" paragraph>
                {props.allUsersError}
              </Typography>
            )}
            <hr />
            {sectionRenderer('domains')}
            {sectionRenderer('impacts')}
            {sectionRenderer('types')}
            {alertUser()}
            {createModal()}
            {updateModal()}
          </center>
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  role: main.role,
  isLoggedIn: main.isLoggedIn,
  domains: main.domains,
  types: main.types,
  impacts: main.impacts,
  allUsers: main.allUsers,
  allUsersLoading: main.allUsersLoading,
  allUsersError: main.allUsersError
})

export default connect(
  mapStateToProps,
  {
    fetchRelatedData,
    createRelatedData,
    updateRelatedData,
    deleteRelatedData,
    updateUser,
    fetchAllUsers
  }
)(Admin)

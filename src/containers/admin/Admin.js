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
import { fetchAllCases } from '../../modules/actions'

const AllCases = props => {
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
            <h1>Admin Panel</h1>
          </center>
        </main>
      </Container>
    </React.Fragment>
  )
}

const mapStateToProps = ({ main }) => ({
  role: main.role,
  isLoggedIn: main.isLoggedIn
})

export default connect(
  mapStateToProps,
  { fetchAllCases }
)(AllCases)

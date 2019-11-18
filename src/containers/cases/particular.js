import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Header } from '../../common'
import AceDiff from 'ace-diff'

// import 'ace-builds/src-noconflict/theme-monokai'
// import 'ace-builds/src-noconflict/mode-abap'

const ParticularCase = props => {
  useEffect(() => {
    new AceDiff({
      element: '#editor',
      left: {
        content: 'SELECT text 1',
        editable: true,
        copyLinkEnabled: false
      },
      right: {
        content: 'TEXT 2 on ABAP',
        editable: false,
        copyLinkEnabled: false
      },
      autoScrollEditorIntoView: true,
      // theme: 'monokai',
      // mode: 'abap',
      minLines: 10,
      maxLines: 30
    })
  }, [])
  const { case_id } = props.match.params
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <Header />
          <div style={{ width: '100%' }}>
            <h1>Case {case_id} Page</h1>
            <div style={{ position: 'relative', margin: '0 auto', height: 200, width: '50%' }}>
              {/* <div id="editor" className="acediff" /> */}
            </div>
          </div>
        </main>
      </Container>
    </React.Fragment>
  )
}

export default ParticularCase

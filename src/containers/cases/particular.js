import React, { useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Header } from '../../common'
import AceDiff from 'ace-diff'
require('brace/theme/monokai')
require('brace/mode/abap')

const ParticularCase = props => {
  useEffect(() => {
    new AceDiff({
      element: '#editor',
      left: {
        content: `REPORT ZFVORGE_TESTCASE_258.

AUTHORITY-CHECK OBJECT 'S_DEVELOP'
  ID 'DEVCLASS' FIELD 'ZPROGS'
  ID 'OBJTYPE' FIELD 'FUNC'
  ID 'OBJNAME' FIELD 'ZFT'
  ID 'ACTVT' FIELD '02'.
IF sy-subrc = 0.
* Action authorized
ENDIF.`,
        editable: false,
        copyLinkEnabled: false
      },
      right: {
        content: `REPORT ZFVORGE_TESTCASE_258_FIXED.

AUTHORITY-CHECK OBJECT 'S_DEVELOP'
  ID 'DEVCLASS' FIELD 'ZPROGS'
  ID 'OBJTYPE' FIELD 'FUNC'
  ID 'OBJNAME' FIELD 'ZFT'
  ID 'ACTVT' FIELD '02'.
  ID 'INGROU' DUMMY " a few sh.y
IF sy-subrc = 0.
* Action authorized
ENDIF.`,
        editable: false,
        copyLinkEnabled: false
      },
      autoScrollEditorIntoView: true,
      mode: 'ace/mode/abap',
      theme: 'ace/theme/monokai',
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
            <div style={{ position: 'relative', margin: '0 auto', height: 300, width: '80%' }}>
              <div id="editor" className="acediff" />
            </div>
          </div>
        </main>
      </Container>
    </React.Fragment>
  )
}

export default ParticularCase

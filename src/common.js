import React, { useEffect, useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
import Modal from '@material-ui/core/Modal'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Switch from '@material-ui/core/Switch'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import { logout } from './modules/actions'
import { store } from './store'
import { diff as DiffEditor } from 'react-ace'
import 'ace-builds/src-noconflict/mode-abap'
import 'ace-builds/src-noconflict/theme-github'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 3,
    justifyContent: 'center'
  },
  toolbarSecondary: {
    justifyContent: 'center',
    overflowX: 'auto'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  },
  paper: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    overflow: 'scroll',
    display: 'block',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  formControl: {
    minWidth: 120
  }
}))
const sectionsNotAdmin = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Cases', href: '/cases' }
]
const sectionsAdmin = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Cases', href: '/cases' },
  { name: 'Solutions in review', href: '/solutions_in_review' }
]
export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState(null)
  const [sections, setSections] = useState([])
  useEffect(() => {
    setIsLoggedIn(store.getState().main.isLoggedIn)
    setRole(store.getState().main.role)
  }, [store.getState()])
  useEffect(() => {
    if ((role === 'admin') | (role === 'editor')) setSections(sectionsAdmin)
    else setSections(sectionsNotAdmin)
  }, [role])
  const logOut = () => store.dispatch(logout())
  const classes = useStyles()
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Button style={{ flex: 0.5 }} size="small">
          {' '}
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}>
          VF Cookbook
        </Typography>
        {isLoggedIn ? (
          <Button
            style={{ flex: 0.5 }}
            onClick={logOut}
            variant="outlined"
            size="small">
            Sign out
          </Button>
        ) : (
          <Button
            href="/sign-in"
            style={{ flex: 0.5 }}
            variant="outlined"
            size="small">
            Sign in / Sign up
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}>
        {sections.map(section => (
          <Link
            color="inherit"
            noWrap
            key={section.name}
            variant="body2"
            href={section.href}
            className={classes.toolbarLink}>
            {section.name}
          </Link>
        ))}
      </Toolbar>
    </div>
  )
}

export const Footer = () => {
  const classes = useStyles()
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p">
          SDC Turkey 2020
        </Typography>
      </Container>
    </footer>
  )
}

export const CaseCard = ({ vfcase }) => {
  const classes = useStyles()
  return (
    <Grid item key={vfcase.id} xs={12} md={6}>
      <CardActionArea component="a" href={'/cases/' + vfcase.id}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {vfcase.name}
              </Typography>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  {vfcase.domain}
                </Typography>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  {vfcase.impact}
                </Typography>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  {vfcase.type}
                </Typography>
              </Grid>
              <Typography color="primary">more info...</Typography>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export const AddSolutionModal = ({
  handleClose,
  show,
  caseName,
  saveFunction
}) => {
  const classes = useStyles()
  const [code, setCode] = useState(['wrong code here', 'fixed version here'])
  const [footnote, setFootnote] = useState('')
  useEffect(() => {
    if (!show) setCode(['wrong code here', 'fixed version here'])
  }, [show])
  const handleSave = () =>
    saveFunction({
      before_en: code[0],
      after_en: code[1],
      footnote_en: footnote
    })
  return (
    <Modal aria-labelledby="title" aria-describedby="description" open={show}>
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        className={classes.paper}>
        <h2 id="title">Add new solution for case '{caseName}'</h2>
        <h3 id="description">Before & After</h3>
        <DiffEditor
          value={code}
          onChange={e => setCode(e)}
          height="300px"
          width="100%"
          mode="abap"
          name="diff-editor"
          theme="github"
        />
        <h3 id="footnote">Footnote</h3>
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => setFootnote(editor.getData())}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between'
          }}>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const EditSolutionModal = ({
  handleClose,
  show,
  caseName,
  saveFunction,
  _footnote,
  before,
  after
}) => {
  useEffect(() => {
    setCode([before, after])
    setFootnote(_footnote)
  }, [show])
  const classes = useStyles()
  const [code, setCode] = useState(['', ''])
  const [footnote, setFootnote] = useState('')
  const handleSave = () =>
    saveFunction({
      before_en: code[0],
      after_en: code[1],
      footnote_en: footnote
    })
  return (
    <Modal aria-labelledby="title" aria-describedby="description" open={true}>
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        className={classes.paper}>
        <h2 id="title">Edit the solution for case '{caseName}'</h2>
        <h3 id="description">Before & After</h3>
        <DiffEditor
          value={code}
          onChange={e => setCode(e)}
          height="300px"
          width="100%"
          mode="abap"
          name="diff-editor"
          theme="github"
        />
        <h3 id="footnote">Footnote</h3>
        <CKEditor
          onInit={editor => editor.setData(_footnote)}
          editor={ClassicEditor}
          onChange={(event, editor) => setFootnote(editor.getData())}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between'
          }}>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const AddCaseModal = ({
  show,
  handleClose,
  saveFunction,
  domains,
  impacts,
  types
}) => {
  const classes = useStyles()
  useEffect(() => {
    if (!show) {
      setTitle('')
      setDescription('')
    }
  }, [show])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [domain, setDomain] = useState('')
  const [impact, setImpact] = useState('')
  const [type, setType] = useState('')
  const [caseId, setCaseId] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [caseClass, setCaseClass] = useState('')
  const [documentation, setDocumentation] = useState('')
  const handleSave = () =>
    saveFunction({
      name: title,
      content_en: description,
      domain_id: domain,
      tctype_id: type,
      impact_id: impact,
      case_id: caseId,
      is_active: isActive,
      case_class: caseClass,
      documentation: documentation
    })
  return (
    <Modal aria-labelledby="title" aria-describedby="description" open={show}>
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        className={classes.paper}>
        <h2 id="title">Add case</h2>
        <h3 id="title-edit">Title</h3>
        <TextField
          fullWidth
          label="Title"
          id="standard-required"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Domain</InputLabel>
            <Select
              id="domain"
              value={domain}
              onChange={e => setDomain(e.target.value)}>
              {domains.map(d => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={e => setType(e.target.value)}>
              {types.map(d => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Impact</InputLabel>
            <Select
              id="impact"
              value={impact}
              onChange={e => setImpact(e.target.value)}>
              {impacts.map(d => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <TextField
            label="Case ID"
            id="standard-required"
            defaultValue={caseId}
            onChange={e => setCaseId(e.target.value)}
          />
          <TextField
            label="Documentation"
            id="standard-required"
            defaultValue={documentation}
            onChange={e => setDocumentation(e.target.value)}
          />
          <TextField
            label="Case Class"
            id="standard-required"
            defaultValue={caseClass}
            onChange={e => setCaseClass(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isActive}
                onChange={e => setIsActive(e.target.checked)}
                value="isActive"
              />
            }
            label="Is active"
          />
        </div>
        <h3 id="desc">Description</h3>
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => setDescription(editor.getData())}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between'
          }}>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const EditCaseModal = ({
  show,
  handleClose,
  _title,
  _desc,
  saveFunction
}) => {
  useEffect(() => {
    setTitle(_title)
    setDescription(_desc)
  }, [show])
  const classes = useStyles()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const handleSave = () =>
    saveFunction({ name: title, content_en: description })
  return (
    <Modal aria-labelledby="title" aria-describedby="description" open={true}>
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        className={classes.paper}>
        <h2 id="title">Edit case</h2>
        <h3 id="title-edit">Title</h3>
        <TextField
          fullWidth
          id="standard-required"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
        />
        <h3 id="desc">Description</h3>
        <CKEditor
          onInit={editor => editor.setData(_desc)}
          editor={ClassicEditor}
          onChange={(event, editor) => setDescription(editor.getData())}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between'
          }}>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const SolutionCard = ({ solution, clickFunction }) => {
  const classes = useStyles()
  return (
    <Grid item key={solution.id} xs={12} md={6}>
      <CardActionArea component="a" onClick={clickFunction}>
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                <b>Case:</b> {solution.vf_case_name}
              </Typography>
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  {solution.created_at}
                </Typography>
                <Typography
                  style={{ flex: 1 }}
                  variant="h6"
                  color="textSecondary">
                  <b>by:</b> {solution.created_by}
                </Typography>
              </Grid>
            </CardContent>
          </div>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export const ApproveSolutionModal = ({
  handleClose,
  show,
  caseName,
  approveFunction,
  footnote,
  before,
  after
}) => {
  const classes = useStyles()
  const handleApprove = () => approveFunction()
  return (
    <Modal aria-labelledby="title" aria-describedby="description" open={show}>
      <div
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        className={classes.paper}>
        <h2 id="title">Approval of the solution for case '{caseName}'</h2>
        <h3 id="description">Before & After</h3>
        <DiffEditor
          value={[before, after]}
          height="300px"
          width="100%"
          mode="abap"
          name="diff-editor"
          theme="github"
        />
        <h3 id="footnote">Footnote</h3>
        <CKEditor
          onInit={editor => editor.setData(footnote)}
          editor={ClassicEditor}
          disabled
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between'
          }}>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" onClick={handleApprove}>
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  )
}

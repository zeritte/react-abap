import axios from 'axios'

export const SIGN_IN = 'sign_in'
export const SIGN_IN_SUCCESS = 'sign_in_success'
export const SIGN_IN_FAIL = 'sign_in_fail'
export const SIGN_UP = 'sign_up'
export const SIGN_UP_SUCCESS = 'sign_up_success'
export const SIGN_UP_FAIL = 'sign_up_fail'
export const LOGOUT = 'logout'
export const API_URL = 'http://localhost:3000/api/'
export const FETCH_ALL_CASES = 'fetch_all_cases'
export const FETCH_ALL_CASES_SUCCESS = 'fetch_all_cases_success'
export const FETCH_ALL_CASES_FAIL = 'fetch_all_cases_fail'
export const FETCH_PARTICULAR_CASE = 'fetch_particular_case'
export const FETCH_PARTICULAR_CASE_SUCCESS = 'fetch_particular_case_success'
export const FETCH_PARTICULAR_CASE_FAIL = 'fetch_particular_case_fail'

export const signIn = (email, password) => dispatch => {
  dispatch({ type: SIGN_IN })
  axios
    .post(API_URL + 'sessions', { user: { email, password } })
    .then(r => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: r.data })
    })
    .catch(e => {
      dispatch({ type: SIGN_IN_FAIL, payload: e.response.data })
    })
}

export const signUp = (name, email, password) => dispatch => {
  dispatch({ type: SIGN_UP })
  axios
    .post(API_URL + 'registrations', { user: { name, email, password } })
    .then(r => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: r.data })
    })
    .catch(e => {
      dispatch({ type: SIGN_UP_FAIL, payload: e.response.data })
    })
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}

export const fetchAllCases = () => dispatch => {
  dispatch({ type: FETCH_ALL_CASES })
  axios
    .get(API_URL + 'vf_cases')
    .then(r => {
      dispatch({ type: FETCH_ALL_CASES_SUCCESS, payload: r.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_ALL_CASES_FAIL, payload: e.response.data })
    })
}

export const fetchParticularcase = id => dispatch => {
  dispatch({ type: FETCH_PARTICULAR_CASE })
  axios
    .get(API_URL + 'vf_cases/' + id)
    .then(r => {
      dispatch({ type: FETCH_PARTICULAR_CASE_SUCCESS, payload: r.data })
    })
    .catch(e => {
      dispatch({ type: FETCH_PARTICULAR_CASE_FAIL, payload: e.response.data })
    })
}

export const addSolution = (params, setAlert) => (dispatch, getState) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .post(API_URL + 'solutions', { solution: params })
    .then(r => {
      setAlert({
        title: 'Solution is added successfully!',
        description: r.data.message
      })
      dispatch(fetchParticularcase(params['vf_case_id']))
    })
    .catch(e => {
      setAlert({
        title: 'Solution cannot be added.',
        description: e.response.data.message[0]
      })
    })
}

export const updateSolution = (params, solutionId, setAlert) => (
  dispatch,
  getState
) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .put(API_URL + 'solutions/' + solutionId, { solution: params })
    .then(r => {
      setAlert({
        title: 'Solution is updated successfully!',
        description: r.data.message
      })
      dispatch(fetchParticularcase(params['vf_case_id']))
    })
    .catch(e => {
      setAlert({
        title: 'Solution cannot be updated.',
        description: e.response.data.message[0]
      })
    })
}

export const addCase = params => (dispatch, getState) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .post(API_URL + 'vf_cases', { vf_case: params })
    .then(r => {
      dispatch(fetchAllCases())
    })
    .catch(e => {
      console.log(e)
    })
}

export const updateCase = (params, caseId, setAlert) => (
  dispatch,
  getState
) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .put(API_URL + 'vf_cases/' + caseId, { solution: params })
    .then(r => {
      setAlert({
        title: 'Case is updated successfully!',
        description: r.data.message
      })
      dispatch(fetchParticularcase(caseId))
    })
    .catch(e => {
      setAlert({
        title: 'Case cannot be updated.',
        description: e.response.data.message[0]
      })
    })
}

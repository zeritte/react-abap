import axios from 'axios'
import API_URL from '../api_url'

export const SIGN_IN = 'sign_in'
export const SIGN_IN_SUCCESS = 'sign_in_success'
export const SIGN_IN_FAIL = 'sign_in_fail'
export const SIGN_UP = 'sign_up'
export const SIGN_UP_SUCCESS = 'sign_up_success'
export const SIGN_UP_FAIL = 'sign_up_fail'
export const LOGOUT = 'logout'
export const FETCH_ALL_CASES = 'fetch_all_cases'
export const FETCH_ALL_CASES_SUCCESS = 'fetch_all_cases_success'
export const FETCH_ALL_CASES_FAIL = 'fetch_all_cases_fail'
export const FETCH_PARTICULAR_CASE = 'fetch_particular_case'
export const FETCH_PARTICULAR_CASE_SUCCESS = 'fetch_particular_case_success'
export const FETCH_PARTICULAR_CASE_FAIL = 'fetch_particular_case_fail'
export const FETCH_DOMAINS_TYPES_IMPACTS = 'fetch_domain_types_impacts'
export const FETCH_SOLUTIONS_IN_REVIEW = 'fetch_solutions_in_review'
export const FETCH_SOLUTIONS_IN_REVIEW_SUCCESS =
  'fetch_solutions_in_review_success'
export const FETCH_SOLUTIONS_IN_REVIEW_FAIL = 'fetch_solutions_in_review_fail'
export const FETCH_ALL_USERS = 'fetch_alL_users'
export const FETCH_ALL_USERS_SUCCCESS = 'fetch_alL_users_success'
export const FETCH_ALL_USERS_FAIL = 'fetch_alL_users_fail'

export const signIn = (email, password) => dispatch => {
  dispatch({ type: SIGN_IN })
  axios
    .post(API_URL + 'sessions', { user: { email, password } })
    .then(r => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: r.data })
    })
    .catch(e => {
      dispatch({
        type: SIGN_IN_FAIL,
        payload: e.response ? e.response.data : { message: 'Auth server error' }
      })
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
      dispatch({
        type: SIGN_UP_FAIL,
        payload: e.response
          ? e.response.data
          : { message: ['Auth server error'] }
      })
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
      dispatch({
        type: FETCH_ALL_CASES_FAIL,
        payload: e.response ? e.response.data : null
      })
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
      dispatch({
        type: FETCH_PARTICULAR_CASE_FAIL,
        payload: e.response ? e.response.data : null
      })
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
        title: 'Solution can not be added.',
        description: e.response && e.response.data && e.response.data.message
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
        title: 'Solution can not be updated.',
        description: e.response && e.response.data && e.response.data.message
      })
    })
}

export const addCase = (params, setAlert) => (dispatch, getState) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .post(API_URL + 'vf_cases', { vf_case: params })
    .then(r => {
      setAlert({
        title: 'Case is created successfully!',
        description: r.data.message
      })
      dispatch(fetchAllCases())
    })
    .catch(e => {
      setAlert({
        title: 'Case can not be created.',
        description: e.response && e.response.data && e.response.data.message
      })
    })
}

export const updateCase = (params, caseId, setAlert) => (
  dispatch,
  getState
) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .put(API_URL + 'vf_cases/' + caseId, { vf_case: params })
    .then(r => {
      setAlert({
        title: 'Case is updated successfully!',
        description: r.data.message
      })
      dispatch(fetchParticularcase(caseId))
    })
    .catch(e => {
      setAlert({
        title: 'Case can not be updated.',
        description: e.response && e.response.data && e.response.data.message
      })
    })
}

export const fetchRelatedData = () => async dispatch => {
  const domains = await axios.get(API_URL + 'domains')
  const types = await axios.get(API_URL + 'tctypes')
  const impacts = await axios.get(API_URL + 'impacts')
  dispatch({
    type: FETCH_DOMAINS_TYPES_IMPACTS,
    domains: domains.data,
    types: types.data,
    impacts: impacts.data
  })
}

export const fetchSolutionsInReview = () => async (dispatch, getState) => {
  axios.defaults.headers.common['token'] = getState().main.token
  dispatch({ type: FETCH_SOLUTIONS_IN_REVIEW })
  axios
    .get(API_URL + 'waiting_list')
    .then(r => {
      dispatch({ type: FETCH_SOLUTIONS_IN_REVIEW_SUCCESS, payload: r.data })
    })
    .catch(e => {
      dispatch({
        type: FETCH_SOLUTIONS_IN_REVIEW_FAIL,
        payload:
          e.response && e.response.data && e.response.data.message
            ? e.response.data.message
            : 'Could not fetch the data. Please contact to system admin.'
      })
    })
}

export const approveSolution = (id, setAlert) => async (dispatch, getState) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .get(API_URL + 'approve_solution/' + id)
    .then(r => {
      setAlert({
        title: 'Success!',
        description: r.data.message
      })
      dispatch(fetchSolutionsInReview())
    })
    .catch(e => {
      setAlert({
        title: 'Solution could not be approved.',
        description: e.response && e.response.data && e.response.data.message
      })
    })
}

export const createRelatedData = (name, params, setAlert) => async (
  dispatch,
  getState
) => {
  axios.defaults.headers.common['token'] = getState().main.token
  const section = name === 'types' ? 'tctypes' : name
  axios
    .post(API_URL + section, params)
    .then(r => {
      setAlert({
        title: 'Success!',
        description: r.data.message
      })
      dispatch(fetchRelatedData())
    })
    .catch(e => {
      setAlert({
        title: 'Could not be created!',
        description: e.response && e.response.data && e.response.data.message
      })
    })
}

export const updateRelatedData = (name, params, id, setAlert) => async (
  dispatch,
  getState
) => {
  axios.defaults.headers.common['token'] = getState().main.token
  const section = name === 'type' ? 'tctype' : name
  axios
    .put(API_URL + section + 's/' + id, params)
    .then(r => {
      setAlert({
        title: 'Success!',
        description: r.data.message
      })
      dispatch(fetchRelatedData())
    })
    .catch(e => {
      setAlert({
        title: 'Could not be updated!',
        description: e.response && e.response.data && e.response.data.message
      })
    })
}

export const deleteRelatedData = (name, id, setAlert) => async (
  dispatch,
  getState
) => {
  axios.defaults.headers.common['token'] = getState().main.token
  const section = name === 'type' ? 'tctype' : name
  axios
    .delete(API_URL + section + 's/' + id)
    .then(r => {
      setAlert({
        title: 'Success!',
        description: r.data.message
      })
      dispatch(fetchRelatedData())
    })
    .catch(e => {
      setAlert({
        title: 'Could not be deleted!',
        description: e.response && e.response.data && e.response.data.message
      })
    })
}

export const fetchAllUsers = () => async (dispatch, getState) => {
  axios.defaults.headers.common['token'] = getState().main.token
  dispatch({ type: FETCH_ALL_USERS })
  axios
    .get(API_URL + 'registrations')
    .then(r => {
      dispatch({
        type: FETCH_ALL_USERS_SUCCCESS,
        payload: r.data
      })
    })
    .catch(e => {
      dispatch({
        type: FETCH_ALL_USERS_FAIL,
        payload:
          e.response && e.response.data && e.response.data.message
            ? e.response.data.message
            : 'Could not fetch the data. Please contact to system admin.'
      })
    })
}

export const updateUser = (id, params) => async (dispatch, getState) => {
  axios.defaults.headers.common['token'] = getState().main.token
  axios
    .put(API_URL + 'registrations/' + id, params)
    .then(r => {
      console.log(r.data)
      dispatch(fetchAllUsers())
    })
    .catch(e => {
      console.log(e && e.response)
    })
}

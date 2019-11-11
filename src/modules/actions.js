import axios from 'axios'

export const SIGN_IN = 'sign_in'
export const SIGN_IN_SUCCESS = 'sign_in_success'
export const SIGN_IN_FAIL = 'sign_in_fail'
export const SIGN_UP = 'sign_up'
export const SIGN_UP_SUCCESS = 'sign_up_success'
export const SIGN_UP_FAIL = 'sign_up_fail'
export const LOGOUT = 'logout'
export const API_URL = 'http://localhost:3000/api/'

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
  setTimeout(() => {
    axios
      .post(API_URL + 'registrations', { user: { name, email, password } })
      .then(r => {
        dispatch({ type: SIGN_UP_SUCCESS, payload: r.data })
      })
      .catch(e => {
        dispatch({ type: SIGN_UP_FAIL, payload: e.response.data })
      })
  }, 3000)
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}

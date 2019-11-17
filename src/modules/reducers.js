import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  LOGOUT,
  FETCH_ALL_CASES,
  FETCH_ALL_CASES_SUCCESS,
  FETCH_ALL_CASES_FAIL
} from './actions'

const initialState = {
  signInLoading: false,
  signUpLoading: false,
  isLoggedIn: false,
  loginError: null,
  signUpError: null,
  userId: null,
  token: null,
  role: null,
  name: null,
  vfCasesDashboard: null,
  vfCasesDashboardLoading: false,
  vfCasesDashboardError: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signInLoading: true,
        loginError: null
      }
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signInLoading: false,
        isLoggedIn: true,
        userId: action.payload.id,
        token: action.payload.authentication_token,
        role: action.payload.role,
        name: action.payload.name
      }
    case SIGN_IN_FAIL:
      return {
        ...state,
        signInLoading: false,
        isLoggedIn: false,
        userId: null,
        token: null,
        role: null,
        name: null,
        loginError: action.payload.message
      }
    case SIGN_UP:
      return {
        ...state,
        signUpLoading: true,
        signUpError: null
      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        isLoggedIn: true,
        userId: action.payload.id,
        token: action.payload.authentication_token,
        role: action.payload.role,
        name: action.payload.name
      }
    case SIGN_UP_FAIL:
      return {
        ...state,
        signUpLoading: false,
        isLoggedIn: false,
        userId: null,
        token: null,
        role: null,
        name: null,
        signUpError: action.payload.message
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        token: null,
        role: null,
        name: null
      }
    case FETCH_ALL_CASES:
      return {
        ...state,
        vfCasesDashboardLoading: true
      }
    case FETCH_ALL_CASES_SUCCESS:
      return {
        ...state,
        vfCasesDashboard: action.payload,
        vfCasesDashboardLoading: false
      }
    case FETCH_ALL_CASES_FAIL:
      return {
        ...state,
        vfCasesDashboardError: "Could not fetch the data. Please contact to system admin.",
        vfCasesDashboardLoading: false
      }
    default:
      return state
  }
}

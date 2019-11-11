import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL
} from './actions'

const initialState = {
  signInLoading: false,
  signUpLoading: false,
  isLoggedIn: false,
  loginError: null,
  signUpError: null,
  userId: null,
  token: null,
  role: null
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
        role: action.payload.role
      }
    case SIGN_IN_FAIL:
      return {
        ...state,
        signInLoading: false,
        isLoggedIn: false,
        userId: null,
        token: null,
        role: null,
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
        role: action.payload.role
      }
    case SIGN_UP_FAIL:
      return {
        ...state,
        signUpLoading: false,
        isLoggedIn: false,
        userId: null,
        token: null,
        role: null,
        signUpError: action.payload.message
      }
    default:
      return state
  }
}

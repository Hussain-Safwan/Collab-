import {
  LOGIN,
  REGISTER
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case LOGIN: 
      localStorage.setItem('token', action.payload.token)
      console.log(action.payload.token)
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: true
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        loading: false
      }
    case 'ERROR_USER': 
      return {
        ...state,
        user: null,
        isAuth: false
      }
    default: 
      return {
        ...state
      }
  }
}
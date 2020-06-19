import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types'

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // REGISTER USER
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(
      'http://localhost:4000/users/',
      formData,
      config
      )
    console.log(res.data)
    loadUser()
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  }

  // LOAD USER
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('http://localhost:4000/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  

  // LOGIN USER
  const loginUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(
      'http://localhost:4000/auth/',
      formData,
      config
      )
    console.log(`[backend] ${res.data}`)
    loadUser()
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  }


  // LOGOUT USER
  const logoutUser = () => {
    dispatch({
      type: LOGOUT
    })
  }

  // CLEAR USER
  const clearUser = () => {
    console.log('clear user')
  }
  
  return (
    <AuthContext.Provider
      value={
        { 
          token: state.token,
          isAuthenticated: state.isAuthenticated,
          loading: state.loading,
          error: state.error,
          user: state.user,
          register,
          loadUser,
          loginUser,
          logoutUser,
          clearUser
        }
    } >
        { props.children }
      </AuthContext.Provider>
  )

}

export default AuthState
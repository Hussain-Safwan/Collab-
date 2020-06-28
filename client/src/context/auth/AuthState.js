import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'

import axios from 'axios'

import setAuthToken from '../../utils/setAuthToken'

import {
  LOGIN,
  REGISTER
} from '../types'

const AuthState = props => {
  const initialState = {
    user: null,
    isAuth: false,
    loading: null
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const res = await axios.post('http://localhost:5000/auth/login', formData, config)
    console.log(res.data)
    getUser()
    dispatch({
      type: LOGIN,
      payload: res.data
    })
  }

  const register = async formData => {
    console.log('state', formData)
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const res = await axios.post('http://localhost:5000/auth/register', formData, config)
    console.log(res.data)
    dispatch({
      type: REGISTER,
      payload: formData
    })
  }

  const getUser = async () => {
    setAuthToken(localStorage.token)
    console.log('getUser')
    const res = await axios.get('http://localhost:5000/auth/getUser')
    console.log('[get-user]', res.data)
    if (res.data) {
      dispatch({
        type: 'SET_USER',
        payload: res.data
      })
    } else {
      dispatch({
        type: 'ERROR_USER'
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: state.isAuth,
        user: state.user,
        login,
        register,
        getUser
      }}
    >
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthState

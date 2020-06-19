import React, { useReducer } from 'react'
import AlertContext from './AlertContext'
import AlertReducer from './AlertReducer'

import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types'

const AlertState = props => {
  const initialState = []

  const [state, dispatch] = useReducer(AlertReducer, initialState)

  // set alert
  const setAlert = (msg, type, timeout = 4000) => {
    const id = 'new_id'
    dispatch({
      type: SET_ALERT,
      payload: {
        msg, 
        type,
        id
      }
    })

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      })
    }, timeout)
  }
  
  return (
    <AlertContext.Provider
      value={
        { 
          alerts: state,
          setAlert
        }
    } >
        { props.children }
      </AlertContext.Provider>
  )

}

export default AlertState
import React, { useReducer } from 'react'
import ContactContext from './ContactContext'
import ContacReducer from './ContactReducer'
import axios from 'axios'

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  AUTH_NEEDED
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null
  }

  const [state, dispatch] = useReducer(ContacReducer, initialState)

  // get contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('https://collab-bin.herokuapp.com/contacts/')
      console.log('state: ', res.data)
      if (res.data.status) {
        dispatch({
          type: GET_CONTACTS,
          payload: res.data.contacts
        })
      } else {
        dispatch({
          type: AUTH_NEEDED,
        })
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  // add contact
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('https://collab-bin.herokuapp.com/contacts', contact, config)
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // update contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }

  // delete contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // set current contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // filter contacts
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider
      value={
        { 
          contacts: state.contacts,
          current: state.current,
          filtered: state.filtered,
          getContacts,
          addContact,
          updateContact,
          deleteContact,
          setCurrent,
          clearCurrent,
          filterContacts,
          clearFilter
     }
  } >
        { props.children }
      </ContactContext.Provider>
  )

}

export default ContactState
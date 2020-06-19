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

export default (state, action) => {
  switch(action.type) {
    case GET_CONTACTS: 
    return {
      ...state,
      contacts: action.payload,
    }

    case AUTH_NEEDED: 
      return {
        ...state,
        contacts: []
      }

    case ADD_CONTACT: 
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }

    case UPDATE_CONTACT:
    return {
      ...state,
      contacts: state.contacts.map((contact) => (
        contact.id == action.payload.id ? action.payload : contact
        )
      )
    }

    case DELETE_CONTACT: 
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload)
      }

    case SET_CURRENT: 
    return {
      ...state,
      current: action.payload
    }

    case CLEAR_CURRENT: 
    return {
      ...state,
      current: null
    }

    case FILTER_CONTACTS: 
    return {
      ...state,
      filtered: state.contacts.filter(contact => {
        const regex = new RegExp(`${action.payload}`, `gi`)
        return contact.title.match(regex) || contact.body.match(regex)
      })
    }

    case CLEAR_FILTER: 
    return {
      ...state,
      filtered: null
    }

    default: 
      return state
  }
}
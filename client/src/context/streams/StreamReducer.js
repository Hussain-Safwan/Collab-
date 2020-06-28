import {
  CREATE_STREAM,
  JOIN_STREAM,
  GET_STREAM,
  SEND_MESSAGE,
  CHOOSE_STREAM,
  DELETE_STREAM,
  UPDATE_STREAM
} from '../types'

export default (state, action) => {
  switch (action.type) {

    case GET_STREAM: 
      return {
        ...state,
        streams: action.payload,
        current: action.payload[0],
        currentMessage: action.payload[0].messages.reverse(),
        loading: false
      }
    case CHOOSE_STREAM: 
      return {
        ...state,
        current: action.payload,
        currentMessage: action.payload.messages.reverse()
      }
    case SEND_MESSAGE: 
      const { formData, current } = action.payload
      return {
        ...state,
        current: current,
        currentMessage: [...state.currentMessage, formData].reverse()
      }
    case 'RENDER_MESSAGES':
      return {
        ...state,
        current: action.payload,
        currentMessage: action.payload.messages.reverse()
      }
    case 'SET_CURRENT': 
      return {
        ...state,
        current: action.payload,
        currentMessage: action.payload.messages
      }
    case CREATE_STREAM: 
      return {
        ...state,
        streams: [...state.streams, action.payload]
      }
    case DELETE_STREAM:
      return {
        ...state,
        streams: state.streams.filter(stream => stream.id !== action.payload.id),
        current: state.streams[0]
      }
    case JOIN_STREAM: 
      return {
        ...state,
        streams: [...state.streams, action.payload]
      }
    default: 
      return {
        ...state
      }
  }
}
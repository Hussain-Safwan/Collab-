import React, { useReducer, useContext } from 'react'
import StreamReducer from './StreamReducer'
import StreamContext from './StreamContext'
import setAuthToken from '../../utils/setAuthToken'
import AuthContext from '../auth/AuthContext'

import axios from 'axios'
import io from 'socket.io-client'

import {
  CREATE_STREAM,
  JOIN_STREAM,
  GET_STREAM,
  SEND_MESSAGE,
  CHOOSE_STREAM,
  DELETE_STREAM,
  UPDATE_STREAM
} from '../types'

const socket = io('http://localhost:5000')

const StreamState = props => {
  const initialState = {
    current: null,
    streams: [],
    currentMessage: null,
    loading: true
  }

  const [state, dispatch] = useReducer(StreamReducer, initialState)

  const authContext = useContext(AuthContext)
  const { user } = authContext

  socket.on('new message', data => {
    renderMessages(data)
  })

  const renderMessages = data => {
    dispatch({
      type: 'RENDER_MESSAGES',
      payload: data
    })
  }

  const getStream = async () => {
    if (user) {
      const res = await axios.get(`http://localhost:5000/streams/${user._id}`)
      dispatch({
        type: GET_STREAM,
        payload: res.data
      })
    }
  }

  const resetCurrent = async data => {
    console.log(data)
    dispatch({
      type: 'SET_CURRENT',
      payload: data
    })
  }

  const selectStream = stream => {
    dispatch({
      type: CHOOSE_STREAM,
      payload: stream
    })
  }

  const sendMessage = async obj => {
    if (user) {

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { formData, current } = obj
      formData.sender_id = user._id
      formData.sender_name = user.name
      console.log(formData)

      await axios.post('http://localhost:5000/streams/send', formData, config)

      dispatch({
        type: SEND_MESSAGE,
        payload: obj
      })
    }
  }

  const createStream = async title => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (user) {
      const formData = {
        title: title.title,
        owner_id: user._id,
        owner_name: user.name
      }
      const res = await axios.post('http://localhost:5000/streams/create', formData, config)
      dispatch({
        type: CREATE_STREAM,
        payload: formData
      })
    }
  }

  const deleteStream = formData => {
    dispatch({
      type: DELETE_STREAM,
      payload: formData
    })
  }

  const updateStream = formData => {
    dispatch({
      type: UPDATE_STREAM,
      payload: formData
    })
  }

  const joinStream = async link => {
    const url = `http://localhost:5000/streams/join/${link}/${user._id}`
    const res = await axios.get(url)
    console.log(res.data.newStream)
    dispatch({
      type: JOIN_STREAM,
      payload: res.data.newStream
    })
  }

  return (
    <StreamContext.Provider 
      value={{
        streams: state.streams,
        messages: state.messages,
        current: state.current,
        currentMessage: state.currentMessage,
        loading: state.loading,
        getStream,
        sendMessage,
        selectStream,
        resetCurrent,
        createStream,
        deleteStream,
        updateStream,
        joinStream
      }}
    >
      { props.children }
    </StreamContext.Provider>
  )
}

export default StreamState


// { _id:
//     {
//        _data:
//       '825EF6D4C7000000022B022C0100296E5A1004CA7A3AFA58AE47DB892DD7E6C4E65B2046645F696400645EF4C261B6054E32AB4DE74D0004'
//     },
//      operationType: 'update',
//      clusterTime: Timestamp { _bsontype: 'Timestamp', low_: 2, high_: 1593234631 },
//      ns: { 
//        db: 'NiggaByte', 
//        coll: 'streams' 
//       },
//      documentKey: { 
//        _id: 5ef4c261b6054e32ab4de74d 
//     },
//      updateDescription: { 
//         updatedFields: { 'messages.13': [Object] },
//         removedFields: [] 
//       } 
// }
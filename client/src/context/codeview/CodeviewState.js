import React, { useEffect, useState, useReducer } from 'react'
import CodeviewContext from './CodeviewContext'
import io from 'socket.io-client'
import axios from 'axios'

const endpoint = 'https://collab-bin.herokuapp.com/'
const socket = io.connect(endpoint)

const CodeviewState = props => {
  
  const init = file => {
    const data = JSON.stringify(file)
    socket.emit('create', data)
  }

  return (
    <CodeviewContext.Provider
      value={{
        init,
      }} >
        { props.children }
      </CodeviewContext.Provider>
  )
}

export default CodeviewState
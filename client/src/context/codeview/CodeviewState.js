import React, { useEffect, useState } from 'react'
import CodeviewContext from './CodeviewContext'
import io from 'socket.io-client'
import axios from 'axios'

const endpoint = 'https://collab-bin.herokuapp.com'
const socket = io.connect(endpoint)

const CodeviewState = props => {
  const state = {
    filename: null,
    fileContents: null,
  }
  const [state, setState] = useState(state)
  console.log('codeview state', props)

  const init = file => {
    console.log(file)
  }

  return (
    <CodeviewContext.Provider
      value={{
        filename: state.filename,
        fileContents: state.fileContents,
        init
      }} >
        { props.children }
      </CodeviewContext.Provider>
  )
}

export default CodeviewState
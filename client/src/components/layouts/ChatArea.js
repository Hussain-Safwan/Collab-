import React, { useEffect, useContext, useState } from 'react'
import { GET_STREAM } from '../../context/types'
import StreamContext from '../../context/streams/StreamContext'

import StreamList from './StreamList'
import StreamState from '../../context/streams/StreamState'
import ChatBox from './ChatBox'

const ChatArea = () => {

  const streamContext = useContext(StreamContext)
  const { getStream, streams, loading, messages } = streamContext

  return (
    <div className='chat-area'>
      <div className='streamlist'>
          <StreamList />
      </div>
    </div>
  )
}

export default ChatArea

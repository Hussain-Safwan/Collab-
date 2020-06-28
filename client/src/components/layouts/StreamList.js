import React, { useState, useContext, useEffect } from 'react'
import StreamItems from './StreamItems'
import StreamContext from '../../context/streams/StreamContext'

const flex = {
  display: 'flex', 
  justifyContent: 'space-between'
}
const icon = {color: 'gray', marginTop: '10px', cursor: 'pointer'}

const StreamList = (props) => {
  const streamContext = useContext(StreamContext)
  const { createStream, getStream, streams, loading, currentMessage } = streamContext

  const [title, setTitle] = useState('')
  const titleChange = e => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    getStream()
  }, [])

  const onSubmit = e => {
    console.log(title)
    const formData = {
      id: 997,
      title
    }
    createStream(formData)
  }
  return (
    <div>
      <ul class="collection with-header">
        <li class="collection-header"><div style={flex}><h5>Streams</h5> <a className='modal-trigger' href='#create-stream'><i className='small material-icons' style={icon}>add</i></a> </div></li>
          {
            !streams ? <p>Loading...</p> : streams.map(stream => (<StreamItems stream={stream} />))
          }
      </ul> 
  </div>
  )
}

export default StreamList
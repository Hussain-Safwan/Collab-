import React, { useState, useContext } from 'react'

import StreamContext from '../../context/streams/StreamContext'

const CreateStreamModal = () => {

  const streamContext = useContext(StreamContext)
  const { createStream, joinStream } = streamContext

  const [title, setTitle] = useState('')
  const titleChange = e => {
    setTitle(e.target.value)
  }

  const [link, setLink] = useState('')
  const linkChange = e => {
    setLink(e.target.value)
  }

  const onSubmit = e => {
    console.log(title)
    const formData = {
      title
    }
    createStream(formData)
  }

  const onJoin = e => {
    console.log(link)
    joinStream(link)
  }

  return (
    <div id="create-stream" className="modal">
      <div class="modal-content">
        <h4>Create Stream</h4>
        <p><input name='title' value={title} onChange={titleChange} placeholder='Title for the stream' /></p>
        <h5>Or join an existing one</h5>
        <p style={{display: 'flex'}}><input name='link' value={link} onChange={linkChange} placeholder='Place the link here' /> <button onClick={onJoin}>Join</button> </p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn" onClick={onSubmit}>Create</a>
      </div>
    </div>
  )
}

export default CreateStreamModal

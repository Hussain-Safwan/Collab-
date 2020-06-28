import React, { useContext, useState, useEffect, useRef } from 'react'
import M from 'materialize-css/dist/js/materialize.min.js'

import StreamContext from '../../context/streams/StreamContext'
import AuthContext from '../../context/auth/AuthContext'

const ChatBox = (props) => {
  const { messages } = props

  const streamContext = useContext(StreamContext)
  const { sendMessage, current, updateStream, currentMessage, resetCurrent } = streamContext
  const authContext = useContext(AuthContext)
  const { user, getUser } = authContext

  const [msg, setMsg] = useState('')
  const msgRef = useRef()

  const onSend = (e) => {
    const obj = {
      formData: {
        stream_id: current._id,
        text: msg,
        category: 'text'
      },
      current
    } 
    sendMessage(obj)
    setMsg('')
  }

  const handleInput = (e) => {
    setMsg(e.target.value)
  }

  const [title, setTitle] = useState('')
  const titleChange = e => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    console.log(current)
    if (!current) {
      const cs = JSON.parse(localStorage.getItem('current'))
      console.log('cs', cs)
      resetCurrent(cs)
    } else {
      setTitle(current.title)
      console.log(title)
      const cs = JSON.stringify(current)
      localStorage.setItem('current', cs)
    }
    getUser()
  }, [])

  const onSubmit = e => {
    console.log(title)
    const formData = {
      id: 997,
      title
    }
    updateStream(formData)
  }

  const openVideoChat = e => {
    const obj = {
      formData: {
        stream_id: current._id,
        text: 'Video chat started',
        category: 'video'
      },
      current
    } 
    sendMessage(obj)
    setMsg('')
  }

  const copyLink = e => {
    navigator.clipboard.writeText( current._id )
    M.toast({ html: 'Link copied' })
  }

  const joinVideoChat = e => {
    window.open(`https://media.monerdaktar.com/${current._id}`)
  }

  if (!current) {
    return (<p>Select a stream</p>)
  }
  return (
    <div className='chatbox'>
      <div className='above-messages'>
        <div className='left'>
          <div className='image'>
            <img src={`https://robohash.org/${current._id}?set=set4`} />
          </div>
          <div className='title'>
          <a className='modal-trigger' href='#update-stream'><h5>{title}</h5></a>  
          </div>
        </div>
        <div className='right' style={{display: 'flex'}}>
            <i className='small material-icons' style={{cursor: 'pointer', color: 'gray'}} onClick={openVideoChat}>switch_video</i>
            <i className='small material-icons' style={{cursor: 'pointer', color: 'gray'}} onClick={copyLink}>add_circle_outline</i>
        </div>
      </div>
      <div className='messages' id='messages' ref={msgRef}>
        {
          currentMessage.map(message => ( message.sender_id == user._id ? (message.category === 'text' ? (
            <p className='Green'><span className='bubble'>{ message.text }</span></p>
          ) : (
            <p className='Green'><span className='bubble'><button onClick={joinVideoChat}>Join</button></span></p>
          ) ) : 
        (message.category === 'text' ? (
          <p className='Gray'><span className='bubble'>{ message.text }</span></p>
        ) : (
          <p className='Gray'><span className='bubble'><button onClick={joinVideoChat}>Join</button></span></p>
        ) )))
        }
      </div>
      <div className='type-area'>
        <textarea name='msg' value={msg} onChange={handleInput}></textarea>
        <p><i class="material-icons right" onClick={onSend}>send</i></p>
      </div>
    </div>
  )
}

export default ChatBox

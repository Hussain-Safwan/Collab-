import React, { useEffect, useState, createRef, findDOMNode } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const endpoint = 'http://localhost:4000/'
const socket = io.connect(endpoint)

const Codeview = props => {
  const [body, setBody] = useState(props.location.state.contact.body)
  const [show, setShow] = useState('x-low')

  useEffect(async() => {
    const file = {
      name: props.location.state.contact._id,
      contents: props.location.state.contact.body
    }
    
    const data = JSON.stringify(file)
    socket.emit('create', data)
    socket.on('update', data => {
      console.log('updated')
      setBody(data)
      const editor = document.getElementById('editor')
      editor.selectionStart = editor.selectionEnd = localStorage.getItem('c')
      blip()
    })
  }, [socket])

  const onChange = e => {
    localStorage.setItem('c', e.target.selectionStart)
    socket.emit('update', e.target.value)
  }

  const blip = () => {
    setShow('low')
    setTimeout(() => {
      setShow('x-low')
    }, 100);
  }
  
  return (
    <div className='codeview'>
      <div className='wrapper'>
        <textarea id='editor' value={body} onChange={onChange}/>
        <div className={show}>
          <div></div>
          <span>hi</span>
        </div>
      </div>
    </div>
  )
}

export default Codeview
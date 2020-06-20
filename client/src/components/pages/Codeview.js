import React, { useEffect, useState, createRef, findDOMNode } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const endpoint = 'https://collab-bin.herokuapp.com'
const socket = io.connect(endpoint)

const Codeview = props => {
  const [body, setBody] = useState(props.location.state.contact.body)
  const [show, setShow] = useState('x-low')
  const [count, setCount] = useState(0)

  useEffect(async() => {
    const file = {
      name: props.location.state.contact._id,
      contents: props.location.state.contact.body
    }
    
    const data = JSON.stringify(file)
    socket.emit('create', data)
    socket.on('update', data => {
      setBody(data)
      const editor = document.getElementById('editor')
      editor.selectionStart = editor.selectionEnd = localStorage.getItem('c')
    })
  }, [socket])

  const onChange = e => {
    setBody(e.target.value)
    localStorage.setItem('c', e.target.selectionStart)
    if (e.target.value[e.target.value.length - 1] == ' ') {
      socket.emit('update', e.target.value)
    }
    blip()
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
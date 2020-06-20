import React, { useEffect, useState, useContext } from 'react'
import CodeviewContext from '../../context/codeview/CodeviewContext'
import io from 'socket.io-client'
import axios from 'axios'

const endpoint = 'http://localhost:4000'
const socket = io.connect(endpoint)

const Codeview = props => {
  const codeviewContext = useContext(CodeviewContext)
  const { init } = codeviewContext

  const {_id, title, body} = props.location.state.contact
  const [code, setCode] = useState(body)
  const [show, setShow] = useState('x-low')
  const [count, setCount] = useState(0)

  useEffect(() => {
    const file = {
      name: _id,
      contents: body
    }
    init(file)
    
    socket.on('update', data => {
      setCode(data)
      const editor = document.getElementById('editor')
      editor.selectionStart = editor.selectionEnd = localStorage.getItem('c')
    })
  }, [socket])

  const onChange = e => {
    setCode(e.target.value)
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
      <div className='title'>
        <i class="fa fa-code"></i>
        <span>{title}</span>
      </div>
      <div className='wrapper'>
        <textarea id='editor' value={code} onChange={onChange}/>
        <div className={show}>
          <div></div>
          <span>hi</span>
        </div>
      </div>
    </div>
  )
}

export default Codeview
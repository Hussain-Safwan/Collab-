import React, { useState, useContext, useEffect } from 'react'
import Alerts from '../layout/Alerts'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'


const Register = (props) => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)
  const { setAlert } = alertContext
  const { register, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  const {
    name,
    email,
    password
  } = user

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    if (name == '' || email == '' || password == '') {
      setAlert('Fill up all the fields', 'danger')
    } else {
      const formData = {
        name,
        email, 
        password
      }
      register(formData)
    }  
  }

  const c = '<Collab />'
  return (
    <div className='form-container'>
      <p><h2>Register for <span>{c}</span></h2></p>
      <form onSubmit={onSubmit}>
        <input type='text' name='name' value={name} placeholder='Name' onChange={onChange} /> <br/>
        <input type='email' name='email' value={email} placeholder='Email' onChange={onChange} /> <br/>
        <input type='password' name='password' value={password} placeholder='Password' onChange={onChange} /> <br/>
        <p><button> Register </button></p>
      </form>
    </div>
  )
}

export default Register
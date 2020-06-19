import React, { useState, useContext, useEffect } from 'react'
import Alerts from '../layout/Alerts'
import AlertContext from '../../context/alert/AlertContext'
import AuthContext from '../../context/auth/AuthContext'

const Login = (props) => {

  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)
  const { setAlert } = alertContext
  const { loginUser, isAuthenticated } = authContext

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
    if (email == '' || password == '') {
      setAlert('Enter all the credentials', 'danger')
    }
    const formData = {
      email,
      password
    }
    loginUser(formData)
  }
  const c = '<Collab />'
  return (
    <div className='form-container'>
      <p>
        <h1><span>{c}</span></h1>
        <h2>User Login</h2>
      </p>
      <form onSubmit={onSubmit}>
        <input type='email' name='email' value={email} placeholder='Email' onChange={onChange} /> <br/>
        <input type='password' name='password' value={password} placeholder='Password' onChange={onChange} /> <br/>
        <p><button> Login </button></p>
      </form>
    </div>
  )
}

export default Login
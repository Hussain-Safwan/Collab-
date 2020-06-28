import React, { useState, useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

const Register = () => {
  const authContext = useContext(AuthContext)
  const {
    register
  } = authContext

  const [User, setUser] = useState({
    email: '',
    password: '',
    name: ''
  })

  const onChange = e => {
    setUser({
      ...User,
      [e.target.name]: e.target.value
    })
  }

  const {
    email, password
  } = User

  const onSubmit = () => {
    console.log(User)
    register(User)
  }

  return (
    <div>
        <div id="register-modal" class="modal">
        <div class="modal-content">
          <h4>Register</h4>
          <p><input onChange={onChange} name='name' placeholder='Your name' /></p>
          <p><input onChange={onChange} name='email' placeholder='Email or Username' /></p>
          <p><input type='password' onChange={onChange} name='password' placeholder='Password' /></p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={onSubmit}>Sign up</a>
        </div>
      </div>
    </div>
  )
}

export default Register

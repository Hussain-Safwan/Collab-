import React, { useState, useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

const Login = () => {
  const authContext = useContext(AuthContext)
  const {
    user, 
    isAuth,
    login
  } = authContext

  const [User, setUser] = useState({
    email: '',
    password: ''
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
    login(User)
  }

  return (
    <div>
        <div id="login-modal" class="modal">
        <div class="modal-content">
          <h4>Login</h4>
          <p><input onChange={onChange} name='email' placeholder='Email or Username' /></p>
          <p><input type='password' onChange={onChange} name='password' placeholder='Password' /></p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={onSubmit}>Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default Login

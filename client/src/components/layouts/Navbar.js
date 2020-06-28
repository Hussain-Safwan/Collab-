import React, { useContext, useState } from 'react'
import AuthContext from '../../context/auth/AuthContext'

const Navbar = () => {

  const authContext = useContext(AuthContext)
  const { isAuth, getUser } = authContext 

  useState(() => {
    getUser()
  }, [])

  return (
    <nav>
    <div class="nav-wrapper green">
      <div className='container'>
      <a href="#login-modal" className='modal-trigger brand-logo'>NiggaByte</a>
      {
        !isAuth ? (<ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="#login-modal" className='modal-trigger'>Login</a></li>
        <li><a href="#register-modal" className='modal-trigger'>Register</a></li>
      </ul>) : (<ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href='#'>Sign out</a></li>
      </ul>)
      }
      </div>
    </div>
  </nav>
  )
}

export default Navbar

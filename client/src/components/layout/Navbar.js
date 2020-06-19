import React, { useContext } from 'react'
import propTypes from 'prop-types'
import {Link} from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'
export const Navbar = ({title, icon}) => {

  const authContext = useContext(AuthContext)
  const { isAuthenticated, logoutUser, user } = authContext
  console.log('[navbar]', user)

  const onLogout = e => {
    logoutUser()
  }

  const userLinks = (
    <div className='links'>
          <span> <i class="fa fa-user"></i>{ user && user.name }</span>
          <span onClick={onLogout}>Logout</span>
        </div>
  )

  const guestLinks = (
    <div className='links'>
          <Link className='link' to='/login'><span>Login</span></Link>
          <Link className='link' to='/register'><span>Register</span></Link>
        </div>
  )

  return (
    <div className='nav-wrapper'>
      <div className="navbar">
        <div>
          <h2>{title}</h2>
        </div>
        { isAuthenticated ? userLinks : guestLinks }
      </div>
    </div>
  )
}

Navbar.defaultProps = {
  title: '<Collab />',
  iocn: 'fa fa-id-card-alt'
}

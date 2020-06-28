import React, { useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'

const TopCard = () => {

  const authContext = useContext(AuthContext)
  const { user, isAuth } = authContext
  
  if (!isAuth) {
    return <p style={{textAlign: 'center', padding: '100px 0'}}><h5>Log in to continue..</h5></p>
  }

  return (
    <div className='top-card'> 
      <div className='image'>
        <img src={`https://robohash.org/${user._id}`} />
      </div>
      <div className='texts'>
        <div className='name'><h5>{ user.name }</h5></div>
        <div className='username'>{user.email}</div>
      </div>
    </div>
  )
}

export default TopCard

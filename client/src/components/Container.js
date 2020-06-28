import React, { useEffect } from 'react'

import TopCard from './layouts/TopCard'
import ChatArea from './layouts/ChatArea'

// Modals
import LoginModal from './modals/Login'
import RegModal from './modals/Register'
import EditModal from './modals/EditStreamModal'
import Lander from './pages/Lander'
import CreateModal from './modals/CreateStreamModal'

import AuthContext from '../context/auth/AuthContext'

const Container = () => {

  const authContext = React.useContext(AuthContext)

  useEffect(() => {
    authContext.getUser()
  }, [])

  return (
    <div className='container'>
            <LoginModal />
            <RegModal />
            <EditModal />
            <CreateModal />
            {
              !authContext.isAuth ? (
                <Lander />
              ) : (
                  <>
                  <TopCard />
                  <ChatArea />
                  </>
                )
            }
          </div>
  )
}

export default Container

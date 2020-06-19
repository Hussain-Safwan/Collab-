import React, { useContext, useEffect } from 'react'
import Contacts from '../contacts/Contacts'
import ContactForm from '../contacts/ContactFrom'
import ContactFilter from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/AuthContext'

export const Home = () => {
  const authContext = useContext(AuthContext)
  const {user} = authContext
  useEffect(() => {
    authContext.loadUser()
    console.log(user)
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <div>
        <ContactFilter />
        <ContactForm />
        <Contacts />
      </div>
    </div>
  )
}

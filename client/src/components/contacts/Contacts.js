import React, { useContext, useEffect } from 'react'
import contactContext from '../../context/contact/ContactContext'
import ContactItems from './ContactItems'

const Contacts = () => {

  const ContactContext = useContext(contactContext)
  const { contacts, filtered, getContacts } = ContactContext

  useEffect(() => {
    getContacts()
    
  }, [])

  return (
    <div className='all-contacts'>
      {
        filtered ? filtered.map( contact => (
          < ContactItems contact={contact} />
          )
        ) :
        contacts.map( contact => (
          < ContactItems contact={contact} />
          )
        )
      }
    </div>
  )
}

export default Contacts
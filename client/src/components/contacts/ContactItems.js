import React, {useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import ContactContext from '../../context/contact/ContactContext'

const ContactItems = ({ contact }) => {
  const contactContext = useContext(ContactContext)
  const { deleteContact, setCurrent, clearCurrent } = contactContext
  const history = useHistory()

  const {
    title,
    body,
    id
  } = contact
  const onDelete = () => {
    deleteContact(id)
    clearCurrent()
  }

  const onEdit = () => {
    setCurrent(contact)
  }

  const Navigate = () => {
    history.push('/codeview', {contact: contact})
  }

  return (
    
      <div className='each-contact' onClick={Navigate}>
        <div className='upper'>
          
        </div>
        <div className='title'>
          <h3> { title } </h3>
        </div>
        {/* <div className='last-row'>n
          <div></div>
          <div className='buttons'>
            <button className='edit' onClick={onEdit}>Edit</button>
            <button className='delete' onClick={onDelete}>Delete</button>
          </div>
        </div> */}
      </div>
  )
}

export default ContactItems

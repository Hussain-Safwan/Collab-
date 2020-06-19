import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactFrom = () => {

  const contactContext = useContext(ContactContext)
  const { addContact, clearCurrent, updateContact, current } = contactContext

  useEffect(() => {
    if (current != null) {
      setContact(current)
      setOpener(!opener)
    } else {
      setContact({
        title: '',
        body: ''
      })
    }
  }, [current, contactContext])

  const [contact, setContact] = useState({
    title: '',
    body: ''
  })

  const {
    title, body
  } = contact

  const [opener, setOpener] = useState({
    opener: false
  })

  const onChange = e => {
    setContact({
      ...contact, 
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = e => {
    e.preventDefault()
    if (current) {
      updateContact(contact)
    } else {
      addContact(contact)
    }
    clearAll()
  }

  const clearAll = () => {
    clearCurrent()
  }

  const toggleForm = () => {
    setOpener(!opener)
  }

  return (
    <div>
      <h3 onClick={toggleForm} className='add-btn'> <i class="fa fa-th-large"></i>  {current ? 'Edit Source' : 'Add Source'} </h3>
      {
        !opener ? 
        <form onSubmit={onSubmit}>
        <div className='input-wrapper'>
          <div className='spec-input'>
            <input
               placeholder='Title goes here'
               onChange={onChange}
               name='title'
               value={title}
            />
          </div>
          <div className='spec-input'>
            <textarea 
              placeholder='Code goes here' 
              onChange={onChange}
              name='body'
              value={body}
            />
          </div>
          <div className='button'>
              { current ? <button onClick={clearAll} className='cancel'>Cancel</button> : <div></div>}
              <button> {current ? 'Save Changes' : 'Save'} </button>
          </div>
        </div>
    </form> : <div></div>
      }
    </div>
  )
}

export default ContactFrom

import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/ContactContext'

const ContactFilter = () => {
  const contactContext = useContext(ContactContext)
  const { filtered, filterContacts, clearFilter } = contactContext

  const text = useRef('')

  useEffect(() => {
    if (filtered == null) {
      text.current.value = ''
    }
  })

  const onChange = e => {
    if (text.current.value != '') {
      filterContacts(e.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <div className='filter-form'>
      <form>
        <input ref={text} name='text' placeholder='Type to filter' onChange={onChange} />
      </form>
    </div>
  )
}

export default ContactFilter

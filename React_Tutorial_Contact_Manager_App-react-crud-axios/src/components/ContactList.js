import React from 'react'
import { Link } from 'react-router-dom'
import ContactCard from './ContactCard'
import { useSelector } from 'react-redux'

const ContactList = (props) => {
  console.log(props)
  const contact = useSelector((state) => state.contact.contacts)
  console.log('selector', contact)

  const deleteConactHandler = (id) => {
    props.getContactId(id)
  }

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    )
  })
  return (
    <div className='main'>
      <div className='ui celled list'>
        {props.contacts.length > 0 ? (
          renderContactList
        ) : (
          <p style={{ textAlign: 'center' }}>No Records Found!</p>
        )}
      </div>
    </div>
  )
}

export default ContactList

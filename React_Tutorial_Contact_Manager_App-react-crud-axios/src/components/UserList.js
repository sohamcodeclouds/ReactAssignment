import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from '@mui/material'
import Dashboard from '../pages/Dashboard'

const UserList = (props) => {
  const [filteredContact, setFilteredContact] = useState([])
  const contact = useSelector((state) => console.log(state, 'selector'))
  console.log('log', contact)

  useEffect(() => {
    const activeContacts = props.contacts.filter(
      (contact) => contact.isVerified === 'active'
    )
    console.log('activeContacts', activeContacts)
    setFilteredContact(activeContacts)
  }, [props.contacts])
  const deleteConactHandler = (id) => {
    props.getContactId(id)
  }
  const renderContactList = filteredContact.map((contact) => {
    return (
      <UserCard
        contact={contact}
        clickHander={deleteConactHandler}
        key={contact.id}
      />
    )
  })

  return (
    <>
      <Dashboard />
      <Container>
        <div className='main'>
          <h2>
            User List
            <Link to='/vendordashboard/add'>
              <button className='ui button blue right'>Add Contact</button>
            </Link>
          </h2>
          <div className='ui celled list'>
            {filteredContact.length > 0 ? (
              renderContactList
            ) : (
              <p style={{ textAlign: 'center', color: 'red' }}>
                No Active Records Found!
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default UserList

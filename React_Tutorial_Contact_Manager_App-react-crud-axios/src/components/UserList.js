import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '@mui/material'
import Dashboard from '../pages/Dashboard'

const UserList = (props) => {
  const [verified, setVerified] = useState('')
  const [contactDetails, setContactDetails] = useState()
  console.log('log state', props)
  const { userDetails } = props

  useEffect(() => {
    console.log('user details', userDetails)
    if (userDetails) {
      setVerified(userDetails?.isVerified)
      setContactDetails(userDetails)
      console.log('user details verified?', verified)
    }
  }, [userDetails, verified])
  const deleteConactHandler = (id) => {
    props.getContactId(id)
  }
  const renderContactList = (
    <UserCard contact={contactDetails} clickHander={deleteConactHandler} />
  )

  return (
    <>
      <Dashboard />
      <Container>
        <div className='main'>
          <h2>User Details</h2>
          <div className='ui celled list'>
            {verified === 'active' ? (
              renderContactList
            ) : (
              <p style={{ textAlign: 'center', color: 'red' }}>
                You can not edit/update your profile. Verification pending!
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}

export default UserList

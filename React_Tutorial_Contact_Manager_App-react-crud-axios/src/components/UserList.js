import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Container } from '@mui/material'
import Dashboard from '../pages/Dashboard'
import api from '../api/contacts'

const UserList = (props) => {
  const [verified, setVerified] = useState('')
  const [contactDetails, setContactDetails] = useState()
  console.log('log state', props)
  const { userDetails } = props
  const [userId, setUserId] = useState(userDetails.id)

  useEffect(() => {
    console.log('user details', userDetails)
    const getContactDetails = async () => {
      const resp = await api.get(`/contacts/${userId}`)
      const data = resp.data
      console.log('resp', data)

      return data
    }
    if (userDetails) {
      setUserId(userDetails.id)
      console.log('userid', userId)
      const result = getContactDetails()
      if (result) {
        console.log('user details result', result)
        setContactDetails(result)
        const data = result.then((item) => {
          setVerified(item.isVerified)
        })
        console.log('user details verified?', verified)
      }
    }
  }, [userDetails, verified, userDetails.id, userId])
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

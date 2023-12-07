import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Container } from '@mui/material'
import Dashboard from '../pages/Dashboard'
import api from '../api/contacts'

const UserList = (props) => {
  const [verified, setVerified] = useState('')
  const [contactDetails, setContactDetails] = useState()
  const [name, setName] = useState()

  const { state } = useLocation()
  const { data } = state || {}
  const param = useParams()
  console.log('log state', data, param)

  const [userId, setUserId] = useState(param.vid)

  useEffect(() => {
    const getContactDetails = async () => {
      const resp = await api.get(`/contacts/${userId}`)
      const data = resp.data
      console.log('resp', data)

      return data
    }

    console.log('userid', userId)
    const result = getContactDetails()
    if (result) {
      setUserId(param.vid)
      console.log('user details result', result)
      setContactDetails(result)
      const data = result.then((item) => {
        setVerified(item.isVerified)
        setName(item.name)
      })
      console.log('user details verified?', verified, name)
    }
  }, [verified, userId, param.vid, name])
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

import { Container } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EditContact = (props) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  console.log(state, 'edit')

  const { id, isVerified } = state.contact

  const [name, setName] = useState(state.contact.name)
  const [email, setEmail] = useState(state.contact.email)
  const [password, setPassword] = useState(state.contact.password)
  const [description, setDescription] = useState(state.contact.description)
  const [roleValue, setRolevalue] = useState(state.contact.roleValue)

  const handleUpdate = (e) => {
    e.preventDefault()
    if (name === '' || email === '') {
      alert('All the fields are mandatory!')
      return
    }

    props.updateContactHandler({
      id,
      name,
      email,
      roleValue,
      description,
      isVerified,
      password,
    })
    setPassword(password)
    setName('')
    setEmail('')
    navigate('/vendordashboard')
  }
  const handleChange = (e) => {
    console.log('log', e)
    setRolevalue(e.target.value)
    console.log('selected', roleValue)
  }

  return (
    <Container>
      <div className='ui main'>
        <h2>Edit Contact</h2>
        <form className='ui form' onSubmit={handleUpdate}>
          <div className='field'>
            <label>Name</label>
            <input
              type='text'
              name='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='field'>
            <label>Email</label>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='field'>
            <label>Description</label>
            <textarea
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='field'>
            <label>Role</label>
            <select value={roleValue} onChange={handleChange}>
              {props.roles.map((role) => (
                <option value={role.name} key={role.id} selected={roleValue}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <button className='ui button blue'>Update</button>
        </form>
      </div>
    </Container>
  )
}

export default EditContact

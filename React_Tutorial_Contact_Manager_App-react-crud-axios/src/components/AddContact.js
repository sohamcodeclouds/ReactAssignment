import { Container } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddContact = (props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [roleValue, setRolevalue] = useState('Project Manager')
  const navigate = useNavigate()

  const handleAdd = (e) => {
    e.preventDefault()
    console.log('add', email, name, description)
    if (name === '' || email === '') {
      alert('ALl the fields are mandatory!')
      return
    }
    props.addContactHandler({ name, email, roleValue, description })
    setName('')
    setEmail('')
    setDescription('')
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
        <h2>Add Contact</h2>
        <form className='ui form' onSubmit={handleAdd}>
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
            <select defaultValue={roleValue} onChange={handleChange}>
              {props.roles.map((role) => (
                <option value={role.name} key={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <button className='ui button blue'>Add</button>
        </form>
      </div>
    </Container>
  )
}

export default AddContact

import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import user from '../images/user.jpg'
import { useDispatch } from 'react-redux'
import { updateContact } from '../feature'

const ContactDetail = (props) => {
  console.log('contact details', props)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { state } = useLocation()

  const { id, name, email, roleValue, description, password } = state.contact
  const [isVerified, setIsVerified] = useState(state.contact.isVerified)
  console.log('isVerified', state, props)

  const handleValueChange = (e) => {
    console.log(e.target.value)
    setIsVerified(e.target.value.toString())
  }

  const handleClick = async () => {
    console.log('clicked', isVerified)
    props.changeStatus({
      id,
      name,
      email,
      password,
      roleValue,
      description,
      isVerified,
    })

    navigate('/admindashboard')
    const updateStatusObj = { ...state.contact, isVerified }

    console.log('new contact', updateStatusObj)
    dispatch(updateContact(updateStatusObj))
  }
  return (
    <div className='main'>
      <div className='ui card centered'>
        <div className='image'>
          <img src={user} alt='user' />
        </div>
        <div className='content'>
          <div className='header' style={{ fontStyle: 'italic' }}>
            {name}
          </div>
          <div className='description'>{email}</div>
          <div className='header'>{roleValue}</div>
        </div>
        <span>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='active'
                checked={isVerified === 'active'}
                onChange={handleValueChange}
              />
              Active
            </label>
          </div>
          <div className='radio'>
            <label>
              <input
                type='radio'
                value='deactive'
                checked={isVerified === 'deactive'}
                onChange={handleValueChange}
              />
              Deactive
            </label>
          </div>
        </span>
        <button onClick={handleClick}>Save</button>
      </div>
      <div className='center-div'>
        <Link to='/admindashboard'>
          <button className='ui button blue center'>
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ContactDetail

import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

const UserCard = (props) => {
  console.log('user card edit', props)
  const { name, email, roleValue, description, isVerified } = props.contact
  console.log(isVerified, typeof isVerified)

  return (
    <div className='item'>
      <img className='ui avatar image' src={user} alt='user' />
      <div className='content'>
        <div className='header'>{name}</div>
        <div>{email}</div>
        <div>{roleValue}</div>
      </div>
      <span
        style={{
          backgroundColor: '#f8ff00',
          marginLeft: '50px',
          textAlign: 'center',
          textTransform: 'capitalize',
        }}
      >
        {description}
      </span>

      <Link to='/edit' state={{ contact: props.contact }}>
        <i
          className='edit alternate outline icon'
          style={{ color: 'blue', marginTop: '7px' }}
        ></i>
      </Link>
    </div>
  )
}

export default UserCard

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import user from '../images/user.png'

const UserCard = (props) => {
  // console.log('user card edit', props)
  // const { name, email, roleValue, description, isVerified } = props.contact
  // console.log(isVerified, typeof isVerified)
  const [id, setId] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [roleValue, setRolevalue] = useState()
  const [description, setDescription] = useState()
  const [isVerified, setIsVerified] = useState()

  useEffect(() => {
    console.log('user card edit data', props.contact)
    const data = props.contact.then((item) => {
      console.log(item)
      setId(item.id)
      setName(item.name)
      setEmail(item.email)
      setPassword(item.password)
      setDescription(item.description)
      setRolevalue(item.roleValue)
      setIsVerified(item.isVerified)
    })
  }, [])
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

      <Link
        to='/edit'
        state={{
          contact: {
            id: id,
            name: name,
            email: email,
            description: description,
            password: password,
            roleValue: roleValue,
            isVerified: isVerified,
          },
        }}
      >
        <i
          className='edit alternate outline icon'
          style={{ color: 'blue', marginTop: '7px' }}
        ></i>
      </Link>
    </div>
  )
}

export default UserCard

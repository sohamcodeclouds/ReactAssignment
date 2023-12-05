import React from 'react'
import { Link } from 'react-router-dom'

const ContactCard = (props) => {
  const { id, name, email, roleValue, description, isVerified } = props.contact

  return (
    <div className='item'>
      <div>
        <table border='1px solid' width='100%'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id.slice(0, 8) + (id.length > 8 ? '...' : '')}</td>
              <Link
                to={{
                  pathname: `/contact/${id}`,
                  state: { contact: props.contact },
                }}
              >
                <td>{name}</td>
              </Link>

              <td>{email}</td>
              <td>
                {description
                  ? description.slice(0, 8) +
                    (description.length > 8 ? '...' : '')
                  : 'N/A'}
              </td>
              <td>{roleValue}</td>
              <td>{isVerified ? isVerified : 'Cool'}</td>

              <td>
                {' '}
                <i
                  className='trash alternate outline icon'
                  style={{
                    color: 'red',
                    marginTop: '7px',
                  }}
                  onClick={() => {
                    const confirmBox = window.confirm(
                      'Do you really want to delete?'
                    )
                    if (confirmBox === true) {
                      props.clickHander(id)
                    }
                  }}
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ContactCard

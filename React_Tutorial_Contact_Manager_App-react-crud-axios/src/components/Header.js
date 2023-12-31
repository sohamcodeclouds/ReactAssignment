import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='ui fixed menu'>
      <div className='ui container center'>
        <Link to='/'>
          <h2>Contact Manager</h2>
        </Link>
      </div>
      <div
        className='content'
        style={{ marginRight: '15%', paddingTop: '15px' }}
      >
        <Link to='/user'>
          <h4>Active User List</h4>
        </Link>
      </div>
    </div>
  )
}

export default Header

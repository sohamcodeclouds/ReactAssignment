import React from 'react'
import Dashboard from './Dashboard'
import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const LoginBoard = () => {
  function handleAdminLogin() {
    console.log('admin login')
  }
  function handleVendorLogin() {
    console.log('vendor login')
  }
  return (
    <>
      <Dashboard />
      <div className='bttn-parent'>
        <Link to='/adminlogin'>
          <Button color='inherit' onClick={handleAdminLogin} className='bttn'>
            Admin
          </Button>
        </Link>
        <Link to='/vendorlogin'>
          <Button color='inherit' onClick={handleVendorLogin} className='bttn'>
            Vendor
          </Button>
        </Link>
      </div>
    </>
  )
}

export default LoginBoard

import React from 'react'
import Dashboard from './Dashboard'
import Button from '@mui/material/Button'
// import IconButton from '@mui/material/IconButton'
// import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const LoginBoard = () => {
  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    height: '60vh',
    alignItems: 'center',
  }

  const buttonStyle = {
    padding: '10px 20px',
    margin: '30px 5px 0px 0px',
    border: '2px solid',
  }
  function handleAdminLogin() {
    console.log('admin login')
  }
  function handleVendorLogin() {
    console.log('vendor login')
  }
  return (
    <>
      <Dashboard />
      <div style={buttonContainerStyle}>
        <Link to='/adminlogin'>
          <Button
            color='inherit'
            onClick={handleAdminLogin}
            style={buttonStyle}
          >
            Admin
          </Button>
        </Link>
        <Link to='/vendorlogin'>
          <Button
            color='inherit'
            onClick={handleVendorLogin}
            style={buttonStyle}
          >
            Vendor
          </Button>
        </Link>
      </div>
    </>
  )
}

export default LoginBoard

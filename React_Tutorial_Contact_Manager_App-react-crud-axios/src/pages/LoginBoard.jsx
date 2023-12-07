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
    height: '30vh',
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
      <div
        style={{
          border: '1px solid black',
          margin: '50px',
          borderRadius: '15px',
        }}
      >
        <div style={{ margin: '20px', textAlign: 'center' }}>
          <h3>Welcome to our product</h3>
        </div>
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
        <p style={{ marginLeft: '10px' }}>
          Please choose any user for further communication
        </p>
      </div>
    </>
  )
}

export default LoginBoard

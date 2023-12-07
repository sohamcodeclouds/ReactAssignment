// import React from 'react'

// const VendorLogin = () => {
//   return (
//     <div>VendorLogin</div>
//   )
// }

// export default VendorLogin

import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
// import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function VendorLogin({ onLogin }) {
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    e.preventDefault()
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  console.log(formData)

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3006/contacts')
      if (response.ok) {
        const vendorData = await response.json()
        // console.log(vendorData);
        // if(vendorData.email === formData.email &&
        //     vendorData.password === formData.password){
        //         var foundUser=true;
        //     }
        const foundUser = vendorData.find(
          (vendor) =>
            vendor.email === formData.email &&
            vendor.password === formData.password
        )
        // console.log(foundUser);

        if (foundUser) {
          // Login successful
          onLogin(foundUser)
          navigate(`/vendordashboard/${foundUser.id}`, {
            state: { data: foundUser.id },
          })
          alert(`Login successful`)
          console.log(foundUser)
          // Clear form fields after successful login
          setFormData({
            email: '',
            password: '',
          })
        } else {
          // Show an error message or pop-up for invalid credentials
          alert('Invalid username or password. Please try again.')
        }
      } else {
        // Handle server error
        console.error('Server error')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Vendor Login
          </Typography>
          <Box
            component='form'
            // onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              onClick={handleLogin}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/signup'>{"Don't have an account? Sign Up"}</Link>
                {/* <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../api/contacts'

export default function Dashboard(props) {
  console.log('dash props', props)
  const param = useParams()
  const { vid } = param
  const [name, setName] = useState()
  const navigate = useNavigate()

  const goToDashBoard = () => {
    navigate('/')
  }
  useEffect(() => {
    if (vid) {
      const resp = api
        .get(`/contacts/${vid}`)
        .then((item) => {
          setName(item.data.name)
        })
        .catch((err) => console.log(err))
    } else if (props.clickHandler) {
      setName('Admin')
    }

    console.log('dash name', name)
  }, [name, param, props.clickHandler, vid])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {name ? `Welcome ${name}` : ''}
          </Typography>
          {name ? <button onClick={goToDashBoard}>Logout</button> : null}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

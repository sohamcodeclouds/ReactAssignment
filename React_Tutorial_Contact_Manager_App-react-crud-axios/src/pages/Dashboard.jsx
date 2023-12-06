import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import { Link } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate()
  const goToDashBoard = () => {
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            onClick={goToDashBoard}
          >
            Login Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

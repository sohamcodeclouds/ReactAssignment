import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Popover from '@mui/material/Popover'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Label from '../../../components/label'
import Iconify from '../../../components/iconify/iconify'
import { useNavigate } from 'react-router-dom'

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  name,
  avatarUrl,
  role,
  isVerified,
  handleClick,
  clickHandler,
  contact,
}) {
  const [open, setOpen] = useState(null)
  const navigate = useNavigate()

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setOpen(null)
  }

  useEffect(() => {
    console.log('reload table', isVerified)
  }, [contact, isVerified])

  return (
    <>
      <TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
        <TableCell padding='checkbox'>
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell title={id}>
          {id.slice(0, 8) + (id.length > 8 ? '...' : '')}
        </TableCell>
        <TableCell component='th' scope='row' padding='none'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography variant='subtitle2' noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell></TableCell>

        <TableCell align='center'>
          {isVerified === 'active' ? 'Yes' : 'No'}
        </TableCell>

        <TableCell>
          <Label
            // eslint-disable-next-line no-nested-ternary
            color={isVerified === 'active' ? 'success' : 'error'}
          >
            {isVerified}
          </Label>
        </TableCell>

        <TableCell align='right'>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() =>
            navigate(`/contact/${id}`, {
              state: {
                contact,
              },
            })
          }
        >
          <Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            const confirmBox = window.confirm('Do you really want to delete?')
            if (confirmBox === true) {
              console.log('delete id', id)
              clickHandler(id)
            }
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon='eva:trash-2-outline' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  )
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  clickHander: PropTypes.func,
}

import { useState } from 'react'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// import { users } from 'src/_mock/user'

import TableNoData from '../table-no-data'
import UserTableRow from '../user-table-row'
import UserTableHead from '../user-table-head'
import TableEmptyRows from '../table-empty-rows'
import UserTableToolbar from '../user-table-toolbar'
import { emptyRows, applyFilter, getComparator } from '../utils'
import Iconify from '../../../../components/iconify/iconify'
import Scrollbar from '../../../../components/scrollbar/scrollbar'
import Dashboard from '../../../Dashboard'

// ----------------------------------------------------------------------

export default function UserPage(props) {
  console.log('log props', props)
  const [page, setPage] = useState(0)

  const [order, setOrder] = useState('asc')

  const [selected, setSelected] = useState([])

  const [orderBy, setOrderBy] = useState('name')

  const [filterName, setFilterName] = useState('')

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const deleteConactHandler = (id) => {
    props.getContactId(id)
  }

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc'
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    }
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.contacts.map((n) => n.name)
      console.log('new selected ', newSelecteds)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
      console.log('log new selected -1', newSelected)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
      console.log('log new selected 0', newSelected)
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
      console.log('log new selected === 0', newSelected)
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
      console.log('log new selected > 0', newSelected)
    }
    console.log('log new selected other', newSelected)

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPage(0)
    console.log('rows per page', event.target.value)
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  const handleFilterByName = (event) => {
    setPage(0)
    console.log('filter name', event.target.value)
    setFilterName(event.target.value)
  }

  const dataFiltered = applyFilter({
    inputData: props.contacts,
    comparator: getComparator(order, orderBy),
    filterName,
  })

  const notFound = !dataFiltered.length && !!filterName
  console.log('not found', notFound)

  return (
    <>
      <Dashboard clickHandler={deleteConactHandler} />
      <Container>
        {props.contacts.length > 0 ? (
          <Card sx={{ marginTop: '75px' }}>
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ overflow: 'unset' }}>
                <Table sx={{ minWidth: 800 }}>
                  <UserTableHead
                    order={order}
                    orderBy={orderBy}
                    rowCount={props.contacts.length}
                    numSelected={selected.length}
                    onRequestSort={handleSort}
                    onSelectAllClick={handleSelectAllClick}
                    headLabel={[
                      { id: 'id', label: 'ID' },
                      { id: 'name', label: 'Name' },
                      { id: '' },
                      { id: 'isVerified', label: 'Verified', align: 'center' },
                      { id: 'status', label: 'Status' },
                      { id: '' },
                    ]}
                  />
                  <TableBody>
                    {dataFiltered
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <UserTableRow
                          key={row.id}
                          id={row.id}
                          name={row.name}
                          role={row.roleValue}
                          status={row.status}
                          avatarUrl={row.avatarUrl}
                          isVerified={row.isVerified}
                          contact={row}
                          clickHandler={deleteConactHandler}
                          selected={selected.indexOf(row.name) !== -1}
                          handleClick={(event) => handleClick(event, row.name)}
                        />
                      ))}

                    <TableEmptyRows
                      height={77}
                      emptyRows={emptyRows(
                        page,
                        rowsPerPage,
                        props.contacts.length
                      )}
                    />

                    {notFound && <TableNoData query={filterName} />}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              page={page}
              component='div'
              count={props.contacts.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        ) : (
          <p style={{ textAlign: 'center', color: 'red', marginTop: '75px' }}>
            No Records Found!
          </p>
        )}
      </Container>
    </>
  )
}

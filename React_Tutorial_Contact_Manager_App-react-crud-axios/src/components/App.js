import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Navigate,
  Routes,
} from 'react-router-dom'
import { v4 } from 'uuid'
import api from '../api/contacts'
import './App.css'
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetail from './ContactDetail'
import EditContact from './EditContact'
import UserList from './UserList'
import { useDispatch } from 'react-redux'
import { addContact, updateContact } from '../feature'
import UserPage from '../pages/user/users/view/user-view'
import LoginBoard from '../pages/LoginBoard'
import VendorLogin from '../pages/VendorLogin'
import SignUp from '../pages/Signup'
import AdminDashboard from '../pages/AdminDashboard'
import VendorDashboard from '../pages/VendorDashboard'
import AdminLogin from '../pages/AdminLogin'

function App() {
  const LOCAL_STORAGE_KEY = 'contacts'
  const [contacts, setContacts] = useState([])
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false)
  const [isVendorLoggedIn, setIsVendorLoggedIn] = useState(false)

  const handleAdminLogin = (loggedIn) => {
    setAdminLoggedIn(loggedIn)
  }

  const handleVendorLogin = (loggedIn) => {
    setIsVendorLoggedIn(loggedIn)
  }
  const [role, setRole] = useState([])
  const dispatch = useDispatch()

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get('/contacts')
    return response.data
  }
  //Retrive Role
  const retrieveRoles = async () => {
    const response = await api.get('/roles')
    return response.data
  }

  // const addContactHandler = async (contact) => {
  //   console.log('log contact', contact)
  //   const request = {
  //     id: v4(),
  //     isVerified: 'deactive',
  //     ...contact,
  //   }

  //   dispatch(addContact(request))

  //   const response = await api.post('/contacts', request)
  //   console.log(response)
  //   setContacts([...contacts, response.data])
  // }

  const updateContactHandler = async (contact) => {
    console.log('update', contact)
    const response = await api.put(`/contacts/${contact.id}`, contact)
    console.log(response, 'edit')
    const { id } = response.data
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact
      })
    )
    console.log('updated contact list', response.data)
    dispatch(updateContact(contact))
  }

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id
    })

    setContacts(newContactList)
  }

  const changeStatus = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact)
    console.log(response, 'edit')
    const { id } = response.data
    setContacts(
      contacts.map((contact) => {
        return contact.id === id
          ? { ...response.data, isVerified: 'active' }
          : contact
      })
    )
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    const getAllCOntacts = async () => {
      const allContacts = await retrieveContacts()
      if (allContacts) {
        console.log('all contacts', contacts)
        setContacts(allContacts)
        const filteredContacts = contacts.filter(
          (contact) => contact.isVerified === 'active'
        )
        console.log('log filtered contacts', filteredContacts)
      }
    }

    const getAllRoles = async () => {
      const allRoles = await retrieveRoles()
      if (allRoles) setRole(allRoles)
    }

    getAllCOntacts()
    getAllRoles()
  }, [])

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts, role])

  return (
    <Router>
      {/*New Route */}

      <Routes>
        <Route path='/' element={<LoginBoard />} />
        <Route
          path='/adminlogin'
          element={
            isAdminLoggedIn ? (
              <Navigate to='/admindashboard' />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />
        <Route
          path='/vendorlogin'
          element={
            isVendorLoggedIn ? (
              <Navigate to='/vendordashboard' />
            ) : (
              <VendorLogin onLogin={handleVendorLogin} />
            )
          }
        />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path='/admindashboard'
          element={
            <UserPage contacts={contacts} getContactId={removeContactHandler} />
          }
        />
        <Route
          path='/vendordashboard'
          element={<UserList userDetails={isVendorLoggedIn} />}
        />

        <Route
          path='/contact/:id'
          element={<ContactDetail changeStatus={changeStatus} />}
        />
        {/* <Route
          path='/vendordashboard/add'
          element={
            <AddContact addContactHandler={addContactHandler} roles={role} />
          }
        /> */}
        <Route
          path='/edit'
          element={
            <EditContact
              updateContactHandler={updateContactHandler}
              roles={role}
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default App

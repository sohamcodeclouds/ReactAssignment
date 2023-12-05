import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contacts: [],
}

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts = [...state.contacts, action.payload]
    },
    updateContact: (state, action) => {
      const modifiedEmployees = state.contacts.map((contact) => {
        if (contact.id === action.payload.id) {
          return { ...contact, ...action.payload }
        }
        return contact
      })
      console.log('updated contact', modifiedEmployees)
      return { contacts: modifiedEmployees }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addContact, updateContact } = contactSlice.actions

export default contactSlice.reducer

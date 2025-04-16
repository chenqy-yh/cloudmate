import { createSlice } from "@reduxjs/toolkit";

const initialState: ContactsState = {
  contacts: []
}

export const contacts_slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    }
  },
})

export const { setContacts } = contacts_slice.actions;

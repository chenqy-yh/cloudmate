import { createSlice } from "@reduxjs/toolkit";

type ContactsState = {
  contacts: UserInfo[];
  contact_history: Record<string, PrivateMessageItem[]>
  current_contact?: UserInfo
  contact_history_loaded_record: Record<string, boolean>
  unread_count: Record<string, number>;
}


const initialState: ContactsState = {
  contacts: [],
  contact_history: {},
  contact_history_loaded_record: {},
  unread_count: {}
}

export const contacts_slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    loadContactHistory: (state, aciton) => {
      const { contact_uuid, messages } = aciton.payload;
      if (state.contact_history_loaded_record[contact_uuid]) return;
      if (!state.contact_history[contact_uuid]) {
        state.contact_history[contact_uuid] = [];
        state.contact_history_loaded_record[contact_uuid] = true;
      }
      state.contact_history[contact_uuid].unshift(...messages);
    },
    addMessageToContactHistory: (state, action) => {
      console.log('addMessageToContactHistory')
      const { contact_uuid, message } = action.payload;
      if (state.contact_history_loaded_record[contact_uuid] === undefined) return // 没有加载过历史消息
      if (!state.contact_history[contact_uuid]) {
        state.contact_history[contact_uuid] = [];
      }
      state.contact_history[contact_uuid].push(message);
    },
    addUnreadCount: (state, action) => {
      const { contact_id } = action.payload;
      if (state.unread_count[contact_id] === undefined) {
        state.unread_count[contact_id] = 0;
      }
      state.unread_count[contact_id] += 1
    },
    setCurrentContact: (state, action) => {
      state.current_contact = action.payload;
    },
    setUnreadCount: (state, action) => {
      const { unread_count } = action.payload;
      state.unread_count = Object.keys(unread_count).reduce((acc, key) => {
        acc[key] = typeof unread_count[key] === 'string' ? parseInt(unread_count[key]) : unread_count[key]
        return acc
      }, {})
    },
    clearUnreadCount: (state, action) => {
      const { contact_id } = action.payload;
      if (state.unread_count[contact_id] === undefined) return;
      state.unread_count[contact_id] = 0;
    }
  },
})

export const {
  loadContactHistory,
  setContacts,
  setCurrentContact,
  addMessageToContactHistory,
  addUnreadCount,
  setUnreadCount,
  clearUnreadCount,
} = contacts_slice.actions;

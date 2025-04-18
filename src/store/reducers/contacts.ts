import { createSlice } from "@reduxjs/toolkit";

type ContactsState = {
  contacts: UserInfo[];
  contact_history: Record<string, PrivateMessageItem[]>
  current_contact?: UserInfo
  contact_history_loaded_record: Record<string, boolean>
}


const initialState: ContactsState = {
  contacts: [],
  contact_history: {},
  contact_history_loaded_record: {},
}

const uniqueMessages = (messages: PrivateMessageItem[]) => {
  const uniqueMap = new Map<string, PrivateMessageItem>();
  messages.forEach((msg) => {
    if (!uniqueMap.has(msg._id)) {
      uniqueMap.set(msg._id, msg);
    }
  });
  return Array.from(uniqueMap.values());
}

const sortMessages = (messages: PrivateMessageItem[]) => {
  return messages.sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    return dateB.getTime() - dateA.getTime();
  });
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
      const { contact_uuid, message } = action.payload;
      if (state.contact_history_loaded_record[contact_uuid] === undefined) return // 没有加载过历史消息
      if (!state.contact_history[contact_uuid]) {
        state.contact_history[contact_uuid] = [];
      }
      state.contact_history[contact_uuid].push(message);
    },
    setCurrentContact: (state, action) => {
      state.current_contact = action.payload;
    },
  },
})

export const {
  loadContactHistory,
  setContacts,
  setCurrentContact,
  addMessageToContactHistory,
} = contacts_slice.actions;

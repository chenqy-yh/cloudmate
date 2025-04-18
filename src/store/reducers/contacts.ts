import { createSlice } from "@reduxjs/toolkit";

type ContactsState = {
  contacts: UserInfo[];
  contact_history: Record<string, PrivateMessageItem[]>
  current_contact?: UserInfo
}


const initialState: ContactsState = {
  contacts: [],
  contact_history: {},
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
    pushContactHistory: (state, action) => {
      const { contact_uuid, messages } = action.payload;
      if (!state.contact_history[contact_uuid]) {
        state.contact_history[contact_uuid] = [];
      }
      // const new_messages = [...state.contact_history[contact_uuid], ...messages];
      // 按照msg._id去除
      // const unique_messages = uniqueMessages(new_messages);
      // 按照时间戳排序
      // const sorted_messages = sortMessages(unique_messages);
      // state.contact_history[contact_uuid] = sorted_messages;
      state.contact_history[contact_uuid].push(...messages);
    },
    addMessageToContactHistory: (state, action) => {
      const { contact_uuid, message } = action.payload;
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
  setContacts,
  setCurrentContact,
  pushContactHistory,
  addMessageToContactHistory,
} = contacts_slice.actions;

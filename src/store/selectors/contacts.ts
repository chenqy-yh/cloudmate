import { RootState } from '..'

export const contacts_selector = (state: RootState) => state.contacts.contacts

export const selectContactHistory = (contactId: string) => {
  return (state: RootState) => {
    return state.contacts.contact_history[contactId]
  }
}

export const selectCurrentContact = (state: RootState) => state.contacts.current_contact

export const selectHasLoadContactHistory = (contactId: string) => {
  return (state: RootState) => {
    return state.contacts.contact_history_loaded_record[contactId]
  }
}

export const  selectUnreadCount = (state: RootState) => state.contacts.unread_count

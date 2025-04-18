import { RootState } from '..'

export const contacts_selector = (state: RootState) => state.contacts.contacts

export const selectContactHistory = (state: RootState, contactId: string) => {
  return state.contacts.contact_history[contactId]
}

export const selectCurrentContact = (state: RootState) => state.contacts.current_contact

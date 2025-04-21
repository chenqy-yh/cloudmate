import { getUnreadCount } from "@/apis/chat"
import { clearUnreadCount as remoteClearUnreadCount } from "@/apis/contacts"
import Avatar from "@/components/avatar"
import { clearUnreadCount, setCurrentContact, setUnreadCount } from "@/store/reducers/contacts"
import { contacts_selector, selectUnreadCount } from "@/store/selectors/contacts"
import React, { useContext, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GroupContext from "../../context"
import styles from "./index.module.scss"

type ContactItemProps = {
  contact: UserInfo
  unread: number
}

type UnreadTagProps = {
  unread: number
}

const UnreadTag: React.FC<UnreadTagProps> = (props) => {
  const { unread } = props

  return <div className={styles.unread}>{unread > 99 ? "99+" : unread}</div>
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, unread }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const navigateToChat = () => {
    dispatch(setCurrentContact(contact))
    dispatch(clearUnreadCount({ contact_id: contact.uuid }))
    navigate(`/chat`)
    remoteClearUnreadCount(contact.uuid)
  }

  return (
    <div className={styles.contact_item} onClick={navigateToChat}>
      <Avatar username={contact.name} src={contact.avatar} size={50} topRightTag={unread ? <UnreadTag unread={unread} /> : undefined} />
      <div className={styles.user_detail}>
        <div className={styles.user_name}>{contact.name}</div>
        <div className={styles.job}>四级销售主管 | 邀请码:484848</div>
      </div>
      <div className={styles.contact_item_detail}>
        <div className={styles.user_phone}>{"手机号码: " + contact.phone}</div>
        <div className={styles.direct_supervisor}>{"直属上级: " + "wang feng"}</div>
      </div>
    </div>
  )
}

const Contacts = () => {
  const { searchKey } = useContext(GroupContext)

  const dispatch = useDispatch()

  const contacts = useSelector(contacts_selector) || []
  const unread_count = useSelector(selectUnreadCount) || {}

  const filter_contacts = contacts.filter((contact) => contact.name.includes(searchKey))

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const fetch_unread_count = await getUnreadCount()
      dispatch(setUnreadCount({ unread_count: fetch_unread_count }))
    }
    fetchUnreadCount()
  }, [dispatch])

  return (
    <div className={styles.contacts}>
      {filter_contacts.map((contact) => (
        <ContactItem key={contact.uuid} contact={contact} unread={unread_count[contact.uuid] ?? 0} />
      ))}
    </div>
  )
}

export default Contacts

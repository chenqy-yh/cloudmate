import Avatar from "@/components/avatar";
import { user_uuid_selector } from "@/store/selectors/auth";
import { contacts_selector } from "@/store/selectors/contacts";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import GroupContext from "../../context";

type ContactItemProps = {
  contact: UserInfo;
};

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const navigate = useNavigate();
  const user_uuid = useSelector(user_uuid_selector);

  const navigateToChat = () => {
    navigate(
      `/chat?sender_uuid=${user_uuid}&receiver_uuid=${contact.uuid}&contact_name=${contact.name}`
    );
  };

  return (
    <div className={styles.contact_item} onClick={navigateToChat}>
      <Avatar username={contact.name} src={contact.avatar} size={50} />
    <div className={styles.user_detail}>
        <div className={styles.user_name}>{contact.name}</div>
        <div className={styles.job}>四级销售主管 | 邀请码:484848</div>
      </div>
      <div className={styles.contact_item_detail}>
        <div className={styles.user_phone}>{"手机号码: " + contact.phone}</div>
        <div className={styles.direct_supervisor}>
          {"直属上级: " + "wang feng"}
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  const { searchKey } = useContext(GroupContext);

  const contacts = useSelector(contacts_selector) || [];

  const filter_contacts = contacts.filter((contact) =>
    contact.name.includes(searchKey)
  );

  return (
    <div className={styles.contacts}>
      {filter_contacts.map((contact) => (
        <ContactItem key={contact.uuid} contact={contact} />
      ))}
    </div>
  );
};

export default Contacts;

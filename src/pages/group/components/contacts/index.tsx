import { Image } from "@tarojs/components";
import styles from "./index.module.scss";

const ContactItem = () => {
  return (
    <div className={styles.contact_item}>
      <Image
        className={styles.user_avatar}
        src="../../../../../assets/icon/user-1.png"
      />
      <div className={styles.user_detail}>
        <div className={styles.user_name}>张三</div>
        <div className={styles.job}>四级销售主管 | 邀请码:484848</div>
      </div>
      <div className={styles.contact_item_detail}>
        <div className={styles.user_phone}>{"手机号码: " + "13344445555"}</div>
        <div className={styles.direct_supervisor}>
          {"直属上级: " + "wang feng"}
        </div>
      </div>
    </div>
  );
};

const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <ContactItem />
      <ContactItem />
    </div>
  );
};

export default Contacts;

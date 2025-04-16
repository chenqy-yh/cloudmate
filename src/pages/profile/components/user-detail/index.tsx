import Avatar from "@/components/avatar"
import Icon from "@/components/icon/common"
import { userInfoSelector } from "@/store/selectors/user"
import { useSelector } from "react-redux"
import styles from "./index.module.scss"
import Loader from "@/components/loading/icon"

const UserDetail = () => {
  const user_info = useSelector(userInfoSelector)

  if (!user_info)
    return (
      <div style={{ height: 60, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader version={2} />
      </div>
    )

  return (
    <div className={styles.user_detail} style={{ height: 60 }}>
      <Avatar username={user_info.name} src={user_info.avatar} size={60} />
      <div className={styles.detail}>
        <div className={styles.detail_1}>
          <div className={styles.username}>{user_info.name}</div>
          <Icon icon="online" size={10} />
        </div>
      </div>
    </div>
  )
}

export default UserDetail

import { useSwipeNavigation } from "@/hooks/swipe-navigation"
import CommonLayout from "@/layout/common"
import Feature from "./components/featrue"
import UserDetail from "./components/user-detail"
import styles from "./index.module.scss"

const Features = () => {
  const feature_list: FeatureItem[] = [
    {
      icon: "feat-approval",
      title: "审批",
      desc: "7条申请待审批",
      path: "/approval",
    },
    {
      icon: "feat-atd",
      title: "考勤",
      desc: "今日打卡正常",
    },
    {
      icon: "feat-ops",
      title: "操作",
      desc: "操作流程日志",
    },
    {
      icon: "feat-schedule",
      title: "日程",
      desc: "每日安排计划",
    },
  ]

  return (
    <div className={styles.features}>
      {feature_list.map((item, index) => {
        return <Feature key={index} item={item} />
      })}
    </div>
  )
}

const ProfilePage = () => {
  const { handleTouchEnd, handleTouchStart } = useSwipeNavigation({
    leftSwipeConfig: {
      tabbarIndex: 2,
      url: "/file",
    },
  })

  return (
    <CommonLayout title="我的" className={styles.profile_page_body} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className={styles.main_content}>
        <UserDetail />
        <Features />
      </div>
    </CommonLayout>
  )
}

export default ProfilePage

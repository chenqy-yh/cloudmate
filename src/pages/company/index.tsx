import { useSwipeNavigation } from "@/hooks/swipe-navigation"
import AttendanceView from "./views/attendance"

const CompanyPage: React.FC = () => {
  const { handleTouchEnd, handleTouchStart } = useSwipeNavigation({
    rightSwipeConfig: {
      tabbarIndex: 1,
      url: "/group",
    },
  })

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <AttendanceView />
    </div>
  )
}

export default CompanyPage

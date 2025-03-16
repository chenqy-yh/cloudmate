import { useSwipeNavigation } from "@/hooks/swipe-navigation";
import styles from "./index.module.scss";

import AttendanceView from "./views/attendance";

const CompanyPage: React.FC = () => {
  const { handleTouchEnd, handleTouchStart } = useSwipeNavigation({
    rightSwipeConfig: {
      tabbarIndex: 1,
      url: "/group",
    },
  });

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={styles.company_body}
    >
      <AttendanceView />
    </div>
  );
};

export default CompanyPage;

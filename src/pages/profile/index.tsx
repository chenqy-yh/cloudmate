import { useSwipeNavigation } from "@/hooks/swipe-navigation";
import styles from "./index.module.scss";

const ProfilePage = () => {
  const { handleTouchEnd, handleTouchStart } = useSwipeNavigation({
    leftSwipeConfig: {
      tabbarIndex: 2,
      url: "/file",
    },
  });

  return (
    <div
      className={styles.profile_page_body}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      Profile Page
    </div>
  );
};

export default ProfilePage;

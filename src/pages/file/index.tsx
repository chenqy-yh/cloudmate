import { useSwipeNavigation } from "@/hooks/swipe-navigation";
import styles from "./index.module.scss";

const FilePage = () => {
  const { handleTouchEnd, handleTouchStart } = useSwipeNavigation({
    leftSwipeConfig: {
      tabbarIndex: 1,
      url: "/group",
    },
    rightSwipeConfig: {
      tabbarIndex: 3,
      url: "/profile",
    },
  });

  return (
    <div
      className={styles.file_page_body}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      File Page
    </div>
  );
};

export default FilePage;

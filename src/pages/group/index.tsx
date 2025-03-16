import { useSwipeNavigation } from "@/hooks/swipe-navigation";
import styles from "./index.module.scss";
import GroupHeader from "./components/header";
import Contacts from "./components/contacts";
import SearchBar from "./components/search-bar";

const GroupPage = () => {
  const { handleTouchEnd, handleTouchStart } = useSwipeNavigation({
    leftSwipeConfig: {
      tabbarIndex: 0,
      url: "/",
    },
    rightSwipeConfig: {
      tabbarIndex: 2,
      url: "/file",
    },
  });

  return (
    <div
      className={styles.group_page_body}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <GroupHeader />
      <SearchBar />
      <Contacts />
    </div>
  );
};

export default GroupPage;

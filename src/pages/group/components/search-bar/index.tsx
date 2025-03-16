import { Image } from "@tarojs/components";
import styles from "./index.module.scss";

const SearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <Image
        className={styles.search_icon}
        src="../../../../../assets/icon/search.svg"
      />
      <div className={styles.search_text}>搜索</div>
    </div>
  );
};

export default SearchBar;

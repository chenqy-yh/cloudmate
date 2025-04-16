import SearchBar from "@/components/search";
import { useContext } from "react";
import GroupContext from "../../context";
import styles from "./index.module.scss";

const Tools = () => {
  const { searchKey, setSearchKey } = useContext(GroupContext);

  return (
    <div className={styles.tools}>
      <SearchBar
        value={searchKey}
        onInput={(e) => setSearchKey(e.detail.value)}
      />
    </div>
  );
};

export default Tools;

import Icon from "@/components/icon"
import styles from "./index.module.scss"

const SearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <Icon className={styles.search_icon} icon="search" />
      <div className={styles.search_text}>搜索</div>
    </div>
  )
}

export default SearchBar

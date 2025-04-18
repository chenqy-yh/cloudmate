import { useSwipeNavigation } from "@/hooks/useSwipeNavigation"
import CommonLayout from "@/layout/common"
import { Route, Routes } from "react-router-dom"
import styles from "./index.module.scss"
import MainContent from "./views/main-content"
import SearchFile from "./views/search-file"

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
  })

  return (
    <CommonLayout title="共享" className={styles.file_page_body} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/search" element={<SearchFile />} />
      </Routes>
    </CommonLayout>
  )
}

export default FilePage

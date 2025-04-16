import { useSwipeNavigation } from "@/hooks/swipe-navigation"
import CommonLayout from "@/layout/common"
import { useState } from "react"
import Contacts from "./components/contacts"
import Tools from "./components/tools"
import GroupContext from "./context"

const GroupPage = () => {
  const [searchKey, setSearchKey] = useState("")

  const { handleTouchEnd, handleTouchStart } = useSwipeNavigation({
    leftSwipeConfig: {
      tabbarIndex: 0,
      url: "/",
    },
    rightSwipeConfig: {
      tabbarIndex: 2,
      url: "/file",
    },
  })

  return (
    <GroupContext.Provider
      value={{
        searchKey,
        setSearchKey,
      }}
    >
      <CommonLayout title="团队" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <Tools />
        <Contacts />
      </CommonLayout>
    </GroupContext.Provider>
  )
}

export default GroupPage

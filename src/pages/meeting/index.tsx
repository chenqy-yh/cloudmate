import { Route, Routes } from "react-router-dom"
import MeetingMainPage from "./views/main"
import MeetingCreatePage from "./views/create"
import MeetingDetail from "./views/detail"

const MeetingPage = () => {
  return (
    <Routes>
      <Route path="/" element={<MeetingMainPage />} />
      <Route path="/create" element={<MeetingCreatePage />} />
      <Route path="/detail" element={<MeetingDetail />} />
    </Routes>
  )
}

export default MeetingPage

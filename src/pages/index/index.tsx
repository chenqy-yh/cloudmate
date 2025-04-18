import { AuthGuard } from "@/components/auth"
import { useSystemInit } from "@/hooks/useSystemInit"
import { Suspense } from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Tabbar from "../../components/tab-bar"
import Approval from "../approval"
import ChatPage from "../chat"
import CompanyPage from "../company"
import FilePage from "../file"
import GroupPage from "../group"
import LoginPage from "../login"
import ProfilePage from "../profile"
import styles from "./index.module.scss"

const LoadingFallback = () => {
  return <div className={styles.loading_fallback}>Loading...</div>
}

const MainLayout = () => {
  const location = useLocation()
  const hide_tabbar_routes = ["/chat", "/approval"]
  const should_show_tabbar = !hide_tabbar_routes.some((route) => location.pathname.includes(route))

  useSystemInit()

  return (
    <div className={styles.index_page_body}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<CompanyPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/file/*" element={<FilePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/approval/*" element={<Approval />} />
          <Route path="/chat/*" element={<ChatPage />} />
        </Routes>
      </Suspense>
      {should_show_tabbar && <Tabbar />}
    </div>
  )
}

export default function Index() {
  return (
    <BrowserRouter basename="/pages/index/index">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <MainLayout />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

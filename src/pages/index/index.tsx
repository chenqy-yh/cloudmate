import { AuthGuard } from "@/components/auth";
import { useSwitchTab } from "@/hooks/switch-tab";
import { createClient } from "@/socket";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tabbar from "../../components/tab-bar";
import CompanyPage from "../company";
import FilePage from "../file";
import GroupPage from "../group";
import LoginPage from "../login";
import ProfilePage from "../profile";
import styles from "./index.module.scss";

const MainLayout = () => {
  const { switchTab } = useSwitchTab();

  const [a] = useState(0);

  // // useEffect(() => {
  // //   switchTab(1);
  // // }, [a]);

  // useEffect(() => {
  //   const client = createClient(Taro.getStorageSync("Authorization"));
  //   client.connect();
  //   return () => {
  //     client.disconnect();
  //   };
  // }, []);

  return (
    <div className={styles.index_page_body}>
      <Routes>
        <Route path="/" element={<CompanyPage />} />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/file" element={<FilePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Tabbar />
    </div>
  );
};

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
  );
}

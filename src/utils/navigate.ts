import { setActiveIndex } from "@/store/slice/tabbar";
import { NavigateFunction } from "react-router-dom";


const tab_id_map = {
  0: "",
  1: "group",
  2: "file",
  3: "profile",
}

export const switchTab = (tab_id: number, navigate: NavigateFunction) => {
  navigate(`/${tab_id_map[tab_id]}`);
  setActiveIndex(tab_id);
}

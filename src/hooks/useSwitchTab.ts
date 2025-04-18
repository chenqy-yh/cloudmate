import { AppDispatch } from "@/store";
import { setActiveIndex } from "@/store/reducers/tabbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const tab_id_map = {
  0: "/",
  1: "/group",
  2: "/file",
  3: "/profile",
}

export const useSwitchTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const switchTab = (tab_id: number) => {
    dispatch(setActiveIndex(tab_id));
    navigate(tab_id_map[tab_id]);
  }
  return { switchTab };
}


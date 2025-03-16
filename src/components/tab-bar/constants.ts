import { NavigateFunction } from "react-router-dom";

export type TabbarItemConfig = {
  id: number;
  icon: {
    default: string;
    active: string;
  },
  text: string;
  path: string;
};

export type TabbarItemProps = TabbarItemConfig & {
  active: boolean;
  setActiveIndex: (index: number) => void;
  navigate: NavigateFunction;
};

export const tabbar_item_config: TabbarItemConfig[] = [
  {
    id: 0,
    icon: {
      default: "../../assets/icon/company.svg",
      active: "../../assets/icon/company-active.svg",
    },
    path: "/",
    text: "公司",
  },
  {
    id: 1,
    icon: {
      default: "../../assets/icon/group.svg",
      active: "../../assets/icon/group-active.svg",
    },
    path: "/group",
    text: "团队",
  },
  {
    id: 2,
    icon: {
      default: "../../assets/icon/folder.svg",
      active: "../../assets/icon/folder-active.svg",
    },
    path: "/file",
    text: "共享",
  },
  {
    id: 3,
    icon: {
      default: "../../assets/icon/user.svg",
      active: "../../assets/icon/user-active.svg",
    },
    path: "/profile",
    text: "我的",
  },
];

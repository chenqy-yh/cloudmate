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
      default: "company",
      active: "company-active",
    },
    path: "/",
    text: "公司",
  },
  {
    id: 1,
    icon: {
      default: "group",
      active: "group-active",
    },
    path: "/group",
    text: "团队",
  },
  {
    id: 2,
    icon: {
      default: "folder",
      active: "folder-active",
    },
    path: "/file",
    text: "共享",
  },
  {
    id: 3,
    icon: {
      default: "user",
      active: "user-active",
    },
    path: "/profile",
    text: "我的",
  },
];

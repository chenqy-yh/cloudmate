import { Dispatch, SetStateAction, createContext } from "react";

export type GroupContextType = {
  searchKey: string;
  setSearchKey: Dispatch<SetStateAction<string>>;
};

const GroupContext = createContext<GroupContextType>({
  searchKey: "",
  setSearchKey: () => {},
});

export default GroupContext;

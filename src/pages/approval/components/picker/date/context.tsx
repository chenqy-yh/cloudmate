import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { Day } from "./index.d";

export type DatePickerContextType = {
  onSelect?: (value: Day) => void;
  isSelectorVisible: boolean;
  setSelectorVisible: Dispatch<SetStateAction<boolean>>;
  inner_value: Day;
  setInnerValue: Dispatch<SetStateAction<Day>>;
};

export const DatePickerContext = createContext<DatePickerContextType>({
  onSelect: () => {},
  isSelectorVisible: false,
  setSelectorVisible: () => {},
  inner_value: {} as Day,
  setInnerValue: () => {},
});

export const useDatePciker = () => useContext(DatePickerContext);

import { Dispatch, SetStateAction, createContext } from "react";
import { ApprovalProcess } from "./types";

type ApprovalContextType = {
  process: ApprovalProcess;
  setProcess: Dispatch<SetStateAction<ApprovalProcess>>;
  process_version: number;
  setProcessVersion: Dispatch<SetStateAction<number>>;
};

const ApprovalContext = createContext<ApprovalContextType>({
  process: "PENDING",
  setProcess: () => {},
  process_version: 0,
  setProcessVersion: () => {},
});

export default ApprovalContext;

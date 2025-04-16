import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ApprovalContext from "./context";
import { ApprovalProcess } from "./types";
import CreateApprovalPage from "./views/create";
import ApprovalDetailPage from "./views/detail";
import ApprovalHomePage from "./views/home";
import ApprovalProcessPage from "./views/process";

const Approval = () => {
  const [process, setProcess] = useState<ApprovalProcess>("PENDING");
  const [process_version, setProcessVersion] = useState(0);

  return (
    <ApprovalContext.Provider
      value={{
        process,
        setProcess,
        process_version,
        setProcessVersion,
      }}
    >
      <Routes>
        <Route path="/" element={<ApprovalHomePage />} />
        <Route path="/create/*" element={<CreateApprovalPage />} />
        <Route path="/process" element={<ApprovalProcessPage />} />
        <Route path="/detail" element={<ApprovalDetailPage />} />
      </Routes>
    </ApprovalContext.Provider>
  );
};

export default Approval;

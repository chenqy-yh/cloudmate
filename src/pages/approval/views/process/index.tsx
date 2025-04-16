import { queryApprovalListByProcess } from "@/apis/approval"
import StateBox from "@/components/box/state-box"
import Icon from "@/components/icon/common"
import Loader from "@/components/loading/icon"
import CommonLayout from "@/layout/common"
import { useContext, useEffect, useMemo, useState } from "react"
import { process_list } from "../../config/process"
import ApprovalContext from "../../context"
import ApprovalProcessItem from "./components/approval-item"
import ProcessTag from "./components/process-tag"
import styles from "./index.module.scss"

const EmptyList = () => {
  return (
    <div className={styles.state_view}>
      <Icon icon="empty" size={100} />
    </div>
  )
}

const LoadingList = () => {
  return (
    <div className={styles.state_view}>
      <Loader version={1} />
    </div>
  )
}

const ApprovalProcess = () => {
  const { process: process_in_context, setProcess: setContextProcess, process_version } = useContext(ApprovalContext)

  const [active_process, setActiveProcess] = useState(process_in_context)
  const [approval_list, setApprovalList] = useState([])
  const [list_state, setListState] = useState("")

  // 获取标题
  const process_title = useMemo(() => process_list.find((p) => p.value === active_process)?.title || "", [active_process])

  useEffect(() => {
    if (active_process) {
      fetchApprovalList(active_process)
    }
  }, [active_process, process_version])

  const fetchApprovalList = async (process) => {
    try {
      setListState("loading")
      const res = await queryApprovalListByProcess(process)
      const list = res.data || []
      setApprovalList(list)
      setListState(res.data.length ? "loaded" : "empty")
    } catch (error) {
      console.error("Error fetching approval list:", error)
      setListState("empty")
    }
  }

  const handleToggleProcess = (process) => {
    setActiveProcess(process)
    setContextProcess(process)
  }

  const renderProcessTags = () => {
    return (
      <div className={styles.process_tags}>
        {process_list.map((item) => (
          <ProcessTag key={item.value} item={item} active={active_process === item.value} toggle={handleToggleProcess} />
        ))}
      </div>
    )
  }

  return (
    <CommonLayout title={process_title} back attachment={renderProcessTags()}>
      <div className={styles.content}>
        <StateBox
          className={styles.process_approval_list}
          states={{
            empty: <EmptyList />,
            loading: <LoadingList />,
          }}
          value={list_state}
        >
          {approval_list.map((approval, index) => (
            <ApprovalProcessItem key={index} approval={approval} />
          ))}
        </StateBox>
      </div>
    </CommonLayout>
  )
}

export default ApprovalProcess

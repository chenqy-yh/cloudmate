import Icon from "@/components/icon/common"
import CommonLayout from "@/layout/common"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { approval_process, approval_type } from "../../config/home"
import ApprovalContext from "../../context"
import { ApprovalProcess } from "../../types"
import styles from "./index.module.scss"

type ApprovalStatusItemProps = {
  icon: IconName<"svg">
  value: ApprovalProcess
  process_cn: string
}

const ApprovalStatusItem: React.FC<ApprovalStatusItemProps> = (props) => {
  const { icon, value, process_cn } = props

  const { setProcess } = useContext(ApprovalContext)

  const navigate = useNavigate()

  const handleClickProcess = () => {
    setProcess(value)
    navigate(`/approval/process`)
  }

  return (
    <div className={styles.ap_st_item} onClick={handleClickProcess}>
      <Icon icon={icon} size={30} />
      <div className={styles.ap_st_item_name}>{process_cn}</div>
    </div>
  )
}

type ApprovalTypeItemProps = {
  icon: IconName<"svg">
  type: string
  path: string
}

const ApprovalTypeItem: React.FC<ApprovalTypeItemProps> = (props) => {
  const { icon, type, path } = props
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(path)
  }

  return (
    <div className={styles.ap_type_item} onClick={handleNavigate}>
      <Icon icon={icon} size={20} />
      <div className={styles.ap_type_item_name}>{type}</div>
    </div>
  )
}

const ApprovalHome: React.FC = () => (
  <CommonLayout className={styles.approval} title="OA审批" back>
    <div className={styles.ap_status}>
      {approval_process.map((item) => (
        <ApprovalStatusItem key={item.icon} icon={item.icon as IconName<"svg">} value={item.value as ApprovalProcess} process_cn={item.process_cn} />
      ))}
    </div>
    <div className={styles.ap_main_content}>
      {/* 审批类型 */}
      <div className={styles.ap_type}>
        <div className={styles.ap_type_title}>审批类型</div>
        <div className={styles.ap_type_content}>
          {approval_type.map((item) => {
            const { icon, path, type } = item
            return <ApprovalTypeItem key={path} path={path} icon={icon as IconName<"svg">} type={type} />
          })}
        </div>
      </div>
    </div>
  </CommonLayout>
)

export default ApprovalHome

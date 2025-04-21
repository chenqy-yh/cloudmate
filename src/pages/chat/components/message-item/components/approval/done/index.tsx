import { queryApprovalBaseInfo } from "@/apis/approval"
import Avatar from "@/components/avatar"
import IButton from "@/components/button"
import Loader from "@/components/loading/icon"
import { APPROVAL_TYPE_TRANSFER } from "@/pages/approval/config/constants"
import { ApprovalEntity, ApprovalType } from "@/pages/approval/types"
import { error } from "@/utils/common"
import { getFormattedDate } from "@/utils/date"
import Taro from "@tarojs/taro"
import { useCallback, useContext, useEffect, useState } from "react"
import styles from "./index.module.scss"
import { MessageItemContext } from "../../../context"

type ApprovalDoneMessageProps = {
  type: ApprovalType
  code: string
}

const ApprovalDoneMessage: React.FC<ApprovalDoneMessageProps> = ({ code, type }) => {
  const { onMessageLoad } = useContext(MessageItemContext)
  const [loading, setLoading] = useState(true)
  const [approval, setApproval] = useState<ApprovalEntity | null>(null)

  const fetchApproval = useCallback(async () => {
    setLoading(true)
    try {
      const data = await queryApprovalBaseInfo(code)
      setApproval(data)
    } catch (err) {
      console.error(err)
      error("审批信息加载失败")
    } finally {
      setLoading(false)
      onMessageLoad()
    }
  }, [code, onMessageLoad])

  useEffect(() => {
    fetchApproval()
  }, [fetchApproval])

  const handleNavigateToDetail = useCallback(() => {
    code && type
      ? Taro.navigateTo({
          // url: `/pages/approval/detail?code=${code}&ap_type=${type}`,
          url: `/pages/approval/index`,
        })
      : error("暂时无法查看审批明细，请前往审批列表查看")
  }, [code, type])

  if (loading) return <Loader version={2} />
  if (!approval) return <span>审批信息加载失败</span>

  return (
    <div className={styles.approval}>
      <div className={styles.title}>{`${APPROVAL_TYPE_TRANSFER[type]}审批申请`}</div>
      <div className={styles.form}>
        <div className={styles.label}>申请人</div>
        <div className={styles.value}>
          <Avatar username={approval.initiator.name} src={approval.initiator.avatar} size={20} />
          <div>{approval.initiator.name}</div>
        </div>
        <div className={styles.label}>创建时间</div>
        <div className={styles.value}>{getFormattedDate(new Date(approval.created_at))}</div>
      </div>

      <IButton type="primary" long onClick={handleNavigateToDetail}>
        审批已通过
      </IButton>
    </div>
  )
}

export default ApprovalDoneMessage

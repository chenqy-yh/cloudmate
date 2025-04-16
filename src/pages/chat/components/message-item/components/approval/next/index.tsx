import { queryApprovalDetail } from "@/apis/approval"
import Avatar from "@/components/avatar"
import IButton from "@/components/button"
import Loader from "@/components/loading/icon"
import { APPROVAL_TYPE_TRANSFER } from "@/pages/approval/config/constants"
import { ApprovalType } from "@/pages/approval/types"
import { ApprovalStep, RawApprovalDetail } from "@/pages/approval/views/detail"
import { error } from "@/utils/common"
import { getFormattedDate } from "@/utils/date"
import Taro from "@tarojs/taro"
import classNames from "classnames"
import { useCallback, useEffect, useState } from "react"
import styles from "./index.module.scss"

type ApprovalNextMessageProps = {
  type: ApprovalType
  code: string
  info: {
    initiator: UserInfo
    approvar: UserInfo
    steps: ApprovalStep[]
  }
}

const formatApprovalSteps = (steps: ApprovalStep[]) => steps.sort((a, b) => a.step_order - b.step_order)

const ApprovalNextMessage: React.FC<ApprovalNextMessageProps> = ({ code, type }) => {
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<RawApprovalDetail | null>(null)

  const fetchDetail = useCallback(async () => {
    try {
      const res = await queryApprovalDetail(type, code)
      setDetail(res.data)
    } catch (err) {
      console.error(err)
      error("审批详情加载失败")
    } finally {
      setLoading(false)
    }
  }, [type, code])

  useEffect(() => {
    fetchDetail()
  }, [fetchDetail])

  const handleNavigateToDetail = useCallback(() => {
    code && type
      ? Taro.navigateTo({
          // url: `/pages/approval/detail?code=${code}&ap_type=${type}`,
          url: `/pages/approval/index`,
        })
      : error("暂时无法查看审批明细，请前往审批列表查看")
  }, [code, type])

  if (loading) return <Loader />

  if (!detail) return <span>审批信息加载失败</span>

  return (
    <div onClick={handleNavigateToDetail}>
      <div className={styles.approval}>
        <div className={styles.title}>{`${APPROVAL_TYPE_TRANSFER[type]}审批申请`}</div>
        <div className={styles.form}>
          <div className={styles.label}>申请人</div>
          <div className={styles.value}>
            <Avatar username={detail.initiator.name} src={detail.initiator.avatar} size={30} />
            <div>{detail.initiator.name}</div>
          </div>
          <div className={styles.label}>创建时间</div>
          <div className={styles.value}>{getFormattedDate(new Date(detail.created_at))}</div>
          <div className={styles.label}>流程</div>
          <div className={styles.value}>
            <div className={styles.steps}>
              {formatApprovalSteps(detail.approval_steps).map((step, index) => (
                <div key={index} className={styles.step}>
                  <Avatar username={step.approver.name} src={step.approver.avatar} size={30} />
                  {index !== detail.approval_steps.length - 1 && (
                    <div
                      className={classNames(styles.line, {
                        [styles[step.status]]: true,
                      })}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <IButton type="primary" long onClick={handleNavigateToDetail}>
          查看详情
        </IButton>
      </div>
    </div>
  )
}

export default ApprovalNextMessage

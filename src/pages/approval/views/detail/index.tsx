import IButton from "@/components/button"
import Divider from "@/components/divider"
import LoadingBox from "@/components/loading/box"
import CommonLayout from "@/layout/common"
import { user_uuid_selector } from "@/store/selectors/auth"
import { withProtocol } from "@/utils/common"
import { Image } from "@tarojs/components"
import Taro from "@tarojs/taro"
import classNames from "classnames"
import React, { useContext } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { APPROVAL_STATUS_TRANSFER } from "../../config/constants"
import ApprovalContext from "../../context"
import Flow from "./components/flow"
import { useApprovalActions } from "./hooks/use-approval-actions"
import { useApprovalDetail } from "./hooks/use-approval-detail"
import styles from "./index.module.scss"

type ApprovalDetailItemProps = {
  title: string
  children: React.ReactNode
}

const ApprovalDetailItem: React.FC<ApprovalDetailItemProps> = ({ title, children }) => (
  <div className={styles.item}>
    <div className={styles.item_title}>{title}</div>
    <div className={styles.item_value}>{children}</div>
  </div>
)

const ApprovalDetailPage: React.FC = () => {
  const { setProcessVersion } = useContext(ApprovalContext)
  const navigate = useNavigate()
  const user_uuid = useSelector(user_uuid_selector)

  const { ap_code, ap_type, generated_detail, loading } = useApprovalDetail()

  const { handleApprovalAction } = useApprovalActions({
    ap_code,
    ap_type,
    generated_detail,
    onAction: () => {
      setProcessVersion((prev) => prev + 1)
      navigate(-1)
    },
  })

  const handlePreviewImage = (url: string) => {
    Taro.previewImage({ urls: [url], current: url })
  }

  const renderDetails = () => {
    if (!generated_detail) return null

    const { flow, items, status, title, attachments } = generated_detail

    const need_approve = flow.approval_steps.some((step) => step.approver.uuid === user_uuid && step.status === "PENDING")

    return (
      <>
        <div className={styles.title}>{title}</div>
        <div
          className={classNames(styles.status, {
            [styles[status]]: true,
          })}
        >
          {`审批${APPROVAL_STATUS_TRANSFER[status]}`}
        </div>
        <div className={styles.item_list}>
          {items.map((item) => {
            return (
              <ApprovalDetailItem key={item.title} title={item.title}>
                {item.value}
              </ApprovalDetailItem>
            )
          })}
          {attachments && (
            <ApprovalDetailItem title="附件">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {attachments.map((url) => {
                  return (
                    <Image
                      key={url}
                      imageMenuPrevent="true"
                      src={withProtocol(url)}
                      mode="aspectFill"
                      className={styles.attachment_image}
                      onClick={() => handlePreviewImage(withProtocol(url))}
                    />
                  )
                })}
              </div>
            </ApprovalDetailItem>
          )}
          <Flow approval_steps={flow.approval_steps} cc_user={flow.cc_user} />
        </div>
        {need_approve && (
          <>
            <Divider content="操作" />
            <div className={styles.actions}>
              <IButton long type="primary" onClick={() => handleApprovalAction("approve")}>
                同意
              </IButton>
              <IButton long type="danger" onClick={() => handleApprovalAction("reject")}>
                拒绝
              </IButton>
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <CommonLayout title="详情" back>
      <LoadingBox load={loading} className={styles.content}>
        {renderDetails()}
      </LoadingBox>
    </CommonLayout>
  )
}

export default ApprovalDetailPage
export * from "./index.d"

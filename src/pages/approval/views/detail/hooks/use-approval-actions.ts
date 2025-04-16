import { approve, reject } from "@/apis/approval"
import { GenerateResult } from "@/pages/approval/config/detail"
import { Client } from "@/socket"
import { userInfoSelector } from "@/store/selectors/user"
import { error, success } from "@/utils/common"
import { useSelector } from "react-redux"

export const useApprovalActions = (options: {
  ap_code: string,
  ap_type: string,
  generated_detail: GenerateResult | null
  onAction: (action: "approve" | "reject") => void
}) => {
  const { ap_code, ap_type, generated_detail, onAction } = options

  const user_info = useSelector(userInfoSelector)


  const notifyNext = (options: {
    notify_type: NotifyType
    action: "approve" | "reject"
    receiver: string
    sender: string
  }) => {
    const { notify_type, action, receiver, sender } = options
    Client.sendPrivateMessage({
      content: {
        notification: {
          type: notify_type,
          payload: {
            action,
            type: ap_type,
            code: ap_code,
          },
        },
      },
      receiver,
      sender,
      type: "notification",
    })
  }

  const handleApprovalAction = async (action: "approve" | "reject") => {
    const handler = action === "approve" ? approve : reject

    const isDetailEmpty = !generated_detail || typeof generated_detail !== "object"
    const isUserInfoEmpty = !user_info || typeof user_info !== "object"

    try {
      await handler(ap_code)
      onAction(action)
      success("审批成功")
      if (isDetailEmpty || isUserInfoEmpty) return
      const next_order = generated_detail.next_order[user_info.uuid]
      if (!next_order) {
        const initiator = generated_detail.initiator.uuid
        notifyNext({
          notify_type: "approval:done",
          action: action,
          receiver: initiator,
          sender: user_info.uuid,
        })
      } else {
        const steps = generated_detail.flow.approval_steps;
        const next_approvar = steps[next_order].approver.uuid;
        notifyNext({
          notify_type: "approval:next",
          action: action,
          receiver: next_approvar,
          sender: user_info.uuid,
        })
      }
    } catch (err) {
      error(err.name)
      console.error(err.message)
    }
  }
  return {
    handleApprovalAction,
  }

}

import { approve, reject } from "@/apis/approval"
import { GenerateResult } from "@/pages/approval/config/detail"
import { createPrivateMessageItem } from "@/pages/chat/utils"
import { Client } from "@/socket"
import { addMessageToContactHistory } from "@/store/reducers/contacts"
import { userInfoSelector } from "@/store/selectors/user"
import { error, success } from "@/utils/common"
import { useDispatch, useSelector } from "react-redux"

export const useApprovalActions = (options: {
  ap_code: string,
  ap_type: string,
  generated_detail: GenerateResult | null
  onAction: (action: "approve" | "reject") => void
}) => {
  const { ap_code, ap_type, generated_detail, onAction } = options

  const dispatch = useDispatch();

  const user_info = useSelector(userInfoSelector)!


  const notifyNext = (options: {
    notify_type: NotifyType
    action: "approve" | "reject"
    receiver: string
    sender: string
  }) => {
    const { notify_type, action, receiver, sender } = options
    const content = {
      notification: {
        type: notify_type,
        payload: {
          action,
          type: ap_type,
          code: ap_code,
        },
      },
    };
    const type = "notification"

    Client.sendPrivateMessage({
      type,
      sender,
      content,
      receiver,
      callback:()=>{
        dispatch(
          addMessageToContactHistory({
            message: createPrivateMessageItem(user_info.uuid, receiver, content, type),
            contact_uuid: receiver,
          })
        )
      }
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

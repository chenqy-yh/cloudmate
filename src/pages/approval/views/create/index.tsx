import { createApproval } from "@/apis/approval"
import { Client } from "@/socket"
import { userInfoSelector } from "@/store/selectors/user"
import { error, success } from "@/utils/common"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import DynamicForm, { FormConfig, FormState } from "../../components/dynamc-form"
import { approval_form_config_map } from "../../config/create"
import { ApprovalType } from "../../types"
import { createDto } from "../../utils/utils"

type CreateApprovalRouteConfig = {
  path: string
  config: FormConfig
  type: ApprovalType
}

const CreateApproval: React.FC = () => {
  const navigate = useNavigate()

  const user_info = useSelector(userInfoSelector)

  const { routes_config } = useMemo(() => {
    const routes_config: CreateApprovalRouteConfig[] = [
      {
        path: "/leave",
        config: approval_form_config_map.leave,
        type: "LEAVE",
      },
      {
        path: "/overtime",
        config: approval_form_config_map.overtime,
        type: "OVERTIME",
      },
      {
        path: "/reimbursement",
        config: approval_form_config_map.reimbursement,
        type: "REIMEUBRSEMENT",
      },
      {
        path: "/business_trip",
        config: approval_form_config_map.business_trip,
        type: "BUSINESS_TRIP",
      },
    ]
    return {
      routes_config,
    }
  }, [])

  const sendFirstApprovarMessage = (
    sender: string,
    receiver: string,
    message_content: {
      code: string
      type: ApprovalType
    }
  ) => {
    Client.sendPrivateMessage({
      content: {
        notification: {
          type: "approval:init",
          payload: message_content,
        },
      },
      receiver: receiver,
      sender: sender,
      type: "notification",
    })
  }

  const handleSubmit = async (type: ApprovalType, form: FormState) => {
    try {
      if (!user_info) {
        return error("获取用户信息失败")
      }
      const dto = await createDto(type, form)
      const { data: approval } = await createApproval(type, dto)
      const approval_code = approval.approval_code
      const first_approvar_uuid = form.flow.selected_approvar_parts[0].uuid
      const message_content = {
        code: approval_code,
        type: type,
      }
      sendFirstApprovarMessage(user_info.uuid || "", first_approvar_uuid, message_content)
      navigate(-1)
      success("审批已发送")
    } catch (err) {
      error(err.name)
      console.error(err.message)
    }
  }

  return (
    <Routes>
      {routes_config.map((route) => (
        <Route key={route.path} path={route.path} element={<DynamicForm config={route.config} onSubmit={(form) => handleSubmit(route.type, form)} />} />
      ))}
    </Routes>
  )
}

export default CreateApproval

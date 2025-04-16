import { ApprovalDetail, ApprovalMap, ApprovalStep, RawApprovalDetail } from "../views/detail"
import { APPROVAL_TYPE_TRANSFER } from "./constants"

type Item = {
  title: string
  value: string | number
}

export type GenerateResult = {
  title: string
  status: string
  items: Array<Item>
  attachments?: Array<string>,
  flow: {
    approval_steps: Array<ApprovalStep>
    cc_user: Array<UserInfo>
  },
  initiator: UserInfo
  next_order: Record<string, number | undefined>
}

type Generator<T extends keyof ApprovalMap> = (approval: ApprovalDetail<T>) => GenerateResult;

const buildCommonFields = <T extends keyof ApprovalMap>(approval: ApprovalDetail<T>) => [
  {
    title: "审批编号",
    value: approval.approval_code
  },
  {
    title: "发起人",
    value: approval.initiator.name
  },
  {
    title: "发起时间",
    value: new Date(approval.created_at).toLocaleString()
  },
  {
    title: "紧急联系方式",
    value: approval.detail.contact
  }
]

const buildResult = <T extends keyof ApprovalMap>(approval: ApprovalDetail<T>, extra_items: Array<Item>) => ({
  title: `${approval.initiator.name}提交的${APPROVAL_TYPE_TRANSFER[approval.type as keyof ApprovalMap]}审批申请`,
  status: approval.status,
  items: [
    ...buildCommonFields(approval),
    ...extra_items
  ],
  attachments: approval.detail.attachments,
  flow: {
    approval_steps: approval.approval_steps || [],
    cc_user: approval.cc_user || [],
  },
  initiator: approval.initiator,
  next_order: approval.approval_steps.reduce((acc, cur, index) => {
    return {
      ...acc,
      [cur.approver.uuid]: index === approval.approval_steps.length - 1 ? undefined : index + 1
    }
  }, {}),
})



const generateLeaveDetail: Generator<'LEAVE'> = (approval) => buildResult(approval, [
  {
    title: "请假类型",
    value: approval.detail.leave_type
  },
  {
    title: "请假理由",
    value: approval.detail.leave_reason
  },
  {
    title: "开始时间",
    value: new Date(approval.detail.start_time).toLocaleString()
  },
  {
    title: "结束时间",
    value: new Date(approval.detail.end_time).toLocaleString()
  }
])


const generateOvertimeDetail: Generator<'OVERTIME'> = (approval) =>
  buildResult(approval, [
    {
      title: "加班类型",
      value: approval.detail.overtime_type
    },
    {
      title: "加班理由",
      value: approval.detail.overtime_reason
    },
    {
      title: "开始时间",
      value: new Date(approval.detail.start_time).toLocaleString()
    },
    {
      title: "结束时间",
      value: new Date(approval.detail.end_time).toLocaleString()
    }
  ])


const generateBusinessTripDetail: Generator<'BUSINESS_TRIP'> = (approval) =>
  buildResult(approval, [
    {
      title: "出差目的地",
      value: approval.detail.destination
    },
    {
      title: "出差事由",
      value: approval.detail.trip_reason
    },
    {
      title: "开始时间",
      value: new Date(approval.detail.start_time).toLocaleString()
    },
    {
      title: "结束时间",
      value: new Date(approval.detail.end_time).toLocaleString()
    }
  ])


const generateReimbursementDetail: Generator<'REIMEUBRSEMENT'> = (approval) =>
  buildResult(approval, [
    {
      title: "报销类型",
      value: approval.detail.reimbursement_type
    },
    {
      title: "报销事由",
      value: approval.detail.reimbursement_reason
    },
    {
      title: "报销金额",
      value: approval.detail.amount
    }
  ])

export const ApprovalDetailGeneratorMap: Record<string, Generator<keyof ApprovalMap>> = {
  LEAVE: generateLeaveDetail,
  OVERTIME: generateOvertimeDetail,
  BUSINESS_TRIP: generateBusinessTripDetail,
  REIMEUBRSEMENT: generateReimbursementDetail
} as const;


export const formatApprovalDetail = (raw_detail: RawApprovalDetail) => {
  const type = raw_detail.type as keyof ApprovalMap;
  switch (type) {
    case "LEAVE":
      return {
        ...raw_detail,
        detail: raw_detail.leave_approval
      } as ApprovalDetail<'LEAVE'>
    case "OVERTIME":
      return {
        ...raw_detail,
        detail: raw_detail.overtime_approval
      } as ApprovalDetail<'OVERTIME'>
    case "BUSINESS_TRIP":
      return {
        ...raw_detail,
        detail: raw_detail.business_trip_approval
      } as ApprovalDetail<'BUSINESS_TRIP'>
    case "REIMEUBRSEMENT":
      return {
        ...raw_detail,
        detail: raw_detail.reimbursement_approval
      } as ApprovalDetail<'REIMEUBRSEMENT'>
    default:
      throw new Error("invalid approval type")
  }
}

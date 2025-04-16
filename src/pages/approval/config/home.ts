import { APPROVAL_PROCESS } from "./constants";


export const approval_process = [
  {
    icon: "ap-pending",
    process_cn: "待处理",
    value: APPROVAL_PROCESS.PENDING,
    icon_size: 30,
  },
  {
    icon: "ap-processed",
    process_cn: "已处理",
    value: APPROVAL_PROCESS.PROCESSED,
    icon_size: 28,
  },
  {
    icon: "ap-initiated",
    process_cn: "已发起",
    value: APPROVAL_PROCESS.INITIATED,
    icon_size: 30,
  },
  {
    icon: "ap-received",
    process_cn: "我收到的",
    value: APPROVAL_PROCESS.RECEIVED,
    icon_size: 35,
  },
];

export const approval_type = [
  {
    icon: "ap-leave",
    type: "请假",
    path: "/approval/create/leave",
  },
  {
    icon: "ap-reimbursement",
    type: "报销",
    path: "/approval/create/reimbursement",
  },
  {
    icon: "ap-overtime",
    type: "加班",
    path: "/approval/create/overtime",
  },
  {
    icon: "ap-business-trip",
    type: "出差",
    path: "/approval/create/business_trip",
  },
];

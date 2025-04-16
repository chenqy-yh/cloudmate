import { ApprovalStatus, ApprovalType } from "../../types";


type LeaveApproval = {
  start_time: string;
  end_time: string;
  contact: string;
  leave_reason: string;
  leave_type: string;
  attachments: Array<string>;
};

type OvertimeApproval = {
  start_time: string;
  end_time: string;
  contact: string;
  overtime_reason: string;
  overtime_type: string;
  attachments: Array<string>;
};

type ReimeubrsmentApproval = {
  amount: number;
  contact: string;
  reimbursement_reason: string;
  reimbursement_type: string;
  attachments: Array<string>;
};

type BusinessTripApproval = {
  start_time: string;
  end_time: string;
  contact: string;
  trip_reason: string;
  destination: string;
  attachments: Array<string>;
};

type ApprovalStep = {
  acted_at: string | null;
  approval_code: string;
  approver: UserInfo;
  comment: string | null;
  status: ApprovalStatus;
  step_order: number;
}

// approval_code String         @unique
//   type          ApprovalType
//   status        ApprovalStatus
//   created_at    DateTime       @default(now())
//   updated_at    DateTime       @updatedAt
// initiator      User   @relation("approval_initiator", fields: [initiator_uuid], references: [uuid])
// initiator_uuid String

type BaseApproval = {
  approval_code: string;
  status: ApprovalStatus;
  initiator_uuid: string;
  initiator: UserInfo;
  approver: Array<UserInfo>;
  cc_user: Array<UserInfo>;
  created_at: string;
}

export type RawApprovalDetail = BaseApproval & {
  approval_steps: Array<ApprovalStep>;
  type: ApprovalType;
  leave_approval?: LeaveApproval;
  overtime_approval?: OvertimeApproval;
  reimbursement_approval?: ReimeubrsmentApproval;
  business_trip_approval?: BusinessTripApproval;
};

export type ApprovalMap = {
  LEAVE: LeaveApproval;
  OVERTIME: OvertimeApproval;
  REIMEUBRSEMENT: ReimeubrsmentApproval;
  BUSINESS_TRIP: BusinessTripApproval;
}

export type ApprovalDetail<T extends keyof ApprovalMap> = BaseApproval & {
  approval_steps: Array<ApprovalStep>;
  type: T;
  detail: ApprovalMap[T];
}

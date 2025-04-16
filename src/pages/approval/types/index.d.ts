export type ApprovalEntity = {
  approval_code: string;
  type: string;
  status: string;
  initiator: UserInfo,
  created_at: string;
  updated_at: string;
}

export type ApprovalType = 'LEAVE' | 'OVERTIME' | 'REIMEUBRSEMENT' | 'BUSINESS_TRIP';

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';

export type ApprovalProcess = 'PENDING' | 'RECEIVED' | 'PROCESSED' | 'INITIATED';

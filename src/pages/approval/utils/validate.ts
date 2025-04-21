import * as Yup from 'yup';
import { ApprovalType } from '../types'
import { LEAVE_APPROVAL_TYPE, OVERTIME_APPROVAL_TYPE, REIMBURSEMENT_APPROVAL_TYPE } from '../config/constants';

const type_validtator = (types) => Yup.string().oneOf(types).required('请填写请假类型');

const reason_validator = Yup.string().min(8, "理由长度不少于8").required('理由格式异常');

const start_time_validtator = Yup.string().required('请填写开始时间');

const end_time_validtator = Yup.string().required('请填写结束时间').test('is-after-start', '结束时间必须晚于开始时间', function (value) {
  const { start_time } = this.parent;
  if (!start_time || !value) return true;
  return new Date(value) > new Date(start_time);
})

const attachments_validator = Yup.array().of(Yup.string().required('上传附件内容为附件url链接')).required('上传附件内容为附件url链接');

const contact_validator = Yup.string().matches(/^\d{11}$/, '手机号码格式不正确').required('手机号码格式不正确');

const flow_validator = Yup.object().shape({
  selected_approvar_parts: Yup.array().of(Yup.string().required('请关联审批人uuid')).min(1, '请选择至少一个审批人').required('请选择审批人'),
  selected_cc_parts: Yup.array().of(Yup.string().required('请关联抄送人uuid')).min(0).required('请选择抄送人'),
});

const amount_validator = Yup.number().required('请填写报销金额');

const destination_validator = Yup.string().required('请填写出差地点');




export const createValidationSchema = (type: ApprovalType) => {
  const baseValidation = {
    attachments: attachments_validator,
    flow: flow_validator
  }


  switch (type) {
    case 'LEAVE':
      return Yup.object().shape({
        leave_type: type_validtator(LEAVE_APPROVAL_TYPE),
        leave_reason: reason_validator,
        contact: contact_validator,
        start_time: start_time_validtator,
        end_time: end_time_validtator,
        ...baseValidation
      });
    case 'OVERTIME':
      return Yup.object().shape({
        overtime_type: type_validtator(OVERTIME_APPROVAL_TYPE),
        overtime_reason: reason_validator,
        contact: contact_validator,
        start_time: start_time_validtator,
        end_time: end_time_validtator,
        ...baseValidation
      });
    case 'REIMEUBRSEMENT':
      return Yup.object().shape({
        reimbursement_type: type_validtator(REIMBURSEMENT_APPROVAL_TYPE),
        reimbursement_reason: reason_validator,
        amount: amount_validator,
        contact: contact_validator,
        ...baseValidation
      });
    case 'BUSINESS_TRIP':
      return Yup.object().shape({
        destination: destination_validator,
        trip_reason: reason_validator,
        contact: contact_validator,
        start_time: start_time_validtator,
        end_time: end_time_validtator,
        ...baseValidation
      });
  }
}

import { FormConfig } from "../components/dynamc-form";
import { LEAVE_APPROVAL_TYPE, LEAVE_APPROVAL_TYPE_TRANSFER, OVERTIME_APPROVAL_TYPE, OVERTIME_APPROVAL_TYPE_TRANSFER, REIMBURSEMENT_APPROVAL_TYPE, REIMBURSEMENT_APPROVAL_TYPE_TRANSFER } from "./constants";

const leave_form_config: FormConfig = {
  title: '请假',
  fields: [
    {
      key: 'leave_type',
      field_type: 'picker',
      important: true,
      selector: LEAVE_APPROVAL_TYPE.map(type => ({
        label: LEAVE_APPROVAL_TYPE_TRANSFER[type],
        value: type
      })),
      placeholder: '请选择',
      title: '请假类型',
      init_value: { value: null },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'leave_reason',
      field_type: 'textarea',
      important: true,
      title: '请假原因',
      placeholder: '请输入',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      }
    },
    {
      key: 'start_time',
      field_type: 'datepicker',
      important: true,
      title: '开始时间',
      placeholder: '请选择',
      init_value: { value: null },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'end_time',
      field_type: 'datepicker',
      important: true,
      title: '结束时间',
      placeholder: '请选择',
      init_value: { value: null },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'contact',
      field_type: 'input',
      title: '紧急联系人联系方式(手机)',
      placeholder: '请输入',
      important: true,
      maxlength: 11,
      type: 'number',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      }
    },
    {
      key: 'attachments',
      field_type: 'imagepicker',
      title: '附件',
      placeholder: '请选择',
      init_value: { value: [] },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'flow',
      field_type: 'flow',
      important: true,
      init_value: { selected_approvar_parts: [], selected_cc_parts: [] },
      prop_map: [
        {
          value: 'selected_approvar_parts',
          onChange: 'onChangeApprovarParts'
        },
        {
          value: 'selected_cc_parts',
          onChange: 'onChangeCCParts'
        }
      ],
      pipe: {
        selected_approvar_parts: (new_val) => new_val,
        selected_cc_parts: (new_val) => new_val
      },
    }
  ]
}

const overtime_form_config: FormConfig = {
  title: '加班',
  fields: [
    {
      key: 'overtime_type',
      field_type: 'picker',
      init_value: { value: null },
      placeholder: '请选择',
      selector: OVERTIME_APPROVAL_TYPE.map(type => ({
        label: OVERTIME_APPROVAL_TYPE_TRANSFER[type],
        value: type
      })),
      title: '加班类型',
      important: true,
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      },
    },
    {
      key: 'overtime_reason',
      field_type: 'textarea',
      init_value: { value: "" },
      placeholder: '请输入',
      title: '加班原因',
      important: true,
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      }
    },
    {
      key: 'start_time',
      field_type: 'datepicker',
      init_value: { value: null },
      placeholder: '请选择',
      title: '开始时间',
      important: true,
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'end_time',
      field_type: 'datepicker',
      init_value: { value: null },
      placeholder: '请选择',
      title: '结束时间',
      important: true,
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'contact',
      field_type: 'input',
      title: '紧急联系人联系方式(手机)',
      placeholder: '请输入',
      important: true,
      maxlength: 11,
      type: 'number',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      }
    },
    {
      key: 'attachments',
      field_type: 'imagepicker',
      init_value: { value: [] },
      placeholder: '请选择',
      title: '附件',
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'flow',
      field_type: 'flow',
      init_value: { selected_approvar_parts: [], selected_cc_parts: [] },
      title: '审批人',
      important: true,
      prop_map: [
        {
          value: 'selected_approvar_parts',
          onChange: 'onChangeApprovarParts'
        },
        {
          value: 'selected_cc_parts',
          onChange: 'onChangeCCParts'
        }
      ],
      pipe: {
        selected_approvar_parts: (new_val) => new_val,
        selected_cc_parts: (new_val) => new_val
      }
    }
  ]
}

const business_trip_form_config: FormConfig = {
  title: '出差',
  fields: [
    {
      key: 'destination',
      field_type: 'input',
      title: '出差地点',
      placeholder: '请输入',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      },
      type: 'text',
      maxlength: 50,
      important: true
    },
    {
      key: 'trip_reason',
      field_type: 'textarea',
      title: '出差原因',
      placeholder: '请输入',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      },
      important: true
    },
    {
      key: 'start_time',
      field_type: 'datepicker',
      title: '开始时间',
      placeholder: '请选择',
      init_value: { value: null },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      },
      important: true
    },
    {
      key: 'end_time',
      field_type: 'datepicker',
      title: '结束时间',
      placeholder: '请选择',
      init_value: { value: null },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      },
      important: true
    },
    {
      key: 'contact',
      field_type: 'input',
      title: '紧急联系人联系方式(手机)',
      placeholder: '请输入',
      important: true,
      maxlength: 11,
      type: 'number',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      }
    },
    {
      key: 'attachments',
      field_type: 'imagepicker',
      title: '附件',
      placeholder: '请选择',
      init_value: { value: [] },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'flow',
      field_type: 'flow',
      init_value: { selected_approvar_parts: [], selected_cc_parts: [] },
      important: true,
      prop_map: [
        {
          value: 'selected_approvar_parts',
          onChange: 'onChangeApprovarParts'
        },
        {
          value: 'selected_cc_parts',
          onChange: 'onChangeCCParts'
        }
      ],
      pipe: {
        selected_approvar_parts: (new_val) => new_val,
        selected_cc_parts: (new_val) => new_val
      },
    }
  ]
}

const reimbursement_form_config: FormConfig = {
  title: '报销',
  fields: [
    {
      key: 'reimbursement_type',
      field_type: 'picker',
      title: '报销类型',
      placeholder: '请选择',
      important: true,
      selector: REIMBURSEMENT_APPROVAL_TYPE.map(type => ({
        label: REIMBURSEMENT_APPROVAL_TYPE_TRANSFER[type],
        value: type
      })),
      init_value: { value: null },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      },
    },
    {
      key: 'reimbursement_reason',
      field_type: 'textarea',
      title: '报销事由',
      placeholder: '请输入',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      },
      important: true
    },
    {
      key: 'amount',
      field_type: 'input',
      title: '报销金额',
      placeholder: '请输入',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      },
      type: 'number',
      important: true
    },
    {
      key: 'contact',
      field_type: 'input',
      title: '紧急联系人联系方式(手机)',
      placeholder: '请输入',
      important: true,
      maxlength: 11,
      type: 'number',
      init_value: { value: "" },
      prop_map: [
        {
          value: 'value',
          onChange: 'onInput'
        }
      ],
      pipe: {
        value: (new_val) => new_val.detail.value
      }
    },
    {
      key: 'attachments',
      field_type: 'imagepicker',
      title: '附件',
      placeholder: '请选择',
      init_value: { value: [] },
      prop_map: [
        {
          value: 'value',
          onChange: 'onChange'
        }
      ],
      pipe: {
        value: (new_val) => new_val
      }
    },
    {
      key: 'flow',
      field_type: 'flow',
      important: true,
      init_value: { selected_approvar_parts: [], selected_cc_parts: [] },
      prop_map: [
        {
          value: 'selected_approvar_parts',
          onChange: 'onChangeApprovarParts'
        },
        {
          value: 'selected_cc_parts',
          onChange: 'onChangeCCParts'
        }
      ],
      pipe: {
        selected_approvar_parts: (new_val) => new_val,
        selected_cc_parts: (new_val) => new_val
      },
    }]
};

export const approval_form_config_map = {
  leave: leave_form_config,
  overtime: overtime_form_config,
  business_trip: business_trip_form_config,
  reimbursement: reimbursement_form_config
} as const;

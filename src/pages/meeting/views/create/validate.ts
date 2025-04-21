import * as Yup from 'yup';
import { MeetingLevel } from '.';

const name_validator = Yup.string().min(4, "会议名称长度不少于4").required('会议名称格式异常');

const desc_validator = Yup.string().min(8, "描述长度不少于8").required('描述格式异常');

const level_validator = Yup.mixed<MeetingLevel>().oneOf([1, 2, 3], '请选择会议等级').required('请选择会议等级');

const location_validator = Yup.string().nullable().notRequired().test('is-url-or-empty', '会议地点格式异常', function (value) {
  if (!value) return true;
  return Yup.string().isValidSync(value);
})

const start_time_validtator = Yup.string().required('请填写开始时间');

const url_validator = Yup.string().nullable().notRequired().test('is-url-or-empty', '会议链接格式异常', function (value) {
  if (!value) return true;
  return Yup.string().url().isValidSync(value);
})

const end_time_validtator = Yup.string().required('请填写结束时间').test('is-after-start', '结束时间必须晚于开始时间', function (value) {
  const { start_time } = this.parent;
  if (!start_time || !value) return true;
  return new Date(value) > new Date(start_time);
})

const select_parts_validator = Yup.array()
  .of(Yup.string().required('参与者信息格式异常'))
  .min(1, '请选择至少1个参与者')
  .required('请选择参与者');


export const validate_schema = Yup.object().shape({
  meetingName: name_validator,
  meetingDesc: desc_validator,
  level: level_validator,
  start_time: start_time_validtator,
  end_time: end_time_validtator,
  location: location_validator,
  url: url_validator,
  selected_parts: select_parts_validator,
});


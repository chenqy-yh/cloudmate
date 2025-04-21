import { uploadAttchment } from '@/apis/approval';
import { File } from '@/components/picker/image';
import { makeErrorMsg } from '@/utils/error';
import { FormState } from "../components/dynamc-form";
import { dayTransfer } from "../components/picker/date/utils";
import { ApprovalType } from '../types';
import { createValidationSchema } from './validate';


const uploadAttachments = async (files: File[]) => {
  const tasks: Promise<UploadFileResult>[] = [];
  for (const i in files) {
    tasks.push(uploadAttchment(files[i]));
  }

  const urls = await Promise.all(tasks).then((res) => {
    return res.map(item => item.Location);
  })

  return urls;
}

export const createDto = async (type: ApprovalType, form: FormState) => {

  const attachments = await uploadAttachments(form.attachments.value);

  const validationSchema = createValidationSchema(type);

  const baseDto = {
    attachments: attachments,
    flow: Object.keys(form.flow).reduce((acc, key) => {
      acc[key] = form.flow[key].map(item => item.uuid)
      return acc;
    }, {})
  }

  let dto: Object | null = null;

  switch (type) {
    case "LEAVE":
      dto = Object.assign(baseDto, {
        leave_type: form.leave_type.value,
        contact: form.contact.value,
        leave_reason: form.leave_reason.value,
        start_time: dayTransfer(form.start_time.value),
        end_time: dayTransfer(form.end_time.value),
      })
      break;
    case "OVERTIME":
      dto = Object.assign(baseDto, {
        overtime_type: form.overtime_type.value,
        overtime_reason: form.overtime_reason.value,
        contact: form.contact.value,
        start_time: dayTransfer(form.start_time.value),
        end_time: dayTransfer(form.end_time.value),
      });
      break;
    case "REIMEUBRSEMENT":
      dto = Object.assign(baseDto, {
        reimbursement_type: form.reimbursement_type.value,
        reimbursement_reason: form.reimbursement_reason.value,
        amount: form.amount.value,
        contact: form.contact.value,
      });
      break;
    case "BUSINESS_TRIP":
      dto = Object.assign(baseDto, {
        destination: form.destination.value,
        trip_reason: form.trip_reason.value,
        start_time: dayTransfer(form.start_time.value),
        contact: form.contact.value,
        end_time: dayTransfer(form.end_time.value),
      });
      break;
  }

  try {
    await validationSchema.validate(dto);
    return dto;
  } catch (err) {
    throw makeErrorMsg(err.errors?.[0], err.errors?.[0]);
  }
}

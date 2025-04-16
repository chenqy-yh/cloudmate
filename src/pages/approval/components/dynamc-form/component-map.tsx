// type FieldType = 'picker' | 'datepicker' | 'imagepicker' | 'input' | 'textarea' | 'flow'

import Picker from "../picker/common";
import DatePicker from "../picker/date";
import ImagePicker from "../picker/image";
import Input from "../text/input";
import Textarea from "../text/textarea";
import Flow from "../flow";
import { FieldType } from ".";

export const ComponentMap: Record<FieldType, React.FC> = {
  picker: Picker,
  datepicker: DatePicker,
  imagepicker: ImagePicker,
  input: Input,
  textarea: Textarea,
  flow: Flow,
};

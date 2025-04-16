import { InputProps as _InputProps } from '@tarojs/components';
import { SelectorItemValue } from '../picker/common';

export type PropItem = { value: string, onChange: string }

export type ValuePipe = (new_val: any) => any;

type FieldType = 'picker' | 'datepicker' | 'imagepicker' | 'input' | 'textarea' | 'flow'

type ComponentProps = {
  'picker': {
    title: string;
    placeholder: string;
    selector: { label: string, value: SelectorItemValue }[];
  },
  'textarea': {
    title: string;
    placeholder: string;
  },
  'datepicker': {
    title: string;
    placeholder: string;
  },
  'input': {
    title: string;
    placeholder: string;
    maxlength?: number;
    type: keyof _InputProps.Type
  },
  'imagepicker': {
    title: string;
    placeholder: string;
  }
  'flow': {}
}


export type Field<T extends FieldType = FieldType> = {
  field_type: T
  key: string,
  prop_map: PropItem[];
  init_value: Record<string, any>;
  pipe: Record<string, ValuePipe>;
  important?: boolean;
} & ComponentProps[T]


export type FormConfig = {
  title: string;
  fields?: Field[];
}

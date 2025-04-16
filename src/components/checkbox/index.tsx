import classNames from "classnames";
import React, { ReactNode } from "react";
import Radio from "../radio";
import styles from "./index.module.scss";

export type CheckboxOption<T> = {
  label: string;
  value: T;
  node: ReactNode;
};

export type CheckBoxProps<T> = {
  itemClassName?: string;
  options: CheckboxOption<T>[];
  selected_list: T[];
  onChange: (selected_list: T[]) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const CheckBox = <T extends any>(props: CheckBoxProps<T>) => {
  const { itemClassName, className, options, selected_list } = props;

  const handleChange = (checked: boolean, value: T) => {
    if (checked) {
      props.onChange([...selected_list, value]);
    } else {
      props.onChange(selected_list.filter((item) => item !== value));
    }
  };

  return (
    <div className={className}>
      {options.map((option, index) => {
        return (
          <Radio
            key={index}
            className={classNames(styles.checkbox_item, itemClassName)}
            checked={selected_list.includes(option.value)}
            onChange={(checked) => handleChange(checked, option.value)}
          >
            {option.node}
          </Radio>
        );
      })}
    </div>
  );
};

export default CheckBox;

import { Input, InputProps as _InputProps } from "@tarojs/components";
import { useState } from "react";
import styles from "./index.module.scss";

export type InputProps = {
  title: string;
  value?: string;
  placeholder?: string;
  important?: boolean;
} & _InputProps;

const Text: React.FC<InputProps> = (props) => {
  const {
    important,
    title,
    value = "",
    maxlength = 30,
    placeholder = "请输入",
    onInput,
    ...rest
  } = props;

  const [inner_val, setInnerVal] = useState(value);

  const handleInput = (e) => {
    setInnerVal(e.detail.value);
    onInput?.(e);
  };

  return (
    <div className={styles.text}>
      <div className={styles.star}>{important ? "*" : null}</div>
      <div className={styles.text_bar}>
        <div className={styles.title}>{title}</div>
        <Input
          className={styles.inner_input}
          placeholderClass={styles.placeholder}
          value={inner_val}
          onInput={handleInput}
          placeholder={placeholder}
          maxlength={maxlength}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Text;

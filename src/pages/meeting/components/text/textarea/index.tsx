import { Textarea, TextareaProps as _TextareaProps } from "@tarojs/components";
import { useState } from "react";
import styles from "./index.module.scss";

export type TextareaProps = {
  title: string;
  placeholder?: string;
  important?: boolean;
} & _TextareaProps;

const Desc: React.FC<TextareaProps> = (props) => {
  const {
    important,
    title,
    value = "",
    maxlength = 1000,
    placeholder = "请描述",
    onInput,
  } = props;

  const [inner_val, setInnerVal] = useState(value);

  const handleInput = (e) => {
    setInnerVal(e.detail.value);
    onInput?.(e);
  };

  return (
    <div className={styles.desc}>
      <div className={styles.star}>{important ? "*" : null}</div>
      <div className={styles.desc_bar}>
        <div className={styles.title}>{title}</div>
        <Textarea
          className={styles.textarea}
          placeholderClass={styles.placeholder}
          value={inner_val}
          onInput={handleInput}
          placeholder={placeholder}
          maxlength={maxlength}
        />
        <div className={styles.counter}>
          {inner_val.length + "/" + maxlength}
        </div>
      </div>
    </div>
  );
};

export default Desc;

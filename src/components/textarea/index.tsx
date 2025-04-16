import { Textarea, TextareaProps } from "@tarojs/components";
import { useMemo, useState } from "react";
import styles from "./index.module.scss";

type TextareaAutoSizeProps = {
  value: string;
} & TextareaProps;

const TextareaAutoSize: React.FC<TextareaAutoSizeProps> = (props) => {
  const { value, ...rest } = props;

  const [row_num, setRowNum] = useState(0);

  const { line_height } = useMemo(() => {
    const line_height = 3;
    return {
      line_height,
    };
  }, []);

  const handleLineChange = (e) => {
    setRowNum(e.mpEvent.detail.lineCount);
  };

  return (
    <Textarea
      className={styles.text_area}
      onLineChange={handleLineChange}
      style={{
        lineHeight: `${line_height}vh`,
        height: `${row_num * line_height}vh`,
        maxHeight: "20vh",
      }}
      value={value}
      maxlength={2000}
      showConfirmBar={false}
      {...rest}
    />
  );
};

export default TextareaAutoSize;

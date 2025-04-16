import classNames from "classnames";
import React, { ReactNode } from "react";
import Icon from "../icon/common";
import styles from "./index.module.scss";

type RadioProps = {
  children: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

const Radio: React.FC<RadioProps> = (props) => {
  const { className, children, checked, onChange, ...rest } = props;

  return (
    <div
      className={classNames(className, styles.radio)}
      onClick={() => onChange?.(!checked)}
      {...rest}
    >
      <div className={styles.check_wrapper}>
        <Icon icon={checked ? "check" : "circle"} size={25} />
      </div>
      <div className={styles.label}>{children}</div>
    </div>
  );
};

export default Radio;

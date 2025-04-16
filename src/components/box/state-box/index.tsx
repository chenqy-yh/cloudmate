import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./index.module.scss";

type States = Record<string, ReactNode>;

type StateBoxProps = {
  states: States;
  value: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const StateBox: React.FC<StateBoxProps> = (props) => {
  const { children, value, states, className, ...rest } = props;

  const cls = classNames(styles.loading_box, className);

  return (
    <div className={cls} {...rest}>
      {states[value] ? states[value] : children}
    </div>
  );
};

export default StateBox;

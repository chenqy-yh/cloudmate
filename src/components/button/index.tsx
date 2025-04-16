import classNames from "classnames";
import styles from "./index.module.scss";

type IButtonType = "primary" | "danger" | "common";

type IButtonProps = {
  type: IButtonType;
  children: React.ReactNode;
  long?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const IButton: React.FC<IButtonProps> = (props) => {
  const { children, type, long = false, ...rest } = props;

  return (
    <div
      className={classNames(styles.button_wrapper, {
        [styles[type]]: true,
        [styles.long]: long,
      })}
      {...rest}
    >
      {children}
    </div>
  );
};

export default IButton;

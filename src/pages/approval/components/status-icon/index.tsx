import { ApprovalStatus } from "@/pages/approval/types";
import classNames from "classnames";
import Icon from "../../../../components/icon/common";
import styles from "./index.module.scss";

type StatusIconProps = {
  status: ApprovalStatus;
};

const StatusIcon: React.FC<StatusIconProps> = (props) => {
  const { status } = props;
  if (status !== "APPROVED" && status !== "REJECTED") {
    return null;
  }
  const icon = status === "APPROVED" ? "check-2" : "close-3";

  return (
    <div
      className={classNames(styles.icon_wrapper, {
        [styles[status]]: true,
      })}
    >
      <Icon icon={icon} size={15} className={styles.icon} />
    </div>
  );
};

export default StatusIcon;

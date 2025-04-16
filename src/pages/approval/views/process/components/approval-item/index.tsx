import Avatar from "@/components/avatar";
import {
  APPROVAL_STATUS_TRANSFER,
  APPROVAL_TYPE_TRANSFER,
} from "@/pages/approval/config/constants";
import { ApprovalEntity } from "@/pages/approval/types";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

export type ApprovalProcessItemProps = {
  approval: ApprovalEntity;
};

const ApprovalProcessItem: React.FC<ApprovalProcessItemProps> = (props) => {
  const { approval } = props;
  const { approval_code, initiator, created_at, status, type } = approval;

  const navigate = useNavigate();

  const navigateToDetail = () => {
    navigate(`/approval/detail?code=${approval_code}&ap_type=${type}`);
  };

  return (
    <div className={styles.approval_item} onClick={navigateToDetail}>
      <div className={styles.title}>
        <Avatar username={initiator.name} src={initiator.avatar} size={25} />
        <span>{`${initiator.name}提交的[${APPROVAL_TYPE_TRANSFER[type]}]审批申请`}</span>
      </div>
      <div>昵称:{initiator.name}</div>
      <div>{`创建时间:${new Date(created_at).toLocaleString()}`}</div>
      <div
        className={classNames(styles.status, {
          [styles[status]]: true,
        })}
      >{`审批${APPROVAL_STATUS_TRANSFER[status]}`}</div>
    </div>
  );
};

export default ApprovalProcessItem;

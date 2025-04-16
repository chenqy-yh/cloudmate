import Avatar from "@/components/avatar";
import Timeline from "@/components/time-line";
import StatusIcon from "@/pages/approval/components/status-icon";
import { APPROVAL_STATUS_TRANSFER } from "@/pages/approval/config/constants";
import { ApprovalStep } from "../..";
import styles from "./index.module.scss";

type FlowProps = {
  approval_steps: Array<ApprovalStep>;
  cc_user: Array<UserInfo>;
};

const Flow: React.FC<FlowProps> = (props) => {
  const { approval_steps, cc_user } = props;

  return (
    <div className={styles.flow}>
      <div className={styles.title}>流程</div>
      <Timeline>
        {approval_steps
          .sort((a, b) => a.step_order - b.step_order)
          .map((item) => (
            <Timeline.Item
              key={item.step_order}
              dotEl={
                <Avatar
                  username={item.approver.name}
                  src={item.approver.avatar}
                  bottomRightTag={<StatusIcon status={item.status} />}
                />
              }
            >
              <div className={styles.approval_step}>
                <div className={styles.title}>审批人</div>
                <div className={styles.approval_step_info}>
                  <div>{item.approver.name}</div>
                  <div>{"(" + APPROVAL_STATUS_TRANSFER[item.status] + ")"}</div>
                </div>
              </div>
            </Timeline.Item>
          ))}
        {cc_user.length > 0 && (
          <Timeline.Item>
            <div className={styles.cc_title}>抄送人</div>
            <div className={styles.cc_list}>
              {cc_user.map((item) => (
                <div key={item.uuid} className={styles.cc_item}>
                  <Avatar username={item.name} />
                  <div className={styles.cc_item_info}>
                    <div>{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </Timeline.Item>
        )}
      </Timeline>
    </div>
  );
};

export default Flow;

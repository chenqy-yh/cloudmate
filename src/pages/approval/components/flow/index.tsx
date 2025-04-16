import { getWorkflowParticipants } from "@/apis/approval";
import InnerTimeline from "@/components/time-line";
import { error } from "@/utils/common";
import { useEffect, useState } from "react";
import PartPicker, { Part } from "./components";
import styles from "./index.module.scss";

export type FlowProps = {
  important?: boolean;
  selected_approvar_parts?: Part[];
  selected_cc_parts?: Part[];
  onChangeApprovarParts?: (selected_approvar_parts: Part[]) => void;
  onChangeCCParts?: (selected_cc_parts: Part[]) => void;
};

const Flow: React.FC<FlowProps> = (props) => {
  const {
    important,
    selected_approvar_parts = [],
    selected_cc_parts = [],
    onChangeApprovarParts,
    onChangeCCParts,
  } = props;

  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    const fetchWorkflowParticipants = async () => {
      try {
        const res = await getWorkflowParticipants();
        setParts(res.data);
      } catch (err) {
        error("获取列表失败");
        console.error(err);
      }
    };
    fetchWorkflowParticipants();
  }, []);

  const handleSelectApprovarPartsChange = (selected_approvar_parts) => {
    onChangeApprovarParts?.(selected_approvar_parts);
  };

  const handleSelectCCPartsChange = (selected_cc_parts) => {
    onChangeCCParts?.(selected_cc_parts);
  };

  return (
    <div className={styles.flow}>
      <div className={styles.star}>{important ? "*" : null}</div>
      <div className={styles.flow_bar}>
        <div className={styles.title}>流程</div>
        <InnerTimeline>
          <InnerTimeline.Item>
            <PartPicker
              title="审批人"
              placeholder="请选择审批人"
              parts={parts}
              selected_parts={selected_approvar_parts}
              edit_page_config={{
                title: "审批人",
                desc: `${selected_approvar_parts.length}人依次审批`,
              }}
              onChange={handleSelectApprovarPartsChange}
            />
          </InnerTimeline.Item>
          <InnerTimeline.Item>
            <PartPicker
              title="抄送人"
              placeholder="请选择抄送人"
              parts={parts}
              selected_parts={selected_cc_parts}
              edit_page_config={{
                title: "抄送人",
                desc: `抄送${selected_cc_parts.length}人`,
              }}
              onChange={handleSelectCCPartsChange}
            />
          </InnerTimeline.Item>
        </InnerTimeline>
      </div>
    </div>
  );
};

export default Flow;

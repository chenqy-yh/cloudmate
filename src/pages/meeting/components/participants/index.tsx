import { getWorkflowParticipants } from "@/apis/approval"
import { error } from "@/utils/common"
import { useEffect, useState } from "react"
import PartPicker, { Part } from "./components"
import styles from "./index.module.scss"

export type ParticipantsProps = {
  important?: boolean
  selected_parts?: Part[]
  onChangeParts?: (selected_approvar_parts: Part[]) => void
}

const Participants: React.FC<ParticipantsProps> = (props) => {
  const { important, selected_parts = [], onChangeParts } = props

  const [parts, setParts] = useState<Part[]>([])

  useEffect(() => {
    const fetchWorkflowParticipants = async () => {
      try {
        const res = await getWorkflowParticipants()
        setParts(res.data)
      } catch (err) {
        error("获取列表失败")
        console.error(err)
      }
    }
    fetchWorkflowParticipants()
  }, [])

  const handleSelectApprovarPartsChange = (selected_approvar_parts) => {
    onChangeParts?.(selected_approvar_parts)
  }

  return (
    <div className={styles.body}>
      <div className={styles.star}>{important ? "*" : null}</div>
      <PartPicker
        title="参与者"
        placeholder="请选择参与者"
        parts={parts}
        selected_parts={selected_parts}
        edit_page_config={{
          title: "参与者",
          desc: `共${selected_parts.length}人参与会议`,
        }}
        onChange={handleSelectApprovarPartsChange}
      />
    </div>
  )
}

export default Participants

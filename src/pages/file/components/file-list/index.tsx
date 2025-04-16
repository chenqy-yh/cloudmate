import StateBox from "@/components/box/state-box"
import Icon from "@/components/icon/common"
import classNames from "classnames"
import { useContext } from "react"
import { FileContext } from "../../context"
import FileItem from "./components/file-item"
import styles from "./index.module.scss"

type FileListProps = {
  file_list: FileItem[]
}

const Empty = () => (
  <div className={styles.state_view}>
    <Icon icon="empty" size={120} />
  </div>
)

const FileList: React.FC<FileListProps> = (props) => {
  const { file_list } = props

  const { layout_mode } = useContext(FileContext)

  const file_list_cls = classNames(styles.file_list, layout_mode === "grid" ? styles.layout_grid : styles.layout_list)

  const state = file_list.length === 0 ? "empty" : ""

  return (
    <StateBox value={state} states={{ empty: <Empty /> }} className={file_list_cls}>
      {file_list.map((file) => (
        <FileItem file={file} key={file.key} />
      ))}
    </StateBox>
  )
}

export default FileList

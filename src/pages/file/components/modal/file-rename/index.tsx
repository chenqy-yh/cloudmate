import { moveFile } from "@/apis/share"
import { FileContext } from "@/pages/file/context"
import { selectPath } from "@/store/selectors/file"
import { error, success } from "@/utils/common"
import { Button, Input } from "@tarojs/components"
import { useCallback, useContext, useState } from "react"
import { useSelector } from "react-redux"
import styles from "./index.module.scss"

type FileRenameProps = {}

const FileRename: React.FC<FileRenameProps> = () => {
  const { edit_file, setModalType, refresh } = useContext(FileContext)

  const [file_name, setFileName] = useState(edit_file?.key)

  const path = useSelector(selectPath)

  const handleInput = (e) => {
    setFileName(e.target.value)
  }

  const handleCancel = useCallback(() => {
    setModalType("")
  }, [setModalType])

  const handleConfirm = useCallback(async () => {
    if (!edit_file) {
      error("文件不存在")
      setModalType("")
      return
    }
    const source = edit_file.prefix
    const target = path + file_name
    try {
      await moveFile(source, target)
      success("重命名成功")
      setModalType("")
      refresh()
    } catch (err) {
      error(err.name)
      console.error(err.message)
    }
  }, [edit_file, file_name, path, refresh, setModalType])

  return (
    <div className={styles.file_rename}>
      <div className={styles.title}>重命名该文件</div>
      <div className={styles.content}>
        <Input type="text" value={file_name} onInput={handleInput} className={styles.input} />
      </div>
      <div className={styles.actions}>
        <Button onClick={handleCancel}>取消</Button> <Button onClick={handleConfirm}>确定</Button>{" "}
      </div>
    </div>
  )
}

export default FileRename

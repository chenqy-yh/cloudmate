import ActionSheet from "@/components/action-sheet"
import LoadingBox from "@/components/loading/box"
import Modal from "@/components/modal"
import { selectFileList } from "@/store/selectors/file"
import { useState } from "react"
import { useSelector } from "react-redux"
import Breadcrumbs from "../../components/breadcrumbs"
import FileList from "../../components/file-list"
import Tools from "../../components/tools"
import { FileContext } from "../../context"
import { useFetchFileList } from "../../hooks/use-fetch-flie-fist"
import { usePopupManager } from "../../hooks/use-popup-manager"

const MainContent = () => {
  const [version, setVersion] = useState(0)

  const [layout_mode, setLayoutMode] = useState<"list" | "grid">("list")

  const [edit_file, setEditFile] = useState<null | FileItem>(null)

  const { loading, setLoading } = useFetchFileList(version)

  const { popup_context, render, onClose } = usePopupManager()

  const file_list = useSelector(selectFileList)

  const refresh = () => {
    setVersion((prev) => prev + 1)
  }
  return (
    <>
      <FileContext.Provider
        value={{
          loading,
          setLoading,
          edit_file,
          setEditFile,
          layout_mode,
          setLayoutMode,
          refresh,
          ...popup_context,
        }}
      >
        <Tools />
        <LoadingBox load={loading}>
          <Breadcrumbs />
          <FileList file_list={file_list} />
        </LoadingBox>
        <ActionSheet isOpened={!!popup_context.action_sheet_type} onClose={onClose.handleActionSheetClose}>
          {render.actionSheetComponentRender()}
        </ActionSheet>
        <Modal visible={!!popup_context.modal_type} onClose={onClose.handleModalClose}>
          {render.modelComponentRender()}
        </Modal>
      </FileContext.Provider>
    </>
  )
}

export default MainContent

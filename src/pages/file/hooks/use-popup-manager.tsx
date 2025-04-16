import { useCallback, useState } from "react";
import EditFile from "../components/action-sheet/edit-file";
import NewFolder from "../components/action-sheet/new-folder";
import FileRename from "../components/modal/file-rename";

export const usePopupManager = () => {
  const [action_sheet_type, setActionSheetType] = useState<ActionSheetType>("");
  const [modal_type, setModalType] = useState<ModalType>("" as ModalType);

  const actionSheetComponentRender = useCallback(() => {
    if (action_sheet_type === "edit_file") {
      return <EditFile />;
    } else if (action_sheet_type === "new_folder") {
      return <NewFolder />;
    }
    return null;
  }, [action_sheet_type]);

  const modelComponentRender = useCallback(() => {
    if (modal_type === "rename") {
      return <FileRename />;
    }
    return null;
  }, [modal_type]);

  const handleActionSheetClose = () => {
    setActionSheetType("");
  };

  const handleModalClose = () => {
    setModalType("");
  };

  return {
    popup_context: {
      action_sheet_type,
      setActionSheetType,
      modal_type,
      setModalType,
    },
    render: {
      actionSheetComponentRender,
      modelComponentRender,
    },
    onClose: {
      handleActionSheetClose,
      handleModalClose,
    },
  };
};

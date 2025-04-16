type FileItem = {
  key: string;
  prefix: string;
  size: string;
  lastModified?: string;
  isDir: boolean
}


type ActionSheetType =
  | ""
  | "edit_file"
  | "new_folder"

type ModalType = "" | "rename";

type FileContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  action_sheet_type: ActionSheetType;
  setActionSheetType: React.Dispatch<React.SetStateAction<ActionSheetType>>;

  modal_type: ModalType;
  setModalType: React.Dispatch<React.SetStateAction<ModalType>>;

  edit_file: null | FileItem;
  setEditFile: React.Dispatch<React.SetStateAction<null | FileItem>>;

  layout_mode: "list" | "grid";
  setLayoutMode: React.Dispatch<React.SetStateAction<"list" | "grid">>;

  refresh: () => void;
};

type UploadFileResult={
  ETag: string;
  Location: string;
  RequestId: string;
  statusCode: number;
}

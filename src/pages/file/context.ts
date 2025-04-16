import { createContext } from "react";

export const FileContext = createContext<FileContextType>({
  loading: false,
  setLoading: () => { },

  action_sheet_type: "",
  setActionSheetType: () => { },

  modal_type: "",
  setModalType: () => { },

  edit_file: null,
  setEditFile: () => { },

  layout_mode: 'list',
  setLayoutMode: () => { },

  refresh: () => { },

});

import { createSlice } from "@reduxjs/toolkit";


type FileState = {
  path: string,
  file_list: FileItem[],
  file_state: {
    fetch: boolean;
    uploadfile: boolean;
    newfolder: boolean;
    rename: boolean;
    delete: boolean;
  }
}

const initialState: FileState = {
  path: '',
  file_list: [],
  file_state: {
    fetch: false,
    uploadfile: false,
    newfolder: false,
    rename: false,
    delete: false,
  }
}

export const file_slice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
    backDir: (state) => {
      state.path = state.path.split('/').slice(0, -2).concat("").join('/');
    },
    backToRoot: (state) => {
      state.path = '';
    },
    setFileList: (state, action) => {
      const file_list = action.payload as FileItem[]
      state.file_list = file_list.sort((a, b) => {
        if (a.isDir && !b.isDir) {
          return -1;
        } else if (!a.isDir && b.isDir) {
          return 1;
        } else {
          return a.key.localeCompare(b.key);
        }
      })
    },
    setFileState: (state, action) => {
      const { state_type, value } = action.payload;
      state.file_state[state_type] = value;
    }
  },
})

export const { setPath, backDir, backToRoot, setFileList } = file_slice.actions;

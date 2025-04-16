import { RootState } from '../index'

export const selectPath = (state: RootState) => state.file.path;

export const selectFileList = (state: RootState) => state.file.file_list;

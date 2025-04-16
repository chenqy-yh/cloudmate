import { GET_SUCCESS } from "@/apis/constants";
import { getFileDownloadUrl } from "@/apis/share";
import { setPath } from "@/store/reducers/file";
import { debounce, error } from "@/utils/common";
import { makeErrorMsg } from "@/utils/error";
import Taro from "@tarojs/taro";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch } from "react-redux";
import { doc_suffix, img_suffix, media_suffix, zip_suffix } from "../utils";

type FileHandlerArgs = {
  file: FileItem,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const useFileHandler = (args: FileHandlerArgs) => {
  const { file, loading, setLoading } = args;

  const dispatch = useDispatch();

  const getIcon = useCallback(() => {
    if (file.isDir) return "icon-folder";
    const suffix = file.key.split(".").pop()?.toLowerCase();
    if (!suffix) return "file-icon";
    if (img_suffix.includes(suffix)) return "icon-image";
    if (doc_suffix.includes(suffix)) return "icon-word";
    if (media_suffix.includes(suffix)) return "icon-video";
    if (zip_suffix.includes(suffix)) return "icon-zip";
    return "file-icon";
  }, [file]);

  const handleTap = useCallback(
    debounce(async () => {
      if (loading) return;
      if (file.isDir) {
        dispatch(setPath(file.prefix));
        return;
      }

      const suffix = file.key.split(".").pop()?.toLowerCase();
      if (!suffix) return error("文件格式不支持预览");

      try {
        setLoading(true);
        const { data: url } = await getFileDownloadUrl(file.prefix);
        if (img_suffix.includes(suffix)) {
          return Taro.previewImage({ urls: [url], current: url });
        }
        if (doc_suffix.includes(suffix) || media_suffix.includes(suffix)) {
          return await Taro.downloadFile({
            url,
            success: (res) => {
              if (res.statusCode === GET_SUCCESS) {
                Taro.openDocument({
                  filePath: res.tempFilePath,
                  fileType: suffix as keyof Taro.openDocument.FileType,
                });
              }
            },
            fail: (err) => {
              throw makeErrorMsg("文件预览失败", err);
            },
          });
        }
        error("文件格式不支持预览");
      } catch (err) {
        error(err.name);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }, 2000),
    [file, loading, dispatch]
  );

  return { getIcon, handleTap };
};

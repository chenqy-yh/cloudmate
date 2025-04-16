import { GET_SUCCESS } from "@/apis/constants";
import {
  deleteFile as deleteFileApi,
  deleteFolder as deleteFolderApi,
  getFileDownloadUrl,
} from "@/apis/share";
import Icon from "@/components/icon/common";
import { FileContext } from "@/pages/file/context";
import { error, success } from "@/utils/common";
import { makeErrorMsg } from "@/utils/error";
import Taro from "@tarojs/taro";
import { useCallback, useContext } from "react";
import styles from "./index.module.scss";

// 类型定义
interface ActionItemProps {
  icon: IconName<"svg">;
  name: string;
  onClick: () => void;
}

interface FileContextType {
  edit_file?: {
    prefix: string;
    key: string;
    isDir: boolean;
  };
  refresh: () => void;
  setActionSheetType: (type: string) => void;
  setModalType: (type: string) => void;
}

// ActionItem 组件
const ActionItem = ({ icon, name, onClick }: ActionItemProps) => (
  <div className={styles.action} onClick={onClick}>
    <Icon icon={icon} size={30} className={styles.action_icon} />
    <div className={styles.action_name}>{name}</div>
  </div>
);

// 文件操作服务
const fileOperations = {
  forward: async (file: NonNullable<FileContextType["edit_file"]>) => {
    try {
      const { data: url } = await getFileDownloadUrl(file.prefix);
      const res = await Taro.downloadFile({ url });

      if (res.statusCode !== GET_SUCCESS)
        throw makeErrorMsg("下载文件失败", res);

      await Taro.shareFileMessage({
        filePath: res.tempFilePath,
        fileName: file.key,
      });
    } catch (err) {
      error(err.name);
      console.error(err.message);
    }
  },

  rename: (setModalType: (type: string) => void) => {
    setModalType("rename");
  },

  delete: async (
    file: NonNullable<FileContextType["edit_file"]>,
    refresh: () => void
  ) => {
    try {
      const api = file.isDir ? deleteFolderApi : deleteFileApi;
      await api(file.prefix);
      success(`删除${file.isDir ? "文件夹" : "文件"}成功`);
      refresh();
    } catch (err) {
      error(err.name);
      console.error("删除失败:", err.message);
    }
  },
};

// 主组件
const EditFile = () => {
  const context = useContext(FileContext) as FileContextType;
  const { edit_file, refresh, setActionSheetType, setModalType } = context;

  const handleAction = useCallback(
    (action: "forward" | "rename" | "delete") => {
      if (!edit_file) return;

      setActionSheetType(""); // 重置动作表类型 CLOSE ACTION SHEET

      const actions = {
        forward: () => fileOperations.forward(edit_file),
        rename: () => fileOperations.rename(setModalType),
        delete: () => fileOperations.delete(edit_file, refresh),
      };

      actions[action]?.();
    },
    [edit_file, refresh, setActionSheetType, setModalType]
  );

  if (!edit_file) return null;

  return (
    <div className={styles.actions}>
      {/* 文件信息展示 */}
      <div className={styles.action}>
        <Icon
          icon={edit_file.isDir ? "dir-icon" : "file-icon"}
          className={styles.action_icon}
          size={40}
        />
        <div className={styles.action_name}>{edit_file.key}</div>
      </div>

      {/* 文件操作选项 */}
      {!edit_file.isDir && (
        <>
          <ActionItem
            icon="forward"
            name="转发给朋友"
            onClick={() => handleAction("forward")}
          />
          <ActionItem
            icon="input-field"
            name="重命名"
            onClick={() => handleAction("rename")}
          />
        </>
      )}
      <ActionItem
        icon="delete"
        name="删除"
        onClick={() => handleAction("delete")}
      />
    </div>
  );
};

export default EditFile;

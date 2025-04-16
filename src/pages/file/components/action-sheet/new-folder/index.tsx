import { createDirectory } from "@/apis/share";
import { FileContext } from "@/pages/file/context";
import { selectFileList, selectPath } from "@/store/selectors/file";
import { error } from "@/utils/common";
import { makeErrorMsg } from "@/utils/error";
import { Input } from "@tarojs/components";
import classNames from "classnames";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

const NewFolder = () => {
  const [folder_name, setFolderName] = useState("");

  const { setActionSheetType, refresh } = useContext(FileContext);

  const file_list = useSelector(selectFileList);
  const file_path = useSelector(selectPath);

  const handleInput = (e) => {
    setFolderName(e.target.value);
  };

  const handleCancel = () => {
    setActionSheetType("");
  };

  const handleConfirm = async () => {
    try {
      await createDirectory(
        file_path + "*",
        file_path + folder_name + "/"
      );
    } catch (err) {
      error(err.name);
      console.error(err.message);
    } finally {
      setActionSheetType("");
      setFolderName("");
      refresh();
    }
  };

  const canCreate =
    !!folder_name.trim() && file_list.every((item) => item.key !== folder_name);

  const confirm_cls = classNames(styles.btn, { [styles.disabled]: !canCreate });

  return (
    <div className={styles.new_folder}>
      <div className={styles.title}>新建文件夹(文件夹名称不可更改)</div>
      <Input
        type="text"
        autoFocus
        value={folder_name}
        className={styles.input}
        onInput={handleInput}
      />
      <div className={styles.btns}>
        {canCreate}
        <div className={styles.btn} onClick={handleCancel}>
          取消
        </div>
        <div
          className={confirm_cls}
          onClick={canCreate ? handleConfirm : () => {}}
        >
          确定
        </div>
      </div>
    </div>
  );
};

export default NewFolder;

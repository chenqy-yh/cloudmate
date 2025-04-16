import Icon from "@/components/icon/common";
import { FileContext } from "@/pages/file/context";
import { useFileHandler } from "@/pages/file/hooks/use-file-handler";
import { View } from "@tarojs/components";
import classNames from "classnames";
import { useContext } from "react";
import styles from "./index.module.scss";

type FileItemProps = {
  file: FileItem;
};

const FileItem: React.FC<FileItemProps> = (props) => {
  const { file } = props;

  const { loading, layout_mode, setLoading, setActionSheetType, setEditFile } =
    useContext(FileContext) || {};

  const file_item_cls = classNames(styles.file_item, {
    [styles.file_item_grid]: layout_mode === "grid",
    [styles.file_item_list]: layout_mode === "list",
  });

  const { getIcon, handleTap } = useFileHandler({ file, loading, setLoading });

  const handleClickMore: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setEditFile(file);
    setActionSheetType("edit_file");
  };

  const handleLongTap = () => {
    setEditFile(file);
    setActionSheetType("edit_file");
  };

  return (
    <View
      className={file_item_cls}
      onTap={handleTap}
      onLongPress={handleLongTap}
    >
      <div className={styles.file_item_icon_container}>
        <Icon icon={getIcon()} className={styles.file_item_icon} size={40} />
      </div>
      <div className={styles.file_item_detail}>
        <div className={styles.file_item_name}>{file.key}</div>
        {layout_mode === "list" && (
          <>
            <div className={styles.file_item_date}>{file.lastModified}</div>
            <div className={styles.file_item_more} onClick={handleClickMore}>
              <Icon icon="more-2" size={20} />
            </div>
          </>
        )}
      </div>
    </View>
  );
};

export default FileItem;

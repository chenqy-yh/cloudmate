import { uploadFile } from "@/apis/share";
import Icon from "@/components/icon/common";
import Popover from "@/components/popover";
import { backDir } from "@/store/reducers/file";
import { selectPath } from "@/store/selectors/file";
import { error, success } from "@/utils/common";
import { makeErrorMsg } from "@/utils/error";
import Taro from "@tarojs/taro";
import { useCallback, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileContext } from "../../context";
import styles from "./index.module.scss";

type OperateItemProps = {
  name: string;
  onClick?: () => void;
};

const Tools = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLayoutMode, setActionSheetType, setLoading, refresh } =
    useContext(FileContext);
  const path = useSelector(selectPath);
  const [isMenuVisible, setMenuVisible] = useState(false);

  // 处理返回上一级目录
  const handleBack = useCallback(() => {
    dispatch(backDir());
  }, [dispatch]);

  // 处理导航到搜索页面
  const handleSearch = useCallback(() => {
    navigate("/file/search");
  }, [navigate]);

  // 处理新建文件夹
  const handleNewFolder = useCallback(() => {
    setActionSheetType("new_folder");
    setMenuVisible(false);
  }, [setActionSheetType]);

  // 切换布局
  const toggleLayout = useCallback(() => {
    setLayoutMode((prev) => (prev === "list" ? "grid" : "list"));
  }, [setLayoutMode]);

  // 处理文件上传
  const handleUploadFile = useCallback(() => {
    Taro.chooseMessageFile({
      type: "all",
      count: 1,
      success: async (res) => {
        const { path: filePath, name: fileName } = res.tempFiles[0];
        try {
          setLoading(true);
          await uploadFile(filePath, `${path}*`, `${path}${fileName}`);
          success("上传成功");
          refresh();
        } catch (err) {
          error(err.name);
          console.error(err.message);
        } finally {
          setLoading(false);
        }
      },
      fail: (err) => {
        throw makeErrorMsg("上传文件失败", err);
      },
      complete: () => setMenuVisible(false),
    });
  }, [path, refresh]);

  const PopoverContent = () => {
    return (
      <div className={styles.context_menu}>
        <OperateItem name="新建文件夹" onClick={handleNewFolder} />

        <OperateItem name="上传文件" onClick={handleUploadFile} />
      </div>
    );
  };

  return (
    <div className={styles.tools}>
      <Icon icon="back" size={35} onClick={handleBack} />

      <div className={styles.search} onClick={handleSearch}>
        <Icon className={styles.search_icon} icon="search" size={20} />
        <div>搜索</div>
      </div>

      <Icon icon="list-1" size={30} onClick={toggleLayout} />

      <Popover
        content={<PopoverContent />}
        placement="bottom-end"
        open={isMenuVisible}
        onOpenChange={setMenuVisible}
        offset={{ x: -20, y: 0 }}
      >
        <Icon icon="more" size={30} />
      </Popover>
    </div>
  );
};

const OperateItem: React.FC<OperateItemProps> = ({ name, onClick }) => (
  <div className={styles.operate_item} onClick={onClick}>
    {name}
  </div>
);

export default Tools;

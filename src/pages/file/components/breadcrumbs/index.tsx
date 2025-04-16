import Icon from "@/components/icon/common";
import { setPath } from "@/store/reducers/file";
import { selectPath } from "@/store/selectors/file";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FileContext } from "../../context";
import styles from "./index.module.scss";

type BreadcrumbItemProps = {
  name: string;
  index: number;
  prefix: string;
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = (props) => {
  const { prefix, name, index } = props;

  const { loading } = useContext(FileContext) || {};
  const dispatch = useDispatch();

  const handleClickBreadcrumb = () => {
    if (loading) return;
    dispatch(setPath(prefix));
  };

  return (
    <div
      className={styles.breadcrumb_item}
      key={index}
      onClick={handleClickBreadcrumb}
    >
      <Icon icon="arrow-right" size={10} />
      <div className={styles.folder}>{name}</div>
    </div>
  );
};

const Breadcrumbs = () => {
  const path = useSelector(selectPath);

  const pathArr = ["", ...path.split("/").slice(0, -1)];

  return (
    <div className={styles.breadcrumbs}>
      <Icon icon="folder-2" size={30} />
      {pathArr.map((item, index) => {
        const prefix = index ? pathArr.slice(1, index + 1).join("/") + "/" : "";
        return (
          <BreadcrumbItem
            key={index}
            name={item ? item : "share"}
            index={index}
            prefix={prefix}
          />
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

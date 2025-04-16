import Icon from "@/components/icon/common";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

type FeatureProps = {
  item: FeatureItem;
};

const Feature: React.FC<FeatureProps> = (props) => {
  const {
    item: { desc, icon, title, path },
  } = props;

  const navigate = useNavigate();

  const handleNavigate = () => {
    path && navigate(path);
  };

  return (
    <div className={styles.feature} onClick={handleNavigate}>
      <Icon icon={icon} size={30} className={styles.icon} />
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{desc}</div>
    </div>
  );
};

export default Feature;

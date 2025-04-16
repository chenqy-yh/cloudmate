import Icon from "../../icon/common";
import styles from "./index.module.scss";

type LoaderProps = {
  version?: number;
};

const Loader: React.FC<LoaderProps> = (props) => {
  const { version = 1 } = props;
  return (
    <Icon
      icon={`loader-${version}` as IconType}
      size={30}
      className={styles.loader}
    />
  );
};

export default Loader;

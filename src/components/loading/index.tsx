import { Image } from "@tarojs/components";
import styles from "./index.module.scss";

const Loader = () => {
  return <Image className={styles.loader} src="../../assets/icon/loader.svg" />;
};

export default Loader;

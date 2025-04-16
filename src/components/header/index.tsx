import Taro from "@tarojs/taro";
import styles from "./index.module.scss";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  const menuBtnPos = Taro.getMenuButtonBoundingClientRect();

  // 获取 scrollTop的距离

  return (
    <div
      className={styles.header_wrapper}
      style={{
        paddingTop: `${menuBtnPos.top}px`,
      }}
    >
      {children}
    </div>
  );
};

export default Header;

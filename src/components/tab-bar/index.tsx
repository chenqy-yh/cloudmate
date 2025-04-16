import { AppDispatch } from "@/store"
import { setActiveIndex as innerSetActiveIndex } from "@/store/reducers/tabbar"
import { activeIndexSelector } from "@/store/selectors/tabbar"
import { Image } from "@tarojs/components"
import cls from "classnames"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { TabbarItemProps, tabbar_item_config } from "./constants"
import styles from "./index.module.scss"
import Icon from "../icon"

const TabbarItem: React.FC<TabbarItemProps> = ({ id, icon, text, path, active, setActiveIndex, navigate }) => {
  const tabbarItemCls = cls(
    {
      [styles.active]: active,
    },
    styles.tabbar_item
  )

  const handleChangeActiveTabbar = () => {
    // 设置激活id
    setActiveIndex(id)
    // 路由跳转页面
    navigate(path)
  }

  return (
    <div className={tabbarItemCls} onClick={() => handleChangeActiveTabbar()}>
      <Icon size={30} icon={(active ? icon.active : icon.default) as any} />
      <div className={styles.tabbar_item_text}>{text}</div>
    </div>
  )
}

const CustomTabbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const activeTabbarIndex = useSelector(activeIndexSelector)

  const tabbarItemBackgroundCls = cls(styles.tabbar_item_background, styles[`index_${activeTabbarIndex}`])

  const handleSetAactiveTabbar = (index: number) => {
    dispatch(innerSetActiveIndex(index))
  }

  const renderTabbarItems = () =>
    tabbar_item_config.map((config) => (
      <TabbarItem key={config.text} {...config} active={config.id === activeTabbarIndex} setActiveIndex={handleSetAactiveTabbar} navigate={navigate} />
    ))

  return (
    <div className={styles.tabbar_body}>
      <div className={tabbarItemBackgroundCls} />
      {renderTabbarItems()}
    </div>
  )
}

export default CustomTabbar

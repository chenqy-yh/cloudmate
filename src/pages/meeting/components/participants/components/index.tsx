import Avatar from "@/components/avatar"
import Icon from "@/components/icon/common"
import classNames from "classnames"
import { useState } from "react"
import EditPage from "./edit-page"
import { PartPickerProps } from "./index.d"
import styles from "./index.module.scss"
import SelectedPage from "./selected-page"

const cls = (s: string) => styles[`part_picker_${s}`]

enum ActiveIndex {
  MAIN = 0,
  SELECT = 1,
  EDIT = 2,
}

const PartPicker: React.FC<PartPickerProps> = ({ className, parts, placeholder, title, selected_parts, onChange, ...rest }) => {
  const [activeIndex, setActiveIndex] = useState(ActiveIndex.MAIN)

  const handleSelectPartChange = (selectedList) => {
    onChange(selectedList)
  }

  const last_selected_part = selected_parts[selected_parts.length - 1]

  const sec_last_selected_part = selected_parts[selected_parts.length - 2]

  const handleRemovePart = (part) => {
    onChange(selected_parts.filter((p) => p !== part))
  }

  // 渲染主界面
  const renderMainView = () => (
    <div className={classNames(cls("body"), className)} {...rest}>
      <div className={cls("title")}>{title}</div>
      <div className={cls("placeholder")}>{placeholder}</div>
      {last_selected_part && (
        <div className={cls("edit_select_parts")}>
          {selected_parts.length > 1 && (
            <>
              {selected_parts.length > 2 ? (
                <Avatar username="全部" size={40} onClick={() => setActiveIndex(ActiveIndex.EDIT)} />
              ) : (
                <Avatar
                  username={sec_last_selected_part.name}
                  src={sec_last_selected_part.avatar}
                  size={40}
                  topRightTag={<Icon className={cls("close")} icon="close-2" size={20} onClick={() => handleRemovePart(sec_last_selected_part)} />}
                />
              )}
              <Icon icon="arrow-right-2" size={30} />
            </>
          )}
          <Avatar
            username={last_selected_part.name}
            src={last_selected_part.avatar}
            size={40}
            topRightTag={<Icon className={cls("close")} icon="close-2" size={20} onClick={() => handleRemovePart(last_selected_part)} />}
          />
          <Icon icon="arrow-right-2" size={30} />
        </div>
      )}
      <Icon icon="add-gray" size={35} className={cls("select")} onClick={() => setActiveIndex(ActiveIndex.SELECT)} />
    </div>
  )

  switch (activeIndex) {
    case ActiveIndex.MAIN:
      return renderMainView()
    case ActiveIndex.SELECT:
      return <SelectedPage onBack={() => setActiveIndex(ActiveIndex.MAIN)} parts={parts} onChange={handleSelectPartChange} selected_parts={selected_parts} />
    case ActiveIndex.EDIT:
      return (
        <EditPage
          title="参与者"
          desc={`共${selected_parts.length}人`}
          separator={<Icon icon="arrow-right-2" size={30} />}
          onBack={() => setActiveIndex(ActiveIndex.MAIN)}
          selected_parts={selected_parts}
          onChange={onChange}
        />
      )
    default:
      throw new Error("[PartPicker] Invalid active index")
  }
}

export default PartPicker
export * from "./index.d"

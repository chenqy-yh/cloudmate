import Icon from "@/components/icon/common"
import Taro from "@tarojs/taro"
import { ReactNode } from "react"
import { Part } from "."
import styles from "./index.module.scss"
import EditAvatar from "./removable-avatar"

type EditPageProps = {
  title: string
  selected_parts: Part[]
  desc: string
  separator: ReactNode
  onBack: () => void
  onChange: (parts: Part[]) => void
}

const cls = (s) => styles[`edit_page_${s}`]

const EditPage: React.FC<EditPageProps> = ({ title, desc, selected_parts, separator, onBack, onChange }) => {
  const menu_btn_pos = Taro.getMenuButtonBoundingClientRect()

  const handleRemovePart = (part) => {
    onChange(selected_parts.filter((p) => p !== part))
  }

  return (
    <div className={cls("body")}>
      <div
        className={cls("header")}
        style={{
          marginTop: menu_btn_pos.top,
          marginBottom: 10,
        }}
      >
        <Icon icon="back" className={cls("header_back")} size={30} onClick={onBack} />
        <div className={cls("header_title")}>{title}</div>
      </div>
      <div className={cls("content")}>
        <div className={cls("desc")}>{desc}</div>
        <div className={cls("detail")}>
          {selected_parts.map((part, index) => (
            <>
              <EditAvatar key={index} username={part.name} avatar={part.avatar} onRemove={() => handleRemovePart(part)} />
              {index !== selected_parts.length - 1 && separator}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EditPage

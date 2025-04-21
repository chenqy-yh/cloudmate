import Avatar from "@/components/avatar"
import CheckBox, { CheckboxOption } from "@/components/checkbox"
import Icon from "@/components/icon/common"
import Radio from "@/components/radio"
import SearchBar from "@/components/search"
import Taro from "@tarojs/taro"
import { useMemo, useState } from "react"
import { Part } from "."
import styles from "./index.module.scss"

type SelectPageProps = {
  selected_parts: Part[]
  onChange: (selected_list: Part[]) => void
  onBack: () => void
  parts: Part[]
}

const cls = (s) => styles[`selected_page_${s}`]

const SelectedPage: React.FC<SelectPageProps> = ({ parts, selected_parts, onBack, onChange }) => {
  const [select_all, setSelectAll] = useState(false)
  const [filter, setFilter] = useState("")

  const { inner_parts, checkbox_options, menu_rect } = useMemo(() => {
    const inner_parts = parts.filter((part) => part.name.includes(filter))
    const checkbox_options = inner_parts.map(
      (part) =>
        ({
          label: part.name,
          value: part,
          node: (
            <div className={cls("checkbox_item_node")}>
              <Avatar src={part.avatar} username={part.name} />
              <div>{part.name}</div>
            </div>
          ),
        } as CheckboxOption<Part>)
    )
    const menu_rect = Taro.getMenuButtonBoundingClientRect()

    return {
      inner_parts,
      checkbox_options,
      menu_rect,
    }
  }, [filter, parts])

  const handleSelectAll = (checked) => {
    setSelectAll(checked)
    onChange(checked ? inner_parts : [])
  }

  const handleCheckBoxChange = (selected_list) => {
    onChange(selected_list)
    setSelectAll(selected_list.length === inner_parts.length)
  }

  const handleSearchBarInput = (e) => {
    setFilter(e.detail.value)
    onChange([])
    setSelectAll(false)
  }

  return (
    <div className={cls("body")}>
      <div
        className={cls("header")}
        style={{
          marginTop: menu_rect.top,
        }}
      >
        <Icon icon="back" className={cls("header_back")} size={30} onClick={onBack} />
        <div className={cls("header_title")}>请选择</div>
      </div>
      <div className={cls("content")}>
        <div className={cls("search_wrapper")}>
          <SearchBar value={filter} placeholder="搜索" onInput={handleSearchBarInput} />
        </div>
        <div className={cls("select_all")}>
          <Radio checked={select_all} onChange={handleSelectAll}>
            全选
          </Radio>
        </div>
        <CheckBox
          itemClassName={cls("checkbox_item")}
          className={cls("checkbox")}
          options={checkbox_options}
          selected_list={selected_parts}
          onChange={handleCheckBoxChange}
        />
      </div>
    </div>
  )
}

export default SelectedPage

import Icon from "@/components/icon/common"
import SearchBar from "@/components/search"
import { selectFileList } from "@/store/selectors/file"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import FileList from "../../components/file-list"
import { doc_suffix, img_suffix, media_suffix } from "../../utils/index"
import styles from "./index.module.scss"

type SearchTypeItemProps = {
  type: string
  icon: IconName<"svg">
  handleSearchType: () => void
}

const SearchTypeItem: React.FC<SearchTypeItemProps> = (props) => {
  const { type, icon, handleSearchType } = props

  return (
    <div className={styles.search_type_item} onClick={() => handleSearchType()}>
      <Icon icon={icon} size={30} />
      <div>{type}</div>
    </div>
  )
}

const SearchFile = () => {
  const file_list = useSelector(selectFileList)

  const [search_key, setSearchKey] = useState("")
  const [target_list, setTargetList] = useState<FileItem[]>(file_list)

  const navigate = useNavigate()

  const handleCancel = useCallback(() => {
    navigate("/file")
  }, [navigate])

  const handleInput = useCallback(
    (e) => {
      setSearchKey(e.target.value)
      setTargetList(file_list.filter((file) => file.key.includes(e.target.value)))
    },
    [file_list]
  )

  const handleSearchType = (suffixs: string[], keep: boolean = true) => {
    setTargetList(() =>
      file_list.filter((file) => {
        const suffix = file.key.split(".").pop()?.toLowerCase()
        return suffix ? suffixs.includes(suffix) !== !keep : false
      })
    )
  }

  return (
    <div className={styles.search_file}>
      <div className={styles.search}>
        {/* <div className={styles.search_input_container}>
          <Icon icon="search" size={20} />
          <Input
            value={search_key}
            focus={true as any}
            className={styles.search_input}
            placeholder="搜索全部内容"
            onInput={handleInput}
          />
        </div> */}
        <SearchBar focus={true as any} value={search_key} className={styles.search_input} placeholder="搜索全部内容" onInput={handleInput} />
        <div className={styles.cancel} onClick={handleCancel}>
          取消
        </div>
      </div>
      <div className={styles.search_type}>
        <SearchTypeItem type="图片" icon="image" handleSearchType={() => handleSearchType(img_suffix)} />
        <SearchTypeItem type="媒体" icon="media" handleSearchType={() => handleSearchType(media_suffix)} />
        <SearchTypeItem type="文档" icon="doc" handleSearchType={() => handleSearchType(doc_suffix)} />
        <SearchTypeItem type="其他" icon="file" handleSearchType={() => handleSearchType([...img_suffix, ...media_suffix, ...doc_suffix], false)} />
      </div>
      <div className={styles.file_list}>
        <FileList file_list={target_list} />
      </div>
    </div>
  )
}

export default SearchFile

import { Image } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { FC } from "react"
import styles from "./index.module.scss"
import Icon from "../icon"

interface FileItem {
  path: string
  size: number
}

export interface File {
  url: string
  file?: FileItem
}

interface ImagePickerProps {
  files: File[]
  onChange: (newFiles: File[]) => void
  maxCount?: number
}

const ImagePicker: FC<ImagePickerProps> = ({ files, onChange, maxCount = 9 }) => {
  const handleAddImage = async () => {
    const remainCount = maxCount - files.length
    if (remainCount <= 0) return

    const res = await Taro.chooseImage({
      count: remainCount,
      sourceType: ["album", "camera"],
    })

    const newFiles: File[] = res.tempFiles.map((f) => ({
      url: f.path,
      file: {
        path: f.path,
        size: f.size,
      },
    }))

    onChange([...files, ...newFiles])
  }

  const handleRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    onChange(newFiles)
  }

  return (
    <div className={styles.container}>
      {files.map((file, index) => (
        <div key={index} className={styles.item}>
          <Image src={file.url} className={styles.image} mode="aspectFill" />
          <Icon className={styles.remove} onClick={() => handleRemove(index)} icon="close-2" size={20} />
        </div>
      ))}
      {files.length < maxCount && (
        <div className={styles.item} onClick={handleAddImage}>
          <div className={styles.add}>＋</div>
        </div>
      )}
    </div>
  )
}

export default ImagePicker

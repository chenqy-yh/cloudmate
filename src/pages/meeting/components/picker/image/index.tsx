import InnerImagePicker, { File } from "@/components/picker/image"
import React from "react"
import styles from "./index.module.scss"

export type ImagePickerProps = {
  important?: boolean
  title: string
  value?: File[]
  onChange: (files: File[]) => void
}

const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const { important, title, value = [], onChange } = props

  return (
    <div className={styles.image_picker}>
      <div className={styles.star}>{important ? "*" : null}</div>
      <div className={styles.image_picker_bar}>
        <div className={styles.title}>{title}</div>
        <InnerImagePicker files={value} onChange={onChange} />
      </div>
    </div>
  )
}

export default ImagePicker

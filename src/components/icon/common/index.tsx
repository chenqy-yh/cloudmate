import { Image, ImageProps } from "@tarojs/components"
import React from "react"

type IconProps<T extends IconType = "svg"> = Omit<{ icon: IconName<T>; size?: number | string; type?: T } & ImageProps, "src">

const remoteUrl = (icon, type) => `https://cloudmate-1300131488.cos.ap-beijing.myqcloud.com/icon/${icon}.${type}`

const Icon = <T extends IconType = "svg">(props: IconProps<T>) => {
  const { icon, size, style, type = "svg", ...rest } = props

  if (Object.keys(rest).includes("src")) {
    throw new Error("src is not allowed in Icon component, please use icon instead.")
  }

  const normalized_style: React.CSSProperties = typeof style === "object" && style !== null ? style : {}

  const size_val = typeof size === "string" ? size : `${size}px`

  const custom_style: React.CSSProperties = {
    ...(size ? { width: size_val, height: size_val } : {}),
    ...normalized_style,
  }

  return <Image src={remoteUrl(icon, type)} {...rest} mode="aspectFit" style={custom_style} />
}

export default Icon

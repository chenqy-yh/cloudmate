import { useEffect, useState } from "react"

export function useAutoScrollToBottom<T extends { _id: string }>(list: T[]) {
  const [scrollIntoView, setScrollIntoView] = useState("")
  const [scrollWithAnimation, setScrollWithAnimation] = useState(false)

  useEffect(() => {
    if (!Array.isArray(list) || list.length === 0) return

    const lastItem = list[list.length - 1]
    if (!lastItem || !lastItem._id) return

    const id = `msg_${lastItem._id}`
    setScrollIntoView(id)

    // 动画延迟触发，防止页面还没渲染完
    const timer = setTimeout(() => {
      setScrollWithAnimation(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [list])

  return {
    scrollIntoView,
    scrollWithAnimation,
  }
}

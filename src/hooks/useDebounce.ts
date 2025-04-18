import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay: number = 300) => {
  const [debounced_value, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
  }, [delay, value])

  return debounced_value
}

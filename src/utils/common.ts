import Taro from "@tarojs/taro"

export const success = (msg, dur = 2000) => {
  Taro.showToast({
    title: msg,
    icon: "success",
    duration: dur
  })
}

export const error = (err, dur = 2000) => {
  Taro.showToast({
    title: err,
    icon: "none",
    duration: dur
  })
}

export const debounce = (fn, delay) => {
  let timer: NodeJS.Timeout | null = null;
  return (...args) => {
    if (timer) return;
    fn(...args);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  }
}

export const withProtocol = (url: string) => url.startsWith("http") ? url : `https://${url}`

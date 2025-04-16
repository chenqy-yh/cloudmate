import Taro, { useLaunch } from "@tarojs/taro";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import "./app.scss";
import store from "./store";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    loadFonts();
  });
  return <Provider store={store}>{children}</Provider>;
}

const loadFonts = () => {
  loadFont(
    "https://cloudmate-1300131488.cos.ap-beijing.myqcloud.com/DingTalk%20JinBuTi.ttf",
    "DingTalk"
  );
  loadFont(
    "https://cloudmate-1300131488.cos.ap-beijing.myqcloud.com/Oswald-Regular.ttf",
    "Oswald"
  );
  loadFont(
    "https://cloudmate-1300131488.cos.ap-beijing.myqcloud.com/puhui.ttf",
    "puhui"
  );
};

const loadFont = (url, alias) => {
  Taro.loadFontFace({
    family: alias,
    global: true,
    source: `url("${url}")`, //此处需替换为真实字体地址
  });
};

export default App;

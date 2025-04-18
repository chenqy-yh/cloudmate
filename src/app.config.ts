export default defineAppConfig({
  pages: [
    "pages/index/index",
  ],
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    },
  },
  "requiredBackgroundModes": ["audio", "location"],
  "requiredPrivateInfos": ["getLocation"],
  window: {
    navigationStyle: "custom",
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  lazyCodeLoading: "requiredComponents",
});

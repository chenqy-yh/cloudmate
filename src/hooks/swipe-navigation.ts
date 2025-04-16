import { setActiveIndex } from "@/store/reducers/tabbar";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";

type SwipePageConfig =
  | string
  | {
    url: string;
    tabbarIndex: number;
  };

type Arguments = {
  leftSwipeConfig?: SwipePageConfig;
  rightSwipeConfig?: SwipePageConfig;
  swipeThreshold?: number; // swipe 的阈值，超过这个值才会触发切换
};

export const useSwipeNavigation = (args: Arguments) => {
  const { leftSwipeConfig, rightSwipeConfig, swipeThreshold = 70 } = args;

  const startPosRef = useRef(0);
  const dispatch = useDispatch<AppDispatch>();
  const navigateTo = useNavigate();

  const navigate = useCallback(
    (config: SwipePageConfig) => {
      const url = typeof config === "string" ? config : config.url;
      navigateTo(url);
      if (typeof config === "object") {
        const { tabbarIndex } = config;
        dispatch(setActiveIndex(tabbarIndex));
      }
    },
    [dispatch, navigateTo]
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    startPosRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endPos = e.changedTouches[0].clientX;
    const delta = endPos - startPosRef.current;
    if (Math.abs(delta) < swipeThreshold) return;
    const leftSwipeCheck = leftSwipeConfig && delta > swipeThreshold;
    const rightSwipeCheck = rightSwipeConfig && delta < -swipeThreshold;
    if (!leftSwipeCheck && !rightSwipeCheck) return;
    const config = (leftSwipeCheck ? leftSwipeConfig : rightSwipeConfig)!;
    navigate(config);
  };
  return {
    handleTouchStart,
    handleTouchEnd,
  };
};

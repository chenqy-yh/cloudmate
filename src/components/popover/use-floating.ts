import Taro from "@tarojs/taro";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Placement, RectStyle } from ".";

type Options = {
  placement: Placement;
  reference_cls: string;
  tooltip_cls: string;
  reference_open: boolean;
  offset?: { x: number, y: number }
}

const queryUniqueStyle = (cls: string): Promise<RectStyle> => {
  return new Promise((resolve, reject) => {
    Taro.createSelectorQuery()
      .select(`.${cls}`)
      .boundingClientRect()
      .exec((res) => {
        if (res && res[0]) {
          const { width, height, top, left, right, bottom } = res[0];
          resolve({ width, height, top, left, right, bottom });
        } else {
          reject(new Error("Element not found"));
        }
      });
  });
};

const tooltip_base_style: CSSProperties = {
  position: "fixed",
  zIndex: 1000,
};

export const useFloating = (options: Options) => {
  const [first_render, setFirstRender] = useState(true)

  const { reference_open, placement, reference_cls, tooltip_cls, offset = { x: 0, y: 0 } } = options;
  const [tooltip_style, setTooltipStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const calcTooltipStyle = async () => {
      const reference_style = await queryUniqueStyle(reference_cls);
      const tooltip_style = await queryUniqueStyle(tooltip_cls);

      const real_tooltip_style = {
        top: 0,
        left: 0,
      };

      switch (placement) {
        case "top":
          real_tooltip_style.top = reference_style.top - tooltip_style.height;
          real_tooltip_style.left =
            reference_style.left + (reference_style.width - tooltip_style.width) / 2;
          break;
        case "bottom":
          real_tooltip_style.top = reference_style.bottom;
          real_tooltip_style.left =
            reference_style.left + (reference_style.width - tooltip_style.width) / 2;
          break;
        case "left":
          real_tooltip_style.top =
            reference_style.top + (reference_style.height - tooltip_style.height) / 2;
          real_tooltip_style.left = reference_style.left - tooltip_style.width;
          break;
        case "right":
          real_tooltip_style.top =
            reference_style.top + (reference_style.height - tooltip_style.height) / 2;
          real_tooltip_style.left = reference_style.right;
          break;
        case "top-start":
          real_tooltip_style.top = reference_style.top - tooltip_style.height;
          real_tooltip_style.left = reference_style.left;
          break;
        case "top-end":
          real_tooltip_style.top = reference_style.top - tooltip_style.height;
          real_tooltip_style.left = reference_style.right - tooltip_style.width;
          break;
        case "bottom-start":
          real_tooltip_style.top = reference_style.bottom;
          real_tooltip_style.left = reference_style.left;
          break;
        case "bottom-end":
          real_tooltip_style.top = reference_style.bottom;
          real_tooltip_style.left = reference_style.right - tooltip_style.width;
          break;
        case "left-start":
          real_tooltip_style.top =
            reference_style.top + (reference_style.height - tooltip_style.height) / 2;
          real_tooltip_style.left = reference_style.left - tooltip_style.width;
          break;
        case "left-end":
          real_tooltip_style.top =
            reference_style.top + (reference_style.height - tooltip_style.height) / 2;
          real_tooltip_style.left = reference_style.left;
          break;
        case "right-start":
          real_tooltip_style.top =
            reference_style.top + (reference_style.height - tooltip_style.height) / 2;
          real_tooltip_style.left = reference_style.right;
          break;
        case "right-end":
          real_tooltip_style.top =
            reference_style.top + (reference_style.height - tooltip_style.height) / 2;
          real_tooltip_style.left = reference_style.right - tooltip_style.width;
          break;
        default:
          break;
      }

      setTooltipStyle({
        left: real_tooltip_style.left + offset.x,
        top: real_tooltip_style.top + offset.y,
      });

      setFirstRender(false);
    };
    if (reference_open && reference_cls && tooltip_cls) {
      calcTooltipStyle();
    }
  }, [offset.x, offset.y, placement, reference_cls, reference_open, tooltip_cls]);

  const final_tooltip_style = useMemo(() => {
    return {
      ...tooltip_base_style,
      ...tooltip_style,
    };
  }, [tooltip_style]);

  return {
    tooltip_style: final_tooltip_style,
    first_render,
  }
}

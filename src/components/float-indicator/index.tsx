import Taro from "@tarojs/taro";
import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

type OptionItemValue = string | number;

export type OptionItem<T> = {
  value: T;
  text: ReactNode;
};

export type OptionChangeHandler<T = OptionItemValue> = (e: {
  value: OptionItem<T>;
}) => void;

export type FloatIndicatorProps<T = OptionItemValue> = {
  options: OptionItem<T>[];
  value?: OptionItem<T>;
  onChange?: OptionChangeHandler<T>;
};

const sc = (suf: string) => styles[`float_indicator_${suf}`];

const FloatIndicator: React.FC<FloatIndicatorProps> = ({
  options,
  value,
  onChange,
}) => {
  const item_ref_list = useRef<HTMLDivElement[]>([]);
  const container = useRef<HTMLDivElement>(null);

  const [rawValue, setRawValue] = useState(value ?? options[0]);

  const [cur_thumb_height, setCurThumbHeight] = useState(0);
  const [cur_thumb_width, setCurThumbWidth] = useState(0);
  const [cur_thumb_left, setCurThumbLeft] = useState(0);

  const activeIndex = options.findIndex((item) => item === rawValue);

  useEffect(() => {
    const query = Taro.createSelectorQuery()
      .selectAll(`.${sc("box")}, .${sc("item")}`)
      .boundingClientRect();

    query.exec((res) => {
      const rect_list = res[0];
      const box_rect = rect_list.shift();
      setCurThumbHeight(rect_list[activeIndex].height);
      setCurThumbLeft(rect_list[activeIndex].left - box_rect.left);
      setCurThumbWidth(rect_list[activeIndex].width);
    });
  }, [item_ref_list, activeIndex]);

  const handleItemChecked = (item: OptionItem<OptionItemValue>) => {
    setRawValue(item);
    onChange?.({ value: item });
  };

  return (
    <div className={sc("box")} ref={container}>
      {options.map((item, index) => (
        <div
          className={sc("item")}
          key={index}
          ref={(node) => {
            node && (item_ref_list.current[index] = node);
          }}
          onClick={() => handleItemChecked(item)}
        >
          {item.text}
        </div>
      ))}
      <div
        className={sc("thumb")}
        style={{
          height: `${cur_thumb_height}px`,
          width: `${cur_thumb_width}px`,
          left: `${cur_thumb_left}px`,
        }}
      />
    </div>
  );
};

export default FloatIndicator;

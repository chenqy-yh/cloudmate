import { Swiper, SwiperItem } from "@tarojs/components";
import classNames from "classnames";
import { useState } from "react";
import { useDatePciker } from "./context";
import styles from "./index.module.scss";
import { padZero } from "./utils";

interface SelectTimeProps {
  onSelectTime?: (hour: number, minute: number) => void;
}

const HOURES_COUNT = 24;
const MINUTES_COUNT = 60;
const VISIABLE__COUNT = 5;

const cls = (s) => styles[`select_time_${s}`];

const SelectTime: React.FC<SelectTimeProps> = ({ onSelectTime }) => {
  const { inner_value } = useDatePciker();
  const [selected_hour, setSelectedHour] = useState(inner_value.hour);
  const [selected_minute, setSelectedMinute] = useState(inner_value.minute);

  const handleHourChange = (e) => {
    const new_hour = e.detail.current + 2;
    setSelectedHour(new_hour);
    onSelectTime?.(new_hour, selected_minute);
  };

  const handleMinChange = (e) => {
    const new_minute = e.detail.current + 2;
    setSelectedMinute(new_minute);
    onSelectTime?.(selected_hour, new_minute);
  };

  const getItemClass = (is_active: boolean) =>
    classNames(cls("item"), { [styles.active]: is_active });

  const renderItems = (count: number, selected: number) => {
    return Array.from({ length: count }).map((_, index) => (
      <SwiperItem key={index} className={getItemClass(index === selected)}>
        {padZero(index)}
      </SwiperItem>
    ));
  };
  return (
    <div className={cls("body")}>
      <Swiper
        current={selected_hour - 2}
        circular
        displayMultipleItems={VISIABLE__COUNT}
        vertical
        className={cls("hour_list")}
        onChange={handleHourChange}
      >
        {renderItems(HOURES_COUNT, selected_hour)}
      </Swiper>
      <Swiper
        current={selected_minute - 2}
        circular
        displayMultipleItems={VISIABLE__COUNT}
        vertical
        className={cls("minute_list")}
        onChange={handleMinChange}
      >
        {renderItems(MINUTES_COUNT, selected_minute)}
      </Swiper>
    </div>
  );
};

export default SelectTime;

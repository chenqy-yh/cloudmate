import { useTime } from "@/hooks/useTime";
import styles from "./index.module.scss";

const Time = () => {
  const { solar, lunar } = useTime();
  return (
    <div className={styles.time}>
      <div className={styles.hms_time}>
        {solar.hour}:{solar.min}:{solar.sec}
      </div>
      <div className={styles.ymd_time}>
        {solar.year}/{solar.month}/{solar.day}
      </div>
      <div className={styles.zh_time}>
        <div className={styles.week}>{"星期" + solar.week}</div>
        <div className={styles.lunar}>{lunar.month + "月" + lunar.day}</div>
      </div>
    </div>
  );
};

export default Time;

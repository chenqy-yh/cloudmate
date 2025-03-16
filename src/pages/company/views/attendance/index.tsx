import { getPunchRecord } from "@/apis/attendance";
import { useTime } from "@/hooks/time";
import { setPunchRecord, setReflush } from "@/store/reducers/attandence";
import { atd_reflush_selector } from "@/store/selectors/attandence";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AttendanceButton from "./components/atd-button";
import AttendanceRecord from "./components/atd-record";
import styles from "./index.module.scss";

const Title = () => {
  const menuBtnPos = Taro.getMenuButtonBoundingClientRect();
  return (
    <div
      style={{
        marginTop: `${menuBtnPos.top}px`,
        height: `${menuBtnPos.height}px`,
      }}
      className={styles.title_body}
    >
      <div className={styles.title}>考勤</div>
    </div>
  );
};

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

const AttendanceView = () => {
  const getCurDay = () => ~~(Date.now() / (24 * 3600 * 1000));

  const reflush = useSelector(atd_reflush_selector);

  const dispatch = useDispatch();

  useEffect(() => {
    const current_day = getCurDay();
    const requestPunchRecord = async () => {
      const res = await getPunchRecord(current_day);
      if (res.statusCode !== 200) {
        Taro.showToast({
          title: "网络异常",
          icon: "error",
          duration: 2000,
        });
        return;
      }
      const punch_record_origin = res.data;
      dispatch(setPunchRecord(punch_record_origin));
      dispatch(setReflush(true));
    };
    !reflush && requestPunchRecord();
  }, [dispatch, reflush]);

  return (
    <div className={styles.attendance_view}>
      <Title />
      <Time />
      <AttendanceRecord />
      <AttendanceButton />
    </div>
  );
};

export default AttendanceView;

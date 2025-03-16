import Timeline from "@/components/time-line";
import {
  cur_sign_in_type_selector,
  punch_record_selector,
} from "@/store/selectors/attandence";
import { Image } from "@tarojs/components";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";

type AttendanceDetailProps = {
  sign_in_type: number;
  time?: Date;
  location?: string;
};

const sign_in_types = ["上班打卡", "下班打卡"];

const TextWithIcon = ({ icon, children }) => {
  return (
    <div className={styles.row}>
      <Image className={styles.row_icon} src={icon} />
      <div className={styles.text}>{children}</div>
    </div>
  );
};

const AttendanceDetail: React.FC<AttendanceDetailProps> = ({
  sign_in_type,
  time,
  location,
}) => {
  const cur_sign_in_type = useSelector(cur_sign_in_type_selector);

  const isAwaitForChkIn = !time || !location;

  const isMissCheckIn = isAwaitForChkIn && sign_in_type < cur_sign_in_type;

  const formatTime = (time) => {
    if (!time) {
      return "";
    }
    const date = new Date(time);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  const renderDetail = () => {
    if (!isAwaitForChkIn) {
      return (
        <>
          <TextWithIcon icon="../../../../../assets/icon/time.svg">
            {sign_in_type === 0 ? "上班" : "下班"}时间: {formatTime(time)}
          </TextWithIcon>
          <TextWithIcon icon="../../../../../assets/icon/map.svg">
            {location}
          </TextWithIcon>
        </>
      );
    }

    return (
      <div className={styles.atd_miss}>
        {isMissCheckIn ? "未打卡" : "等待打卡"}
      </div>
    );
  };

  return (
    <div className={styles.atd_body}>
      <div className={styles.sign_in_type}>{sign_in_types[sign_in_type]}</div>
      <div className={styles.atd_detail}>{renderDetail()}</div>
    </div>
  );
};

const AttendanceRecord = () => {
  const punch_record = useSelector(punch_record_selector);

  const renderPunchRecord = () => {
    return punch_record.map((record, idx) => {
      const { sign_in_type = idx, time, location } = record || {};
      return (
        <Timeline.Item key={idx}>
          <AttendanceDetail
            key={idx}
            sign_in_type={sign_in_type}
            time={time}
            location={location}
          />
        </Timeline.Item>
      );
    });
  };

  return <Timeline>{renderPunchRecord()}</Timeline>;
};

export default AttendanceRecord;

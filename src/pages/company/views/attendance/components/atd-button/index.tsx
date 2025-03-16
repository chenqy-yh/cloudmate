import { punch } from "@/apis/attendance";
import Loader from "@/components/loading";
import { addPunchRecord } from "@/store/reducers/attandence";
import { attendance_selector } from "@/store/selectors/attandence";
import { Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

const sign_in_types = ["上班打卡", "下班打卡"];

const AttendanceButton = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { cur_sign_in_type, punch_record } = useSelector(attendance_selector);

  const handleCheckIn = async () => {
    setLoading(true);
    // 获取用户位置信息
    const user_adr_info = await Taro.getLocation({});
    const { latitude: lat, longitude: lng } = user_adr_info;
    const punch_res = await punch(lat, lng);
    setLoading(false);
    if (punch_res.statusCode === 201) {
      const punch_record_item = punch_res.data;
      dispatch(
        addPunchRecord({
          index: cur_sign_in_type,
          record: punch_record_item,
        })
      );
    } else {
      const errMsg =
        (punch_res.data as unknown as ResponseError).message ||
        punch_res.errMsg;
      Taro.showToast({
        title: errMsg,
        icon: "error",
        duration: 2000,
      });
    }
  };

  // 需要打卡
  return (
    <Button
      className={styles.atd_btn}
      onClick={handleCheckIn}
      disabled={loading || punch_record[cur_sign_in_type] !== null}
    >
      {loading ? <Loader /> : sign_in_types[cur_sign_in_type]}
    </Button>
  );
};

export default AttendanceButton;

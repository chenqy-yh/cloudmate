import { setAuthData } from "@/store/reducers/auth";
import {
  authorization_selector,
  unique_device_token_selector,
  user_uuid_selector,
} from "@/store/selectors/auth";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type AuthGuardProps = {
  children: React.ReactNode;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const jwt_token = useSelector(authorization_selector);
  const unique_device_token = useSelector(unique_device_token_selector);
  const user_uuid = useSelector(user_uuid_selector);

  useEffect(() => {
    if (jwt_token && unique_device_token && user_uuid) return;

    const storedAuthData = {
      Authorization: Taro.getStorageSync("Authorization"),
      "x-unique-device-token": Taro.getStorageSync("x-unique-device-token"),
      "x-user-uuid": Taro.getStorageSync("x-user-uuid"),
    };

    if (Object.values(storedAuthData).every(Boolean)) {
      dispatch(setAuthData(storedAuthData));
    } else {
      navigate("/login", { replace: true });
    }
  }, [jwt_token, unique_device_token, user_uuid, dispatch, navigate]);

  return jwt_token ? children : null;
};

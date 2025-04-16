import { getContacts } from "@/apis/contacts";
import { getUserInfo } from "@/apis/user";
import { Client } from "@/socket";
import { setUserInfo } from '@/store/reducers/user';
import { setContacts } from '@/store/reducers/contacts'
import { error } from "@/utils/common";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useSystemInit = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const init = () => {
      Client.connect()
      init_userInfo();
      init_contacts();
    }
    init();
  }, []);

  const init_userInfo = async () => {
    try {
      const res = await getUserInfo();
      dispatch(setUserInfo(res.data));
    } catch (err) {
      error('获取用户信息失败');
      console.error(err);
    }
  }

  const init_contacts = async () => {
    try {
      const res = await getContacts();
      dispatch(setContacts(res.data));
    } catch (err) {
      error('获取联系人失败');
      console.error(err);
    }
  }

}

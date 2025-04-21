import { getContacts } from "@/apis/contacts";
import { getUserInfo } from "@/apis/user";
import { Client, registerEventHandler } from "@/socket";
import { addMessageToContactHistory, addUnreadCount, setContacts } from '@/store/reducers/contacts';
import { setUserInfo } from '@/store/reducers/user';
import { error } from "@/utils/common";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useSystemInit = () => {

  const dispatch = useDispatch();

  const handleReceiveMessage = (message: PrivateMessageItem) => {
    const { sender } = message;
    dispatch(addMessageToContactHistory({ message, contact_uuid: sender }))
    dispatch(addUnreadCount({ contact_id: sender }));
  }

  useEffect(() => {
    const init = () => {
      Client.connect()
      initUserInfo();
      initContacts();
      registerAllHandlers();
    }
    init();
  }, []);


  const initUserInfo = async () => {
    try {
      const res = await getUserInfo();
      dispatch(setUserInfo(res.data));
    } catch (err) {
      error('获取用户信息失败');
      console.error(err);
    }
  }

  const initContacts = async () => {
    try {
      const res = await getContacts();
      dispatch(setContacts(res.data));
    } catch (err) {
      error('获取联系人失败');
      console.error(err);
    }
  }

  const registerAllHandlers = () => {
    registerEventHandler("message", handleReceiveMessage)
  }


}

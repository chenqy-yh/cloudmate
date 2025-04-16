import http from './request'

export const getUserInfo = async () => {
  const res = await http.get('/user/info');
  return res;
}
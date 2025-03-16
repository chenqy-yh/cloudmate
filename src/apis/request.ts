import { base_ip, port } from "@/constants/http";
import Taro from "@tarojs/taro";

class HttpRequest {
  private baseUrl: string;
  private token: string;
  private unique_device_token: string;
  private user_uuid: string;

  private header_config = {};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }


  private async request<T>(url: string, method: "GET" | "POST" | "PUT" | "DELETE", data?: object): Promise<Taro.RequestTask<T>> {
    try {

      const response = await Taro.request<T>({
        url: `${this.baseUrl}${url}`,
        method,
        // header: {

        //   Authorization: `Bearer ${this.token}`, // 统一添加 Token
        //   ['x-unique-device-token']: this.unique_device_token,
        //   ['x-user-uuid']: this.user_uuid,
        // },
        header: this.header_config,
        data,
      });
      return response;
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }

  get<T = any>(url: string, data?: object) {
    return this.request<T>(url, "GET", data);
  }

  post<T = any>(url: string, data?: object) {
    return this.request<T>(url, "POST", data);
  }

  put<T = any>(url: string, data?: object) {
    return this.request<T>(url, "PUT", data);
  }

  delete<T = any>(url: string, data?: object) {
    return this.request<T>(url, "DELETE", data);
  }

  setHeaderD

  setToken(token: string) {
    this.token = token;
  }

  setUniqueDeviceToken(unique_device_token: string) {
    this.unique_device_token = unique_device_token;
  }

  setUserUuid(user_uuid: string) {
    this.user_uuid = user_uuid;
  }

  setHeaderConfig(key: string, value: string) {
    this.header_config[key] = value;
  }

}

const http = new HttpRequest(`http://${base_ip}:${port}`);
export default http;

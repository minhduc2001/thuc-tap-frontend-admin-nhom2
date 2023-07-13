"use client";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useSelector } from "react-redux";

export default function useApi() {
  const token = useSelector((state: any) => state.auth.token);

  async function AXIOS(): Promise<AxiosInstance> {
    let instance: AxiosInstance;

    const config = getConfig();
    instance = axios.create(config);
    instance.interceptors.response.use(
      // @ts-ignore
      async (config: AxiosRequestConfig) => {
        if (token) {
          // @ts-ignore
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      async (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      async (error) => {
        const originalRequest = error?.config;
        if (error?.response?.status === 401 && !originalRequest._retry) {
          // Kiểm tra mã trạng thái 401 (Unauthorized) và chưa thử lại request
          // Gửi yêu cầu refresh token để lấy token mới
          //   const newToken = await useRefreshToken();
          //   if (newToken) {
          //     // Thử lại request ban đầu với token mới
          //     originalRequest._retry = true;
          //     originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          //     return axios(originalRequest);
          //   }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  async function GET<T>(url: string, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.get(url, { params: params });
  }

  async function POST<T>(url: string, body: any, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.post(url, body, { params: params });
  }

  async function PUT<T>(url: string, body: any, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.put(url, body, { params: params });
  }

  async function PATCH<T>(url: string, body: any, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.patch(url, body, { params: params });
  }

  async function DELETE<T>(url: string, params?: any): Promise<T> {
    const api = await AXIOS();
    return api.delete(url, { params: params });
  }

  const getConfig = () => {
    return {
      baseURL: "http://localhost:8080/api",
      headers: {
        ContentType: "application/json",
        Accept: "application/json",
      },
    };
  };

  return { GET, POST, PUT, PATCH, DELETE };
}

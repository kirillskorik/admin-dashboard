import axios, { AxiosRequestConfig } from "axios";

import AuthStore from "../store/Auth";

type APIPropsType = {
  url: string;
  method: any;
  config?: AxiosRequestConfig<any>;
  data?: any;
  params?: any;
};

const axiosApiInstance = axios.create({
  withCredentials: false,
});

const API = async ({
  url,
  method,
  config,
  data,
  params,
}: APIPropsType): Promise<any> => {
  try {
    const response = await axiosApiInstance
      .request({
        url,
        method,
        withCredentials: false,
        data,
        params,
        ...config,
      })
      .catch((error: any) => {
        throw error.response;
      });
    return { response };
  } catch (err: any) {
    return { err };
  }
};

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${AuthStore.token}`,
    };
    if (!AuthStore.token) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      AuthStore.logout();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;

import { instance } from "./axios.js";

export const post = (url, data) => instance.post(url, data);
export const get = (url, params) => instance.get(url, { params });
export const deleteTasks = (url) => instance.delete(url);

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

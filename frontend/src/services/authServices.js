import { instance, instanceImageProfile } from "./axios.js";

export const post = (url, data) => instance.post(url, data);
export const get = (url, params) => instance.get(url, { params });
export const put = async (url, file) => {
  const form = new FormData();
  form.append("profileImage", file); // Solo la imagen, no necesitas recorrer propiedades.
  return await instanceImageProfile.put(url, form); // Asegúrate de usar PUT.
};
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

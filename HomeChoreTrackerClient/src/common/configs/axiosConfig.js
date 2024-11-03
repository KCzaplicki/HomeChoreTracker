import axios from "axios";

import { apiUrl } from "../constants/apiPaths";
import { getAccessToken } from "../../features/auth/utils/accessTokenUtils";

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

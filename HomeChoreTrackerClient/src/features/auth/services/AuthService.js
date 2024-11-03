import apiClient from "../../../common/configs/axiosConfig";

import {
  changePasswordPath,
  getCurrentUserPath,
  loginPath,
} from "../../../common/constants/apiPaths";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await apiClient.post(
        loginPath,
        {
          email,
          password,
        },
        {
          validateStatus: () => true,
        }
      );

      return {
        isAuthenticated: response.status === 200,
        token: response.data.token,
      };
    } catch (error) {
      console.error(error);

      return {
        isAuthenticated: false,
        token: null,
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get(getCurrentUserPath);

      return response.data;
    } catch (error) {
      console.error(error);

      return null;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await apiClient.put(changePasswordPath, {
        currentPassword,
        newPassword,
      });

      return response.status === 204;
    } catch (error) {
      console.error(error);

      return false;
    }
  },
};

export default AuthService;

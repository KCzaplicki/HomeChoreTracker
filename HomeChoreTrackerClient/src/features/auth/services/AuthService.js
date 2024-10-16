import axios from "axios";

import {
  changePasswordPath,
  getCurrentUserPath,
  loginPath,
} from "../../../common/constants/ApiPaths";
import { getAccessToken } from "../utils/AccessTokenUtils";

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(
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
      const response = await axios.get(getCurrentUserPath, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await axios.put(
        changePasswordPath,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      return response.status === 204;
    } catch (error) {
      console.error(error);
      return false;
    }
  },
};

export default AuthService;

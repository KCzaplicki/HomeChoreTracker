import axios from "axios";
import { loginPath } from "../../../common/constants/ApiPaths";

const AuthService = {
  login: async (email, password) => {
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

    return response.status === 200;
  },
};

export default AuthService;

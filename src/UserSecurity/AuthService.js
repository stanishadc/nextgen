import axios from "axios";
import config from "../config";

class AuthService {
  getCurrentUserRole() {
      const headerconfig = {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    };
    return axios
      .get(config.apiurl + config.getuser,headerconfig)
      .then(response => {
        console.log(response)
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("userToken");
  }
}

export default new AuthService();
import { isAuthenticated, setAuthToken, clearAuthToken } from "../utils/auth";
import api from "./api";

function login({ username, password }) {
  return new Promise((resolve, reject) => {
    api
      .post("login", {}, { headers: { username, password } })
      .then((res) => {
        if (res.data) setAuthToken(res.data.token);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function logout() {
  clearAuthToken();
}

export default { login, logout, isAuthenticated };

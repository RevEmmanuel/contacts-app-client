import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const setAuthToken = (token?: string) => {
  if (token) {
    apiInstance.defaults.headers["Authorization"] = token;
  } else {
    delete apiInstance.defaults.headers["Authorization"];
  }
}

export default apiInstance;

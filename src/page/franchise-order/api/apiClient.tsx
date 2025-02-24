import axios from "axios";
const API_BASE_URL = "https://api.fr.stg.shipglobal.in/api/v1";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const API_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlJZCI6MzIzODIsImNyZWF0ZWRfYXQiOnsiZGF0ZSI6IjIwMjUtMDItMjQgMTY6NDg6MDguNTcxNDY0IiwidGltZXpvbmVfdHlwZSI6MywidGltZXpvbmUiOiJBc2lhL0tvbGthdGEifSwiZXhwaXJlc19hdCI6eyJkYXRlIjoiMjAyNS0wMy0yNiAxNjo0ODowOC41NzE0NjYiLCJ0aW1lem9uZV90eXBlIjozLCJ0aW1lem9uZSI6IkFzaWEvS29sa2F0YSJ9LCJpZCI6Ijg5NjNmMzgwLWUwZWItNDViNS1hOGRkLWU1YWE5MGNhZWYwZCIsInJlbW90ZV9lbnRpdHlfaWQiOjB9.dilC5oJtAiuJMPz4UMaSN2IUYoWvIoE-Ih2b5dMupOA";
export const setAuthToken = (token: string) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};
setAuthToken(API_TOKEN);
apiClient.interceptors.request.use(
  (config) => {
    console.log("Request Sent:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
export default apiClient;

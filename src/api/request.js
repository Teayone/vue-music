import axios from "axios";
import { show, hide } from "../plugins/loading";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://music-api-teayone.vercel.app"
    : "http://127.0.0.1:3000";
export function request(config) {
  const instance = axios.create({
    baseURL,
    timeout: 5000,
  });
  instance.interceptors.request.use(
    (req) => {
      show();
      return req;
    },
    () => {
      hide();
    }
  );
  instance.interceptors.response.use(
    (res) => {
      hide();
      return res;
    },
    () => {
      hide();
    }
  );
  return instance(config);
}

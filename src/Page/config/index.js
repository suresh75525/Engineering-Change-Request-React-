import axios from "axios";
const instance = axios.create({
  // baseURL: 'http://CHEMSMESTEST01:5050/'
  baseURL: "http://CHEWS10WS0011:5050/",
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

export default instance;

import axios from "axios";

// export default axios.defaults.baseURL = "https://football-recruitment.onrender.com/"
export default axios.defaults.baseURL = "https://admin.footballrecruitment.eu/";
// export default axios.defaults.baseURL = "http://192.168.29.200:5000/api/";


const token = JSON.parse(window.localStorage.getItem("token"));

export const PostUrl = axios.create({
  baseURL: "https://admin.footballrecruitment.eu/api/",
  // baseURL: "https://football-recruitment.onrender.com/api/",
  // baseURL: "http://192.168.29.200:5000/api/",
  method: "post",
  headers: {
    Authorization: token,
  },
});

export const PutUrl = axios.create({
  // baseURL: "https://football-recruitment.onrender.com/api/",
  baseURL: "https://admin.footballrecruitment.eu/api/",
  // baseURL: "http://192.168.29.200:5000/api/",
  method: "put",
  headers: {
    Authorization: token,
  },
});

export const DeleteUrl = axios.create({
  // baseURL: "https://football-recruitment.onrender.com/api/",
  baseURL: "https://admin.footballrecruitment.eu/api/",
  // baseURL: "http://192.168.29.200:5000/api/",
  method: "delete",
  headers: {
    Authorization: token,
  },
});

export const GetUrl = axios.create({
  // baseURL: "https://football-recruitment.onrender.com/api/",
  baseURL: "https://admin.footballrecruitment.eu/api/",
  // baseURL: "http://192.168.29.200:5000/api/",
  method: "get",
  headers: {
    Authorization: token,
  },
});

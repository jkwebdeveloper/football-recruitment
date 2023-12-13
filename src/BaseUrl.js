import axios from "axios";

export default axios.defaults.baseURL = "https://football-recruitment.onrender.com/";

const token = JSON.parse(window.localStorage.getItem("token"));

export const PostUrl = axios.create({
  baseURL: "https://football-recruitment.onrender.com/api/",
  method: "post",
  headers: {
    Authorization: token,
  },
});

export const PutUrl = axios.create({
  baseURL: "https://football-recruitment.onrender.com/api/",
  method: "put",
  headers: {
    Authorization: token,
  },
});

export const DeleteUrl = axios.create({
  baseURL: "https://football-recruitment.onrender.com/api/",
  method: "delete",
  headers: {
    Authorization: token,
  },
});

export const GetUrl = axios.create({
  baseURL: "https://football-recruitment.onrender.com/api/",
  method: "get",
  headers: {
    Authorization: token,
  },
});

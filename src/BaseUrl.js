import axios from "axios";

export default axios.defaults.baseURL = "https://admin.footballrecruitment.eu/";

const token = JSON.parse(window.localStorage.getItem("token"));

export const PostUrl = axios.create({
  baseURL: "https://admin.footballrecruitment.eu/api/",
  method: "post",
  headers: {
    Authorization: token,
  },
});

export const PutUrl = axios.create({
  baseURL: "https://admin.footballrecruitment.eu/api/",
  method: "put",
  headers: {
    Authorization: token,
  },
});

export const DeleteUrl = axios.create({
  baseURL: "https://admin.footballrecruitment.eu/api/",
  method: "delete",
  headers: {
    Authorization: token,
  },
});

export const GetUrl = axios.create({
  baseURL: "https://admin.footballrecruitment.eu/api/",
  method: "get",
  headers: {
    Authorization: token,
  },
});

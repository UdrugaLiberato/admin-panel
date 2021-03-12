import { getUserAccessToken } from "../context/user";

let api;

api =
  process.env.NODE_ENV === "development"
    ? "https://api.udruga-liberato.hr/web/v1"
    : "https://api.udruga-liberato.hr/web/v1";

export const ENDPOINTS = {
  NEWSLETTER: `${api}/newsletter`,
  CONTACT: `${api}/contact`,
  BLOG: `${api}/posts`,
  POST: `${api}/post`,
  LOGIN: `${api}/login`,
  USER: `${api}/user`,
};

export const LOCATIONENDPOINTS = {
  LIST: `${api}/locations`,
  PUT: `${api}/location/`,
};

export const CATEGORYENDPOINTS = {
  LIST: `${api}/categories`,
};

export const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getUserAccessToken()}`,
};

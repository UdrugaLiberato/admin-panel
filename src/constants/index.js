let api;

api =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8183/web/v1"
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
};

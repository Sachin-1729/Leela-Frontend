import api from "../api";

export const getCommunityRequests = (page) => {
  return api.get(`/community?page=${page}`);
};

export const createCommunityRequest = (data) => {
  return api.post("/community", data);
};

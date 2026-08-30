import api from "../api";

export const getLead = (data) => {
  return api.get(`/lead?page=${data}`);
};

export const createLead = (data) => {
  return api.post("/lead", data);
};
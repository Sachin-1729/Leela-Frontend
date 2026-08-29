import api from "../api";

export const getLead = () => {
  return api.get("/lead");
};

export const createLead = (data) => {
  return api.post("/lead", data);
};
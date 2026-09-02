import api from "../api";

export const createEventTemplate = (data) => {
  return api.post("/template", data);
};

export const getEventTemplates = () => {
  return api.get("/template");
};
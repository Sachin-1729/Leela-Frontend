import api from "../api";

export const getCategory = (data) => {
  return api.get(`/category?page=${data}`);
};

export const createCategory = (data) => {
  return api.post("/category", data);
};
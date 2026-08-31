import { data } from "react-router-dom";
import api from "../api";

export const createTasks = (data) => {
  return api.post("/task", data);
};

export const getTasks= (data) => {
  return api.get(`/task?page=${data}`);
};


import { data } from "react-router-dom";
import api from "../api";

export const createStaff = (data) => {
  return api.post("/staff", data);
};

export const getStaff = (data) => {
  return api.get(`/staff?page=${data}`);
};

export const getAllStaff = () =>{
  return api.get("/staff/all")
}

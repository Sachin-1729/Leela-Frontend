import api from "../api";

export const getEvents = (data) => {
  return api.get(`/event?page=${data}`);
};
export const getEventDetail = (data) => {
  return api.get(`/event/${data}`);
};
export const createEvent = (data) => {
  return api.post("/event", data);
};
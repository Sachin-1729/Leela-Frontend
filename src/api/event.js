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
export const getEventGuests = (eventId) => {
  return api.get(`/event/${eventId}/guests`);
};
export const replaceEventGuests = (eventId, guests) => {
  return api.put(`/event/${eventId}/guests`, { guests });
};
export const getEventBroadcasts = (eventId) => {
  return api.get(`/event/${eventId}/broadcasts`);
};
export const createEventBroadcast = (eventId, data) => {
  return api.post(`/event/${eventId}/broadcasts`, data);
};
export const getBroadcastInvitations = (eventId, broadcastId) => {
  return api.get(`/event/${eventId}/broadcasts/${broadcastId}/invitations`);
};

import api from "../config/axios";

export const getEvents = async () => {
  const response = await api.get("/api/events");
  return response.data;
};

export const getEvent = async (id) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/api/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post("/api/admin/events", eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/api/admin/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/api/admin/events/${id}`);
  return response.data;
};

export const searchEvents = async (search = "") => {
  const response = await api.get(`/api/events?search=${encodeURIComponent(search)}`);
  return response.data;
};
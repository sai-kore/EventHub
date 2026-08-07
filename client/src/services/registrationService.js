import api from "../config/axios";

export const registerForEvent = async (eventId) => {
  const response = await api.post(`/api/registrations/${eventId}`);
  return response.data;
};

export const getMyRegistrations = async () => {
  const response = await api.get("/api/registrations/my-registrations");
  return response.data;
};

export const getParticipants = async (eventId) => {
  const response = await api.get(`/api/admin/events/${eventId}/participants`);
  return response.data;
};

export const cancelRegistration = async (eventId) => {
  const response = await api.delete(`/api/registrations/${eventId}`);
  return response.data;
};
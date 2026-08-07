import api from "../config/axios";

export const getDashboard = async () => {
  const response = await api.get("/api/dashboard");
  return response.data;
};
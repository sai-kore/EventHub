import api from "../config/axios";

export const getUsers = async () => {
  const response = await api.get("/api/admin/users");
  return response.data;
};

export const updateUserRole = async (id, role) => {
  const response = await api.put(`/api/admin/users/${id}/role`, { role });
  return response.data;
};

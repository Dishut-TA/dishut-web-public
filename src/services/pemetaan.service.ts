import api from './api';
const API_URL = import.meta.env.VITE_API_EXAMPLE;

export const getProjects = async () => {
  const response = await api.get(`${API_URL}/projects`);
  return response.data;
};

export const getPetaKekritisan = async (projectId: number) => {
  const response = await api.get(`${API_URL}/projects/${projectId}/map`);
  return response.data;
};

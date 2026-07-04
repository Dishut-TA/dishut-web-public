import api from './api';
// import type { User } from '@/utils/interface';

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; 
};

export const updateUserProfile = async (id: number, formData: FormData) => {
  const token = localStorage.getItem('token');
  const response = await api.put(`/users/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
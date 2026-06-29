import type { RegisterPayload } from '@/utils/interface';
import api from './api';

export const registerUser = async (data: RegisterPayload) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const loginUser = async (email: string, kata_sandi: string) => {
  const response = await api.post('/auth/login', {
    login: email,
    kata_sandi: kata_sandi,
  });
  return response.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem('token');
  return await api.post('/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
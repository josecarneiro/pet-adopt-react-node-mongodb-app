import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

export const signIn = async data => {
  const response = await api.post('/authentication/sign-in', data);
  const body = response.data;
  const user = body.user;
  return user;
};

export const signUp = async data => {
  const response = await api.post('/authentication/sign-up', data);
  const body = response.data;
  const user = body.user;
  return user;
};

export const signOut = async () => {
  await api.post('/authentication/sign-out');
};

export const verify = async () => {
  const response = await api.get('/authentication/verify');
  return response.data.user;
};

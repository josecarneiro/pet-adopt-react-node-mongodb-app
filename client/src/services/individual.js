import api from './api';

export const loadIndividual = async id => {
  const response = await api.get(`/individual/${id}`);
  return response.data.individual;
};

export const savePreferences = async data => {
  const response = await api.patch('/individual/preferences', data);
  return response.data.user;
};

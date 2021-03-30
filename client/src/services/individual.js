import api from './api';

export const loadIndividual = async id => {
  const response = await api.get(`/individual/${id}`);
  return response.data.individual;
};

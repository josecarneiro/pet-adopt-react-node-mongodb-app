import api from './api';

export const loadShelter = async id => {
  const response = await api.get(`/shelter/${id}`);
  return response.data.shelter;
};

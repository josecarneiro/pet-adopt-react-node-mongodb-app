import api from './api';

export const loadShelter = async id => {
  const response = await api.get(`/shelter/${id}`);
  const { shelter, pets, donations } = response.data;
  return { shelter, pets, donations };
};

export const donateToShelter = async (id, data) => {
  const response = await api.post(`/shelter/${id}/donate`, data);
  const { donation } = response.data;
  return donation;
};

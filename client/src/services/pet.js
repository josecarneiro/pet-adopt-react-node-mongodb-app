import api from './api';

export const createPet = async data => {
  const response = await api.post('/pet', data);
  return response.data.pet;
};

export const listPets = async () => {
  const response = await api.get('/pet/list');
  return response.data.pets;
};

export const loadRandomPet = async () => {
  const response = await api.get('/pet/random');
  return response.data.pet;
};

export const loadPet = async id => {
  const response = await api.get(`/pet/${id}`);
  const pet = response.data.pet;
  const application = response.data.application;
  return { pet, application };
};

export const editPet = async (id, data) => {
  const response = await api.patch(`/pet/${id}`, data);
  return response.data.pet;
};

export const deletePet = async id => {
  await api.delete(`/pet/${id}`);
};

export const adoptPet = async id => {
  const response = await api.post(`/pet/${id}/adopt`);
  return response.data.application;
};

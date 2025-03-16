import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/files',
});

export const getFiles = () => api.get('/list/');
export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/upload/', formData);
};
export const downloadFile = (id) => api.get(`/download/${id}/`, { responseType: 'blob' });
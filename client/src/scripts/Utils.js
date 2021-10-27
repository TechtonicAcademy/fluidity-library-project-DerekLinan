import axios from 'axios';

// const local = 'http://localhost:3000/books';
const backend = 'http://localhost:8080/api/books';

export const loadBooks = () => {
  return axios.get(`${backend}`);
};

export const loadBook = (id) => {
  return axios.get(`${backend}/${id}`);
};

export const addBook = (data) => {
  return axios.post(`${backend}`, data);
};

export const editBook = (id, data) => {
  return axios.put(`${backend}/${id}`, data);
};

export const deleteBook = (id) => {
  return axios.delete(`${backend}/${id}`);
};

export const searchBooks = (search) => {
  return axios.get(`${backend}/search/${search}`);
};

export const addImage = (image) => {
  const form = new FormData();
  form.append('imageFileInput', image, image.name);
  return axios.post('http://localhost:8080/api/upload/', form);
};

export const deleteImage = (imageURL) => {
  return axios.delete(`${imageURL}`);
};

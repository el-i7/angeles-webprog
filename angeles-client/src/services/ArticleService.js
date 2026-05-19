import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const fetchArticles = () => API.get('/');
export const createArticle = (data) => API.post('/', data);
export const updateArticle = (id, data) => API.put(`/${id}`, data);
export const deleteArticle = (id) => API.delete(`/${id}`);
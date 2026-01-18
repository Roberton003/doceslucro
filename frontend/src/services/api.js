import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',  // Use relative URL for same-origin
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const recipeService = {
  getAll: () => api.get('/products/recipes/'),
  getById: (id) => api.get(`/products/recipes/${id}/`),
  create: (data) => api.post('/products/recipes/', data),
  update: (id, data) => api.put(`/products/recipes/${id}/`, data),
  delete: (id) => api.delete(`/products/recipes/${id}/`),
  addIngredient: (id, data) => api.post(`/products/recipes/${id}/add_ingredient/`, data),
};

export const ingredientService = {
  getAll: () => api.get('/ingredients/'),
  create: (data) => api.post('/ingredients/', data),
};

export default api;
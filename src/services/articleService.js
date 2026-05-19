import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// ✅ App.js configure axios.defaults globalement, pas besoin de lire le token manuellement
// Mais on garde getAuthConfig en sécurité avec la bonne clé 'authToken'
const getAuthConfig = () => {
  const token = localStorage.getItem('authToken'); // ✅ corrigé
  return {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  };
};

export const searchArticles = async ({ codeSoc, designation, codeStatut }) => {
  const config = {
    ...getAuthConfig(),
    params: { codeSoc }
  };
  if (designation) config.params.designation = designation;
  if (codeStatut)  config.params.codeStatut  = codeStatut;

  const response = await axios.get(`${API_BASE_URL}/articles/search`, config);
  return response.data;
};

export const createArticle = async (article) => {
  const response = await axios.post(`${API_BASE_URL}/articles`, article, getAuthConfig());
  return response.data;
};

export const updateArticle = async (id, article) => {
  const response = await axios.put(`${API_BASE_URL}/articles/${id}`, article, getAuthConfig());
  return response.data;
};

export const deleteArticle = async (id) => {
  await axios.delete(`${API_BASE_URL}/articles/${id}`, getAuthConfig());
};
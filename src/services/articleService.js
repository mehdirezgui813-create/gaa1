import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const getAuthConfig = () => {
  const token = localStorage.getItem('authToken');
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
  if (codeStatut) config.params.codeStatut = codeStatut;

  try {
    const response = await axios.get(`${API_BASE_URL}/articles/search`, config);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche d\'articles:', error.response?.data || error.message);
    throw error;
  }
};

export const createArticle = async (article) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/articles`, article, getAuthConfig());
    console.log('Article créé avec succès:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'article:', error.response?.data || error.message);
    throw error;
  }
};

export const updateArticle = async (id, article) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/articles/${id}`, article, getAuthConfig());
    console.log('Article modifié avec succès:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification de l\'article:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/articles/${id}`, getAuthConfig());
    console.log('Article supprimé avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'article:', error.response?.data || error.message);
    throw error;
  }
};

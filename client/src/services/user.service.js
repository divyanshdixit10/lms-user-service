import api from './api';

// All methods use the mock API which already exists
// The mock API already handles these endpoints
const USERS_URL = '/users';

const UserService = {
  getCurrentUser: async () => {
    try {
      const response = await api.get(`${USERS_URL}/me`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getUserById: async (id) => {
    try {
      const response = await api.get(`${USERS_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getAllUsers: async () => {
    try {
      const response = await api.get(USERS_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`${USERS_URL}/${id}`, userData);
      
      // Update the stored user data if it's the current user
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser.id === id) {
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`${USERS_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default UserService; 
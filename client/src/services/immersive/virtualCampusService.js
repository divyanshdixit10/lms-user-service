import api from '../api';

/**
 * Service for interacting with the Virtual Campus API
 * Now using mock API implementation only - no backend connection
 */
const virtualCampusService = {
  /**
   * Get all buildings in the virtual campus
   * @returns {Promise<Array>} Array of building objects
   */
  getAllBuildings: async () => {
    try {
      const response = await api.get('/virtual-campus/buildings');
      return response.data;
    } catch (error) {
      console.error('Error fetching buildings:', error);
      throw error;
    }
  },

  /**
   * Get a specific building by ID
   * @param {string} buildingId - The ID of the building to retrieve
   * @returns {Promise<Object>} Building object
   */
  getBuildingById: async (buildingId) => {
    try {
      const response = await api.get(`/virtual-campus/buildings/${buildingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching building ${buildingId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new building in the virtual campus
   * @param {Object} buildingData - The data for the new building
   * @returns {Promise<Object>} Created building object
   */
  createBuilding: async (buildingData) => {
    try {
      const response = await api.post('/virtual-campus/buildings', buildingData);
      return response.data;
    } catch (error) {
      console.error('Error creating building:', error);
      throw error;
    }
  },

  /**
   * Update an existing building
   * @param {string} buildingId - The ID of the building to update
   * @param {Object} buildingData - The updated building data
   * @returns {Promise<Object>} Updated building object
   */
  updateBuilding: async (buildingId, buildingData) => {
    try {
      const response = await api.put(`/virtual-campus/buildings/${buildingId}`, buildingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating building ${buildingId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a building from the virtual campus
   * @param {string} buildingId - The ID of the building to delete
   * @returns {Promise<Object>} Success response
   */
  deleteBuilding: async (buildingId) => {
    try {
      const response = await api.delete(`/virtual-campus/buildings/${buildingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting building ${buildingId}:`, error);
      throw error;
    }
  },

  /**
   * Get all available avatars
   * @returns {Promise<Array>} Array of avatar objects
   */
  getAvatars: async () => {
    try {
      const response = await api.get('/virtual-campus/avatars');
      return response.data;
    } catch (error) {
      console.error('Error fetching avatars:', error);
      throw error;
    }
  },

  /**
   * Create a new avatar
   * @param {Object} avatarData - The data for the new avatar
   * @returns {Promise<Object>} Created avatar object
   */
  createAvatar: async (avatarData) => {
    try {
      const response = await api.post('/virtual-campus/avatars', avatarData);
      return response.data;
    } catch (error) {
      console.error('Error creating avatar:', error);
      throw error;
    }
  }
};

export default virtualCampusService; 
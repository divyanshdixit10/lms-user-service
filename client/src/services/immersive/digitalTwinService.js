import api from '../api';

/**
 * Service for interacting with the Digital Twin API
 */
const digitalTwinService = {
  /**
   * Get all digital twins
   * @returns {Promise<Array>} Array of digital twin objects
   */
  getAllTwins: async () => {
    try {
      const response = await api.get('/digital-twins');
      return response.data;
    } catch (error) {
      console.error('Error fetching digital twins:', error);
      throw error;
    }
  },

  /**
   * Get a specific digital twin by ID
   * @param {string} twinId - The ID of the twin to retrieve
   * @returns {Promise<Object>} Digital twin object
   */
  getTwinById: async (twinId) => {
    try {
      const response = await api.get(`/digital-twins/${twinId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching digital twin ${twinId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new digital twin
   * @param {Object} twinData - The data for the new digital twin
   * @returns {Promise<Object>} Created digital twin object
   */
  createTwin: async (twinData) => {
    try {
      const response = await api.post('/digital-twins', twinData);
      return response.data;
    } catch (error) {
      console.error('Error creating digital twin:', error);
      throw error;
    }
  },

  /**
   * Update an existing digital twin
   * @param {string} twinId - The ID of the twin to update
   * @param {Object} twinData - The updated twin data
   * @returns {Promise<Object>} Updated digital twin object
   */
  updateTwin: async (twinId, twinData) => {
    try {
      const response = await api.put(`/digital-twins/${twinId}`, twinData);
      return response.data;
    } catch (error) {
      console.error(`Error updating digital twin ${twinId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a digital twin
   * @param {string} twinId - The ID of the twin to delete
   * @returns {Promise<Object>} Success response
   */
  deleteTwin: async (twinId) => {
    try {
      const response = await api.delete(`/digital-twins/${twinId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting digital twin ${twinId}:`, error);
      throw error;
    }
  }
};

export default digitalTwinService;
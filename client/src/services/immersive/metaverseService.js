import api from '../api';

/**
 * Service for interacting with the Metaverse Learning Hub API
 */
const metaverseService = {
  /**
   * Get all metaverse events
   * @returns {Promise<Array>} Array of metaverse event objects
   */
  getAllEvents: async () => {
    try {
      const response = await api.get('/metaverse/events');
      return response.data;
    } catch (error) {
      console.error('Error fetching metaverse events:', error);
      throw error;
    }
  },

  /**
   * Get a specific metaverse event by ID
   * @param {string} eventId - The ID of the event to retrieve
   * @returns {Promise<Object>} Metaverse event object
   */
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/metaverse/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching metaverse event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new metaverse event
   * @param {Object} eventData - The data for the new event
   * @returns {Promise<Object>} Created metaverse event object
   */
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/metaverse/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating metaverse event:', error);
      throw error;
    }
  },

  /**
   * Update an existing metaverse event
   * @param {string} eventId - The ID of the event to update
   * @param {Object} eventData - The updated event data
   * @returns {Promise<Object>} Updated metaverse event object
   */
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/metaverse/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating metaverse event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a metaverse event
   * @param {string} eventId - The ID of the event to delete
   * @returns {Promise<Object>} Success response
   */
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/metaverse/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting metaverse event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Register a user for a metaverse event
   * @param {string} eventId - The ID of the event
   * @param {string} userId - The ID of the user
   * @returns {Promise<Object>} Updated metaverse event object
   */
  registerForEvent: async (eventId, userId) => {
    try {
      const response = await api.post(`/metaverse/events/${eventId}/register`, { userId });
      return response.data;
    } catch (error) {
      console.error(`Error registering for metaverse event ${eventId}:`, error);
      throw error;
    }
  },

  /**
   * Get all code visualizations
   * @returns {Promise<Array>} Array of code visualization objects
   */
  getAllVisualizations: async () => {
    try {
      const response = await api.get('/code-visualizations');
      return response.data;
    } catch (error) {
      console.error('Error fetching code visualizations:', error);
      throw error;
    }
  },

  /**
   * Get a specific code visualization by ID
   * @param {string} vizId - The ID of the visualization to retrieve
   * @returns {Promise<Object>} Code visualization object
   */
  getVisualizationById: async (vizId) => {
    try {
      const response = await api.get(`/code-visualizations/${vizId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching code visualization ${vizId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new code visualization
   * @param {Object} vizData - The data for the new visualization
   * @returns {Promise<Object>} Created code visualization object
   */
  createVisualization: async (vizData) => {
    try {
      const response = await api.post('/code-visualizations', vizData);
      return response.data;
    } catch (error) {
      console.error('Error creating code visualization:', error);
      throw error;
    }
  },

  /**
   * Update an existing code visualization
   * @param {string} vizId - The ID of the visualization to update
   * @param {Object} vizData - The updated visualization data
   * @returns {Promise<Object>} Updated code visualization object
   */
  updateVisualization: async (vizId, vizData) => {
    try {
      const response = await api.put(`/code-visualizations/${vizId}`, vizData);
      return response.data;
    } catch (error) {
      console.error(`Error updating code visualization ${vizId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a code visualization
   * @param {string} vizId - The ID of the visualization to delete
   * @returns {Promise<Object>} Success response
   */
  deleteVisualization: async (vizId) => {
    try {
      const response = await api.delete(`/code-visualizations/${vizId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting code visualization ${vizId}:`, error);
      throw error;
    }
  }
};

export default metaverseService; 
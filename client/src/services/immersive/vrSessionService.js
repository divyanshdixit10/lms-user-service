import api from '../api';

/**
 * Service for interacting with the VR Pair Programming sessions API
 */
const vrSessionService = {
  /**
   * Get all VR sessions
   * @returns {Promise<Array>} Array of VR session objects
   */
  getAllSessions: async () => {
    try {
      const response = await api.get('/vr-sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching VR sessions:', error);
      throw error;
    }
  },

  /**
   * Get a specific VR session by ID
   * @param {string} sessionId - The ID of the session to retrieve
   * @returns {Promise<Object>} VR session object
   */
  getSessionById: async (sessionId) => {
    try {
      const response = await api.get(`/vr-sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching VR session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new VR session
   * @param {Object} sessionData - The data for the new session
   * @returns {Promise<Object>} Created VR session object
   */
  createSession: async (sessionData) => {
    try {
      const response = await api.post('/vr-sessions', sessionData);
      return response.data;
    } catch (error) {
      console.error('Error creating VR session:', error);
      throw error;
    }
  },

  /**
   * Update an existing VR session
   * @param {string} sessionId - The ID of the session to update
   * @param {Object} sessionData - The updated session data
   * @returns {Promise<Object>} Updated VR session object
   */
  updateSession: async (sessionId, sessionData) => {
    try {
      const response = await api.put(`/vr-sessions/${sessionId}`, sessionData);
      return response.data;
    } catch (error) {
      console.error(`Error updating VR session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a VR session
   * @param {string} sessionId - The ID of the session to delete
   * @returns {Promise<Object>} Success response
   */
  deleteSession: async (sessionId) => {
    try {
      const response = await api.delete(`/vr-sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting VR session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Join a VR session
   * @param {string} sessionId - The ID of the session to join
   * @param {string} userId - The ID of the user joining the session
   * @returns {Promise<Object>} Updated VR session object
   */
  joinSession: async (sessionId, userId) => {
    try {
      const response = await api.post(`/vr-sessions/${sessionId}/join`, { userId });
      return response.data;
    } catch (error) {
      console.error(`Error joining VR session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Start a VR session
   * @param {string} sessionId - The ID of the session to start
   * @returns {Promise<Object>} Updated VR session object
   */
  startSession: async (sessionId) => {
    try {
      const response = await api.put(`/vr-sessions/${sessionId}/start`, {});
      return response.data;
    } catch (error) {
      console.error(`Error starting VR session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * End a VR session
   * @param {string} sessionId - The ID of the session to end
   * @returns {Promise<Object>} Updated VR session object
   */
  endSession: async (sessionId) => {
    try {
      const response = await api.put(`/vr-sessions/${sessionId}/end`, {});
      return response.data;
    } catch (error) {
      console.error(`Error ending VR session ${sessionId}:`, error);
      throw error;
    }
  }
};

export default vrSessionService; 
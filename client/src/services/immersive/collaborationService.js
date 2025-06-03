import api from '../api';

/**
 * Service for interacting with the Collaborative Development API
 */
const collaborationService = {
  /**
   * Get all collaborative sessions
   * @returns {Promise<Array>} Array of collaborative session objects
   */
  getAllSessions: async () => {
    try {
      const response = await api.get('/collaborative-sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching collaborative sessions:', error);
      throw error;
    }
  },

  /**
   * Get a specific collaborative session by ID
   * @param {string} sessionId - The ID of the session to retrieve
   * @returns {Promise<Object>} Collaborative session object
   */
  getSessionById: async (sessionId) => {
    try {
      const response = await api.get(`/collaborative-sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new collaborative session
   * @param {Object} sessionData - The data for the new session
   * @returns {Promise<Object>} Created collaborative session object
   */
  createSession: async (sessionData) => {
    try {
      const response = await api.post('/collaborative-sessions', sessionData);
      return response.data;
    } catch (error) {
      console.error('Error creating collaborative session:', error);
      throw error;
    }
  },

  /**
   * Update an existing collaborative session
   * @param {string} sessionId - The ID of the session to update
   * @param {Object} sessionData - The updated session data
   * @returns {Promise<Object>} Updated collaborative session object
   */
  updateSession: async (sessionId, sessionData) => {
    try {
      const response = await api.put(`/collaborative-sessions/${sessionId}`, sessionData);
      return response.data;
    } catch (error) {
      console.error(`Error updating collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a collaborative session
   * @param {string} sessionId - The ID of the session to delete
   * @returns {Promise<Object>} Success response
   */
  deleteSession: async (sessionId) => {
    try {
      const response = await api.delete(`/collaborative-sessions/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Join a collaborative session
   * @param {string} sessionId - The ID of the session to join
   * @param {string} userId - The ID of the user joining the session
   * @returns {Promise<Object>} Updated collaborative session object
   */
  joinSession: async (sessionId, userId) => {
    try {
      const response = await api.put(`/collaborative-sessions/${sessionId}/join`, { userId });
      return response.data;
    } catch (error) {
      console.error(`Error joining collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Leave a collaborative session
   * @param {string} sessionId - The ID of the session to leave
   * @param {string} userId - The ID of the user leaving the session
   * @returns {Promise<Object>} Updated collaborative session object
   */
  leaveSession: async (sessionId, userId) => {
    try {
      const response = await api.put(`/collaborative-sessions/${sessionId}/leave`, { userId });
      return response.data;
    } catch (error) {
      console.error(`Error leaving collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Get chat history for a collaborative session
   * @param {string} sessionId - The ID of the session
   * @returns {Promise<Array>} Chat history
   */
  getChatHistory: async (sessionId) => {
    try {
      const response = await api.get(`/collaborative-sessions/${sessionId}/chat`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching chat history for collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Send a chat message in a collaborative session
   * @param {string} sessionId - The ID of the session
   * @param {string} userId - The ID of the user sending the message
   * @param {string} message - The message content
   * @returns {Promise<Object>} Created message object
   */
  sendChatMessage: async (sessionId, userId, message) => {
    try {
      const response = await api.post(`/collaborative-sessions/${sessionId}/chat`, { userId, message });
      return response.data;
    } catch (error) {
      console.error(`Error sending chat message in collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Get the editor content for a collaborative session
   * @param {string} sessionId - The ID of the session
   * @returns {Promise<Object>} Editor content
   */
  getEditorContent: async (sessionId) => {
    try {
      const response = await api.get(`/collaborative-sessions/${sessionId}/editor`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching editor content for collaborative session ${sessionId}:`, error);
      throw error;
    }
  },

  /**
   * Update the editor content for a collaborative session
   * @param {string} sessionId - The ID of the session
   * @param {string} content - The new editor content
   * @returns {Promise<Object>} Success response
   */
  updateEditorContent: async (sessionId, content) => {
    try {
      const response = await api.post(`/collaborative-sessions/${sessionId}/editor`, { content });
      return response.data;
    } catch (error) {
      console.error(`Error updating editor content for collaborative session ${sessionId}:`, error);
      throw error;
    }
  }
};

export default collaborationService; 
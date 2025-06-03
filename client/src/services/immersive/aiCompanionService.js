import api from '../api';

/**
 * Service for interacting with the AI Coding Companion API
 */
const aiCompanionService = {
  /**
   * Get all AI companions
   * @returns {Promise<Array>} Array of AI companion objects
   */
  getAllCompanions: async () => {
    try {
      const response = await api.get('/ai-companions');
      return response.data;
    } catch (error) {
      console.error('Error fetching AI companions:', error);
      throw error;
    }
  },

  /**
   * Get a specific AI companion by ID
   * @param {string} companionId - The ID of the companion to retrieve
   * @returns {Promise<Object>} AI companion object
   */
  getCompanionById: async (companionId) => {
    try {
      const response = await api.get(`/ai-companions/${companionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching AI companion ${companionId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new AI companion
   * @param {Object} companionData - The data for the new companion
   * @returns {Promise<Object>} Created AI companion object
   */
  createCompanion: async (companionData) => {
    try {
      const response = await api.post('/ai-companions', companionData);
      return response.data;
    } catch (error) {
      console.error('Error creating AI companion:', error);
      throw error;
    }
  },

  /**
   * Update an existing AI companion
   * @param {string} companionId - The ID of the companion to update
   * @param {Object} companionData - The updated companion data
   * @returns {Promise<Object>} Updated AI companion object
   */
  updateCompanion: async (companionId, companionData) => {
    try {
      const response = await api.put(`/ai-companions/${companionId}`, companionData);
      return response.data;
    } catch (error) {
      console.error(`Error updating AI companion ${companionId}:`, error);
      throw error;
    }
  },

  /**
   * Delete an AI companion
   * @param {string} companionId - The ID of the companion to delete
   * @returns {Promise<Object>} Success response
   */
  deleteCompanion: async (companionId) => {
    try {
      const response = await api.delete(`/ai-companions/${companionId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting AI companion ${companionId}:`, error);
      throw error;
    }
  },

  /**
   * Get chat history for an AI companion
   * @param {string} companionId - The ID of the companion
   * @returns {Promise<Array>} Chat history
   */
  getChatHistory: async (companionId) => {
    try {
      const response = await api.get(`/ai-companions/${companionId}/chat-history`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching chat history for AI companion ${companionId}:`, error);
      throw error;
    }
  },

  /**
   * Send a message to an AI companion
   * @param {string} companionId - The ID of the companion
   * @param {string} userId - The ID of the user sending the message
   * @param {string} message - The message content
   * @returns {Promise<Object>} AI response
   */
  sendMessage: async (companionId, userId, message) => {
    try {
      const response = await api.post(`/ai-companions/${companionId}/chat`, { userId, message });
      return response.data;
    } catch (error) {
      console.error(`Error sending message to AI companion ${companionId}:`, error);
      throw error;
    }
  },

  /**
   * Get challenges from an AI companion
   * @param {string} companionId - The ID of the companion
   * @returns {Promise<Array>} List of challenges
   */
  getChallenges: async (companionId) => {
    try {
      const response = await api.get(`/ai-companions/${companionId}/challenges`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching challenges for AI companion ${companionId}:`, error);
      throw error;
    }
  },

  /**
   * Update a challenge from an AI companion
   * @param {string} companionId - The ID of the companion
   * @param {string} challengeId - The ID of the challenge to update
   * @param {Object} challengeData - The updated challenge data
   * @returns {Promise<Object>} Updated challenge
   */
  updateChallenge: async (companionId, challengeId, challengeData) => {
    try {
      const response = await api.put(`/ai-companions/${companionId}/challenges/${challengeId}`, challengeData);
      return response.data;
    } catch (error) {
      console.error(`Error updating challenge ${challengeId} for AI companion ${companionId}:`, error);
      throw error;
    }
  }
};

export default aiCompanionService; 
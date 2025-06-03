import api from '../api';

/**
 * Service for interacting with the Blockchain Credential API
 */
const credentialService = {
  /**
   * Get all credentials
   * @returns {Promise<Array>} Array of credential objects
   */
  getAllCredentials: async () => {
    try {
      const response = await api.get('/credentials');
      return response.data;
    } catch (error) {
      console.error('Error fetching credentials:', error);
      throw error;
    }
  },

  /**
   * Get a specific credential by ID
   * @param {string} credentialId - The ID of the credential to retrieve
   * @returns {Promise<Object>} Credential object
   */
  getCredentialById: async (credentialId) => {
    try {
      const response = await api.get(`/credentials/${credentialId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching credential ${credentialId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new credential
   * @param {Object} credentialData - The data for the new credential
   * @returns {Promise<Object>} Created credential object
   */
  createCredential: async (credentialData) => {
    try {
      const response = await api.post('/credentials', credentialData);
      return response.data;
    } catch (error) {
      console.error('Error creating credential:', error);
      throw error;
    }
  },

  /**
   * Update an existing credential
   * @param {string} credentialId - The ID of the credential to update
   * @param {Object} credentialData - The updated credential data
   * @returns {Promise<Object>} Updated credential object
   */
  updateCredential: async (credentialId, credentialData) => {
    try {
      const response = await api.put(`/credentials/${credentialId}`, credentialData);
      return response.data;
    } catch (error) {
      console.error(`Error updating credential ${credentialId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a credential
   * @param {string} credentialId - The ID of the credential to delete
   * @returns {Promise<Object>} Success response
   */
  deleteCredential: async (credentialId) => {
    try {
      const response = await api.delete(`/credentials/${credentialId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting credential ${credentialId}:`, error);
      throw error;
    }
  },

  /**
   * Verify a credential on the blockchain
   * @param {string} credentialId - The ID of the credential to verify
   * @returns {Promise<Object>} Verification result
   */
  verifyCredential: async (credentialId) => {
    try {
      const response = await api.get(`/credentials/${credentialId}/verify`);
      return response.data;
    } catch (error) {
      console.error(`Error verifying credential ${credentialId}:`, error);
      throw error;
    }
  },

  /**
   * Get token balance and transaction history for a user
   * @param {string} userId - The ID of the user
   * @returns {Promise<Object>} Token information
   */
  getUserTokens: async (userId) => {
    try {
      const response = await api.get(`/tokens/user?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching tokens for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Get transaction history for a user
   * @param {string} userId - The ID of the user
   * @returns {Promise<Array>} Transaction history
   */
  getUserTransactions: async (userId) => {
    try {
      const response = await api.get(`/tokens/transactions/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching transactions for user ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new token transaction
   * @param {string} userId - The ID of the user
   * @param {string} type - Transaction type (EARN or SPEND)
   * @param {number} amount - Transaction amount
   * @param {string} description - Transaction description
   * @returns {Promise<Object>} Updated token information
   */
  createTransaction: async (userId, type, amount, description) => {
    try {
      const response = await api.post('/tokens/transaction', {
        userId,
        type,
        amount,
        description
      });
      return response.data;
    } catch (error) {
      console.error(`Error creating transaction for user ${userId}:`, error);
      throw error;
    }
  }
};

export default credentialService; 
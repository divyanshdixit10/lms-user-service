import api from './api';

// Enquiry service that uses the User API endpoints
const USERS_URL = '/api/v1/users';

const EnquiryService = {
  /**
   * Submit an enquiry (creates a new user)
   * @param {Object} enquiryData - The enquiry form data
   * @param {string} enquiryData.fullName - User's full name
   * @param {string} enquiryData.phoneNumber - User's phone number
   * @param {string} enquiryData.email - User's email address
   * @param {string} enquiryData.courseName - Course of interest
   * @returns {Promise} API response
   */
  submitEnquiry: async (enquiryData) => {
    try {
      const requestData = {
        fullName: enquiryData.fullName,
        phoneNumber: enquiryData.phoneNumber,
        email: enquiryData.email,
        courseName: enquiryData.courseName
      };

      const response = await api.post(USERS_URL, requestData);
      return response.data;
    } catch (error) {
      // Handle common errors
      if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;
        
        if (status === 400) {
          // Validation errors
          throw new Error(data.message || 'Please check your form data and try again.');
        } else if (status === 409) {
          // Conflict - user already exists
          throw new Error('A user with this email or phone number already exists. Please use different credentials or contact support.');
        } else if (status === 500) {
          // Server error
          throw new Error('Server error occurred. Please try again later.');
        } else {
          throw new Error(data.message || 'An unexpected error occurred.');
        }
      } else if (error.request) {
        // Network error
        throw new Error('Network error. Please check your internet connection and try again.');
      } else {
        // Other errors
        throw new Error(error.message || 'An unexpected error occurred.');
      }
    }
  },

  /**
   * Check if a user exists by email
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} Whether user exists
   */
  checkUserExistsByEmail: async (email) => {
    try {
      const response = await api.get(`${USERS_URL}/exists/email/${encodeURIComponent(email)}`);
      return response.data.data;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  },

  /**
   * Check if a user exists by phone number
   * @param {string} phoneNumber - Phone number to check
   * @returns {Promise<boolean>} Whether user exists
   */
  checkUserExistsByPhone: async (phoneNumber) => {
    try {
      const response = await api.get(`${USERS_URL}/exists/phone/${encodeURIComponent(phoneNumber)}`);
      return response.data.data;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  },

  /**
   * Get user by email (for checking existing enquiries)
   * @param {string} email - User's email
   * @returns {Promise} User data
   */
  getUserByEmail: async (email) => {
    try {
      const response = await api.get(`${USERS_URL}/email/${encodeURIComponent(email)}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null; // User not found
      }
      throw error;
    }
  },

  /**
   * Get users by course name (for analytics/admin purposes)
   * @param {string} courseName - Course name
   * @returns {Promise} List of users
   */
  getUsersByCourse: async (courseName) => {
    try {
      const response = await api.get(`${USERS_URL}/course/${encodeURIComponent(courseName)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get count of users by course (for analytics)
   * @param {string} courseName - Course name
   * @returns {Promise<number>} Count of users
   */
  getUserCountByCourse: async (courseName) => {
    try {
      const response = await api.get(`${USERS_URL}/count/course/${encodeURIComponent(courseName)}`);
      return response.data.data;
    } catch (error) {
      console.error('Error getting user count:', error);
      return 0;
    }
  },

  /**
   * Get count of users by status (for admin dashboard)
   * @param {string} status - User status
   * @returns {Promise<number>} Count of users
   */
  getUserCountByStatus: async (status) => {
    try {
      const response = await api.get(`${USERS_URL}/count/status/${status}`);
      return response.data.data;
    } catch (error) {
      console.error('Error getting user count by status:', error);
      return 0;
    }
  }
};

export default EnquiryService; 
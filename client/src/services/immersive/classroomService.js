import api from '../api';

/**
 * Service for interacting with the Virtual Classroom API
 */
const classroomService = {
  /**
   * Get all virtual classrooms
   * @returns {Promise<Array>} Array of virtual classroom objects
   */
  getAllClassrooms: async () => {
    try {
      const response = await api.get('/virtual-classrooms');
      return response.data;
    } catch (error) {
      console.error('Error fetching virtual classrooms:', error);
      throw error;
    }
  },

  /**
   * Get a specific virtual classroom by ID
   * @param {string} classroomId - The ID of the classroom to retrieve
   * @returns {Promise<Object>} Virtual classroom object
   */
  getClassroomById: async (classroomId) => {
    try {
      const response = await api.get(`/virtual-classrooms/${classroomId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching virtual classroom ${classroomId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new virtual classroom
   * @param {Object} classroomData - The data for the new classroom
   * @returns {Promise<Object>} Created virtual classroom object
   */
  createClassroom: async (classroomData) => {
    try {
      const response = await api.post('/virtual-classrooms', classroomData);
      return response.data;
    } catch (error) {
      console.error('Error creating virtual classroom:', error);
      throw error;
    }
  },

  /**
   * Update an existing virtual classroom
   * @param {string} classroomId - The ID of the classroom to update
   * @param {Object} classroomData - The updated classroom data
   * @returns {Promise<Object>} Updated virtual classroom object
   */
  updateClassroom: async (classroomId, classroomData) => {
    try {
      const response = await api.put(`/virtual-classrooms/${classroomId}`, classroomData);
      return response.data;
    } catch (error) {
      console.error(`Error updating virtual classroom ${classroomId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a virtual classroom
   * @param {string} classroomId - The ID of the classroom to delete
   * @returns {Promise<Object>} Success response
   */
  deleteClassroom: async (classroomId) => {
    try {
      const response = await api.delete(`/virtual-classrooms/${classroomId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting virtual classroom ${classroomId}:`, error);
      throw error;
    }
  },

  /**
   * Join a virtual classroom as a student
   * @param {string} classroomId - The ID of the classroom to join
   * @param {string} userId - The ID of the user joining the classroom
   * @returns {Promise<Object>} Updated virtual classroom object
   */
  joinClassroom: async (classroomId, userId) => {
    try {
      const response = await api.post(`/virtual-classrooms/${classroomId}/join`, { userId });
      return response.data;
    } catch (error) {
      console.error(`Error joining virtual classroom ${classroomId}:`, error);
      throw error;
    }
  },

  /**
   * Start a virtual classroom session
   * @param {string} classroomId - The ID of the classroom to start
   * @returns {Promise<Object>} Updated virtual classroom object
   */
  startClassroom: async (classroomId) => {
    try {
      const response = await api.put(`/virtual-classrooms/${classroomId}/start`, {});
      return response.data;
    } catch (error) {
      console.error(`Error starting virtual classroom ${classroomId}:`, error);
      throw error;
    }
  },

  /**
   * End a virtual classroom session
   * @param {string} classroomId - The ID of the classroom to end
   * @returns {Promise<Object>} Updated virtual classroom object
   */
  endClassroom: async (classroomId) => {
    try {
      const response = await api.put(`/virtual-classrooms/${classroomId}/end`, {});
      return response.data;
    } catch (error) {
      console.error(`Error ending virtual classroom ${classroomId}:`, error);
      throw error;
    }
  }
};

export default classroomService; 
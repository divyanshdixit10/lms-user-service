import api from './api';

// All methods will use the mock API which already exists
// The mock API already handles these endpoints
const COURSES_URL = '/courses';

const CourseService = {
  getAllCourses: async () => {
    try {
      const response = await api.get(COURSES_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getPaginatedCourses: async (page = 0, size = 10) => {
    try {
      const response = await api.get(`${COURSES_URL}/paginated?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCourseById: async (id) => {
    try {
      const response = await api.get(`${COURSES_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createCourse: async (courseData) => {
    try {
      const response = await api.post(COURSES_URL, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`${COURSES_URL}/${id}`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`${COURSES_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCoursesByInstructor: async (instructorId) => {
    try {
      const response = await api.get(`${COURSES_URL}/instructor/${instructorId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  searchCourses: async (title) => {
    try {
      const response = await api.get(`${COURSES_URL}/search?title=${encodeURIComponent(title)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCoursesByTags: async (tags) => {
    try {
      // Convert tags array to comma-separated string
      const tagsQuery = Array.isArray(tags) ? tags.join(',') : tags;
      const response = await api.get(`${COURSES_URL}/tags?tags=${encodeURIComponent(tagsQuery)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCoursesByLevel: async (level) => {
    try {
      const response = await api.get(`${COURSES_URL}/level/${level}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getFeaturedCourses: async () => {
    try {
      const response = await api.get(`${COURSES_URL}/featured`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getCoursesByCategory: async (category) => {
    try {
      const response = await api.get(`${COURSES_URL}/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default CourseService; 
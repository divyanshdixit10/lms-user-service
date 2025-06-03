/**
 * Simple API test to verify backend connection
 * You can run this in the browser console to test connectivity
 */

import api from './api';

export const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection to http://localhost:8080...');
    
    // Test a simple GET request to check if backend is running
    const response = await api.get('/api/v1/users');
    console.log('✅ Backend connection successful!', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Backend connection failed:', error.message);
    
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      console.error('Make sure your backend server is running on http://localhost:8080');
    }
    
    return { success: false, error: error.message };
  }
};

export const testEnquirySubmission = async (testData = {
  fullName: 'Test User',
  phoneNumber: '+1234567890',
  email: 'test@example.com',
  courseName: 'Java Full Stack Development'
}) => {
  try {
    console.log('Testing enquiry submission...');
    const response = await api.post('/api/v1/users', testData);
    console.log('✅ Enquiry submission successful!', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Enquiry submission failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}; 
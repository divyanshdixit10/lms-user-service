# Mock API Implementation

This project uses a mock API implementation that completely disconnects the frontend from any backend server requirements. All API calls are handled locally in the browser, with simulated responses and data persistence within the user's session.

## How It Works

1. The file `src/services/api.js` exports the mock implementation from `api.mock.js` instead of using axios or other HTTP clients.
2. The `api.mock.js` file contains:
   - Mock data for all application features
   - Simulated API endpoint handlers
   - Request/response simulation with artificial delays

## Mock Data Structure

The mock data includes:
- Courses
- Coding problems
- Users and authentication
- Virtual campus features
- VR sessions
- Virtual classrooms
- Digital twins
- AI companions
- Blockchain credentials
- Metaverse events
- Code visualizations
- Collaborative sessions
- Token economy

## Service Architecture

All service files (`course.service.js`, `user.service.js`, etc.) maintain their original API structure but now call the mock API instead of a real backend. This allows the application to function entirely offline while preserving the proper architecture.

## Authentication

Authentication is handled locally:
- User credentials are stored in localStorage
- Two demo accounts are available:
  - Admin: admin@gmail.com / admin123
  - Student: student@gmail.com / student123

## Using the Mock API

The mock API automatically handles appropriate responses for different endpoint patterns. For example:
- GET `/courses` - Returns all courses
- GET `/courses/course-1` - Returns a specific course
- POST `/courses` - Creates a new course (simulated)
- PUT `/courses/course-1` - Updates a course (simulated)
- DELETE `/courses/course-1` - Deletes a course (simulated)

The same pattern applies to all other resource types in the application.

## Benefits

1. **Development without Backend**: Allows frontend development to proceed independently
2. **Demo/Presentation Mode**: Provides a fully functional demo that doesn't require server setup
3. **Testing**: Enables testing of UI components without backend dependencies
4. **Offline Mode**: Application can run completely offline

## Notes

- Data persistence is limited to the browser session
- All changes are stored in memory and will be lost on page refresh
- For a production implementation, replace `api.js` to use a real HTTP client connecting to a backend 
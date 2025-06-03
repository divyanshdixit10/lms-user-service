import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseService from '../../services/course.service';

const CoursesList = ({ category, featured, level, limit }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let data;

        if (featured) {
          data = await CourseService.getFeaturedCourses();
        } else if (category) {
          data = await CourseService.getCoursesByCategory(category);
        } else if (level) {
          data = await CourseService.getCoursesByLevel(level);
        } else {
          data = await CourseService.getAllCourses();
        }

        // Apply limit if specified
        const limitedData = limit ? data.slice(0, limit) : data;
        
        setCourses(limitedData);
      } catch (err) {
        setError('Failed to load courses. Please try again later.');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category, featured, level, limit]);

  if (loading) {
    return (
      <div className="grid place-items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md my-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-md my-4 text-center">
        <p className="text-gray-600">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <Link to={`/courses/${course.id}`}>
            <div className="relative pb-[56.25%]">
              <img 
                src={course.thumbnail || 'https://via.placeholder.com/300x170?text=No+Image'} 
                alt={course.title}
                className="absolute inset-0 w-full h-full object-cover" 
              />
              {course.isFeatured && (
                <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  Featured
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {course.level}
                </span>
                <span className="font-bold text-lg">
                  {course.price === 0 ? 'Free' : `$${course.price.toFixed(2)}`}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">{course.rating ? course.rating.toFixed(1) : 'N/A'}</span>
                </div>
                <span className="text-sm text-gray-600">{course.enrollmentCount || 0} students</span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CoursesList; 
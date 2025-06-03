import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const TestimonialsPage: React.FC = () => {
  const { theme } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frontend Developer at Google',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      content: 'OSOP Coding transformed my career. I went from a complete beginner to landing my dream job at Google in just 8 months. The live classes and mentorship were invaluable.',
      company: 'google.svg',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Full Stack Developer at Microsoft',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      content: 'The project-based learning approach helped me build a strong portfolio. The career support team was instrumental in helping me prepare for interviews.',
      company: 'microsoft.svg',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Software Engineer at Amazon',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      content: 'The community aspect of OSOP is amazing. I learned so much from collaborating with other students and getting feedback from experienced mentors.',
      company: 'amazon.svg',
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Backend Developer at Netflix',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      content: 'The curriculum is constantly updated with the latest technologies. I particularly enjoyed the advanced Node.js and microservices courses.',
      company: 'netflix.svg',
    },
  ];

  const stats = [
    { id: 1, value: '15,000+', label: 'Students Enrolled' },
    { id: 2, value: '89%', label: 'Job Placement Rate' },
    { id: 3, value: '$85K', label: 'Average Starting Salary' },
    { id: 4, value: '4.8/5', label: 'Student Satisfaction' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-12`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Student Success Stories
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Hear from our graduates who have transformed their careers through OSOP Coding
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
              } text-center`}
            >
              <div className={`text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-primary-400' : 'text-primary-500'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className={`p-6 rounded-xl ${
                theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
              } shadow-lg`}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className={`text-base mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16"
        >
          <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Watch Student Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((video) => (
              <div
                key={video}
                className={`rounded-xl overflow-hidden ${
                  theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
                }`}
              >
                <div className="aspect-video bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-primary-500/90 hover:bg-primary-600/90 flex items-center justify-center text-white transition-colors">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    From Beginner to Pro
                  </h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Watch how our students transformed their careers through OSOP Coding
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready to Start Your Success Story?
          </h2>
          <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Join thousands of students who have transformed their careers with OSOP Coding
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors">
              Start Learning Now
            </button>
            <button className={`px-8 py-3 rounded-lg ${
              theme === 'dark'
                ? 'bg-secondary-700 hover:bg-secondary-600 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900'
            } font-medium transition-colors`}>
              View Courses
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsPage; 
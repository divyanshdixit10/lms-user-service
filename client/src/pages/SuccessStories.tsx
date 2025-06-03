import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import ParticleBackground from '../components/ui/ParticleBackground';
import GeometricCodePattern from '../components/ui/GeometricCodePattern';

const SuccessStories: React.FC = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentStorySlide, setCurrentStorySlide] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');

  // Success stories data
  const successStories = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Software Engineer',
      company: 'TCS',
      previousRole: 'Fresher',
      course: 'Java Masterclass',
      salary: '₹6.5 LPA',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'From a complete beginner to landing my dream job at TCS. The Java course gave me the confidence and skills I needed.',
      video: 'https://www.youtube.com/embed/ZmID8vdF6c8',
      category: 'java',
      duration: '6 months',
      rating: 5
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      role: 'Data Scientist',
      company: 'Infosys',
      previousRole: 'Mechanical Engineer',
      course: 'Python for Data Science',
      salary: '₹8.2 LPA',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'Career transition from mechanical engineering to data science. Best decision of my life!',
      video: 'https://www.youtube.com/embed/EZROGHX2TCY',
      category: 'python',
      duration: '8 months',
      rating: 5
    },
    {
      id: 3,
      name: 'Sneha Patel',
      role: 'Full Stack Developer',
      company: 'Wipro',
      previousRole: 'Student',
      course: 'Full Stack Web Development',
      salary: '₹7.8 LPA',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'Straight from college to a full-stack developer role. The practical projects made all the difference.',
      video: 'https://www.youtube.com/embed/q0i7v0ZjmBA',
      category: 'web-dev',
      duration: '10 months',
      rating: 5
    },
    {
      id: 4,
      name: 'Amit Singh',
      role: 'AI Engineer',
      company: 'Microsoft',
      previousRole: 'Software Developer',
      course: 'AI/ML Bootcamp',
      salary: '₹15.5 LPA',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'Upskilled from basic programming to AI engineering. Now working on cutting-edge ML projects at Microsoft.',
      video: 'https://www.youtube.com/embed/OYIiAdhd-Ec',
      category: 'ai-ml',
      duration: '12 months',
      rating: 5
    },
    {
      id: 5,
      name: 'Kavya Reddy',
      role: 'DevOps Engineer',
      company: 'Amazon',
      previousRole: 'System Admin',
      course: 'DevOps & Cloud',
      salary: '₹12.3 LPA',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'Transitioned from system administration to DevOps. The cloud expertise opened doors to Amazon.',
      video: 'https://www.youtube.com/embed/TAHnPRA-ghA',
      category: 'devops',
      duration: '9 months',
      rating: 5
    },
    {
      id: 6,
      name: 'Vikash Gupta',
      role: 'Cybersecurity Analyst',
      company: 'Accenture',
      previousRole: 'Network Engineer',
      course: 'Cybersecurity Fundamentals',
      salary: '₹9.8 LPA',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      story: 'From network engineering to cybersecurity. The comprehensive course prepared me for real-world challenges.',
      video: 'https://www.youtube.com/embed/pEvczGfvs9k',
      category: 'security',
      duration: '7 months',
      rating: 5
    }
  ];

  // Filter categories
  const filterCategories = [
    { id: 'all', label: 'All Stories', count: successStories.length },
    { id: 'java', label: 'Java', count: successStories.filter(s => s.category === 'java').length },
    { id: 'python', label: 'Python', count: successStories.filter(s => s.category === 'python').length },
    { id: 'web-dev', label: 'Web Dev', count: successStories.filter(s => s.category === 'web-dev').length },
    { id: 'ai-ml', label: 'AI/ML', count: successStories.filter(s => s.category === 'ai-ml').length },
    { id: 'devops', label: 'DevOps', count: successStories.filter(s => s.category === 'devops').length },
    { id: 'security', label: 'Security', count: successStories.filter(s => s.category === 'security').length }
  ];

  // Statistics data
  const stats = [
    { label: 'Students Placed', value: '25,000+', icon: '👨‍💼' },
    { label: 'Average Salary Hike', value: '150%', icon: '📈' },
    { label: 'Top Companies', value: '500+', icon: '🏢' },
    { label: 'Success Rate', value: '98%', icon: '🎯' }
  ];

  // Filter stories based on active filter
  const filteredStories = activeFilter === 'all' 
    ? successStories 
    : successStories.filter(story => story.category === activeFilter);

  const openVideoModal = (videoUrl: string) => {
    setActiveVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Auto-rotate featured stories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStorySlide((prev) => (prev + 1) % Math.min(filteredStories.length, 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [filteredStories.length]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={80}
            connectParticles={true}
            className="opacity-40"
            colorScheme={theme === 'dark' ? 'purple' : 'blue'}
          />
          <GeometricCodePattern
            className="z-0 opacity-10"
            colorScheme="indigo"
            density="low"
            codeElements={true}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className={`px-6 py-2 rounded-full text-sm font-semibold ${
                theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                🎉 Real Success Stories
              </span>
            </motion.div>
            
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
            }`}>
              Success Stories
            </h1>
            
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Discover how our students transformed their careers and achieved their dreams through our comprehensive training programs.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`text-center p-6 rounded-xl ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                    : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                }`}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`text-2xl md:text-3xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className={`py-8 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {filterCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? theme === 'dark'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-600 text-white'
                    : theme === 'dark'
                      ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`${
                    theme === 'dark'
                      ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                      : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                  } rounded-xl overflow-hidden group hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Story Header */}
                  <div className="relative">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    
                    {/* Play button for video */}
                    <button
                      onClick={() => openVideoModal(story.video)}
                      className="absolute top-4 right-4 w-12 h-12 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>

                    {/* Salary badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        theme === 'dark' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-green-600 text-white'
                      }`}>
                        {story.salary}
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <img 
                          src={story.image} 
                          alt={story.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className={`font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          {story.name}
                        </h3>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                        }`}>
                          {story.role} at {story.company}
                        </p>
                      </div>
                    </div>

                    <p className={`text-sm mb-4 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {story.story}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                          Previous Role:
                        </span>
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                          {story.previousRole}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                          Course:
                        </span>
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                          {story.course}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                          Duration:
                        </span>
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                          {story.duration}
                        </span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {Array.from({ length: story.rating }).map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className={`text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        Excellent Experience
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-4xl bg-black rounded-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={activeVideoUrl} 
                  title="Success story video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <button
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                onClick={closeVideoModal}
                aria-label="Close video"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Ready to Write Your Success Story?
            </h2>
            
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Join thousands of successful students who transformed their careers with our expert-led training programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/#demo-class" 
                className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                }`}
              >
                <span>Start Your Journey</span>
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a 
                href="/courses" 
                className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 border-2 ${
                  theme === 'dark'
                    ? 'border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-700/50'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>Explore Courses</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories; 
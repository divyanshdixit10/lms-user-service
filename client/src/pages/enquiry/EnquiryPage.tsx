import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleBackground from '../../components/ui/ParticleBackground';
import HeroGradientText from '../../components/ui/HeroGradientText';
import CodeBackgroundAnimation from '../../components/ui/CodeBackgroundAnimation';
import GlassCard from '../../components/ui/GlassCard';
import CircuitPatternAnimation from '../../components/ui/CircuitPatternAnimation';
import NeuralNetworkAnimation from '../../components/ui/NeuralNetworkAnimation';
import EnquiryService from '../../services/enquiry.service.js';

// Enhanced Course options with modern tech stack
const courseOptions = [
  'Full Stack Web Development',
  'Mobile App Development',
  'Data Science & AI/ML',
  'Cloud Computing & DevOps',
  'Cybersecurity & Ethical Hacking',
  'Machine Learning & Deep Learning',
  'Blockchain Development',
  'UI/UX Design & Frontend',
  'Digital Marketing & Growth',
  'Python Programming & Automation',
  'Java Full Stack Development',
  'JavaScript & React Mastery',
  'Node.js & Backend Development',
  'Database Management & Analytics',
  'Game Development',
  'AR/VR Development',
  'IoT & Embedded Systems',
  'Other'
];

// Advanced floating particles component
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Success Story Card with hover effects
const SuccessStoryCard: React.FC<{
  story: {
    name: string;
    course: string;
    company: string;
    testimonial: string;
    image: string;
    achievement: string;
  };
  theme: string;
  index: number;
}> = ({ story, theme, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        y: -20,
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative rounded-3xl p-8 overflow-hidden backdrop-blur-xl border ${
        theme === 'dark'
          ? 'bg-slate-900/40 border-slate-700/50 hover:border-blue-500/50'
          : 'bg-white/40 border-slate-200/50 hover:border-blue-400/50'
      } shadow-2xl hover:shadow-blue-500/20 transition-all duration-500`}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated background gradient */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${story.image} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
      />
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-teal-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-teal-500/20 transition-all duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            className={`w-16 h-16 rounded-2xl ${story.image} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {story.name.charAt(0)}
          </motion.div>
          <div>
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
              {story.name}
            </h3>
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {story.course}
            </p>
            <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              {story.company}
            </p>
          </div>
        </div>
        
        {/* Achievement badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
          theme === 'dark' 
            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
            : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {story.achievement}
        </div>
        
        <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          "{story.testimonial}"
        </p>
        
        {/* Interactive elements */}
        <motion.div 
          className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.2 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
          <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Verified Success
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const EnquiryPage: React.FC = () => {
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const formInViewRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formInViewRef);
  const { scrollY } = useScroll();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Advanced scroll animations
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  
  // Spring animations for smooth interactions
  const springConfig = { damping: 25, stiffness: 300 };
  const scaleSpring = useSpring(1, springConfig);
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  
  // Get course information from URL parameters
  const courseId = searchParams.get('courseId');
  const courseName = searchParams.get('courseName');
  const coursePrice = searchParams.get('coursePrice');
  const enrollmentLink = "https://gontq.courses.store/649688?utm_source=other&utm_medium=tutor-course-referral&utm_campaign=course-overview-webapp";
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    courseName: courseName || '',
    message: '',
    experience: '',
    goals: ''
  });

  const [formErrors, setFormErrors] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    courseName: ''
  });

  const [focusedField, setFocusedField] = useState<string>('');

  // Enhanced success stories with achievements
  const successStories = [
    {
      name: 'Rajesh Kumar',
      course: 'Full Stack Development',
      company: 'Google',
      achievement: '400% Salary Increase',
      testimonial: 'OSOP\'s immersive learning environment and real-world projects helped me transition from a non-tech background to landing my dream job at Google. The mentorship was extraordinary!',
      image: 'bg-gradient-to-br from-blue-500 to-purple-600'
    },
    {
      name: 'Priya Sharma',
      course: 'Data Science & AI/ML',
      company: 'Microsoft',
      achievement: 'AI Research Team Lead',
      testimonial: 'The cutting-edge curriculum and hands-on ML projects at OSOP prepared me perfectly for the AI revolution. Now I\'m leading breakthrough research at Microsoft.',
      image: 'bg-gradient-to-br from-green-500 to-teal-600'
    },
    {
      name: 'Arjun Patel',
      course: 'Cloud Computing & DevOps',
      company: 'Amazon AWS',
      achievement: 'Senior Cloud Architect',
      testimonial: 'OSOP\'s cloud-native approach and DevOps mastery program fast-tracked my career. Within 8 months, I became a Senior Cloud Architect at AWS.',
      image: 'bg-gradient-to-br from-orange-500 to-red-600'
    },
    {
      name: 'Sneha Reddy',
      course: 'Cybersecurity',
      company: 'Tesla',
      achievement: 'Security Team Lead',
      testimonial: 'The advanced cybersecurity program at OSOP with real hacking simulations prepared me for the most challenging security roles in the industry.',
      image: 'bg-gradient-to-br from-purple-500 to-pink-600'
    }
  ];

  // Calculate form progress
  useEffect(() => {
    const fields = ['fullName', 'email', 'phoneNumber', 'courseName'];
    const filledFields = fields.filter(field => formData[field as keyof typeof formData].trim() !== '');
    setFormProgress((filledFields.length / fields.length) * 100);
  }, [formData]);

  useEffect(() => {
    if (searchParams.get('course')) {
      setFormData(prev => ({
        ...prev,
        courseName: searchParams.get('course') || ''
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (submitted) {
      const redirectUrl = searchParams.get('redirect') || '/courses';
      navigate(redirectUrl);
    }
  }, [submitted, searchParams, navigate]);

  // Enhanced validation with real-time feedback
  const validateField = (name: string, value: string) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full name is required';
        } else if (value.length < 2 || value.length > 100) {
          error = 'Full name must be between 2 and 100 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = 'Full name should contain only letters and spaces';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please provide a valid email address';
        } else if (value.length > 150) {
          error = 'Email must not exceed 150 characters';
        }
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^[+]?[0-9]{10,15}$/.test(value)) {
          error = 'Phone number should be 10-15 digits and may start with +';
        }
        break;
      case 'courseName':
        if (!value) {
          error = 'Please select a course';
        }
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const errors: typeof formErrors = {
      fullName: '',
      email: '',
      phoneNumber: '',
      courseName: ''
    };

    Object.keys(errors).forEach(field => {
      errors[field as keyof typeof errors] = validateField(field, formData[field as keyof typeof formData]);
    });

    setFormErrors(errors);
    return !Object.values(errors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      // Shake animation for errors
      scaleSpring.set(0.98);
      setTimeout(() => scaleSpring.set(1), 200);
      return;
    }

    setLoading(true);

    try {
      const enquiryData = {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        courseName: formData.courseName
      };

      await EnquiryService.submitEnquiry(enquiryData);
      setSubmitted(true);
      
      // Reset form with animation
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          courseName: '',
          message: '',
          experience: '',
          goals: ''
        });
        
        // Redirect to enrollment link after successful submission
        if (enrollmentLink) {
          window.open(enrollmentLink, '_blank');
        }
      }, 500);
    } catch (error: any) {
      console.error('Enquiry submission failed:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Failed to submit enquiry. Please try again.');
      }
      
      // Error shake animation
      scaleSpring.set(0.95);
      setTimeout(() => scaleSpring.set(1), 300);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    if (formErrors[name as keyof typeof formErrors]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleInputFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleInputBlur = (fieldName: string, value: string) => {
    setFocusedField('');
    const error = validateField(fieldName, value);
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const resetForm = () => {
    setSubmitted(false);
    setError('');
    setCurrentStep(1);
    setFormProgress(0);
    setFormErrors({
      fullName: '',
      email: '',
      phoneNumber: '',
      courseName: ''
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      theme === 'dark' 
        ? 'bg-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
    }`}>
      {/* Enhanced Background Elements with better contrast */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary background with glassmorphism */}
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
            : 'bg-gradient-to-br from-white/80 via-blue-50/80 to-purple-50/80'
        }`} />
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-transparent" />
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-purple-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-teal-500/20 to-transparent" />
        </div>
        
        {/* Floating elements for depth */}
        <FloatingElements />
        
        {/* Subtle pattern overlay */}
        <div className={`absolute inset-0 opacity-10 ${
          theme === 'dark' ? 'opacity-5' : 'opacity-20'
        }`}>
          <ParticleBackground />
          <CircuitPatternAnimation />
        </div>
        
        {/* Neural network background with reduced opacity */}
        <div className="absolute inset-0 opacity-10">
          <NeuralNetworkAnimation />
        </div>
      </div>

      {/* Hero Section with enhanced glassmorphism */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        {/* Hero background with better contrast */}
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900/90 via-blue-900/30 to-purple-900/30'
            : 'bg-gradient-to-br from-white/60 via-blue-100/40 to-purple-100/40'
        } backdrop-blur-sm`} />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroGradientText 
              text="Start Your Journey"
              className="text-6xl md:text-8xl font-bold mb-8"
              gradientColors="from-blue-600 via-purple-600 to-teal-600"
              animationType="reveal"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              Transform your career with 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mx-2">
                industry-leading courses
              </span>
              and join
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600 mx-2">
                thousands of successful graduates
              </span>
            </motion.p>

            {/* Enhanced statistics with glassmorphism cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            >
              {[
                { number: '10,000+', label: 'Students Trained', color: 'from-blue-600 to-purple-600', icon: '👨‍🎓' },
                { number: '95%', label: 'Placement Rate', color: 'from-green-600 to-teal-600', icon: '🎯' },
                { number: '500+', label: 'Partner Companies', color: 'from-orange-600 to-red-600', icon: '🏢' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`p-6 rounded-2xl backdrop-blur-xl border shadow-2xl ${
                    theme === 'dark'
                      ? 'bg-slate-800/40 border-slate-700/50 hover:border-blue-500/50'
                      : 'bg-white/60 border-white/50 hover:border-blue-400/50'
                  }`}
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12"
            >
              <motion.button
                onClick={() => formInViewRef.current?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white font-bold text-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-300"
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Button content */}
                <span className="relative z-10">Get Started Today</span>
                <motion.svg 
                  className="relative z-10 w-6 h-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </motion.svg>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Enquiry Form Section with glassmorphism */}
      <section ref={formInViewRef} className="relative py-20">
        {/* Section background with enhanced glassmorphism */}
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-slate-900/50 to-slate-800/50'
            : 'bg-gradient-to-b from-white/30 to-blue-50/30'
        } backdrop-blur-sm`} />
        
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* Enhanced section header */}
            <div className="text-center mb-16">
              <motion.h2 
                className="text-5xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
                  Submit Your Enquiry
                </span>
              </motion.h2>
              
              {/* Course Information Banner */}
              {courseName && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl mb-6 ${
                    theme === 'dark'
                      ? 'bg-blue-900/30 border border-blue-700/50 text-blue-300'
                      : 'bg-blue-50 border border-blue-200 text-blue-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-semibold">Course Selected: {courseName}</span>
                  {coursePrice && (
                    <span className={`px-2 py-1 rounded-lg text-sm ${
                      theme === 'dark' ? 'bg-blue-800/50' : 'bg-blue-100'
                    }`}>
                      {coursePrice}
                    </span>
                  )}
                </motion.div>
              )}
              
              <motion.p 
                className={`text-xl font-medium ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'} mb-8`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Take the first step towards your dream career. Our admissions team will contact you within 24 hours.
              </motion.p>
              
              {/* Progress indicator */}
              <motion.div 
                className="max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className={`relative h-2 rounded-full overflow-hidden ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                }`}>
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {Math.round(formProgress)}% Complete
                </p>
              </motion.div>
            </div>

            {/* Enhanced form card with better glassmorphism */}
            <motion.div
              style={{ scale: scaleSpring }}
              className={`relative rounded-3xl backdrop-blur-2xl border shadow-2xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-slate-800/30 border-slate-700/50'
                  : 'bg-white/50 border-white/50'
              }`}
            >
              {/* Card glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="text-center py-16"
                    >
                      {/* Success animation */}
                      <motion.div 
                        className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl"
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                      >
                        <motion.svg 
                          className="w-12 h-12 text-white" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.5 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      </motion.div>
                      
                      <motion.h3 
                        className={`text-4xl font-bold mb-6 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Enquiry Submitted Successfully!
                      </motion.h3>
                      
                      <motion.p 
                        className={`text-lg mb-8 max-w-md mx-auto ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        Thank you for your interest in OSOP. Our admissions team will contact you within 24 hours to discuss your learning goals and course options.
                        {courseName && (
                          <span className="block mt-2 font-semibold text-blue-600">
                            You will be redirected to complete your enrollment for "{courseName}".
                          </span>
                        )}
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          onClick={resetForm}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                        >
                          Submit Another Enquiry
                        </motion.button>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            to="/courses"
                            className={`inline-block px-8 py-4 border-2 font-bold rounded-xl transition-all duration-300 ${
                              theme === 'dark'
                                ? 'border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-800'
                                : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                            }`}
                          >
                            Browse Courses
                          </Link>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl"
                        >
                          {error}
                        </motion.div>
                      )}

                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 }}
                        >
                          <label className={`block text-sm font-semibold mb-2 ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            onFocus={() => handleInputFocus('fullName')}
                            onBlur={(e) => handleInputBlur('fullName', e.target.value)}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                              formErrors.fullName
                                ? 'border-red-500 focus:border-red-500'
                                : theme === 'dark'
                                ? 'border-slate-600 bg-slate-800 text-white focus:border-blue-500'
                                : 'border-slate-300 bg-white focus:border-blue-500'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                          {formErrors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.fullName}</p>
                          )}
                        </motion.div>

                        {/* Email */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 }}
                        >
                          <label className={`block text-sm font-semibold mb-2 ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            onFocus={() => handleInputFocus('email')}
                            onBlur={(e) => handleInputBlur('email', e.target.value)}
                            placeholder="Enter your email address"
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                              formErrors.email
                                ? 'border-red-500 focus:border-red-500'
                                : theme === 'dark'
                                ? 'border-slate-600 bg-slate-800 text-white focus:border-blue-500'
                                : 'border-slate-300 bg-white focus:border-blue-500'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                          )}
                        </motion.div>

                        {/* Phone Number */}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 }}
                        >
                          <label className={`block text-sm font-semibold mb-2 ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            onFocus={() => handleInputFocus('phoneNumber')}
                            onBlur={(e) => handleInputBlur('phoneNumber', e.target.value)}
                            placeholder="Enter your phone number"
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                              formErrors.phoneNumber
                                ? 'border-red-500 focus:border-red-500'
                                : theme === 'dark'
                                ? 'border-slate-600 bg-slate-800 text-white focus:border-blue-500'
                                : 'border-slate-300 bg-white focus:border-blue-500'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          />
                          {formErrors.phoneNumber && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.phoneNumber}</p>
                          )}
                        </motion.div>

                        {/* Course Selection */}
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 }}
                        >
                          <label className={`block text-sm font-semibold mb-2 ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            Course of Interest <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="courseName"
                            value={formData.courseName}
                            onChange={handleInputChange}
                            onFocus={() => handleInputFocus('courseName')}
                            onBlur={(e) => handleInputBlur('courseName', e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
                              formErrors.courseName
                                ? 'border-red-500 focus:border-red-500'
                                : theme === 'dark'
                                ? 'border-slate-600 bg-slate-800 text-white focus:border-blue-500'
                                : 'border-slate-300 bg-white focus:border-blue-500'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          >
                            <option value="">Select a course</option>
                            {courseOptions.map((course) => (
                              <option key={course} value={course}>
                                {course}
                              </option>
                            ))}
                          </select>
                          {formErrors.courseName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.courseName}</p>
                          )}
                        </motion.div>
                      </div>

                      {/* Message */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Additional Message (Optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          onFocus={() => handleInputFocus('message')}
                          onBlur={(e) => handleInputBlur('message', e.target.value)}
                          placeholder="Tell us about your goals, experience, or any questions you have..."
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 resize-none ${
                            theme === 'dark'
                              ? 'border-slate-600 bg-slate-800 text-white focus:border-blue-500'
                              : 'border-slate-300 bg-white focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        />
                      </motion.div>

                      {/* Submit Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="pt-4"
                      >
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl"
                        >
                          {loading ? (
                            <div className="flex items-center justify-center gap-3">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Submitting...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-3">
                              Submit Enquiry
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                            </div>
                          )}
                        </button>
                      </motion.div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                Success Stories
              </span>
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Join thousands of students who transformed their careers with OSOP
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <SuccessStoryCard
                key={index}
                story={story}
                theme={theme}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                Ready to Get Started?
              </span>
            </h2>
            <p className={`text-xl mb-8 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
              Don't wait - your future in tech starts today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                Browse All Courses
              </Link>
              <Link
                to="/contact"
                className={`px-8 py-4 border-2 font-semibold rounded-xl transform hover:scale-105 transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-slate-600 text-slate-300 hover:border-slate-500'
                    : 'border-slate-300 text-slate-700 hover:border-slate-400'
                }`}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnquiryPage; 
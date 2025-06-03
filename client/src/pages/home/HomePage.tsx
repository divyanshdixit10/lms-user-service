import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleBackground from '../../components/ui/ParticleBackground';
import HeroImage3D from '../../components/ui/HeroImage3D';
import HeroGradientText from '../../components/ui/HeroGradientText';
import CodeBackgroundAnimation from '../../components/ui/CodeBackgroundAnimation';
import GeometricCodePattern from '../../components/ui/GeometricCodePattern';
import CircuitPatternAnimation from '../../components/ui/CircuitPatternAnimation';
import NeuralNetworkAnimation from '../../components/ui/NeuralNetworkAnimation';
import GlassCard from '../../components/ui/GlassCard';
import CourseCard from '../../components/courses/CourseCard';
import TestimonialCard from '../../components/ui/TestimonialCard';
import CompanyCard from '../../components/ui/CompanyCard';
import { Course, coursesData, getPopularCourses } from '../../data/coursesData';

const HomePage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [currentCourseSlide, setCurrentCourseSlide] = useState(0);
  const [courseSlideDirection, setCourseSlideDirection] = useState<'left' | 'right'>('right');
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [currentEventSlide, setCurrentEventSlide] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    experience: ''
  });
  const [testimonialSlideDirection, setTestimonialSlideDirection] = useState<'left' | 'right'>('right');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState('');
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [animatedCounters, setAnimatedCounters] = useState({
    students: 0,
    companies: 0,
    successRate: 0
  });
  
  // Add separate state variables for each slider section
  const [currentTopicSlide, setCurrentTopicSlide] = useState(0);
  const [currentBenefitSlide, setCurrentBenefitSlide] = useState(0);

  const heroSlides = [
    {
      title: "Master Modern Development",
      subtitle: "Learn the most in-demand skills with our expert-led training and hands-on projects",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      cta: "Start Coding",
      particleColor: 'from-indigo-500 to-purple-500',
      color: 'from-indigo-500 to-purple-500',
      stats: {
        graduates: '10,000+',
        companies: '500+',
        rating: '4.9/5'
      }
    },
    {
      title: "AI & Machine Learning",
      subtitle: "Build intelligent applications with cutting-edge AI technologies and deep learning frameworks",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore AI Courses",
      particleColor: 'from-purple-500 to-pink-500',
      color: 'from-purple-500 to-pink-500',
      stats: {
        aiProjects: '150+',
        frameworks: '12+',
        rating: '4.8/5'
      }
    },
    {
      title: "Cloud & DevOps Mastery",
      subtitle: "Scale your applications with modern infrastructure and automated deployment pipelines",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
      cta: "Learn Cloud",
      particleColor: 'from-blue-500 to-cyan-500',
      color: 'from-blue-500 to-cyan-500',
      stats: {
        deployments: '1000+',
        platforms: '8+',
        rating: '4.9/5'
      }
    }
  ];

  // Popular topics data
  const popularTopics = [
    {
      title: 'Artificial Intelligence',
      icon: '🤖',
      description: 'Learn the fundamentals of AI, neural networks, and machine learning algorithms.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Data Analytics',
      icon: '📊',
      description: 'Master data analysis techniques, visualization, and statistical methods.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Machine Learning',
      icon: '🧠',
      description: 'Build predictive models and implement cutting-edge ML algorithms.',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Web Development',
      icon: '🌐',
      description: 'Create modern web applications with the latest frameworks and tools.',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  // Get all courses for the Popular Courses section (using shared data)
  const popularCourses = coursesData.map(course => ({
    title: course.title,
    image: course.image,
    price: course.price,
    duration: course.duration,
    rating: course.rating,
    students: `${(course.students / 1000).toFixed(1)}K+`,
    level: course.level,
    id: course.id
  }));

  // Benefits data
  const benefits = [
    {
      title: 'Quality Content',
      description: 'Industry-relevant curriculum designed by experts with years of experience.',
      icon: '📚',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      title: 'Mentor Support',
      description: '1-on-1 mentoring sessions with industry professionals to guide your learning journey.',
      icon: '👨‍🏫',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      title: 'Industry Projects',
      description: 'Work on real-world projects that add significant value to your portfolio.',
      icon: '💼',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Placement Assistance',
      description: 'Get comprehensive career support from resume building to interview preparation.',
      icon: '🚀',
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Lifetime Access',
      description: 'Unlimited access to course material, updates, and our alumni network.',
      icon: '🔑',
      color: 'from-amber-500 to-orange-600'
    },
    {
      title: 'Community Support',
      description: 'Join a vibrant community of learners and professionals for networking.',
      icon: '👥',
      color: 'from-rose-500 to-pink-600'
    }
  ];

  // Video testimonials data
  const testimonials = [
    {
      name: 'Dharmendra Bajpai',
      company: 'OSOP',
      role: 'Founder & Lead Instructor',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      video: 'https://www.youtube.com/embed/ZmID8vdF6c8',
      quote: 'Learn how to program in Python with this comprehensive introduction. Perfect for beginners starting their coding journey.',
      title: 'Python Programming Introduction for Beginners'
    },
    {
      name: 'Programming Expert',
      company: 'OSOP Coding',
      role: 'Senior Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      video: 'https://www.youtube.com/embed/EZROGHX2TCY',
      quote: 'This complete Java tutorial covers everything from basic concepts to advanced techniques in a structured, easy-to-follow format.',
      title: 'Complete Java Programming Tutorial'
    },
    {
      name: 'Tech Instructor',
      company: 'OSOP Coding Academy',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      video: 'https://www.youtube.com/embed/q0i7v0ZjmBA',
      quote: 'Master C programming with this comprehensive guide that takes you from fundamentals to complex concepts with practical examples.',
      title: 'Advanced C Programming Tutorial'
    },
    {
      name: 'Web Development Expert',
      company: 'OSOP Tech',
      role: 'Frontend Engineer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
      video: 'https://www.youtube.com/embed/OYIiAdhd-Ec',
      quote: 'This HTML tutorial covers everything you need to know to build modern websites. Learn HTML structure, tags, and best practices.',
      title: 'HTML Tutorial for Beginners'
    },
    {
      name: 'Database Specialist',
      company: 'OSOP DB',
      role: 'Database Administrator',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      video: 'https://www.youtube.com/embed/TAHnPRA-ghA',
      quote: 'Learn SQL with this complete tutorial. Master database queries, joins, and advanced SQL techniques for data management.',
      title: 'Complete SQL Tutorial'
    },
    {
      name: 'AI Researcher',
      company: 'OSOP AI',
      role: 'AI Developer',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      video: 'https://www.youtube.com/embed/CiXi9FTXnnA',
      quote: 'This in-depth machine learning tutorial helps you understand how algorithms learn from data to make predictions and automate decisions.',
      title: 'Machine Learning Fundamentals'
    },
    {
      name: 'Cybersecurity Expert',
      company: 'OSOP Security',
      role: 'Security Analyst',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      video: 'https://www.youtube.com/embed/pEvczGfvs9k',
      quote: 'Learn cybersecurity best practices with this comprehensive tutorial on protecting systems, data, and networks from threats.',
      title: 'Cybersecurity Fundamentals'
    }
  ];

  // Placement drives data
  const placementEvents = [
    {
      title: 'TCS Campus Drive 2023',
      date: 'June 15, 2023',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Over 50 students placed with packages ranging from 4.5 to 7.5 LPA.',
      students: 50,
      icon: '🏢'
    },
    {
      title: 'Infosys Recruitment Drive',
      date: 'May 22, 2023',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
      description: 'Campus interviews for Power Programmer and Systems Engineer roles.',
      students: 35,
      icon: '🖥️'
    },
    {
      title: 'Wipro Elite NLTH Program',
      date: 'April 10, 2023',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'National Level Talent Hunt with coding assessments and interviews.',
      students: 42,
      icon: '🏆'
    },
    {
      title: 'Tech Mahindra Recruitment',
      date: 'March 5, 2023',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Virtual campus drive for Associate Software Engineer positions.',
      students: 28,
      icon: '💻'
    }
  ];

  // Company logos data
  const companies = [
    { name: 'TCS', logo: 'https://logos-world.net/wp-content/uploads/2020/10/Tata-Consultancy-Services-Logo.png' },
    { name: 'Infosys', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Infosys-Logo.png' },
    { name: 'Wipro', logo: 'https://logos-world.net/wp-content/uploads/2020/10/Wipro-Logo.png' },
    { name: 'Microsoft', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png' },
    { name: 'Google', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png' },
    { name: 'Amazon', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png' },
    { name: 'IBM', logo: 'https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo.png' },
    { name: 'Accenture', logo: 'https://logos-world.net/wp-content/uploads/2020/03/Accenture-Symbol.png' },
    { name: 'Cognizant', logo: 'https://logos-world.net/wp-content/uploads/2021/08/Cognizant-Symbol.png' }
  ];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const coursesSectionRef = useRef<HTMLDivElement>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement>(null);
  const eventsSectionRef = useRef<HTMLDivElement>(null);
  const logosSectionRef = useRef<HTMLDivElement>(null);
  const mentorSectionControls = useAnimation();
  const topicsSectionControls = useAnimation();
  const benefitsSectionControls = useAnimation();

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Auto-rotate topic slides on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopicSlide((prev) => (prev + 1) % popularTopics.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [popularTopics.length]);

  // Auto-rotate benefit slides on mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitSlide((prev) => (prev + 1) % benefits.length);
    }, 4500);
    
    return () => clearInterval(interval);
  }, [benefits.length]);

  // Animate sections on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'mentor-section') {
              mentorSectionControls.start("visible");
            } else if (entry.target.id === 'topics-section') {
              topicsSectionControls.start("visible");
            } else if (entry.target.id === 'benefits-section') {
              benefitsSectionControls.start("visible");
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const mentorSection = document.getElementById('mentor-section');
    const topicsSection = document.getElementById('topics-section');
    const benefitsSection = document.getElementById('benefits-section');

    if (mentorSection) observer.observe(mentorSection);
    if (topicsSection) observer.observe(topicsSection);
    if (benefitsSection) observer.observe(benefitsSection);

    return () => {
      if (mentorSection) observer.unobserve(mentorSection);
      if (topicsSection) observer.unobserve(topicsSection);
      if (benefitsSection) observer.unobserve(benefitsSection);
    };
  }, [mentorSectionControls, topicsSectionControls, benefitsSectionControls]);

  // Form handling
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCourseSlideChange = (direction: 'prev' | 'next') => {
    const totalSlides = Math.ceil(popularCourses.length / 3);
    
    if (direction === 'prev') {
      setCourseSlideDirection('left');
      setCurrentCourseSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
    } else {
      setCourseSlideDirection('right');
      setCurrentCourseSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    }
  };

  const handleTestimonialSlideChange = (direction: 'prev' | 'next') => {
    const totalSlides = testimonials.length;
    
    if (direction === 'prev') {
      setTestimonialSlideDirection('left');
      setCurrentTestimonialSlide(prev => (prev === 0 ? totalSlides - 1 : prev - 1));
    } else {
      setTestimonialSlideDirection('right');
      setCurrentTestimonialSlide(prev => (prev === totalSlides - 1 ? 0 : prev + 1));
    }
  };

  const openVideoModal = (videoUrl: string) => {
    setActiveVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Animated counter hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          // Start counter animation when section is visible
          const duration = 2000; // 2 seconds
          const steps = 20;
          const interval = duration / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            
            setAnimatedCounters({
              students: Math.round(progress * 15000), // 15,000 students
              companies: Math.round(progress * 130), // 130 companies
              successRate: Math.round(progress * 98) // 98% success rate
            });
            
            if (step === steps) clearInterval(timer);
          }, interval);
        }
      },
      { threshold: 0.2 }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => {
      if (videoSectionRef.current) {
        observer.unobserve(videoSectionRef.current);
      }
    };
  }, []);

  const handleCourseClick = (courseId: number) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen overflow-hidden pt-6"
      >
        {/* Dynamic background animations */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={100}
            connectParticles={true}
            className="opacity-60"
            colorScheme={theme === 'dark' ? 'purple' : 'blue'}
          />
          <GeometricCodePattern
            className="z-0 opacity-20"
            colorScheme="blue"
                  density="medium"
            codeElements={true}
                />
              </div>
        
        {/* Content */}
          <motion.div 
          className="relative z-10 container mx-auto px-4 pt-2 pb-8 mt-0"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="flex flex-col lg:flex-row items-center mt-0">
            <div className="lg:w-1/2 mb-6 lg:mb-0 mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, rotateY: 90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -90 }}
                  transition={{ duration: 0.5 }}
                  className="text-center lg:text-left mt-0"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mb-3 mt-0"
                  >
                    <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
                      theme === 'dark' 
                        ? 'bg-indigo-900/40 text-indigo-400 border border-indigo-800/50'
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}>
                      OSOP Coding School
                    </div>
                    
                  <HeroGradientText
                    text={heroSlides[currentSlide].title}
                      gradientColors={`bg-gradient-to-r ${heroSlides[currentSlide].color}`}
                    animationType="reveal"
                      className="text-4xl md:text-6xl lg:text-7xl font-bold"
                    />
                    
                    <p className={`mt-6 text-lg md:text-xl leading-relaxed max-w-xl ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                    {heroSlides[currentSlide].subtitle}
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 mb-12"
                  >
                    <Link
                      to="/courses"
                      className={`group relative flex items-center justify-center px-8 py-4 rounded-xl ${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700'
                          : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600'
                      } text-white font-medium transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 relative overflow-hidden`}
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                      <span className="flex items-center">
                        {heroSlides[currentSlide].cta}
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </Link>
                    
                    <Link
                      to="/about"
                      className={`flex items-center justify-center px-8 py-4 rounded-xl border-2 ${
                        theme === 'dark'
                          ? 'border-slate-700 text-white hover:bg-slate-800/50'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      } font-medium transition-colors`}
                    >
                      Learn More
                    </Link>
                  </motion.div>
                  
                        <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-wrap gap-8 justify-center lg:justify-start"
                  >
                    {Object.entries(heroSlides[currentSlide].stats).map(([key, value], index) => (
                      <div key={key} className="text-center">
                        <div className={`text-2xl font-bold ${
                          theme === 'dark' 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400' 
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'
                        }`}>
                            {value}
                          </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {key.replace(/([A-Z])/g, ' $1').trim().charAt(0).toUpperCase() + key.replace(/([A-Z])/g, ' $1').trim().slice(1)}
                          </div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:w-1/2"
            >
              <div 
                className="relative"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <HeroImage3D
                      imageSrc={heroSlides[currentSlide].image}
                      overlayColor={`bg-gradient-to-tr ${heroSlides[currentSlide].particleColor}/30`}
                      depth={60}
                      hoverEffect={true}
                      floatEffect={true}
                      badgeContent={
                        <div className={`${
                          theme === 'dark'
                            ? 'bg-slate-800/80 backdrop-blur-sm'
                            : 'bg-white/80 backdrop-blur-sm shadow-lg'
                        } p-3 rounded-lg flex items-center gap-3 animate-float-slow`}>
                          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'} font-medium text-sm`}>
                            Industry-Relevant Curriculum
                              </span>
                            </div>
                      }
                      badgePosition="bottom-right"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Slide indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-white w-6'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Our Mentor Section */}
      <section 
        id="mentor-section"
        className={`py-16 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'}`}
      >
        {/* Coding-themed background */}
        <GeometricCodePattern
          className="z-0 opacity-10"
          colorScheme="blue"
          density="low"
          codeElements={true}
        />
        
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -right-[10%] top-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 blur-3xl"></div>
          <div className="absolute -left-[10%] bottom-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-bl from-purple-500/5 to-pink-500/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className={`px-6 py-2 rounded-full text-sm font-semibold ${
                theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                ✨ Meet Our Mentor & Founder
              </span>
            </motion.div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
                theme === 'dark'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
              }`}>
                Our Mentor
              </h2>
            
            <p className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Learn from the visionary founder who has transformed thousands of careers through innovative teaching.
            </p>
          </motion.div>
              
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className={`max-w-5xl mx-auto ${
              theme === 'dark' 
                ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                : 'bg-white shadow-2xl shadow-slate-200/60 border border-slate-100'
            } rounded-3xl overflow-hidden group hover:shadow-3xl transition-all duration-500`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Content Section */}
              <div className="flex flex-col justify-center order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="mb-6">
                    <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Dr. Dharmendra Bajpai Sir
                    </h3>
                    <div className={`text-lg font-medium mb-2 ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      Founder & Owner, OSOP Coding
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-800/50'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        PhD in Computer Science
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-purple-900/50 text-purple-300 border border-purple-800/50'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        Java Expert
                      </span>
                    </div>
                  </div>
                  
                  <blockquote className={`text-xl font-medium mb-6 italic ${
                    theme === 'dark' 
                      ? 'text-indigo-400' 
                      : 'text-indigo-600'
                  }`}>
                    "Excellence in Teaching, Excellence in Learning"
                  </blockquote>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className={`mr-3 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        theme === 'dark'
                          ? 'bg-indigo-900/50 text-indigo-400'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                      </div>
                      <div>
                        <p className={`${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Over 25 years of rich professional teaching experience
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className={`mr-3 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        theme === 'dark'
                          ? 'bg-purple-900/50 text-purple-400'
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className={`${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Successfully trained 25,000+ IT engineers who are now placed in top tech companies worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Achievement Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className={`text-center p-3 rounded-xl ${
                      theme === 'dark' 
                        ? 'bg-slate-700/50 border border-slate-600/50'
                        : 'bg-slate-50 border border-slate-200'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>25+</div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>Years Experience</div>
                    </div>
                    <div className={`text-center p-3 rounded-xl ${
                      theme === 'dark' 
                        ? 'bg-slate-700/50 border border-slate-600/50'
                        : 'bg-slate-50 border border-slate-200'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                      }`}>25K+</div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>Students Trained</div>
                    </div>
                    <div className={`text-center p-3 rounded-xl ${
                      theme === 'dark' 
                        ? 'bg-slate-700/50 border border-slate-600/50'
                        : 'bg-slate-50 border border-slate-200'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'
                      }`}>4.9</div>
                      <div className={`text-xs ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>Rating</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Call to Action */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <a 
                    href="#demo-class" 
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    <span>Book a Class with Bajpai Sir</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  
                  <Link 
                    to="/success-stories" 
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 border-2 ${
                      theme === 'dark'
                        ? 'border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white hover:bg-slate-700/50'
                        : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>View Success Stories</span>
                  </Link>
                </motion.div>
              </div>
              
              {/* Photo Section - Unique Shape */}
              <div className="flex items-center justify-center order-1 lg:order-2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative"
                >
                  {/* Main photo container with circular shape */}
                  <div className="relative w-80 h-80 mx-auto">
                    {/* Outer glow rings */}
                    <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 opacity-20 blur-xl animate-pulse"></div>
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-lg animate-pulse delay-1000"></div>
                    
                    {/* Circular photo container */}
                    <div className="relative w-full h-full">
                      {/* Main circular photo */}
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-1">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-200">
                          <img 
                            src="https://www.osop.in/test/images/sir.jfif" 
                            alt="Dr. Dharmendra Bajpai Sir - Founder & Owner of OSOP Coding, Java Expert & Mentor" 
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating achievement badges */}
                    <div className="absolute -top-4 -right-4 opacity-90 animate-float">
                      <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                        <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-4 -left-4 opacity-90 animate-float delay-500">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                        <div className="text-white text-xs font-semibold">Founder</div>
                      </div>
                    </div>
                    
                    {/* Rotating decorative rings */}
                    <div className="absolute -inset-8 border-2 border-indigo-400/20 rounded-full animate-spin-slow"></div>
                    <div className="absolute -inset-12 border border-purple-400/10 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Floating code elements */}
                  <div className="absolute -top-8 -left-8 opacity-40 text-xs font-mono text-indigo-400 animate-pulse">
                    <div className="bg-black/20 backdrop-blur-sm rounded p-2">
                      class Founder {'{'}<br />
                      &nbsp;&nbsp;vision = true;<br />
                      {'}'}
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-8 -right-8 opacity-40 text-xs font-mono text-purple-400 animate-pulse delay-1000">
                    <div className="bg-black/20 backdrop-blur-sm rounded p-2">
                      def inspire():<br />
                      &nbsp;&nbsp;return "excellence"
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Most Popular Topics Section */}
      <section 
        id="topics-section" 
        className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
      >
        {/* Background effects */}
        <div className="absolute inset-0 z-0">
          <NeuralNetworkAnimation
            className="opacity-20"
            colorScheme={theme === 'dark' ? 'blue' : 'cyan'}
            layerCount={4}
            nodesPerLayer={6}
            activationEffect={true}
          />
        </div>
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                Trending Technologies
              </span>
            </motion.div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
            }`}>
              Most Popular Topics
            </h2>
            
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Explore the most in-demand technologies and skills that are shaping the future of the tech industry
            </p>
            
            {/* Decorative elements */}
            <div className="relative h-1 w-24 mx-auto mt-8 mb-6">
              <div className={`absolute inset-0 bg-gradient-to-r ${
                theme === 'dark' ? 'from-indigo-400 via-purple-400 to-indigo-400' : 'from-indigo-600 via-purple-600 to-indigo-600'
              } rounded-full`}></div>
            </div>
          </motion.div>

          {/* Mobile Slider View (visible only on small screens) */}
          <div className="relative sm:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`topic-${currentTopicSlide}`}
                initial={{ 
                  opacity: 0, 
                  x: 100
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -100,
                  transition: { 
                    duration: 0.3 
                  }
                }}
                className="w-full"
              >
                {(() => {
                  const topic = popularTopics[currentTopicSlide % popularTopics.length];
                  
                  return (
                    <motion.div
                      className={`${
                        theme === 'dark'
                          ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                          : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                      } rounded-xl p-8 mx-auto max-w-sm relative overflow-hidden`}
                    >
                      {/* Background glow */}
                      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${topic.color}`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-br opacity-5 ${topic.color}`}></div>
                      
                      {/* Topic Icon */}
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${topic.color} text-white`}>
                            {topic.icon}
                          </div>
                          <div className="absolute w-20 h-20 rounded-2xl top-2 left-0 bg-black/20 blur-sm -z-10"></div>
                        </div>
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-4 text-center ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {topic.title}
                      </h3>
                      
                      <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-center mb-6`}>
                        {topic.description}
                      </p>
                      
                      <div className="flex justify-center">
                        <a 
                          href="#" 
                          className={`inline-flex items-center text-sm font-medium ${
                            theme === 'dark'
                              ? 'text-indigo-400 hover:text-indigo-300'
                              : 'text-indigo-600 hover:text-indigo-700'
                          }`}
                        >
                          Explore Topic 
                          <svg 
                            className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </a>
                      </div>
                      
                      {/* Progress indicator */}
                      <div className="flex justify-center mt-8">
                        <div className="relative w-full max-w-[200px] h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`absolute h-full bg-gradient-to-r ${topic.color}`} 
                            style={{ width: `${((currentTopicSlide % popularTopics.length) + 1) * (100 / popularTopics.length)}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Mobile slider controls */}
            <div className="flex justify-center mt-8 items-center">
              <button 
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-colors shadow-lg`}
                onClick={() => setCurrentTopicSlide(prev => (prev === 0 ? popularTopics.length - 1 : prev - 1))}
                aria-label="Previous topic"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dots indicator */}
              <div className="flex space-x-1">
                {popularTopics.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTopicSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentTopicSlide % popularTopics.length === index
                        ? theme === 'dark' ? 'bg-indigo-500 w-4' : 'bg-indigo-600 w-4'
                        : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                    }`}
                    aria-label={`Go to topic ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className={`w-10 h-10 rounded-full flex items-center justify-center ml-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-colors shadow-lg`}
                onClick={() => setCurrentTopicSlide(prev => (prev === popularTopics.length - 1 ? 0 : prev + 1))}
                aria-label="Next topic"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Swipe instructions for mobile */}
            <div className={`text-center mt-3 text-xs ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              Swipe or tap arrows to navigate
            </div>
          </div>

          {/* Desktop Grid View (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
                className={`${
                  theme === 'dark'
                    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600'
                    : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                } rounded-xl p-8 relative overflow-hidden group`}
              >
                {/* Background glow */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${topic.color}`}></div>
                
                {/* Topic Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl bg-gradient-to-br ${topic.color} text-white`}>
                    {topic.icon}
                  </div>
                  <div className="absolute w-16 h-16 rounded-2xl top-2 left-2 bg-black/20 blur-sm -z-10"></div>
                </div>
                
                <h3 className={`text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {topic.title}
                </h3>
                
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} mb-4`}>
                  {topic.description}
                </p>
                
                <div className="mt-4">
                  <a 
                    href="#" 
                    className={`inline-flex items-center text-sm font-medium group/link ${
                      theme === 'dark'
                        ? 'text-indigo-400 hover:text-indigo-300'
                        : 'text-indigo-600 hover:text-indigo-700'
                    }`}
                  >
                    Explore Topic 
                    <svg 
                      className="w-4 h-4 ml-1 transform transition-transform group-hover/link:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link 
                to="/courses" 
                className={`inline-flex items-center px-8 py-4 rounded-lg font-medium ${
                  theme === 'dark'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                } transition-colors shadow-lg shadow-indigo-600/20`}
              >
                <span>View All Topics</span>
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section 
        ref={coursesSectionRef}
        className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} relative overflow-hidden`}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-3"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                Top Programs
              </span>
            </motion.div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
            }`}>
              Popular Courses
            </h2>
            
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Choose from our most sought-after courses designed by industry experts
            </p>
          </motion.div>

          {/* Mobile Slider View (visible only on small screens) */}
          <div className="relative sm:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`course-${currentCourseSlide}`}
                initial={{ 
                  opacity: 0, 
                  x: courseSlideDirection === 'right' ? 100 : -100,
                  scale: 0.95
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 35,
                    mass: 0.8,
                    duration: 0.6
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: courseSlideDirection === 'right' ? -100 : 100,
                  scale: 0.95,
                  transition: { 
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.4
                  }
                }}
                className="w-full"
              >
                {(() => {
                  const course = popularCourses[currentCourseSlide % popularCourses.length];
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                      className={`${
                        theme === 'dark'
                          ? 'bg-slate-800/80 border border-slate-700/50'
                          : 'bg-white shadow-xl border border-slate-100'
                      } rounded-xl overflow-hidden mx-auto max-w-sm`}
                    >
                      {/* Course image with overlay */}
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Price tag */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                            theme === 'dark' 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-indigo-600 text-white'
                          }`}>
                            {course.price}
                          </div>
                        </div>
                        
                        {/* Duration tag */}
                        <div className="absolute bottom-4 left-4 z-20">
                          <div className={`px-3 py-1 rounded-full text-xs ${
                            theme === 'dark' 
                              ? 'bg-slate-800/80 text-slate-300 backdrop-blur-sm'
                              : 'bg-white/80 text-slate-700 backdrop-blur-sm'
                          }`}>
                            {course.duration}
                          </div>
                        </div>
                        
                        {/* Level tag */}
                        <div className="absolute bottom-4 right-4 z-20">
                          <div className={`px-3 py-1 rounded-full text-xs ${
                            theme === 'dark' 
                              ? 'bg-slate-800/80 text-slate-300 backdrop-blur-sm' 
                              : 'bg-white/80 text-slate-700 backdrop-blur-sm'
                          }`}>
                            {course.level}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-3 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          {course.title}
                        </h3>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400 mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg 
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                          <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            {course.rating} ({course.students})
                          </span>
                        </div>
                        
                          <Link 
                            to={`/courses/${course.id}`}
                            className={`inline-flex items-center justify-center w-full mt-4 px-4 py-2 rounded-lg text-white font-medium ${
                              theme === 'dark'
                                ? 'bg-indigo-600 hover:bg-indigo-700'
                                : 'bg-indigo-600 hover:bg-indigo-700'
                          } transition-colors`}
                          >
                            View Details
                          </Link>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
            
            {/* Course progress indicator */}
            <div className="flex justify-center mt-8">
              <div className="relative w-full max-w-[200px] h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className={`absolute h-full bg-gradient-to-r ${
                    theme === 'dark' ? 'from-indigo-400 to-purple-500' : 'from-indigo-600 to-purple-600'
                  }`} 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((currentCourseSlide % popularCourses.length) + 1) * (100 / popularCourses.length)}%` 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut",
                    delay: 0.2
                  }}
                />
              </div>
            </div>

            {/* Mobile slider controls */}
            <div className="flex justify-center mt-6 items-center">
              <motion.button 
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-all duration-300 shadow-lg`}
                onClick={() => {
                  setCourseSlideDirection('left');
                  setCurrentCourseSlide(prev => (prev === 0 ? popularCourses.length - 1 : prev - 1));
                }}
                aria-label="Previous course"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              
              {/* Dots indicator */}
              <div className="flex space-x-1">
                {popularCourses.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCourseSlideDirection(index > currentCourseSlide ? 'right' : 'left');
                      setCurrentCourseSlide(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentCourseSlide % popularCourses.length === index
                        ? theme === 'dark' ? 'bg-indigo-500 w-4' : 'bg-indigo-600 w-4'
                        : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                    }`}
                    aria-label={`Go to course ${index + 1}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                      backgroundColor: currentCourseSlide % popularCourses.length === index 
                        ? (theme === 'dark' ? '#6366f1' : '#4f46e5')
                        : (theme === 'dark' ? '#475569' : '#cbd5e1')
                    }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
              
              <motion.button 
                className={`w-10 h-10 rounded-full flex items-center justify-center ml-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-all duration-300 shadow-lg`}
                onClick={() => {
                  setCourseSlideDirection('right');
                  setCurrentCourseSlide(prev => (prev === popularCourses.length - 1 ? 0 : prev + 1));
                }}
                aria-label="Next course"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
            
            {/* Swipe instructions for mobile */}
            <div className={`text-center mt-3 text-xs ${
                theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              Swipe or tap arrows to navigate
            </div>
          </div>
        
          {/* Desktop Carousel View (hidden on mobile) */}
          <div className="hidden sm:block relative overflow-hidden px-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentCourseSlide}
                initial={{ 
                  opacity: 0, 
                  x: courseSlideDirection === 'right' ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: courseSlideDirection === 'right' ? -100 : 100,
                  transition: { 
                    duration: 0.3 
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {popularCourses.slice(
                  currentCourseSlide * 3,
                  Math.min((currentCourseSlide + 1) * 3, popularCourses.length)
                ).map((course, index) => (
                  <motion.div 
                    key={course.title}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        delay: index * 0.15,
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }}
                    whileHover={{ 
                      y: -10,
                      scale: 1.02,
                      boxShadow: theme === 'dark' 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                    className={`${
                      theme === 'dark'
                        ? 'bg-slate-800/80 border border-slate-700/50'
                        : 'bg-white shadow-xl border border-slate-100'
                    } rounded-xl overflow-hidden group cursor-pointer`}
                  >
                    {/* Course image with overlay */}
                    <div className="h-48 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      
                      {/* Price tag */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          theme === 'dark' 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-indigo-600 text-white'
                        }`}>
                          {course.price}
                        </div>
                      </div>
                      
                      {/* Duration tag */}
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className={`px-3 py-1 rounded-full text-xs ${
                          theme === 'dark' 
                            ? 'bg-slate-800/80 text-slate-300 backdrop-blur-sm'
                            : 'bg-white/80 text-slate-700 backdrop-blur-sm'
                        }`}>
                          {course.duration}
                        </div>
                      </div>
                      
                      {/* Level tag */}
                      <div className="absolute bottom-4 right-4 z-20">
                        <div className={`px-3 py-1 rounded-full text-xs ${
                          theme === 'dark' 
                            ? 'bg-slate-800/80 text-slate-300 backdrop-blur-sm' 
                            : 'bg-white/80 text-slate-700 backdrop-blur-sm'
                        }`}>
                          {course.level}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-3 group-hover:text-indigo-500 transition-colors ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {course.title}
                      </h3>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 mr-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg 
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                        <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          {course.rating} ({course.students})
                        </span>
                      </div>
                      
                      <Link 
                        to={`/courses/${course.id}`}
                        className={`inline-flex items-center justify-center w-full mt-4 px-4 py-2 rounded-lg text-white font-medium ${
                          theme === 'dark'
                            ? 'bg-indigo-600 hover:bg-indigo-700'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        } transition-colors`}
                      >
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: Math.ceil(popularCourses.length / 3) }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setCourseSlideDirection(index > currentCourseSlide ? 'right' : 'left');
                    setCurrentCourseSlide(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                    currentCourseSlide === index
                      ? theme === 'dark' ? 'bg-indigo-500 w-8' : 'bg-indigo-600 w-8'
                      : theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          
            {/* Navigation arrows - enhanced with better styling */}
            <motion.button 
              className={`absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-slate-800/90 text-white hover:bg-indigo-600'
                  : 'bg-white/90 text-slate-800 hover:bg-indigo-600 hover:text-white'
              } transition-all transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg`}
              onClick={() => handleCourseSlideChange('prev')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button 
              className={`absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-slate-800/90 text-white hover:bg-indigo-600'
                  : 'bg-white/90 text-slate-800 hover:bg-indigo-600 hover:text-white'
              } transition-all transform focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg`}
              onClick={() => handleCourseSlideChange('next')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/courses" 
              className={`inline-flex items-center px-8 py-4 rounded-lg font-medium border-2 ${
                theme === 'dark'
                  ? 'bg-transparent border-indigo-500 text-indigo-400 hover:bg-indigo-900/30'
                  : 'bg-transparent border-indigo-600 text-indigo-700 hover:bg-indigo-50'
              } transition-colors group`}
            >
              <span>View All Courses</span>
              <svg 
                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        id="benefits-section"
        className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <CircuitPatternAnimation
            className="z-0 opacity-15"
            color={theme === 'dark' ? '#4F46E5' : '#4F46E5'}
            density="low"
            animationSpeed="slow"
          />
          
          {/* Decorative blobs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-3"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                Why Choose Us
              </span>
            </motion.div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
            }`}>
              Benefits of OSOP Coding
            </h2>
            
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Discover why thousands of students trust us for their programming education journey
            </p>
            
            {/* Decorative elements */}
            <div className="relative h-1 w-24 mx-auto mt-8 mb-6">
              <div className={`absolute inset-0 bg-gradient-to-r ${
                theme === 'dark' ? 'from-indigo-400 via-purple-400 to-indigo-400' : 'from-indigo-600 via-purple-600 to-indigo-600'
              } rounded-full`}></div>
            </div>
          </motion.div>

          {/* Mobile Slider View (visible only on small screens) */}
          <div className="relative sm:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`benefit-${currentBenefitSlide}`}
                initial={{ 
                  opacity: 0, 
                  x: 100
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -100,
                  transition: { 
                    duration: 0.3 
                  }
                }}
                className="w-full"
              >
                {(() => {
                  const benefit = benefits[currentBenefitSlide % benefits.length];
                  
                  return (
                    <motion.div
                      className={`${
                        theme === 'dark'
                          ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50'
                          : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                      } rounded-xl p-8 mx-auto max-w-sm relative overflow-hidden`}
                    >
                      {/* Background glow */}
                      <div 
                        className={`absolute inset-0 bg-gradient-to-br opacity-5 ${benefit.color}`}
                      />
                      
                      {/* Benefit Icon with glow effect */}
                      <div className="flex justify-center mb-8">
                        <div className="relative">
                          <div 
                            className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl text-white bg-gradient-to-r ${benefit.color} z-10`}
                          >
                            {benefit.icon}
                          </div>
                          <div 
                            className="absolute w-20 h-20 rounded-2xl top-2 left-0 bg-gradient-to-r from-black/20 to-black/5 dark:from-black/30 dark:to-black/10 blur-sm z-0"
                          />
                        </div>
                      </div>
                      
                      <h3 className={`text-xl font-bold mb-4 text-center ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {benefit.title}
                      </h3>
                      
                      <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} text-center mb-2`}>
                        {benefit.description}
                      </p>
                      
                      {/* Progress indicator */}
                      <div className="flex justify-center mt-8">
                        <div className="relative w-full max-w-[200px] h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`absolute h-full bg-gradient-to-r ${benefit.color}`} 
                            style={{ width: `${((currentBenefitSlide % benefits.length) + 1) * (100 / benefits.length)}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            {/* Mobile slider controls */}
            <div className="flex justify-center mt-8 items-center">
              <button 
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-colors shadow-lg`}
                onClick={() => setCurrentBenefitSlide(prev => (prev === 0 ? benefits.length - 1 : prev - 1))}
                aria-label="Previous benefit"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dots indicator */}
              <div className="flex space-x-1">
                {benefits.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBenefitSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentBenefitSlide % benefits.length === index
                        ? theme === 'dark' ? 'bg-indigo-500 w-4' : 'bg-indigo-600 w-4'
                        : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                    }`}
                    aria-label={`Go to benefit ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className={`w-10 h-10 rounded-full flex items-center justify-center ml-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-colors shadow-lg`}
                onClick={() => setCurrentBenefitSlide(prev => (prev === benefits.length - 1 ? 0 : prev + 1))}
                aria-label="Next benefit"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Swipe instructions for mobile */}
            <div className={`text-center mt-3 text-xs ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              Swipe or tap arrows to navigate
            </div>
          </div>
          
          {/* Desktop Grid View (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.2 } 
                }}
                className={`${
                  theme === 'dark'
                    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600'
                    : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                } p-6 md:p-8 rounded-xl relative overflow-hidden group`}
              >
                {/* Benefit background glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${benefit.color}`}
                />
                
                {/* Animated border on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 scale-[1.01] rounded-xl overflow-hidden">
                    <div className="absolute -top-1 -bottom-1 -left-1 -right-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                  </div>
                </div>
                
                {/* Benefit Icon with glow effect */}
                <div className="relative mb-6">
                  <div 
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl text-white transform transition-transform duration-300 group-hover:scale-110 bg-gradient-to-r ${benefit.color} z-10`}
                  >
                    {benefit.icon}
                  </div>
                  <div 
                    className="absolute w-16 h-16 rounded-2xl top-2 left-2 bg-gradient-to-r from-black/20 to-black/5 dark:from-black/30 dark:to-black/10 blur-sm z-0"
                  />
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 group-hover:translate-x-1 transition-transform duration-300 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {benefit.title}
                </h3>
                
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} group-hover:text-opacity-90 transition-colors duration-300`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile CTA - only visible on small screens */}
          <div className="sm:hidden mt-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <a 
                href="#demo-class" 
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                  theme === 'dark'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                } transition-colors shadow-lg shadow-indigo-600/20`}
              >
                <span>Experience the Benefits</span>
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Tutorials Section - Grid Layout for desktop, Slider for mobile */}
      <section 
        ref={testimonialsSectionRef}
        className={`py-16 relative overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
      >
        {/* Simple background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-3"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                theme === 'dark'
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                Success Stories
              </span>
            </motion.div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-4 ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
            }`}>
              Learn from Our Top Alumni
            </h2>
            
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Exclusive tutorial videos from our graduates now working at leading tech companies
            </p>
            
            {/* Decorative elements */}
            <div className="relative h-1 w-24 mx-auto mt-8 mb-6">
              <div className={`absolute inset-0 bg-gradient-to-r ${
                theme === 'dark' ? 'from-indigo-400 via-purple-400 to-indigo-400' : 'from-indigo-600 via-purple-600 to-indigo-600'
              } rounded-full`}></div>
            </div>
          </motion.div>
          
          {/* Mobile Slider View (visible only on small screens) */}
          <div className="relative sm:hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentTestimonialSlide}
                initial={{ 
                  opacity: 0, 
                  x: testimonialSlideDirection === 'right' ? 100 : -100 
                }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    type: "spring",
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.5 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  x: testimonialSlideDirection === 'right' ? -100 : 100,
                  transition: { 
                    duration: 0.3 
                  }
                }}
                className="w-full"
              >
                {(() => {
                  // Extract YouTube video ID from embed URL for the current slide
                  const videoId = testimonials[currentTestimonialSlide].video.split('/').pop();
                  // Create YouTube thumbnail URL using the video ID
                  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                  const video = testimonials[currentTestimonialSlide];
                  
                  return (
                    <motion.div
                      className={`${
                        theme === 'dark'
                          ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50'
                          : 'bg-white shadow-md border border-slate-100'
                      } rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 mx-auto max-w-sm`}
                      onClick={() => openVideoModal(video.video)}
                    >
                      {/* Video Thumbnail - 16:9 aspect ratio */}
                      <div className="relative aspect-video">
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80 hover:opacity-100 transition-opacity">
                          <div className={`w-16 h-16 rounded-full ${
                            theme === 'dark' 
                              ? 'bg-indigo-600/80 text-white' 
                              : 'bg-indigo-600/80 text-white'
                          } flex items-center justify-center shadow-lg`}>
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M8 5v14l11-7z" />
              </svg>
                          </div>
                        </div>
                        
                        {/* Gradient overlay for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                        
                        {/* YouTube thumbnail image */}
                        <img 
                          src={thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Video Title */}
                      <div className="p-4">
                        <h3 className={`text-base font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                          {video.title}
                      </h3>
                        <div className={`flex items-center mt-2 text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                          {video.company}
                    </div>
                  </div>
                </motion.div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
            
            {/* Mobile slider controls */}
            <div className="flex justify-center mt-6 items-center">
              <button 
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-colors`}
                onClick={() => handleTestimonialSlideChange('prev')}
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dots indicator */}
              <div className="flex space-x-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTestimonialSlideDirection(index > currentTestimonialSlide ? 'right' : 'left');
                      setCurrentTestimonialSlide(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentTestimonialSlide === index
                        ? theme === 'dark' ? 'bg-indigo-500 w-4' : 'bg-indigo-600 w-4'
                        : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className={`w-10 h-10 rounded-full flex items-center justify-center ml-3 ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-indigo-600 border border-slate-700'
                    : 'bg-white text-slate-800 hover:bg-indigo-600 hover:text-white border border-slate-200'
                } transition-colors`}
                onClick={() => handleTestimonialSlideChange('next')}
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            </div>
            
            {/* Swipe instructions for mobile */}
            <div className={`text-center mt-3 text-xs ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              Swipe or tap arrows to navigate
            </div>
          </div>
          
          {/* Desktop Grid View (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {testimonials.map((video, index) => {
              // Extract YouTube video ID from embed URL
              const videoId = video.video.split('/').pop();
              // Create YouTube thumbnail URL using the video ID
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className={`${
                theme === 'dark'
                      ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50'
                      : 'bg-white shadow-md border border-slate-100'
                  } rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200`}
                  onClick={() => openVideoModal(video.video)}
                >
                  {/* Video Thumbnail - 16:9 aspect ratio */}
                  <div className="relative aspect-video">
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80 hover:opacity-100 transition-opacity">
                      <div className={`w-12 h-12 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-indigo-600/80 text-white' 
                          : 'bg-indigo-600/80 text-white'
                      } flex items-center justify-center shadow-lg`}>
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
              </svg>
                      </div>
                    </div>
                    
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                    
                    {/* YouTube thumbnail image */}
                    <img 
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Video Title */}
                  <div className="p-3">
                    <h3 className={`text-sm font-medium line-clamp-2 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      {video.title}
                    </h3>
                    <div className={`flex items-center mt-2 text-xs ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {video.company}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Video Modal - 16:9 ratio with video details */}
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
              {/* Video player with 16:9 ratio */}
              <div className="relative" style={{ aspectRatio: '16/9' }}>
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={activeVideoUrl} 
                  title="Video tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Close button */}
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

      {/* Placement Drives Section */}
      <section 
        ref={eventsSectionRef}
        className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} relative overflow-hidden`}
      >
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="opacity-5" width="100%" height="100%">
            <pattern id="placement-pattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(0)">
              <circle 
                cx="30" cy="30" r="3" 
                fill={theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(79,70,229,0.2)'} 
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#placement-pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-3"
            >
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                theme === 'dark' 
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
              }`}>
                Placement Assistance
              </span>
            </motion.div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
            }`}>
              Join Our Placement Drives
            </h2>
            
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Get ready for your dream job with our comprehensive placement assistance program
            </p>
          </motion.div>

          {/* Full-width slider for placement drives */}
          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEventSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              className={`${
                theme === 'dark' 
                    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                    : 'bg-white shadow-2xl shadow-slate-200/60 border border-slate-100'
              } rounded-2xl overflow-hidden`}
            >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left column: Event details */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-8 md:p-12 flex flex-col justify-center"
                  >
                    <div className="flex items-center mb-6">
                      <div className={`mr-4 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                        theme === 'dark'
                          ? 'bg-indigo-900/50 text-indigo-400'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        {placementEvents[currentEventSlide].icon}
                </div>
                      <div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          theme === 'dark' 
                            ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-800/50'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {placementEvents[currentEventSlide].date}
                        </div>
                </div>
              </div>
              
                    <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      {placementEvents[currentEventSlide].title}
                    </h3>
                    
                    <p className={`text-lg mb-6 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {placementEvents[currentEventSlide].description}
                    </p>
                    
                    <div className={`p-4 rounded-lg mb-6 ${
                      theme === 'dark'
                        ? 'bg-slate-700/50 border border-slate-600'
                        : 'bg-slate-50 border border-slate-200'
                    }`}>
                      <h4 className={`font-semibold mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        Drive Details:
                      </h4>
                      <ul className={`space-y-3 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <span>Roles: Software Engineer, Data Analyst, DevOps</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Package: 5-12 LPA</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Location: Bangalore, Pune, Hyderabad</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 mr-3 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span><strong>{placementEvents[currentEventSlide].students}</strong> Students Placed</span>
                        </li>
                      </ul>
                </div>
                
                    <div className="mt-auto">
                      <a 
                        href="#" 
                        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium ${
                      theme === 'dark'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        } transition-colors`}
                      >
                        <span>Register for Drive</span>
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                  
                  {/* Right column: Large image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative h-full min-h-[400px]"
                  >
                    <div className="absolute inset-0">
                      <img 
                        src={placementEvents[currentEventSlide].image} 
                        alt={placementEvents[currentEventSlide].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                    </div>
                    
                    {/* Company emblem/watermark */}
                    <div className="absolute bottom-8 right-8 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                        {/* Company logo placeholder */}
                        <span className="text-2xl">{placementEvents[currentEventSlide].icon}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation arrows */}
            <button 
              className={`absolute top-1/2 -translate-y-1/2 -left-5 w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-slate-800/90 text-white hover:bg-slate-700 border border-slate-600'
                  : 'bg-white/90 text-slate-800 hover:bg-white shadow-lg border border-slate-200'
              } transition-colors z-10`}
              onClick={() => setCurrentEventSlide(prev => 
                prev === 0 ? placementEvents.length - 1 : prev - 1
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className={`absolute top-1/2 -translate-y-1/2 -right-5 w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-slate-800/90 text-white hover:bg-slate-700 border border-slate-600'
                  : 'bg-white/90 text-slate-800 hover:bg-white shadow-lg border border-slate-200'
              } transition-colors z-10`}
              onClick={() => setCurrentEventSlide(prev => 
                prev === placementEvents.length - 1 ? 0 : prev + 1
              )}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {placementEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEventSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentEventSlide === index
                      ? theme === 'dark' ? 'bg-indigo-500 w-8' : 'bg-indigo-600 w-8'
                      : theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section 
        ref={logosSectionRef}
        className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} relative overflow-hidden`}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-3"
              >
                <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                  theme === 'dark' 
                    ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                    : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                }`}>
                  Trusted by Industry Leaders
                </span>
              </motion.div>
              
              <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
                theme === 'dark'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
              }`}>
                Our Partner Companies
              </h2>
              
              <p className={`text-lg max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                See how our courses have helped students secure internships and jobs at top tech companies
              </p>
            </motion.div>
            
            {/* Expanded company logos data */}
            <div className="py-10">
              {/* First row - moving right */}
              <div className="relative mb-8 overflow-hidden">
                <div className={`absolute top-0 left-0 w-20 h-full bg-gradient-to-r ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                <div className={`absolute top-0 right-0 w-20 h-full bg-gradient-to-l ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                
                <div className="flex animate-marquee-right">
                  {[...companies, ...companies].map((company, index) => (
                    <motion.div
                      key={`right-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                      transition={{ delay: (index % companies.length) * 0.05, duration: 0.5 }}
                      className={`flex-shrink-0 mx-5 w-48 h-24 ${
                        theme === 'dark' 
                          ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600'
                          : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                      } rounded-xl p-3 relative group`}
                    >
                      <div className={`w-full h-full flex items-center justify-center relative ${
                        theme === 'dark' ? 'opacity-80 hover:opacity-100' : 'opacity-80 hover:opacity-100'
                      } transition-opacity duration-300`}>
                        <img 
                          src={company.logo} 
                          alt={company.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                </div>
                
              {/* Second row - moving left */}
              <div className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-20 h-full bg-gradient-to-r ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                <div className={`absolute top-0 right-0 w-20 h-full bg-gradient-to-l ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                
                <div className="flex animate-marquee-left">
                  {/* Additional company logos for the second row */}
                  {[
                    { name: 'Oracle', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo.png' },
                    { name: 'Deloitte', logo: 'https://logos-world.net/wp-content/uploads/2020/05/Deloitte-Logo.png' },
                    { name: 'Adobe', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Adobe-Logo.png' },
                    { name: 'Capgemini', logo: 'https://logos-world.net/wp-content/uploads/2021/02/Capgemini-Logo.png' },
                    { name: 'HCL', logo: 'https://logos-world.net/wp-content/uploads/2020/11/HCL-Logo.png' },
                    { name: 'Cisco', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Cisco-Logo.png' },
                    { name: 'Intel', logo: 'https://logos-world.net/wp-content/uploads/2020/07/Intel-Logo.png' },
                    { name: 'Tech Mahindra', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Tech-Mahindra-Logo.png' },
                    { name: 'Dell', logo: 'https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo.png' },
                    { name: 'Samsung', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png' },
                    ...companies.slice().reverse()
                  ].map((company, index) => (
                    <motion.div
                      key={`left-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % companies.length) * 0.05, duration: 0.5 }}
                      className={`flex-shrink-0 mx-5 w-48 h-24 ${
                        theme === 'dark' 
                          ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600'
                          : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                      } rounded-xl p-3 relative group`}
                    >
                      <div className={`w-full h-full flex items-center justify-center relative ${
                        theme === 'dark' ? 'opacity-80 hover:opacity-100' : 'opacity-80 hover:opacity-100'
                      } transition-opacity duration-300`}>
                        <img 
                          src={company.logo} 
                          alt={company.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </section>

      {/* Free Demo Contact Form Section */}
      <section 
        id="demo-class"
        className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}
      >
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
          
          {/* Animated gradient orbs */}
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  theme === 'dark' ? 'bg-indigo-400/20' : 'bg-indigo-600/20'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className={`px-6 py-2 rounded-full text-sm font-semibold ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-indigo-900/50 to-purple-900/50 text-indigo-300 border border-indigo-700/50'
                  : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200'
              } backdrop-blur-sm`}>
                🚀 Start Your Journey Today
              </span>
            </motion.div>
            
            <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${
              theme === 'dark' 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700'
            }`}>
              Book Your Free Demo Class
            </h2>
            
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Experience our world-class teaching methodology with a personalized interactive session. 
              <span className="font-semibold"> No commitment required.</span>
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left Column - Enhanced Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col justify-center space-y-8"
              >
                {/* Key Benefits */}
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    What You'll Experience:
                  </h3>
                  
                  {[
                    { 
                      icon: '🎯', 
                      title: 'Personalized Learning Path', 
                      desc: 'Get a customized roadmap based on your goals and experience level' 
                    },
                    { 
                      icon: '👨‍🏫', 
                      title: 'Meet Expert Instructors', 
                      desc: 'Interact with industry professionals with 10+ years of experience' 
                    },
                    { 
                      icon: '💡', 
                      title: 'Interactive Teaching Style', 
                      desc: 'Experience our hands-on, project-based learning methodology' 
                    },
                    { 
                      icon: '📚', 
                      title: 'Curriculum Preview', 
                      desc: 'Explore our comprehensive, industry-aligned course structure' 
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      whileHover={{ x: 10, transition: { duration: 0.2 } }}
                      className={`flex items-start p-4 rounded-xl ${
                        theme === 'dark' 
                          ? 'bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/50'
                          : 'bg-white/50 hover:bg-white/80 border border-slate-200/50'
                      } backdrop-blur-sm transition-all duration-300 group cursor-pointer`}
                    >
                      <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className={`font-semibold mb-1 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          {item.title}
                        </h4>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Enhanced Social Proof */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Student Avatars with Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex -space-x-3 mr-4">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <motion.div 
                            key={item} 
                            className="w-12 h-12 rounded-full border-3 border-white dark:border-slate-800 overflow-hidden"
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img 
                              src={`https://i.pravatar.cc/100?img=${10 + item}`} 
                              alt="Student"
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        ))}
                        <div className={`w-12 h-12 rounded-full border-3 border-white dark:border-slate-800 flex items-center justify-center text-sm font-bold ${
                          theme === 'dark' 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-indigo-600 text-white'
                        }`}>
                          +2K
                        </div>
                      </div>
                      <div className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                        <div className="font-bold text-lg">15,000+ Students</div>
                        <div className="text-sm">Already started their journey</div>
                      </div>
                    </div>
                    
                    {/* Live indicator */}
                    <motion.div 
                      className="flex items-center space-x-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}>
                        Live Demo Available
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Testimonial */}
                  <motion.div 
                    className={`p-6 rounded-xl ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-slate-800/70 to-slate-800/50 border border-slate-700/50'
                        : 'bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200/50'
                    } backdrop-blur-sm relative overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Quote decoration */}
                    <div className={`absolute top-4 right-4 text-6xl opacity-10 ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      "
                    </div>
                    
                    <div className="flex items-start relative z-10">
                      <div className="mr-4 mt-1">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <motion.svg 
                              key={i}
                              className="w-5 h-5" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </motion.svg>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className={`text-base mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          "The demo class was a game-changer! The instructor explained complex algorithms in such a simple way. I immediately knew this was the right place to learn coding."
                        </p>
                        <div className="flex items-center">
                          <img 
                            src="https://i.pravatar.cc/100?img=25" 
                            alt="Neha G."
                            className="w-10 h-10 rounded-full mr-3"
                          />
                          <div>
                            <p className={`font-semibold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                              Neha G.
                            </p>
                            <p className={`text-sm ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                              Software Engineer at Google
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Trust indicators */}
                  <div className="flex items-center justify-center space-x-8 pt-4">
                    {[
                      { icon: '⚡', text: '30-min session' },
                      { icon: '🎁', text: 'Completely free' },
                      { icon: '📞', text: 'No spam calls' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
                    
              {/* Right Column - Enhanced Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/60 to-slate-800/40 backdrop-blur-xl border border-slate-700/50'
                    : 'bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border border-slate-200/50'
                } rounded-3xl p-8 shadow-2xl relative overflow-hidden`}
              >
                {/* Form background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                      className="inline-block mb-4"
                    >
                      <div className={`w-16 h-16 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-br from-indigo-600 to-purple-600' 
                          : 'bg-gradient-to-br from-indigo-600 to-purple-600'
                      } flex items-center justify-center text-white text-2xl shadow-lg`}>
                        🎓
                      </div>
                    </motion.div>
                    
                    <h3 className={`text-2xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Reserve Your Spot
                    </h3>
                    
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      Fill out the form below and we'll contact you within 2 hours
                    </p>
                  </div>
                
                  {/* Enhanced Form */}
                  <form onSubmit={handleDemoSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <label htmlFor="name" className={`block text-sm font-semibold mb-3 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-4 rounded-xl ${
                            theme === 'dark'
                              ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:bg-slate-700/70'
                              : 'bg-white/70 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white'
                          } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 backdrop-blur-sm`}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                          <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <label htmlFor="email" className={`block text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            placeholder="your@email.com"
                            className={`w-full px-4 py-4 rounded-xl ${
                              theme === 'dark' 
                                ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:bg-slate-700/70'
                                : 'bg-white/70 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white'
                            } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 backdrop-blur-sm`}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                      >
                        <label htmlFor="phone" className={`block text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            required
                            placeholder="+91 98765 43211"
                            className={`w-full px-4 py-4 rounded-xl ${
                              theme === 'dark'
                                ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:bg-slate-700/70'
                                : 'bg-white/70 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white'
                            } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 backdrop-blur-sm`}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <label htmlFor="course" className={`block text-sm font-semibold mb-3 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Course of Interest *
                      </label>
                      <div className="relative">
                        <select
                          id="course"
                          name="course"
                          value={formData.course}
                          onChange={handleFormChange}
                          required
                          className={`w-full px-4 py-4 rounded-xl ${
                            theme === 'dark'
                              ? 'bg-slate-700/50 border border-slate-600 text-white focus:border-indigo-500 focus:bg-slate-700/70'
                              : 'bg-white/70 border border-slate-300 text-slate-900 focus:border-indigo-500 focus:bg-white'
                          } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer`}
                        >
                          <option value="" disabled>Select your preferred course</option>
                          {coursesData.map((course) => (
                            <option key={course.id} value={course.title}>
                              {course.title}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                          <svg className={`w-5 h-5 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <label htmlFor="experience" className={`block text-sm font-semibold mb-3 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Programming Experience
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { value: 'beginner', label: '🌱 Beginner' },
                          { value: 'intermediate', label: '📈 Intermediate' },
                          { value: 'advanced', label: '🚀 Advanced' },
                          { value: 'professional', label: '💼 Professional' }
                        ].map((option) => (
                          <label key={option.value} className="relative cursor-pointer">
                            <input
                              type="radio"
                              name="experience"
                              value={option.value}
                              onChange={handleFormChange}
                              className="sr-only"
                            />
                            <div className={`p-3 rounded-lg border-2 text-center text-sm font-medium transition-all duration-300 ${
                              formData.experience === option.value
                                ? theme === 'dark'
                                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                                  : 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : theme === 'dark'
                                  ? 'border-slate-600 bg-slate-700/30 text-slate-400 hover:border-slate-500'
                                  : 'border-slate-300 bg-white/50 text-slate-600 hover:border-slate-400'
                            }`}>
                              {option.label}
                            </div>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <label htmlFor="message" className={`block text-sm font-semibold mb-3 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Tell us about your goals (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows={4}
                        placeholder="What do you hope to achieve? Any specific topics you'd like to explore in the demo?"
                        className={`w-full px-4 py-4 rounded-xl ${
                          theme === 'dark'
                            ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500 focus:bg-slate-700/70'
                            : 'bg-white/70 border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500 focus:bg-white'
                        } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-all duration-300 resize-none backdrop-blur-sm`}
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 0.5 }}
                    >
                      <input
                        type="checkbox"
                        id="consent"
                        required
                        className={`w-5 h-5 mt-0.5 rounded ${
                          theme === 'dark' 
                            ? 'text-indigo-600 bg-slate-700 border-slate-600 focus:ring-indigo-500'
                            : 'text-indigo-600 bg-white border-slate-300 focus:ring-indigo-500'
                        } focus:ring-2`}
                      />
                      <label htmlFor="consent" className={`text-sm leading-relaxed ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        I agree to receive information about the demo class and understand that OSOP Coding will contact me via email or phone. 
                        <span className="font-medium"> No spam, promise!</span>
                      </label>
                    </motion.div>
                    
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-indigo-700/30'
                          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-indigo-700/30'
                      } relative overflow-hidden group`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        🚀 Book My Free Demo Class
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </motion.button>
                
                    {/* Enhanced Success Message */}
                    <AnimatePresence>
                      {showSuccessMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.9 }}
                          transition={{ type: "spring", duration: 0.5 }}
                          className={`p-6 rounded-xl ${
                            theme === 'dark'
                              ? 'bg-gradient-to-r from-green-700/30 to-emerald-700/30 border border-green-600/50 text-green-300'
                              : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800'
                          } backdrop-blur-sm`}
                        >
                          <div className="flex items-center">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                              className="mr-3"
                            >
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </motion.div>
                            <div>
                              <div className="font-bold text-lg">🎉 Success! Your demo is booked!</div>
                              <div className="text-sm opacity-90">We'll contact you within 2 hours to schedule your personalized session.</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className={`text-xs text-center leading-relaxed ${
                      theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                    }`}>
                      By submitting this form, you agree to our{' '}
                      <a href="#" className={`${
                        theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                      } underline transition-colors`}>
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="#" className={`${
                        theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                      } underline transition-colors`}>
                        Terms of Service
                      </a>.
                      <br />
                      <span className="font-medium">🔒 Your information is secure and will never be shared.</span>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
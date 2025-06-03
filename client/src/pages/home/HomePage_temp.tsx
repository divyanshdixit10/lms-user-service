import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
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

const HomePage: React.FC = () => {
  const { theme } = useTheme();
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
    message: ''
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

  // Course data
  const popularCourses = [
    {
      title: 'C Programming Fundamentals',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: '₹4,999',
      duration: '8 weeks',
      rating: 4.8,
      students: '5K+',
      level: 'Beginner'
    },
    {
      title: 'Java Masterclass',
      image: 'https://images.unsplash.com/photo-1617729622528-83b365857cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: '₹6,999',
      duration: '12 weeks',
      rating: 4.9,
      students: '4.5K+',
      level: 'Intermediate'
    },
    {
      title: 'Python for Data Science',
      image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
      price: '₹7,999',
      duration: '10 weeks',
      rating: 4.9,
      students: '7K+',
      level: 'Intermediate'
    },
    {
      title: 'AI/ML Bootcamp',
      image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      price: '₹9,999',
      duration: '16 weeks',
      rating: 4.8,
      students: '3.8K+',
      level: 'Advanced'
    },
    {
      title: 'Full Stack Web Development',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
      price: '₹8,999',
      duration: '14 weeks',
      rating: 4.7,
      students: '6.2K+',
      level: 'Intermediate'
    },
    {
      title: 'Data Structures & Algorithms',
      image: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80',
      price: '₹6,499',
      duration: '10 weeks',
      rating: 4.9,
      students: '8.5K+',
      level: 'Intermediate to Advanced'
    }
  ];

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
        className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-b from-slate-800 to-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'}`}
      >
        {/* Coding-themed background */}
        <GeometricCodePattern
          className="z-0 opacity-15"
          colorScheme="blue"
          density="low"
          codeElements={true}
        />
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -right-[10%] top-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 blur-3xl"></div>
          <div className="absolute -left-[10%] bottom-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-purple-500/5 to-pink-500/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
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
                Meet Our Mentor
              </span>
            </motion.div>
            
            {/* Our Mentor Section */}
            <h2 className={`text-3xl md:text-5xl font-bold mb-8 ${
                theme === 'dark'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
              }`}>
                Our Mentor
              </h2>
          </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7 }}
                className={`max-w-5xl mx-auto ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                    : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                } rounded-2xl overflow-hidden`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        Dr. Dharmendra Bajpai Sir
                      </h3>
                      <div className="flex items-center mt-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          theme === 'dark' 
                            ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-800/50'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          PhD in Computer Science
                        </span>
                        <span className="mx-2">•</span>
                        <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Python Expert
                        </span>
                      </div>
                      <p className={`text-lg mb-4 ${
                        theme === 'dark' 
                          ? 'text-indigo-400' 
                          : 'text-indigo-600'
                      }`}>
                        "Excellence in Teaching, Excellence in Learning"
                      </p>
                      <p className={`mb-6 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        A passionate educator who has transformed the careers of thousands of students through his innovative teaching methodologies and deep industry knowledge.
                      </p>
                    </motion.div>
                    
                    <div className="mt-4 space-y-5">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-start"
                      >
                        <div className={`mr-4 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          theme === 'dark'
                            ? 'bg-indigo-900/50 text-indigo-400'
                            : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </div>
                        <div>
                          <h4 className={`text-lg font-semibold mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            Extensive Experience
                          </h4>
                          <p className={`${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Over 25 Years of Rich Professional Teaching Experience, including 15+ years in advanced Python programming and data science education
                          </p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex items-start"
                      >
                        <div className={`mr-4 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          theme === 'dark'
                            ? 'bg-indigo-900/50 text-indigo-400'
                            : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className={`text-lg font-semibold mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            Proven Track Record
                          </h4>
                          <p className={`${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Successfully Trained 15,000+ IT Engineers who are now placed in top tech companies worldwide
                          </p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-start"
                      >
                        <div className={`mr-4 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          theme === 'dark'
                            ? 'bg-indigo-900/50 text-indigo-400'
                            : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className={`text-lg font-semibold mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            Industry Curriculum Designer
                          </h4>
                          <p className={`${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Creator of industry-aligned Python and Data Science curriculum that bridges academic knowledge with real-world applications
                          </p>
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-8"
                    >
                      <a 
                        href="#demo-class" 
                        className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                          theme === 'dark'
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        <span>Book a Class with Bajpai Sir</span>
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </motion.div>
                  </div>
                  
                  <div className="relative overflow-hidden">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="h-full"
                    >
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-80"></div>
                      
                      {/* Decorative pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <pattern id="mentor-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="0.5" fill="none" />
                          </pattern>
                          <rect width="100%" height="100%" fill="url(#mentor-pattern)" />
                        </svg>
                      </div>
                      
                      {/* Decorative code elements */}
                      <div className="absolute top-8 left-8 opacity-40 text-xs font-mono text-blue-100">
                        def teach_python():
                        <br />    return excellence
                      </div>
                      
                      <div className="absolute bottom-8 right-8 opacity-40 text-xs font-mono text-blue-100">
                        class Mentor:
                        <br />    passion = True
                      </div>
                      
                      {/* Content */}
                      <div className="h-full flex items-center justify-center p-8 relative z-10">
                        <div className="text-center text-white">
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 relative mx-auto"
                          >
                            <div className="relative w-48 h-48 mx-auto mb-6">
                              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
                              <div className="absolute inset-2 rounded-full bg-indigo-700 flex items-center justify-center">
                                <span className="text-8xl">👨‍🏫</span>
                              </div>
                              
                              {/* Animated ring */}
                              <div className="absolute -inset-2 rounded-full border-2 border-indigo-400/30 animate-pulse"></div>
                            </div>
                          </motion.div>
                          
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <h4 className="text-2xl font-bold mb-2">Bajpai Sir</h4>
                            <div className="flex justify-center space-x-3 mb-4">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 text-yellow-300 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span className="text-white">4.9/5 Rating</span>
                              </div>
                              <span className="text-white/50">|</span>
                              <div className="text-white">Top Instructor</div>
                            </div>
                            <p className="text-blue-100 mb-6">Transforming careers through excellence in education</p>
                            
                            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto text-sm">
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="text-2xl font-bold">25+</div>
                                <div className="text-blue-100">Years Experience</div>
                              </div>
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="text-2xl font-bold">15K+</div>
                                <div className="text-blue-100">Students Taught</div>
                              </div>
                            </div>
                          </motion.div>
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                } transition-colors`}
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

          {/* Courses Carousel */}
          <div className="relative overflow-hidden px-12">
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: theme === 'dark' 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                    className={`${
                      theme === 'dark'
                        ? 'bg-slate-800/80 border border-slate-700/50'
                        : 'bg-white shadow-xl border border-slate-100'
                    } rounded-xl overflow-hidden group`}
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
                      
                      <a 
                        href="#" 
                        className={`inline-flex items-center justify-center w-full mt-4 px-4 py-2 rounded-lg text-white font-medium ${
                          theme === 'dark'
                            ? 'bg-indigo-600 hover:bg-indigo-700'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                        } transition-colors`}
                      >
                        Enroll Now
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Slide indicators */}
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: Math.ceil(popularCourses.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCourseSlideDirection(index > currentCourseSlide ? 'right' : 'left');
                    setCurrentCourseSlide(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentCourseSlide === index
                      ? theme === 'dark' ? 'bg-indigo-500 w-8' : 'bg-indigo-600 w-8'
                      : theme === 'dark' ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          
            {/* Navigation arrows - enhanced with better styling */}
            <button 
              className={`absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-slate-800/90 text-white hover:bg-indigo-600'
                  : 'bg-white/90 text-slate-800 hover:bg-indigo-600 hover:text-white'
              } transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg`}
              onClick={() => handleCourseSlideChange('prev')}
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className={`absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 rounded-full flex items-center justify-center ${
                theme === 'dark'
                  ? 'bg-slate-800/90 text-white hover:bg-indigo-600'
                  : 'bg-white/90 text-slate-800 hover:bg-indigo-600 hover:text-white'
              } transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-lg`}
              onClick={() => handleCourseSlideChange('next')}
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                } p-8 rounded-xl relative overflow-hidden group`}
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
                <div className="relative mb-6 w-20 h-20">
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
        </div>
      </section>

      {/* Video Tutorials Section - Grid Layout on Desktop / Slider on Mobile */}
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
          
          {/* Mobile instructions for slider */}
          <div className="md:hidden text-center mb-4">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs ${
              theme === 'dark' ? 'bg-slate-700/70 text-slate-300' : 'bg-slate-200/70 text-slate-700'
            }`}>
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              Swipe to see more videos
            </div>
          </div>
          
          {/* Mobile Slider (visible only on small screens) */}
          <div className="md:hidden relative mb-8">
            <div 
              className="overflow-x-auto pb-4" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                scrollSnapType: 'x mandatory'
              }}
            >
              <div 
                className="flex space-x-4 px-2"
                style={{ 
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {testimonials.map((video, index) => {
                  // Extract YouTube video ID from embed URL
                  const videoId = video.video.split('/').pop();
                  // Create YouTube thumbnail URL using the video ID
                  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                  
                  return (
                    <motion.div
                      key={`mobile-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={`flex-shrink-0 w-[280px] ${
                        theme === 'dark'
                          ? 'bg-slate-800/80 backdrop-blur-sm border border-slate-700/50'
                          : 'bg-white shadow-md border border-slate-100'
                      } rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200`}
                      onClick={() => openVideoModal(video.video)}
                      style={{ scrollSnapAlign: 'center' }}
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
            
            {/* Mobile navigation indicators */}
            <div className="flex justify-center mt-2 space-x-1.5">
              {testimonials.slice(0, Math.min(5, testimonials.length)).map((_, index) => (
                <div 
                  key={`dot-${index}`} 
                  className={`w-2 h-2 rounded-full ${
                    index === 0 
                      ? theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-600' 
                      : theme === 'dark' ? 'bg-slate-600' : 'bg-slate-300'
                  }`}
                />
              ))}
              {testimonials.length > 5 && (
                <div className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>...</div>
              )}
            </div>
          </div>
          
          {/* Desktop Grid - hidden on mobile */}
          <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {testimonials.map((video, index) => {
              // Extract YouTube video ID from embed URL
              const videoId = video.video.split('/').pop();
              // Create YouTube thumbnail URL using the video ID
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              
              return (
                <motion.div
                  key={`desktop-${index}`}
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

      {/* Add this CSS class in your global styles or component styles */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>

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
        {/* Background decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Content */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className="flex flex-col justify-center"
              >
                <div className="inline-block mb-3">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    theme === 'dark' 
                      ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800'
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  }`}>
                    Get Started Today
                  </span>
                </div>
                
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                        theme === 'dark' 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800'
                }`}>
                  Book a Free Demo Class
                </h2>
                
                <p className={`text-lg mb-6 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Experience our teaching methodology with a free interactive session. Fill out the form and our team will get in touch with you shortly.
                </p>
                
                <div className="space-y-6 mb-8">
                  {['Personalized learning path consultation', 'Meet our expert instructors', 'Get a taste of our teaching style', 'Explore our curriculum'].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-center"
                    >
                      <div className={`mr-4 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            theme === 'dark' 
                          ? 'bg-indigo-900/50 text-indigo-400'
                          : 'bg-indigo-100 text-indigo-600'
                      }`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-auto space-y-6">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div 
                          key={item} 
                          className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 overflow-hidden"
                        >
                          <img 
                            src={`https://i.pravatar.cc/100?img=${10 + item}`} 
                            alt="Student"
                            className="w-full h-full object-cover"
                      />
                    </div>
                ))}
              </div>
                    <div className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                      <div className="font-medium">Join 15K+ students</div>
                      <div className="text-sm">Start your coding journey today</div>
            </div>
          </div>
                  
                  <div className={`p-4 rounded-lg ${
                    theme === 'dark'
                      ? 'bg-slate-800/70 border border-slate-700'
                      : 'bg-slate-50 border border-slate-100'
                  }`}>
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="text-yellow-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
        </div>
                      </div>
                      <div>
                        <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                          "The demo class completely changed my perspective on programming. The instructor was patient and made complex concepts easy to understand."
                        </p>
                        <p className={`text-sm font-medium mt-1 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                          — Neha G., Software Engineer
                        </p>
                      </div>
                    </div>
                        </div>
                      </div>
                    </motion.div>
                    
              {/* Right Column - Form */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
                className={`${
                  theme === 'dark'
                    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                    : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
                } rounded-2xl p-8`}
              >
                <h3 className={`text-xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  Request Your Free Demo Class
                </h3>
                
                {/* Form */}
                <form onSubmit={handleDemoSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Full Name
                      </label>
                      <input
                        type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                        required
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'dark'
                          ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500'
                          : 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500'
                      } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-colors`}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Email Address
                      </label>
                        <input
                          type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        placeholder="Your email address"
                        className={`w-full px-4 py-3 rounded-lg ${
                            theme === 'dark' 
                            ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500'
                            : 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500'
                        } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-colors`}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                          required
                        placeholder="Enter phone number"
                        className={`w-full px-4 py-3 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500'
                            : 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500'
                        } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-colors`}
                        />
                      </div>
                  </div>
                  
                  <div>
                    <label htmlFor="course" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Course of Interest
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleFormChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'dark'
                          ? 'bg-slate-700/50 border border-slate-600 text-white focus:border-indigo-500'
                          : 'bg-white border border-slate-300 text-slate-900 focus:border-indigo-500'
                      } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-colors`}
                    >
                      <option value="" disabled>Select a course</option>
                      <option value="c-programming">C Programming</option>
                      <option value="java">Java Masterclass</option>
                      <option value="python">Python for Data Science</option>
                      <option value="ai-ml">AI/ML Bootcamp</option>
                      <option value="web-dev">Full Stack Web Development</option>
                      <option value="dsa">Data Structures & Algorithms</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Message (Optional)
                      </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={3}
                      placeholder="Tell us about your learning goals..."
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'dark'
                          ? 'bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500'
                          : 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-indigo-500'
                      } focus:ring-2 focus:ring-indigo-500/30 outline-none transition-colors resize-none`}
                    ></textarea>
                        </div>
                  
                  <div className="flex items-center">
                        <input
                      type="checkbox"
                      id="consent"
                      required
                      className={`w-4 h-4 ${
                            theme === 'dark' 
                          ? 'text-indigo-600 bg-slate-700 border-slate-600'
                          : 'text-indigo-600 bg-white border-slate-300'
                      }`}
                    />
                    <label htmlFor="consent" className={`ml-2 text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      I agree to be contacted about my demo class request
                    </label>
                  </div>
                  
                    <button
                      type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-700/20'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-700/20'
                    }`}
                  >
                    Book Your Free Demo
                    </button>
                
                  {/* Success Message */}
                <AnimatePresence>
                  {showSuccessMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-3 rounded-lg ${
                          theme === 'dark'
                            ? 'bg-green-700/30 border border-green-700 text-green-300'
                            : 'bg-green-50 border border-green-200 text-green-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Thank you! We'll contact you shortly to schedule your demo class.</span>
                        </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                  
                  <div className={`text-xs text-center mt-4 ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                  }`}>
                    By submitting this form, you agree to our{' '}
                    <a href="#" className={`${
                      theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                    }`}>
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="#" className={`${
                      theme === 'dark' ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                    }`}>
                      Terms of Service
                    </a>.
              </div>
                </form>
            </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 
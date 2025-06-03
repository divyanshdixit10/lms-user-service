import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleBackground from '../../components/ui/ParticleBackground';
import HeroGradientText from '../../components/ui/HeroGradientText';
import CodeBackgroundAnimation from '../../components/ui/CodeBackgroundAnimation';
import GlassCard from '../../components/ui/GlassCard';
import CircuitPatternAnimation from '../../components/ui/CircuitPatternAnimation';
import GeometricCodePattern from '../../components/ui/GeometricCodePattern';
import NeuralNetworkAnimation from '../../components/ui/NeuralNetworkAnimation';

// Enhanced animated counter component
interface CountUpAnimationProps {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  formatter?: (value: number) => string;
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  end,
  duration = 2,
  delay = 0,
  suffix = '',
  formatter = (value: number) => Math.round(value).toString()
}) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        const increment = end / (duration * 60);
        const interval = setInterval(() => {
          setCount(prev => {
            const next = prev + increment;
            if (next >= end) {
              clearInterval(interval);
              return end;
            }
            return next;
          });
        }, 1000 / 60);
        
        return () => clearInterval(interval);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, end, duration, delay]);
  
  return <span ref={nodeRef}>{formatter(count)}{suffix}</span>;
};

// Enhanced testimonial carousel with metrics
interface TestimonialCarouselProps {
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    image: string;
    quote: string;
    rating: number;
    hiredCount: string;
    department: string;
    companyLogo: string;
    metrics: {
      retention: string;
      performance: string;
      timeToProductivity: string;
    };
  }>;
  theme: string;
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 6000); // Increased to 6 seconds for more content
    
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);
  
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`relative p-8 md:p-12 ${
              theme === 'dark'
                ? 'bg-slate-800/50 border border-slate-700'
                : 'bg-white border border-slate-200'
            } backdrop-blur-sm shadow-2xl`}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
            
            {/* Company logo and badge */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonials[currentIndex].companyLogo}</div>
                <div>
                  <h4 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {testimonials[currentIndex].company}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {testimonials[currentIndex].department}
                  </p>
                </div>
              </div>
              
              <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                theme === 'dark'
                  ? 'bg-green-900/30 text-green-400 border border-green-800/50'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}>
                {testimonials[currentIndex].hiredCount} Hired
              </div>
            </div>

            {/* Quote */}
            <div className="mb-8 relative z-10">
              <div className={`text-6xl ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'} mb-4`}>
                "
              </div>
              <p className={`text-lg md:text-xl leading-relaxed italic relative -mt-8 pl-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {testimonials[currentIndex].quote}
              </p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
              <div className={`text-center p-4 rounded-xl ${
                theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-50'
              }`}>
                <div className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  {testimonials[currentIndex].metrics.retention}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Retention Rate
                </div>
              </div>
              
              <div className={`text-center p-4 rounded-xl ${
                theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-50'
              }`}>
                <div className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {testimonials[currentIndex].metrics.performance}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Performance
                </div>
              </div>
              
              <div className={`text-center p-4 rounded-xl ${
                theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-50'
              }`}>
                <div className={`text-lg font-bold ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  {testimonials[currentIndex].metrics.timeToProductivity}
                </div>
                <div className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Time to Productivity
                </div>
              </div>
            </div>

            {/* Recruiter info and rating */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div>
                  <h4 className={`text-lg font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex].rating
                        ? 'text-yellow-400'
                        : 'text-slate-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Enhanced Navigation */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <motion.button
          onClick={() => setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-full ${
            theme === 'dark'
              ? 'bg-slate-700 text-white hover:bg-slate-600'
              : 'bg-white text-slate-800 hover:bg-slate-100'
          } shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-500`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <div className="flex gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                  : theme === 'dark'
                    ? 'bg-slate-600 hover:bg-slate-500'
                    : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
        
        <motion.button
          onClick={() => setCurrentIndex(prev => (prev + 1) % testimonials.length)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 rounded-full ${
            theme === 'dark'
              ? 'bg-slate-700 text-white hover:bg-slate-600'
              : 'bg-white text-slate-800 hover:bg-slate-100'
          } shadow-lg transition-all duration-300 border-2 border-transparent hover:border-blue-500`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
      
      {/* Enhanced Controls */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setAutoplay(!autoplay)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-slate-700 text-white hover:bg-slate-600'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
          } shadow-lg hover:shadow-xl`}
        >
          <span className="text-lg">{autoplay ? '⏸️' : '▶️'}</span>
          {autoplay ? 'Pause Auto-slide' : 'Resume Auto-slide'}
        </motion.button>
      </div>
    </div>
  );
};

const HirePage: React.FC = () => {
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const formInViewRef = useRef(null);
  const formInView = useInView(formInViewRef);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const statsControls = useAnimation();
  
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    jobRole: '',
    experience: '',
    skills: '',
    positions: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  const whyHire = [
    {
      title: 'Industry-Ready Talent',
      description: 'Our students are trained in the latest technologies and industry practices with hands-on project experience',
      icon: '👨‍💻',
      color: 'from-blue-500 to-cyan-500',
      stats: '95% Job Ready'
    },
    {
      title: 'Proven Track Record',
      description: '90% of our students clear technical interviews in first attempt with top-tier companies',
      icon: '📈',
      color: 'from-green-500 to-emerald-500',
      stats: '90% Success Rate'
    },
    {
      title: 'Diverse Skill Set',
      description: 'Access to candidates skilled in various technologies including AI/ML, Full Stack, DevOps, and more',
      icon: '🎯',
      color: 'from-purple-500 to-pink-500',
      stats: '25+ Technologies'
    },
    {
      title: 'Cost-Effective',
      description: 'Zero recruitment fees and streamlined hiring process with dedicated placement support',
      icon: '💰',
      color: 'from-orange-500 to-red-500',
      stats: '0% Fees'
    }
  ];

  const hiringProcess = [
    {
      title: 'Submit Requirements',
      description: 'Share your hiring needs, job descriptions, and specific skill requirements through our portal',
      icon: '📝',
      color: 'from-blue-500 to-indigo-500',
      duration: '1-2 Days'
    },
    {
      title: 'Candidate Shortlisting',
      description: 'Our AI-powered system and expert team shortlist candidates matching your exact criteria',
      icon: '👥',
      color: 'from-indigo-500 to-purple-500',
      duration: '3-5 Days'
    },
    {
      title: 'Campus Drive',
      description: 'Conduct technical and HR interviews at our state-of-the-art campus or through virtual platforms',
      icon: '🏢',
      color: 'from-purple-500 to-pink-500',
      duration: '1 Day'
    },
    {
      title: 'Selection & Offer',
      description: 'Select your preferred candidates and we assist with offer letter rollout and onboarding',
      icon: '✅',
      color: 'from-pink-500 to-red-500',
      duration: '2-3 Days'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Verma',
      role: 'Senior HR Manager',
      company: 'TCS',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote: 'OSOP students consistently demonstrate exceptional technical skills and professional attitude. We\'ve hired 120+ developers from OSOP over the past 3 years, and their problem-solving abilities and code quality have exceeded our expectations. They require minimal onboarding and contribute to projects from day one.',
      rating: 5,
      hiredCount: '120+',
      department: 'Technology Services',
      companyLogo: '🏢',
      metrics: {
        retention: '96%',
        performance: 'Excellent',
        timeToProductivity: '2 weeks'
      }
    },
    {
      name: 'Priya Singh',
      role: 'Principal Technical Recruiter',
      company: 'Microsoft',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote: 'The quality of candidates from OSOP is outstanding. Their placement process is highly streamlined and efficient. We\'ve established a preferred partnership with OSOP and have successfully hired 85+ developers across various teams. Their graduates bring fresh perspectives and adapt quickly to our fast-paced environment.',
      rating: 5,
      hiredCount: '85+',
      department: 'Cloud & AI Division',
      companyLogo: '💻',
      metrics: {
        retention: '94%',
        performance: 'Outstanding',
        timeToProductivity: '1.5 weeks'
      }
    },
    {
      name: 'Amit Patel',
      role: 'VP - Talent Acquisition',
      company: 'Infosys',
      image: 'https://randomuser.me/api/portraits/men/28.jpg',
      quote: 'We\'ve been hiring from OSOP for over 4 years and are consistently impressed with the talent pool. Their graduates are industry-ready from day one with strong fundamentals in modern technologies. The technical assessment scores of OSOP students are 40% higher than industry average. They\'ve become our go-to partner for quality tech talent.',
      rating: 5,
      hiredCount: '200+',
      department: 'Digital Services',
      companyLogo: '🌐',
      metrics: {
        retention: '98%',
        performance: 'Exceptional',
        timeToProductivity: '1 week'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'Engineering Manager',
      company: 'Amazon',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      quote: 'OSOP graduates bring exceptional technical foundations and fresh perspectives to our development teams. Their understanding of cloud technologies, system design, and modern development practices is impressive. We\'ve seen 95% of OSOP hires receive performance ratings of \'Exceeds Expectations\' or higher in their first year.',
      rating: 5,
      hiredCount: '75+',
      department: 'AWS Engineering',
      companyLogo: '☁️',
      metrics: {
        retention: '97%',
        performance: 'Exceeds Expectations',
        timeToProductivity: '10 days'
      }
    },
    {
      name: 'Vikram Sharma',
      role: 'Head of Engineering',
      company: 'Flipkart',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      quote: 'OSOP has been instrumental in scaling our engineering teams. Their students come with hands-on experience in real-world projects and modern tech stacks. The quality of code and system thinking they demonstrate is remarkable. We\'ve made OSOP our preferred campus partner for technical hiring.',
      rating: 5,
      hiredCount: '150+',
      department: 'Product Engineering',
      companyLogo: '🛒',
      metrics: {
        retention: '95%',
        performance: 'Excellent',
        timeToProductivity: '2 weeks'
      }
    },
    {
      name: 'Anita Desai',
      role: 'Director - Human Resources',
      company: 'Wipro',
      image: 'https://randomuser.me/api/portraits/women/38.jpg',
      quote: 'The comprehensive training and industry exposure that OSOP provides to their students is evident in their performance. We\'ve hired across multiple domains - full-stack development, data science, and DevOps. The consistency in quality and the professional attitude of OSOP graduates makes them stand out in the competitive talent market.',
      rating: 5,
      hiredCount: '180+',
      department: 'Digital Technology',
      companyLogo: '💼',
      metrics: {
        retention: '93%',
        performance: 'Very Good',
        timeToProductivity: '2.5 weeks'
      }
    }
  ];

  const hiringStats = [
    { 
      label: 'Students Placed', 
      value: 5000,
      suffix: '+',
      icon: '👨‍🎓',
      color: 'from-blue-500 to-cyan-600',
      description: 'Successful placements',
      trend: '+25% this year'
    },
    { 
      label: 'Partner Companies', 
      value: 200, 
      suffix: '+',
      icon: '🏢',
      color: 'from-green-500 to-emerald-600',
      description: 'Hiring partners',
      trend: '+15 new partners'
    },
    { 
      label: 'Average Package', 
      value: 6.5, 
      suffix: ' LPA',
      icon: '💰',
      color: 'from-purple-500 to-pink-600',
      description: 'Starting salary',
      trend: '+20% increase'
    },
    { 
      label: 'Placement Rate', 
      value: 95, 
      suffix: '%',
      icon: '🎯',
      color: 'from-orange-500 to-red-600',
      description: 'Success rate',
      trend: 'Industry leading'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-24 lg:pb-40">
        {/* Multi-layered Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={120}
            colorScheme={theme === 'dark' ? 'blue' : 'blue'}
            connectParticles={true}
            interactivity={true}
            className="opacity-40"
          />
          
          <CodeBackgroundAnimation
            speed="slow"
            density="medium"
            className="opacity-5"
            characters="function recruit(){} class TechTalent extends Developer import Company from 'industry' const hiring = new Opportunity();"
          />
          
          <NeuralNetworkAnimation className="opacity-20" />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/5"></div>
        </div>

        {/* Floating geometric shapes */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-32 h-32 rounded-full ${
                theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/20'
              } blur-xl`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-8"
            >
              <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                  : 'bg-blue-50/80 text-blue-700 border border-blue-200/50'
              }`}>
                🏢 Hire From OSOP
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Hire</span>
              </nav>
            </motion.div>
            
            {/* Main heading */}
            <HeroGradientText
              text="Hire Elite Tech Talent"
              gradientColors="from-blue-400 via-indigo-500 to-purple-500"
              animationType="reveal"
              duration={1}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            />
            
            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-12"
            >
              <p className={`text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Connect with <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">industry-ready developers</span> trained in 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> cutting-edge technologies</span> and 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> real-world projects</span>
              </p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <a
                  href="#hiring-form"
                  className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden block text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.div
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      🚀
                    </motion.div>
                    Start Hiring Now
                    <motion.svg 
                      className="w-6 h-6" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                    
                    {/* Moving SVG icon */}
                    <motion.svg 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ 
                        x: [0, 3, 0],
                        rotate: [0, 10, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </motion.svg>
                  </span>
                  
                  {/* Enhanced background effects */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{
                      background: [
                        "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(67, 56, 202, 1) 50%, rgba(126, 34, 206, 1) 100%)",
                        "linear-gradient(90deg, rgba(59, 130, 246, 1) 0%, rgba(99, 102, 241, 1) 50%, rgba(147, 51, 234, 1) 100%)",
                        "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(67, 56, 202, 1) 50%, rgba(126, 34, 206, 1) 100%)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {/* Pulse effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-400/30 rounded-2xl"
                    animate={{
                      scale: [1, 1.02, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </a>
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                >
                  FAST
                </motion.div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="#why-hire" 
                  className={`px-8 py-4 rounded-2xl font-bold border-2 backdrop-blur-sm transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-blue-500/50 text-blue-400 hover:bg-blue-900/30 hover:border-blue-400'
                      : 'border-blue-600/50 text-blue-700 hover:bg-blue-100/50 hover:border-blue-600'
                  }`}
                >
                  📊 View Success Stories
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Form Section - START HIRING TODAY (Moved up after hero) */}
      <section id="hiring-form" className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-200/30'} blur-3xl`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${theme === 'dark' ? 'bg-purple-500/5' : 'bg-purple-200/20'} blur-3xl`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <span className={`px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-green-900/40 to-blue-900/40 text-green-400 border border-green-800/50'
                  : 'bg-gradient-to-r from-green-50 to-blue-50 text-green-700 border border-green-200/50'
              } shadow-lg`}>
                🚀 Start Your Hiring Journey
              </span>
            </motion.div>

            <h2 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">Hiring Today</span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Connect with <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">top-tier developers</span> in just 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> 24 hours</span>. 
              Our AI-powered matching system ensures you get the 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> perfect candidates</span> for your team.
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 mb-12"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  24hr Response Time
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  AI-Powered Matching
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Zero Recruitment Fees
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              ref={formInViewRef}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Enhanced Glass Card with better styling */}
              <div className={`relative rounded-3xl p-8 md:p-12 lg:p-16 backdrop-blur-xl border shadow-2xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-slate-800/40 border-slate-700/50 shadow-black/20'
                  : 'bg-white/80 border-white/20 shadow-slate-200/60'
              }`}>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'} blur-2xl`}></div>
                <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/30'} blur-2xl`}></div>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className={`text-2xl font-bold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Request Submitted Successfully!
                    </h3>
                    <p className={`text-lg mb-6 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Thank you for your interest in hiring from OSOP. Our placement team will contact you within 24 hours to discuss your requirements.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                    >
                      Submit Another Request
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="relative z-10">
                    {/* Form Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6 }}
                      className="text-center mb-12"
                    >
                      <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        Tell Us About Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Hiring Needs</span>
                      </h3>
                      <p className={`text-lg ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        Our AI will match you with the perfect candidates within 24 hours
                      </p>
                    </motion.div>

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Company Name */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 }}
                          className="group"
                      >
                          <label className={`block text-sm font-bold mb-3 flex items-center gap-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                            <span className="text-lg">🏢</span>
                          Company Name *
                        </label>
                          <div className="relative">
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                              className={`w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                                  ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500 focus:bg-slate-800/70'
                                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:bg-blue-50/30'
                              } focus:outline-none focus:ring-4 focus:ring-blue-500/20 group-hover:border-slate-400`}
                              placeholder="e.g., Google, Microsoft, Startup Inc."
                            />
                            <div className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
                          </div>
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          placeholder="your.email@company.com"
                        />
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          placeholder="+91 98765 43210"
                        />
                      </motion.div>

                      {/* Job Role */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Job Role *
                        </label>
                        <select
                          name="jobRole"
                          value={formData.jobRole}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500'
                              : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        >
                          <option value="">Select job role</option>
                          <option value="frontend-developer">Frontend Developer</option>
                          <option value="backend-developer">Backend Developer</option>
                          <option value="fullstack-developer">Full Stack Developer</option>
                          <option value="data-scientist">Data Scientist</option>
                          <option value="ml-engineer">ML Engineer</option>
                          <option value="devops-engineer">DevOps Engineer</option>
                          <option value="mobile-developer">Mobile Developer</option>
                          <option value="other">Other</option>
                        </select>
                      </motion.div>

                      {/* Experience Level */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Experience Level *
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500'
                              : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
                          } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        >
                          <option value="">Select experience level</option>
                          <option value="fresher">Fresher (0-1 years)</option>
                          <option value="junior">Junior (1-3 years)</option>
                          <option value="mid">Mid-level (3-5 years)</option>
                          <option value="senior">Senior (5+ years)</option>
                        </select>
                      </motion.div>
                    </div>

                    {/* Skills Required */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 }}
                    >
                      <label className={`block text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        Required Skills *
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="e.g., React, Node.js, Python, AWS, etc."
                      />
                    </motion.div>

                    {/* Number of Positions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.8 }}
                    >
                      <label className={`block text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        Number of Positions *
                      </label>
                      <input
                        type="number"
                        name="positions"
                        value={formData.positions}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="How many candidates do you need?"
                      />
                    </motion.div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.9 }}
                    >
                      <label className={`block text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        Additional Requirements
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none ${
                          theme === 'dark'
                            ? 'bg-slate-800/50 border-slate-600 text-white focus:border-blue-500'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Job description, specific requirements, timeline, etc."
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="flex justify-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: formInView ? 1 : 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        type="submit"
                        disabled={loading}
                        className={`relative px-8 py-3 rounded-lg font-medium ${
                          theme === 'dark'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                        } transition-all shadow-lg hover:shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40`}
                      >
                        {loading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Submit Request
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </motion.div>
                  </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className={`py-20 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Hiring Success</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Trusted by leading companies worldwide for quality tech talent
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hiringStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className={`group relative rounded-2xl p-8 text-center overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600' 
                    : 'bg-white border border-slate-200 hover:border-slate-300'
                } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <motion.div 
                  className="text-6xl mb-6 relative z-10"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {stat.icon}
                </motion.div>
                
                {/* Value */}
                <motion.div 
                  className={`text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r ${stat.color} relative z-10`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1 + 0.3
                  }}
                >
                  <CountUpAnimation 
                    end={stat.value} 
                    duration={2} 
                    delay={index * 0.1} 
                    suffix={stat.suffix}
                  />
                </motion.div>
                
                {/* Label */}
                <div className={`text-lg font-semibold mb-2 relative z-10 ${
                  theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  {stat.label}
                </div>
                
                {/* Description */}
                <div className={`text-sm mb-3 relative z-10 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {stat.description}
                </div>
                
                {/* Trend */}
                <motion.div
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold relative z-10 ${
                    theme === 'dark'
                      ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {stat.trend}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Why Hire Section */}
      <section id="why-hire" className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Hire From OSOP</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Discover what makes our graduates the preferred choice for leading tech companies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyHire.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2 } 
                }}
                className={`group relative rounded-2xl p-8 overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600' 
                    : 'bg-white border border-slate-200 hover:border-slate-300'
                } backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon and Stats */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div 
                    className="text-5xl relative z-10"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    theme === 'dark'
                      ? 'bg-blue-900/30 text-blue-400'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {feature.stats}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className={`text-2xl font-bold mb-4 relative z-10 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className={`leading-relaxed relative z-10 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {feature.description}
                </p>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Section */}
      {/* OLD TESTIMONIALS SECTION REMOVED - ENHANCED VERSION IS AT THE BOTTOM */}

      {/* Enhanced Hiring Process Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Hiring Process</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Simple, efficient, and designed for optimal results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hiringProcess.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className={`group relative rounded-2xl p-8 overflow-hidden ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600' 
                    : 'bg-white border border-slate-200 hover:border-slate-300'
                } backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Step number */}
                <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold shadow-lg z-10`}>
                  {index + 1}
                </div>
                
                {/* Icon */}
                <motion.div 
                  className="text-5xl mb-6 relative z-10"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  {step.icon}
                </motion.div>
                
                {/* Title */}
                <h3 className={`text-xl font-bold mb-4 relative z-10 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className={`mb-4 relative z-10 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {step.description}
                </p>
                
                {/* Duration */}
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold relative z-10 ${
                  theme === 'dark'
                    ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {step.duration}
                </div>
                
                {/* Connection arrow for desktop */}
                {index < hiringProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                    <motion.svg 
                      className={`w-8 h-8 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/30'} blur-3xl`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-6"
              >
                <span className={`px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-blue-400 border border-blue-800/50'
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200/50'
                } shadow-lg`}>
                  💬 Get Expert Guidance
                </span>
              </motion.div>

              <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                Need More <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Information?</span>
              </h2>
              
              <p className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">placement experts</span> are here to help you find the 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> perfect candidates</span> for your team
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`p-8 md:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-slate-700/50'
                    : 'bg-white/80 border-white/20'
                } relative overflow-hidden`}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                
                <div className="relative z-10">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    🎯 Direct Contact
                  </h3>
                  
              <p className={`text-lg mb-8 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Speak directly with our placement specialists for personalized hiring solutions
                  </p>

                  <div className="space-y-6">
                    {/* Phone */}
                    <motion.a
                  href="tel:+919876543210"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-blue-500/50'
                          : 'bg-slate-50/50 hover:bg-blue-50/50 border border-slate-200/50 hover:border-blue-300/50'
                      } backdrop-blur-sm shadow-lg hover:shadow-xl`}
                    >
                      <div className={`p-3 rounded-xl ${
                        theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                      } group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          +91 98765 43210
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          Available Mon-Fri, 9 AM - 6 PM IST
                        </div>
                      </div>
                      <motion.svg 
                        className={`w-5 h-5 ml-auto ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        } group-hover:text-blue-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                  href="mailto:placements@osop.com"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-purple-500/50'
                          : 'bg-slate-50/50 hover:bg-purple-50/50 border border-slate-200/50 hover:border-purple-300/50'
                      } backdrop-blur-sm shadow-lg hover:shadow-xl`}
                    >
                      <div className={`p-3 rounded-xl ${
                        theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                      } group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          placements@osop.com
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          Response within 2 hours
                        </div>
                      </div>
                      <motion.svg 
                        className={`w-5 h-5 ml-auto ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        } group-hover:text-purple-500`}
                    fill="none"
                    viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </motion.a>

                    {/* WhatsApp */}
                    <motion.a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-slate-700/50 hover:bg-slate-700/70 border border-slate-600/50 hover:border-green-500/50'
                          : 'bg-slate-50/50 hover:bg-green-50/50 border border-slate-200/50 hover:border-green-300/50'
                      } backdrop-blur-sm shadow-lg hover:shadow-xl`}
                    >
                      <div className={`p-3 rounded-xl ${
                        theme === 'dark' ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-600'
                      } group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                      </div>
                      <div>
                        <div className={`font-bold text-lg ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          WhatsApp Chat
                        </div>
                        <div className={`text-sm ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          Instant messaging support
                        </div>
                      </div>
                      <motion.svg 
                        className={`w-5 h-5 ml-auto ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        } group-hover:text-green-500`}
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </motion.svg>
                    </motion.a>
              </div>
            </div>
              </motion.div>

              {/* FAQ & Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={`p-8 md:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border-slate-700/50'
                    : 'bg-white/80 border-white/20'
                } relative overflow-hidden`}
              >
                {/* Decorative gradient */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
                
                <div className="relative z-10">
                  <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    ❓ Quick Answers
                  </h3>
                  
                  <div className="space-y-6">
                    {/* FAQ Items */}
                    <div className={`p-5 rounded-2xl ${
                      theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50/50'
                    } border border-slate-200/20`}>
                      <h4 className={`font-bold text-lg mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        🕐 How quickly can we start hiring?
                      </h4>
                      <p className={`${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        We can shortlist candidates within 24-48 hours and schedule interviews within a week.
                      </p>
                    </div>

                    <div className={`p-5 rounded-2xl ${
                      theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50/50'
                    } border border-slate-200/20`}>
                      <h4 className={`font-bold text-lg mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        💰 What are the hiring costs?
                      </h4>
                      <p className={`${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        Zero recruitment fees! We believe in building long-term partnerships with our hiring partners.
                      </p>
                    </div>

                    <div className={`p-5 rounded-2xl ${
                      theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50/50'
                    } border border-slate-200/20`}>
                      <h4 className={`font-bold text-lg mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        🎯 What skill levels are available?
                      </h4>
                      <p className={`${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        From fresh graduates to experienced professionals (0-5+ years) across all tech domains.
                      </p>
                    </div>

                    <div className={`p-5 rounded-2xl ${
                      theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50/50'
                    } border border-slate-200/20`}>
                      <h4 className={`font-bold text-lg mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        🔄 What if candidates don't work out?
                      </h4>
                      <p className={`${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        We provide replacement guarantee and ongoing support to ensure successful placements.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Office Hours & Availability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`p-8 md:p-10 rounded-3xl backdrop-blur-xl border shadow-2xl ${
                theme === 'dark'
                  ? 'bg-slate-800/50 border-slate-700/50'
                  : 'bg-white/80 border-white/20'
              } relative overflow-hidden text-center`}
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
              
              <div className="relative z-10">
                <h3 className={`text-2xl md:text-3xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  🕒 We're Here When You Need Us
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50/50'
                  } border border-slate-200/20`}>
                    <div className="text-3xl mb-3">🌅</div>
                    <h4 className={`font-bold text-lg mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Business Hours
                    </h4>
                    <p className={`${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Mon-Fri: 9 AM - 6 PM IST<br />
                      Sat: 10 AM - 2 PM IST
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50/50'
                  } border border-slate-200/20`}>
                    <div className="text-3xl mb-3">⚡</div>
                    <h4 className={`font-bold text-lg mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Quick Response
                    </h4>
                    <p className={`${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Email: Within 2 hours<br />
                      Phone: Immediate
                    </p>
                  </div>

                  <div className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50/50'
                  } border border-slate-200/20`}>
                    <div className="text-3xl mb-3">🌍</div>
                    <h4 className={`font-bold text-lg mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Global Support
                    </h4>
                    <p className={`${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Remote interviews<br />
                      International placements
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`${
                theme === 'dark'
                  ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                  : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100'
              } p-8 md:p-12 rounded-2xl relative overflow-hidden`}
            >
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
              
              <div className="text-center">
                <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 ${
                  theme === 'dark' 
                    ? 'bg-blue-900/40 text-blue-300 border border-blue-800/50' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200 shadow-sm'
                }`}>Ready to Hire?</span>
                
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  Let's Connect Today
                </h2>
                
                <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Partner with OSOP to hire skilled tech professionals trained by industry experts with proven track records.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <a
                      href="#hiring-form"
                      className={`group flex items-center justify-center w-full px-10 py-5 rounded-2xl ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                      } font-bold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-500 overflow-hidden relative text-lg`}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 20, -20, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 5
                        }}
                        className="relative z-10"
                      >
                        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                      </motion.div>
                      <span className="relative z-10">Submit Your Request</span>
                      <motion.svg 
                        className="w-5 h-5 ml-3 relative z-10" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                      
                      {/* Enhanced background effects */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        whileHover={{
                          background: [
                            "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(67, 56, 202, 1) 100%)",
                            "linear-gradient(90deg, rgba(59, 130, 246, 1) 0%, rgba(99, 102, 241, 1) 100%)",
                            "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(67, 56, 202, 1) 100%)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      
                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 border-2 border-blue-400/30 rounded-2xl"
                        animate={{
                          scale: [1, 1.02, 1],
                          opacity: [0.3, 0, 0.3]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                      />
                    </a>
                    
                    {/* Floating badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
                    >
                      NOW
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="mailto:hiring@osop.com"
                      className={`group flex items-center justify-center w-full px-8 py-4 rounded-lg border-2 ${
                        theme === 'dark'
                          ? 'border-blue-500 text-blue-300 hover:text-blue-100'
                          : 'border-blue-600 text-blue-700 hover:text-blue-900'
                      } font-medium hover:bg-blue-50/10 transition-all duration-300`}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email Us Directly</span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section - What Industry Leaders Say */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-pink-500/10' : 'bg-pink-200/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'} blur-3xl`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${theme === 'dark' ? 'bg-purple-500/5' : 'bg-purple-200/20'} blur-3xl`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block mb-8"
            >
              <span className={`px-6 py-3 rounded-full text-sm font-bold backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-pink-900/40 to-blue-900/40 text-pink-400 border border-pink-800/50'
                  : 'bg-gradient-to-r from-pink-50 to-blue-50 text-pink-700 border border-pink-200/50'
              } shadow-lg`}>
                💼 Recruiter Testimonials
              </span>
            </motion.div>
            
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500">Industry Leaders</span> Say
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
              Hear from <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">top HR professionals</span> and 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> engineering managers</span> who have successfully hired our graduates
            </motion.p>

            {/* Summary Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              <div className={`text-center p-6 rounded-2xl backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700 shadow-xl' 
                  : 'bg-white/80 border border-pink-200 shadow-xl'
              }`}>
                <motion.div 
                  className={`text-3xl md:text-4xl font-black mb-2 ${
                    theme === 'dark' ? 'text-pink-400' : 'text-pink-600'
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                >
                  810+
                </motion.div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Total Hired
                </div>
              </div>

              <div className={`text-center p-6 rounded-2xl backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700 shadow-xl' 
                  : 'bg-white/80 border border-blue-200 shadow-xl'
              }`}>
                <motion.div 
                  className={`text-3xl md:text-4xl font-black mb-2 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
                >
                  96%
                </motion.div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Avg. Retention
                </div>
              </div>

              <div className={`text-center p-6 rounded-2xl backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700 shadow-xl' 
                  : 'bg-white/80 border border-purple-200 shadow-xl'
              }`}>
                <motion.div 
                  className={`text-3xl md:text-4xl font-black mb-2 ${
                    theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
                >
                  6
                </motion.div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Top Companies
                </div>
              </div>

              <div className={`text-center p-6 rounded-2xl backdrop-blur-sm ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700 shadow-xl' 
                  : 'bg-white/80 border border-green-200 shadow-xl'
              }`}>
                <motion.div 
                  className={`text-3xl md:text-4xl font-black mb-2 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
                >
                  1.5
                </motion.div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Weeks to Productivity
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-6xl mx-auto mb-16"
          >
            <TestimonialCarousel testimonials={testimonials} theme={theme} />
          </motion.div>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <p className={`text-lg md:text-xl mb-8 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Ready to join these industry leaders in hiring top talent?
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="relative group inline-block"
            >
              <a
                href="#hiring-form"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 overflow-hidden relative group text-lg"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 15, -15, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                  className="relative z-10"
                >
                  🎯
                </motion.div>
                <span className="relative z-10">Start Hiring Process</span>
                <motion.svg 
                  className="w-6 h-6 relative z-10" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
                
                {/* Enhanced background effects */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-700 via-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  whileHover={{
                    background: [
                      "linear-gradient(90deg, rgba(219, 39, 119, 1) 0%, rgba(37, 99, 235, 1) 50%, rgba(126, 34, 206, 1) 100%)",
                      "linear-gradient(90deg, rgba(236, 72, 153, 1) 0%, rgba(59, 130, 246, 1) 50%, rgba(147, 51, 234, 1) 100%)",
                      "linear-gradient(90deg, rgba(219, 39, 119, 1) 0%, rgba(37, 99, 235, 1) 50%, rgba(126, 34, 206, 1) 100%)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-pink-400/30 rounded-2xl"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                />
              </a>
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
              >
                HOT
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HirePage; 
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleBackground from '../../components/ui/ParticleBackground';
import HeroGradientText from '../../components/ui/HeroGradientText';
import CodeBackgroundAnimation from '../../components/ui/CodeBackgroundAnimation';
import GlassCard from '../../components/ui/GlassCard';
import CircuitPatternAnimation from '../../components/ui/CircuitPatternAnimation';
import NeuralNetworkAnimation from '../../components/ui/NeuralNetworkAnimation';

// Enhanced FAQ component with animations
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  theme: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
          : 'bg-white border border-slate-200 hover:border-slate-300'
      } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between"
        whileHover={{ backgroundColor: theme === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'rgba(248, 250, 252, 0.5)' }}
      >
        <h3 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-slate-800'
        }`}>
          {question}
        </h3>
        <motion.svg
          className={`w-6 h-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className={`px-6 pb-6 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Interactive contact card component
interface ContactCardProps {
  info: {
    title: string;
    details: string[];
    icon: string;
    iconClass: string;
    linkText: string;
    linkUrl: string;
  };
  theme: string;
  index: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ info, theme, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative rounded-2xl p-8 overflow-hidden ${
        theme === 'dark'
          ? 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
          : 'bg-white border border-slate-200 hover:border-slate-300'
      } backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300`}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${info.iconClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      {/* Icon */}
      <motion.div 
        className="text-6xl mb-6 relative z-10"
        animate={{
          rotate: isHovered ? [0, 10, -10, 0] : 0,
          scale: isHovered ? [1, 1.1, 1] : 1
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        {info.icon}
      </motion.div>
      
      {/* Title */}
      <h3 className={`text-2xl font-bold mb-6 relative z-10 ${
        theme === 'dark' ? 'text-white' : 'text-slate-800'
      }`}>
        {info.title}
      </h3>
      
      {/* Details */}
      <div className="space-y-3 mb-6 relative z-10">
        {info.details.map((detail, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.1 }}
            className={`flex items-center gap-3 ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${info.iconClass}`}></span>
            {detail}
          </motion.p>
        ))}
      </div>
      
      {/* Action button */}
      <motion.a
        href={info.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative z-10 ${
          theme === 'dark'
            ? 'bg-slate-700 text-white hover:bg-slate-600'
            : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
        }`}
      >
        {info.linkText}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </motion.a>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </motion.div>
  );
};

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const formInViewRef = useRef(null);
  const formInView = useInView(formInViewRef);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Enhanced contact information
  const contactInfo = [
    {
      title: 'Visit Our Campus',
      details: [
        'OSOP Learning Center',
        '123, Tech Park, MG Road',
        'Indore, Madhya Pradesh 452001',
        'Open: Mon-Sat, 9:00 AM - 6:00 PM'
      ],
      icon: '🏢',
      iconClass: 'from-blue-500 to-blue-600',
      linkText: 'Get Directions',
      linkUrl: 'https://maps.google.com'
    },
    {
      title: 'Call Us Anytime',
      details: [
        '+91 98765 43210 (Admissions)',
        '+91 98765 43211 (Support)',
        '+91 98765 43212 (Placements)',
        'Available: 24/7 Support'
      ],
      icon: '📞',
      iconClass: 'from-green-500 to-green-600',
      linkText: 'Call Now',
      linkUrl: 'tel:+919876543210'
    },
    {
      title: 'Email Support',
      details: [
        'info@osop.com (General)',
        'admissions@osop.com (Admissions)',
        'support@osop.com (Technical)',
        'careers@osop.com (Placements)'
      ],
      icon: '✉️',
      iconClass: 'from-purple-500 to-purple-600',
      linkText: 'Send Email',
      linkUrl: 'mailto:info@osop.com'
    },
    {
      title: 'Connect on Social',
      details: [
        'LinkedIn: OSOP Coding',
        'Twitter: @OSOPCoding',
        'Instagram: @osop_coding',
        'YouTube: OSOP Learning'
      ],
      icon: '🌐',
      iconClass: 'from-pink-500 to-pink-600',
      linkText: 'Follow Us',
      linkUrl: 'https://linkedin.com/company/osop'
    }
  ];

  // Enhanced FAQs
  const faqs = [
    {
      question: 'What are the admission requirements for your courses?',
      answer: 'Basic computer knowledge and a passion for learning technology. Different courses may have specific prerequisites which will be mentioned in the course details. We also provide foundation courses for complete beginners.'
    },
    {
      question: 'Do you provide placement assistance and job guarantees?',
      answer: 'Yes, we provide 100% placement assistance to all our students. Our dedicated placement cell works with 200+ leading companies to ensure the best opportunities. While we cannot guarantee jobs, our 95% placement rate speaks for our commitment to student success.'
    },
    {
      question: 'Can I attend a demo class before enrolling?',
      answer: 'Absolutely! We offer free demo classes for all our courses. You can register for a demo class through our website, call our admissions team, or visit our campus. Demo classes are conducted both online and offline.'
    },
    {
      question: 'What is the mode of training - online or offline?',
      answer: 'We offer both online and offline training modes with hybrid options. Students can choose their preferred mode based on convenience. Our online classes are live and interactive, not pre-recorded videos.'
    },
    {
      question: 'Do you provide certificates upon course completion?',
      answer: 'Yes, we provide industry-recognized certificates upon successful completion of courses. Our certificates are valued by leading companies and can be verified online. We also assist with additional certifications from major tech companies.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'We offer a 7-day money-back guarantee if you are not satisfied with the course. Refunds are processed within 5-7 business days. Terms and conditions apply, and our student counselors can provide detailed information.'
    },
    {
      question: 'Do you offer EMI or installment payment options?',
      answer: 'Yes, we offer flexible payment options including EMI plans with 0% interest for up to 12 months. We also have scholarship programs for deserving students and special discounts for early birds.'
    },
    {
      question: 'How experienced are your instructors?',
      answer: 'Our instructors are industry professionals with 5-15 years of experience at top companies like Google, Microsoft, Amazon, and leading startups. They bring real-world project experience to the classroom.'
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
            particleCount={80}
            colorScheme={theme === 'dark' ? 'purple' : 'blue'}
            connectParticles={true}
            interactivity={true}
            className="opacity-20"
          />
          
          <CodeBackgroundAnimation
            speed="slow"
            density="low"
            className="opacity-5"
            characters="const contact = new Communication(); function connect(){} class Support extends Help { respond() { return 'instant'; } }"
          />
          
          <NeuralNetworkAnimation className="opacity-10" />
          <CircuitPatternAnimation className="opacity-5" />
          
          {/* Enhanced gradient overlays with better contrast */}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80' 
              : 'bg-gradient-to-br from-white/90 via-blue-50/80 to-purple-50/90'
          }`}></div>
          <div className={`absolute inset-0 ${
            theme === 'dark'
              ? 'bg-gradient-to-t from-slate-900/60 via-transparent to-slate-800/40'
              : 'bg-gradient-to-t from-white/80 via-transparent to-blue-50/60'
          }`}></div>
        </div>

        {/* Enhanced floating geometric shapes */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-2xl ${
                i % 3 === 0 
                  ? `w-40 h-40 ${theme === 'dark' ? 'bg-purple-500/15' : 'bg-purple-200/25'}`
                  : i % 3 === 1
                  ? `w-24 h-24 ${theme === 'dark' ? 'bg-blue-500/12' : 'bg-blue-200/20'}`
                  : `w-56 h-56 ${theme === 'dark' ? 'bg-indigo-500/8' : 'bg-indigo-200/15'}`
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 150 + i * 20, 0],
                y: [0, -120 - i * 15, 0],
                scale: [1, 1.3 + i * 0.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
          
          {/* Additional decorative elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`deco-${i}`}
              className={`absolute w-2 h-2 rounded-full ${
                theme === 'dark' ? 'bg-white/20' : 'bg-slate-600/30'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.8,
              }}
            />
          ))}
        </motion.div>
        
        {/* Content Overlay for Better Visibility */}
        <div className={`absolute inset-0 z-5 ${
          theme === 'dark' 
            ? 'bg-slate-900/40' 
            : 'bg-white/60'
        } backdrop-blur-[1px]`}></div>
        
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
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-800/50'
                  : 'bg-purple-50/80 text-purple-700 border border-purple-200/50'
              }`}>
                💬 Contact OSOP
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Contact</span>
              </nav>
            </motion.div>
            
            {/* Main heading */}
            <HeroGradientText
              text="Get in Touch With Us"
              gradientColors="from-purple-400 via-blue-500 to-indigo-500"
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
                Have questions or need assistance? Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-600">expert team</span> is here to help you with 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500"> course guidance</span>, 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> admissions</span>, and 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> career support</span>
              </p>
            </motion.div>
            
            {/* Enhanced CTA Buttons with Perfect Alignment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-4xl mx-auto"
            >
              {/* Send Message Button */}
              <motion.a
                  href="#contact-form"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden min-w-[200px]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    📝 Send Message
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  </span>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge */}
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  FREE
                </span>
              </motion.a>
              
              {/* Call Button */}
              <motion.a
                  href="tel:+919876543210" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl border-2 transition-all duration-300 min-w-[200px] ${
                    theme === 'dark'
                    ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                    : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                <span className="relative z-10 flex items-center gap-2">
                  📞 Call Us Now
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </span>
                
                {/* Badge */}
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  LIVE
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Enhanced Contact Info Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40' : 'bg-gradient-to-br from-purple-50/80 via-blue-50/60 to-indigo-50/80'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'} blur-3xl`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${theme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-200/20'} blur-3xl`}></div>
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
                  ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 text-purple-400 border border-purple-800/50'
                  : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200/50'
              } shadow-lg`}>
                🌐 Connect With Us
              </span>
            </motion.div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Multiple Ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">Connect</span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Choose your <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">preferred method</span> to reach out to us. 
              Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">expert team</span> is available 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> 24/7</span> to assist you
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              <div className={`text-center p-4 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700' 
                  : 'bg-white/80 border border-purple-200'
              } backdrop-blur-sm shadow-lg`}>
                <div className={`text-2xl font-black mb-1 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  24/7
                </div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Support
                </div>
              </div>

              <div className={`text-center p-4 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700' 
                  : 'bg-white/80 border border-blue-200'
              } backdrop-blur-sm shadow-lg`}>
                <div className={`text-2xl font-black mb-1 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  &lt;2h
                </div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Response
                </div>
              </div>

              <div className={`text-center p-4 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700' 
                  : 'bg-white/80 border border-indigo-200'
              } backdrop-blur-sm shadow-lg`}>
                <div className={`text-2xl font-black mb-1 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  5+
                </div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Channels
                </div>
              </div>

              <div className={`text-center p-4 rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/50 border border-slate-700' 
                  : 'bg-white/80 border border-green-200'
              } backdrop-blur-sm shadow-lg`}>
                <div className={`text-2xl font-black mb-1 ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  100%
                </div>
                <div className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Satisfaction
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <ContactCard key={info.title} info={info} theme={theme} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section id="contact-form" className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/30'} blur-3xl`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${theme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-200/20'} blur-3xl`}></div>
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
                  ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-blue-400 border border-blue-800/50'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200/50'
              } shadow-lg`}>
                📧 Send Us a Message
              </span>
            </motion.div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">Message</span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Fill out the form below and we'll get back to you within 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> 24 hours</span>. 
              Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">dedicated team</span> is here to help with all your 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500"> questions and concerns</span>
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
                  24hr Response Guarantee
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Expert Support Team
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Secure & Confidential
                </span>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={formInViewRef}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="p-8 md:p-12">
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
                      Message Sent Successfully!
                    </h3>
                    <p className={`text-lg mb-6 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Thank you for reaching out to us. Our team will review your message and get back to you within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                          placeholder="Enter your full name"
                        />
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
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
                              ? 'bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                          placeholder="your.email@example.com"
                        />
                      </motion.div>

                      {/* Phone */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500'
                              : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                          placeholder="+91 98765 43210"
                        />
                      </motion.div>

                      {/* Subject */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={formInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 }}
                      >
                        <label className={`block text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                        }`}>
                          Subject *
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            theme === 'dark'
                              ? 'bg-slate-800/50 border-slate-600 text-white focus:border-purple-500'
                              : 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                          } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        >
                          <option value="">Select a subject</option>
                          <option value="course-inquiry">Course Inquiry</option>
                          <option value="admission">Admission Process</option>
                          <option value="placement">Placement Assistance</option>
                          <option value="technical-support">Technical Support</option>
                          <option value="partnership">Partnership Opportunities</option>
                          <option value="feedback">Feedback & Suggestions</option>
                          <option value="other">Other</option>
                        </select>
                      </motion.div>
                    </div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <label className={`block text-sm font-semibold mb-2 ${
                        theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                      }`}>
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none ${
                          theme === 'dark'
                            ? 'bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500'
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                        placeholder="Tell us about your inquiry, questions, or how we can help you..."
                      />
                    </motion.div>

                    {/* Submit Button */}
                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 }}
                      className="text-center pt-4"
                    >
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.05 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        className={`relative inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-all duration-300 min-w-[200px] ${
                          loading
                            ? 'bg-slate-400 cursor-not-allowed text-white'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700'
                        }`}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            📧 Send Message
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </div>
                        )}
                        
                        {/* Badge */}
                        {!loading && (
                          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            24H
                          </span>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Map Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30'}`}>
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
                  ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-blue-400 border border-blue-800/50'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200/50'
              } shadow-lg`}>
                📍 Find Us Here
              </span>
            </motion.div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Visit Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">Campus</span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Located in the heart of <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Indore</span>, our 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500"> modern campus</span> is easily accessible and equipped with 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500"> state-of-the-art facilities</span>
            </motion.p>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border border-slate-700' 
                : 'bg-white border border-slate-200'
            } backdrop-blur-sm`}>
              {/* Map Header */}
              <div className={`px-8 py-6 border-b ${
                theme === 'dark' ? 'border-slate-700 bg-slate-800/80' : 'border-slate-200 bg-slate-50/80'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Online School of Programming
                    </h3>
                    <p className={`text-lg ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      MG Road, Indore, Madhya Pradesh
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.a
                      href="https://maps.google.com/?q=Online+School+of+Programming+Indore"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        🗺️ Open in Maps
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.3410725966596!2d75.8411066743577!3d22.715560827717255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fda4906b7c11%3A0xf75e865647d4891c!2sOnline%20School%20of%20Programming!5e0!3m2!1sen!2sin!4v1748858112427!5m2!1sen!2sin"
                  width="100%" 
                  height="500" 
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Online School of Programming Location"
                />
                
                {/* Map Overlay for Loading */}
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${
                  theme === 'dark' ? 'bg-slate-800/20' : 'bg-white/20'
                }`}>
                  <div className={`px-4 py-2 rounded-lg backdrop-blur-sm ${
                    theme === 'dark' ? 'bg-slate-800/80 text-white' : 'bg-white/80 text-slate-800'
                  }`}>
                    <span className="text-sm font-medium">Loading Map...</span>
                  </div>
                </div>
              </div>

              {/* Map Footer with Quick Info */}
              <div className={`px-8 py-6 border-t ${
                theme === 'dark' ? 'border-slate-700 bg-slate-800/80' : 'border-slate-200 bg-slate-50/80'
              }`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                    }`}>
                      🚗
                    </div>
                    <div>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        Easy Parking
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Free parking available
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                    }`}>
                      🚌
                    </div>
                    <div>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        Public Transport
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Well connected by bus
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'dark' ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                    }`}>
                      🏢
                    </div>
                    <div>
                      <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                        City Center
                      </p>
                      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        Prime location in Indore
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Location Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className={`text-center p-6 rounded-2xl ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border border-slate-700' 
                : 'bg-white border border-slate-200'
            } backdrop-blur-sm shadow-lg`}>
              <div className="text-3xl mb-3">🕒</div>
              <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Office Hours
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Mon-Sat: 9:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>

            <div className={`text-center p-6 rounded-2xl ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border border-slate-700' 
                : 'bg-white border border-slate-200'
            } backdrop-blur-sm shadow-lg`}>
              <div className="text-3xl mb-3">📞</div>
              <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Quick Call
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                +91 98765 43210<br />
                Instant response
              </p>
            </div>

            <div className={`text-center p-6 rounded-2xl ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border border-slate-700' 
                : 'bg-white border border-slate-200'
            } backdrop-blur-sm shadow-lg`}>
              <div className="text-3xl mb-3">🚇</div>
              <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Nearest Metro
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                MG Road Station<br />
                5 min walk
              </p>
            </div>

            <div className={`text-center p-6 rounded-2xl ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border border-slate-700' 
                : 'bg-white border border-slate-200'
            } backdrop-blur-sm shadow-lg`}>
              <div className="text-3xl mb-3">🎯</div>
              <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                Landmarks
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Near Tech Park<br />
                Easy to find
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40' : 'bg-gradient-to-br from-purple-50/80 via-indigo-50/60 to-blue-50/80'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-indigo-500/10' : 'bg-indigo-200/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/30'} blur-3xl`}></div>
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
                  ? 'bg-gradient-to-r from-indigo-900/40 to-purple-900/40 text-indigo-400 border border-indigo-800/50'
                  : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200/50'
              } shadow-lg`}>
                ❓ Frequently Asked Questions
              </span>
            </motion.div>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Questions</span>
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
              Find <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">quick answers</span> to common questions about our 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> courses, admissions</span>, and 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500"> services</span>
            </motion.p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                theme={theme}
              />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/30 via-slate-900/20 to-blue-900/30' : 'bg-gradient-to-br from-purple-50/80 via-white to-blue-50/80'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -left-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-200/30'} blur-3xl`}></div>
          <div className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-200/30'} blur-3xl`}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full ${theme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-200/20'} blur-3xl`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
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
                  ? 'bg-gradient-to-r from-purple-900/40 to-blue-900/40 text-purple-400 border border-purple-800/50'
                  : 'bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200/50'
              } shadow-lg`}>
                🤝 Let's Connect
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}
            >
              Still Have <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600">Questions?</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto mb-12 leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Our <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">admissions counselors</span> are available to help you choose the 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500"> right course</span> for your 
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> career goals</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-4xl mx-auto"
            >
                            {/* Call Button */}
              <motion.a
                href="tel:+919876543210" 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[220px]"
              >
                <span className="flex items-center gap-2">
                  📞 Call for Free Counseling
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </span>
                
                {/* Badge */}
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  FREE
                </span>
              </motion.a>
              
              {/* Courses Button */}
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
              <Link 
                to="/courses" 
                  className={`relative inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl border-2 transition-all duration-300 min-w-[220px] ${
                  theme === 'dark'
                      ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                      : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                }`}
              >
                  <span className="flex items-center gap-2">
                🎓 Explore Our Courses
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  
                  {/* Badge */}
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
              </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 
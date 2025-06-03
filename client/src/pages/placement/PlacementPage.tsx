import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleBackground from '../../components/ui/ParticleBackground';
import CodeBackgroundAnimation from '../../components/ui/CodeBackgroundAnimation';
import HeroGradientText from '../../components/ui/HeroGradientText';

const PlacementPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStory, setSelectedStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null);
  const [activeProcess, setActiveProcess] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedModalContent, setSelectedModalContent] = useState<any>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-play success stories
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setSelectedStory((prev) => (prev + 1) % successStories.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Enhanced placement stats with animations
  const placementStats = [
    { 
      label: 'Placement Rate', 
      value: '97%', 
      icon: '📈',
      color: 'from-green-500 to-emerald-600',
      description: 'Students successfully placed',
      trend: '+5% from last year'
    },
    { 
      label: 'Average Salary', 
      value: '₹8.5 LPA', 
      icon: '💰',
      color: 'from-blue-500 to-cyan-600',
      description: 'Average package offered',
      trend: '+12% from last year'
    },
    { 
      label: 'Highest Package', 
      value: '₹42 LPA', 
      icon: '🚀',
      color: 'from-purple-500 to-pink-600',
      description: 'Record highest package',
      trend: 'New record this year'
    },
    { 
      label: 'Hiring Partners', 
      value: '250+', 
      icon: '🤝',
      color: 'from-orange-500 to-red-600',
      description: 'Active recruiting companies',
      trend: '+30 new partners'
    }
  ];

  // Enhanced success stories with more details
  const successStories = [
    {
      id: 1,
      name: 'Arjun Mehta',
      course: 'Full Stack Development',
      company: 'Microsoft',
      package: '₹25 LPA',
      previousRole: 'Fresher',
      duration: '6 months',
      skills: ['React', 'Node.js', 'Azure', 'TypeScript'],
      testimonial: 'The intensive training at OSOP Coding completely transformed my career. The hands-on projects and interview preparation were instrumental in landing my dream job at Microsoft.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      linkedIn: '#',
      achievement: 'Promoted to Senior Developer in 8 months',
      location: 'Bangalore'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      course: 'Data Science & AI',
      company: 'Amazon',
      package: '₹32 LPA',
      previousRole: 'Marketing Executive',
      duration: '8 months',
      skills: ['Python', 'Machine Learning', 'AWS', 'TensorFlow'],
      testimonial: 'Coming from a non-CS background, I never imagined I could switch to a tech career so successfully. The personalized attention and practical training made all the difference.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      linkedIn: '#',
      achievement: 'Led 3 major ML projects in first year',
      location: 'Hyderabad'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      course: 'DevOps Engineering',
      company: 'Google',
      package: '₹28 LPA',
      previousRole: 'System Admin',
      duration: '5 months',
      skills: ['Kubernetes', 'Docker', 'GCP', 'Terraform'],
      testimonial: 'The industry-focused curriculum and exposure to real-world projects prepared me for the challenges of working at a top tech company. The placement team\'s support was exceptional.',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      linkedIn: '#',
      achievement: 'Architected cloud infrastructure for 10M+ users',
      location: 'Pune'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      course: 'AI & Machine Learning',
      company: 'Meta',
      package: '₹35 LPA',
      previousRole: 'Data Analyst',
      duration: '7 months',
      skills: ['PyTorch', 'Computer Vision', 'NLP', 'MLOps'],
      testimonial: 'The AI curriculum was cutting-edge and the mentorship was world-class. I went from analyzing data to building AI systems that impact millions of users.',
      image: 'https://randomuser.me/api/portraits/women/28.jpg',
      linkedIn: '#',
      achievement: 'Published 2 research papers in top AI conferences',
      location: 'Mumbai'
    }
  ];

  // Enhanced top hiring companies with more details
  const topCompanies = [
    { 
      id: 1,
      name: 'Google', 
      logo: 'https://cdn.worldvectorlogo.com/logos/google-icon.svg',
      openings: 45,
      avgPackage: '₹28 LPA',
      roles: ['SDE', 'Data Scientist', 'DevOps Engineer'],
      hired: 23,
      category: 'Product'
    },
    { 
      id: 2,
      name: 'Microsoft', 
      logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
      openings: 38,
      avgPackage: '₹25 LPA',
      roles: ['Software Engineer', 'Cloud Architect', 'AI Engineer'],
      hired: 19,
      category: 'Product'
    },
    { 
      id: 3,
      name: 'Amazon', 
      logo: 'https://cdn.worldvectorlogo.com/logos/amazon-icon-1.svg',
      openings: 52,
      avgPackage: '₹30 LPA',
      roles: ['SDE', 'ML Engineer', 'Solutions Architect'],
      hired: 31,
      category: 'Product'
    },
    { 
      id: 4,
      name: 'Meta', 
      logo: 'https://cdn.worldvectorlogo.com/logos/meta-1.svg',
      openings: 28,
      avgPackage: '₹32 LPA',
      roles: ['Frontend Engineer', 'Data Engineer', 'Research Scientist'],
      hired: 15,
      category: 'Product'
    },
    { 
      id: 5,
      name: 'Netflix', 
      logo: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg',
      openings: 18,
      avgPackage: '₹35 LPA',
      roles: ['Senior SDE', 'ML Engineer', 'Platform Engineer'],
      hired: 12,
      category: 'Product'
    },
    { 
      id: 6,
      name: 'Adobe', 
      logo: 'https://cdn.worldvectorlogo.com/logos/adobe-icon.svg',
      openings: 22,
      avgPackage: '₹26 LPA',
      roles: ['UI Engineer', 'Backend Developer', 'AI Researcher'],
      hired: 14,
      category: 'Product'
    },
    { 
      id: 7,
      name: 'Salesforce', 
      logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
      openings: 35,
      avgPackage: '₹24 LPA',
      roles: ['Full Stack Developer', 'Cloud Engineer', 'Data Analyst'],
      hired: 21,
      category: 'Enterprise'
    },
    { 
      id: 8,
      name: 'Oracle', 
      logo: 'https://cdn.worldvectorlogo.com/logos/oracle-6.svg',
      openings: 40,
      avgPackage: '₹22 LPA',
      roles: ['Database Engineer', 'Java Developer', 'Cloud Consultant'],
      hired: 25,
      category: 'Enterprise'
    },
    { 
      id: 9,
      name: 'IBM', 
      logo: 'https://cdn.worldvectorlogo.com/logos/ibm.svg',
      openings: 33,
      avgPackage: '₹20 LPA',
      roles: ['AI Developer', 'Cloud Engineer', 'Consultant'],
      hired: 18,
      category: 'Enterprise'
    },
    { 
      id: 10,
      name: 'Accenture', 
      logo: 'https://cdn.worldvectorlogo.com/logos/accenture-2.svg',
      openings: 60,
      avgPackage: '₹18 LPA',
      roles: ['Technology Analyst', 'Consultant', 'Developer'],
      hired: 42,
      category: 'Consulting'
    },
    { 
      id: 11,
      name: 'TCS', 
      logo: 'https://cdn.worldvectorlogo.com/logos/tata-consultancy-services.svg',
      openings: 80,
      avgPackage: '₹16 LPA',
      roles: ['System Engineer', 'Developer', 'Analyst'],
      hired: 58,
      category: 'Services'
    },
    { 
      id: 12,
      name: 'Infosys', 
      logo: 'https://cdn.worldvectorlogo.com/logos/infosys-1.svg',
      openings: 75,
      avgPackage: '₹17 LPA',
      roles: ['Software Engineer', 'Consultant', 'Specialist'],
      hired: 52,
      category: 'Services'
    }
  ];

  // Enhanced placement process with interactive elements
  const placementProcess = [
    {
      id: 1,
      title: 'Skills Assessment',
      description: 'Comprehensive evaluation of your technical skills, problem-solving abilities, and conceptual understanding through assignments and tests.',
      icon: '📝',
      duration: '2 weeks',
      activities: ['Technical Tests', 'Coding Challenges', 'Project Reviews', 'Peer Assessments'],
      color: 'from-blue-500 to-cyan-500',
      completionRate: 95
    },
    {
      id: 2,
      title: 'Resume Building',
      description: 'Personalized guidance to create an industry-standard resume that highlights your skills, projects, and achievements effectively.',
      icon: '📄',
      duration: '1 week',
      activities: ['Resume Templates', 'ATS Optimization', 'Portfolio Creation', 'LinkedIn Profile'],
      color: 'from-green-500 to-emerald-500',
      completionRate: 98
    },
    {
      id: 3,
      title: 'Interview Preparation',
      description: 'Rigorous mock interviews, technical preparation, and personalized feedback sessions to enhance your interview performance.',
      icon: '👥',
      duration: '3 weeks',
      activities: ['Mock Interviews', 'Technical Rounds', 'HR Preparation', 'Group Discussions'],
      color: 'from-purple-500 to-pink-500',
      completionRate: 92
    },
    {
      id: 4,
      title: 'Company-Specific Training',
      description: 'Targeted preparation for specific companies including their interview patterns, technical assessments, and cultural aspects.',
      icon: '🏢',
      duration: '2 weeks',
      activities: ['Company Research', 'Pattern Analysis', 'Culture Fit', 'Salary Negotiation'],
      color: 'from-orange-500 to-red-500',
      completionRate: 89
    },
    {
      id: 5,
      title: 'Placement Drives',
      description: 'Exclusive on-campus and virtual placement drives with top companies across various sectors.',
      icon: '🚀',
      duration: 'Ongoing',
      activities: ['Campus Drives', 'Virtual Interviews', 'Assessment Centers', 'Final Rounds'],
      color: 'from-indigo-500 to-purple-500',
      completionRate: 87
    },
    {
      id: 6,
      title: 'Offer & Negotiation',
      description: 'Guidance on evaluating job offers, salary negotiation, and making informed career decisions.',
      icon: '🤝',
      duration: '1 week',
      activities: ['Offer Evaluation', 'Salary Negotiation', 'Contract Review', 'Onboarding Support'],
      color: 'from-teal-500 to-cyan-500',
      completionRate: 94
    }
  ];

  // Industry insights data
  const industryInsights = [
    {
      title: 'Tech Hiring Trends 2024',
      description: 'AI/ML roles seeing 150% growth',
      icon: '📊',
      trend: '+150%'
    },
    {
      title: 'Remote Work Adoption',
      description: '78% companies offer hybrid roles',
      icon: '🏠',
      trend: '78%'
    },
    {
      title: 'Skill Demand',
      description: 'Cloud & DevOps skills in high demand',
      icon: '☁️',
      trend: '+200%'
    },
    {
      title: 'Salary Growth',
      description: 'Tech salaries increased by 25%',
      icon: '💹',
      trend: '+25%'
    }
  ];

  // Testimonial categories
  const testimonialCategories = [
    { id: 'all', name: 'All Stories', count: successStories.length },
    { id: 'product', name: 'Product Companies', count: 3 },
    { id: 'startup', name: 'Startups', count: 2 },
    { id: 'enterprise', name: 'Enterprise', count: 2 }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Advanced Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-20 pb-32 lg:pt-24 lg:pb-40">
        {/* Multi-layered Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={100}
            colorScheme={theme === 'dark' ? 'blue' : 'blue'}
            connectParticles={true}
            interactivity={true}
            className="opacity-40"
          />
          
        <CodeBackgroundAnimation
          speed="slow"
            density="medium"
            className="opacity-5"
            characters="class Career { success() { return 'OSOP'; } } const placement = await getJob();"
          />
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/5"></div>
        </div>

        {/* Floating geometric shapes */}
        <motion.div
          style={{ y }}
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
                duration: 10 + i * 2,
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
                🎯 Placements & Career Success
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Placements</span>
              </nav>
            </motion.div>
            
            {/* Main heading with advanced gradient text */}
            <HeroGradientText
              text="Launch Your Dream Career"
              gradientColors="from-blue-400 via-purple-500 to-pink-500"
              animationType="reveal"
              duration={1}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
            />
            
            {/* Subheading with typewriter effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-12"
            >
              <p className={`text-xl md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Join <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">97%</span> of our graduates who landed their dream jobs at 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"> top tech companies</span>
              </p>
            </motion.div>

            {/* CTA Buttons with advanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link 
                  to="/courses" 
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden transform-gpu"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  
                  {/* Particle effect background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Pulsing border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-colors duration-300"></div>
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.span 
                      className="text-2xl"
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      🚀
                    </motion.span>
                    
                    <span className="font-black tracking-wide">Explore Courses</span>
                    
                    <motion.svg 
                      className="w-6 h-6 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={3}
                      animate={{ 
                        x: [0, 8, 0],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 scale-110"></div>
                </Link>
                
                {/* Floating elements around button */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [-20, -40, -20],
                        x: [0, (Math.random() * 20 - 10), 0],
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  onClick={() => {
                    setSelectedModalContent('placement-stats');
                    setShowModal(true);
                  }}
                  className={`group px-8 py-4 rounded-2xl font-bold border-2 backdrop-blur-sm transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-blue-500/50 text-blue-400 hover:bg-blue-900/30 hover:border-blue-400'
                      : 'border-blue-600/50 text-blue-700 hover:bg-blue-100/50 hover:border-blue-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    📊 View Success Stats
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </motion.svg>
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Interactive Navigation Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className={`inline-flex p-2 rounded-2xl backdrop-blur-md ${
              theme === 'dark' 
                ? 'bg-slate-800/50 border border-slate-700/50' 
                : 'bg-white/50 border border-slate-200/50'
            } shadow-2xl`}>
              {[
                { id: 'overview', name: 'Overview', icon: '🎯' },
                { id: 'success-stories', name: 'Success Stories', icon: '⭐' },
                { id: 'companies', name: 'Top Companies', icon: '🏢' },
                { id: 'process', name: 'Our Process', icon: '🛣️' }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? theme === 'dark'
                        ? 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                        : 'text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : theme === 'dark'
                        ? 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="hidden sm:inline">{tab.name}</span>
                  </span>
                  
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Content Based on Active Tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Advanced Stats Section */}
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
                    Placement <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Excellence</span>
                  </h2>
                  <p className={`text-xl max-w-3xl mx-auto ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Our track record speaks for itself - transforming careers and launching futures
                  </p>
                </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {placementStats.map((stat, index) => (
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
                          : 'bg-white/80 border border-slate-200 hover:border-slate-300'
                      } backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300`}
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      {/* Icon with animation */}
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
                      
                      {/* Value with counter animation */}
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
                  {stat.value}
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
                      
                      {/* Trend indicator */}
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
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            {/* Industry Insights Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
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
                    Industry <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Insights</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
                    Stay ahead with the latest trends and opportunities in tech hiring
            </p>
          </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {industryInsights.map((insight, index) => (
              <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className={`group p-6 rounded-xl border ${
                        theme === 'dark' 
                          ? 'bg-slate-800/50 border-slate-700 hover:border-purple-500/50' 
                          : 'bg-slate-50 border-slate-200 hover:border-purple-300'
                      } transition-all duration-300 cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{insight.icon}</span>
                        <span className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500`}>
                          {insight.trend}
                        </span>
                  </div>
                  
                      <h3 className={`text-lg font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {insight.title}
                      </h3>
                      
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {insight.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'success-stories' && (
          <motion.div
            key="success-stories"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Interactive Success Stories Section */}
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
                    Success <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Stories</span>
                  </h2>
                  <p className={`text-xl max-w-3xl mx-auto mb-8 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Real stories from our graduates who transformed their careers
                  </p>

                  {/* Story Controls */}
                  <div className="flex justify-center items-center gap-4 mb-8">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-700 text-white hover:bg-slate-600'
                          : 'bg-white text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {isPlaying ? '⏸️' : '▶️'} {isPlaying ? 'Pause' : 'Auto Play'}
                    </button>
                    
                    <div className="flex gap-2">
                      {successStories.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedStory(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            selectedStory === index
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                              : theme === 'dark'
                                ? 'bg-slate-600 hover:bg-slate-500'
                                : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Featured Story Display */}
                <div className="max-w-6xl mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedStory}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className={`rounded-3xl overflow-hidden ${
                        theme === 'dark' 
                          ? 'bg-slate-800/50 border border-slate-700' 
                          : 'bg-white border border-slate-200'
                      } shadow-2xl backdrop-blur-sm`}
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Story Content */}
                        <div className="p-8 lg:p-12">
                          <div className="flex items-center gap-4 mb-6">
                            <motion.img
                              src={successStories[selectedStory].image}
                              alt={successStories[selectedStory].name}
                              className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            />
                    <div>
                              <h3 className={`text-2xl font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                                {successStories[selectedStory].name}
                      </h3>
                      <p className={`${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                                {successStories[selectedStory].course}
                      </p>
                    </div>
                  </div>
                  
                          {/* Company & Package */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className={`p-4 rounded-xl ${
                              theme === 'dark' ? 'bg-slate-700/50' : 'bg-blue-50'
                            }`}>
                              <div className={`text-sm ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Company
                </div>
                              <div className={`text-xl font-bold ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                                {successStories[selectedStory].company}
                    </div>
                  </div>
                  
                            <div className={`p-4 rounded-xl ${
                              theme === 'dark' ? 'bg-slate-700/50' : 'bg-green-50'
                            }`}>
                              <div className={`text-sm ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Package
                              </div>
                              <div className={`text-xl font-bold ${
                                theme === 'dark' ? 'text-green-400' : 'text-green-600'
                              }`}>
                                {successStories[selectedStory].package}
                              </div>
                            </div>
                          </div>

                          {/* Journey Details */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <div className={`text-sm ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Previous Role
                              </div>
                              <div className={`font-semibold ${
                                theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                              }`}>
                                {successStories[selectedStory].previousRole}
                              </div>
                            </div>
                            
                            <div>
                              <div className={`text-sm ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Training Duration
                              </div>
                              <div className={`font-semibold ${
                                theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                              }`}>
                                {successStories[selectedStory].duration}
                              </div>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="mb-6">
                            <div className={`text-sm mb-2 ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              Key Skills Learned
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {successStories[selectedStory].skills.map((skill, index) => (
                                <motion.span
                                  key={skill}
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 }}
                                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    theme === 'dark'
                                      ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                                  }`}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* Testimonial */}
                          <blockquote className={`text-lg italic leading-relaxed ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                            "{successStories[selectedStory].testimonial}"
                          </blockquote>
                  </div>

                        {/* Achievement Highlights */}
                        <div className={`p-8 lg:p-12 ${
                          theme === 'dark' ? 'bg-slate-700/30' : 'bg-slate-50'
                        }`}>
                          <h4 className={`text-xl font-bold mb-6 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            Career Highlights
                          </h4>

                          <div className="space-y-6">
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 }}
                              className={`p-4 rounded-xl ${
                                theme === 'dark' ? 'bg-slate-800/50' : 'bg-white'
                              } border-l-4 border-green-500`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-green-500">🏆</span>
                                <span className={`font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                                }`}>
                                  Major Achievement
                                </span>
                </div>
                              <p className={`text-sm ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {successStories[selectedStory].achievement}
                              </p>
              </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className={`p-4 rounded-xl ${
                                theme === 'dark' ? 'bg-slate-800/50' : 'bg-white'
                              } border-l-4 border-blue-500`}
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-blue-500">📍</span>
                                <span className={`font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                                }`}>
                                  Location
                                </span>
          </div>
                              <p className={`text-sm ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {successStories[selectedStory].location}
                              </p>
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 }}
                              className="flex gap-3"
                            >
                              <button className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}>
                                Connect on LinkedIn
                              </button>
                              
                              <button 
                                onClick={() => {
                                  setSelectedModalContent(successStories[selectedStory]);
                                  setShowModal(true);
                                }}
                                className={`py-3 px-4 rounded-xl font-medium border transition-colors ${
                                  theme === 'dark'
                                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                                    : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                Full Story
                              </button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* All Stories Grid */}
                <div className="mt-20">
                  <h3 className={`text-2xl font-bold text-center mb-12 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    More Success Stories
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {successStories.map((story, index) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedStory(index)}
                        className={`group cursor-pointer rounded-xl overflow-hidden ${
                          theme === 'dark' 
                            ? 'bg-slate-800/50 border border-slate-700 hover:border-blue-500/50' 
                            : 'bg-white border border-slate-200 hover:border-blue-300'
                        } transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <img
                              src={story.image}
                              alt={story.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className={`font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-slate-800'
                              }`}>
                                {story.name}
                              </h4>
                              <p className={`text-sm ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {story.company}
                              </p>
                            </div>
                          </div>
                          
                          <div className={`text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500`}>
                            {story.package}
                          </div>
                          
                          <p className={`text-sm line-clamp-3 ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {story.testimonial}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
          </div>
        </div>
      </section>
          </motion.div>
        )}

        {activeTab === 'companies' && (
          <motion.div
            key="companies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Interactive Companies Section */}
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
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Hiring Partners</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
                    Leading companies that actively recruit our graduates
            </p>
          </motion.div>
          
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topCompanies.map((company, index) => (
              <motion.div
                      key={company.id}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ 
                        y: -10, 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      onHoverStart={() => setHoveredCompany(company.id)}
                      onHoverEnd={() => setHoveredCompany(null)}
                      className={`group relative rounded-2xl p-6 overflow-hidden ${
                  theme === 'dark' 
                          ? 'bg-slate-800/50 border border-slate-700 hover:border-orange-500/50' 
                          : 'bg-white border border-slate-200 hover:border-orange-300'
                      } backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer`}
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Company logo */}
                      <div className="relative z-10 flex items-center justify-center h-20 mb-4">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                          className="max-h-16 max-w-full object-contain filter saturate-0 opacity-60 group-hover:saturate-100 group-hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                      
                      {/* Company name */}
                      <h3 className={`text-xl font-bold text-center mb-4 relative z-10 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {company.name}
                      </h3>
                      
                      {/* Company stats */}
                      <AnimatePresence>
                        {hoveredCompany === company.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 space-y-3"
                          >
                            <div className="grid grid-cols-2 gap-3">
                              <div className={`p-3 rounded-lg ${
                                theme === 'dark' ? 'bg-slate-700/50' : 'bg-orange-50'
                              }`}>
                                <div className={`text-xs ${
                                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  Openings
                                </div>
                                <div className={`text-lg font-bold ${
                                  theme === 'dark' ? 'text-orange-400' : 'text-orange-600'
                                }`}>
                                  {company.openings}
                                </div>
                              </div>
                              
                              <div className={`p-3 rounded-lg ${
                                theme === 'dark' ? 'bg-slate-700/50' : 'bg-green-50'
                              }`}>
                                <div className={`text-xs ${
                                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                }`}>
                                  Hired
                                </div>
                                <div className={`text-lg font-bold ${
                                  theme === 'dark' ? 'text-green-400' : 'text-green-600'
                                }`}>
                                  {company.hired}
                                </div>
                              </div>
                            </div>
                            
                            <div className={`p-3 rounded-lg ${
                              theme === 'dark' ? 'bg-slate-700/50' : 'bg-blue-50'
                            }`}>
                              <div className={`text-xs mb-1 ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Avg Package
                              </div>
                              <div className={`text-lg font-bold ${
                                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                              }`}>
                                {company.avgPackage}
                              </div>
                            </div>
                            
                            <div>
                              <div className={`text-xs mb-2 ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                Popular Roles
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {company.roles.slice(0, 2).map((role, i) => (
                                  <span
                                    key={i}
                                    className={`px-2 py-1 text-xs rounded ${
                                      theme === 'dark'
                                        ? 'bg-orange-900/30 text-orange-400'
                                        : 'bg-orange-100 text-orange-700'
                                    }`}
                                  >
                                    {role}
                                  </span>
                                ))}
                                {company.roles.length > 2 && (
                                  <span className={`px-2 py-1 text-xs rounded ${
                                    theme === 'dark'
                                      ? 'bg-slate-700 text-slate-300'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    +{company.roles.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Category badge */}
                      <div className={`absolute top-4 right-4 px-2 py-1 rounded text-xs font-medium ${
                        company.category === 'Product' 
                          ? theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                          : company.category === 'Enterprise'
                          ? theme === 'dark' ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'
                          : company.category === 'Consulting'
                          ? theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                          : theme === 'dark' ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {company.category}
                      </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
          </motion.div>
        )}

        {activeTab === 'process' && (
          <motion.div
            key="process"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Interactive Process Section */}
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
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Placement Process</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
                    A comprehensive 6-step journey to your dream job
            </p>
          </motion.div>

                {/* Process Timeline */}
                <div className="max-w-6xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {placementProcess.map((step, index) => (
              <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setActiveProcess(step.id)}
                        className={`group relative rounded-2xl p-8 overflow-hidden cursor-pointer ${
                  theme === 'dark' 
                            ? 'bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50' 
                            : 'bg-white border border-slate-200 hover:border-indigo-300'
                        } backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300`}
                      >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                        
                        {/* Step number and icon */}
                        <div className="relative z-10 flex items-start gap-4 mb-6">
                          <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {index + 1}
                      </div>
                      
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-3xl">{step.icon}</span>
                      <h3 className={`text-xl font-bold ${
                                theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>
                  {step.title}
                </h3>
                    </div>
                    
                            <div className={`text-sm font-medium mb-3 ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              Duration: {step.duration}
                            </div>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className={`relative z-10 mb-6 leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                  {step.description}
                </p>
                        
                        {/* Activities */}
                        <div className="relative z-10 mb-6">
                          <div className={`text-sm font-medium mb-3 ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            Key Activities:
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {step.activities.map((activity, i) => (
                              <div
                                key={i}
                                className={`flex items-center gap-2 text-sm ${
                                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                                }`}
                              >
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></div>
                                {activity}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Completion rate */}
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-2">
                            <span className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              Success Rate
                            </span>
                            <span className={`text-sm font-bold ${
                              theme === 'dark' ? 'text-white' : 'text-slate-800'
                            }`}>
                              {step.completionRate}%
                            </span>
                          </div>
                          
                          <div className={`w-full h-2 rounded-full ${
                            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'
                          }`}>
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${step.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${step.completionRate}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                            />
                  </div>
                </div>
              </motion.div>
            ))}
                  </div>
          </div>
        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Component */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-4xl max-h-[90vh] overflow-auto rounded-2xl ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              } shadow-2xl`}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="p-8">
                {selectedModalContent === 'placement-stats' ? (
                  <div>
                    <h2 className={`text-3xl font-bold mb-6 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Detailed Placement Statistics
                    </h2>
                    {/* Add detailed stats content here */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {placementStats.map((stat, index) => (
                        <div key={index} className={`p-6 rounded-xl ${
                          theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-50'
                        }`}>
                          <div className="text-4xl mb-4">{stat.icon}</div>
                          <div className={`text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}>
                            {stat.value}
                          </div>
                          <div className={`text-lg font-semibold mb-2 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            {stat.label}
                          </div>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {stat.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedModalContent && typeof selectedModalContent === 'object' ? (
                  <div>
                    <h2 className={`text-3xl font-bold mb-6 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      {selectedModalContent.name}'s Success Story
                    </h2>
                    {/* Add detailed story content here */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedModalContent.image}
                          alt={selectedModalContent.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                          <h3 className={`text-2xl font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            {selectedModalContent.name}
                          </h3>
                          <p className={`text-lg ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {selectedModalContent.course} → {selectedModalContent.company}
                          </p>
                        </div>
                      </div>
                      
                      <blockquote className={`text-lg italic leading-relaxed p-6 rounded-xl ${
                        theme === 'dark' ? 'bg-slate-700/50 text-slate-300' : 'bg-slate-50 text-slate-700'
                      }`}>
                        "{selectedModalContent.testimonial}"
                      </blockquote>
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-4xl md:text-5xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}
            >
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Transform</span> Your Career?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-xl mb-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Join thousands of successful graduates who landed their dream jobs through our comprehensive placement program
            </motion.p>
            
          <motion.div
            initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
            >
              <Link 
                to="/courses" 
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden transform-gpu"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  
                  {/* Particle effect background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Pulsing border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover:border-white/60 transition-colors duration-300"></div>
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-3">
                    <motion.span 
                      className="text-2xl"
                      animate={{ 
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      🚀
                    </motion.span>
                    
                    <span className="font-black tracking-wide">Explore Courses</span>
                    
                    <motion.svg 
                      className="w-6 h-6 ml-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      strokeWidth={3}
                      animate={{ 
                        x: [0, 8, 0],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 scale-110"></div>
              </Link>
                
                {/* Floating elements around button */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        y: [-20, -40, -20],
                        x: [0, (Math.random() * 20 - 10), 0],
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
              
              <Link 
                to="/contact" 
                className={`px-8 py-4 rounded-2xl font-bold border-2 backdrop-blur-sm transition-all duration-300 ${
                  theme === 'dark'
                    ? 'border-blue-500/50 text-blue-400 hover:bg-blue-900/30 hover:border-blue-400'
                    : 'border-blue-600/50 text-blue-700 hover:bg-blue-100/50 hover:border-blue-600'
                }`}
              >
                💬 Get Free Counseling
              </Link>
            </motion.div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default PlacementPage; 
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
import osopLogo from '../../assets/images/osop-logo.png';

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
      slug: "java-for-developers",
      title: "Java for Developers",
      subtitle: "Master Java programming with comprehensive training from basics to advanced development",
      image: "/images/hero/java-hero.jpg",
      cta: "Start Java Course",
      particleColor: 'from-orange-500 to-red-500',
      color: 'from-orange-500 to-red-500',
      stats: {
        students: '15,000+',
        experience: '25+ Years',
        placement: '100%'
      }
    },
    {
      slug: "python-for-data-science",
      title: "Python for Developers",
      subtitle: "Learn Python programming from fundamentals to advanced web development applications",
      image: "/images/hero/python-hero.jpg",
      cta: "Start Python Course",
      particleColor: 'from-blue-500 to-green-500',
      color: 'from-blue-500 to-green-500',
      stats: {
        students: '15,000+',
        experience: '25+ Years',
        placement: '100%'
      }
    },
    {
      slug: "complete-data-science",
      title: "AI & Data Science",
      subtitle: "Build intelligent applications with cutting-edge AI technologies and machine learning",
      image: "/images/hero/ai-hero.jpg",
      cta: "Explore AI Courses",
      particleColor: 'from-purple-500 to-pink-500',
      color: 'from-purple-500 to-pink-500',
      stats: {
        students: '15,000+',
        experience: '25+ Years',
        placement: '100%'
      }
    },
    {
      slug: "data-structures-and-algorithms-(dsa)-using-c++",
      title: "Data Structure & Algorithm",
      subtitle: "Master fundamental computer science concepts essential for technical interviews",
      image: "/images/hero/dsa-hero.jpg",
      cta: "Learn DSA",
      particleColor: 'from-indigo-500 to-cyan-500',
      color: 'from-indigo-500 to-cyan-500',
      stats: {
        students: '15,000+',
        experience: '25+ Years',
        placement: '100%'
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
      title: 'Most Premium Course',
      description: 'Access to our flagship premium programming courses with industry-leading curriculum and advanced learning materials.',
      icon: '👑',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      title: 'Live & Recorded Classes',
      description: 'Attend interactive live sessions and access comprehensive recorded classes for flexible learning at your own pace.',
      icon: '📹',
      color: 'from-red-500 to-rose-600'
    },
    {
      title: 'Weekly Live Class for Doubt Solving',
      description: 'Join our dedicated weekly live sessions with Dr. Bajpai Sir for personalized doubt clearing and concept reinforcement.',
      icon: '❓',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: '50+ Assignments',
      description: 'Practice with over 50 carefully crafted assignments designed to strengthen your programming skills and problem-solving abilities.',
      icon: '📝',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Assessment via Online Test',
      description: 'Regular online assessments and tests to track your progress and ensure thorough understanding of concepts.',
      icon: '✅',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'Practical Approach',
      description: 'Learn through hands-on coding exercises, real-world projects, and practical implementation of theoretical concepts.',
      icon: '⚡',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Industry Recognised Certification Course',
      description: 'Earn valuable industry-recognized certificates upon completion that enhance your professional credibility.',
      icon: '🏆',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Access to our Placement Portal',
      description: 'Get exclusive access to our dedicated placement portal with job opportunities from top tech companies.',
      icon: '🚀',
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  // Student testimonials data - Real feedback from OSOP alumni
  const testimonials = [
    {
      name: 'Trupti Nagar Jain',
      company: 'Microsoft',
      role: 'Senior Architect, Microsoft USA',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      companyLogo: 'https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png',
      video: 'https://www.youtube.com/embed/ZmID8vdF6c8',
      quote: 'OSOP Coding transformed my career completely! The comprehensive curriculum and Dr. Bajpai Sir\'s mentorship helped me land my dream job at Microsoft USA. The practical approach and industry-relevant projects gave me the confidence to excel in technical interviews.',
      title: 'From Beginner to Microsoft Senior Architect',
      package: '₹45 LPA',
      courseCompleted: 'Java Full Stack Development',
      rating: 5
    },
    {
      name: 'Sachin Tomar',
      company: 'Banking Sector',
      role: 'Senior Java Developer, AVP',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      companyLogo: 'https://logos-world.net/wp-content/uploads/2020/09/Java-Logo.png',
      video: 'https://www.youtube.com/embed/EZROGHX2TCY',
      quote: 'The Java programming course at OSOP Coding was exceptional. The weekly doubt-solving sessions and comprehensive assignments prepared me for senior-level positions. Dr. Bajpai Sir\'s guidance was instrumental in achieving the AVP role.',
      title: 'Java Expertise Led to AVP Position',
      package: '₹35 LPA',
      courseCompleted: 'Java Enterprise Development',
      rating: 5
    },
    {
      name: 'Neeraj Sharma',
      company: 'HCL',
      role: 'Senior Java Developer, HCL Netherlands',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
      companyLogo: 'https://logos-world.net/wp-content/uploads/2020/09/HCL-Logo.png',
      video: 'https://www.youtube.com/embed/q0i7v0ZjmBA',
      quote: 'OSOP\'s Java course gave me the technical foundation I needed for international opportunities. The industry-recognized certification and placement portal access led me directly to HCL Netherlands. The practical projects were invaluable.',
      title: 'OSOP Led Me to HCL Netherlands',
      package: '₹42 LPA',
      courseCompleted: 'Java Development',
      rating: 5
    },
    {
      name: 'Shubham Jain',
      company: 'NTT Data',
      role: 'Director, NTT Data USA',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      companyLogo: 'https://logos-world.net/wp-content/uploads/2020/10/NTT-Data-Logo.png',
      video: 'https://www.youtube.com/embed/OYIiAdhd-Ec',
      quote: 'Starting my journey with OSOP Coding\'s structured curriculum and personalized mentoring helped me reach the Director level at NTT Data USA. The live classes and comprehensive learning approach made all the difference.',
      title: 'From Student to Director at NTT Data USA',
      package: '₹55 LPA',
      courseCompleted: 'Complete Software Development',
      rating: 5
    },
    {
      name: 'Rakshit Bhatia',
      company: 'JD Software',
      role: 'Software Developer, JD Software Bangalore',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      companyLogo: 'https://logos-world.net/wp-content/uploads/2020/09/Software-Development-Logo.png',
      video: 'https://www.youtube.com/embed/TAHnPRA-ghA',
      quote: 'The assessment-based learning approach at OSOP Coding kept me motivated throughout. The online tests and assignments exactly matched the industry standards. Dr. Bajpai Sir\'s guidance was instrumental in my JD Software selection.',
      title: 'OSOP\'s Assessment Approach Works!',
      package: '₹18 LPA',
      courseCompleted: 'Software Development',
      rating: 5
    },
    {
      name: 'Shiva Jain',
      company: 'TCS',
      role: 'Software Developer, TCS',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      companyLogo: 'https://logos-world.net/wp-content/uploads/2020/10/Tata-Consultancy-Services-Logo.png',
      video: 'https://www.youtube.com/embed/CiXi9FTXnnA',
      quote: 'OSOP\'s comprehensive programming curriculum exceeded my expectations. The hands-on projects and industry-relevant training prepared me perfectly for TCS\'s technical interviews. The placement portal connected me directly with recruiters.',
      title: 'Programming Dreams Realized at TCS',
      package: '₹12 LPA',
      courseCompleted: 'Programming Fundamentals',
      rating: 5
    },
    {
      name: 'Anshul Gupta',
      company: 'Wipro',
      role: 'Software Developer, Wipro',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      companyLogo: 'https://logos-world.net/wp-content/uploads/2020/10/Wipro-Logo.png',
      video: 'https://www.youtube.com/embed/pEvczGfvs9k',
      quote: 'The premium course quality at OSOP Coding is unmatched. From live coding sessions to doubt-solving classes, everything was perfectly structured. The certification from OSOP significantly boosted my profile during Wipro interviews.',
      title: 'Premium Learning Experience at OSOP',
      package: '₹15 LPA',
      courseCompleted: 'Software Development',
      rating: 5
    }
  ];

  // Placement drives data - Updated with your actual images
  const placementEvents = [
    {
      title: 'HotWax Systems - Welcome Team HotWax',
      date: 'February 15, 2024',
      image: '/images/placement-drives/HotWax/hotwax-drive-2024-1.jpg',
      description: 'Welcome ceremony for HotWax Systems recruitment team with company representatives.',
      students: 0,
      icon: '🎉'
    },
    {
      title: 'HotWax Systems - Java Developer Drive',
      date: 'February 16, 2024',
      image: '/images/placement-drives/HotWax/hotwax-drive-2024-2.jpg',
      description: 'Specialized recruitment drive for Java Developer positions with technical assessments.',
      students: 22,
      icon: '☕'
    },
    {
      title: 'HotWax Systems - Technical Interview Process',
      date: 'February 17, 2024',
      image: '/images/placement-drives/HotWax/hotwax-drive-2024-3.jpg',
      description: 'Technical interview rounds and coding assessments for selected candidates.',
      students: 30,
      icon: '💻'
    },
    {
      title: 'HotWax Systems - Final Selection Ceremony',
      date: 'February 18, 2024',
      image: '/images/placement-drives/HotWax/hotwax-drive-2024-4.jpg',
      description: 'Award ceremony and offer letter distribution for successful candidates.',
      students: 18,
      icon: '🏆'
    },
    {
      title: 'HotWax Systems - Celebration with Selected Students',
      date: 'February 19, 2024',
      image: '/images/placement-drives/HotWax/hotwax-drive-2024-5.jpg',
      description: 'Final celebration with all selected candidates and HotWax team members.',
      students: 25,
      icon: '🎊'
    },
    {
      title: 'Synechron Technologies - Welcome Sarosh Raghwan Ji',
      date: 'March 20, 2024',
      image: '/images/placement-drives/Synechron/synechron-drive-2024-1.jpg',
      description: 'Welcome ceremony for Synechron Technologies recruitment team and company presentation.',
      students: 0,
      icon: '🤝'
    },
    {
      title: 'Synechron Technologies - Technical Interview',
      date: 'March 21, 2024',
      image: '/images/placement-drives/Synechron/synechron-drive-2024-2.jpg',
      description: 'Technical interview rounds for Java and Full Stack Developer positions.',
      students: 25,
      icon: '💻'
    },
    {
      title: 'Synechron Technologies - HR Interview & Assessment',
      date: 'March 22, 2024',
      image: '/images/placement-drives/Synechron/synechron-drive-2024-3.jpg',
      description: 'HR interview rounds and final selection process with company executives.',
      students: 18,
      icon: '👥'
    },
    {
      title: 'Synechron Technologies - Selected Candidates Celebration',
      date: 'March 25, 2024',
      image: '/images/placement-drives/Synechron/synechron-drive-2024-4.jpg',
      description: 'Celebration ceremony with successfully selected candidates from Synechron drive.',
      students: 15,
      icon: '🎊'
    },
    {
      title: 'WorldPay - Welcome WorldPay Team',
      date: 'January 24, 2024',
      image: '/images/placement-drives/WorldPay/worldpay-drive-2024-1.jpg',
      description: 'Welcome ceremony for WorldPay recruitment team and company overview session.',
      students: 0,
      icon: '🏦'
    },
    {
      title: 'WorldPay - Java Developer Recruitment',
      date: 'January 25, 2024',
      image: '/images/placement-drives/WorldPay/worldpay-drive-2024-2.jpg',
      description: 'Java Developer recruitment drive with competitive packages and technical rounds.',
      students: 28,
      icon: '🌐'
    },
    {
      title: 'WorldPay - Team Interaction & Culture Session',
      date: 'January 26, 2024',
      image: '/images/placement-drives/WorldPay/worldpay-drive-2024-3.jpg',
      description: 'Team interaction session and company culture presentation with WorldPay executives.',
      students: 0,
      icon: '👨‍💼'
    },
    {
      title: 'WorldPay - Final Interview & Selection',
      date: 'January 27, 2024',
      image: '/images/placement-drives/WorldPay/worldpay-drive-2024-4.jpg',
      description: 'Final interview rounds and selection process for WorldPay positions.',
      students: 22,
      icon: '📋'
    },
    {
      title: 'WorldPay - Offer Letter Distribution Ceremony',
      date: 'January 28, 2024',
      image: '/images/placement-drives/WorldPay/worldpay-drive-2024-5.jpg',
      description: 'Grand ceremony for offer letter distribution and celebration with WorldPay team.',
      students: 20,
      icon: '🎁'
    }
  ];

  // Complete company logos data - Comprehensive list with reliable logo URLs
  const allCompanies = [
    // Indian IT Giants
    { name: 'TCS', logo: 'https://cdn.worldvectorlogo.com/logos/tata-consultancy-services.svg' },
    { name: 'Infosys', logo: 'https://cdn.worldvectorlogo.com/logos/infosys-2.svg' },
    { name: 'Wipro', logo: 'https://cdn.worldvectorlogo.com/logos/wipro-1.svg' },
    { name: 'HCL', logo: 'https://cdn.worldvectorlogo.com/logos/hcl-2.svg' },
    { name: 'Tech Mahindra', logo: 'https://cdn.worldvectorlogo.com/logos/tech-mahindra.svg' },
    { name: 'Mindtree', logo: 'https://cdn.worldvectorlogo.com/logos/mindtree.svg' },
    { name: 'L&T Infotech', logo: 'https://cdn.worldvectorlogo.com/logos/larsen-toubro-infotech.svg' },
    { name: 'Mphasis', logo: 'https://cdn.worldvectorlogo.com/logos/mphasis.svg' },
    
    // Global Tech Giants
    { name: 'Microsoft', logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg' },
    { name: 'Google', logo: 'https://cdn.worldvectorlogo.com/logos/google-2015.svg' },
    { name: 'Amazon', logo: 'https://cdn.worldvectorlogo.com/logos/amazon-4.svg' },
    { name: 'Apple', logo: 'https://cdn.worldvectorlogo.com/logos/apple-14.svg' },
    { name: 'Meta', logo: 'https://cdn.worldvectorlogo.com/logos/meta-1.svg' },
    { name: 'Netflix', logo: 'https://cdn.worldvectorlogo.com/logos/netflix-3.svg' },
    { name: 'Spotify', logo: 'https://cdn.worldvectorlogo.com/logos/spotify-2.svg' },
    { name: 'Tesla', logo: 'https://cdn.worldvectorlogo.com/logos/tesla-9.svg' },
    { name: 'Uber', logo: 'https://cdn.worldvectorlogo.com/logos/uber-2.svg' },
    { name: 'Airbnb', logo: 'https://cdn.worldvectorlogo.com/logos/airbnb-2.svg' },
    
    // Enterprise & Cloud
    { name: 'Oracle', logo: 'https://cdn.worldvectorlogo.com/logos/oracle-6.svg' },
    { name: 'IBM', logo: 'https://cdn.worldvectorlogo.com/logos/ibm-3.svg' },
    { name: 'Salesforce', logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
    { name: 'SAP', logo: 'https://cdn.worldvectorlogo.com/logos/sap-3.svg' },
    { name: 'VMware', logo: 'https://cdn.worldvectorlogo.com/logos/vmware-2.svg' },
    { name: 'ServiceNow', logo: 'https://cdn.worldvectorlogo.com/logos/servicenow.svg' },
    
    // Hardware & Semiconductor
    { name: 'Intel', logo: 'https://cdn.worldvectorlogo.com/logos/intel-3.svg' },
    { name: 'AMD', logo: 'https://cdn.worldvectorlogo.com/logos/amd-logo-1.svg' },
    { name: 'NVIDIA', logo: 'https://cdn.worldvectorlogo.com/logos/nvidia.svg' },
    { name: 'Qualcomm', logo: 'https://cdn.worldvectorlogo.com/logos/qualcomm-2.svg' },
    { name: 'Cisco', logo: 'https://cdn.worldvectorlogo.com/logos/cisco-2.svg' },
    { name: 'Dell', logo: 'https://cdn.worldvectorlogo.com/logos/dell-2.svg' },
    { name: 'HP', logo: 'https://cdn.worldvectorlogo.com/logos/hp-3.svg' },
    { name: 'Lenovo', logo: 'https://cdn.worldvectorlogo.com/logos/lenovo-2.svg' },
    
    // Global Consulting
    { name: 'Accenture', logo: 'https://cdn.worldvectorlogo.com/logos/accenture.svg' },
    { name: 'Deloitte', logo: 'https://cdn.worldvectorlogo.com/logos/deloitte-1.svg' },
    { name: 'Capgemini', logo: 'https://cdn.worldvectorlogo.com/logos/capgemini-4.svg' },
    { name: 'Cognizant', logo: 'https://cdn.worldvectorlogo.com/logos/cognizant-2.svg' },
    { name: 'NTT Data', logo: 'https://cdn.worldvectorlogo.com/logos/ntt-data-2.svg' },
    { name: 'EY', logo: 'https://cdn.worldvectorlogo.com/logos/ey-1.svg' },
    { name: 'PwC', logo: 'https://cdn.worldvectorlogo.com/logos/pwc-2.svg' },
    { name: 'KPMG', logo: 'https://cdn.worldvectorlogo.com/logos/kpmg-1.svg' },
    
    // Financial Services
    { name: 'JPMorgan', logo: 'https://cdn.worldvectorlogo.com/logos/jp-morgan.svg' },
    { name: 'Goldman Sachs', logo: 'https://cdn.worldvectorlogo.com/logos/goldman-sachs-1.svg' },
    { name: 'Morgan Stanley', logo: 'https://cdn.worldvectorlogo.com/logos/morgan-stanley.svg' },
    { name: 'Mastercard', logo: 'https://cdn.worldvectorlogo.com/logos/mastercard-2.svg' },
    { name: 'Visa', logo: 'https://cdn.worldvectorlogo.com/logos/visa-10.svg' },
    { name: 'PayPal', logo: 'https://cdn.worldvectorlogo.com/logos/paypal-2.svg' },
    
    // E-commerce & Retail
    { name: 'Flipkart', logo: 'https://cdn.worldvectorlogo.com/logos/flipkart-1.svg' },
    { name: 'Paytm', logo: 'https://cdn.worldvectorlogo.com/logos/paytm-2.svg' },
    { name: 'Zomato', logo: 'https://cdn.worldvectorlogo.com/logos/zomato-1.svg' },
    { name: 'Swiggy', logo: 'https://cdn.worldvectorlogo.com/logos/swiggy-1.svg' },
    { name: 'Walmart', logo: 'https://cdn.worldvectorlogo.com/logos/walmart-1.svg' },
    
    // Electronics & Manufacturing
    { name: 'Samsung', logo: 'https://cdn.worldvectorlogo.com/logos/samsung-4.svg' },
    { name: 'LG', logo: 'https://cdn.worldvectorlogo.com/logos/lg-1.svg' },
    { name: 'Sony', logo: 'https://cdn.worldvectorlogo.com/logos/sony-2.svg' },
    { name: 'Panasonic', logo: 'https://cdn.worldvectorlogo.com/logos/panasonic-2.svg' },
    
    // Software & Tools
    { name: 'Adobe', logo: 'https://cdn.worldvectorlogo.com/logos/adobe-1.svg' },
    { name: 'Atlassian', logo: 'https://cdn.worldvectorlogo.com/logos/atlassian-1.svg' },
    { name: 'Slack', logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
    { name: 'Zoom', logo: 'https://cdn.worldvectorlogo.com/logos/zoom-communications-logo.svg' },
    { name: 'Dropbox', logo: 'https://cdn.worldvectorlogo.com/logos/dropbox-1.svg' },
    
    // Emerging Tech & Indian Startups
    { name: 'Razorpay', logo: 'https://cdn.worldvectorlogo.com/logos/razorpay-1.svg' },
    { name: 'Freshworks', logo: 'https://cdn.worldvectorlogo.com/logos/freshworks-1.svg' },
    { name: 'Zoho', logo: 'https://cdn.worldvectorlogo.com/logos/zoho.svg' },
    { name: 'BYJU\'S', logo: 'https://cdn.worldvectorlogo.com/logos/byjus.svg' },
    { name: 'Ola', logo: 'https://cdn.worldvectorlogo.com/logos/ola-2.svg' },
    
    // Additional Major Companies
    { name: 'Twitter', logo: 'https://cdn.worldvectorlogo.com/logos/twitter-6.svg' },
    { name: 'LinkedIn', logo: 'https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg' },
    { name: 'GitHub', logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg' },
    { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
    { name: 'Square', logo: 'https://cdn.worldvectorlogo.com/logos/square-1.svg' },
    { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
    { name: 'Twilio', logo: 'https://cdn.worldvectorlogo.com/logos/twilio-2.svg' },
    { name: 'MongoDB', logo: 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg' },
    { name: 'Redis', logo: 'https://cdn.worldvectorlogo.com/logos/redis.svg' },
    { name: 'Docker', logo: 'https://cdn.worldvectorlogo.com/logos/docker.svg' }
  ];

  // Split companies into two rows for continuous flow effect
  const firstRowCompanies = allCompanies.slice(0, Math.ceil(allCompanies.length / 2));
  const secondRowCompanies = allCompanies.slice(Math.ceil(allCompanies.length / 2));

  const heroRef = useRef<HTMLDivElement>(null);
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

  // Auto-rotate hero slides - increased interval for stability
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Increased to 6 seconds for better stability
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Auto-rotate topic slides on mobile - reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTopicSlide((prev) => (prev + 1) % popularTopics.length);
    }, 8000); // Increased to 8 seconds
    
    return () => clearInterval(interval);
  }, [popularTopics.length]);

  // Auto-rotate benefit slides on mobile - reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBenefitSlide((prev) => (prev + 1) % benefits.length);
    }, 9000); // Increased to 9 seconds
    
    return () => clearInterval(interval);
  }, [benefits.length]);

  // Auto-rotate placement events slider - reduced frequency
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventSlide((prev) => (prev + 1) % placementEvents.length);
    }, 10000); // Increased to 10 seconds for placement events
    
    return () => clearInterval(interval);
  }, [placementEvents.length]);

  // Animate sections on scroll - optimized with reduced threshold
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
      { 
        threshold: 0.1, // Reduced threshold for better performance
        rootMargin: '50px' // Added margin to trigger earlier
      }
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

  // Animated counter hook - optimized for better performance
  useEffect(() => {
    let hasAnimated = false;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated) {
          hasAnimated = true;
          // Start counter animation when section is visible
          const duration = 1500; // Reduced to 1.5 seconds
          const steps = 15; // Reduced steps for better performance
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
            
            if (step === steps) {
              clearInterval(timer);
              // Set final values to ensure accuracy
              setAnimatedCounters({
                students: 15000,
                companies: 130,
                successRate: 98
              });
            }
          }, interval);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
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
      {/* Hero Section - Enhanced with Old Website Styling */}
      <section className="relative overflow-hidden min-h-[100vh] sm:min-h-[90vh] flex items-center py-8 sm:py-12 lg:py-0">
        {/* Dynamic animated backgrounds based on slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {currentSlide === 0 && (
              <div className="absolute inset-0">
                <CodeBackgroundAnimation
                  speed="medium"
                  density="medium"
                  className="z-0 opacity-20"
                  characters="function(){}<>/\\;const let var return if else import export"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/30 via-transparent to-red-900/20"></div>
        </div>
            )}
            
            {currentSlide === 1 && (
              <div className="absolute inset-0">
                <NeuralNetworkAnimation
                  className="z-0 opacity-25"
                  colorScheme="purple"
                  layerCount={5}
                  nodesPerLayer={8}
                  activationEffect={true}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-blue-900/20"></div>
              </div>
            )}
            
            {currentSlide === 2 && (
              <div className="absolute inset-0">
                <NeuralNetworkAnimation
                  className="z-0 opacity-25"
                  colorScheme="multicolor"
                  layerCount={4}
                  nodesPerLayer={6}
                  activationEffect={true}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20"></div>
              </div>
            )}
            
            {currentSlide === 3 && (
              <div className="absolute inset-0">
                <CircuitPatternAnimation
                  className="z-0 opacity-25"
                  color="blue"
                  density="medium"
                  animationSpeed="slow"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-cyan-900/20"></div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Ambient lighting effects */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          {/* Top light */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-1/3 rounded-full bg-gradient-to-b from-indigo-500/20 to-transparent blur-3xl"></div>
          
          {/* Side lights - dynamic based on current slide */}
          <motion.div 
            className={`absolute -left-20 top-1/3 w-60 h-60 rounded-full blur-3xl`}
            animate={{
              background: [
                `radial-gradient(circle, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0) 70%)`,
                `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
                `radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0) 70%)`,
                `radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(99, 102, 241, 0) 70%)`
              ][currentSlide]
            }}
            transition={{ duration: 1 }}
          ></motion.div>
          
          <motion.div 
            className={`absolute -right-20 top-2/3 w-60 h-60 rounded-full blur-3xl`}
            animate={{
              background: [
                `radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, rgba(234, 88, 12, 0) 70%)`,
                `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
                `radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, rgba(236, 72, 153, 0) 70%)`,
                `radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0) 70%)`
              ][currentSlide]
            }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
        
        {/* Moving grid pattern overlay */}
        <div 
          className="absolute inset-0 z-1 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), 
                              linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
        
        {/* Floating particles overlay */}
        <ParticleBackground
          particleCount={40}
          colorScheme="multicolor"
          speed={[0.2, 0.4]}
          className="z-0 opacity-40"
        />
        
        {/* Hero content with 3D effects */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
            {/* Text content with animations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentSlide}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  {/* Job-Oriented Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="inline-block mb-4 sm:mb-6"
                  >
                    <div className={`inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-r from-indigo-900/80 to-purple-900/80 text-indigo-300 border border-indigo-700/50 backdrop-blur-sm'
                          : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200 backdrop-blur-sm'
                    } shadow-lg`}>
                      <span className="mr-1.5 sm:mr-2 text-sm sm:text-lg">🎯</span>
                      Job - Oriented Courses
                      <div className="ml-1.5 sm:ml-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full" />
                    </div>
                  </motion.div>

                  {/* Dynamic title with advanced text reveal animation */}
                  <HeroGradientText
                    text={heroSlides[currentSlide].title}
                    gradientColors={heroSlides[currentSlide].color}
                    animationType="reveal"
                    duration={0.5}
                    className="mb-3 sm:mb-4 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  />
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 leading-relaxed ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                      {heroSlides[currentSlide].subtitle}
                  </motion.p>
                  
                  {/* Slide-specific stats with animated counters */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
                  >
                    {Object.entries(heroSlides[currentSlide].stats).map(([key, value], i) => (
                      <GlassCard
                        key={key}
                        className="py-2 sm:py-3 px-2 sm:px-4"
                        blur="sm"
                        opacity={60}
                        variant="elevated"
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                          className="text-center"
                        >
                          <div className={`text-sm sm:text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${heroSlides[currentSlide].color}`}>
                            {value}
                  </div>
                          <div className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            {key === 'students' ? 'Students Trained' : 
                             key === 'experience' ? 'Experience' : 
                             key === 'placement' ? 'Placement Rate' :
                             key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                        </motion.div>
                      </GlassCard>
                    ))}
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                  >
                  <Link
                    to="/courses"
                      className={`group relative flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700'
                        : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700'
                      } text-white font-bold text-base sm:text-lg transform transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-105`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2 sm:mr-3 text-lg sm:text-xl">🚀</span>
                      {heroSlides[currentSlide].cta}
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2 sm:ml-3 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link
                    to={`/courses/${heroSlides[currentSlide].slug}`}
                      className={`flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 ${
                      theme === 'dark'
                        ? 'border-slate-600 text-white hover:bg-slate-800/50 hover:border-slate-500'
                        : 'border-slate-400 text-slate-700 hover:bg-slate-50 hover:border-slate-500'
                      } font-bold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm transform hover:scale-105`}
                  >
                    <span className="mr-1.5 sm:mr-2 text-base sm:text-lg">📚</span>
                    Learn More
                  </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* 3D image with parallax effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full lg:w-1/2 mt-8 lg:mt-0"
            >
              <div className="relative perspective-1200">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${currentSlide}`}
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-video shadow-2xl transform-gpu">
                      <img 
                        src={heroSlides[currentSlide].image} 
                        alt={heroSlides[currentSlide].title}
                        className="w-full h-full object-cover object-center"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          e.currentTarget.src = "https://placehold.co/600x400?text=Course";
                        }}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr ${heroSlides[currentSlide].color} opacity-30`}></div>
                      
                      {/* Floating badges */}
                                              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 animate-float">
                          <GlassCard
                            className="py-1.5 px-2 sm:py-2 sm:px-4"
                            blur="md"
                            opacity={70}
                            variant="elevated"
                          >
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-yellow-500 text-sm sm:text-lg">★★★★★</span>
                            <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                              4.9/5
                            </span>
                      </div>
                        </GlassCard>
                </div>
                
                      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 animate-float animation-delay-2000">
                        <GlassCard
                          className="py-1.5 px-2 sm:py-2 sm:px-4"
                          blur="md"
                          opacity={70}
                          variant="elevated"
                        >
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'} font-semibold`}>
                              #1 Rated
                      </span>
                    </div>
                        </GlassCard>
                </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
              </div>
            </div>
            
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 hidden sm:block"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={`w-6 h-10 rounded-full border-2 ${
            theme === 'dark' ? 'border-slate-400' : 'border-slate-500'
          } flex justify-center`}>
            <motion.div 
              className={`w-1.5 h-1.5 rounded-full ${
                theme === 'dark' ? 'bg-slate-400' : 'bg-slate-500'
              } mt-2`}
              animate={{ 
                y: [0, 16, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
                  </div>
        </motion.div>
                
        {/* Slide Navigation Dots */}
        <div className="absolute bottom-12 sm:bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? `bg-gradient-to-r ${heroSlides[currentSlide].color} scale-125`
                  : theme === 'dark'
                    ? 'bg-slate-600 hover:bg-slate-500'
                    : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Popular Courses Section with Placement Page Styling */}
      <section 
        ref={coursesSectionRef}
        className={`py-24 relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900' 
            : 'bg-gradient-to-br from-slate-50 via-white to-indigo-50'
        }`}
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 z-0">
          {/* Animated floating elements */}
          {['🎓', '💻', '🚀', '⭐', '🎯', '💡', '🔥', '⚡'].map((icon, i) => (
            <motion.div
              key={i}
              className={`absolute text-3xl ${
                theme === 'dark' 
                  ? 'text-indigo-400/30' 
                  : 'text-indigo-600/40'
              }`}
              style={{
                left: `${15 + (i * 10)}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.div>
          ))}
          
          {/* Placement page style gradient orbs */}
          <motion.div 
            className={`absolute top-20 right-20 w-96 h-96 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20' 
                : 'bg-gradient-to-br from-indigo-500/15 to-purple-500/15'
            } blur-3xl`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute bottom-20 left-20 w-80 h-80 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20' 
                : 'bg-gradient-to-br from-purple-500/15 to-pink-500/15'
            } blur-3xl`}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header with Placement Page Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            {/* Glass Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="inline-block mb-6"
            >
              <div className={`relative px-6 py-3 rounded-full text-sm font-bold ${
                theme === 'dark' 
                  ? 'bg-white/10 text-indigo-300 border border-white/20'
                  : 'bg-white/60 text-indigo-700 border border-white/40'
              } backdrop-blur-xl shadow-2xl overflow-hidden group`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-lg">🎓</span>
                  Popular Courses
                  <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </span>
              </div>
            </motion.div>
            
            {/* Enhanced Title */}
            <motion.h2 
              className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight ${
                theme === 'dark'
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-300 to-purple-300'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-700 to-purple-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Transform Your Career
            </motion.h2>
            
            {/* Enhanced Subtitle */}
            <motion.p 
              className={`text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Join thousands of successful students who landed their dream jobs with our industry-focused courses
            </motion.p>
          </motion.div>

          {/* Enhanced Course Grid with Placement Page Styling - Desktop */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.slice(0, 6).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.15,
                    duration: 0.7,
                    ease: "easeOut"
                  }
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 25
                  }
                }}
                onClick={() => handleCourseClick(course.id)}
                className={`relative group cursor-pointer ${
                        theme === 'dark'
                    ? 'bg-white/5 backdrop-blur-xl border border-white/10'
                    : 'bg-white/70 backdrop-blur-xl border border-white/30'
                } rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500`}
              >
                {/* Glass Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = "https://placehold.co/400x300?text=Course";
                    }}
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                            {course.price}
                          </div>
                        </div>
                        
                  {/* Level Badge */}
                  <div className="absolute top-4 left-4 z-20">
                          <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' 
                        ? 'bg-green-500/90 text-white'
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-500/90 text-white'
                        : 'bg-red-500/90 text-white'
                    } backdrop-blur-sm shadow-lg`}>
                      {course.level}
                          </div>
                        </div>
                      </div>
                      
                {/* Course Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                          {course.title}
                  </h3>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className={`text-sm ml-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                          {course.rating}
                          </span>
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {course.students} students
                      </div>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {course.duration}
                    </div>
                        </div>
                        
                  {/* CTA Button */}
                  <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                    } shadow-lg hover:shadow-xl`}
                  >
                    Enroll Now
                  </motion.button>
                      </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
                <motion.div 
                className="flex transition-transform duration-300 ease-in-out"
                animate={{ x: `-${currentCourseSlide * 100}%` }}
              >
                {popularCourses.slice(0, 6).map((course, index) => (
                  <div key={course.id} className="w-full flex-shrink-0 px-4">
                    <motion.div
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: {
                          delay: index * 0.15,
                          duration: 0.7,
                          ease: "easeOut"
                        }
                      }}
                      viewport={{ once: true, margin: "-50px" }}
                      onClick={() => handleCourseClick(course.id)}
                      className={`relative group cursor-pointer ${
                        theme === 'dark'
                          ? 'bg-white/5 backdrop-blur-xl border border-white/10'
                          : 'bg-white/70 backdrop-blur-xl border border-white/30'
                      } rounded-2xl overflow-hidden shadow-2xl transition-all duration-500`}
                    >
                      {/* Glass Card Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Course Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            e.currentTarget.src = "https://placehold.co/400x300?text=Course";
                          }}
                        />
                        
                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <div className="px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                            {course.price}
              </div>
            </div>

                        {/* Level Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            course.level === 'Beginner' 
                              ? 'bg-green-500/90 text-white'
                              : course.level === 'Intermediate'
                              ? 'bg-yellow-500/90 text-white'
                              : 'bg-red-500/90 text-white'
                          } backdrop-blur-sm shadow-lg`}>
                            {course.level}
                          </div>
                        </div>
                      </div>
                      
                      {/* Course Content */}
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>
                          {course.title}
                        </h3>
                        
                        {/* Stats Row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <span className="text-yellow-500 text-sm">★</span>
                              <span className={`text-sm ml-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                                {course.rating}
                              </span>
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                              {course.students} students
                            </div>
                          </div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                            {course.duration}
                          </div>
                        </div>
                        
                        {/* CTA Button */}
              <motion.button 
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                  theme === 'dark'
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
                              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                          } shadow-lg hover:shadow-xl`}
                        >
                          Enroll Now
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Mobile Slider Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => handleCourseSlideChange('prev')}
                className={`p-3 rounded-full ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
                } shadow-lg transition-all duration-300 disabled:opacity-50`}
                disabled={currentCourseSlide === 0}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Slide Indicators */}
              <div className="flex space-x-2">
                {popularCourses.slice(0, 6).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCourseSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentCourseSlide === index
                        ? 'bg-indigo-600 w-6'
                        : theme === 'dark'
                        ? 'bg-slate-600'
                        : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => handleCourseSlideChange('next')}
                className={`p-3 rounded-full ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-600'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200'
                } shadow-lg transition-all duration-300 disabled:opacity-50`}
                disabled={currentCourseSlide === popularCourses.slice(0, 6).length - 1}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
            {popularCourses.slice(0, 6).map((course, index) => (
              <motion.div
                key={course.id}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                    delay: index * 0.15,
                        duration: 0.7,
                        ease: "easeOut"
                      }
                    }}
                viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ 
                  y: -10,
                  scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                onClick={() => handleCourseClick(course.id)}
                className={`relative group cursor-pointer ${
                      theme === 'dark'
                    ? 'bg-white/5 backdrop-blur-xl border border-white/10'
                    : 'bg-white/70 backdrop-blur-xl border border-white/30'
                } rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500`}
              >
                {/* Glass Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <img 
                        src={course.image} 
                        alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      e.currentTarget.src = "https://placehold.co/400x300?text=Course";
                    }}
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                          {course.price}
                        </div>
                      </div>
                      
                  {/* Level Badge */}
                  <div className="absolute top-4 left-4 z-20">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' 
                        ? 'bg-green-500/90 text-white'
                        : course.level === 'Intermediate'
                        ? 'bg-yellow-500/90 text-white'
                        : 'bg-red-500/90 text-white'
                    } backdrop-blur-sm shadow-lg`}>
                      {course.level}
                        </div>
                      </div>
                    </div>
                    
                {/* Course Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                        {course.title}
                  </h3>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className={`text-sm ml-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                          {course.rating}
                        </span>
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {course.students} students
                    </div>
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {course.duration}
                    </div>
            </div>
          
                  {/* CTA Button */}
            <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                theme === 'dark'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                    } shadow-lg hover:shadow-xl`}
                  >
                    Enroll Now
            </motion.button>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
          
          {/* View All Courses Button */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mt-16"
            >
              <Link 
                to="/courses" 
              className={`inline-flex items-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  theme === 'dark'
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-600'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800'
              } text-white shadow-2xl hover:shadow-3xl hover:scale-105 transform`}
            >
              <span className="mr-3">🚀</span>
              Explore All Courses
              <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              </Link>
          </motion.div>
        </div>
      </section>

      {/* Combined Mentor & Demo Class Section */}
      <section 
        id="mentor-demo-section"
        className={`py-20 relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900' 
            : 'bg-gradient-to-br from-slate-50 via-white to-indigo-50'
        }`}
      >
        {/* Enhanced Background Effects - Learning & Teaching Animation */}
        <div className="absolute inset-0 z-0">
          {/* Animated floating education symbols */}
          {['📚', '🎓', '👨‍🏫', '💡', '🧠', '📖', '✏️', '🔬'].map((symbol, i) => (
            <motion.div
              key={i}
              className={`absolute text-2xl ${
                theme === 'dark' ? 'opacity-25' : 'opacity-40'
              }`}
              style={{
                left: `${8 + (i * 12)}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            >
              {symbol}
            </motion.div>
          ))}
          
          {/* Animated gradient orbs - more visible */}
          <motion.div 
            className={`absolute top-20 right-20 w-96 h-96 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30' 
                : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
            } blur-3xl`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute bottom-20 left-20 w-80 h-80 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30' 
                : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
            } blur-3xl`}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.7, 0.4, 0.7],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Enhanced grid pattern */}
          <div className={`absolute inset-0 ${
            theme === 'dark' ? 'opacity-10 bg-white' : 'opacity-15 bg-slate-900'
          }`} 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Animated knowledge flow lines */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-px ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-indigo-600/60 to-transparent'
              }`}
              style={{
                left: '15%',
                right: '15%',
                top: `${20 + i * 20}%`,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Coding-themed background - more visible */}
          <GeometricCodePattern
            className={`z-0 ${theme === 'dark' ? 'opacity-15' : 'opacity-20'}`}
            colorScheme="blue"
            density="low"
            codeElements={true}
          />
          
          {/* Floating learning quotes */}
          {['"Learn"', '"Code"', '"Grow"', '"Succeed"'].map((quote, i) => (
            <motion.div
              key={i}
              className={`absolute text-lg font-bold ${
                theme === 'dark' ? 'text-indigo-400/30' : 'text-indigo-600/50'
              }`}
              style={{
                left: `${25 + i * 15}%`,
                top: `${25 + Math.random() * 50}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut"
              }}
            >
              {quote}
            </motion.div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">


          {/* Main Content - Side by Side Layout */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Left Side - Mentor Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Mentor Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mb-8 text-center"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
                    className="inline-block mb-4"
                  >
                    <div className={`relative px-6 py-2 rounded-full text-sm font-bold ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 text-indigo-300 border border-indigo-700/50'
                        : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200'
                    } backdrop-blur-sm shadow-lg overflow-hidden group`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10 flex items-center">
                        <span className="mr-2">👨‍🏫</span>
                        Meet Your Expert Mentor
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className={`text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight text-center ${
                      theme === 'dark'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Our Mentor
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-base max-w-xl leading-relaxed font-medium text-center mx-auto ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Get personalized guidance from our seasoned mentor with 
                    <span className={`${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    } font-bold`}> 25+ years of expertise</span> in programming and technology.
                  </motion.p>
                </motion.div>

                {/* Mentor Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`${
                    theme === 'dark' 
                      ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                      : 'bg-white/90 backdrop-blur-xl border border-slate-200/50'
                  } rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden`}
                >
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                  {/* Mentor Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-center mb-8"
                  >
                    <div className="relative w-64 h-64 mx-auto mb-8">
                      {/* Enhanced outer glow rings */}
                      <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 opacity-20 blur-2xl animate-pulse"></div>
                      <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-30 blur-xl animate-pulse delay-1000"></div>
                      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-lg animate-pulse delay-2000"></div>
                      
                      {/* Main photo */}
                      <div className="relative w-64 h-64 rounded-full overflow-hidden border-6 border-white dark:border-slate-700 shadow-2xl">
                        <img 
                          src="https://www.osop.in/test/images/sir.jfif"
                          alt="Dr. Dharmendra Bajpai Sir - Founder & Owner of OSOP Coding, Java Expert & Mentor"
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      {/* Enhanced floating badge */}
                      <div className={`absolute -bottom-3 -right-3 ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      } rounded-full p-3 shadow-xl animate-bounce`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      Dr. Dharmendra Bajpai Sir
                    </h3>
                    
                    <div className={`text-lg font-medium mb-4 ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      Founder & Owner, OSOP Coding
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-indigo-900/50 text-indigo-300 border border-indigo-800/50'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}>
                        PhD in Computer Science
                      </span>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-purple-900/50 text-purple-300 border border-purple-800/50'
                          : 'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        Java Expert
                      </span>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-800/50'
                          : 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                      }`}>
                        25+ Years Experience
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Quote */}
                  <motion.blockquote 
                    className={`text-lg font-medium mb-8 italic text-center ${
                      theme === 'dark' 
                        ? 'text-indigo-400' 
                        : 'text-indigo-600'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    "Excellence in Teaching, Excellence in Learning"
                  </motion.blockquote>
                  
                  {/* Key Points */}
                  <div className="space-y-4 mb-6">
                    {[
                      {
                        icon: '🎯',
                        title: '25+ Years Experience',
                        desc: 'Rich professional teaching experience in technology education'
                      },
                      {
                        icon: '👥',
                        title: '25,000+ Students Trained',
                        desc: 'Successfully trained IT engineers placed in top tech companies'
                      }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                        className={`flex items-start p-3 rounded-xl ${
                          theme === 'dark' 
                            ? 'bg-slate-700/30 border border-slate-600/30' 
                            : 'bg-slate-50/50 border border-slate-200/50'
                        } backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
                      >
                        <div className="text-xl mr-3 mt-1">{item.icon}</div>
                        <div>
                          <h4 className={`font-semibold mb-1 text-sm ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            {item.title}
                          </h4>
                          <p className={`text-xs ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  

                </div>
                </motion.div>
              </motion.div>
              
              {/* Right Side - Demo Class Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                {/* Demo Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mb-8 text-center"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
                    className="inline-block mb-4"
                  >
                    <div className={`relative px-6 py-2 rounded-full text-sm font-bold ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/60 text-purple-300 border border-purple-700/50'
                        : 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 border border-purple-200'
                    } backdrop-blur-sm shadow-lg overflow-hidden group`}>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10 flex items-center">
                        <span className="mr-2">🚀</span>
                        Start Your Journey Today
                      </span>
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className={`text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight text-center ${
                      theme === 'dark'
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400'
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-700 to-cyan-700'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Free Demo
                  </motion.h3>
                  
                  <motion.p 
                    className={`text-base max-w-xl leading-relaxed font-medium text-center mx-auto ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                    }`}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Book your 
                    <span className={`${
                      theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                    } font-bold`}> FREE interactive demo session</span> and discover our proven teaching methodology.
                  </motion.p>
                </motion.div>

                {/* Demo Form Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className={`${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/60 backdrop-blur-xl border border-slate-700/50'
                      : 'bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl border border-slate-200/50'
                  } rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden`}
                >
                  {/* Enhanced form background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl"></div>
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10">
                    {/* Form Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-center mb-8"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                        className="inline-block mb-6"
                      >
                        <div className={`w-20 h-20 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600' 
                            : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'
                        } flex items-center justify-center text-white text-3xl shadow-2xl animate-pulse`}>
                          🎓
                        </div>
                      </motion.div>
                      
                      <h4 className={`text-2xl md:text-3xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        Book Your Free Demo Class
                      </h4>
                      
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          theme === 'dark' ? 'text-red-400 bg-red-900/30' : 'text-red-600 bg-red-50'
                        } animate-pulse`}>
                          🔥 Limited Seats Available
                        </span>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          theme === 'dark' ? 'text-green-400 bg-green-900/30' : 'text-green-600 bg-green-50'
                        }`}>
                          ✅ 100% Free
                        </span>
                      </div>
                      
                      <p className={`text-base mb-2 ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        Experience our teaching methodology firsthand
                      </p>
                    </motion.div>
                
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
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          required
                          placeholder="Your Name"
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
                          Enter Email
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            placeholder="Your Email"
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
                          Mobile/WhatsApp
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            required
                            placeholder="Your Phone"
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
                        Course you interesed in
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
                          <option value="" disabled>Select Program</option>
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
                    

                    
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                        theme === 'dark'
                          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-indigo-700/30'
                          : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-indigo-700/30'
                      } relative overflow-hidden group`}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Book Free Demo Class
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </motion.button>
                
                    {/* Footer Links */}
                    <div className="text-center mt-6 space-y-3">
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        Already have an account?{' '}
                        <a 
                          href="/login" 
                          className={`font-medium ${
                            theme === 'dark' 
                              ? 'text-indigo-400 hover:text-indigo-300' 
                              : 'text-indigo-600 hover:text-indigo-700'
                          } transition-colors duration-200`}
                        >
                          Click here
                        </a>
                      </p>
                      <p className={`text-xs leading-relaxed ${
                        theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        By creating an account I have read and agree to{' '}
                        <a 
                          href="/terms" 
                          className={`${
                            theme === 'dark' 
                              ? 'text-indigo-400 hover:text-indigo-300' 
                              : 'text-indigo-600 hover:text-indigo-700'
                          } transition-colors duration-200`}
                        >
                          Terms
                        </a>{' '}
                        and{' '}
                        <a 
                          href="/privacy" 
                          className={`${
                            theme === 'dark' 
                              ? 'text-indigo-400 hover:text-indigo-300' 
                              : 'text-indigo-600 hover:text-indigo-700'
                          } transition-colors duration-200`}
                        >
                          Privacy Policy
                        </a>.
                      </p>
                    </div>

                    {/* Enhanced Success Message */}
                    <AnimatePresence>
                      {showSuccessMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                          className={`p-4 rounded-xl ${
                            theme === 'dark'
                              ? 'bg-green-900/30 border border-green-700/50 text-green-300'
                              : 'bg-green-50 border border-green-200 text-green-800'
                          } backdrop-blur-sm`}
                        >
                          <div className="flex items-center">
                            <motion.svg 
                              className="w-6 h-6 mr-3 text-green-500" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring" }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </motion.svg>
                            <div>
                              <div className="font-bold">Demo Class Booked Successfully! 🎉</div>
                              <div className="text-sm mt-1">Our team will contact you within 2 hours to schedule your personalized demo session with Dr. Bajpai Sir.</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        id="benefits-section"
        className={`py-24 relative overflow-hidden ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950' 
            : 'bg-gradient-to-br from-slate-50 via-white to-indigo-50'
        }`}
      >
        {/* Enhanced Background decorations - Benefits Showcase Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated floating benefit icons */}
          {['🎯', '⚡', '🚀', '💪', '🏆', '✨', '🔥', '💎'].map((icon, i) => (
            <motion.div
              key={i}
              className={`absolute text-3xl ${
                theme === 'dark' ? 'opacity-30' : 'opacity-50'
              }`}
              style={{
                left: `${5 + (i * 12)}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.div>
          ))}
          
          <CircuitPatternAnimation
            className={`z-0 ${theme === 'dark' ? 'opacity-15' : 'opacity-20'}`}
            color={theme === 'dark' ? '#4F46E5' : '#4F46E5'}
            density="medium"
            animationSpeed="slow"
          />
          
          {/* Multiple decorative elements - more visible */}
          <motion.div 
            className={`absolute -top-40 -right-40 w-96 h-96 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-indigo-500/30 to-purple-500/30' 
                : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
            } blur-3xl`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30' 
                : 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
            } blur-3xl`}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.7, 0.4, 0.7],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20' 
                : 'bg-gradient-to-br from-cyan-500/15 to-blue-500/15'
            } blur-3xl`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.8, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Enhanced grid pattern */}
          <div className={`absolute inset-0 ${
            theme === 'dark' ? 'opacity-10 bg-white' : 'opacity-15 bg-slate-900'
          }`} 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 2px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
          
          {/* Floating particles - more visible */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 rounded-full ${
                  theme === 'dark' ? 'bg-indigo-400/30' : 'bg-indigo-600/50'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
          
          {/* Animated advantage keywords */}
          {['Expert', 'Quality', 'Results', 'Success'].map((word, i) => (
            <motion.div
              key={i}
              className={`absolute text-xl font-bold ${
                theme === 'dark' ? 'text-indigo-400/25' : 'text-indigo-600/40'
              }`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.25, 0.6, 0.25],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            >
              {word}
            </motion.div>
          ))}
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
              <span className={`px-6 py-2 rounded-full text-sm font-bold ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-indigo-900/60 to-purple-900/60 text-indigo-300 border border-indigo-700/50'
                  : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200'
              } backdrop-blur-sm shadow-lg`}>
                <span className="mr-2">🎯</span>
                Why OSOP Coding
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-4">
                <span className={`text-3xl md:text-5xl lg:text-6xl font-black ${
                  theme === 'dark'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700'
                }`}>
                  Why
                </span>
                
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Outer glow effect */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl"></div>
                  
                  {/* Logo container */}
                  <div className={`relative bg-gradient-to-br ${
                    theme === 'dark' 
                      ? 'from-slate-800/80 to-slate-700/60' 
                      : 'from-slate-800/90 to-slate-700/80'
                  } backdrop-blur-xl border ${
                    theme === 'dark' ? 'border-slate-600/50' : 'border-slate-600/40'
                  } rounded-2xl p-4 shadow-2xl`}>
                    <img 
                      src={osopLogo} 
                      alt="OSOP Coding Logo" 
                      className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-300"
                    />
                  </div>
                </motion.div>
                
                <span className={`text-3xl md:text-5xl lg:text-6xl font-black ${
                  theme === 'dark'
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400'
                    : 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700'
                }`}>
                  ?
                </span>
              </div>
            </motion.div>
            
            <p className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Discover the unique advantages that make 
              <span className={`${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              } font-bold`}> OSOP Coding the #1 choice</span> for thousands of aspiring programmers
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
                          : 'bg-white shadow-xl shadow-slate-300/40 border border-slate-300/60'
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
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {benefit.title}
                      </h3>
                      
                      <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-700 font-medium'} text-center mb-2`}>
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
                    : 'bg-white text-slate-900 hover:bg-indigo-600 hover:text-white border border-slate-400 shadow-lg'
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
                    : 'bg-white text-slate-900 hover:bg-indigo-600 hover:text-white border border-slate-400 shadow-lg'
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
          
          {/* Enhanced Desktop Grid View (hidden on mobile) */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6, 
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.3, type: "spring" } 
                }}
                className={`${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-700/40 backdrop-blur-xl border border-slate-600/50 hover:border-slate-500/70'
                    : 'bg-gradient-to-br from-white via-slate-50/80 to-white backdrop-blur-xl border border-slate-300/60 hover:border-slate-400/80 shadow-xl'
                } p-6 lg:p-8 rounded-2xl relative overflow-hidden group cursor-pointer transform-gpu perspective-1000`}
                style={{
                  boxShadow: theme === 'dark' 
                    ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                    : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Dynamic background glow that responds to hover */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-all duration-500 ${benefit.color}`}
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <motion.div 
                      className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    />
                  </div>
                </div>
                
                {/* Enhanced Benefit Icon with multiple effects */}
                <div className="relative mb-6 flex justify-center">
                  {/* Outer glow ring */}
                  <motion.div 
                    className={`absolute w-20 h-20 rounded-full bg-gradient-to-r ${benefit.color} opacity-20 blur-xl`}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Main icon container */}
                  <motion.div 
                    className={`relative w-18 h-18 rounded-2xl flex items-center justify-center text-3xl text-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-br ${benefit.color} z-10 shadow-2xl`}
                    whileHover={{ 
                      boxShadow: `0 20px 40px -10px rgba(99, 102, 241, 0.4)`,
                    }}
                  >
                    <motion.span
                      animate={{ 
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {benefit.icon}
                    </motion.span>
                  </motion.div>
                  
                  {/* Shadow effect */}
                  <div 
                    className="absolute w-18 h-18 rounded-2xl top-3 left-3 bg-gradient-to-r from-black/30 to-black/10 blur-lg z-0"
                  />
                </div>
                
                {/* Enhanced title with gradient effect */}
                <motion.h3 
                  className={`text-lg lg:text-xl font-bold mb-4 text-center group-hover:translate-y-[-2px] transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white group-hover:from-indigo-300 group-hover:via-purple-300 group-hover:to-indigo-300' 
                      : 'text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-700 group-hover:via-purple-700 group-hover:to-indigo-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {benefit.title}
                </motion.h3>
                
                {/* Enhanced description */}
                <motion.p 
                  className={`text-sm lg:text-base leading-relaxed text-center ${
                    theme === 'dark' ? 'text-slate-300 group-hover:text-slate-200' : 'text-slate-700 group-hover:text-slate-800 font-medium'
                  } transition-colors duration-300`}
                  whileHover={{ scale: 1.02 }}
                >
                  {benefit.description}
                </motion.p>
                
                {/* Bottom accent line */}
                <motion.div 
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r ${benefit.color} rounded-t-full transition-all duration-300 opacity-0 group-hover:opacity-100`}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '0%' }}
                  whileHover={{ width: '60%' }}
                />
                
                {/* Corner decoration */}
                <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-br ${benefit.color} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
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
        {/* Enhanced Background - Video Play Symbols Animation */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10' 
              : 'bg-gradient-to-br from-green-500/15 to-emerald-500/15'
          }`}></div>
          
          {/* Animated floating video/play symbols */}
          {['▶', '⏸', '⏯', '⏭', '⏮', '🎬', '🎥', '📹'].map((symbol, i) => (
            <motion.div
              key={i}
              className={`absolute text-3xl ${
                theme === 'dark' ? 'text-green-400/30' : 'text-green-600/50'
              }`}
              style={{
                left: `${5 + (i * 11)}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              {symbol}
            </motion.div>
          ))}
          
          {/* Animated floating bubbles - more visible */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${
                theme === 'dark' ? 'bg-green-400/20' : 'bg-green-500/30'
              }`}
              style={{
                width: `${30 + Math.random() * 50}px`,
                height: `${30 + Math.random() * 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 30 - 15, 0],
                scale: [1, 1.4, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Animated wave patterns - more visible */}
          <motion.div 
            className={`absolute top-0 left-0 w-full h-full ${
              theme === 'dark' ? 'opacity-15' : 'opacity-20'
            }`}
            style={{
              background: `radial-gradient(circle at 20% 50%, ${theme === 'dark' ? '#10B981' : '#059669'} 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Animated gradient orbs */}
          <motion.div 
            className={`absolute top-10 right-10 w-80 h-80 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-green-500/25 to-emerald-500/25' 
                : 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
            } blur-3xl`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.9, 0.6],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute bottom-10 left-10 w-72 h-72 rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-emerald-500/25 to-teal-500/25' 
                : 'bg-gradient-to-br from-emerald-500/20 to-teal-500/20'
            } blur-3xl`}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.7, 0.4, 0.7],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
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
              className="inline-block mb-3"
            >
              <span className={`px-6 py-2 rounded-full text-sm font-bold ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-green-900/60 to-emerald-900/60 text-green-300 border border-green-700/50'
                  : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200'
              } backdrop-blur-sm shadow-lg`}>
                <span className="mr-2">⭐</span>
                Success Stories
              </span>
            </motion.div>
            
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-teal-700'
            }`}>
              Real Feedback
            </h2>
            
            <p className={`text-xl md:text-2xl max-w-5xl mx-auto leading-relaxed font-medium ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              How 
              <span className={`${
                theme === 'dark' ? 'text-green-400' : 'text-green-600'
              } font-bold`}> OSOP Coding</span> Helped Students in Cracking their 
              <span className={`${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              } font-bold`}> Dream IT MNC</span>.
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
                  const testimonial = testimonials[currentTestimonialSlide];
                  
                  return (
                    <motion.div
                      className={`${
                        theme === 'dark'
                          ? 'bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-700/50 backdrop-blur-xl border border-slate-600/50'
                          : 'bg-gradient-to-br from-white/95 via-white/85 to-green-50/30 backdrop-blur-xl border border-slate-200/50'
                      } rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 mx-auto max-w-sm relative overflow-hidden group`}
                      onClick={() => openVideoModal(testimonial.video)}
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Video Thumbnail */}
                      <div className="relative mb-4">
                        <div className="w-full aspect-video rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                          <img 
                            src={`https://img.youtube.com/vi/${testimonial.video.split('/').pop()}/maxresdefault.jpg`}
                            alt={`${testimonial.name} testimonial thumbnail`}
                            className="w-full h-full object-cover"
                          />
                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                            <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                              <svg className="w-8 h-8 ml-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Student Info */}
                      <div className="text-center">
                        <h3 className={`font-bold text-lg mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          {testimonial.name}
                        </h3>
                        
                        {/* Company Name */}
                        <p className={`text-sm font-semibold mb-3 ${
                          theme === 'dark' ? 'text-green-400' : 'text-green-600'
                        }`}>
                          {testimonial.company}
                        </p>
                        
                        {/* Click instruction */}
                        <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                          theme === 'dark' 
                            ? 'bg-green-900/60 text-green-300' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          Click to watch video
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
          
          {/* Enhanced Desktop Grid View - Real Student Testimonials */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-700/50 backdrop-blur-xl border border-slate-600/50 hover:border-green-500/50'
                    : 'bg-gradient-to-br from-white/95 via-white/85 to-green-50/30 backdrop-blur-xl border border-slate-200/50 hover:border-green-400/50'
                } rounded-2xl p-6 cursor-pointer hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                onClick={() => openVideoModal(testimonial.video)}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Video Thumbnail */}
                <div className="relative mb-4">
                  <div className="w-full aspect-video rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <img 
                      src={`https://img.youtube.com/vi/${testimonial.video.split('/').pop()}/maxresdefault.jpg`}
                      alt={`${testimonial.name} testimonial thumbnail`}
                      className="w-full h-full object-cover"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-300">
                      <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Student Info */}
                <div className="text-center">
                  <h3 className={`font-bold text-lg mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {testimonial.name}
                  </h3>
                  
                  {/* Company Name */}
                  <p className={`text-sm font-semibold mb-3 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {testimonial.company}
                  </p>
                  
                  {/* Click instruction */}
                  <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                    theme === 'dark' 
                      ? 'bg-green-900/60 text-green-300' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    Click to watch video
                  </div>
                </div>
              </motion.div>
            ))}
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
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
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
              Past Placement Drives
            </h2>
            
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              First Institute in Central India pioneering OnCampus Placement Drives with leading MNCs
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
                <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
                  {/* Left column: Event details */}
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="p-6 md:p-8 lg:p-12 flex flex-col justify-center"
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
                  
                  {/* Right column: Optimized image container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="relative h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
                  >
                    <div className="absolute inset-0 rounded-r-2xl overflow-hidden">
                      <img 
                        src={placementEvents[currentEventSlide].image} 
                        alt={placementEvents[currentEventSlide].title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center center'
                        }}
                        onLoad={(e) => {
                          // Ensure image loads properly and maintains aspect ratio
                          const img = e.target as HTMLImageElement;
                          img.style.opacity = '1';
                        }}
                        onError={(e) => {
                          // Fallback for broken images
                          const img = e.target as HTMLImageElement;
                          img.src = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Enhanced overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    </div>
                    
                    {/* Company emblem/watermark - Enhanced */}
                    <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                      <div className="w-14 h-14 rounded-xl bg-white/90 flex items-center justify-center shadow-lg">
                        <span className="text-xl">{placementEvents[currentEventSlide].icon}</span>
                      </div>
                    </div>
                    
                    {/* Image quality indicator */}
                    <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-medium">HD</span>
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

      {/* Success Stories Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-50'} relative overflow-hidden`}>
        {/* Enhanced Background - Success Celebration Animation */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-green-500/15 to-emerald-500/15' 
              : 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
          }`}></div>
          
          {/* Animated floating success quotes */}
          {['"Amazing!"', '"Excellent!"', '"Perfect!"', '"Outstanding!"', '"Brilliant!"'].map((quote, i) => (
            <motion.div
              key={i}
              className={`absolute text-lg font-bold ${
                theme === 'dark' ? 'text-green-400/40' : 'text-green-600/60'
              }`}
              style={{
                left: `${15 + (i * 18)}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut"
              }}
            >
              {quote}
            </motion.div>
          ))}
          
          {/* Animated pulsing stars - more visible */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${
                theme === 'dark' ? 'text-green-400/50' : 'text-green-600/70'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${16 + Math.random() * 12}px`,
              }}
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            >
              ⭐
            </motion.div>
          ))}
          
          {/* Animated gradient orbs - more visible */}
          <motion.div 
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
              theme === 'dark' 
                ? 'bg-green-500/20' 
                : 'bg-green-500/15'
            } blur-3xl`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
              theme === 'dark' 
                ? 'bg-emerald-500/20' 
                : 'bg-emerald-500/15'
            } blur-3xl`}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.2, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating success icons - more visible */}
          {['🎉', '🏆', '💼', '🚀', '⚡', '🌟', '💯', '🎯'].map((icon, i) => (
            <motion.div
              key={i}
              className={`absolute text-3xl ${
                theme === 'dark' ? 'opacity-40' : 'opacity-60'
              }`}
              style={{
                left: `${10 + i * 11}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 15, -15, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.div>
          ))}
          
          {/* Animated confetti effect */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 40 - 20, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.8, 0.3],
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
                  ? 'bg-green-900/30 text-green-400 border border-green-800'
                  : 'bg-green-50 text-green-600 border border-green-100'
              }`}>
                Student Testimonials
              </span>
            </motion.div>
            
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-400'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-emerald-700 to-green-800'
            }`}>
              Success Stories
            </h2>
            
            <p className={`text-lg max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Hear from our students about how OSOP Coding transformed their learning journey
            </p>
          </motion.div>

          {/* Success Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                name: "Vasu Tiwari",
                course: "Java Full Stack Development",
                text: "OSOP transformed my programming journey completely. Dr. Bajpai Sir's teaching methodology made complex Java concepts crystal clear. The hands-on projects helped me secure my position at Innoeye.",
                rating: 5,
                image: "/images/students/placements/Vasu-Tiwari-Innoeye.jpg",
                company: "Innoeye",
                package: "₹8.5 LPA"
              },
              {
                name: "Tanwant Singh",
                course: "Python & Data Science",
                text: "The hands-on approach at OSOP is incredible. I went from knowing nothing about programming to building enterprise applications. The weekly doubt sessions were extremely helpful for my growth.",
                rating: 5,
                image: "/images/students/placements/Tanwant-Singh-WorldPay.jpg",
                company: "WorldPay",
                package: "₹9.2 LPA"
              },
              {
                name: "Shubham Rathore",
                course: "Web Development",
                text: "OSOP's teaching methodology is outstanding. The instructors break down complex topics into simple, digestible parts. The practical projects gave me confidence to work on real applications.",
                rating: 5,
                image: "/images/students/placements/Shubham-Rathore.jpg",
                company: "Tech Solutions",
                package: "₹7.8 LPA"
              },
              {
                name: "Shiva Jain",
                course: "Java Programming",
                text: "The practical projects and coding exercises at OSOP gave me the confidence to tackle any programming challenge. The placement support was exceptional and helped me join Hotwax.",
                rating: 5,
                image: "/images/students/placements/Shiva-Jain-Hotwax.jpg",
                company: "Hotwax",
                package: "₹8.0 LPA"
              },
              {
                name: "Shailendra Mishra",
                course: "Java Enterprise Development",
                text: "OSOP's industry-focused curriculum prepared me perfectly for the real world. Dr. Bajpai Sir's experience shows in every lecture. The mentorship was exceptional.",
                rating: 5,
                image: "/images/students/placements/Shailendra-MishraNew-Con-infosystems (1).jpg",
                company: "New Con Infosystems",
                package: "₹7.5 LPA"
              },
              {
                name: "Ruchika Khandelwal",
                course: "Full Stack Development",
                text: "The supportive learning environment at OSOP made all the difference. I could ask questions freely and get detailed explanations. The recorded sessions helped me revise concepts thoroughly.",
                rating: 5,
                image: "/images/students/placements/Ruchika-Khandelwal-Innoeye.jpg",
                company: "Innoeye",
                package: "₹8.2 LPA"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-700/50 backdrop-blur-xl border border-slate-600/50 hover:border-green-500/50'
                    : 'bg-gradient-to-br from-white/95 via-white/85 to-green-50/30 backdrop-blur-xl border border-slate-200/50 hover:border-green-400/50'
                } rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Quote icon */}
                <div className="relative mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-green-900/50 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                </div>
                
                {/* Testimonial text */}
                <p className={`text-sm leading-relaxed mb-6 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  "{story.text}"
                </p>
                
                {/* Student info with photo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Student photo */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <img
                        src={story.image}
                        alt={story.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-green-400/50 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </motion.div>
                    
                    {/* Student details */}
                    <div>
                      <h4 className={`font-bold text-lg ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {story.name}
                      </h4>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {story.course}
                      </p>
                    </div>
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex">
                    {[...Array(story.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section 
        ref={logosSectionRef}
        className={`py-20 ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} relative overflow-hidden`}
      >
        {/* Enhanced Background - Corporate Network Animation */}
        <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-indigo-500/15 to-purple-500/15' 
              : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20'
          }`}></div>
          
          {/* Animated network nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-3 h-3 rounded-full ${
                theme === 'dark' 
                  ? 'bg-indigo-400/60' 
                  : 'bg-indigo-600/80'
              }`}
              style={{
                left: `${10 + (i * 8)}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Animated connecting lines */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-px ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent' 
                  : 'bg-gradient-to-r from-transparent via-indigo-600/60 to-transparent'
              }`}
              style={{
                left: '10%',
                right: '10%',
                top: `${15 + i * 12}%`,
              }}
              animate={{
                scaleX: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Floating company/tech icons */}
          {['🏢', '💼', '🌐', '📊', '⚡', '🚀', '💻', '🔗'].map((icon, i) => (
            <motion.div
              key={i}
              className={`absolute text-2xl ${
                theme === 'dark' ? 'opacity-30' : 'opacity-50'
              }`}
              style={{
                left: `${8 + i * 11}%`,
                top: `${15 + Math.random() * 70}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 6 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.div>
          ))}
          
          {/* Animated gradient orbs - more visible */}
          <motion.div 
            className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
              theme === 'dark' 
                ? 'bg-indigo-500/25' 
                : 'bg-indigo-500/15'
            } blur-3xl`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
              theme === 'dark' 
                ? 'bg-purple-500/25' 
                : 'bg-purple-500/15'
            } blur-3xl`}
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.5, 0.3, 0.5],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Animated data flow lines */}
          <motion.div 
            className={`absolute top-1/4 left-0 w-full h-px ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-indigo-600/70 to-transparent'
            }`}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className={`absolute bottom-1/4 left-0 w-full h-px ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-transparent via-purple-400/50 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-purple-600/70 to-transparent'
            }`}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 2.5,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating binary code */}
          {['1010', '0101', '1100', '0011'].map((binary, i) => (
            <motion.div
              key={i}
              className={`absolute text-sm font-mono ${
                theme === 'dark' ? 'text-indigo-400/30' : 'text-indigo-600/50'
              }`}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + Math.random() * 40}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.7,
                ease: "easeInOut"
              }}
            >
              {binary}
            </motion.div>
          ))}
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
                Alumni's Working in Top MNCs
              </h2>
              
              <p className={`text-lg max-w-3xl mx-auto ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Our graduates are successfully placed and thriving in leading multinational corporations worldwide
              </p>
            </motion.div>
            
            {/* Enhanced Company Logos Slider - Continuous Flow */}
            <div className="py-10 space-y-8">
              {/* First row - moving right */}
              <div className="relative overflow-hidden">
                {/* Gradient fade edges */}
                <div className={`absolute top-0 left-0 w-32 h-full bg-gradient-to-r ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                <div className={`absolute top-0 right-0 w-32 h-full bg-gradient-to-l ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                
                {/* Continuous scrolling container */}
                <div className="flex animate-marquee-right-smooth">
                  {/* Triple the array for seamless loop */}
                  {[...firstRowCompanies, ...firstRowCompanies, ...firstRowCompanies].map((company, index) => (
                    <motion.div
                      key={`first-row-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % firstRowCompanies.length) * 0.02, duration: 0.5 }}
                      className={`flex-shrink-0 mx-4 w-52 h-28 ${
                        theme === 'dark' 
                          ? 'bg-slate-800/60 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/80'
                          : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl'
                      } rounded-2xl p-4 relative group transition-all duration-300 hover:scale-105`}
                    >
                      <div className={`w-full h-full flex items-center justify-center relative ${
                        theme === 'dark' ? 'opacity-85 hover:opacity-100' : 'opacity-85 hover:opacity-100'
                      } transition-all duration-300`}>
                        <img 
                          src={company.logo} 
                          alt={company.name}
                          className="max-w-full max-h-full object-contain filter transition-all duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Company name tooltip */}
                        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'
                        } whitespace-nowrap z-20`}>
                          {company.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
                
              {/* Second row - moving left (continuous flow from first row) */}
              <div className="relative overflow-hidden">
                {/* Gradient fade edges */}
                <div className={`absolute top-0 left-0 w-32 h-full bg-gradient-to-r ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                <div className={`absolute top-0 right-0 w-32 h-full bg-gradient-to-l ${theme === 'dark' ? 'from-slate-900' : 'from-white'} to-transparent z-10 pointer-events-none`}></div>
                
                {/* Continuous scrolling container */}
                <div className="flex animate-marquee-left-smooth">
                  {/* Triple the array for seamless loop */}
                  {[...secondRowCompanies, ...secondRowCompanies, ...secondRowCompanies].map((company, index) => (
                    <motion.div
                      key={`second-row-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % secondRowCompanies.length) * 0.02, duration: 0.5 }}
                      className={`flex-shrink-0 mx-4 w-52 h-28 ${
                        theme === 'dark' 
                          ? 'bg-slate-800/60 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/80'
                          : 'bg-white shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl'
                      } rounded-2xl p-4 relative group transition-all duration-300 hover:scale-105`}
                    >
                      <div className={`w-full h-full flex items-center justify-center relative ${
                        theme === 'dark' ? 'opacity-85 hover:opacity-100' : 'opacity-85 hover:opacity-100'
                      } transition-all duration-300`}>
                        <img 
                          src={company.logo} 
                          alt={company.name}
                          className="max-w-full max-h-full object-contain filter transition-all duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Company name tooltip */}
                        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'
                        } whitespace-nowrap z-20`}>
                          {company.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-center mt-12"
              >
                <div className={`inline-flex items-center gap-8 px-8 py-4 rounded-2xl ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 backdrop-blur-xl border border-slate-700/50'
                    : 'bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg'
                }`}>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {allCompanies.length}+
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      Partner Companies
                    </div>
                  </div>
                  <div className={`w-px h-8 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                      98%
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      Placement Rate
                    </div>
                  </div>
                  <div className={`w-px h-8 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                      15K+
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      Alumni Placed
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
        </div>
      </section>



    </div>
  );
};

export default HomePage; 
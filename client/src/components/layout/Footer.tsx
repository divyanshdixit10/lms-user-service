import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../ui/GlassCard';
import ParticleBackground from '../ui/ParticleBackground';
import osopLogo from '../../assets/images/osop-logo.png';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const { scrollY } = useScroll();
  const footerY = useTransform(scrollY, [0, 1000], [50, 0]);
  const footerOpacity = useTransform(scrollY, [0, 500], [0.8, 1]);
  
  const currentYear = new Date().getFullYear();
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for footer visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById('main-footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);
  
  // Footer links organized by category - only existing pages
  const footerLinks = [
    {
      title: 'Platform',
      icon: '🚀',
      links: [
        { name: 'Courses', path: '/courses', description: 'Explore our courses' },
        { name: 'Placement', path: '/placement', description: 'Job placement' },
        { name: 'Success Stories', path: '/success-stories', description: 'Student success' },
      ]
    },
    {
      title: 'Company',
      icon: '🏢',
      links: [
        { name: 'About Us', path: '/about', description: 'Our story' },
        { name: 'Contact', path: '/contact', description: 'Get in touch' },
        { name: 'Hire Talent', path: '/hire', description: 'Hire our graduates' },
      ]
    },
    {
      title: 'Legal & Support',
      icon: '⚖️',
      links: [
        { name: 'Terms of Service', path: '/terms', description: 'Terms & conditions' },
        { name: 'Privacy Policy', path: '/privacy', description: 'Privacy protection' },
        { name: 'Cookie Policy', path: '/cookies', description: 'Cookie usage' },
        { name: 'Refund Policy', path: '/refund', description: 'Refund terms' },
        { name: 'Security', path: '/security', description: 'Security measures' },
      ]
    }
  ];
  
  // Enhanced social media links with proper brand icons
  const socialLinks = [
    { 
      name: 'Twitter', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: 'https://twitter.com/osop_coding',
      color: 'from-blue-400 to-blue-600',
      hoverColor: 'hover:from-blue-500 hover:to-blue-700'
    },
    { 
      name: 'GitHub', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      url: 'https://github.com/osop-coding',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:from-gray-700 hover:to-gray-900'
    },
    { 
      name: 'LinkedIn', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://linkedin.com/company/osop-coding',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:from-blue-700 hover:to-blue-900'
    },
    { 
      name: 'YouTube', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: 'https://youtube.com/@osop-coding',
      color: 'from-red-500 to-red-700',
      hoverColor: 'hover:from-red-600 hover:to-red-800'
    },
    { 
      name: 'Discord', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z"/>
        </svg>
      ),
      url: 'https://discord.gg/osop-coding',
      color: 'from-indigo-500 to-purple-600',
      hoverColor: 'hover:from-indigo-600 hover:to-purple-700'
    },
    { 
      name: 'Instagram', 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.02.43c-.524.233-.972.556-1.43 1.014-.458.458-.78.906-1.014 1.43-.226.5-.348 1.074-.382 2.021C2.159 7.989 2.146 8.396 2.146 12.017c0 3.621.013 4.028.048 4.976.034.947.156 1.521.382 2.021.233.524.556.972 1.014 1.43.458.458.906.781 1.014.5.226 1.074.348 2.021.382.947.035 1.354.048 4.975.048 3.621 0 4.028-.013 4.976-.048.947-.034 1.521-.156 2.021-.382.524-.233.972-.556 1.43-1.014.458-.458.781-.906 1.014-1.43.226-.5.348-1.074.382-2.021.035-.948.048-1.355.048-4.976 0-3.621-.013-4.028-.048-4.976-.034-.947-.156-1.521-.382-2.021-.233-.524-.556-.972-1.014-1.43-.458-.458-.906-.781-1.43-1.014-.5-.226-1.074-.348-2.021-.382C16.045.013 15.638 0 12.017 0zM12.017 2.178c3.555 0 3.974.014 5.38.05.869.038 1.472.166 1.851.274.494.192.841.446 1.23.833.387.39.641.736.833 1.23.108.379.236.982.274 1.851.036 1.406.05 1.825.05 5.38 0 3.555-.014 3.974-.05 5.38-.038.869-.166 1.472-.274 1.851-.192.494-.446.841-.833 1.23-.39.387-.736.641-1.23.833-.379.108-.982.236-1.851.274-1.406.036-1.825.05-5.38.05-3.555 0-3.974-.014-5.38-.05-.869-.038-1.472-.166-1.851-.274-.494-.192-.841-.446-1.23-.833-.387-.39-.641-.736-.833-1.23-.108-.379-.236-.982-.274-1.851-.036-1.406-.05-1.825-.05-5.38 0-3.555.014-3.974.05-5.38.038-.869.166-1.472.274-1.851.192-.494.446-.841.833-1.23.39-.387.736-.641 1.23-.833.379-.108.982-.236 1.851-.274 1.406-.036 1.825-.05 5.38-.05zm0 3.685a6.154 6.154 0 100 12.308 6.154 6.154 0 000-12.308zm0 10.143a3.989 3.989 0 110-7.978 3.989 3.989 0 010 7.978zm7.846-10.405a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
        </svg>
      ),
      url: 'https://instagram.com/osop_coding',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700'
    },
  ];
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeStatus('error');
      return;
    }
    
    setSubscribeStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubscribeStatus('success');
      setEmail('');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubscribeStatus('idle');
      }, 3000);
    } catch (error) {
      setSubscribeStatus('error');
    }
  };
  
  return (
    <motion.footer 
      id="main-footer"
      style={{ y: footerY, opacity: footerOpacity }}
      className={`relative overflow-hidden ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
          : 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30'
      }`}
    >
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground 
          particleCount={30}
          colorScheme={theme === 'dark' ? 'purple' : 'blue'}
          connectParticles={true}
          interactivity={false}
          className="opacity-10"
        />
        
        {/* Reduced animated gradient orbs */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-3xl ${
                i % 3 === 0 
                  ? `w-64 h-64 ${theme === 'dark' ? 'bg-purple-500/5' : 'bg-purple-200/20'}`
                  : i % 3 === 1
                  ? `w-48 h-48 ${theme === 'dark' ? 'bg-blue-500/5' : 'bg-blue-200/20'}`
                  : `w-56 h-56 ${theme === 'dark' ? 'bg-indigo-500/5' : 'bg-indigo-200/20'}`
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 50 + i * 10, 0],
                y: [0, -40 - i * 8, 0],
                scale: [1, 1.1 + i * 0.05, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1,
              }}
            />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div 
          className={`absolute inset-0 opacity-3 ${theme === 'dark' ? 'opacity-5' : 'opacity-3'}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${theme === 'dark' ? '%23ffffff' : '%23000000'}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Footer Links with Newsletter - Reduced padding */}
      <section className="relative z-10 py-4 border-t border-opacity-20 border-slate-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Footer Links */}
            {footerLinks.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{category.icon}</span>
                  <h3 className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {category.title}
                  </h3>
                </div>
                
                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.05) + (linkIndex * 0.02) }}
                    >
                      <Link
                        to={link.path}
                        className={`group flex flex-col transition-all duration-300 ${
                          theme === 'dark'
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span className="font-medium text-base group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                        <span className={`text-sm mt-1 ${
                          theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                        }`}>
                          {link.description}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Newsletter Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-3"
                >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">📧</span>
                <h3 className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                  Newsletter
                </h3>
              </div>
              
              <div className="space-y-3">
                <p className={`text-base ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  Join 10,000+ developers getting our updates
                  </p>
                  
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                <input
                  type="email"
                  value={email}
                        onChange={handleEmailChange}
                      placeholder="your@email.com"
                      className={`w-full px-4 py-3 text-base rounded-lg border transition-all duration-300 ${
                          theme === 'dark'
                          ? 'bg-slate-700/60 border-slate-600 text-white placeholder-slate-400 focus:bg-slate-700 focus:border-purple-500'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500 focus:border-purple-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                  required
                />
                      {subscribeStatus === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute text-sm text-red-500 mt-1"
                      >
                        Please enter a valid email
                      </motion.p>
                      )}
                    </div>
                  
                  <motion.button 
                  type="submit"
                      disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                    whileHover={{ scale: subscribeStatus === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: subscribeStatus === 'loading' ? 1 : 0.98 }}
                    className={`w-full px-4 py-3 text-base rounded-lg font-medium transition-all duration-300 ${
                        subscribeStatus === 'success'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        : subscribeStatus === 'loading'
                        ? 'bg-gradient-to-r from-slate-400 to-slate-500 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg'
                    }`}
                    >
                    <AnimatePresence mode="wait">
                      {subscribeStatus === 'loading' ? (
                        <motion.span 
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Subscribing...
                        </motion.span>
                      ) : subscribeStatus === 'success' ? (
                        <motion.span 
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-center"
                        >
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Subscribed!
                        </motion.span>
                      ) : (
                        <motion.span 
                          key="default"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Join Newsletter
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  </form>

                {/* Trust indicators */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}>
                      No spam
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}>
                      Unsubscribe anytime
                    </span>
                  </div>
                </div>
              </div>
                </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media - Compact */}
      <section className="relative z-10 py-3 border-t border-opacity-20 border-slate-500">
        <div className="container mx-auto px-4">
          {/* Social Media Links - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <h4 className={`text-base font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                🌐 Connect With Us
              </h4>
              </div>
            
            <div className="flex justify-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative p-2 rounded-lg bg-gradient-to-r ${social.color} ${social.hoverColor} text-white shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  <div className="text-base block">{social.icon}</div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Bar - Compact */}
      <section className="relative z-10 py-2 border-t border-opacity-20 border-slate-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col lg:flex-row items-center justify-between gap-2`}
          >
            {/* Logo and Copyright - Enhanced */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center group">
                <div className="relative overflow-hidden rounded-xl p-2 bg-gradient-to-r from-purple-600 to-blue-600 group-hover:from-purple-700 group-hover:to-blue-700 transition-all duration-300">
                  <img 
                    src={osopLogo} 
                    alt="OSOP-CODING Logo" 
                    className="h-8 w-auto object-contain relative z-10 group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
            </Link>
            
              <div className={`hidden lg:block h-6 border-l ${
              theme === 'dark' ? 'border-slate-700' : 'border-slate-300'
            }`}></div>
            
              <div className="text-center lg:text-left">
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              © {currentYear} OSOPCoding. All rights reserved.
            </p>
                <p className={`text-xs mt-1 ${
                  theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                }`}>
                  Made with ❤️ by FIRSTLOGIC INFOSYSTEMS
                </p>
              </div>
            </div>

            {/* Live Status & Time - Enhanced */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Online
                </span>
              </div>
              
              <div className={`text-sm font-medium ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {currentTime.toLocaleTimeString('en-US', {
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
          </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
              theme === 'dark' ? 'hover:from-purple-700 hover:to-blue-700' : 'hover:from-purple-700 hover:to-blue-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
};

export default Footer;
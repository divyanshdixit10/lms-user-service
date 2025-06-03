import React, { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useScroll, AnimatePresence, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleBackground from '../../components/ui/ParticleBackground';
import HeroGradientText from '../../components/ui/HeroGradientText';
import CodeBackgroundAnimation from '../../components/ui/CodeBackgroundAnimation';
import GlassCard from '../../components/ui/GlassCard';

// Animated counter component with spring physics
interface CountUpAnimationProps {
  end: number;
  duration?: number;
  delay?: number;
  formatter?: (value: number) => string;
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  end,
  duration = 2,
  delay = 0,
  formatter = (value: number) => Math.round(value).toString()
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [count, setCount] = useState(0);
  
  const springValue = useSpring(0, {
    stiffness: 80,
    damping: 15,
    duration: duration * 1000
  });
  
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
        springValue.set(end);
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, springValue, end, delay]);
  
  useEffect(() => {
    const unsubscribe = springValue.onChange((latest) => {
      setCount(latest);
    });
    
    return unsubscribe;
  }, [springValue]);
  
  return <span ref={nodeRef}>{formatter(count)}</span>;
};

// Mouse parallax hook
const useMouseParallax = (strength: number = 20) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);
  
  return mousePosition;
};

// Team member carousel component with auto-slide functionality
interface TeamMemberCarouselProps {
  team: Array<{
    name: string;
    role: string;
    image: string;
    description: string;
    expertise: string[];
    social: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    }
  }>;
  theme: string;
}

const TeamMemberCarousel: React.FC<TeamMemberCarouselProps> = ({ team, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isFlipped, setIsFlipped] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Check viewport size for responsive behavior
  useEffect(() => {
    const checkViewportSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkViewportSize();
    window.addEventListener('resize', checkViewportSize);
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  // Get visible count based on screen size
  const getVisibleCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (window.innerWidth >= 1024 && window.innerWidth < 1280) return 3;
    return 4; // Large screens
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!autoplay || isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, currentIndex, isPaused, team.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % team.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? team.length - 1 : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle touch events for swipe navigation
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
      if (carouselRef.current) {
        carouselRef.current.style.transition = 'transform 0.2s ease-out';
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!carouselRef.current) return;
      
      const currentX = e.changedTouches[0].screenX;
      const diff = currentX - touchStartX.current;
      const maxSwipe = 100;
      
      const moveX = Math.min(Math.abs(diff), maxSwipe) * (diff < 0 ? -1 : 1);
      carouselRef.current.style.transform = `translateX(${moveX / 10}px)`;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      
      if (carouselRef.current) {
        carouselRef.current.style.transform = 'translateX(0)';
        carouselRef.current.style.transition = 'transform 0.3s ease-out';
      }
      
      const swipeThreshold = 50;
      const swipeDistance = touchStartX.current - touchEndX.current;
      
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };
    
    const element = carouselRef.current;
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const visibleCount = getVisibleCount();
  const cardWidth = 100 / visibleCount;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * cardWidth}%)`,
            width: `${(team.length * 100) / visibleCount}%`
          }}
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / team.length}%` }}
            >
              <motion.div
                className={`group relative rounded-2xl overflow-hidden ${
                  theme === 'dark' 
                    ? 'bg-slate-800/50 border border-slate-700 hover:border-blue-500/50' 
                    : 'bg-white border border-slate-200 hover:border-blue-300'
                } backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 h-96`}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setIsFlipped(isFlipped === index ? null : index)}
              >
                <AnimatePresence mode="wait">
                  {isFlipped === index ? (
                    // Back of card - detailed info
                    <motion.div
                      key="back"
                      initial={{ rotateY: 180 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 p-6 flex flex-col justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <h3 className={`text-xl font-bold mb-2 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {member.name}
                      </h3>
                      <p className={`text-sm mb-4 ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {member.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className={`text-sm font-semibold mb-2 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Expertise:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {member.expertise.slice(0, 4).map((skill, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 text-xs rounded ${
                                theme === 'dark'
                                  ? 'bg-blue-900/30 text-blue-400'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-3 mt-auto">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-blue-500 hover:text-blue-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="text-blue-400 hover:text-blue-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-800'}>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    // Front of card - basic info
                    <motion.div
                      key="front"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className={`text-xl font-bold mb-2 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          {member.name}
                        </h3>
                        <p className={`text-sm font-medium mb-3 ${
                          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {member.role}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {member.expertise.slice(0, 3).map((skill, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 text-xs rounded ${
                                theme === 'dark'
                                  ? 'bg-slate-700 text-slate-300'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <button className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                        } transition-colors`}>
                          Click to learn more →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className={`p-2 rounded-full ${
            theme === 'dark'
              ? 'bg-slate-700 text-white hover:bg-slate-600'
              : 'bg-white text-slate-800 hover:bg-slate-100'
          } shadow-lg transition-colors`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex gap-2">
          {team.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-blue-500 scale-125'
                  : theme === 'dark'
                    ? 'bg-slate-600 hover:bg-slate-500'
                    : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={nextSlide}
          className={`p-2 rounded-full ${
            theme === 'dark'
              ? 'bg-slate-700 text-white hover:bg-slate-600'
              : 'bg-white text-slate-800 hover:bg-slate-100'
          } shadow-lg transition-colors`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Auto-play toggle */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setAutoplay(!autoplay)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            theme === 'dark'
              ? 'bg-slate-700 text-white hover:bg-slate-600'
              : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
          }`}
        >
          {autoplay ? '⏸️' : '▶️'} {autoplay ? 'Pause' : 'Play'} Auto-slide
        </button>
      </div>
    </div>
  );
};

// Generic Responsive Slider Component
interface ResponsiveSliderProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  itemsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
  autoplay?: boolean;
  autoplayDelay?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  theme: string;
}

const ResponsiveSlider: React.FC<ResponsiveSliderProps> = ({
  items,
  renderItem,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoplay = true,
  autoplayDelay = 4000,
  showDots = true,
  showArrows = true,
  className = "",
  theme
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(autoplay);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check viewport size
  useEffect(() => {
    const checkViewportSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkViewportSize();
    window.addEventListener('resize', checkViewportSize);
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  // Get current items per view
  const getCurrentItemsPerView = () => {
    if (isMobile) return itemsPerView.mobile;
    if (isTablet) return itemsPerView.tablet;
    return itemsPerView.desktop;
  };

  const itemsPerViewCurrent = getCurrentItemsPerView();
  const maxIndex = Math.max(0, items.length - itemsPerViewCurrent);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoplay || isPaused || items.length <= itemsPerViewCurrent) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, autoplayDelay);
    
    return () => clearInterval(interval);
  }, [isAutoplay, isPaused, maxIndex, autoplayDelay, items.length, itemsPerViewCurrent]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Touch handlers
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const swipeDistance = touchStartX.current - touchEndX.current;
      
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };
    
    const element = sliderRef.current;
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Don't show slider controls if all items fit in view
  const showControls = items.length > itemsPerViewCurrent;

  // Calculate the percentage to move per slide
  const slidePercentage = 100 / itemsPerViewCurrent;

  return (
    <div className={`relative ${className}`}>
      {/* Slider Container */}
      <div 
        ref={sliderRef}
        className="overflow-hidden rounded-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * slidePercentage}%`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.6
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2 md:px-3"
              style={{ 
                width: `${100 / itemsPerViewCurrent}%`,
                minWidth: `${100 / itemsPerViewCurrent}%`
              }}
            >
              <div className="h-full">
                {renderItem(item, index)}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          {/* Arrows */}
          {showArrows && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  currentIndex === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-110'
                } ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-slate-700 border border-slate-600'
                    : 'bg-white/90 text-slate-800 hover:bg-white border border-slate-200'
                } backdrop-blur-sm shadow-lg`}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                disabled={currentIndex === maxIndex}
                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 md:p-3 rounded-full transition-all duration-300 ${
                  currentIndex === maxIndex 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:scale-110'
                } ${
                  theme === 'dark'
                    ? 'bg-slate-800/90 text-white hover:bg-slate-700 border border-slate-600'
                    : 'bg-white/90 text-slate-800 hover:bg-white border border-slate-200'
                } backdrop-blur-sm shadow-lg`}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots */}
          {showDots && maxIndex > 0 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-blue-500 scale-125'
                      : theme === 'dark'
                        ? 'bg-slate-600 hover:bg-slate-500'
                        : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Auto-play toggle */}
          {maxIndex > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-700/50 text-white hover:bg-slate-600/50'
                    : 'bg-slate-100/50 text-slate-800 hover:bg-slate-200/50'
                } backdrop-blur-sm`}
              >
                {isAutoplay ? '⏸️' : '▶️'} {isAutoplay ? 'Pause' : 'Play'} Auto-slide
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Milestones Slider Component for Mobile
interface MilestonesSliderProps {
  milestones: Array<{
    year: string;
    title: string;
    description: string;
    icon: string;
  }>;
  theme: string;
}

const MilestonesSlider: React.FC<MilestonesSliderProps> = ({ milestones, theme }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewportSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkViewportSize();
    window.addEventListener('resize', checkViewportSize);
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  const renderMilestone = (milestone: any, index: number) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`p-6 rounded-2xl ${
        theme === 'dark'
          ? 'bg-slate-800/50 border border-slate-700'
          : 'bg-white border border-slate-200'
      } shadow-lg hover:shadow-xl transition-all duration-300 h-full`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{milestone.icon}</span>
        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          {milestone.year}
        </span>
      </div>
      <h3 className={`text-xl font-bold mb-3 ${
        theme === 'dark' ? 'text-white' : 'text-slate-800'
      }`}>
        {milestone.title}
      </h3>
      <p className={`leading-relaxed ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
      }`}>
        {milestone.description}
      </p>
    </motion.div>
  );

  if (isDesktop) {
    // Desktop timeline view
    return (
      <div className="relative">
        {/* Timeline line */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 w-1 h-full ${
          theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
        }`}></div>

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 ${
                theme === 'dark' 
                  ? 'bg-slate-900 border-blue-500' 
                  : 'bg-white border-blue-600'
              } z-10`}></div>

              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-slate-700'
                      : 'bg-white border border-slate-200'
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{milestone.icon}</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                      {milestone.year}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {milestone.title}
                  </h3>
                  <p className={`${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {milestone.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Mobile/Tablet: Show slider
  return (
    <ResponsiveSlider
      items={milestones}
      renderItem={renderMilestone}
      itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
      autoplay={true}
      autoplayDelay={5000}
      theme={theme}
      className="px-4"
    />
  );
};

// Responsive Grid/Slider Wrapper Component
interface ResponsiveGridSliderProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  gridCols?: string;
  sliderItemsPerView?: {
    mobile: number;
    tablet: number;
  };
  autoplay?: boolean;
  autoplayDelay?: number;
  theme: string;
  className?: string;
}

const ResponsiveGridSlider: React.FC<ResponsiveGridSliderProps> = ({
  items,
  renderItem,
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  sliderItemsPerView = { mobile: 1, tablet: 2 },
  autoplay = true,
  autoplayDelay = 4000,
  theme,
  className = ""
}) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewportSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // lg breakpoint
    };
    
    checkViewportSize();
    window.addEventListener('resize', checkViewportSize);
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  if (isDesktop) {
    // Desktop: Show regular grid
    return (
      <div className={`grid ${gridCols} gap-6 lg:gap-8 ${className}`}>
        {items.map((item, index) => (
          <div key={index}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    );
  }

  // Mobile/Tablet: Show slider
  return (
    <ResponsiveSlider
      items={items}
      renderItem={renderItem}
      itemsPerView={{ 
        mobile: sliderItemsPerView.mobile, 
        tablet: sliderItemsPerView.tablet, 
        desktop: 3 // Won't be used since we're handling desktop separately
      }}
      autoplay={autoplay}
      autoplayDelay={autoplayDelay}
      theme={theme}
      className={className}
    />
  );
};

const AboutPage: React.FC = () => {
  const { theme } = useTheme();
  const mousePosition = useMouseParallax(15);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Comprehensive team data
  const teamMembers = [
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      description: 'Visionary leader with 15+ years in tech education and enterprise software development. Former Microsoft architect who founded OSOP to democratize quality tech education.',
      expertise: ['Leadership', 'Enterprise Architecture', 'EdTech Innovation', 'Strategic Planning', 'Team Building'],
      social: {
        linkedin: 'https://linkedin.com/in/rajeshkumar',
        twitter: 'https://twitter.com/rajeshkumar',
        github: 'https://github.com/rajeshkumar'
      }
    },
    {
      name: 'Priya Sharma',
      role: 'CTO & Head of Curriculum',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      description: 'Former Google engineer specializing in full-stack development and AI/ML. Leads our technical curriculum design and ensures industry-relevant content delivery.',
      expertise: ['Full Stack Development', 'Machine Learning', 'Cloud Computing', 'Curriculum Design', 'Technical Leadership'],
      social: {
        linkedin: 'https://linkedin.com/in/priyasharma',
        github: 'https://github.com/priyasharma'
      }
    },
    {
      name: 'Amit Patel',
      role: 'Senior Data Science Instructor',
      image: 'https://randomuser.me/api/portraits/men/28.jpg',
      description: 'PhD in Computer Science with expertise in machine learning and data analytics. Previously worked at Amazon and Netflix on recommendation systems.',
      expertise: ['Data Science', 'Machine Learning', 'Python', 'Statistics', 'Big Data Analytics'],
      social: {
        linkedin: 'https://linkedin.com/in/amitpatel',
        github: 'https://github.com/amitpatel'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'DevOps & Cloud Architect',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      description: 'AWS certified solutions architect with 10+ years experience in cloud infrastructure and DevOps practices. Specializes in scalable system design.',
      expertise: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
      social: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        github: 'https://github.com/sarahjohnson'
      }
    },
    {
      name: 'Vikram Singh',
      role: 'Full Stack Development Lead',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      description: 'Expert in modern web technologies with experience at startups and Fortune 500 companies. Passionate about teaching clean code practices.',
      expertise: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'System Design'],
      social: {
        linkedin: 'https://linkedin.com/in/vikramsingh',
        github: 'https://github.com/vikramsingh'
      }
    },
    {
      name: 'Dr. Anita Desai',
      role: 'AI/ML Research Director',
      image: 'https://randomuser.me/api/portraits/women/38.jpg',
      description: 'PhD in Artificial Intelligence from IIT Delhi. Research focus on deep learning and natural language processing. Published 50+ research papers.',
      expertise: ['Deep Learning', 'NLP', 'Computer Vision', 'Research', 'TensorFlow'],
      social: {
        linkedin: 'https://linkedin.com/in/anitadesai',
        github: 'https://github.com/anitadesai'
      }
    },
    {
      name: 'Michael Chen',
      role: 'Blockchain & Web3 Specialist',
      image: 'https://randomuser.me/api/portraits/men/35.jpg',
      description: 'Blockchain architect with experience in DeFi and NFT platforms. Former Ethereum Foundation contributor and smart contract security expert.',
      expertise: ['Blockchain', 'Solidity', 'Web3', 'Smart Contracts', 'DeFi'],
      social: {
        linkedin: 'https://linkedin.com/in/michaelchen',
        github: 'https://github.com/michaelchen'
      }
    },
    {
      name: 'Ravi Gupta',
      role: 'Mobile Development Expert',
      image: 'https://randomuser.me/api/portraits/men/42.jpg',
      description: 'Senior mobile developer with expertise in both native and cross-platform development. Former lead at Flipkart and Paytm.',
      expertise: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile Architecture'],
      social: {
        linkedin: 'https://linkedin.com/in/ravigupta',
        github: 'https://github.com/ravigupta'
      }
    }
  ];

  // Company values and culture
  const companyValues = [
    {
      title: 'Innovation First',
      description: 'We constantly evolve our curriculum to match industry trends and emerging technologies.',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Student Success',
      description: 'Every decision we make is centered around maximizing student learning outcomes and career growth.',
      icon: '🎯',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Quality Education',
      description: 'We maintain the highest standards in content delivery, instructor expertise, and learning resources.',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Inclusive Learning',
      description: 'We create an environment where learners from all backgrounds can thrive and succeed.',
      icon: '🤝',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Industry Relevance',
      description: 'Our curriculum is designed by industry experts to ensure immediate applicability in real-world scenarios.',
      icon: '🏢',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Continuous Growth',
      description: 'We foster a culture of lifelong learning for both our students and our team members.',
      icon: '📈',
      color: 'from-red-500 to-pink-500'
    }
  ];

  // Achievement milestones
  const milestones = [
    {
      year: '2018',
      title: 'Foundation',
      description: 'OSOP Coding was founded with a vision to democratize quality tech education.',
      icon: '🌱'
    },
    {
      year: '2019',
      title: 'First 1000 Students',
      description: 'Reached our first milestone of training 1000 successful students.',
      icon: '👥'
    },
    {
      year: '2020',
      title: 'Online Expansion',
      description: 'Launched comprehensive online learning platform during the pandemic.',
      icon: '💻'
    },
    {
      year: '2021',
      title: 'Industry Partnerships',
      description: 'Established partnerships with 50+ leading tech companies for placements.',
      icon: '🤝'
    },
    {
      year: '2022',
      title: 'AI Integration',
      description: 'Integrated AI-powered personalized learning paths and assessment systems.',
      icon: '🤖'
    },
    {
      year: '2023',
      title: 'Global Reach',
      description: 'Expanded to serve students across 25+ countries with localized content.',
      icon: '🌍'
    },
    {
      year: '2024',
      title: 'Innovation Hub',
      description: 'Launched research division focusing on next-generation educational technologies.',
      icon: '🔬'
    }
  ];

  // Technology stack we teach
  const techStack = [
    {
      category: 'Frontend',
      technologies: ['React', 'Vue.js', 'Angular', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      icon: '🎨',
      color: 'from-blue-500 to-purple-500'
    },
    {
      category: 'Backend',
      technologies: ['Node.js', 'Python', 'Java', 'C#', 'Go', 'PHP'],
      icon: '⚙️',
      color: 'from-green-500 to-blue-500'
    },
    {
      category: 'Database',
      technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'],
      icon: '🗄️',
      color: 'from-orange-500 to-red-500'
    },
    {
      category: 'Cloud & DevOps',
      technologies: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins'],
      icon: '☁️',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      category: 'Mobile',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android', 'Xamarin'],
      icon: '📱',
      color: 'from-pink-500 to-purple-500'
    },
    {
      category: 'Data & AI',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Pandas', 'Scikit-learn'],
      icon: '🧠',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-20 pb-16 lg:pt-24 lg:pb-20 min-h-screen flex items-center">
        {/* Multi-layered Background */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={100}
            colorScheme={theme === 'dark' ? 'blue' : 'blue'}
            connectParticles={true}
            interactivity={true}
            className="opacity-25"
          />
          
          <CodeBackgroundAnimation
            speed="slow"
            density="low"
            className="opacity-5"
            characters="const mission = 'Empower through education'; class Innovation extends Learning { transform() { return success; } }"
          />
          
          {/* Enhanced gradient overlays with animation */}
          <motion.div 
            className={`absolute inset-0 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-blue-900/15 via-purple-900/10 to-pink-900/15'
                : 'bg-gradient-to-br from-blue-100/20 via-purple-100/15 to-pink-100/20'
            }`}
            animate={{
              background: theme === 'dark' ? [
                "linear-gradient(135deg, rgba(30, 58, 138, 0.15) 0%, rgba(88, 28, 135, 0.10) 50%, rgba(157, 23, 77, 0.15) 100%)",
                "linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(147, 51, 234, 0.10) 50%, rgba(236, 72, 153, 0.15) 100%)",
                "linear-gradient(135deg, rgba(30, 58, 138, 0.15) 0%, rgba(88, 28, 135, 0.10) 50%, rgba(157, 23, 77, 0.15) 100%)"
              ] : [
                "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.05) 50%, rgba(236, 72, 153, 0.08) 100%)",
                "linear-gradient(135deg, rgba(30, 58, 138, 0.10) 0%, rgba(88, 28, 135, 0.05) 50%, rgba(157, 23, 77, 0.08) 100%)",
                "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.05) 50%, rgba(236, 72, 153, 0.08) 100%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Subtle top gradient */}
          <div className={`absolute inset-0 bg-gradient-to-t ${
            theme === 'dark' 
              ? 'from-transparent via-transparent to-slate-900/30'
              : 'from-transparent via-transparent to-white/50'
          }`}></div>
          
          {/* Interactive mouse gradient - very subtle */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, ${
                theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.08)'
              } 0%, transparent 40%)`
            }}
          />
          
          {/* Content readability overlay */}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-slate-900/30' 
              : 'bg-white/60'
          }`} />
        </div>

        {/* Simplified floating geometric shapes */}
        <motion.div
          style={{ y, x: mousePosition.x * 0.3 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${
                i % 2 === 0 ? 'w-32 h-32 rounded-full' : 'w-28 h-28 rounded-2xl'
              } ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/8 to-pink-500/10' 
                  : 'bg-gradient-to-br from-blue-200/20 via-purple-200/15 to-pink-200/20'
              } blur-xl`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -80, 60, 0],
                scale: [1, 1.2, 0.9, 1],
                rotate: [0, 90, 180, 360],
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.8,
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
            className="text-center max-w-6xl mx-auto"
          >
            {/* Enhanced Breadcrumb */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <motion.span 
                className={`px-5 py-2 rounded-full text-sm font-semibold backdrop-blur-md border ${
                  theme === 'dark' 
                    ? 'bg-blue-900/30 text-blue-300 border-blue-700/40 shadow-lg shadow-blue-900/10'
                    : 'bg-blue-50/80 text-blue-700 border-blue-200/40 shadow-lg shadow-blue-200/10'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{ 
                  boxShadow: [
                    "0 8px 20px rgba(59, 130, 246, 0.15)",
                    "0 12px 30px rgba(59, 130, 246, 0.2)",
                    "0 8px 20px rgba(59, 130, 246, 0.15)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏢 About OSOP Coding
              </motion.span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={`transition-colors ${theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>About</span>
              </nav>
            </motion.div>
            
            {/* Enhanced Main heading with advanced gradient text */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-6"
            >
              <HeroGradientText
                text="Empowering Tomorrow's Tech Leaders"
                gradientColors="from-blue-400 via-purple-500 to-pink-500"
                animationType="reveal"
                duration={1.5}
                className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
              />
            </motion.div>
            
            {/* Enhanced Subheading with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8"
            >
              <p className={`text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-4xl mx-auto ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Since <motion.span 
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >2018</motion.span>, we've been transforming lives through 
                <motion.span 
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                > innovative education</motion.span> and 
                <motion.span 
                  className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500"
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                > industry expertise</motion.span>
              </p>
            </motion.div>

            {/* Live Statistics Counter */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mb-10 max-w-5xl mx-auto"
            >
              <ResponsiveSlider
                items={[
                  { number: 15000, label: 'Students Trained', suffix: '+', icon: '👥' },
                  { number: 95, label: 'Success Rate', suffix: '%', icon: '🎯' },
                  { number: 500, label: 'Companies Hiring', suffix: '+', icon: '🏢' },
                  { number: 6, label: 'Years Experience', suffix: '+', icon: '⭐' },
                ]}
                renderItem={(stat, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 md:p-4 lg:p-6 rounded-xl backdrop-blur-md border h-full min-h-[120px] md:min-h-[140px] flex flex-col justify-center ${
                      theme === 'dark' 
                        ? 'bg-slate-800/30 border-slate-700/40 shadow-lg shadow-slate-900/10' 
                        : 'bg-white/30 border-white/40 shadow-lg shadow-blue-200/10'
                    }`}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -2,
                      boxShadow: theme === 'dark' 
                        ? "0 15px 30px rgba(59, 130, 246, 0.2)" 
                        : "0 15px 30px rgba(59, 130, 246, 0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2 text-center">{stat.icon}</div>
                    <div className={`text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 text-center ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      <CountUpAnimation 
                        end={stat.number} 
                        duration={2.5} 
                        delay={1.6 + index * 0.2}
                        formatter={(value) => Math.round(value).toLocaleString() + stat.suffix}
                      />
                    </div>
                    <div className={`text-xs md:text-sm font-medium text-center leading-tight ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {stat.label}
                    </div>
                  </motion.div>
                )}
                itemsPerView={{ mobile: 2, tablet: 4, desktop: 4 }}
                autoplay={true}
                autoplayDelay={4000}
                showDots={false}
                showArrows={false}
                theme={theme}
                className="px-1 md:px-2"
              />
            </motion.div>

            {/* Enhanced CTA Buttons with advanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <Link 
                  to="/courses" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden block"
                >
                  <span className="relative z-10 flex items-center gap-2 text-base">
                    🚀 Explore Our Courses
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    whileHover={{
                      background: [
                        "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(126, 34, 206, 1) 50%, rgba(219, 39, 119, 1) 100%)",
                        "linear-gradient(90deg, rgba(59, 130, 246, 1) 0%, rgba(147, 51, 234, 1) 50%, rgba(236, 72, 153, 1) 100%)",
                        "linear-gradient(90deg, rgba(29, 78, 216, 1) 0%, rgba(126, 34, 206, 1) 50%, rgba(219, 39, 119, 1) 100%)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/contact" 
                  className={`group px-8 py-4 rounded-xl font-bold border-2 backdrop-blur-md transition-all duration-500 text-base relative overflow-hidden flex items-center gap-2 ${
                    theme === 'dark'
                      ? 'border-blue-500/50 text-blue-400 hover:bg-blue-900/30 hover:border-blue-400 shadow-lg shadow-blue-900/10'
                      : 'border-blue-600/50 text-blue-700 hover:bg-blue-100/50 hover:border-blue-600 shadow-lg shadow-blue-200/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
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
                      💬
                    </motion.div>
                    Get in Touch
                    <motion.svg 
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </motion.svg>
                  </span>
                  <motion.div
                    className={`absolute inset-0 ${
                      theme === 'dark' ? 'bg-blue-900/15' : 'bg-blue-100/20'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mt-8 flex flex-col items-center"
            >
              <span className={`text-sm font-medium mb-3 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Discover Our Story
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`w-5 h-8 border-2 rounded-full flex justify-center ${
                  theme === 'dark' ? 'border-slate-600' : 'border-slate-400'
                }`}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-1 h-2 rounded-full mt-1.5 ${
                    theme === 'dark' ? 'bg-slate-400' : 'bg-slate-600'
                  }`}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Mission & Vision Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
          }`}></div>
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
          }`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
            >
              <span className="text-2xl">🎯</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                Our Foundation
              </span>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-black mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Purpose</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Driven by a clear mission and guided by an ambitious vision for the future of education
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Enhanced Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className={`relative p-10 rounded-3xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                  : 'bg-gradient-to-br from-white/80 to-blue-50/80 border border-blue-200/50'
              } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]`}>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse"></div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-6 right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm"
                ></motion.div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                    >
                      🎯
                    </motion.div>
                    <div>
                      <h3 className={`text-3xl md:text-4xl font-black ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        Our Mission
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <p className={`text-lg md:text-xl leading-relaxed mb-8 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    To democratize access to high-quality technology education by providing industry-relevant, 
                    practical training that empowers individuals to build successful careers in the rapidly 
                    evolving tech landscape.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Bridge the Skills Gap', 
                        description: 'Connect academic learning with real industry requirements',
                        icon: '🌉'
                      },
                      { 
                        title: 'Hands-On Experience', 
                        description: 'Project-based learning with portfolio development',
                        icon: '🛠️'
                      },
                      { 
                        title: 'Innovation Mindset', 
                        description: 'Foster critical thinking and problem-solving skills',
                        icon: '💡'
                      },
                      { 
                        title: 'Career Pathways', 
                        description: 'Create opportunities for meaningful employment',
                        icon: '🚀'
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-4 group/item"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                            theme === 'dark' 
                              ? 'bg-blue-900/30 group-hover/item:bg-blue-800/40' 
                              : 'bg-blue-100 group-hover/item:bg-blue-200'
                          } transition-colors duration-300`}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            {item.title}
                          </h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <div className={`relative p-10 rounded-3xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                  : 'bg-gradient-to-br from-white/80 to-purple-50/80 border border-purple-200/50'
              } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]`}>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse"></div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-6 right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm"
                ></motion.div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                    >
                      🔮
                    </motion.div>
                    <div>
                      <h3 className={`text-3xl md:text-4xl font-black ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        Our Vision
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <p className={`text-lg md:text-xl leading-relaxed mb-8 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    To become the global leader in technology education, recognized for producing 
                    skilled professionals who drive innovation and shape the future of technology 
                    across industries worldwide.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Global Leadership', 
                        description: 'Premier destination for technology education worldwide',
                        icon: '🌍'
                      },
                      { 
                        title: 'Worldwide Impact', 
                        description: 'Expand reach to serve learners globally',
                        icon: '🌐'
                      },
                      { 
                        title: 'Educational Innovation', 
                        description: 'Pioneer cutting-edge learning technologies',
                        icon: '⚡'
                      },
                      { 
                        title: 'Success Community', 
                        description: 'Build network of tech professionals and entrepreneurs',
                        icon: '🤝'
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="flex items-start gap-4 group/item"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                            theme === 'dark' 
                              ? 'bg-purple-900/30 group-hover/item:bg-purple-800/40' 
                              : 'bg-purple-100 group-hover/item:bg-purple-200'
                          } transition-colors duration-300`}
                        >
                          {item.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg mb-1 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            {item.title}
                          </h4>
                          <p className={`text-sm ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Company Values Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-32 right-20 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-green-500' : 'bg-green-300'
          }`}></div>
          <div className={`absolute bottom-32 left-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
          }`}></div>
          
          {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className={`w-full h-full ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'
            }`} style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, ${
                theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
              } 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 mb-6"
            >
              <span className="text-2xl">⭐</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                Core Principles
              </span>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-black mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">Values</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              The principles that guide everything we do and shape our culture
            </motion.p>
          </motion.div>

          <ResponsiveGridSlider
            items={companyValues}
            renderItem={(value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className={`relative p-8 md:p-10 rounded-3xl overflow-hidden h-full min-h-[400px] flex flex-col ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                    : 'bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200/50'
                } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2`}>
                  
                  {/* Dynamic Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Floating Geometric Shape */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className={`absolute top-6 right-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                  ></motion.div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon and Title */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <motion.div 
                        whileHover={{ 
                          scale: 1.2,
                          rotate: [0, -10, 10, 0],
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center text-white text-3xl md:text-4xl shadow-xl mb-4 group-hover:shadow-2xl transition-shadow duration-300`}
                      >
                        {value.icon}
                      </motion.div>
                      
                      <h3 className={`text-2xl md:text-3xl font-black mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {value.title}
                      </h3>
                      
                      <div className={`w-16 h-1 bg-gradient-to-r ${value.color} rounded-full`}></div>
                    </div>
                    
                    {/* Description */}
                    <div className="flex-grow flex items-center">
                      <p className={`text-lg md:text-xl leading-relaxed text-center ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {value.description}
                      </p>
                    </div>
                    
                    {/* Interactive Element */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="mt-6 text-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                            : 'bg-slate-100/50 text-slate-700 hover:bg-slate-200/50 hover:text-slate-800'
                        } backdrop-blur-sm border border-slate-500/20 hover:border-slate-400/30`}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            )}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            sliderItemsPerView={{ mobile: 1, tablet: 2 }}
            autoplay={true}
            autoplayDelay={5000}
            theme={theme}
            className="px-4 md:px-6 lg:px-8"
          />
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Expert Team</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Industry veterans and passionate educators dedicated to your success
            </p>
          </motion.div>

          <EnhancedTeamCarousel team={teamMembers} theme={theme} />
        </div>
      </section>

      {/* Milestones Timeline Section */}
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Journey</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Key milestones that shaped our growth and impact in the education industry
            </p>
          </motion.div>

          <MilestonesSlider milestones={milestones} theme={theme} />
        </div>
      </section>

      {/* Enhanced Technology Stack Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-16 w-72 h-72 rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-cyan-500' : 'bg-cyan-300'
          }`}></div>
          <div className={`absolute bottom-20 right-16 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
          }`}></div>
          
          {/* Tech Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme === 'dark' ? 'ffffff' : '000000'}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6"
            >
              <span className="text-2xl">💻</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}>
                Tech Stack
              </span>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-black mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Technologies We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">Teach</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Comprehensive coverage of modern technologies and frameworks used in the industry
            </motion.p>
          </motion.div>

          <ResponsiveGridSlider
            items={techStack}
            renderItem={(category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <div className={`relative p-8 md:p-10 rounded-3xl overflow-hidden h-full min-h-[420px] flex flex-col ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                    : 'bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200/50'
                } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2`}>
                  
                  {/* Dynamic Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Floating Code Symbol */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-600/20 to-slate-700/20 backdrop-blur-sm flex items-center justify-center text-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  >
                    &lt;/&gt;
                  </motion.div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon and Title */}
                    <div className="flex flex-col items-center text-center mb-8">
                      <motion.div 
                        whileHover={{ 
                          scale: 1.15,
                          rotate: [0, -5, 5, 0],
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white text-3xl md:text-4xl shadow-xl mb-4 group-hover:shadow-2xl transition-shadow duration-300`}
                      >
                        {category.icon}
                      </motion.div>
                      
                      <h3 className={`text-2xl md:text-3xl font-black mb-3 ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        {category.category}
                      </h3>
                      
                      <div className={`w-16 h-1 bg-gradient-to-r ${category.color} rounded-full`}></div>
                    </div>
                    
                    {/* Technologies Grid */}
                    <div className="flex-grow">
                      <div className="grid grid-cols-2 gap-3">
                        {category.technologies.map((tech: string, i: number) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className={`p-3 rounded-xl text-center font-medium text-sm transition-all duration-300 ${
                              theme === 'dark'
                                ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/60 hover:text-white'
                                : 'bg-slate-100/50 text-slate-700 hover:bg-slate-200/60 hover:text-slate-800'
                            } backdrop-blur-sm border border-slate-500/20 hover:border-slate-400/30 cursor-pointer group-hover:shadow-lg`}
                          >
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Learn More Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="mt-8 text-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          theme === 'dark'
                            ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                            : 'bg-slate-100/50 text-slate-700 hover:bg-slate-200/50 hover:text-slate-800'
                        } backdrop-blur-sm border border-slate-500/20 hover:border-slate-400/30`}
                      >
                        Explore {category.category}
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            )}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            sliderItemsPerView={{ mobile: 1, tablet: 2 }}
            autoplay={true}
            autoplayDelay={6000}
            theme={theme}
            className="px-4 md:px-6 lg:px-8"
          />
        </div>
      </section>

      {/* Enhanced Interactive Statistics Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-indigo-500' : 'bg-indigo-300'
          }`}></div>
          <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
          }`}></div>
          
          {/* Animated Number Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="text-9xl font-black opacity-10"
              >
                {theme === 'dark' ? '∞' : '∞'}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6"
            >
              <span className="text-2xl">📊</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Our Impact
              </span>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-black mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Impact</span> in Numbers
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Transforming lives through quality education and innovative learning experiences
            </motion.p>
          </motion.div>
          
          <ResponsiveGridSlider
            items={[
              { 
                label: 'Students Trained', 
                value: 15000,
                suffix: '+',
                icon: '👨‍🎓',
                color: 'from-blue-500 to-cyan-600',
                description: 'Successful graduates who transformed their careers',
                trend: '+25% this year',
                bgPattern: 'students'
              },
              { 
                label: 'Courses Offered', 
                value: 50, 
                suffix: '+',
                icon: '📚',
                color: 'from-green-500 to-emerald-600',
                description: 'Comprehensive programs across tech domains',
                trend: '+8 new courses',
                bgPattern: 'courses'
              },
              { 
                label: 'Success Rate', 
                value: 97, 
                suffix: '%',
                icon: '🎯',
                color: 'from-purple-500 to-pink-600',
                description: 'Job placement rate within 6 months',
                trend: 'Industry leading',
                bgPattern: 'success'
              },
              { 
                label: 'Countries Reached', 
                value: 25, 
                suffix: '+',
                icon: '🌍',
                color: 'from-orange-500 to-red-600',
                description: 'Global presence with localized content',
                trend: '+5 new regions',
                bgPattern: 'global'
              }
            ]}
            renderItem={(stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="group h-full"
              >
                <div className={`relative p-8 md:p-10 rounded-3xl overflow-hidden h-full min-h-[400px] flex flex-col ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                    : 'bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200/50'
                } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-3`}>
                  
                  {/* Dynamic Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>
                  
                  {/* Animated Background Pattern */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-slate-600/10 to-slate-700/10 backdrop-blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  ></motion.div>
                  
                  <div className="relative z-10 flex flex-col h-full text-center">
                    {/* Icon */}
                    <motion.div 
                      whileHover={{ 
                        scale: 1.2,
                        rotate: [0, -10, 10, 0],
                      }}
                      transition={{ duration: 0.4 }}
                      className="mx-auto mb-6"
                    >
                      <div className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-4xl md:text-5xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300`}>
                        {stat.icon}
                      </div>
                    </motion.div>
                    
                    {/* Value with Counter Animation */}
                    <motion.div 
                      className={`text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.15 + 0.5
                      }}
                    >
                      <CountUpAnimation end={stat.value} duration={2.5} delay={index * 0.15 + 0.5} />
                      {stat.suffix}
                    </motion.div>
                    
                    {/* Label */}
                    <h3 className={`text-xl md:text-2xl font-bold mb-4 ${
                      theme === 'dark' ? 'text-white' : 'text-slate-800'
                    }`}>
                      {stat.label}
                    </h3>
                    
                    {/* Description */}
                    <div className="flex-grow flex items-center">
                      <p className={`text-base md:text-lg leading-relaxed ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {stat.description}
                      </p>
                    </div>
                    
                    {/* Trend Indicator */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
                      className="mt-6"
                    >
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                        theme === 'dark'
                          ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                          : 'bg-green-100 text-green-700 border border-green-200'
                      } backdrop-blur-sm`}>
                        <motion.svg 
                          className="w-4 h-4" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                          animate={{ y: [0, -2, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </motion.svg>
                        {stat.trend}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            )}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            sliderItemsPerView={{ mobile: 1, tablet: 2 }}
            autoplay={true}
            autoplayDelay={4000}
            theme={theme}
            className="px-4 md:px-6 lg:px-8"
          />
        </div>
      </section>

      {/* Enhanced Why Choose OSOP Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-32 left-16 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}></div>
          <div className={`absolute bottom-32 right-16 w-96 h-96 rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
          }`}></div>
          
          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${theme === 'dark' ? 'ffffff' : '000000'}' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 mb-6"
            >
              <span className="text-2xl">✨</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Why Choose Us
              </span>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-black mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500">OSOP Coding</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Discover what makes us the preferred choice for aspiring tech professionals
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* What Sets Us Apart */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group"
            >
              <div className={`relative p-10 rounded-3xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                  : 'bg-gradient-to-br from-white/80 to-emerald-50/80 border border-emerald-200/50'
              } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]`}>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-500 animate-pulse"></div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotate: [0, 8, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-6 right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-sm"
                ></motion.div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                    >
                      🚀
                    </motion.div>
                    <div>
                      <h3 className={`text-3xl md:text-4xl font-black ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        What Sets Us Apart
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { 
                        title: 'Industry-Relevant Curriculum', 
                        description: 'Courses designed by industry experts and updated regularly to match current market demands',
                        icon: '🎯',
                        color: 'from-blue-500 to-cyan-500'
                      },
                      { 
                        title: 'Hands-On Learning', 
                        description: 'Project-based approach with real-world applications and portfolio development',
                        icon: '🛠️',
                        color: 'from-green-500 to-emerald-500'
                      },
                      { 
                        title: 'Expert Instructors', 
                        description: 'Learn from professionals with real-world industry experience and proven track records',
                        icon: '👨‍🏫',
                        color: 'from-purple-500 to-pink-500'
                      },
                      { 
                        title: 'Career Support', 
                        description: 'Comprehensive guidance on job placement, interview preparation, and career growth',
                        icon: '💼',
                        color: 'from-orange-500 to-red-500'
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="group/item"
                      >
                        <div className={`p-6 rounded-2xl transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-slate-700/30 hover:bg-slate-700/50' 
                            : 'bg-white/50 hover:bg-white/80'
                        } backdrop-blur-sm border border-slate-500/20 hover:border-slate-400/30 group-hover/item:scale-[1.02]`}>
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xl shadow-lg`}
                            >
                              {item.icon}
                            </motion.div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-xl mb-2 ${
                                theme === 'dark' ? 'text-white' : 'text-slate-800'
                              }`}>
                                {item.title}
                              </h4>
                              <p className={`text-base leading-relaxed ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Student Success Features */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="group"
            >
              <div className={`relative p-10 rounded-3xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                  : 'bg-gradient-to-br from-white/80 to-blue-50/80 border border-blue-200/50'
              } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]`}>
                
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse"></div>
                </div>
                
                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, -8, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-6 right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                ></motion.div>

                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-8">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -10 }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl"
                    >
                      ⭐
                    </motion.div>
                    <div>
                      <h3 className={`text-3xl md:text-4xl font-black ${
                        theme === 'dark' ? 'text-white' : 'text-slate-800'
                      }`}>
                        Student Success Features
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { 
                        title: 'Personalized Learning Paths', 
                        description: 'AI-powered recommendations based on your goals, learning style, and progress',
                        icon: '🎨',
                        color: 'from-indigo-500 to-purple-500'
                      },
                      { 
                        title: '24/7 Support', 
                        description: 'Round-the-clock assistance from our dedicated support team and community',
                        icon: '🕐',
                        color: 'from-blue-500 to-cyan-500'
                      },
                      { 
                        title: 'Community Learning', 
                        description: 'Connect with peers, mentors, and industry professionals in our vibrant community',
                        icon: '🤝',
                        color: 'from-green-500 to-emerald-500'
                      },
                      { 
                        title: 'Lifetime Access', 
                        description: 'Keep learning with lifetime access to course materials, updates, and new content',
                        icon: '♾️',
                        color: 'from-pink-500 to-rose-500'
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="group/item"
                      >
                        <div className={`p-6 rounded-2xl transition-all duration-300 ${
                          theme === 'dark' 
                            ? 'bg-slate-700/30 hover:bg-slate-700/50' 
                            : 'bg-white/50 hover:bg-white/80'
                        } backdrop-blur-sm border border-slate-500/20 hover:border-slate-400/30 group-hover/item:scale-[1.02]`}>
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: -10 }}
                              className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-xl shadow-lg`}
                            >
                              {item.icon}
                            </motion.div>
                            <div className="flex-1">
                              <h4 className={`font-bold text-xl mb-2 ${
                                theme === 'dark' ? 'text-white' : 'text-slate-800'
                              }`}>
                                {item.title}
                              </h4>
                              <p className={`text-base leading-relaxed ${
                                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-blue-500' : 'bg-blue-300'
          }`}></div>
          <div className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            theme === 'dark' ? 'bg-purple-500' : 'bg-purple-300'
          }`}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
              >
                <span className="text-2xl">🚀</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                  Start Your Journey
                </span>
              </motion.div>

              <h2 className={`text-5xl md:text-6xl font-black mb-8 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Transform</span> Your Career?
              </h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className={`text-xl md:text-2xl mb-12 leading-relaxed ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Join thousands of successful graduates who transformed their careers with OSOP Coding
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link 
                  to="/courses" 
                  className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 overflow-hidden block text-lg"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    🚀 Explore Our Courses
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
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/contact" 
                  className={`px-10 py-5 rounded-2xl font-bold border-2 backdrop-blur-sm transition-all duration-500 text-lg relative overflow-hidden group ${
                    theme === 'dark'
                      ? 'border-blue-500/50 text-blue-400 hover:bg-blue-900/30 hover:border-blue-400 shadow-lg shadow-blue-900/10'
                      : 'border-blue-600/50 text-blue-700 hover:bg-blue-100/50 hover:border-blue-600 shadow-lg shadow-blue-200/10'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    💬 Get Free Consultation
                  </span>
                  <motion.div
                    className={`absolute inset-0 ${
                      theme === 'dark' ? 'bg-blue-900/15' : 'bg-blue-100/20'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Additional Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {[
                { number: '15K+', label: 'Students', icon: '👥' },
                { number: '97%', label: 'Success Rate', icon: '🎯' },
                { number: '500+', label: 'Companies', icon: '🏢' },
                { number: '25+', label: 'Countries', icon: '🌍' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-2xl md:text-3xl font-black mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {stat.number}
                  </div>
                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className={`py-24 relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800/30' : 'bg-blue-50/50'}`}>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className={`absolute top-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-orange-500' : 'bg-orange-300'
          }`}></div>
          <div className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-15 ${
            theme === 'dark' ? 'bg-red-500' : 'bg-red-300'
          }`}></div>
          
          {/* Team Pattern Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme === 'dark' ? 'ffffff' : '000000'}' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='4'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='60' cy='20' r='2'/%3E%3Ccircle cx='20' cy='60' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 mb-6"
            >
              <span className="text-2xl">👥</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                Our Team
              </span>
            </motion.div>
            
            <h2 className={`text-5xl md:text-6xl font-black mb-8 ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">Expert Team</span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Industry veterans and passionate educators dedicated to your success
            </motion.p>
          </motion.div>

          <EnhancedTeamCarousel team={teamMembers} theme={theme} />
        </div>
      </section>
    </div>
  );
};

// Enhanced Team Carousel Component with improved slider functionality
interface EnhancedTeamCarouselProps {
  team: Array<{
    name: string;
    role: string;
    image: string;
    description: string;
    expertise: string[];
    social: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    }
  }>;
  theme: string;
}

const EnhancedTeamCarousel: React.FC<EnhancedTeamCarouselProps> = ({ team, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isFlipped, setIsFlipped] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check viewport size for responsive behavior
  useEffect(() => {
    const checkViewportSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkViewportSize();
    window.addEventListener('resize', checkViewportSize);
    return () => window.removeEventListener('resize', checkViewportSize);
  }, []);

  // Get visible count based on screen size
  const getVisibleCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    if (window.innerWidth >= 1024 && window.innerWidth < 1280) return 3;
    return 4; // Large screens
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, team.length - visibleCount);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoplay || isPaused || team.length <= visibleCount) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, isPaused, maxIndex, team.length, visibleCount]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Handle touch events for swipe navigation
  useEffect(() => {
    if (!carouselRef.current) return;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const swipeDistance = touchStartX.current - touchEndX.current;
      
      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };
    
    const element = carouselRef.current;
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Calculate the percentage to move per slide
  const slidePercentage = 100 / visibleCount;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div 
        ref={carouselRef}
        className="overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex"
          animate={{
            x: `-${currentIndex * slidePercentage}%`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.6
          }}
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3 md:px-4"
              style={{ 
                width: `${100 / visibleCount}%`,
                minWidth: `${100 / visibleCount}%`
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group h-full"
              >
                <div
                  className={`relative rounded-3xl overflow-hidden h-full min-h-[500px] md:min-h-[550px] ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50' 
                      : 'bg-gradient-to-br from-white/80 to-slate-50/80 border border-slate-200/50'
                  } backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 cursor-pointer`}
                  onClick={() => setIsFlipped(isFlipped === index ? null : index)}
                >
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 animate-pulse"></div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="absolute top-4 right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  ></motion.div>

                  <AnimatePresence mode="wait">
                    {isFlipped === index ? (
                      // Back of card - detailed info
                      <motion.div
                        key="back"
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 p-6 md:p-8 flex flex-col justify-center"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="text-center mb-6">
                          <h3 className={`text-2xl md:text-3xl font-black mb-2 ${
                            theme === 'dark' ? 'text-white' : 'text-slate-800'
                          }`}>
                            {member.name}
                          </h3>
                          <p className={`text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500`}>
                            {member.role}
                          </p>
                        </div>
                        
                        <p className={`text-base md:text-lg leading-relaxed mb-6 text-center ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {member.description}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className={`text-lg font-bold mb-4 text-center ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          }`}>
                            Expertise:
                          </h4>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {member.expertise.slice(0, 6).map((skill, i) => (
                              <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className={`px-3 py-1.5 text-sm rounded-full font-medium ${
                                  theme === 'dark'
                                    ? 'bg-orange-900/30 text-orange-400 border border-orange-800/50'
                                    : 'bg-orange-100 text-orange-700 border border-orange-200'
                                }`}
                              >
                                {skill}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-4 justify-center mt-auto">
                          {member.social.linkedin && (
                            <motion.a 
                              href={member.social.linkedin} 
                              whileHover={{ scale: 1.1, y: -2 }}
                              className={`p-3 rounded-xl transition-colors ${
                                theme === 'dark'
                                  ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/40'
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                              </svg>
                            </motion.a>
                          )}
                          {member.social.twitter && (
                            <motion.a 
                              href={member.social.twitter} 
                              whileHover={{ scale: 1.1, y: -2 }}
                              className={`p-3 rounded-xl transition-colors ${
                                theme === 'dark'
                                  ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/40'
                                  : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                              }`}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </motion.a>
                          )}
                          {member.social.github && (
                            <motion.a 
                              href={member.social.github} 
                              whileHover={{ scale: 1.1, y: -2 }}
                              className={`p-3 rounded-xl transition-colors ${
                                theme === 'dark'
                                  ? 'bg-slate-700/50 text-slate-400 hover:bg-slate-600/60'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                              </svg>
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      // Front of card - basic info
                      <motion.div
                        key="front"
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 0 }}
                        exit={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 flex flex-col"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        {/* Profile Image */}
                        <div className="relative h-64 md:h-72 overflow-hidden">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Floating Badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold shadow-lg"
                          >
                            Expert
                          </motion.div>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col">
                          <div className="text-center mb-4">
                            <h3 className={`text-xl md:text-2xl font-black mb-2 ${
                              theme === 'dark' ? 'text-white' : 'text-slate-800'
                            }`}>
                              {member.name}
                            </h3>
                            <p className={`text-base md:text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500`}>
                              {member.role}
                            </p>
                          </div>
                          
                          {/* Top Skills */}
                          <div className="flex flex-wrap gap-2 justify-center mb-6">
                            {member.expertise.slice(0, 3).map((skill, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 text-xs rounded-full font-medium ${
                                  theme === 'dark'
                                    ? 'bg-slate-700/50 text-slate-300'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          {/* Click to Learn More */}
                          <div className="mt-auto text-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                theme === 'dark'
                                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-500/30'
                                  : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 hover:from-orange-200 hover:to-red-200 border border-orange-200'
                              } backdrop-blur-sm`}
                            >
                              Click to Learn More →
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Controls - Only show if there are more items than visible */}
      {team.length > visibleCount && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 md:p-4 rounded-full transition-all duration-300 ${
              currentIndex === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-110'
            } ${
              theme === 'dark'
                ? 'bg-slate-800/90 text-white hover:bg-slate-700 border border-slate-600'
                : 'bg-white/90 text-slate-800 hover:bg-white border border-slate-200'
            } backdrop-blur-sm shadow-xl`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 md:p-4 rounded-full transition-all duration-300 ${
              currentIndex === maxIndex 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-110'
            } ${
              theme === 'dark'
                ? 'bg-slate-800/90 text-white hover:bg-slate-700 border border-slate-600'
                : 'bg-white/90 text-slate-800 hover:bg-white border border-slate-200'
            } backdrop-blur-sm shadow-xl`}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 scale-125 shadow-lg'
                    : theme === 'dark'
                      ? 'bg-slate-600 hover:bg-slate-500'
                      : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-800/50 text-white hover:bg-slate-700/50 border border-slate-600/50'
                  : 'bg-white/50 text-slate-800 hover:bg-white/80 border border-slate-200/50'
              } backdrop-blur-sm shadow-lg hover:shadow-xl`}
            >
              <span className="text-lg">
                {autoplay ? '⏸️' : '▶️'}
              </span>
              {autoplay ? 'Pause' : 'Play'} Auto-slide
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AboutPage; 
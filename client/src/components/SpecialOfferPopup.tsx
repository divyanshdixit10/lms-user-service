import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { toast } from 'react-hot-toast';

interface SpecialOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpecialOfferPopup: React.FC<SpecialOfferPopupProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  console.log('SpecialOfferPopup render:', { isOpen, theme });

  // Countdown timer effect
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer when it reaches 0
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // Auto-close popup after 15 seconds
  useEffect(() => {
    if (!isOpen) return;

    const autoCloseTimer = setTimeout(() => {
      onClose();
    }, 15000); // 15 seconds

    return () => clearTimeout(autoCloseTimer);
  }, [isOpen, onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('OSOP50');
    toast.success('Coupon code copied! 🎉', {
      duration: 3000,
      position: 'top-center',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-72 sm:w-80 max-w-sm rounded-xl overflow-hidden shadow-2xl my-2 ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800' 
                : 'bg-gradient-to-br from-white via-blue-50 to-indigo-50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            aria-label="Close offer popup"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header with gradient background */}
          <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-2 sm:p-3 text-white">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ 
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/10 rounded-full"
              />
            </div>

            <div className="relative z-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-0.5">🎉 SPECIAL OFFER!</h2>
              </motion.div>
              <p className="text-xs sm:text-sm font-semibold">Limited Time Deal</p>
            </div>
          </div>

          {/* Main content */}
          <div className="p-2 sm:p-3">
            {/* Discount badge */}
            <div className="text-center mb-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                  UP TO 90% OFF
                </div>
              </motion.div>
              <p className={`mt-1 text-xs font-medium ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                On All Premium Courses
              </p>
            </div>

            {/* Countdown timer */}
            <div className="mb-2">
              <p className={`text-center text-xs font-medium mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Offer Expires In:
              </p>
              <div className="flex justify-center space-x-1 sm:space-x-2">
                {[
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={item.label} className="text-center">
                    <motion.div
                      key={item.value}
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center font-bold text-xs sm:text-sm ${
                        theme === 'dark' 
                          ? 'bg-slate-700 text-white' 
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {item.value.toString().padStart(2, '0')}
                    </motion.div>
                    <p className={`text-xs mt-1 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon code */}
            <div className="mb-3">
              <p className={`text-center text-xs font-medium mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Use Coupon Code:
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className={`px-2 py-1 rounded border-2 border-dashed font-mono text-xs font-bold ${
                  theme === 'dark' 
                    ? 'border-blue-400 bg-blue-900/20 text-blue-400' 
                    : 'border-blue-500 bg-blue-50 text-blue-600'
                }`}>
                  OSOP50
                </div>
                <button
                  onClick={copyToClipboard}
                  className={`p-1 rounded transition-colors ${
                    theme === 'dark'
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                  title="Copy coupon code"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="space-y-1.5">
              <a
                href="https://gontq.courses.store/649688?utm_source=other&utm_medium=tutor-course-referral&utm_campaign=course-overview-webapp"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-1.5 px-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded transition-all duration-300 transform hover:scale-105 text-center shadow-lg text-xs"
              >
                🚀 Claim Offer Now
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }}
                className={`w-full py-1 px-3 rounded font-medium transition-colors text-xs ${
                  theme === 'dark'
                    ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                Browse Courses First
              </button>
            </div>

            {/* Fine print */}
            <p className={`text-xs text-center mt-1 ${
              theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
            }`}>
              *Offer valid for new enrollments only.
            </p>
          </div>
        </motion.div>
        </div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpecialOfferPopup; 
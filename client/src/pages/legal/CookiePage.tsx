import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../../components/ui/GlassCard';
import ParticleBackground from '../../components/ui/ParticleBackground';

const CookiePage: React.FC = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: "1. What Are Cookies?",
      content: `Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.

      Cookies contain information that is transferred to your device's hard drive and help us:
      • Recognize you when you return to our website
      • Remember your preferences and settings
      • Understand which parts of our website are most popular
      • Improve our services and user experience`
    },
    {
      title: "2. Types of Cookies We Use",
      content: `We use different types of cookies for various purposes:

      Essential Cookies:
      • Required for the website to function properly
      • Enable core functionality like security, network management, and accessibility
      • Cannot be disabled without affecting website functionality

      Performance Cookies:
      • Help us understand how visitors interact with our website
      • Collect anonymous information about page visits and user behavior
      • Allow us to improve our website performance

      Functional Cookies:
      • Remember your preferences and choices
      • Provide enhanced features and personalization
      • Store login information and language preferences

      Marketing Cookies:
      • Track your browsing habits to show relevant advertisements
      • Measure the effectiveness of our marketing campaigns
      • Share information with advertising partners`
    },
    {
      title: "3. First-Party and Third-Party Cookies",
      content: `First-Party Cookies:
      • Set directly by OSOP Learning
      • Used to provide core website functionality
      • Help us analyze website performance and user behavior

      Third-Party Cookies:
      • Set by external services we use
      • Include analytics tools (Google Analytics)
      • Social media plugins and sharing buttons
      • Payment processing services
      • Customer support chat systems

      We carefully select our third-party partners and ensure they comply with privacy standards.`
    },
    {
      title: "4. How We Use Cookies",
      content: `We use cookies to:

      Authentication and Security:
      • Keep you logged in during your session
      • Protect against fraudulent activity
      • Ensure secure access to your account

      Personalization:
      • Remember your course preferences
      • Customize content based on your interests
      • Store your language and region settings

      Analytics and Performance:
      • Track website usage and performance
      • Identify popular content and features
      • Understand user journey and behavior patterns

      Marketing and Communication:
      • Show relevant course recommendations
      • Measure effectiveness of our campaigns
      • Provide targeted content and offers`
    },
    {
      title: "5. Cookie Duration",
      content: `Cookies have different lifespans:

      Session Cookies:
      • Temporary cookies that expire when you close your browser
      • Used for essential website functionality
      • Do not store personal information permanently

      Persistent Cookies:
      • Remain on your device for a specified period
      • Remember your preferences between visits
      • Can last from a few days to several years

      We regularly review and update cookie expiration periods to ensure they are necessary and proportionate.`
    },
    {
      title: "6. Managing Your Cookie Preferences",
      content: `You have control over cookies and can manage them in several ways:

      Browser Settings:
      • Most browsers allow you to view, delete, and block cookies
      • You can set your browser to notify you when cookies are being used
      • Instructions vary by browser (Chrome, Firefox, Safari, Edge)

      Our Cookie Preference Center:
      • Access through the cookie banner on our website
      • Choose which types of cookies to accept or reject
      • Update your preferences at any time

      Opt-Out Tools:
      • Use industry opt-out tools for advertising cookies
      • Visit youronlinechoices.com or aboutads.info
      • Note that opting out may affect website functionality`
    },
    {
      title: "7. Impact of Disabling Cookies",
      content: `Disabling cookies may affect your experience on our website:

      Essential Cookies:
      • Website may not function properly
      • Unable to log in or access your account
      • Security features may be compromised

      Performance Cookies:
      • We cannot improve website performance
      • Unable to identify and fix technical issues
      • Limited ability to optimize user experience

      Functional Cookies:
      • Loss of personalized features
      • Need to re-enter preferences each visit
      • Reduced website functionality

      Marketing Cookies:
      • May see less relevant advertisements
      • Unable to track campaign effectiveness
      • Limited personalized content recommendations`
    },
    {
      title: "8. Cookies and Personal Data",
      content: `Most cookies we use do not contain personal information that can identify you directly. However, some cookies may be linked to your account or profile information.

      We treat cookie data in accordance with our Privacy Policy and applicable data protection laws. This includes:
      • Obtaining appropriate consent for non-essential cookies
      • Providing clear information about cookie purposes
      • Allowing you to withdraw consent at any time
      • Implementing appropriate security measures`
    },
    {
      title: "9. Updates to This Cookie Policy",
      content: `We may update this Cookie Policy from time to time to reflect:
      • Changes in our cookie practices
      • New technologies or services
      • Legal or regulatory requirements
      • Improvements to our website functionality

      When we make significant changes, we will notify you through:
      • Updated cookie banner on our website
      • Email notification to registered users
      • Notice on our website homepage
      • Updated "Last Modified" date on this policy`
    },
    {
      title: "10. Contact Us About Cookies",
      content: `If you have questions about our use of cookies or this Cookie Policy, please contact us:

      Email: cookies@osop.com
      Phone: +91 98765 43210
      Address: OSOP Learning Center, MG Road, Indore, Madhya Pradesh 452001

      For technical support with cookie settings:
      Email: support@osop.com
      Live Chat: Available on our website 24/7`
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 lg:pt-24 lg:pb-40">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={40}
            colorScheme={theme === 'dark' ? 'purple' : 'blue'}
            connectParticles={true}
            interactivity={false}
            className="opacity-20"
          />
          
          {/* Gradient overlays */}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80' 
              : 'bg-gradient-to-br from-white/90 via-indigo-50/80 to-purple-50/90'
          }`}></div>
        </div>

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
                  ? 'bg-indigo-900/30 text-indigo-400 border border-indigo-800/50'
                  : 'bg-indigo-50/80 text-indigo-700 border border-indigo-200/50'
              }`}>
                🍪 Cookie Information
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Cookie Policy</span>
              </nav>
            </motion.div>
            
            {/* Main heading */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Policy</span>
            </h1>
            
            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-12"
            >
              <p className={`text-xl md:text-2xl font-light leading-relaxed max-w-4xl mx-auto ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Learn how we use cookies to enhance your experience and how you can 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> control your preferences</span>
              </p>
              
              <div className={`mt-6 text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Last updated: January 2024
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Content */}
      <section className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40' : 'bg-gradient-to-br from-indigo-50/80 via-white to-purple-50/80'
      }`}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="mb-12"
              >
                <GlassCard className="p-8">
                  <h2 className={`text-2xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-800'
                  }`}>
                    {section.title}
                  </h2>
                  <div className={`prose prose-lg max-w-none ${
                    theme === 'dark' ? 'prose-invert' : 'prose-slate'
                  }`}>
                    <p className={`leading-relaxed whitespace-pre-line ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {section.content}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Cookie Preferences Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 text-center"
          >
            <GlassCard className="p-12 max-w-2xl mx-auto">
              <h3 className={`text-3xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}>
                Manage Your Cookie Preferences
              </h3>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                You can control which cookies we use and update your preferences at any time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  } shadow-lg hover:shadow-xl`}
                >
                  Cookie Preferences
                </button>
                <Link
                  to="/contact"
                  className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white'
                      : 'border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                  }`}
                >
                  Contact Support
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CookiePage; 
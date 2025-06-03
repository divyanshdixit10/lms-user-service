import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../../components/ui/GlassCard';
import ParticleBackground from '../../components/ui/ParticleBackground';

const TermsPage: React.FC = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using the OSOP Learning platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials on OSOP Learning's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
      • Modify or copy the materials
      • Use the materials for any commercial purpose or for any public display (commercial or non-commercial)
      • Attempt to decompile or reverse engineer any software contained on the website
      • Remove any copyright or other proprietary notations from the materials`
    },
    {
      title: "3. Course Access and Content",
      content: `OSOP Learning provides access to educational content, courses, and learning materials. By enrolling in our courses, you agree to:
      
      • Use the content solely for personal educational purposes
      • Not share, distribute, or resell course materials
      • Respect intellectual property rights of instructors and content creators
      • Maintain the confidentiality of any proprietary information shared during courses`
    },
    {
      title: "4. User Accounts",
      content: `When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party.`
    },
    {
      title: "5. Payment and Refunds",
      content: `Course fees are clearly stated on our platform. Payment is required before accessing premium content. We offer a 7-day money-back guarantee for most courses, subject to our refund policy. Refunds will be processed within 5-7 business days of approval.`
    },
    {
      title: "6. Prohibited Uses",
      content: `You may not use our service:
      
      • For any unlawful purpose or to solicit others to perform unlawful acts
      • To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
      • To infringe upon or violate our intellectual property rights or the intellectual property rights of others
      • To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
      • To submit false or misleading information`
    },
    {
      title: "7. Content Liability",
      content: `We are not responsible for any content posted by users on our platform. However, we reserve the right to monitor, edit, or remove any content that violates our community guidelines or these terms of service.`
    },
    {
      title: "8. Privacy Policy",
      content: `Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your personal information.`
    },
    {
      title: "9. Termination",
      content: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.`
    },
    {
      title: "10. Changes to Terms",
      content: `OSOP Learning reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these Terms of Service.`
    },
    {
      title: "11. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at:
      
      Email: legal@osop.com
      Phone: +91 98765 43210
      Address: OSOP Learning Center, MG Road, Indore, Madhya Pradesh 452001`
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
            colorScheme={theme === 'dark' ? 'blue' : 'purple'}
            connectParticles={true}
            interactivity={false}
            className="opacity-20"
          />
          
          {/* Gradient overlays */}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80' 
              : 'bg-gradient-to-br from-white/90 via-blue-50/80 to-purple-50/90'
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
                  ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
                  : 'bg-blue-50/80 text-blue-700 border border-blue-200/50'
              }`}>
                ⚖️ Legal Documents
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Terms of Service</span>
              </nav>
            </motion.div>
            
            {/* Main heading */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500">Service</span>
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
                Please read these terms and conditions carefully before using our 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"> learning platform</span>
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

      {/* Terms Content */}
      <section className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40' : 'bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80'
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

          {/* Contact Section */}
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
                Questions About Our Terms?
              </h3>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                If you have any questions about these Terms of Service, please don't hesitate to contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  } shadow-lg hover:shadow-xl`}
                >
                  Contact Legal Team
                </Link>
                <a
                  href="mailto:legal@osop.com"
                  className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
                      : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  Email Us Directly
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage; 
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../../components/ui/GlassCard';
import ParticleBackground from '../../components/ui/ParticleBackground';

const PrivacyPage: React.FC = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us. This includes:

      • Personal Information: Name, email address, phone number, and billing information
      • Educational Data: Course progress, quiz results, certificates earned, and learning preferences
      • Technical Information: IP address, browser type, device information, and usage patterns
      • Communication Data: Messages sent through our platform, support tickets, and feedback`
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to:

      • Provide and improve our educational services
      • Process payments and manage your account
      • Send course updates, newsletters, and important notifications
      • Personalize your learning experience
      • Analyze platform usage to enhance our offerings
      • Comply with legal obligations and protect our rights
      • Provide customer support and respond to inquiries`
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:

      • With your consent or at your direction
      • With service providers who assist us in operating our platform
      • To comply with legal obligations or respond to lawful requests
      • To protect the rights, property, or safety of OSOP Learning, our users, or others
      • In connection with a business transfer or acquisition`
    },
    {
      title: "4. Data Security",
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:

      • Encryption of sensitive data in transit and at rest
      • Regular security assessments and updates
      • Access controls and authentication mechanisms
      • Employee training on data protection practices
      • Incident response procedures for security breaches`
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:

      • Remember your preferences and settings
      • Analyze website traffic and usage patterns
      • Provide personalized content and recommendations
      • Improve our services and user experience
      
      You can control cookie settings through your browser preferences.`
    },
    {
      title: "6. Data Retention",
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically:

      • Account information is retained while your account is active
      • Course data is kept to track your progress and provide certificates
      • Communication records are maintained for customer support purposes
      • Some data may be retained longer to comply with legal obligations`
    },
    {
      title: "7. Your Rights and Choices",
      content: `You have the following rights regarding your personal information:

      • Access: Request a copy of the personal information we hold about you
      • Correction: Update or correct inaccurate information
      • Deletion: Request deletion of your personal information (subject to legal requirements)
      • Portability: Receive your data in a structured, machine-readable format
      • Objection: Object to certain processing of your personal information
      • Withdrawal: Withdraw consent where processing is based on consent`
    },
    {
      title: "8. Children's Privacy",
      content: `Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.`
    },
    {
      title: "9. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.`
    },
    {
      title: "10. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date.`
    },
    {
      title: "11. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:

      Email: privacy@osop.com
      Phone: +91 98765 43210
      Address: OSOP Learning Center, MG Road, Indore, Madhya Pradesh 452001
      Data Protection Officer: dpo@osop.com`
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
              : 'bg-gradient-to-br from-white/90 via-purple-50/80 to-blue-50/90'
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
                  ? 'bg-purple-900/30 text-purple-400 border border-purple-800/50'
                  : 'bg-purple-50/80 text-purple-700 border border-purple-200/50'
              }`}>
                🔒 Privacy & Security
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Privacy Policy</span>
              </nav>
            </motion.div>
            
            {/* Main heading */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500">Policy</span>
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
                Your privacy is important to us. This policy explains how we collect, use, and protect your 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500"> personal information</span>
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

      {/* Privacy Content */}
      <section className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40' : 'bg-gradient-to-br from-purple-50/80 via-white to-blue-50/80'
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
                Privacy Questions or Concerns?
              </h3>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                If you have any questions about our privacy practices or want to exercise your rights, we're here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } shadow-lg hover:shadow-xl`}
                >
                  Contact Privacy Team
                </Link>
                <a
                  href="mailto:privacy@osop.com"
                  className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white'
                      : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                  }`}
                >
                  Email Privacy Officer
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage; 
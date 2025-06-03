import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../../components/ui/GlassCard';
import ParticleBackground from '../../components/ui/ParticleBackground';

const RefundPage: React.FC = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: "1. Refund Eligibility",
      content: `We offer refunds under the following conditions:

      7-Day Money-Back Guarantee:
      • Available for most courses within 7 days of purchase
      • Must be requested before completing 30% of the course content
      • Applies to first-time purchases only
      • Valid for individual course purchases and subscription plans

      Eligible Circumstances:
      • Technical issues preventing course access
      • Course content significantly different from description
      • Duplicate purchases made in error
      • Billing errors or unauthorized charges
      • Course cancellation by OSOP Learning

      Non-Eligible Circumstances:
      • Change of mind after completing significant course content
      • Failure to complete the course within the specified timeframe
      • Violation of our Terms of Service
      • Purchases made with promotional codes or during special offers (unless specified)`
    },
    {
      title: "2. Refund Process",
      content: `To request a refund, please follow these steps:

      Step 1: Contact Support
      • Email us at refunds@osop.com
      • Include your order number and reason for refund
      • Provide any relevant documentation or screenshots

      Step 2: Review Process
      • Our team will review your request within 2-3 business days
      • We may request additional information if needed
      • You will receive an email confirmation of our decision

      Step 3: Processing
      • Approved refunds are processed within 5-7 business days
      • Refunds are issued to the original payment method
      • You will receive a confirmation email once processed

      Required Information:
      • Full name and email address associated with the account
      • Order number or transaction ID
      • Detailed reason for the refund request
      • Any supporting documentation`
    },
    {
      title: "3. Refund Timeframes",
      content: `Different refund timeframes apply based on the type of purchase:

      Individual Courses:
      • 7 days from the date of purchase
      • Must not have completed more than 30% of course content
      • Includes downloadable materials and resources

      Subscription Plans:
      • 7 days from the start of the billing cycle
      • Prorated refunds may apply for annual subscriptions
      • Access to premium features will be revoked upon refund

      Live Classes and Workshops:
      • 24 hours before the scheduled start time
      • No refunds for missed sessions due to personal reasons
      • Rescheduling options may be available

      Certification Programs:
      • 14 days from enrollment for comprehensive programs
      • No refunds after receiving the certificate
      • Partial refunds may apply for multi-module programs`
    },
    {
      title: "4. Partial Refunds",
      content: `In certain circumstances, we may offer partial refunds:

      Course Bundles:
      • Refund for unused courses within the bundle
      • Completed courses will be deducted from the refund amount
      • Minimum refund amount of ₹500 applies

      Subscription Cancellations:
      • Prorated refunds for annual subscriptions cancelled within 30 days
      • Monthly subscriptions: refund for unused days in current cycle
      • No refunds for free trial periods

      Technical Issues:
      • Partial refunds for courses affected by extended downtime
      • Compensation for lost access time
      • Alternative solutions may be offered instead of refunds

      Special Circumstances:
      • Medical emergencies with proper documentation
      • Military deployment or relocation
      • Other exceptional circumstances reviewed case-by-case`
    },
    {
      title: "5. Non-Refundable Items",
      content: `The following items are not eligible for refunds:

      Digital Downloads:
      • E-books, PDFs, and downloadable resources once accessed
      • Software licenses and tools provided with courses
      • Templates, code samples, and project files

      Completed Services:
      • One-on-one mentoring sessions that have been conducted
      • Career counseling and resume review services
      • Completed assessments and evaluations

      Promotional Offers:
      • Courses purchased with discount codes (unless specified)
      • Free courses and promotional content
      • Gifts and vouchers (unless defective)

      Third-Party Services:
      • External certifications and exam fees
      • Third-party software subscriptions
      • Payment processing fees`
    },
    {
      title: "6. Refund Methods",
      content: `Refunds are processed using the following methods:

      Original Payment Method:
      • Credit/Debit cards: 5-7 business days
      • Digital wallets: 3-5 business days
      • Bank transfers: 7-10 business days
      • UPI payments: 1-3 business days

      Alternative Methods (if original method unavailable):
      • Bank transfer to verified account
      • Digital wallet credit
      • Course credit for future purchases
      • Gift voucher (with extended validity)

      International Payments:
      • May take 10-15 business days
      • Currency conversion rates may apply
      • Additional bank fees may be deducted

      Processing Fees:
      • No processing fees for eligible refunds
      • Bank charges for international transfers may apply
      • Third-party payment processor fees are non-refundable`
    },
    {
      title: "7. Course Credits and Vouchers",
      content: `As an alternative to monetary refunds, we may offer:

      Course Credits:
      • 100% value retention for future course purchases
      • Valid for 12 months from issue date
      • Can be combined with promotional offers
      • Transferable to family members

      Gift Vouchers:
      • 110% value for choosing voucher over refund
      • 18-month validity period
      • Can be used for any course or service
      • Shareable with friends and colleagues

      Upgrade Options:
      • Exchange current course for higher-value course
      • Pay difference for premium content
      • Access to exclusive workshops and events
      • Priority support and mentoring

      Benefits of Credits:
      • No expiration anxiety with extended validity
      • Additional value compared to refunds
      • Flexibility to choose from new course releases
      • Support for continued learning journey`
    },
    {
      title: "8. Dispute Resolution",
      content: `If you're not satisfied with our refund decision:

      Internal Review:
      • Request escalation to senior management
      • Provide additional evidence or documentation
      • Allow 5-7 business days for review
      • Receive detailed explanation of final decision

      External Mediation:
      • Contact your payment provider for chargeback
      • Seek assistance from consumer protection agencies
      • Use online dispute resolution platforms
      • Consider legal consultation for significant amounts

      Prevention Measures:
      • Read course descriptions carefully before purchase
      • Use free previews and trial content
      • Contact support for pre-purchase questions
      • Understand our refund policy before buying

      Good Faith Efforts:
      • We strive to resolve all disputes amicably
      • Open to reasonable compromise solutions
      • Committed to fair and transparent processes
      • Value long-term student relationships`
    },
    {
      title: "9. Special Circumstances",
      content: `We understand that exceptional situations may arise:

      Medical Emergencies:
      • Extended refund periods with medical documentation
      • Flexible rescheduling for live sessions
      • Pause subscription during recovery period
      • Compassionate consideration for family emergencies

      Technical Difficulties:
      • Full refunds for platform-related issues
      • Compensation for lost learning time
      • Alternative access methods when possible
      • Priority technical support

      Educational Institution Changes:
      • Refunds for students whose institutions change requirements
      • Flexibility for academic calendar conflicts
      • Group discount adjustments
      • Transfer options to suitable alternatives

      Economic Hardship:
      • Payment plan options instead of refunds
      • Scholarship and financial aid consideration
      • Extended payment terms
      • Community support program access`
    },
    {
      title: "10. Contact Information",
      content: `For refund requests and questions:

      Refund Support Team:
      Email: refunds@osop.com
      Phone: +91 98765 43210 (Mon-Fri, 9 AM - 6 PM)
      Live Chat: Available on our website 24/7

      Required Information for Faster Processing:
      • Order number or transaction ID
      • Email address associated with the purchase
      • Detailed reason for refund request
      • Any supporting documentation

      Response Times:
      • Initial acknowledgment: Within 24 hours
      • Review completion: 2-3 business days
      • Refund processing: 5-7 business days
      • Follow-up support: As needed

      Escalation Contact:
      Email: support-manager@osop.com
      For unresolved refund disputes`
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
            colorScheme={theme === 'dark' ? 'cyan' : 'blue'}
            connectParticles={true}
            interactivity={false}
            className="opacity-20"
          />
          
          {/* Gradient overlays */}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80' 
              : 'bg-gradient-to-br from-white/90 via-cyan-50/80 to-blue-50/90'
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
                  ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800/50'
                  : 'bg-cyan-50/80 text-cyan-700 border border-cyan-200/50'
              }`}>
                💰 Refund Information
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Refund Policy</span>
              </nav>
            </motion.div>
            
            {/* Main heading */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">Policy</span>
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
                We offer a fair and transparent refund policy to ensure your 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"> satisfaction and peace of mind</span>
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

      {/* Refund Content */}
      <section className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40' : 'bg-gradient-to-br from-cyan-50/80 via-white to-blue-50/80'
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

          {/* Refund Request Section */}
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
                Need to Request a Refund?
              </h3>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Our refund team is here to help you with any questions or requests you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:refunds@osop.com"
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                      : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  } shadow-lg hover:shadow-xl`}
                >
                  Request Refund
                </a>
                <Link
                  to="/contact"
                  className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white'
                      : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
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

export default RefundPage; 
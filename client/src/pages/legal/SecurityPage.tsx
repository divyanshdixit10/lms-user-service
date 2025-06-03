import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import GlassCard from '../../components/ui/GlassCard';
import ParticleBackground from '../../components/ui/ParticleBackground';

const SecurityPage: React.FC = () => {
  const { theme } = useTheme();

  const sections = [
    {
      title: "1. Data Encryption",
      content: `We use industry-standard encryption to protect your data:

      Data in Transit:
      • TLS 1.3 encryption for all data transmission
      • HTTPS protocol for all web communications
      • Secure API endpoints with certificate pinning
      • End-to-end encryption for sensitive communications

      Data at Rest:
      • AES-256 encryption for stored data
      • Encrypted database storage
      • Secure file storage with encryption keys
      • Regular encryption key rotation

      Payment Security:
      • PCI DSS compliant payment processing
      • Tokenization of payment information
      • No storage of credit card details on our servers
      • Secure payment gateways (Razorpay, Stripe)

      Communication Security:
      • Encrypted email communications
      • Secure messaging within the platform
      • Protected video streaming for courses
      • Secure file downloads and uploads`
    },
    {
      title: "2. Access Controls",
      content: `We implement strict access controls to protect your account:

      User Authentication:
      • Strong password requirements (minimum 8 characters)
      • Two-factor authentication (2FA) available
      • Account lockout after failed login attempts
      • Session timeout for inactive users

      Administrative Access:
      • Role-based access control (RBAC)
      • Principle of least privilege
      • Regular access reviews and audits
      • Secure administrative interfaces

      Account Security Features:
      • Login notifications and alerts
      • Device recognition and management
      • Suspicious activity monitoring
      • Account recovery with identity verification

      Data Access Logging:
      • Comprehensive audit trails
      • Real-time monitoring of data access
      • Automated alerts for unusual activity
      • Regular security log reviews`
    },
    {
      title: "3. Infrastructure Security",
      content: `Our platform is built on secure infrastructure:

      Cloud Security:
      • AWS/Azure cloud infrastructure with security certifications
      • Virtual private clouds (VPC) with network isolation
      • Regular security patches and updates
      • Automated backup and disaster recovery

      Network Security:
      • Firewalls and intrusion detection systems
      • DDoS protection and mitigation
      • Network segmentation and access controls
      • Regular penetration testing

      Server Security:
      • Hardened server configurations
      • Regular security updates and patches
      • Antivirus and anti-malware protection
      • Physical security at data centers

      Application Security:
      • Secure coding practices and code reviews
      • Regular vulnerability assessments
      • Web application firewalls (WAF)
      • Input validation and sanitization`
    },
    {
      title: "4. Privacy Protection",
      content: `We are committed to protecting your privacy:

      Data Minimization:
      • Collect only necessary personal information
      • Regular data retention policy reviews
      • Automatic deletion of expired data
      • Anonymization of analytics data

      User Rights:
      • Right to access your personal data
      • Right to correct inaccurate information
      • Right to delete your account and data
      • Right to data portability

      Third-Party Integrations:
      • Careful vetting of third-party services
      • Data processing agreements with vendors
      • Limited data sharing with explicit consent
      • Regular security assessments of partners

      Compliance:
      • GDPR compliance for European users
      • CCPA compliance for California residents
      • SOC 2 Type II certification
      • Regular compliance audits and assessments`
    },
    {
      title: "5. Incident Response",
      content: `We have comprehensive incident response procedures:

      Detection and Monitoring:
      • 24/7 security monitoring and alerting
      • Automated threat detection systems
      • Real-time log analysis and correlation
      • Regular security assessments and scans

      Response Procedures:
      • Immediate containment of security incidents
      • Forensic analysis and investigation
      • Coordination with law enforcement if needed
      • Communication with affected users

      Recovery and Remediation:
      • Rapid restoration of services
      • Implementation of additional security measures
      • Post-incident review and improvements
      • Documentation and lessons learned

      Notification Process:
      • Prompt notification of affected users
      • Transparent communication about incidents
      • Regular updates during incident resolution
      • Compliance with legal notification requirements`
    },
    {
      title: "6. Employee Security",
      content: `Our team follows strict security protocols:

      Background Checks:
      • Comprehensive background verification for all employees
      • Regular security clearance reviews
      • Confidentiality and non-disclosure agreements
      • Security awareness training programs

      Access Management:
      • Role-based access to systems and data
      • Regular access reviews and updates
      • Immediate access revocation upon termination
      • Secure remote work policies

      Training and Awareness:
      • Regular security training sessions
      • Phishing simulation exercises
      • Security best practices documentation
      • Incident reporting procedures

      Physical Security:
      • Secure office facilities with access controls
      • Clean desk and clear screen policies
      • Secure disposal of sensitive documents
      • Visitor management and escort procedures`
    },
    {
      title: "7. Third-Party Security",
      content: `We carefully manage third-party relationships:

      Vendor Assessment:
      • Security questionnaires and assessments
      • Due diligence reviews before engagement
      • Regular security audits of critical vendors
      • Contractual security requirements

      Data Processing Agreements:
      • Clear data handling and protection requirements
      • Limitation of data access and usage
      • Incident notification obligations
      • Right to audit and inspect security measures

      Service Provider Categories:
      • Cloud infrastructure providers (AWS, Azure)
      • Payment processors (Razorpay, Stripe)
      • Analytics and monitoring tools
      • Customer support and communication platforms

      Ongoing Monitoring:
      • Regular security assessments of vendors
      • Monitoring of vendor security incidents
      • Updates to security requirements as needed
      • Termination procedures for non-compliance`
    },
    {
      title: "8. User Security Best Practices",
      content: `Help us keep your account secure by following these practices:

      Password Security:
      • Use strong, unique passwords for your account
      • Enable two-factor authentication (2FA)
      • Avoid sharing your login credentials
      • Update passwords regularly

      Account Monitoring:
      • Review account activity regularly
      • Report suspicious activity immediately
      • Keep your contact information updated
      • Log out from shared or public devices

      Device Security:
      • Keep your devices updated with latest security patches
      • Use antivirus software on your computers
      • Avoid accessing your account on public Wi-Fi
      • Use secure, private networks when possible

      Phishing Protection:
      • Be cautious of suspicious emails or messages
      • Verify sender identity before clicking links
      • Type our website URL directly in your browser
      • Report phishing attempts to our security team`
    },
    {
      title: "9. Compliance and Certifications",
      content: `We maintain various security certifications and compliance standards:

      Industry Standards:
      • ISO 27001 Information Security Management
      • SOC 2 Type II compliance
      • PCI DSS for payment processing
      • OWASP security guidelines

      Regional Compliance:
      • GDPR (General Data Protection Regulation)
      • CCPA (California Consumer Privacy Act)
      • Indian IT Act and rules
      • Other applicable local regulations

      Regular Audits:
      • Annual third-party security audits
      • Penetration testing by certified professionals
      • Vulnerability assessments and remediation
      • Compliance reviews and updates

      Continuous Improvement:
      • Regular security policy updates
      • Implementation of new security technologies
      • Staff training on emerging threats
      • Industry best practice adoption`
    },
    {
      title: "10. Security Contact Information",
      content: `For security-related matters, please contact us:

      Security Team:
      Email: security@osop.com
      Phone: +91 98765 43210 (Security Hotline)
      Response Time: Within 4 hours for critical issues

      Vulnerability Reporting:
      Email: security-reports@osop.com
      Responsible disclosure program available
      Recognition for valid security findings
      Coordinated disclosure timeline

      Incident Reporting:
      Email: incidents@osop.com
      24/7 incident response team
      Immediate escalation for critical issues
      Regular status updates during incidents

      General Security Questions:
      Email: security-info@osop.com
      Security awareness and training resources
      Best practices and recommendations
      Policy clarifications and guidance

      Emergency Contact:
      Phone: +91 98765 43211 (24/7 Emergency Line)
      For immediate security threats or breaches
      Direct escalation to senior security team
      Coordination with law enforcement if needed`
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
            colorScheme={theme === 'dark' ? 'purple' : 'cyan'}
            connectParticles={true}
            interactivity={false}
            className="opacity-20"
          />
          
          {/* Gradient overlays */}
          <div className={`absolute inset-0 ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80' 
              : 'bg-gradient-to-br from-white/90 via-green-50/80 to-cyan-50/90'
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
                  ? 'bg-green-900/30 text-green-400 border border-green-800/50'
                  : 'bg-green-50/80 text-green-700 border border-green-200/50'
              }`}>
                🔐 Security & Protection
              </span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Security</span>
              </nav>
            </motion.div>
            
            {/* Main heading */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-slate-800'
            }`}>
              Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500">Measures</span>
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
                Your security is our top priority. Learn about the comprehensive measures we take to 
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-cyan-500"> protect your data and privacy</span>
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

      {/* Security Content */}
      <section className={`py-24 relative overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-slate-800/40 via-slate-900/30 to-slate-800/40' : 'bg-gradient-to-br from-green-50/80 via-white to-cyan-50/80'
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

          {/* Security Contact Section */}
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
                Report Security Issues
              </h3>
              <p className={`text-lg mb-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Found a security vulnerability? We appreciate responsible disclosure and will work with you to resolve any issues.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:security@osop.com"
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } shadow-lg hover:shadow-xl`}
                >
                  Report Vulnerability
                </a>
                <Link
                  to="/contact"
                  className={`px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-green-500 text-green-400 hover:bg-green-500 hover:text-white'
                      : 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  Contact Security Team
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage; 
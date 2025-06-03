import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TeamPage: React.FC = () => {
  const { theme } = useTheme();
  
  const teamMembers = [
    {
      name: 'Dr. Dharmendra Bajpai',
      role: 'Founder & Chief Mentor',
      image: 'https://via.placeholder.com/400x500/4f46e5/ffffff?text=Dr.+Bajpai',
      description: 'Visionary educator with 25+ years of experience in IT training. Ph.D in Computer Science with expertise in AI and educational technology.',
      expertise: ['Education Leadership', 'Curriculum Design', 'Technology Vision'],
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Academics',
      image: 'https://via.placeholder.com/400x500/6366f1/ffffff?text=Priya+Sharma',
      description: 'Former Microsoft Lead with 15 years in software development. Master\'s in Computer Applications with research in learning technologies.',
      expertise: ['Full Stack Development', 'AI/ML', 'Cloud Architecture'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Rajesh Kumar',
      role: 'Placement Director',
      image: 'https://via.placeholder.com/400x500/8b5cf6/ffffff?text=Rajesh+Kumar',
      description: 'Industry connector with vast experience in talent acquisition and corporate partnerships. MBA with specialty in HR and talent development.',
      expertise: ['Corporate Networking', 'Career Guidance', 'Industry Research'],
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    },
    {
      name: 'Anita Patel',
      role: 'Technical Director',
      image: 'https://via.placeholder.com/400x500/a855f7/ffffff?text=Anita+Patel',
      description: 'Tech innovator with expertise in emerging technologies. Former senior developer at Amazon with multiple patents in cloud technologies.',
      expertise: ['Web3 Technologies', 'DevOps', 'Blockchain'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Vikram Singh',
      role: 'Lead Instructor - Full Stack',
      image: 'https://via.placeholder.com/400x500/9333ea/ffffff?text=Vikram+Singh',
      description: 'Full stack expert with 12 years of development experience. Previously led engineering teams at multiple successful startups.',
      expertise: ['JavaScript/TypeScript', 'React/Node.js', 'System Architecture'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Aisha Khan',
      role: 'Lead Instructor - Data Science',
      image: 'https://via.placeholder.com/400x500/7e22ce/ffffff?text=Aisha+Khan',
      description: 'Data science specialist with background in statistical modeling and machine learning. PhD in Applied Mathematics from IIT Delhi.',
      expertise: ['Python', 'Machine Learning', 'Data Visualization'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
      }
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-1.5 ${
              theme === 'dark' 
                ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-800/50' 
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm'
            }`}>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Meet Our Team</span>
            </span>
          </div>
          
          <h1 className={`text-3xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-slate-800'
          }`}>The Minds Behind OSOP</h1>
          
          <p className={`max-w-3xl mx-auto text-lg ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Our diverse team of industry experts, educators, and tech enthusiasts are committed to providing the highest quality programming education. With decades of combined experience, we're passionate about empowering the next generation of developers.
          </p>
        </div>
        
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`${
                theme === 'dark'
                  ? 'bg-slate-800/70 border border-slate-700/50 hover:border-indigo-500/50'
                  : 'bg-white shadow-lg border border-slate-100 hover:border-indigo-300/80'
              } rounded-xl overflow-hidden group`}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-0 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70' 
                    : 'bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-50'
                }`}></div>
                
                {/* Social Links */}
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {member.social.linkedin && (
                    <a 
                      href={member.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-indigo-500 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.github && (
                    <a 
                      href={member.social.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-indigo-500 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-indigo-500 transition-colors duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>{member.name}</h3>
                
                <p className="text-indigo-500 font-medium mb-4">{member.role}</p>
                
                <p className={`mb-4 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>{member.description}</p>
                
                <div className="space-y-1">
                  <p className={`text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>Areas of Expertise:</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, i) => (
                      <span 
                        key={i}
                        className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark'
                            ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-800/50'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-20 text-center">
          <p className={`text-lg mb-6 ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Interested in joining our growing team of educators and tech experts?
          </p>
          
          <Link
            to="/contact"
            className={`inline-flex items-center px-6 py-3 rounded-lg ${
              theme === 'dark'
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            } transition-colors font-medium`}
          >
            <span>Explore Careers</span>
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamPage; 
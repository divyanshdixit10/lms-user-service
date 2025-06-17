import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhatIsOSOPPage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  // Mentor information
  const mentors = [
    {
      name: "Dr. Dharmendra Bajpai",
      title: "Founder & Director, OSOP",
      image: "https://www.osop.in/test/images/sir.jfif",
      qualifications: ["PhD in Computer Science", "Java Expert", "Software Architecture"],
      experience: "25+ Years Experience",
      studentsTrained: "25,000+ Students Trained",
      quote: "Excellence in Teaching, Excellence in Learning",
      description: "Over 25 years of rich professional teaching experience in technology education. Successfully trained IT engineers who are now placed in top tech companies worldwide including Google, Microsoft, Amazon, and more.",
      gradient: "from-blue-500 via-purple-500 to-indigo-600",
      bgGradient: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
    },
    {
      name: "Manish Bajpai",
      title: "Senior Technical Mentor & Co-Founder",
      image: "https://via.placeholder.com/200x200/4F46E5/FFFFFF?text=MB",
      qualifications: ["Full Stack Expert", "Industry Veteran", "System Design"],
      experience: "15+ Years Experience",
      studentsTrained: "10,000+ Students Mentored",
      quote: "Bridging the gap between theory and industry practice",
      description: "Specialized in full-stack development and modern web technologies. Expert in preparing students for real-world software development challenges and technical interviews at top companies.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
    },
    {
      name: "Vaibhav Jain",
      title: "Lead Technical Instructor",
      image: "https://via.placeholder.com/200x200/059669/FFFFFF?text=VJ",
      qualifications: ["Data Science Expert", "AI/ML Specialist", "Python Expert"],
      experience: "12+ Years Experience",
      studentsTrained: "8,000+ Students Guided",
      quote: "Empowering minds with cutting-edge technology",
      description: "Expert in Data Science, Machine Learning, and AI technologies. Passionate about making complex programming concepts simple and accessible to students from all backgrounds.",
      gradient: "from-orange-500 via-red-500 to-pink-600",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    }
  ];

  // Key stats with enhanced styling
  const stats = [
    { 
      number: "25,000+", 
      label: "Students Trained", 
      icon: "👨‍🎓",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    { 
      number: "95%", 
      label: "Placement Rate", 
      icon: "🎯",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    { 
      number: "500+", 
      label: "Hiring Partners", 
      icon: "🏢",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    { 
      number: "25+", 
      label: "Years Experience", 
      icon: "⭐",
      gradient: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ];

  // Enhanced features
  const features = [
    {
      icon: "💻",
      title: "Comprehensive Programming Curriculum",
      description: "From basics to advanced concepts in Java, Python, Web Development, Data Science, and more. Complete roadmap for becoming a skilled programmer.",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      icon: "🎓",
      title: "Online Learning Excellence",
      description: "Interactive online classes, recorded sessions, live doubt solving, and personalized mentorship. Learn programming from anywhere, anytime.",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
    },
    {
      icon: "🚀",
      title: "Industry-Ready Skills",
      description: "Hands-on projects, coding challenges, and real-world applications. Build a strong portfolio that impresses employers.",
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
    },
    {
      icon: "💼",
      title: "Career Support & Placement",
      description: "Resume building, interview preparation, mock interviews, and direct placement assistance with our 500+ hiring partners.",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
    }
  ];

  // Programming languages and technologies
  const technologies = [
    { name: "Java", icon: "☕", color: "from-orange-500 to-red-500" },
    { name: "Python", icon: "🐍", color: "from-blue-500 to-green-500" },
    { name: "JavaScript", icon: "⚡", color: "from-yellow-500 to-orange-500" },
    { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
    { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500" },
    { name: "Data Science", icon: "📊", color: "from-purple-500 to-pink-500" },
    { name: "Machine Learning", icon: "🤖", color: "from-indigo-500 to-purple-500" },
    { name: "Web Development", icon: "🌐", color: "from-teal-500 to-cyan-500" }
  ];

  // Contact information
  const contactInfo = [
    {
      title: "Corporate Head Office",
      address: "First Floor, Kohinoor Tower, Opp HDFC Bank, Rajmohalla Indore",
      phone: "+91 76490 98000",
      email: "info@osop.in",
      icon: "🏢",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Training Center",
      address: "2nd Floor, Sundaram Complex, Bhanwarkua Tower Square Road, Indore",
      phone: "+91 76490 99000",
      email: "info@osop.in",
      icon: "🎓",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-15 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-400 to-cyan-600 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              animate={floatingAnimation}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
                What is OSOP?
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-medium"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">OSOP</span> (Online School of Programming) is India's premier online programming education institute, 
              dedicated to transforming students into skilled programmers and helping them build successful careers in technology.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-4xl mx-auto">
                🎯 <strong>Our Mission:</strong> Making quality programming education accessible to everyone through innovative online learning methods, 
                expert mentorship, and industry-focused curriculum.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                to="/courses"
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10">🚀 Explore Courses</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                to="/placement"
                className="group px-10 py-5 border-3 border-blue-600 text-blue-600 dark:text-blue-400 rounded-2xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 backdrop-blur-sm bg-white/20 dark:bg-gray-800/20 hover:shadow-2xl transform hover:scale-105"
              >
                💼 View Placements
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className={`text-center p-8 ${stat.bgColor} backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/20 relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-5xl mb-4"
                >
                  {stat.icon}
                </motion.div>
                <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}>
                  {stat.number}
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-bold text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technologies We Teach Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-indigo-900/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8"
            >
              💻 Technologies We Teach
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12 max-w-4xl mx-auto"
            >
              Master the most in-demand programming languages and technologies with our comprehensive online curriculum
            </motion.p>
            
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 text-center group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                    className="text-4xl mb-3 relative z-10"
                  >
                    {tech.icon}
                  </motion.div>
                  <h3 className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent relative z-10`}>
                    {tech.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="text-center bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🎯 Why Choose Online Learning at OSOP?
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Learn programming from the comfort of your home with live interactive classes, recorded sessions for revision, 
                personalized doubt solving, and direct mentorship from industry experts. Our online school provides the same quality 
                education as traditional institutes with the flexibility of learning at your own pace.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Mentors Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-16"
            >
              🌟 Meet Our Expert Mentors
            </motion.h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              {mentors.map((mentor, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className={`bg-gradient-to-br ${mentor.bgGradient} backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/20 relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Enhanced Mentor Photo */}
                  <div className="relative w-40 h-40 mx-auto mb-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className={`absolute -inset-4 rounded-full bg-gradient-to-r ${mentor.gradient} opacity-30 blur-lg`}
                    ></motion.div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl"
                    >
                      <img 
                        src={mentor.image}
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className={`absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r ${mentor.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-2xl">✨</span>
                    </div>
                  </div>

                  {/* Enhanced Mentor Info */}
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                      {mentor.name}
                    </h3>
                    <p className={`text-lg font-bold bg-gradient-to-r ${mentor.gradient} bg-clip-text text-transparent mb-6`}>
                      {mentor.title}
                    </p>

                    {/* Enhanced Qualifications */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                      {mentor.qualifications.map((qual, qualIndex) => (
                        <motion.span 
                          key={qualIndex}
                          whileHover={{ scale: 1.1 }}
                          className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${mentor.gradient} text-white shadow-lg`}
                        >
                          {qual}
                        </motion.span>
                      ))}
                    </div>

                    {/* Enhanced Experience Stats */}
                    <div className="grid grid-cols-1 gap-4 mb-6">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20"
                      >
                        <div className={`text-lg font-black bg-gradient-to-r ${mentor.gradient} bg-clip-text text-transparent`}>
                          {mentor.experience}
                        </div>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="text-center p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20"
                      >
                        <div className={`text-lg font-black bg-gradient-to-r ${mentor.gradient} bg-clip-text text-transparent`}>
                          {mentor.studentsTrained}
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Quote */}
                    <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-6 font-medium">
                      "✨ {mentor.quote} ✨"
                    </blockquote>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                      {mentor.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 dark:from-purple-900/10 dark:via-pink-900/10 dark:to-red-900/10 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-red-500/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-16"
            >
              🔥 Why Choose OSOP?
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className={`p-8 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 relative overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                    className="text-6xl mb-6 relative z-10"
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium text-lg relative z-10">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-16"
            >
              📞 Get In Touch
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="p-8 bg-gradient-to-br from-white/70 to-white/50 dark:from-gray-800/70 dark:to-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-center mb-6 relative z-10">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-16 h-16 bg-gradient-to-r ${contact.gradient} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
                    >
                      <span className="text-white text-3xl">{contact.icon}</span>
                    </motion.div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                      {contact.title}
                    </h3>
                  </div>
                  <div className="space-y-4 relative z-10">
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="flex items-start p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                    >
                      <span className="text-2xl mr-4">📍</span>
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-lg">{contact.address}</p>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="flex items-center p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                    >
                      <span className="text-2xl mr-4">📞</span>
                      <a href={`tel:${contact.phone}`} className={`text-xl font-bold bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent hover:underline`}>
                        {contact.phone}
                      </a>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 10 }}
                      className="flex items-center p-4 rounded-2xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm"
                    >
                      <span className="text-2xl mr-4">✉️</span>
                      <a href={`mailto:${contact.email}`} className={`text-xl font-bold bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent hover:underline`}>
                        {contact.email}
                      </a>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full bg-gradient-to-r from-blue-600 via-purple-600 via-pink-600 to-indigo-600 opacity-80"
            style={{ backgroundSize: "400% 400%" }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              animate={floatingAnimation}
              className="text-5xl md:text-7xl font-black text-white mb-8"
            >
              🎓 Join OSOP - Online School of Programming
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-3xl text-blue-100 mb-12 max-w-4xl mx-auto font-medium leading-relaxed"
            >
              Transform your career with India's premier online programming education. 
              Learn from expert mentors, build real projects, and get placed in top tech companies.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/courses"
                  className="group px-12 py-6 bg-white text-blue-600 rounded-2xl font-black text-xl hover:shadow-2xl transform transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">💻 View Programming Courses</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="group px-12 py-6 border-4 border-white text-white rounded-2xl font-black text-xl hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm"
                >
                  🎓 Enroll Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WhatIsOSOPPage; 
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const PricingPage: React.FC = () => {
  const { theme } = useTheme();

  const plans = [
    {
      id: 1,
      name: 'Basic',
      price: 29,
      description: 'Perfect for beginners starting their coding journey',
      features: [
        'Access to basic courses',
        'Community forum access',
        'Monthly coding challenges',
        'Basic project templates',
        'Email support',
      ],
      popular: false,
    },
    {
      id: 2,
      name: 'Pro',
      price: 49,
      description: 'Most popular choice for aspiring developers',
      features: [
        'All Basic features',
        'Live interactive classes',
        'Project-based learning',
        'Code reviews',
        'Priority email support',
        'Career guidance sessions',
      ],
      popular: true,
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 99,
      description: 'Complete package for serious developers',
      features: [
        'All Pro features',
        '1-on-1 mentorship',
        'Custom learning path',
        'Job placement assistance',
        'Resume review',
        'Mock interviews',
        'Lifetime access',
      ],
      popular: false,
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-12`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Choose Your Learning Path
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Flexible plans designed to help you learn at your own pace and budget
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl ${
                theme === 'dark' 
                  ? 'bg-secondary-800' 
                  : 'bg-white'
              } shadow-xl overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="text-xs font-semibold bg-primary-500 text-white px-3 py-1 rounded-bl-lg">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    /month
                  </span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg 
                        className="w-5 h-5 text-primary-500 mr-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/signup"
                  className={`block w-full py-3 px-4 rounded-lg text-center font-medium ${
                    plan.popular
                      ? 'bg-primary-500 hover:bg-primary-600 text-white'
                      : theme === 'dark'
                        ? 'bg-secondary-700 hover:bg-secondary-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  } transition-colors`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                question: 'Can I switch plans later?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
              },
              {
                question: 'Is there a refund policy?',
                answer: "We offer a 7-day money-back guarantee if you're not satisfied with our service.",
              },
              {
                question: 'Do I get access to all courses?',
                answer: 'Access to courses depends on your plan. Pro and Enterprise plans include access to all courses.',
              },
              {
                question: 'How long do I have access to the courses?',
                answer: 'You have access to the courses as long as your subscription is active. Enterprise plan includes lifetime access.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg ${
                  theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {faq.question}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Still have questions?
          </h2>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Contact our support team and we'll be happy to help you choose the right plan.
          </p>
          <Link
            to="/contact"
            className={`inline-flex items-center px-6 py-3 rounded-lg ${
              theme === 'dark'
                ? 'bg-secondary-700 hover:bg-secondary-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            } font-medium transition-colors`}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage; 
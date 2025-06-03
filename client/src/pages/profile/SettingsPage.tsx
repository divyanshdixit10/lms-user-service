import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Frontend developer passionate about React and TypeScript. Currently learning advanced JavaScript patterns and Node.js.',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    courseReminders: true,
    newCourses: false,
    promotions: false
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showCourses: true,
    showProgress: true
  });
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('profile');
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle notification changes
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handle privacy changes
  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    setPrivacySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to a backend
    alert('Settings saved successfully!');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-8`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-secondary-900'}`}>
                Account Settings
              </h1>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your profile information, notifications, and privacy settings
              </p>
            </div>
            
            {/* Settings Card */}
            <div className={`rounded-xl overflow-hidden ${
              theme === 'dark' 
                ? 'bg-secondary-800 shadow-lg shadow-black/10' 
                : 'bg-white shadow-md'
            }`}>
              {/* Settings Tabs */}
              <div className={`border-b ${theme === 'dark' ? 'border-secondary-700' : 'border-gray-200'}`}>
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'profile'
                        ? theme === 'dark'
                          ? 'text-primary-400 border-b-2 border-primary-500'
                          : 'text-primary-600 border-b-2 border-primary-500'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'notifications'
                        ? theme === 'dark'
                          ? 'text-primary-400 border-b-2 border-primary-500'
                          : 'text-primary-600 border-b-2 border-primary-500'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('privacy')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'privacy'
                        ? theme === 'dark'
                          ? 'text-primary-400 border-b-2 border-primary-500'
                          : 'text-primary-600 border-b-2 border-primary-500'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Privacy
                  </button>
                  <button
                    onClick={() => setActiveTab('appearance')}
                    className={`px-6 py-4 text-sm font-medium ${
                      activeTab === 'appearance'
                        ? theme === 'dark'
                          ? 'text-primary-400 border-b-2 border-primary-500'
                          : 'text-primary-600 border-b-2 border-primary-500'
                        : theme === 'dark'
                          ? 'text-gray-400 hover:text-gray-300'
                          : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Appearance
                  </button>
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500' 
                              : 'border-gray-300 focus:border-primary-500 text-gray-900'
                          } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500' 
                              : 'border-gray-300 focus:border-primary-500 text-gray-900'
                          } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          rows={4}
                          className={`w-full px-4 py-2 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500' 
                              : 'border-gray-300 focus:border-primary-500 text-gray-900'
                          } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                        ></textarea>
                      </div>
                      
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          GitHub
                        </label>
                        <input
                          type="url"
                          name="github"
                          value={profileForm.github}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500' 
                              : 'border-gray-300 focus:border-primary-500 text-gray-900'
                          } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={profileForm.linkedin}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500' 
                              : 'border-gray-300 focus:border-primary-500 text-gray-900'
                          } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Twitter
                        </label>
                        <input
                          type="url"
                          name="twitter"
                          value={profileForm.twitter}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500' 
                              : 'border-gray-300 focus:border-primary-500 text-gray-900'
                          } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Profile Image
                        </label>
                        <div className="flex items-center">
                          <img 
                            src="https://randomuser.me/api/portraits/men/32.jpg" 
                            alt="Profile" 
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <button 
                            type="button"
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 hover:bg-secondary-600 text-white' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            Change Avatar
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <form onSubmit={handleSubmit}>
                    <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Email Notifications
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="emailUpdates"
                            name="emailUpdates"
                            type="checkbox"
                            checked={notificationSettings.emailUpdates}
                            onChange={handleNotificationChange}
                            className={`w-4 h-4 rounded ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 border-secondary-600 text-primary-500' 
                                : 'border-gray-300 text-primary-500'
                            } focus:ring-primary-500`}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="emailUpdates" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Course updates and announcements
                          </label>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Receive updates about courses you're enrolled in
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="courseReminders"
                            name="courseReminders"
                            type="checkbox"
                            checked={notificationSettings.courseReminders}
                            onChange={handleNotificationChange}
                            className={`w-4 h-4 rounded ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 border-secondary-600 text-primary-500' 
                                : 'border-gray-300 text-primary-500'
                            } focus:ring-primary-500`}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="courseReminders" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Learning reminders
                          </label>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Receive reminders to continue your courses
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="newCourses"
                            name="newCourses"
                            type="checkbox"
                            checked={notificationSettings.newCourses}
                            onChange={handleNotificationChange}
                            className={`w-4 h-4 rounded ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 border-secondary-600 text-primary-500' 
                                : 'border-gray-300 text-primary-500'
                            } focus:ring-primary-500`}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="newCourses" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            New course notifications
                          </label>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Be notified when new courses are added
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="promotions"
                            name="promotions"
                            type="checkbox"
                            checked={notificationSettings.promotions}
                            onChange={handleNotificationChange}
                            className={`w-4 h-4 rounded ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 border-secondary-600 text-primary-500' 
                                : 'border-gray-300 text-primary-500'
                            } focus:ring-primary-500`}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="promotions" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Promotions and discounts
                          </label>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Receive notifications about special offers
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          Profile Visibility
                        </label>
                        <select
                          name="profileVisibility"
                          value={privacySettings.profileVisibility}
                          onChange={handlePrivacyChange}
                          className={`w-full px-4 py-2 rounded-lg ${
                            theme === 'dark' 
                              ? 'bg-secondary-700 border-secondary-600 text-white focus:border-primary-500' 
                              : 'border-gray-300 focus:border-primary-500 text-gray-900'
                          } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                        >
                          <option value="public">Public - Anyone can view your profile</option>
                          <option value="registered">Registered Users - Only registered users can view your profile</option>
                          <option value="private">Private - Only you can view your profile</option>
                        </select>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="showCourses"
                            name="showCourses"
                            type="checkbox"
                            checked={privacySettings.showCourses}
                            onChange={handlePrivacyChange}
                            className={`w-4 h-4 rounded ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 border-secondary-600 text-primary-500' 
                                : 'border-gray-300 text-primary-500'
                            } focus:ring-primary-500`}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="showCourses" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Show my enrolled courses
                          </label>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Allow others to see which courses you're taking
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="showProgress"
                            name="showProgress"
                            type="checkbox"
                            checked={privacySettings.showProgress}
                            onChange={handlePrivacyChange}
                            className={`w-4 h-4 rounded ${
                              theme === 'dark' 
                                ? 'bg-secondary-700 border-secondary-600 text-primary-500' 
                                : 'border-gray-300 text-primary-500'
                            } focus:ring-primary-500`}
                          />
                        </div>
                        <div className="ml-3">
                          <label htmlFor="showProgress" className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Show my learning progress
                          </label>
                          <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Allow others to see your course progress and completion statistics
                          </p>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-100'}`}>
                        <h4 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Data Privacy
                        </h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          We value your privacy and never sell your personal data. You can request a copy of your data or delete your account at any time.
                        </p>
                        <div className="mt-3 flex space-x-3">
                          <button
                            type="button"
                            className={`px-3 py-1 text-xs rounded-lg ${
                              theme === 'dark' 
                                ? 'bg-secondary-600 hover:bg-secondary-500 text-white' 
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            }`}
                          >
                            Request Data Export
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 text-xs rounded-lg bg-red-500 hover:bg-red-600 text-white"
                          >
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
                
                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div>
                    <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Theme Settings
                    </h3>
                    
                    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-100'}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            Dark Mode
                          </h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            Switch between light and dark themes
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={toggleTheme}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Accessibility
                      </h3>
                      
                      <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-100'}`}>
                        <div className="space-y-4">
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              Font Size
                            </label>
                            <select
                              className={`w-full px-4 py-2 rounded-lg ${
                                theme === 'dark' 
                                  ? 'bg-secondary-600 border-secondary-600 text-white focus:border-primary-500' 
                                  : 'border-gray-300 focus:border-primary-500 text-gray-900'
                              } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                            >
                              <option>Small</option>
                              <option selected>Medium (Default)</option>
                              <option>Large</option>
                              <option>Extra Large</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                              Motion Sensitivity
                            </label>
                            <select
                              className={`w-full px-4 py-2 rounded-lg ${
                                theme === 'dark' 
                                  ? 'bg-secondary-600 border-secondary-600 text-white focus:border-primary-500' 
                                  : 'border-gray-300 focus:border-primary-500 text-gray-900'
                              } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                            >
                              <option>No Preference</option>
                              <option>Reduce Motion</option>
                              <option>Disable All Animations</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <button
                        type="button"
                        className="px-6 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage; 
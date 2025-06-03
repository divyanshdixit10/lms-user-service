import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  courses: number;
  lastLogin: string;
}

const AdminUsersPage: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock user data
  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2023-04-15',
      courses: 3,
      lastLogin: '2023-05-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2022-11-23',
      courses: 5,
      lastLogin: '2023-05-02'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      role: 'student',
      status: 'inactive',
      joinDate: '2023-01-10',
      courses: 2,
      lastLogin: '2023-03-15'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah.w@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2022-08-05',
      courses: 0,
      lastLogin: '2023-05-03'
    },
    {
      id: '5',
      name: 'Robert Brown',
      email: 'robert.b@example.com',
      role: 'student',
      status: 'pending',
      joinDate: '2023-04-30',
      courses: 1,
      lastLogin: 'Never'
    },
    {
      id: '6',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      role: 'instructor',
      status: 'active',
      joinDate: '2022-09-18',
      courses: 4,
      lastLogin: '2023-05-01'
    },
    {
      id: '7',
      name: 'David Wilson',
      email: 'david.w@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2023-02-14',
      courses: 2,
      lastLogin: '2023-04-28'
    },
    {
      id: '8',
      name: 'Lisa Martinez',
      email: 'lisa.m@example.com',
      role: 'student',
      status: 'active',
      joinDate: '2023-03-22',
      courses: 3,
      lastLogin: '2023-05-02'
    },
  ];

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Role filter
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    // Status filter
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get role badge class
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300';
      case 'instructor':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'student':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-secondary-900' : 'bg-orange-50'} py-6`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-secondary-900'}`}>
                User Management
              </h1>
              <button 
                className={`px-4 py-2 rounded-lg text-sm font-medium bg-primary-500 text-white hover:bg-primary-600 shadow-sm transition-colors`}
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add User
                </span>
              </button>
            </div>

            {/* Filters */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
            } shadow-md`}>
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-secondary-700 border-secondary-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900 placeholder-gray-500'
                  } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                  placeholder="Search users..."
                />
              </div>
              
              {/* Role Filter */}
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Filter by Role
                </label>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className={`w-full py-2 px-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-secondary-700 border-secondary-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                >
                  <option value="all">All Roles</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label className={`block text-xs font-medium mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`w-full py-2 px-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-secondary-700 border-secondary-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  } border focus:outline-none focus:ring-1 focus:ring-primary-500`}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* User Table */}
            <div className={`rounded-lg overflow-hidden shadow-md ${
              theme === 'dark' ? 'bg-secondary-800' : 'bg-white'
            }`}>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-secondary-700">
                  <thead className={`${theme === 'dark' ? 'bg-secondary-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Courses
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Last Login
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${theme === 'dark' ? 'divide-y divide-secondary-700' : 'divide-y divide-gray-200'}`}>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className={theme === 'dark' ? 'hover:bg-secondary-700' : 'hover:bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${
                              theme === 'dark' ? 'bg-secondary-700' : 'bg-orange-100'
                            } flex items-center justify-center mr-3 text-xs text-primary-500 font-medium`}>
                              {user.name.split(' ').map(word => word[0]).join('')}
                            </div>
                            <div>
                              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {user.name}
                              </div>
                              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeClass(user.role)}`}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(user.status)}`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {new Date(user.joinDate).toLocaleDateString()}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {user.courses}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          {user.lastLogin === 'Never' ? 'Never' : new Date(user.lastLogin).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-secondary-600' : 'hover:bg-gray-100'}`}>
                              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                              </svg>
                            </button>
                            <button className={`p-1 rounded ${theme === 'dark' ? 'hover:bg-secondary-600' : 'hover:bg-gray-100'}`}>
                              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
              </div>
              <div className="flex space-x-1">
                <button className={`p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-secondary-800 text-gray-400 hover:bg-secondary-700' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className={`p-2 rounded-md ${
                  theme === 'dark'
                    ? 'bg-primary-700 text-white' 
                    : 'bg-primary-500 text-white'
                }`}>1</button>
                <button className={`p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-secondary-800 text-gray-400 hover:bg-secondary-700' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}>2</button>
                <button className={`p-2 rounded-md ${
                  theme === 'dark' 
                    ? 'bg-secondary-800 text-gray-400 hover:bg-secondary-700' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminUsersPage; 
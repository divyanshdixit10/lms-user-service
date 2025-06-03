import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Define types for forum data
interface ForumUser {
  id: number | string;
  name: string;
  avatar: string;
  role?: 'student' | 'instructor' | 'admin';
}

interface ForumPost {
  id: number | string;
  title: string;
  content: string;
  author: ForumUser;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  downvotes: number;
  replies: number;
  views: number;
  solved?: boolean;
}

const ForumPage: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'unanswered'>('newest');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Mock data for demonstration
  const mockCategories = [
    'General',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Databases',
    'DevOps',
    'Career Advice',
    'Course Discussion'
  ];
  
  const mockPosts: ForumPost[] = [
    {
      id: 1,
      title: 'How to optimize React rendering performance?',
      content: 'I\'m working on a React application with a complex UI and facing performance issues. I\'ve tried using memo and useCallback, but still having problems...',
      author: {
        id: 101,
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'student'
      },
      category: 'Web Development',
      tags: ['React', 'Performance', 'JavaScript'],
      createdAt: '2023-08-15T14:30:00Z',
      upvotes: 24,
      downvotes: 2,
      replies: 8,
      views: 342,
      solved: true
    },
    {
      id: 2,
      title: 'Best practices for containerizing a Node.js application?',
      content: 'I\'m trying to deploy a Node.js application using Docker. What are the best practices for creating efficient Dockerfiles and managing environment variables?',
      author: {
        id: 102,
        name: 'Mike Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'student'
      },
      category: 'DevOps',
      tags: ['Docker', 'Node.js', 'Deployment'],
      createdAt: '2023-08-14T09:15:00Z',
      upvotes: 18,
      downvotes: 0,
      replies: 5,
      views: 213
    },
    {
      id: 3,
      title: 'How to prepare for coding interviews as a self-taught developer?',
      content: 'I\'ve been learning programming for about a year now and want to start applying for jobs. How should I prepare for technical interviews?',
      author: {
        id: 103,
        name: 'Alex Rivera',
        avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
        role: 'student'
      },
      category: 'Career Advice',
      tags: ['Interview', 'Career', 'Job Search'],
      createdAt: '2023-08-13T18:45:00Z',
      upvotes: 35,
      downvotes: 1,
      replies: 12,
      views: 567
    },
    {
      id: 4,
      title: 'Understanding backpropagation in neural networks',
      content: 'I\'m having trouble understanding the mathematics behind backpropagation. Can someone explain the chain rule application in simpler terms?',
      author: {
        id: 104,
        name: 'Priya Sharma',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
        role: 'student'
      },
      category: 'Machine Learning',
      tags: ['Neural Networks', 'Backpropagation', 'Mathematics'],
      createdAt: '2023-08-12T11:20:00Z',
      upvotes: 29,
      downvotes: 3,
      replies: 9,
      views: 421
    },
    {
      id: 5,
      title: 'Resources for learning database indexing strategies?',
      content: 'I need to optimize queries in a PostgreSQL database. Are there any good resources for learning about indexing strategies?',
      author: {
        id: 105,
        name: 'David Wilson',
        avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
        role: 'instructor'
      },
      category: 'Databases',
      tags: ['PostgreSQL', 'SQL', 'Database Optimization'],
      createdAt: '2023-08-11T16:55:00Z',
      upvotes: 16,
      downvotes: 1,
      replies: 7,
      views: 298
    }
  ];
  
  // Simulate loading data on mount
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setCategories(mockCategories);
      setPosts(mockPosts);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Filter posts based on category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  // Sort posts based on sortBy value
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === 'popular') {
      return b.upvotes - a.upvotes;
    } else {
      // unanswered - sort by those with 0 replies first
      return a.replies - b.replies;
    }
  });
  
  // Format date to relative time string
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else if (diffInSeconds < 2592000) {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } else if (diffInSeconds < 31536000) {
      return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    } else {
      return `${Math.floor(diffInSeconds / 31536000)} years ago`;
    }
  };
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Community Forum</h1>
            <p className="text-gray-600 mt-2">Ask questions, share knowledge, and connect with other learners.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Link to="/community/new-post" className="btn btn-primary">
              Start a Discussion
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === 'all' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory('all')}
                  >
                    All Topics
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'Python', 'React', 'Machine Learning', 'CSS', 'Node.js', 'SQL', 'Career'].map((tag) => (
                    <button
                      key={tag}
                      className="badge badge-outline-secondary"
                      onClick={() => setSearchQuery(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content - Posts */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="card mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search discussions..."
                      className="input pl-10 w-full"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="input input-sm w-36"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="unanswered">Unanswered</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Discussion List */}
            {sortedPosts.length === 0 ? (
              <div className="card text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No discussions found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery 
                    ? `No discussions match your search for "${searchQuery}"`
                    : 'No discussions in this category yet'}
                </p>
                <Link to="/community/new-post" className="btn btn-primary">
                  Start a Discussion
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedPosts.map((post) => (
                  <div key={post.id} className="card hover:shadow-md transition-shadow cursor-pointer">
                    <Link to={`/community/post/${post.id}`} className="block">
                      <div className="flex items-start">
                        <div className="mr-4 hidden sm:block">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = 'https://placehold.co/40x40?text=U';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <span className="badge mr-2">{post.category}</span>
                            {post.solved && (
                              <span className="badge badge-success">Solved</span>
                            )}
                          </div>
                          
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap items-center text-sm text-gray-500">
                            <div className="flex items-center mr-4">
                              <span className="font-medium text-gray-700 mr-1">{post.author.name}</span>
                              {post.author.role === 'instructor' && (
                                <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Instructor</span>
                              )}
                            </div>
                            <span className="mr-4">{formatRelativeTime(post.createdAt)}</span>
                          </div>
                        </div>
                        
                        <div className="ml-4 flex flex-col items-end space-y-2">
                          <div className="flex items-center text-sm">
                            <div className="flex items-center mr-3">
                              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                              </svg>
                              <span>{post.upvotes}</span>
                            </div>
                            <div className="flex items-center">
                              <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                              </svg>
                              <span>{post.replies}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            <span>{post.views} views</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                
                {/* Pagination */}
                <div className="flex justify-center mt-8">
                  <div className="pagination">
                    <button className="page-item page-disabled">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="page-item page-active">1</button>
                    <button className="page-item page-link">2</button>
                    <button className="page-item page-link">3</button>
                    <button className="page-item page-link">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage; 
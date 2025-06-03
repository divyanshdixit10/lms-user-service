// Course interface for type safety
export interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  lectures: number;
  price: string;
  instructor: string;
  rating: number;
  students: number;
  description: string;
  image: string;
  tag?: string;
  skills?: string[];
  enrollmentStatus?: 'Open' | 'Closed' | 'Coming Soon';
  syllabus?: {
    week: number;
    topic: string;
    content: string;
  }[];
  isWishlisted?: boolean;
  keyHighlights?: string[];
  whyOSOP?: string[];
  toolsCovered?: string[];
  certification?: string;
  placementAssistance?: boolean;
  reviews?: number;
  companiesHired?: string[];
  courseContent?: {
    section: string;
    topics: string[];
  }[];
}

// All courses data - shared between HomePage and CoursesPage
export const coursesData: Course[] = [
  {
    id: 1,
    title: 'C for Beginners',
    category: 'programming',
    level: 'Beginner',
    duration: '8 weeks',
    lectures: 45,
    price: '₹4,999',
    instructor: 'Rajesh Kumar',
    rating: 4.8,
    students: 1250,
    description: 'C programming is a foundational language for understanding core programming concepts.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Popular',
    skills: ['C Programming', 'Data Structures', 'Algorithms', 'Memory Management'],
    enrollmentStatus: 'Open'
  },
  {
    id: 2,
    title: 'OOPs in C++',
    category: 'programming',
    level: 'Intermediate',
    duration: '10 weeks',
    lectures: 60,
    price: '₹6,999',
    instructor: 'Priya Sharma',
    rating: 4.9,
    students: 1800,
    description: 'C++ is a powerful programming language that combines the efficiency of C with the flexibility of Object-Oriented Programming.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Bestseller',
    skills: ['C++ Programming', 'Object-Oriented Programming', 'Data Structures', 'STL'],
    enrollmentStatus: 'Open'
  },
  {
    id: 3,
    title: 'Data Science Course',
    category: 'data-science',
    level: 'Intermediate',
    duration: '20 weeks',
    lectures: 150,
    price: '₹34,999',
    instructor: 'Dr. Amit Patel',
    rating: 4.9,
    students: 2100,
    description: 'Data Science is a multidisciplinary field that combines statistical analysis, programming, and domain knowledge.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Hot',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization', 'Statistics'],
    enrollmentStatus: 'Open'
  },
  {
    id: 4,
    title: 'DevOps Course',
    category: 'devops',
    level: 'Advanced',
    duration: '18 weeks',
    lectures: 130,
    price: '₹29,999',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    students: 1500,
    description: 'DevOps is a set of practices that combines software development (Dev) and IT operations (Ops).',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'New',
    skills: ['Version control', 'CI/CD', 'Configuration management', 'Containerization', 'Monitoring', 'Cloud computing'],
    enrollmentStatus: 'Open'
  },
  {
    id: 5,
    title: 'DSA using C++',
    category: 'programming',
    level: 'Advanced',
    duration: '16 weeks',
    lectures: 120,
    price: '₹19,999',
    instructor: 'Ravi Gupta',
    rating: 4.9,
    students: 1950,
    description: 'Data Structures and Algorithms (DSA) are fundamental concepts essential for efficient programming and problem-solving.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Popular',
    skills: ['C++', 'Data Structures', 'Algorithms', 'Problem-Solving'],
    enrollmentStatus: 'Open'
  },
  {
    id: 6,
    title: 'Java Enterprise Edition',
    category: 'programming',
    level: 'Advanced',
    duration: '14 weeks',
    lectures: 100,
    price: '₹24,999',
    instructor: 'Rajesh Kumar',
    rating: 4.7,
    students: 1200,
    description: 'Java Enterprise Edition (Java EE) is a leading platform for building large-scale, multi-tiered, and secure enterprise applications.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Enterprise',
    skills: ['Java EE', 'Spring Framework', 'Spring Boot', 'Hibernate', 'RESTful services', 'Microservices'],
    enrollmentStatus: 'Open'
  },
  {
    id: 7,
    title: 'Java for Absolute Beginners',
    category: 'programming',
    level: 'Beginner',
    duration: '12 weeks',
    lectures: 80,
    price: '₹8,999',
    instructor: 'Priya Sharma',
    rating: 4.8,
    students: 2200,
    description: 'This Java for Beginners course is meticulously crafted for individuals who are new to programming.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Beginner Friendly',
    skills: ['Java Programming', 'Object-Oriented Programming'],
    enrollmentStatus: 'Open'
  },
  {
    id: 8,
    title: 'Java for Developers',
    category: 'programming',
    level: 'Intermediate',
    duration: '14 weeks',
    lectures: 100,
    price: '₹18,999',
    instructor: 'Amit Singh',
    rating: 4.7,
    students: 1650,
    description: 'This comprehensive Java course is designed for developers who want to master Java programming.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Professional',
    skills: ['Advanced Java', 'Multithreading', 'Collections', 'Exception Handling'],
    enrollmentStatus: 'Open'
  },
  {
    id: 9,
    title: 'SQL for Beginners',
    category: 'database',
    level: 'Beginner',
    duration: '8 weeks',
    lectures: 50,
    price: '₹7,999',
    instructor: 'Neha Agarwal',
    rating: 4.6,
    students: 1800,
    description: 'SQL (Structured Query Language) is the standard language for managing and manipulating relational databases.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Essential',
    skills: ['SQL', 'Database Design', 'Query Optimization', 'Data Analysis'],
    enrollmentStatus: 'Open'
  },
  {
    id: 10,
    title: 'Python for Data Science',
    category: 'data-science',
    level: 'Intermediate',
    duration: '16 weeks',
    lectures: 120,
    price: '₹39,999',
    instructor: 'Dr. Kavita Sharma',
    rating: 4.8,
    students: 2500,
    description: 'This comprehensive Python for Data Science course is designed to equip learners with essential skills.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Job-Oriented',
    skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Data Analysis'],
    enrollmentStatus: 'Open'
  },
  {
    id: 11,
    title: 'Data Analytics & Visualization',
    category: 'data-science',
    level: 'Intermediate',
    duration: '14 weeks',
    lectures: 100,
    price: '₹29,999',
    instructor: 'Rohit Verma',
    rating: 4.7,
    students: 1900,
    description: 'This course focuses on data analytics and visualization techniques using modern tools and technologies.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Business Analytics',
    skills: ['Data Analytics', 'Tableau', 'Power BI', 'Excel', 'Statistical Analysis'],
    enrollmentStatus: 'Open'
  },
  {
    id: 12,
    title: 'AI-Powered Business Analysis',
    category: 'business',
    level: 'Advanced',
    duration: '12 weeks',
    lectures: 80,
    price: '₹34,999',
    instructor: 'Dr. Rajesh Khanna',
    rating: 4.8,
    students: 1400,
    description: 'This course combines traditional business analysis with cutting-edge AI technologies.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'AI-Powered',
    skills: ['Business Analysis', 'AI Tools', 'Data-driven Decision Making', 'Process Optimization'],
    enrollmentStatus: 'Open'
  },
  {
    id: 13,
    title: 'Machine Learning Course',
    category: 'ai-ml',
    level: 'Advanced',
    duration: '18 weeks',
    lectures: 140,
    price: '₹32,999',
    instructor: 'Dr. Anita Desai',
    rating: 4.9,
    students: 1750,
    description: 'This comprehensive Machine Learning course covers fundamental to advanced ML concepts.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Advanced ML',
    skills: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch'],
    enrollmentStatus: 'Open'
  },
  {
    id: 14,
    title: 'Complete Data Science',
    category: 'data-science',
    level: 'Comprehensive',
    duration: '24 weeks',
    lectures: 180,
    price: '₹44,999',
    instructor: 'Dr. Suresh Patel',
    rating: 4.9,
    students: 2800,
    description: 'This is the most comprehensive Data Science program covering everything from basics to advanced topics.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Complete Program',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Deep Learning', 'Big Data', 'Cloud Computing'],
    enrollmentStatus: 'Open'
  },
  {
    id: 15,
    title: 'AI Tools Mastery for Non-Tech',
    category: 'ai-ml',
    level: 'Beginner',
    duration: '10 weeks',
    lectures: 60,
    price: '₹35,999',
    instructor: 'Priya Gupta',
    rating: 4.6,
    students: 2200,
    description: 'This course is designed for non-technical professionals who want to leverage AI tools.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Non-Tech Friendly',
    skills: ['AI Tools', 'ChatGPT', 'Automation', 'Productivity Enhancement'],
    enrollmentStatus: 'Open'
  },
  {
    id: 16,
    title: 'Prompt Engineering Course',
    category: 'ai-ml',
    level: 'Intermediate',
    duration: '8 weeks',
    lectures: 50,
    price: '₹28,999',
    instructor: 'Arjun Mehta',
    rating: 4.7,
    students: 1600,
    description: 'Master the art and science of prompt engineering for AI language models.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Trending',
    skills: ['Prompt Engineering', 'LLMs', 'AI Communication', 'Content Generation'],
    enrollmentStatus: 'Open'
  },
  {
    id: 17,
    title: 'AI Product Management',
    category: 'ai-ml',
    level: 'Advanced',
    duration: '12 weeks',
    lectures: 80,
    price: '₹42,999',
    instructor: 'Vikash Kumar',
    rating: 4.8,
    students: 1300,
    description: 'Learn how to manage AI products from conception to deployment in this comprehensive course.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Product Management',
    skills: ['AI Product Strategy', 'Product Roadmapping', 'Stakeholder Management', 'AI Ethics'],
    enrollmentStatus: 'Open'
  },
  {
    id: 18,
    title: 'Generative AI & LLMs',
    category: 'ai-ml',
    level: 'Advanced',
    duration: '16 weeks',
    lectures: 120,
    price: '₹48,999',
    instructor: 'Dr. Ravi Shankar',
    rating: 4.9,
    students: 1500,
    description: 'Dive deep into Generative AI and Large Language Models in this cutting-edge course.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'Cutting-edge',
    skills: ['Generative AI', 'LLMs', 'GPT Models', 'Fine-tuning', 'AI Applications'],
    enrollmentStatus: 'Open'
  },
  {
    id: 19,
    title: 'AI Tools for Product Management',
    category: 'ai-ml',
    level: 'Intermediate',
    duration: '10 weeks',
    lectures: 70,
    price: '₹32,999',
    instructor: 'Sneha Reddy',
    rating: 4.7,
    students: 1100,
    description: 'Learn how to leverage AI tools specifically for product management workflows and decision-making.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    tag: 'PM Tools',
    skills: ['AI-powered Analytics', 'Product Intelligence', 'Automated Insights', 'Decision Support'],
    enrollmentStatus: 'Open'
  }
];

// Helper function to get popular courses (can be customized based on criteria)
export const getPopularCourses = (limit?: number): Course[] => {
  // Sort by rating and student count, then take the specified limit
  const sorted = [...coursesData].sort((a, b) => {
    // First sort by rating (descending)
    if (b.rating !== a.rating) {
      return b.rating - a.rating;
    }
    // Then by student count (descending)
    return b.students - a.students;
  });
  
  return limit ? sorted.slice(0, limit) : sorted;
};

// Helper function to get courses by category
export const getCoursesByCategory = (category: string): Course[] => {
  return coursesData.filter(course => course.category === category);
};

// Helper function to get course by ID
export const getCourseById = (id: number): Course | undefined => {
  return coursesData.find(course => course.id === id);
}; 
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ParticleBackground from '../../components/ui/ParticleBackground';
import HeroGradientText from '../../components/ui/HeroGradientText';
import CodeBackgroundAnimation from '../../components/ui/CodeBackgroundAnimation';
import { toast } from 'react-hot-toast';

interface Course {
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

interface Filter {
  price: string[];
  level: string[];
  duration: string[];
}

// Course data - New courses based on user requirements (moved outside component to prevent re-renders)
const coursesData: Course[] = [
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
      description: 'C programming is a foundational language for understanding core programming concepts. It is widely used for system programming, embedded systems, and other low-level applications.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Popular',
      skills: ['C Programming', 'Data Structures', 'Algorithms', 'Memory Management'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor-Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Turbo C++', 'VS Code', 'GCC Compiler'],
      certification: 'Training Certification on Successfully Completion of the Course',
      placementAssistance: true,
      reviews: 245,
      companiesHired: ['TCS', 'Infosys', 'Wipro', 'HCL'],
      syllabus: [
        { week: 1, topic: 'Introduction to Computer & C Programming', content: 'Understanding computer fundamentals, introduction to programming languages, setting up development environment, writing your first C program.' },
        { week: 2, topic: 'C Basics', content: 'Variables, data types, constants, keywords, identifiers, input/output operations using scanf and printf.' },
        { week: 3, topic: 'C Programming Structure', content: 'Program structure, header files, main function, comments, preprocessor directives.' },
        { week: 4, topic: 'Conditional Statements', content: 'if statement, if-else statement, nested if-else, switch statement, conditional operator.' },
        { week: 5, topic: 'Operators in C', content: 'Arithmetic operators, relational operators, logical operators, bitwise operators, assignment operators, operator precedence.' },
        { week: 6, topic: 'Looping Statements', content: 'for loop, while loop, do-while loop, nested loops, loop control statements.' },
        { week: 7, topic: 'Jump Statements & Switch', content: 'break statement, continue statement, goto statement, return statement, switch case implementation.' },
        { week: 8, topic: 'Functions & Advanced Topics', content: 'Function definition, function declaration, function call, parameter passing, recursion, pointers, arrays, file handling.' }
      ],
      courseContent: [
        {
          section: 'CORE C',
          topics: [
            'Introduction to Computer & C Programming',
            'C Basics',
            'C Programming Structure',
            'Conditional Statements',
            'Operators in C',
            'Looping Statements',
            'Jump Statements in C Programming',
            'Switch Statement',
            'Functions in C Programming'
          ]
        },
        {
          section: 'ADVANCED C',
          topics: [
            'Pointers in C',
            'Recursion',
            'Arrays in C',
            '2D Arrays',
            'User-Defined Data Types',
            'File Handling'
          ]
        }
      ]
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
      description: 'C++ is a powerful programming language that combines the efficiency of C with the flexibility of Object-Oriented Programming (OOP). This course covers fundamental concepts of C++ and OOP principles.',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Bestseller',
      skills: ['C++ Programming', 'Object-Oriented Programming', 'Data Structures', 'STL'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor-Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s Most Premium Coding Class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Turbo C++', 'Visual Studio Code', 'GCC Compiler'],
      certification: 'Training Certification on Successful Completion of the Course',
      placementAssistance: true,
      reviews: 356,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Flipkart'],
      syllabus: [
        { week: 1, topic: 'Introduction to C++', content: 'History of C++, features, setting up development environment, basic syntax and structure.' },
        { week: 2, topic: 'Basic Input/Output & Namespaces', content: 'cin, cout, cerr, clog, namespace std, using directive, scope resolution operator.' },
        { week: 3, topic: 'Reference Variables & Function Overloading', content: 'Reference variables, function overloading, default arguments, inline functions.' },
        { week: 4, topic: 'Object-Oriented Programming Basics', content: 'Classes and objects, access modifiers, constructors and destructors, this pointer.' },
        { week: 5, topic: 'Advanced OOP Concepts', content: 'Static members, friend functions, operator overloading, dynamic memory management.' },
        { week: 6, topic: 'Inheritance', content: 'Types of inheritance, function overriding, virtual functions, abstract classes.' },
        { week: 7, topic: 'Polymorphism & Templates', content: 'Runtime polymorphism, virtual functions, templates, generic programming.' },
        { week: 8, topic: 'Exception Handling & STL', content: 'try-catch blocks, throw statement, standard template library, containers.' },
        { week: 9, topic: 'File Handling & Streams', content: 'File operations, stream classes, reading and writing files, binary file operations.' },
        { week: 10, topic: 'Advanced Topics & Project', content: 'Advanced C++ features, best practices, project development, code optimization.' }
      ],
      courseContent: [
        {
          section: 'OOPs with C++',
          topics: [
            'Introduction to C++',
            'Basic Input/Output',
            'Namespaces in C++',
            'Reference Variables',
            'Function Overloading',
            'std::string Class in C++',
            'Object-Oriented Programming (OOP)',
            'Access Modifiers',
            'this Pointer in C++',
            'Scope Resolution Operator',
            'Object Passing and Returning',
            'Constructors and Destructors',
            'Inline Functions',
            'Static Members and Functions',
            'Dynamic Memory Management',
            'Friend Function and Friend Class',
            'Operator Overloading',
            'Default Arguments',
            'Inheritance and its Types',
            'Function Overriding and Virtual Functions',
            'Abstract Classes',
            'Generalization and Specialization',
            'IS-A and HAS-A Relationship',
            'Exception Handling',
            'Templates in C++',
            'C++ IO Stream',
            'File Handling in C++',
            'Overloading Insertion and Extraction Operators'
          ]
        }
      ]
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
      description: 'Data Science is a multidisciplinary field that combines statistical analysis, programming, and domain knowledge to extract insights and knowledge from structured and unstructured data.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Hot',
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Visualization', 'Statistics'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Realtime Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Scikit-learn', 'TensorFlow/PyTorch', 'Jupyter Notebooks'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 478,
      companiesHired: ['Netflix', 'Uber', 'Airbnb', 'LinkedIn', 'Spotify'],
      syllabus: [
        { week: 1, topic: 'Introduction to Data Science', content: 'What is data science, data science lifecycle, tools and technologies, setting up Python environment.' },
        { week: 2, topic: 'Python for Data Science', content: 'Python basics, NumPy, Pandas, data manipulation and cleaning techniques.' },
        { week: 3, topic: 'Data Collection & Preprocessing', content: 'Data sources, web scraping, APIs, data cleaning, handling missing values, data transformation.' },
        { week: 4, topic: 'Exploratory Data Analysis', content: 'Statistical analysis, data distribution, correlation analysis, hypothesis testing.' },
        { week: 5, topic: 'Data Visualization', content: 'Matplotlib, Seaborn, Plotly, creating effective visualizations, storytelling with data.' },
        { week: 6, topic: 'Statistical Analysis', content: 'Descriptive statistics, inferential statistics, probability distributions, statistical tests.' },
        { week: 7, topic: 'Introduction to Machine Learning', content: 'Types of ML, supervised vs unsupervised learning, model evaluation metrics.' },
        { week: 8, topic: 'Supervised Learning - Regression', content: 'Linear regression, polynomial regression, regularization techniques, model validation.' },
        { week: 9, topic: 'Supervised Learning - Classification', content: 'Logistic regression, decision trees, random forest, SVM, model evaluation.' },
        { week: 10, topic: 'Unsupervised Learning', content: 'K-means clustering, hierarchical clustering, PCA, dimensionality reduction.' },
        { week: 11, topic: 'Advanced Machine Learning', content: 'Ensemble methods, gradient boosting, XGBoost, hyperparameter tuning.' },
        { week: 12, topic: 'Introduction to Deep Learning', content: 'Neural networks, backpropagation, TensorFlow/PyTorch basics.' },
        { week: 13, topic: 'Deep Learning Applications', content: 'CNN for image processing, RNN for sequence data, transfer learning.' },
        { week: 14, topic: 'Natural Language Processing', content: 'Text preprocessing, sentiment analysis, topic modeling, word embeddings.' },
        { week: 15, topic: 'Time Series Analysis', content: 'Time series components, forecasting methods, ARIMA models, seasonal decomposition.' },
        { week: 16, topic: 'Big Data Technologies', content: 'Introduction to Spark, distributed computing, handling large datasets.' },
        { week: 17, topic: 'Model Deployment', content: 'Flask/Django APIs, cloud deployment, model monitoring, MLOps basics.' },
        { week: 18, topic: 'Business Intelligence', content: 'Tableau/Power BI, dashboard creation, business metrics, KPI development.' },
        { week: 19, topic: 'Ethics & Best Practices', content: 'Data privacy, bias in ML, ethical considerations, industry best practices.' },
        { week: 20, topic: 'Capstone Project', content: 'End-to-end data science project, presentation skills, portfolio development.' }
      ],
      courseContent: [
        {
          section: 'CORE DATA SCIENCE',
          topics: [
            'Introduction to Data Science',
            'Data Collection and Preprocessing',
            'Exploratory Data Analysis (EDA)',
            'Statistical Analysis',
            'Data Visualization',
            'Machine Learning',
            'Deep Learning (Optional)',
            'Big Data Technologies (Optional)',
            'Capstone Project'
          ]
        }
      ]
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
      description: 'DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and deliver high-quality software. This course is designed for individuals looking to gain a comprehensive understanding of DevOps principles, tools, and practices.',
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'New',
      skills: ['Version control', 'continuous integration/deployment', 'configuration management', 'containerization', 'monitoring', 'cloud computing'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Realtime Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Git', 'Jenkins', 'Docker', 'Kubernetes', 'Ansible', 'Terraform', 'Prometheus', 'Grafana', 'AWS/Azure/Google Cloud'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 267,
      companiesHired: ['Amazon', 'Microsoft', 'Google Cloud', 'Accenture', 'Cognizant'],
      syllabus: [
        { week: 1, topic: 'Introduction to DevOps', content: 'Understanding the DevOps culture and principles. The importance of collaboration between development and operations teams. Overview of the DevOps lifecycle.' },
        { week: 2, topic: 'Version Control Systems', content: 'Introduction to Git and version control concepts. Git commands and workflows. Branching, merging, and resolving conflicts.' },
        { week: 3, topic: 'Continuous Integration (CI)', content: 'Understanding CI/CD concepts and benefits. Setting up CI pipelines using tools like Jenkins or GitLab CI. Automated testing and code quality checks.' },
        { week: 4, topic: 'Continuous Deployment (CD)', content: 'Implementing continuous deployment strategies. Deployment automation with tools like Docker and Kubernetes. Rollback strategies and canary deployments.' },
        { week: 5, topic: 'Configuration Management', content: 'Introduction to configuration management tools (Ansible, Chef, Puppet). Writing and managing configuration scripts. Automating server provisioning and management.' },
        { week: 6, topic: 'Containerization', content: 'Understanding container technology and benefits. Introduction to Docker: images, containers, and registries. Managing containers and orchestrating with Kubernetes.' },
        { week: 7, topic: 'Monitoring and Logging', content: 'Importance of monitoring in DevOps. Tools for monitoring applications and infrastructure (Prometheus, Grafana). Centralized logging solutions (ELK stack, Splunk).' },
        { week: 8, topic: 'Cloud Computing', content: 'Overview of cloud services and deployment models. Using AWS, Azure, or Google Cloud for DevOps practices. Infrastructure as Code (IaC) with Terraform.' },
        { week: 9, topic: 'Capstone Project', content: 'Hands-on project to implement DevOps practices. Real-world scenarios for CI/CD, containerization, and monitoring. Presenting findings and insights from the project.' }
      ],
      courseContent: [
        {
          section: 'CORE DEVOPS',
          topics: [
            'Introduction to DevOps',
            'Version Control Systems',
            'Continuous Integration (CI)',
            'Continuous Deployment (CD)',
            'Configuration Management',
            'Containerization',
            'Monitoring and Logging',
            'Cloud Computing',
            'Capstone Project'
          ]
        }
      ]
    },
    {
      id: 5,
      title: 'Data Structures and Algorithms (DSA) using C++',
      category: 'programming',
      level: 'Intermediate',
      duration: '16 weeks',
      lectures: 120,
      price: '₹19,999',
      instructor: 'Ravi Gupta',
      rating: 4.9,
      students: 1950,
      description: 'Data Structures and Algorithms (DSA) are fundamental concepts essential for efficient programming and problem-solving. This course provides a thorough introduction to DSA using C++.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Popular',
      skills: ['C++', 'Data Structures', 'Algorithms', 'Problem-Solving'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['C++ Compiler', 'Visual Studio'],
      certification: 'Training Certification on Successful Completion of the Course',
      placementAssistance: true,
      reviews: 389,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Apple'],
      syllabus: [
        { week: 1, topic: 'Introduction to DSA', content: 'Overview and types of data structures, importance of algorithms, complexity analysis.' },
        { week: 2, topic: 'Prerequisites for DSA', content: 'Functions, arrays, classes & objects, pointers, object patterning in C++.' },
        { week: 3, topic: 'Address Calculation', content: 'Address calculation of 1-D, 2-D, and 3-D arrays, memory layout understanding.' },
        { week: 4, topic: 'Time & Space Complexity', content: 'Big O notation, best case (Ω), average case (Θ), worst case (O) analysis.' },
        { week: 5, topic: 'Stacks', content: 'Stack definition, operations, applications, static (array) and dynamic (linked list) implementation.' },
        { week: 6, topic: 'Queues', content: 'Queue definition, operations, applications, circular queues, priority queues, deque.' },
        { week: 7, topic: 'Linked Lists', content: 'Singly, doubly, and circular linked lists, operations, applications, memory management.' },
        { week: 8, topic: 'Recursion & Backtracking', content: 'Recursive thinking, base cases, backtracking algorithms, maze solving, N-Queens problem.' },
        { week: 9, topic: 'Sorting Algorithms I', content: 'Bubble sort, selection sort, insertion sort, analysis and implementation.' },
        { week: 10, topic: 'Sorting Algorithms II', content: 'Merge sort, quick sort, heap sort, radix sort, comparison and applications.' },
        { week: 11, topic: 'Searching Algorithms', content: 'Linear search, binary search, interpolation search, exponential search.' },
        { week: 12, topic: 'Trees', content: 'Binary trees, binary search trees, tree traversals, operations, balanced trees.' },
        { week: 13, topic: 'Advanced Trees', content: 'AVL trees, red-black trees, B-trees, tree applications, expression trees.' },
        { week: 14, topic: 'Graphs', content: 'Graph representation, BFS, DFS, shortest path algorithms (Dijkstra, Bellman-Ford).' },
        { week: 15, topic: 'Hashing Techniques', content: 'Hash functions, collision handling, open addressing, chaining, applications.' },
        { week: 16, topic: 'Dynamic Programming & Greedy', content: 'DP concepts, memoization, tabulation, greedy algorithms, optimization problems.' }
      ],
      courseContent: [
        {
          section: 'INTRODUCTION TO DSA',
          topics: ['Overview and Types of Data Structures']
        },
        {
          section: 'PREREQUISITES FOR DSA',
          topics: ['Functions', 'Arrays', 'Classes & Objects', 'Pointers', 'Object Patterning']
        },
        {
          section: 'ADDRESS CALCULATION',
          topics: ['Address Calculation of 1-D, 2-D, and 3-D Arrays']
        },
        {
          section: 'TIME & SPACE COMPLEXITY',
          topics: ['Best Case (Ω), Average Case (Θ), Worst Case (O)']
        },
        {
          section: 'STACKS',
          topics: ['Definition, Operations, Applications', 'Static (Array) and Dynamic (Linked List) Implementation']
        },
        {
          section: 'QUEUES',
          topics: ['Definition, Operations, Applications', 'Static (Array) and Dynamic (Linked List) Implementation']
        },
        {
          section: 'LINKED LISTS',
          topics: ['Singly, Doubly, and Circular Linked Lists', 'Definition and Applications']
        },
        {
          section: 'RECURSION & BACKTRACKING',
          topics: ['Concept and Basic Problems with Implementation']
        },
        {
          section: 'SORTING',
          topics: ['Bubble Sort, Selection Sort, Insertion Sort, Radix Sort', 'Merge Sort, Quick Sort, Heap Sort']
        },
        {
          section: 'SEARCHING',
          topics: ['Linear Search and Binary Search']
        },
        {
          section: 'DYNAMIC PROGRAMMING',
          topics: ['Optimization on Recursion', 'Tabulation and Memorization', 'Solutions to Common Problems']
        },
        {
          section: 'TREES',
          topics: ['Binary Trees and Binary Search Trees', 'Definition, Creation, Implementation, and Traversals', 'AVL Trees']
        },
        {
          section: 'GRAPHS',
          topics: ['Definition, Operations, Applications', 'Graph Algorithms (Dijkstra\'s, Bellman-Ford)']
        },
        {
          section: 'HASHING TECHNIQUES',
          topics: ['Concept and Collision Handling Techniques', 'How to Select Hashing Functions']
        },
        {
          section: 'GREEDY ALGORITHMS',
          topics: ['Need & Concepts', 'Solutions to Common Problems']
        }
      ]
    },
    {
      id: 6,
      title: 'Java Enterprise Edition (Java EE)',
      category: 'programming',
      level: 'Advanced',
      duration: '14 weeks',
      lectures: 100,
      price: '₹24,999',
      instructor: 'Rajesh Kumar',
      rating: 4.7,
      students: 1200,
      description: 'Java Enterprise Edition (Java EE) is a leading platform for building large-scale, multi-tiered, and secure enterprise applications. This course provides a comprehensive introduction to the Java EE framework and essential technologies, catering to developers who aim to excel in corporate Java development.',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Enterprise',
      skills: ['Java EE development', 'Spring Framework', 'Spring Boot', 'Hibernate', 'RESTful services', 'Microservices architecture', 'JSON handling', 'Maven for project management'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Realtime Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Java17', 'Spring Framework', 'Spring Boot', 'Hibernate', 'Maven', 'IDEs (Eclipse/IntelliJ)'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 198,
      companiesHired: ['Oracle', 'IBM', 'Accenture', 'TCS', 'Infosys'],
      syllabus: [
        { week: 1, topic: 'Corporate Java', content: 'Understanding Java EE and its significance in enterprise applications. Overview of Java EE architecture and component models.' },
        { week: 2, topic: 'Spring Framework Introduction', content: 'Introduction to the Spring Framework and its core concepts. Dependency Injection and Inversion of Control.' },
        { week: 3, topic: 'Spring MVC', content: 'Building web applications with Spring MVC. Integrating Spring with other Java EE technologies.' },
        { week: 4, topic: 'Spring Boot Basics', content: 'Introduction to Spring Boot and its role in microservices. Creating standalone applications with Spring Boot.' },
        { week: 5, topic: 'RESTful Services with Spring Boot', content: 'Building RESTful services using Spring Boot. API design and implementation best practices.' },
        { week: 6, topic: 'Hibernate ORM', content: 'Understanding Object-Relational Mapping (ORM) with Hibernate. Configuring Hibernate for database interaction.' },
        { week: 7, topic: 'CRUD Operations', content: 'Performing CRUD operations using Hibernate. Advanced Hibernate features and optimization.' },
        { week: 8, topic: 'RESTful API Development', content: 'Fundamentals of REST architecture. Creating and consuming RESTful web services.' },
        { week: 9, topic: 'API Security', content: 'Securing REST APIs with Spring Security. Authentication and authorization mechanisms.' },
        { week: 10, topic: 'Microservices Architecture', content: 'Introduction to microservices architecture. Designing, building, and deploying microservices using Spring Boot.' },
        { week: 11, topic: 'Microservices Communication', content: 'Communication between microservices. Service discovery and load balancing.' },
        { week: 12, topic: 'JSON Handling', content: 'Working with JSON data format. Parsing and generating JSON in Java applications.' },
        { week: 13, topic: 'Maven Project Management', content: 'Introduction to Maven for project management. Dependency management and build automation with Maven.' },
        { week: 14, topic: 'Project Development', content: 'Creating and managing projects with Maven. Final project implementation and deployment.' }
      ],
      courseContent: [
        {
          section: 'JAVA EE',
          topics: [
            'Corporate Java',
            'Spring Framework',
            'Spring Boot',
            'Hibernate',
            'RESTful API Development',
            'Microservices',
            'JSON (JavaScript Object Notation)',
            'Maven'
          ]
        }
      ]
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
      description: 'This Java for Beginners course is meticulously crafted for individuals who are new to programming and wish to learn Java, one of the most popular programming languages in the world. This course provides a solid foundation in Java programming concepts and techniques, guiding learners through essential topics, practical coding exercises, and real-world applications.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Beginner Friendly',
      skills: ['Java Programming', 'Object-Oriented Programming Concepts'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor-Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Java Development Kit (JDK)', 'VS Code', 'Notepad', 'CMD'],
      certification: 'Training Certification on Successful Completion of the Course',
      placementAssistance: true,
      reviews: 445,
      companiesHired: ['TCS', 'Wipro', 'HCL', 'Cognizant', 'Capgemini'],
      syllabus: [
        { week: 1, topic: 'Introduction to Java', content: 'Overview of Java and its Features. Java Editions, Versions, and Compilation Process. JDK, JRE, JVM Overview. Applications of Java.' },
        { week: 2, topic: 'Basic Syntax and Structure', content: 'First Java Program. Print Methods and Variables. Data Types (Primitive and Non-Primitive). ASCII and Unicode.' },
        { week: 3, topic: 'Control Flow and Operators', content: 'Conditional Statements (if, else, switch). Looping Constructs (for, while, do-while, for-each). Operators (Arithmetic, Relational, Bitwise, Assignment).' },
        { week: 4, topic: 'Operator Precedence and Casting', content: 'Operator Precedence and Type Casting. Advanced operator usage and best practices.' },
        { week: 5, topic: 'OOP Basics', content: 'Introduction to OOP Concepts (Classes, Objects, Inheritance, Polymorphism). Access Modifiers and the this Keyword.' },
        { week: 6, topic: 'Constructors and Methods', content: 'Types of Constructors (Default, Parameterized, Copy). Method Overloading and Constructor Overloading. Static Methods and the Object Class.' },
        { week: 7, topic: 'Arrays and Strings', content: 'Introduction to Arrays (Single and Two-Dimensional). Operations on Arrays. String Basics and String Methods.' },
        { week: 8, topic: 'Exception Handling', content: 'Introduction to Exception Handling in Java. Try-Catch Blocks and Finally Statement.' },
        { week: 9, topic: 'Wrapper Classes', content: 'Overview of Wrapper Classes. Conversion Between Primitive Types and Wrapper Classes.' },
        { week: 10, topic: 'Advanced OOP Concepts', content: 'Abstract Classes and Interfaces. Practical Examples of Inheritance. Method Overriding.' },
        { week: 11, topic: 'Java Special Features', content: 'Introduction to Varargs. Special Keywords in Java. File I/O Basics. Reading and Writing Files.' },
        { week: 12, topic: 'Real-world Projects', content: 'Practical Coding Exercises and Assignments. Final Project to Demonstrate Your Skills.' }
      ],
      courseContent: [
        {
          section: 'JAVA FUNDAMENTALS',
          topics: [
            'Introduction to Java',
            'Basic Syntax and Structure',
            'Control Flow and Operators',
            'Object-Oriented Programming (OOP) Basics',
            'Constructors and Methods',
            'Arrays and Strings',
            'Exception Handling',
            'Wrapper Classes and Type Conversion',
            'Advanced OOP Concepts',
            'Java Special Features',
            'File Handling in Java',
            'Real-world Projects and Applications'
          ]
        }
      ]
    },
    {
      id: 8,
      title: 'Java for Developers',
      category: 'programming',
      level: 'Intermediate',
      duration: '16 weeks',
      lectures: 120,
      price: '₹18,999',
      instructor: 'Dr. Amit Patel',
      rating: 4.9,
      students: 1800,
      description: 'Java is a widely-used, high-level programming language known for its versatility, reliability, and portability. It is a foundational language in software development, powering web applications, mobile apps, and enterprise systems. This course is designed to take learners from fundamental concepts to advanced programming techniques, suitable for individuals with some prior coding experience.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Professional',
      skills: ['Java Programming', 'Object-Oriented Programming', 'Web Development with Java'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Realtime Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Java Development Kit (JDK)', 'VS Code', 'Eclipse', 'IntelliJ IDEA', 'Apache Tomcat'],
      certification: 'Training Certification on Successful Completion of the course',
      placementAssistance: true,
      reviews: 356,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Oracle', 'IBM'],
      syllabus: [
        { week: 1, topic: 'Java Basics', content: 'What is Java? Why Java? History of Java. Applications of Java. Features of Java. Advantages of Java. Versions of Java. Installation of Java. Setting up the Java Environment.' },
        { week: 2, topic: 'Java Fundamentals', content: 'Java Data Types. Variables and Constants. Comments in Java. Output with System.out.print(). Input Handling. Type Conversion.' },
        { week: 3, topic: 'Operators in Java', content: 'Arithmetic Operators. Comparison Operators. Logical Operators. Assignment Operators. Bitwise Operators. Ternary Operator.' },
        { week: 4, topic: 'Control Statements', content: 'Conditional Statements (if, switch). Looping Statements (for, while, do-while). Break and Continue Statements.' },
        { week: 5, topic: 'Java Arrays', content: 'Introduction to Arrays. Creating Arrays. Accessing Array Elements. Multi-Dimensional Arrays. Array Methods.' },
        { week: 6, topic: 'Methods in Java', content: 'Defining Methods. Calling Methods. Method Overloading. Variable Length Arguments. Return Types and Parameters.' },
        { week: 7, topic: 'OOP Concepts', content: 'Introduction to OOP. Classes and Objects. Encapsulation. Inheritance. Polymorphism. Abstraction.' },
        { week: 8, topic: 'Exception Handling', content: 'Understanding Exceptions. Types of Exceptions. Try, Catch, Finally Blocks. Throwing Exceptions. Custom Exception Classes.' },
        { week: 9, topic: 'Collections Framework', content: 'Introduction to Collections. List, Set, Map Interfaces. ArrayList, HashSet, HashMap. Iterators and Enhanced for Loop.' },
        { week: 10, topic: 'Java Streams API', content: 'Introduction to Streams. Stream Operations (filter, map, reduce). Collecting Results.' },
        { week: 11, topic: 'Java I/O', content: 'File Handling. Reading and Writing Files. Serialization and Deserialization.' },
        { week: 12, topic: 'Servlets', content: 'Introduction to Servlets. Lifecycle of a Servlet. Handling HTTP Requests and Responses. Session Management.' },
        { week: 13, topic: 'JavaServer Pages (JSP)', content: 'Introduction to JSP. JSP Lifecycle. JSP Tags and Expressions. Integrating JSP with Servlets.' },
        { week: 14, topic: 'JDBC', content: 'Introduction to JDBC. Establishing Database Connections. Executing SQL Queries. Handling Transactions and Exceptions.' },
        { week: 15, topic: 'Advanced Topics', content: 'Advanced Java concepts and best practices. Performance optimization techniques.' },
        { week: 16, topic: 'Final Project', content: 'Comprehensive project development using all learned concepts. Project presentation and code review.' }
      ],
      courseContent: [
        {
          section: 'CORE JAVA',
          topics: [
            'Java Basics',
            'Java Fundamentals',
            'Operators in Java',
            'Control Statements',
            'Java Arrays',
            'Methods in Java',
            'Object-Oriented Programming (OOP) Concepts',
            'Exception Handling'
          ]
        },
        {
          section: 'ADVANCED JAVA',
          topics: [
            'Java Collections Framework',
            'Java Streams API',
            'Java Input/Output (I/O)'
          ]
        },
        {
          section: 'WEB DEVELOPMENT WITH JAVA',
          topics: [
            'Servlets',
            'JavaServer Pages (JSP)',
            'Java Database Connectivity (JDBC)'
          ]
        }
      ]
    },
    {
      id: 9,
      title: 'SQL for Beginners',
      category: 'database',
      level: 'Beginner',
      duration: '10 weeks',
      lectures: 60,
      price: '₹7,999',
      instructor: 'Ravi Gupta',
      rating: 4.7,
      students: 2500,
      description: 'SQL (Structured Query Language) is the standard language for managing and manipulating relational databases. It is widely used for data retrieval, data insertion, updating, and database schema creation and modification. Understanding SQL is crucial for anyone interested in data management, data analysis, and backend development. This course covers fundamental concepts to advanced SQL functionalities, making it suitable for learners with no prior database experience.',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Database',
      skills: ['SQL Programming'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor-Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s Most Premium Coding Class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['MySQL Workbench', 'Command Line Interface (CLI)'],
      certification: 'Training Certification on Successful Completion of the Course',
      placementAssistance: true,
      reviews: 567,
      companiesHired: ['Oracle', 'Microsoft', 'IBM', 'SAP', 'Salesforce'],
      syllabus: [
        { week: 1, topic: 'Database Fundamentals', content: 'Definition of Database. Drawbacks of File System. What is DBMS? Types of DBMS. Introduction to MySQL. History of MySQL.' },
        { week: 2, topic: 'Introduction to SQL', content: 'What is SQL? What Can SQL Do? SQL Commands. Introduction to SQL Data Types.' },
        { week: 3, topic: 'Basic SQL Commands', content: 'SQL Create Statement. Insert Statement. Select Command. Where Clause. SQL Syntax Overview.' },
        { week: 4, topic: 'SQL Operators', content: 'Basic SQL Operators. Logical Operators. ORDER BY Clause. BETWEEN Clause. LIKE Operator and Wildcards.' },
        { week: 5, topic: 'Data Manipulation', content: 'Delete Command. Update Command. Constraints in SQL. Primary Key, Unique Key, NOT NULL. Foreign Key. ALTER TABLE Operations.' },
        { week: 6, topic: 'Advanced Features', content: 'Date/Time Data Types. Date and Time Functions. Introduction to REGEXP. REGEXP Examples. CHECK Constraint. DEFAULT Constraint.' },
        { week: 7, topic: 'Aggregate Functions', content: 'Using Aggregate Functions: SUM(), MIN(), AVG(), etc. Nested Queries. Subquery within Another Query.' },
        { week: 8, topic: 'Joins in SQL', content: 'Inner Join. Left Outer Join. Right Outer Join. Full Outer Join. Self Join.' },
        { week: 9, topic: 'Grouping and Views', content: 'Group By Statement. Example Queries of Group Statement. HAVING Clause. Creating and Dropping Views.' },
        { week: 10, topic: 'Database Administration', content: 'Creating and Dropping Index. User Privileges. GRANT. REVOKE.' }
      ],
      courseContent: [
        {
          section: 'SQL',
          topics: [
            'Introduction to Database',
            'Database Management System (DBMS)',
            'MySQL Overview',
            'Introduction to SQL',
            'SQL Data Types',
            'SQL Commands',
            'Data Retrieval',
            'SQL Operators',
            'Data Manipulation',
            'Constraints in SQL',
            'Date and Time',
            'Regular Expressions',
            'Additional Constraints',
            'Aggregate Functions',
            'Nested Queries',
            'Joins in SQL',
            'Grouping Data',
            'Indexing',
            'Views in SQL',
            'User Privileges'
          ]
        }
      ]
    },
    {
      id: 10,
      title: 'Python for Data Science',
      category: 'data-science',
      level: 'Intermediate',
      duration: '12 weeks',
      lectures: 108,
      price: '₹39,999',
      instructor: 'Dr. Priya Sharma',
      rating: 4.9,
      students: 1850,
      description: 'A comprehensive 3-month job-oriented course covering Python foundations, data handling, machine learning, AI, and industry projects. This course combines hands-on projects with industry use cases and AI-driven data science techniques to prepare you for a successful career in data science.',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Job-Oriented',
      skills: ['Python Programming', 'Data Analysis', 'Machine Learning', 'Deep Learning', 'NLP', 'Big Data', 'Cloud Computing', 'MLOps'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Python', 'Jupyter Notebook', 'VS Code', 'Anaconda', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Keras', 'AWS', 'GCP', 'Azure'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 423,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Uber'],
      syllabus: [
        { week: 1, topic: 'Python Basics for Data Science', content: 'Introduction to Python & Data Science Landscape. Installing & Setting up Python (Jupyter Notebook, VS Code, Anaconda). Python Data Types: Lists, Tuples, Dictionaries, Sets. Loops, Functions, and List Comprehensions. Object-Oriented Programming (OOP) in Python.' },
        { week: 2, topic: 'NumPy & Pandas for Data Manipulation', content: 'Introduction to NumPy: Arrays, Indexing, Slicing, Broadcasting. Pandas DataFrames & Series: Loading, Filtering, Grouping. Data Cleaning & Transformation: Handling Missing Data, Encoding. Performance Optimization using Vectorization.' },
        { week: 3, topic: 'Data Visualization & EDA', content: 'Introduction to Matplotlib & Seaborn. Data Visualization Best Practices. Exploratory Data Analysis: Univariate, Bivariate, Multivariate Analysis. Feature Engineering for Machine Learning.' },
        { week: 4, topic: 'Databases & Web Scraping', content: 'SQL for Data Science: Joins, Aggregations, Window Functions. Introduction to NoSQL (MongoDB). Web Scraping using BeautifulSoup & Scrapy. API Data Extraction (JSON, REST APIs).' },
        { week: 5, topic: 'Introduction to Machine Learning', content: 'Overview of ML: Supervised vs. Unsupervised Learning. Linear Regression, Logistic Regression. Decision Trees, Random Forests. Model Selection & Performance Metrics.' },
        { week: 6, topic: 'Advanced ML Models & Feature Engineering', content: 'Feature Selection & Dimensionality Reduction (PCA, LDA). Hyperparameter Tuning (GridSearchCV, RandomizedSearchCV). Handling Imbalanced Data (SMOTE, Undersampling).' },
        { week: 7, topic: 'Deep Learning with TensorFlow & Keras', content: 'Introduction to Neural Networks. Building a Simple ANN. Image Processing with CNNs. Transfer Learning for AI-based Data Science.' },
        { week: 8, topic: 'NLP & Large Language Models', content: 'Introduction to NLP (Tokenization, Stemming, Lemmatization). Sentiment Analysis with NLTK & Spacy. Transformer-based NLP Models (BERT, GPT). Fine-tuning LLMs for Text Analytics.' },
        { week: 9, topic: 'Big Data & Cloud Computing', content: 'Introduction to Big Data & Distributed Computing. Working with Spark & PySpark. Cloud Platforms for Data Science (AWS, GCP, Azure). Deploying ML Models on Cloud.' },
        { week: 10, topic: 'MLOps & Model Deployment', content: 'Introduction to MLOps. CI/CD Pipelines for Machine Learning. Model Deployment with Flask & FastAPI. Docker & Kubernetes for ML.' },
        { week: 11, topic: 'AI Agents & Autonomous Data Science', content: 'AI Agents in Data Science (AutoML, AutoGPT). Reinforcement Learning for Data Science. Automated Feature Engineering. Ethical AI & Responsible AI.' },
        { week: 12, topic: 'Resume Building & Job Preparation', content: 'Data Science Resume & LinkedIn Optimization. How to Crack Data Science Interviews. Working on End-to-End Case Studies. Capstone Project Presentation.' }
      ],
      courseContent: [
        {
          section: 'MONTH 1: PYTHON FOUNDATIONS & DATA HANDLING',
          topics: [
            'Python Basics for Data Science',
            'NumPy & Pandas for Data Manipulation',
            'Data Visualization & Exploratory Data Analysis (EDA)',
            'Databases & Web Scraping'
          ]
        },
        {
          section: 'MONTH 2: MACHINE LEARNING & AI',
          topics: [
            'Introduction to Machine Learning with Scikit-Learn',
            'Advanced ML Models & Feature Engineering',
            'Deep Learning with TensorFlow & Keras',
            'NLP & Large Language Models (LLMs)'
          ]
        },
        {
          section: 'MONTH 3: ADVANCED TOPICS & INDUSTRY PROJECTS',
          topics: [
            'Big Data & Cloud Computing for Data Science',
            'MLOps & Model Deployment',
            'AI Agents & Autonomous Data Science',
            'Resume Building & Job Preparation'
          ]
        }
      ]
    },
    {
      id: 11,
      title: 'Data Analytics & Data Visualization',
      category: 'data-science',
      level: 'Beginner',
      duration: '12 weeks',
      lectures: 108,
      price: '₹29,999',
      instructor: 'Amit Patel',
      rating: 4.8,
      students: 2100,
      description: 'A comprehensive 3-month course covering data analytics foundations, Excel, SQL, Python, and advanced visualization tools like Power BI and Tableau. This course focuses on hands-on projects with business use cases and AI-driven analytics to prepare you for data analytics roles.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Business Analytics',
      skills: ['Data Analytics', 'Excel', 'SQL', 'Python', 'Power BI', 'Tableau', 'Business Intelligence', 'Data Visualization'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Excel', 'SQL', 'Python', 'Power BI', 'Tableau', 'Google Looker Studio', 'Google Analytics', 'Apache Spark', 'Google BigQuery'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 387,
      companiesHired: ['Deloitte', 'PwC', 'KPMG', 'EY', 'Accenture'],
      syllabus: [
        { week: 1, topic: 'Introduction to Data Analytics & BI', content: 'Understanding Data Analytics & BI. Data Analytics vs. Data Science vs. AI. Data Analytics Process (ETL, Data Cleaning, Analysis, Insights). Introduction to SQL, Excel, and Python for Data Analytics.' },
        { week: 2, topic: 'Excel for Data Analytics & Dashboards', content: 'Advanced Excel Functions (VLOOKUP, INDEX-MATCH, Pivot Tables). Data Cleaning with Power Query. Financial Modeling & Business Analytics with Excel. Creating Interactive Dashboards with Excel.' },
        { week: 3, topic: 'SQL for Data Analytics', content: 'Writing SQL Queries: Joins, Aggregations, Window Functions. Data Manipulation: Filtering, Sorting, Grouping. SQL Case Studies: Customer Segmentation, Sales Trends. Data Warehousing Basics & Connecting SQL to BI Tools.' },
        { week: 4, topic: 'Python for Data Analytics', content: 'Python Basics for Data Analytics. Data Handling with Pandas & NumPy. Exploratory Data Analysis (EDA) with Pandas. Automating Reports with Python.' },
        { week: 5, topic: 'Data Storytelling & Visualization', content: 'Fundamentals of Data Storytelling. Best Practices in Data Visualization. Choosing the Right Chart Type (Bar, Pie, Heatmap, etc.). Interactive vs. Static Visualizations.' },
        { week: 6, topic: 'Power BI for Business Analytics', content: 'Introduction to Power BI. Importing Data & Data Transformations. Building Interactive Dashboards. DAX Functions for Data Modeling.' },
        { week: 7, topic: 'Tableau for Data Visualization', content: 'Tableau Basics: Connecting Data & Building Charts. Advanced Calculations & Parameters. Storytelling with Tableau Dashboards. Tableau vs. Power BI vs. Google Data Studio.' },
        { week: 8, topic: 'AI-Powered Data Analytics', content: 'Introduction to AI & AutoML for Data Analytics. Predictive Analytics with AI. AI-Powered Business Insights (Google AI, AWS AI). Automating Data Analysis with GPT & AI Tools.' },
        { week: 9, topic: 'Google Looker Studio & Marketing Analytics', content: 'Google Looker Studio (formerly Data Studio). Marketing & Web Analytics with Google Analytics. Google Sheets for Automated Dashboards. Customer Segmentation & Cohort Analysis.' },
        { week: 10, topic: 'Big Data Analytics & Cloud BI', content: 'Introduction to Big Data & Distributed Systems. Apache Spark for Big Data Analytics. Cloud Data Warehousing (AWS Redshift, Google BigQuery). Real-time Analytics with Kafka & Stream Processing.' },
        { week: 11, topic: 'Business Case Studies & Capstone', content: 'Data-Driven Decision Making in Business. Case Studies on Finance, Healthcare, Retail Analytics. Building End-to-End BI Dashboards. Using AI for Decision Support.' },
        { week: 12, topic: 'Resume Building & Job Preparation', content: 'Resume & LinkedIn Profile Optimization. Case Study & Interview Prep for Data Analytics Roles. Mock Interviews & Business Case Presentations. Freelancing & Gig Economy for Data Analysts.' }
      ],
      courseContent: [
        {
          section: 'MONTH 1: FOUNDATIONS & EXCEL',
          topics: [
            'Introduction to Data Analytics & Business Intelligence',
            'Excel for Data Analytics & Dashboards',
            'SQL for Data Analytics',
            'Python for Data Analytics'
          ]
        },
        {
          section: 'MONTH 2: DATA VISUALIZATION & BI',
          topics: [
            'Data Storytelling & Visualization Principles',
            'Power BI for Business Analytics',
            'Tableau for Data Visualization',
            'AI-Powered Data Analytics'
          ]
        },
        {
          section: 'MONTH 3: ADVANCED ANALYTICS & PROJECTS',
          topics: [
            'Google Looker Studio & Marketing Analytics',
            'Big Data Analytics & Cloud BI',
            'Business Case Studies & Capstone',
            'Resume Building & Job Preparation'
          ]
        }
      ]
    },
    {
      id: 12,
      title: 'AI-Powered Business Analysis',
      category: 'business-analysis',
      level: 'Intermediate',
      duration: '12 weeks',
      lectures: 108,
      price: '₹34,999',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 1650,
      description: 'Master AI-driven insights, automation, and decision-making for business analysts. This comprehensive 3-month course covers AI tools for business analysis, process automation, competitive intelligence, and strategic decision-making using cutting-edge AI technologies.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'AI-Powered',
      skills: ['Business Analysis', 'AI Tools', 'Process Automation', 'Competitive Intelligence', 'Strategic Planning', 'Risk Analysis', 'Decision Making'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['ChatGPT', 'Perplexity AI', 'Tableau AI', 'Power BI AI', 'Zapier AI', 'Make.com', 'H2O.ai', 'Google AutoML', 'Tome AI', 'Notion AI'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 298,
      companiesHired: ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'PwC'],
      syllabus: [
        { week: 1, topic: 'Introduction to AI in Business Analysis', content: 'Role of AI in Business Analysis & Decision-Making. AI vs. Traditional Business Analysis Approaches. How AI Enhances Data-Driven Insights & Automation. Overview of AI Tools for Business Analysts.' },
        { week: 2, topic: 'AI for Data Collection & Preprocessing', content: 'AI for Data Wrangling & Cleaning (OpenRefine, Trifacta, SheetAI). Automating Data Extraction with AI (Web Scraping & API Calls). AI for Handling Missing Data & Outlier Detection. AI-Powered Data Labeling & Classification.' },
        { week: 3, topic: 'AI-Powered Data Analysis & Visualization', content: 'Using AI in BI Tools (Tableau AI, Power BI AI, Looker Studio AI). AI-Driven Data Exploration & Automated Insights. AI-Powered Trend Analysis & Forecasting. Automated Business Reporting with AI.' },
        { week: 4, topic: 'AI for Business Forecasting & Predictive Analytics', content: 'Introduction to AI in Forecasting (Regression, Time Series Analysis). AI-Powered Sales & Demand Forecasting. Using AutoML for Predictive Analytics (H2O.ai, Google AutoML). AI in Market & Consumer Behavior Prediction.' },
        { week: 5, topic: 'AI for Competitive Intelligence & Market Research', content: 'AI Tools for Market Analysis (Crayon AI, Perplexity AI, ChatGPT). AI-Generated Competitor Analysis Reports. AI-Powered SWOT Analysis for Business Strategy. AI for Consumer Sentiment Analysis.' },
        { week: 6, topic: 'AI for Business Process Automation', content: 'Introduction to AI-Driven BPA & Workflow Automation. AI for Automating Repetitive Business Tasks (Zapier AI, Make.com, n8n). AI-Powered Document Processing & Report Generation. AI in Customer Support & Service Automation.' },
        { week: 7, topic: 'AI for Business Decision-Making & Risk Analysis', content: 'AI-Powered Decision Support Systems. AI for Risk Identification & Fraud Detection. AI in Financial Analysis & Credit Scoring. Ethical Considerations in AI-Powered Decision-Making.' },
        { week: 8, topic: 'AI-Powered Text & Sentiment Analysis', content: 'Using AI to Analyze Customer Reviews & Social Media Sentiment. AI for Automated Report Summarization & Text Mining. AI in Customer Support Automation & NPS Prediction. AI-Powered Chatbots for Business Intelligence.' },
        { week: 9, topic: 'AI for Business Strategy & Financial Analysis', content: 'AI-Powered Strategic Planning & Business Modeling. AI in Financial Statement Analysis & Forecasting. AI for Cost Optimization & Profitability Analysis. AI for Investment Decision-Making.' },
        { week: 10, topic: 'AI for Business Process Improvement', content: 'AI-Driven Process Mining & Workflow Optimization. AI in Supply Chain & Logistics Optimization. AI for Operations Management & Cost Reduction. AI in HR Analytics & Employee Productivity.' },
        { week: 11, topic: 'AI for Business Presentations & Storytelling', content: 'AI for Data-Driven Decision-Making & Storytelling. AI-Powered Slide & Document Generation (Tome AI, Notion AI, Canva AI). Automating Business Reporting & Presentation with AI. AI-Powered Stakeholder Communication.' },
        { week: 12, topic: 'Capstone Project & Career Preparation', content: 'Resume & LinkedIn Optimization for AI-Powered Business Analyst Roles. Building a Portfolio with AI-Driven Business Insights. Mock Interviews & AI in Business Case Studies. Final Capstone Project Presentation.' }
      ],
      courseContent: [
        {
          section: 'MONTH 1: AI FOUNDATIONS FOR BUSINESS',
          topics: [
            'Introduction to AI in Business Analysis',
            'AI for Data Collection, Cleaning & Preprocessing',
            'AI-Powered Data Analysis & Visualization',
            'AI for Business Forecasting & Predictive Analytics'
          ]
        },
        {
          section: 'MONTH 2: AI FOR INSIGHTS & AUTOMATION',
          topics: [
            'AI for Competitive Intelligence & Market Research',
            'AI for Business Process Automation (BPA)',
            'AI for Business Decision-Making & Risk Analysis',
            'AI-Powered Text & Sentiment Analysis for Business'
          ]
        },
        {
          section: 'MONTH 3: AI STRATEGY & DEPLOYMENT',
          topics: [
            'AI for Business Strategy & Financial Analysis',
            'AI for Business Process Improvement & Optimization',
            'AI for Business Presentations & Storytelling',
            'Capstone Project & Career Preparation'
          ]
        }
      ]
    },
    {
      id: 13,
      title: 'Machine Learning Course',
      category: 'machine-learning',
      level: 'Intermediate',
      duration: '12 weeks',
      lectures: 108,
      price: '₹32,999',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.9,
      students: 1950,
      description: 'Master ML from basics to advanced concepts with real-world projects. This comprehensive 3-month course covers supervised and unsupervised learning, deep learning, NLP, and deployment with hands-on projects and AI-driven ML techniques for industry applications.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Advanced ML',
      skills: ['Machine Learning', 'Deep Learning', 'Python', 'Scikit-learn', 'TensorFlow', 'NLP', 'Computer Vision', 'MLOps'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Python', 'Jupyter Notebook', 'Scikit-Learn', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'Matplotlib', 'Flask', 'FastAPI', 'Docker', 'Kubernetes'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 445,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Facebook', 'Tesla'],
      syllabus: [
        { week: 1, topic: 'Introduction to Machine Learning & AI', content: 'What is Machine Learning? ML vs. AI vs. Deep Learning. Types of ML: Supervised, Unsupervised, Reinforcement Learning. ML Pipeline: Data Collection → Preprocessing → Model Training → Evaluation. ML Industry Use Cases & Career Paths.' },
        { week: 2, topic: 'Data Preprocessing & Feature Engineering', content: 'Handling Missing Values, Outliers & Duplicates. Encoding Categorical Data (One-Hot, Label Encoding). Feature Scaling (Normalization, Standardization). Feature Selection & Dimensionality Reduction (PCA, LDA).' },
        { week: 3, topic: 'EDA & Visualization', content: 'Pandas & Matplotlib for EDA. Data Distribution Analysis & Statistical Insights. Correlation Analysis & Hypothesis Testing. Data Visualization Best Practices.' },
        { week: 4, topic: 'Supervised Learning - Regression', content: 'Linear Regression: Basics, Cost Function & Optimization. Multiple Regression & Polynomial Regression. Ridge, Lasso, & ElasticNet for Regularization. Model Performance Metrics (R², RMSE, MAE).' },
        { week: 5, topic: 'Supervised Learning - Classification', content: 'Logistic Regression for Binary Classification. Decision Trees & Random Forest. Support Vector Machines (SVM). Model Evaluation Metrics (Precision, Recall, F1-Score, AUC-ROC).' },
        { week: 6, topic: 'Ensemble Learning & Hyperparameter Tuning', content: 'Bagging & Boosting (Random Forest, XGBoost, AdaBoost). Hyperparameter Tuning (GridSearchCV, RandomizedSearchCV). Handling Imbalanced Data (SMOTE, Undersampling). Cross-Validation & Bias-Variance Tradeoff.' },
        { week: 7, topic: 'Unsupervised Learning', content: 'K-Means Clustering & Elbow Method. DBSCAN & Hierarchical Clustering. Anomaly Detection (Isolation Forest, LOF). Applications: Customer Segmentation, Outlier Detection.' },
        { week: 8, topic: 'Recommendation Systems & RL', content: 'Collaborative Filtering & Content-Based Recommendation. Matrix Factorization (SVD, NMF). Reinforcement Learning Basics & Applications in AI. Bandit Algorithms & Policy Optimization.' },
        { week: 9, topic: 'Deep Learning with TensorFlow & Keras', content: 'Neural Networks: Basics of Perceptron & Backpropagation. Deep Learning Architectures (CNNs, RNNs, GANs). AI-Powered ML: Transfer Learning & Pretrained Models. Implementing a Simple Neural Network.' },
        { week: 10, topic: 'NLP & Time-Series Analysis', content: 'Text Preprocessing (Tokenization, Stemming, Lemmatization). Sentiment Analysis using NLP (TF-IDF, Word2Vec, Transformers). Time-Series Forecasting (ARIMA, LSTMs). AI in NLP: Chatbots & LLMs.' },
        { week: 11, topic: 'ML Deployment & MLOps', content: 'Model Deployment using Flask, FastAPI & Streamlit. CI/CD Pipelines for ML Model Deployment. Docker & Kubernetes for Scalable AI Solutions. Monitoring & Maintaining ML Models.' },
        { week: 12, topic: 'Industry Applications & Capstone', content: 'AI in Healthcare, Finance, Marketing, & Cybersecurity. AI Ethics & Bias Mitigation Strategies. Resume & Portfolio Building for ML Roles. Capstone Project Presentation.' }
      ],
      courseContent: [
        {
          section: 'MONTH 1: FOUNDATIONS OF MACHINE LEARNING',
          topics: [
            'Introduction to Machine Learning & AI',
            'Data Preprocessing & Feature Engineering',
            'Exploratory Data Analysis (EDA) & Visualization',
            'Supervised Learning - Regression Models'
          ]
        },
        {
          section: 'MONTH 2: SUPERVISED & UNSUPERVISED LEARNING',
          topics: [
            'Supervised Learning - Classification Models',
            'Ensemble Learning & Hyperparameter Tuning',
            'Unsupervised Learning - Clustering & Anomaly Detection',
            'Recommendation Systems & Reinforcement Learning'
          ]
        },
        {
          section: 'MONTH 3: DEEP LEARNING & DEPLOYMENT',
          topics: [
            'Introduction to Deep Learning with TensorFlow & Keras',
            'Natural Language Processing (NLP) & Time-Series Analysis',
            'Machine Learning Deployment & MLOps',
            'Industry Applications & Capstone Project'
          ]
        }
      ]
    },
    {
      id: 14,
      title: 'Complete Data Science',
      category: 'data-science',
      level: 'Advanced',
      duration: '12 weeks',
      lectures: 108,
      price: '₹44,999',
      instructor: 'Dr. Priya Sharma',
      rating: 4.9,
      students: 2250,
      description: 'A comprehensive 3-month job-oriented course covering Python, data handling, machine learning, AI, big data, and cloud computing. This complete data science program includes hands-on projects with real-world business use cases and prepares you for senior data science roles.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Complete Program',
      skills: ['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'NLP', 'Big Data', 'Cloud Computing', 'MLOps', 'Data Visualization', 'Statistics'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium Coding Course',
        'Experienced Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time Assignments',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium coding class',
        '26+ Years of Technology Training',
        'Zero Error Programming',
        'Strong Conceptual & Practical Knowledge'
      ],
      toolsCovered: ['Python', 'SQL', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Keras', 'Power BI', 'Tableau', 'Apache Spark', 'Google BigQuery', 'AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes'],
      certification: 'Training Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 567,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Spotify'],
      syllabus: [
        { week: 1, topic: 'Python Foundations for Data Science', content: 'Python Basics: Data Types, Loops, Functions. NumPy for Numerical Computing. Pandas for Data Handling & Processing. Data Cleaning & Feature Engineering.' },
        { week: 2, topic: 'SQL & Databases for Data Science', content: 'Writing SQL Queries: Joins, Aggregations, Window Functions. NoSQL (MongoDB) for Unstructured Data. Data Warehousing & Data Pipelines. Extracting Data from APIs & Web Scraping.' },
        { week: 3, topic: 'Data Visualization & Storytelling', content: 'Matplotlib & Seaborn for Exploratory Data Analysis. Power BI & Tableau for Business Intelligence. Google Looker Studio for Web Analytics. AI-Driven Data Storytelling.' },
        { week: 4, topic: 'Statistics & Probability', content: 'Descriptive & Inferential Statistics. Hypothesis Testing & A/B Testing. Probability Distributions. Statistical Insights for Decision Making.' },
        { week: 5, topic: 'Introduction to Machine Learning', content: 'Supervised vs. Unsupervised Learning. Regression Models: Linear, Polynomial. Classification Models: Logistic Regression, Decision Trees. Model Selection & Evaluation Metrics.' },
        { week: 6, topic: 'Advanced ML Models & Feature Engineering', content: 'Random Forest, XGBoost, and Ensemble Learning. Feature Selection & Dimensionality Reduction (PCA, LDA). Hyperparameter Tuning (GridSearchCV, RandomizedSearchCV).' },
        { week: 7, topic: 'Deep Learning with TensorFlow & Keras', content: 'Introduction to Neural Networks. Convolutional Neural Networks (CNNs) for Image Processing. Recurrent Neural Networks (RNNs) for Time Series Data. Transfer Learning & Pre-trained Models.' },
        { week: 8, topic: 'Natural Language Processing & LLMs', content: 'Text Processing: Tokenization, Stemming, Lemmatization. Sentiment Analysis using NLP. Transformer-based NLP (BERT, GPT). AI-powered Chatbots & Text Summarization.' },
        { week: 9, topic: 'Big Data Analytics & Cloud Computing', content: 'Introduction to Big Data & Apache Spark. Cloud Data Warehousing (Google BigQuery, AWS Redshift). Streaming Analytics with Kafka. AI & Data Science on Cloud (AWS, GCP, Azure).' },
        { week: 10, topic: 'MLOps & Model Deployment', content: 'Introduction to MLOps. CI/CD Pipelines for Machine Learning. Model Deployment using Flask & FastAPI. Docker & Kubernetes for ML.' },
        { week: 11, topic: 'AI Agents & Automated Data Science', content: 'AI Agents for Data Science (AutoML, AutoGPT). Reinforcement Learning for AI Analytics. Ethical AI & Responsible Data Science. Automated Data Engineering Pipelines.' },
        { week: 12, topic: 'Resume Building & Job Preparation', content: 'Data Science Resume & LinkedIn Optimization. Data Science Portfolio Building. Data Science Case Studies & Interviews. Mock Interviews & Business Case Presentations.' }
      ],
      courseContent: [
        {
          section: 'MONTH 1: PYTHON, DATA HANDLING & EDA',
          topics: [
            'Python Foundations for Data Science',
            'SQL & Databases for Data Science',
            'Data Visualization & Storytelling',
            'Statistics & Probability for Data Science'
          ]
        },
        {
          section: 'MONTH 2: MACHINE LEARNING & AI',
          topics: [
            'Introduction to Machine Learning (ML) with Scikit-Learn',
            'Advanced ML Models & Feature Engineering',
            'Deep Learning with TensorFlow & Keras',
            'Natural Language Processing (NLP) & LLMs'
          ]
        },
        {
          section: 'MONTH 3: BIG DATA, CLOUD & MLOPS',
          topics: [
            'Big Data Analytics & Cloud Computing',
            'MLOps & Model Deployment',
            'AI Agents & Automated Data Science',
            'Resume Building & Job Preparation'
          ]
        }
      ]
    },
    {
      id: 15,
      title: 'AI Tools Mastery Course for Non-Tech Professionals',
      category: 'ai-tools',
      level: 'Beginner',
      duration: '12 weeks',
      lectures: 108,
      price: '₹35,999',
      instructor: 'Dr. Sarah Johnson',
      rating: 4.9,
      students: 1750,
      description: 'Master 40+ AI Tools to Supercharge Productivity, Content Creation & Business Growth. A comprehensive 3-month course designed for non-tech professionals to leverage AI for maximum efficiency and business impact.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'AI-Powered',
      skills: ['AI Tools', 'Productivity Automation', 'Content Creation', 'Business Growth', 'Workflow Optimization', 'AI-Powered Marketing', 'Video Creation', 'Voice Generation'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium AI Tools Course',
        'Experienced AI Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time AI Projects',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium AI training class',
        '26+ Years of Technology Training',
        'Hands-on AI Tool Mastery',
        'Strong Practical & Business Knowledge'
      ],
      toolsCovered: ['ChatGPT', 'Claude AI', 'Perplexity AI', 'Notion AI', 'Tome AI', 'Grammarly AI', 'Zapier AI', 'Runway ML', 'DALL-E', 'MidJourney', 'Jasper AI', 'Suno AI', 'ElevenLabs AI', 'AdCreative AI', 'HubSpot AI', 'Canva AI', 'Synthesia AI', 'GitHub Copilot'],
      certification: 'AI Tools Mastery Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 298,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Meta', 'OpenAI'],
      courseContent: [
        {
          section: 'MONTH 1: AI FOR PRODUCTIVITY, WRITING & AUTOMATION',
          topics: [
            'AI for Personal Productivity & Smart Workflows',
            'AI for Writing, Emails & Presentations',
            'AI for Business Automation & CRM',
            'AI for Research & Data Analysis'
          ]
        },
        {
          section: 'MONTH 2: AI FOR VIDEO, IMAGE & VOICE CREATION',
          topics: [
            'AI for Video Editing & Creation',
            'AI for Image & Graphic Design',
            'AI for Music & Voice Generation',
            'AI for SEO & Marketing Optimization'
          ]
        },
        {
          section: 'MONTH 3: AI FOR BUSINESS, AUTOMATION & CUSTOMIZATION',
          topics: [
            'AI for E-Commerce & Sales Optimization',
            'AI for Advanced Research & Data Insights',
            'AI for No-Code & Low-Code Development',
            'AI for Freelancing & Job Market Readiness'
          ]
        }
      ]
    },
    {
      id: 16,
      title: 'Prompt Engineering Course',
      category: 'ai-tools',
      level: 'Intermediate',
      duration: '12 weeks',
      lectures: 108,
      price: '₹28,999',
      instructor: 'Dr. Rajesh Kumar',
      rating: 4.8,
      students: 1650,
      description: 'Master Prompt Engineering for AI & Large Language Models (LLMs). Learn advanced prompting techniques, AI automation, and build industry-ready AI applications using cutting-edge prompt engineering strategies.',
      image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Job-Oriented',
      skills: ['Prompt Engineering', 'Large Language Models', 'AI Automation', 'RAG Systems', 'AI Agents', 'Code Generation', 'Data Analysis', 'Creative AI'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium AI Course',
        'Experienced AI Trainer',
        'Instructor Led/Self-Paced Course',
        'Real-time AI Projects',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium AI training class',
        '26+ Years of Technology Training',
        'Advanced Prompt Engineering Techniques',
        'Strong Practical & Industry Knowledge'
      ],
      toolsCovered: ['ChatGPT', 'Claude AI', 'Gemini', 'LLaMA', 'GitHub Copilot', 'Codeium', 'Tabnine', 'DALL-E', 'MidJourney', 'RunwayML', 'Zapier AI', 'LangChain', 'AutoGPT', 'CrewAI'],
      certification: 'Prompt Engineering Specialist Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 267,
      companiesHired: ['OpenAI', 'Anthropic', 'Google DeepMind', 'Microsoft', 'Meta AI'],
      courseContent: [
        {
          section: 'MONTH 1: FOUNDATIONS OF PROMPT ENGINEERING',
          topics: [
            'Introduction to Prompt Engineering & AI Models',
            'Fundamentals of Effective Prompt Writing',
            'Advanced Prompting Techniques',
            'AI for Text Generation & Summarization'
          ]
        },
        {
          section: 'MONTH 2: SPECIALIZED PROMPTING FOR DIFFERENT DOMAINS',
          topics: [
            'AI for Business & Marketing Prompting',
            'AI for Code Generation & Software Development',
            'AI for Data Analysis & Visualization',
            'AI for Images, Videos & Creative Work'
          ]
        },
        {
          section: 'MONTH 3: ADVANCED PROMPT ENGINEERING & AI AUTOMATION',
          topics: [
            'AI for Automation & No-Code AI Development',
            'RAG (Retrieval-Augmented Generation) & AI Search',
            'AI Agents & Autonomous Prompting',
            'Capstone Project & Career Preparation'
          ]
        }
      ]
    },
    {
      id: 17,
      title: 'AI Product Management Course',
      category: 'ai-product-management',
      level: 'Advanced',
      duration: '12 weeks',
      lectures: 108,
      price: '₹42,999',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 1450,
      description: 'Master AI-Driven Product Development, Strategy & Deployment. Learn to build, scale, and manage AI-powered products from conception to market success with hands-on business strategy and real-world applications.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Executive Level',
      skills: ['AI Product Strategy', 'Product Roadmapping', 'AI Business Models', 'Data Strategy', 'AI Ethics', 'Go-to-Market Strategy', 'Cross-functional Leadership', 'AI Risk Management'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium AI Product Course',
        'Experienced Product Leader',
        'Instructor Led/Self-Paced Course',
        'Real-time AI Product Projects',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium AI product training',
        '26+ Years of Technology Training',
        'Executive-Level AI Product Strategy',
        'Strong Business & Technical Knowledge'
      ],
      toolsCovered: ['Google AutoML', 'OpenAI API', 'Notion', 'Miro', 'Figma', 'ProductBoard', 'Aha!', 'Jira AI', 'Tableau AI', 'ThoughtSpot', 'Amplitude', 'Bubble.io'],
      certification: 'AI Product Management Professional Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 189,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Tesla'],
      courseContent: [
        {
          section: 'MONTH 1: FOUNDATIONS OF AI PRODUCT MANAGEMENT',
          topics: [
            'Introduction to AI Product Management',
            'Understanding AI & Machine Learning Basics for PMs',
            'Data-Driven AI Product Management',
            'AI Product Roadmaps & Agile Development'
          ]
        },
        {
          section: 'MONTH 2: AI PRODUCT STRATEGY & DESIGN THINKING',
          topics: [
            'AI Use Cases & Market Research',
            'Designing AI-Powered User Experiences',
            'AI Product Monetization & Go-To-Market Strategy',
            'Managing AI Product Risks & Compliance'
          ]
        },
        {
          section: 'MONTH 3: SCALING & DEPLOYING AI PRODUCTS',
          topics: [
            'AI Product Deployment & Scaling',
            'AI in Business & Enterprise Adoption',
            'AI Product Leadership & Cross-Team Collaboration',
            'Capstone Project & Career Preparation'
          ]
        }
      ]
    },
    {
      id: 18,
      title: 'Generative AI & LLMs Course',
      category: 'ai-development',
      level: 'Advanced',
      duration: '12 weeks',
      lectures: 108,
      price: '₹48,999',
      instructor: 'Dr. Priya Sharma',
      rating: 4.9,
      students: 1850,
      description: 'Master Cutting-Edge AI & Large Language Models (LLMs) for Real-World Applications. Learn to build, fine-tune, and deploy advanced AI models including GPT, LLaMA, and multimodal AI systems.',
      image: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'Advanced AI',
      skills: ['Generative AI', 'Large Language Models', 'Fine-tuning', 'RAG Systems', 'Multimodal AI', 'AI Agents', 'Model Deployment', 'MLOps'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium AI Development Course',
        'Experienced AI Researcher',
        'Instructor Led/Self-Paced Course',
        'Real-time AI Model Projects',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium AI development training',
        '26+ Years of Technology Training',
        'Cutting-Edge AI Model Development',
        'Strong Research & Industry Knowledge'
      ],
      toolsCovered: ['Hugging Face', 'OpenAI API', 'LangChain', 'FAISS', 'Pinecone', 'Stable Diffusion', 'RunwayML', 'ElevenLabs', 'AutoGPT', 'CrewAI', 'FastAPI', 'Streamlit', 'AWS', 'GCP', 'Azure AI'],
      certification: 'Generative AI & LLMs Specialist Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 345,
      companiesHired: ['OpenAI', 'Anthropic', 'Google DeepMind', 'Microsoft Research', 'Meta AI'],
      courseContent: [
        {
          section: 'MONTH 1: FOUNDATIONS OF GENERATIVE AI & LLMS',
          topics: [
            'Introduction to Generative AI & LLMs',
            'Fundamentals of Large Language Models (LLMs)',
            'Prompt Engineering & AI-Powered Applications',
            'Fine-Tuning LLMs for Specific Tasks'
          ]
        },
        {
          section: 'MONTH 2: ADVANCED GEN AI TECHNIQUES & MODEL DEPLOYMENT',
          topics: [
            'Retrieval-Augmented Generation (RAG) & Knowledge Augmentation',
            'Multimodal Generative AI (Text, Image, Video, Audio)',
            'Agents & Autonomous AI Systems',
            'Large-Scale LLM Model Deployment'
          ]
        },
        {
          section: 'MONTH 3: REAL-WORLD LLM APPLICATIONS & MLOPS',
          topics: [
            'Building AI-Powered Chatbots & Virtual Assistants',
            'LLMs in Business, Healthcare & Finance',
            'MLOps for Generative AI & Continuous Improvement',
            'Job Preparation, Portfolio Building & Capstone'
          ]
        }
      ]
    },
    {
      id: 19,
      title: 'AI Tools & AI Agents for Modern Product Management',
      category: 'ai-product-management',
      level: 'Intermediate',
      duration: '10 weeks',
      lectures: 80,
      price: '₹32,999',
      instructor: 'Amit Patel',
      rating: 4.8,
      students: 1350,
      description: 'Essential AI-Powered Tools & AI Agents for Product Managers. Master 25+ cutting-edge AI tools for product ideation, market research, user insights, roadmap planning, and go-to-market strategies.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      tag: 'AI-Enhanced PM',
      skills: ['AI Product Tools', 'Market Research AI', 'User Research AI', 'Product Analytics', 'AI Automation', 'No-Code AI', 'Stakeholder Communication', 'Product Marketing AI'],
      enrollmentStatus: 'Open',
      keyHighlights: [
        'Premium AI Product Tools Course',
        'Experienced Product Manager',
        'Instructor Led/Self-Paced Course',
        'Real-time AI Tool Projects',
        'Assessment/Online Test',
        'Certification',
        'Placement Assistance'
      ],
      whyOSOP: [
        'India\'s most premium AI product tools training',
        '26+ Years of Technology Training',
        'Modern AI-Enhanced Product Management',
        'Strong Practical & Tool Mastery'
      ],
      toolsCovered: ['ChatGPT', 'Claude AI', 'Perplexity AI', 'Crayon AI', 'Dovetail AI', 'Qualtrics AI', 'FullStory AI', 'ProductBoard AI', 'Aha! AI', 'Jira AI', 'Tableau AI', 'ThoughtSpot AI', 'Amplitude AI', 'Figma AI', 'Bubble.io', 'Landbot AI', 'n8n', 'Zapier AI', 'Fireflies AI', 'Notion AI', 'Tome AI', 'Jasper AI', 'AdCreative AI', 'Tidio AI'],
      certification: 'AI-Enhanced Product Management Certification upon successful completion of the course',
      placementAssistance: true,
      reviews: 234,
      companiesHired: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Spotify'],
      courseContent: [
        {
          section: 'AI TOOLS FOR PRODUCT DISCOVERY & RESEARCH',
          topics: [
            'AI for Product Ideation & Market Research',
            'AI for User Research & Customer Insights',
            'AI for Product Roadmap & Prioritization'
          ]
        },
        {
          section: 'AI TOOLS FOR PRODUCT DEVELOPMENT & ANALYTICS',
          topics: [
            'AI for Data-Driven Decision Making',
            'AI for No-Code & Low-Code Prototyping',
            'AI for Automating Product Operations'
          ]
        },
        {
          section: 'AI TOOLS FOR PRODUCT COMMUNICATION & LAUNCH',
          topics: [
            'AI for Stakeholder Communication & Collaboration',
            'AI for Product Marketing & Launches',
            'AI Workflow Integration & Advanced Automation',
            'AI Product Management Best Practices & Future Trends'
          ]
        }
      ]
    }
  ];

const CoursesPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filterRef = useRef<HTMLDivElement>(null);
  
  // Sorting and filtering
  const [sortOption, setSortOption] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    price: [],
    level: [],
    duration: []
  });
  
  // Interactive features
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Use the courses data from outside the component
  const courses: Course[] = coursesData;

  // Helper function
  const getCourseById = (id: number): Course | undefined => {
    return courses.find(course => course.id === id);
  };

  // Replace useEffect to handle URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const query = searchParams.get('search');
    const sort = searchParams.get('sort');
    
    if (category) setActiveCategory(category);
    if (query) setSearchQuery(query);
    if (sort) setSortOption(sort);
    
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('courseWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    
    // Set courses with wishlist status
    const enhancedCourses = courses.map(course => ({
      ...course,
      isWishlisted: savedWishlist ? JSON.parse(savedWishlist).includes(course.id) : false
    }));
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []); // Removed courses dependency to prevent infinite re-renders
  
  // Save params to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== 'all') params.set('category', activeCategory);
    if (searchQuery) params.set('search', searchQuery);
    if (sortOption !== 'popularity') params.set('sort', sortOption);
    
    const newUrl = `${location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [activeCategory, searchQuery, sortOption]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('courseWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Close filters when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Course categories
  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'programming', name: 'Programming' },
    { id: 'data-science', name: 'Data Science' },
    { id: 'business-analysis', name: 'Business Analysis' },
    { id: 'machine-learning', name: 'Machine Learning' },
    { id: 'database', name: 'Database' },
    { id: 'devops', name: 'DevOps & CI/CD' }
  ];

  // Filter options
  const priceRanges = ['Free', 'Under ₹10,000', '₹10,000 - ₹30,000', '₹30,000 - ₹50,000', 'Above ₹50,000'];
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
  const durationOptions = ['Less than 8 weeks', '8-16 weeks', '16-24 weeks', 'Over 24 weeks'];
  
  // Sort options
  const sortOptions = [
    { id: 'popularity', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'newest', name: 'Newest First' },
    { id: 'priceAsc', name: 'Price: Low to High' },
    { id: 'priceDesc', name: 'Price: High to Low' }
  ];

  // Helper function for price sorting
  const getPriceValue = (priceString: string): number => {
    if (priceString === 'Free') return 0;
    return parseInt(priceString.replace(/[^\d]/g, '')) || 0;
  };

  // Sorting function
  const sortCourses = (a: Course, b: Course): number => {
    switch (sortOption) {
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      case 'priceAsc':
        return getPriceValue(a.price) - getPriceValue(b.price);
      case 'priceDesc':
        return getPriceValue(b.price) - getPriceValue(a.price);
      case 'popularity':
      default:
        return b.students - a.students;
    }
  };

  // Apply filters
  const applyFilters = (course: Course): boolean => {
    // Category filter
    const passesCategory = activeCategory === 'all' || course.category === activeCategory;
    
    // Search filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Price filter
    const passesPrice = filters.price.length === 0 || filters.price.some(range => {
      const price = getPriceValue(course.price);
      if (range === 'Free') return price === 0;
      if (range === 'Under ₹10,000') return price < 10000;
      if (range === '₹10,000 - ₹30,000') return price >= 10000 && price <= 30000;
      if (range === '₹30,000 - ₹50,000') return price >= 30000 && price <= 50000;
      if (range === 'Above ₹50,000') return price > 50000;
      return false;
    });
    
    // Level filter
    const passesLevel = filters.level.length === 0 || filters.level.includes(course.level) || 
                       (filters.level.includes('All Levels') && true);
    
    // Duration filter
    const passesDuration = filters.duration.length === 0 || filters.duration.some(range => {
      const durationWeeks = parseInt(course.duration.split(' ')[0]);
      if (range === 'Less than 8 weeks') return durationWeeks < 8;
      if (range === '8-16 weeks') return durationWeeks >= 8 && durationWeeks <= 16;
      if (range === '16-24 weeks') return durationWeeks > 16 && durationWeeks <= 24;
      if (range === 'Over 24 weeks') return durationWeeks > 24;
      return false;
    });
    
    return passesCategory && matchesSearch && passesPrice && passesLevel && passesDuration;
  };

  // Filtered and sorted courses
  const filteredCourses = courses
    .filter(applyFilters)
    .sort(sortCourses);

  // Handler functions
  const handleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(courseId => courseId !== id));
      toast.success('Removed from wishlist');
    } else {
      setWishlist([...wishlist, id]);
      toast.success('Added to wishlist');
    }
  };

  const handleCompare = (id: number) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(courseId => courseId !== id));
    } else {
      if (compareList.length >= 3) {
        toast.error('You can compare up to 3 courses at a time');
        return;
      }
      setCompareList([...compareList, id]);
      if (compareList.length === 0) {
        toast('Tip: Select 2-3 courses to compare', { icon: 'ℹ️' });
      }
    }
  };

  const handleFilterToggle = (type: keyof Filter, value: string) => {
    setFilters(prev => {
      const current = [...prev[type]];
      if (current.includes(value)) {
        return { ...prev, [type]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [type]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({
      price: [],
      level: [],
      duration: []
    });
    setActiveCategory('all');
    setSearchQuery('');
    setSortOption('popularity');
  };

  const showCoursePreview = (course: Course) => {
    // Instead of showing a modal, navigate to the course details page
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground 
            particleCount={70}
            colorScheme={theme === 'dark' ? 'blue' : 'blue'}
            connectParticles={true}
            interactivity={true}
            className="opacity-60"
          />
          
          <CodeBackgroundAnimation
            speed="slow"
            density="low"
            className="opacity-5"
            characters="function(){} class extends React.Component import from export default const = () => {}"
          />
              </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-blue-900/40 text-blue-400 border border-blue-800/50'
                  : 'bg-blue-50 text-blue-700 border border-blue-100'
              }`}>Our Courses</span>
              <span className="text-slate-400">•</span>
              <nav className="flex items-center text-sm">
                <Link to="/" className={theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}>Home</Link>
                <span className="mx-2">/</span>
                <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>Courses</span>
              </nav>
            </div>
            
            <HeroGradientText
              text="Unlock Your Potential"
              gradientColors="from-blue-400 via-indigo-400 to-blue-400"
              animationType="reveal"
              duration={0.8}
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className={`text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Choose from our wide range of courses designed to help you master in-demand skills and advance your career in technology.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Advanced Search and Filter Section */}
      <section className={`py-8 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-blue-50/50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-auto">
              <div className="relative">
              <input
                type="text"
                  placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full md:w-80 pl-12 pr-4 py-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border border-slate-200 text-slate-800 placeholder-slate-400'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
              />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
            </div>
          </div>
          
            {/* Sort dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Sort by:</span>
              <div className="relative">
            <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  aria-label="Sort courses by"
                  className={`pl-4 pr-8 py-2 rounded-lg text-sm ${
                    theme === 'dark'
                      ? 'bg-slate-700 text-white border border-slate-600'
                      : 'bg-white text-slate-800 border border-slate-200'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
          </div>
          
              {/* Filter button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                  theme === 'dark'
                    ? 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600'
                    : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200'
                } transition-colors ${(filters.price.length > 0 || filters.level.length > 0 || filters.duration.length > 0) ? 'border-blue-500' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
                {(filters.price.length > 0 || filters.level.length > 0 || filters.duration.length > 0) && (
                  <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                    theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {filters.price.length + filters.level.length + filters.duration.length}
                  </span>
                )}
              </button>
              
              {showCompare && compareList.length > 0 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                    theme === 'dark'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  } transition-colors`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Compare ({compareList.length})
                </button>
              )}
            </div>
          </div>
          
          {/* Advanced filters dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`mt-4 rounded-xl p-6 shadow-xl ${
                  theme === 'dark'
                    ? 'bg-slate-800 border border-slate-700'
                    : 'bg-white border border-slate-200'
                }`}
                ref={filterRef}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                    Advanced Filters
                  </h3>
                  <button
                    onClick={clearFilters}
                    className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
                  >
                    Clear all filters
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price filter */}
                  <div>
                    <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      {priceRanges.map(range => (
                        <label key={range} className="flex items-center gap-2">
            <input
              type="checkbox"
                            checked={filters.price.includes(range)}
                            onChange={() => handleFilterToggle('price', range)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            {range}
                          </span>
            </label>
                      ))}
          </div>
                  </div>
                  
                  {/* Level filter */}
                  <div>
                    <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Experience Level
                    </h4>
                    <div className="space-y-2">
                      {levelOptions.map(level => (
                        <label key={level} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.level.includes(level)}
                            onChange={() => handleFilterToggle('level', level)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            {level}
                          </span>
                        </label>
                      ))}
        </div>
      </div>
      
                  {/* Duration filter */}
                  <div>
                    <h4 className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      Course Duration
                    </h4>
                    <div className="space-y-2">
                      {durationOptions.map(duration => (
                        <label key={duration} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.duration.includes(duration)}
                            onChange={() => handleFilterToggle('duration', duration)}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                            {duration}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Category Filters */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeCategory === category.id
                    ? theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading ? (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index}
                  className={`rounded-xl overflow-hidden h-full ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border border-slate-700' 
                      : 'bg-white shadow-lg'
                  }`}
                >
                  <div className="h-48 bg-slate-700 animate-pulse"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-6 bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-slate-700 rounded animate-pulse w-3/4"></div>
                    <div className="flex gap-2">
                      <div className="h-3 bg-slate-700 rounded animate-pulse w-1/4"></div>
                      <div className="h-3 bg-slate-700 rounded animate-pulse w-1/4"></div>
                      <div className="h-3 bg-slate-700 rounded animate-pulse w-1/4"></div>
                    </div>
                    <div className="pt-4 flex justify-between items-center border-t border-slate-700">
                      <div className="h-5 bg-slate-700 rounded animate-pulse w-1/4"></div>
                      <div className="h-8 bg-slate-700 rounded animate-pulse w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Courses Grid Section */
        <section className="py-12">
          <div className="container mx-auto px-4">
      {filteredCourses.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    Showing <span className="font-semibold">{filteredCourses.length}</span> courses
                  </p>
                  
                  {wishlist.length > 0 && (
                    <button
                      onClick={() => navigate('/dashboard/wishlist')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm ${
                        theme === 'dark'
                          ? 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
                          : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Wishlist ({wishlist.length})
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses.map(course => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ y: -10, transition: { duration: 0.2 } }}
                      className={`rounded-xl overflow-hidden h-full ${
                        theme === 'dark' 
                          ? 'bg-slate-800 border border-slate-700 hover:border-blue-500/50' 
                          : 'bg-white shadow-lg hover:shadow-xl'
                      } transition-all duration-300 group`}
                    >
                      {/* Course image */}
                      <div className="relative h-48 overflow-hidden group">
              <img
                src={course.image}
                alt={course.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Action buttons */}
                        <div className="absolute top-0 right-0 p-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleWishlist(course.id);
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'
                            } shadow-md hover:scale-110 transition-transform`}
                            aria-label={wishlist.includes(course.id) ? "Remove from wishlist" : "Add to wishlist"}
                          >
                            {wishlist.includes(course.id) ? (
                              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            )}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCompare(course.id);
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'
                            } shadow-md hover:scale-110 transition-transform ${
                              compareList.includes(course.id) ? 'bg-indigo-600' : ''
                            }`}
                            aria-label={compareList.includes(course.id) ? "Remove from comparison" : "Add to comparison"}
                          >
                            <svg className={`w-5 h-5 ${compareList.includes(course.id) ? 'text-white' : 'text-slate-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </button>
                          
                          <Link 
                            to={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'
                            } shadow-md hover:scale-110 transition-transform`}
                            aria-label="View details"
                          >
                            <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                        </div>
                        
                        {/* Course tag or status */}
                        {(course.tag || course.enrollmentStatus !== 'Open') && (
                          <div className="absolute top-4 left-4">
                            {course.enrollmentStatus !== 'Open' && (
                              <div className={`text-xs font-bold px-2 py-1 rounded ${
                                course.enrollmentStatus === 'Coming Soon' 
                                  ? 'bg-yellow-500 text-yellow-900' 
                                  : 'bg-red-500 text-white'
                              }`}>
                                {course.enrollmentStatus}
                </div>
                            )}
                            
                            {course.tag && (
                              <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mt-2">
                                {course.tag}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Course content */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`text-xs rounded-full px-3 py-1 ${
                            theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-blue-50 text-blue-700'
                          }`}>
                            {categories.find(cat => cat.id === course.category)?.name}
                          </span>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                            <span className={`ml-1 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                              {course.rating}
                            </span>
                  </div>
                </div>
                
                        <h3 className={`text-xl font-bold mb-3 ${
                          theme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                          {course.title}
                        </h3>
                        
                        <p className={`text-sm mb-5 line-clamp-2 ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {course.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-5">
                          <div className={`flex items-center text-xs ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {course.duration}
                          </div>
                          
                          <div className={`flex items-center text-xs ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                    {course.level}
                          </div>
                          
                          <div className={`flex items-center text-xs ${
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {course.students.toLocaleString()} students
                          </div>
                        </div>
                        
                        {/* Skills chips */}
                        {course.skills && (
                          <div className="flex flex-wrap gap-2 mb-5">
                            {course.skills.slice(0, 3).map((skill: string, i: number) => (
                              <span
                                key={i}
                                className={`px-2 py-1 text-xs rounded ${
                                  theme === 'dark'
                                    ? 'bg-slate-700 text-slate-300'
                                    : 'bg-slate-100 text-slate-700'
                                }`}
                              >
                                {skill}
                  </span>
                            ))}
                            {course.skills.length > 3 && (
                              <span className={`px-2 py-1 text-xs rounded ${
                                theme === 'dark'
                                  ? 'bg-slate-700 text-slate-300'
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                +{course.skills.length - 3} more
                              </span>
                            )}
                </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-200/20">
                          <div>
                            <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                              {course.price}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                <Link
                  to={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    theme === 'dark' 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
                      : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                  } transition-colors`}
                >
                  View Details
                </Link>
                            
                            <a 
                              href="https://gontq.courses.store/649688?utm_source=other&utm_medium=tutor-course-referral&utm_campaign=course-overview-webapp"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                theme === 'dark'
                                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              } transition-colors`}
                              aria-label={`Enroll now in ${course.title}`}
                            >
                              Enroll Now
                </a>
              </div>
            </div>
                      </div>
                    </motion.div>
          ))}
        </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}`}>
                  🔍
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                  No courses found
                </h3>
                <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className={`mt-4 px-6 py-2 rounded-lg text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors`}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </section>
      )}
      
      {/* Course Comparison Modal */}
      <AnimatePresence>
        {showCompare && compareList.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative w-full max-w-6xl max-h-[90vh] overflow-auto rounded-xl ${
                theme === 'dark' ? 'bg-slate-800' : 'bg-white'
              }`}
            >
            <button
                onClick={() => setShowCompare(false)}
                aria-label="Close comparison modal"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
            </button>
              
              <div className="p-6">
                <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                  Course Comparison
                </h2>
                
                <div className="overflow-x-auto">
                  <table className={`w-full border-collapse ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                    <thead>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <th className="py-3 px-4 text-left min-w-[200px]">Course</th>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <th key={id} className="py-3 px-4 text-center min-w-[250px] relative">
                              <div className="font-medium">{course.title}</div>
            <button
                                onClick={() => handleCompare(id)}
                                aria-label="Remove course from comparison"
                                className="absolute top-3 right-2 text-slate-400 hover:text-red-500"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
            </button>
                            </th>
                          ) : null;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Price</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center font-bold">
                              {course.price}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Duration</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center">
                              {course.duration}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Level</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center">
                              {course.level}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Instructor</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center">
                              {course.instructor}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Lectures</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center">
                              {course.lectures}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Rating</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center">
                              <div className="flex items-center justify-center">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1">{course.rating}</span>
          </div>
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Students</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center">
                              {course.students.toLocaleString()}
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr className={theme === 'dark' ? 'border-b border-slate-700' : 'border-b border-slate-200'}>
                        <td className="py-4 px-4 font-medium">Skills</td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-4 px-4 text-center">
                              <div className="flex flex-wrap gap-1 justify-center">
                                {course.skills?.slice(0, 3).map((skill: string, i: number) => (
                                  <span
                                    key={i}
                                    className={`px-2 py-1 text-xs rounded ${
                                      theme === 'dark'
                                        ? 'bg-slate-700 text-slate-300'
                                        : 'bg-slate-100 text-slate-700'
                                    }`}
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {course.skills && course.skills.length > 3 && (
                                  <span className={`px-2 py-1 text-xs rounded ${
                                    theme === 'dark'
                                      ? 'bg-slate-700 text-slate-300'
                                      : 'bg-slate-100 text-slate-700'
                                  }`}>
                                    +{course.skills.length - 3}
                                  </span>
                                )}
        </div>
                            </td>
                          ) : null;
                        })}
                      </tr>
                      <tr>
                        <td className="py-4 px-4"></td>
                        {compareList.map(id => {
                          const course = courses.find(c => c.id === id);
                          return course ? (
                            <td key={id} className="py-6 px-4 text-center">
                              <Link 
                                to={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setShowCompare(false)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium inline-block ${
                                  theme === 'dark'
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                } transition-colors`}
                              >
                                View Course
                              </Link>
                            </td>
                          ) : null;
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className={`py-20 ${theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-3xl md:text-4xl font-bold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-slate-800'
              }`}
            >
              Not Sure Which Course to Choose?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-xl mb-8 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Get personalized course recommendations based on your goals and current skill level
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                to="/contact" 
                className="px-8 py-4 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Free Counseling
              </Link>
              
              <Link 
                to="/placement" 
                className={`px-8 py-4 rounded-lg font-medium border-2 ${
                  theme === 'dark'
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-900/30'
                    : 'border-blue-600 text-blue-700 hover:bg-blue-100'
                } transition-colors`}
              >
                View Placement Stats
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage; 
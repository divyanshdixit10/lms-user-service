import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
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

// Course data - same as in CoursesPage (moved outside component to prevent re-renders)
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
      syllabus: [
        { week: 1, topic: 'AI for Personal Productivity & Smart Workflows', content: 'ChatGPT, Claude AI, Perplexity AI for research & writing. Fireflies AI, Motion AI for meeting transcription & scheduling. Zapier AI for task automation. Hands-on: Automate meeting notes & summaries using AI.' },
        { week: 2, topic: 'AI for Writing, Emails & Presentations', content: 'Grammarly AI, Jasper AI, Copy.ai for email & content writing. Notion AI, Tome AI for document & presentation creation. Hands-on: Create AI-generated business proposal & presentation.' },
        { week: 3, topic: 'AI for Business Automation & CRM', content: 'HubSpot AI, Tidio AI for customer engagement & chatbots. AdCreative AI for ad content generation. Hands-on: Automate customer support responses using AI.' },
        { week: 4, topic: 'AI for Research & Data Analysis', content: 'ChatGPT Advanced Data Analysis for Excel & Sheets insights. Looker Studio AI for BI dashboards. Hands-on: Automate market research & competitor analysis using AI.' },
        { week: 5, topic: 'AI for Video Editing & Creation', content: 'Runway ML, Pictory AI, Synthesia AI for video generation. Descript for podcast & video editing. Hands-on: Create AI-generated video ad for a product.' },
        { week: 6, topic: 'AI for Image & Graphic Design', content: 'DALL-E, MidJourney, Leonardo AI for art & graphics. Canva AI for social media graphics. Hands-on: Create AI-generated Instagram posts & banners.' },
        { week: 7, topic: 'AI for Music & Voice Generation', content: 'Suno AI, ElevenLabs AI for voiceovers & music. Murf AI for audiobook voice creation. Hands-on: Generate AI voiceover & background music for YouTube video.' },
        { week: 8, topic: 'AI for SEO & Marketing Optimization', content: 'Surfer SEO, Writesonic for SEO content optimization. AdCreative AI for ad copy & creatives. Hands-on: Create AI-optimized blog content & ads.' },
        { week: 9, topic: 'AI for E-Commerce & Sales Optimization', content: 'Tidio AI for customer service chatbots. AdCreative AI for product ad generation. Hands-on: Set up AI chatbot for online store.' },
        { week: 10, topic: 'AI for Advanced Research & Data Insights', content: 'Perplexity AI Pro, ChatGPT Data Analysis for deep research. SheetAI for data processing automation. Hands-on: Automate business report with AI insights.' },
        { week: 11, topic: 'AI for No-Code & Low-Code Development', content: 'Bubble.io, Zapier AI for no-code app development. Codeium, GitHub Copilot for coding assistance. Hands-on: Build no-code AI-powered app using Zapier.' },
        { week: 12, topic: 'AI for Freelancing & Job Market Readiness', content: 'Monetizing AI skills (Freelancing, Consulting, Startups). Ethical AI & Responsible AI Usage. Final Capstone Project: Build AI-powered content/marketing system.' }
      ],
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
      syllabus: [
        { week: 1, topic: 'Introduction to Prompt Engineering & AI Models', content: 'What is Prompt Engineering? How LLMs work (GPT-4, Claude, Gemini, LLaMA). Tokens, Context Windows & Model Behavior. Hands-on: Experiment with ChatGPT, Claude AI, Gemini & LLaMA.' },
        { week: 2, topic: 'Fundamentals of Effective Prompt Writing', content: 'Direct & Indirect Prompts. Zero-Shot, Few-Shot, & Chain-of-Thought Prompting. Role-Playing & Instruction-Based Prompting. Hands-on: Optimize Customer Support Chatbot using Effective Prompts.' },
        { week: 3, topic: 'Advanced Prompting Techniques', content: 'Contextual Memory & Long-Form Prompting. Using Examples & Demos for Better Responses. Refining Prompts with Iterative Testing. Hands-on: Develop Custom AI Writing Assistant using Prompt Iteration.' },
        { week: 4, topic: 'AI for Text Generation & Summarization', content: 'AI-Powered Text Summarization (Extractive vs. Abstractive). AI for Content Writing & Creative Storytelling. Rewriting & Paraphrasing with AI. Hands-on: Build AI-Generated Article Summarizer.' },
        { week: 5, topic: 'AI for Business & Marketing Prompting', content: 'AI for SEO & Blog Content Optimization. AI-Generated Marketing Ad Copy & Campaigns. AI-Powered Email Writing & Customer Engagement. Hands-on: Generate AI-Optimized Marketing Content for Brand.' },
        { week: 6, topic: 'AI for Code Generation & Software Development', content: 'Prompting for AI Code Assistants (GitHub Copilot, Codeium, Tabnine). Debugging & Code Refactoring with AI. AI for API Documentation & Technical Writing. Hands-on: Use AI to Generate & Debug Python Code.' },
        { week: 7, topic: 'AI for Data Analysis & Visualization', content: 'Using Prompting for AI-Powered Data Insights. Generating SQL Queries with AI. Automating Report Writing & Business Dashboards. Hands-on: Create AI-Powered Data Analysis Report using Prompting.' },
        { week: 8, topic: 'AI for Images, Videos & Creative Work', content: 'AI Image Generation with DALL-E, MidJourney, Leonardo AI. AI-Powered Video Generation & Editing (RunwayML, Pictory AI). AI for Graphic Design & Presentations. Hands-on: Generate AI-Designed Social Media Graphics.' },
        { week: 9, topic: 'AI for Automation & No-Code AI Development', content: 'AI for Workflow Automation (Zapier AI, Make AI). AI-Driven Chatbots & Virtual Assistants. AI for Business Process Automation. Hands-on: Automate Business Workflows using AI-Powered Prompts.' },
        { week: 10, topic: 'RAG (Retrieval-Augmented Generation) & AI Search', content: 'Introduction to RAG & Contextual Search. Using Vector Databases (FAISS, Pinecone). AI-Powered Document Q&A Systems. Hands-on: Build AI-Powered Research Assistant using RAG.' },
        { week: 11, topic: 'AI Agents & Autonomous Prompting', content: 'Introduction to AutoGPT, BabyAGI & CrewAI. Multi-Step Prompts for Autonomous AI. AI Planning & Task Automation with Prompts. Hands-on: Develop AI Agent for Automated Content Creation.' },
        { week: 12, topic: 'Capstone Project & Career Preparation', content: 'Resume Optimization for AI & Prompt Engineering Roles. Portfolio Building & AI Project Deployment. Prompt Engineering Interview Questions & Mock Interviews. Final Capstone: Build & Deploy AI-Powered Application.' }
      ],
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
      syllabus: [
        { week: 1, topic: 'Introduction to AI Product Management', content: 'What is AI Product Management? Traditional vs. AI-Driven Product Management. AI Business Strategy & Market Opportunities. Understanding AI Development Lifecycle. Hands-on: Analyze successful AI products.' },
        { week: 2, topic: 'Understanding AI & Machine Learning Basics for PMs', content: 'AI vs. ML vs. Deep Learning. Types of Machine Learning. AI Model Lifecycle. No-Code AI Tools for PMs. Hands-on: Use Google AutoML or OpenAI API to experiment with AI capabilities.' },
        { week: 3, topic: 'Data-Driven AI Product Management', content: 'Importance of Data in AI Products. Data Collection, Cleaning, & Feature Engineering. Data Strategy & Governance. Understanding Bias & Fairness in AI. Hands-on: Define data strategy for AI recommendation system.' },
        { week: 4, topic: 'AI Product Roadmaps & Agile Development', content: 'How AI Impacts Agile Development. Defining AI Product Roadmaps & MVP Development. Cross-functional Collaboration. Lean AI Product Development. Hands-on: Create AI-driven product roadmap using Notion/Miro.' },
        { week: 5, topic: 'AI Use Cases & Market Research', content: 'Identifying AI Product Opportunities. Competitive Analysis of AI Products. AI Business Models. Customer Persona Mapping for AI Adoption. Hands-on: Market research for AI-powered fintech/healthcare product.' },
        { week: 6, topic: 'Designing AI-Powered User Experiences', content: 'AI & UX: Designing AI Interactions. Human-Centered AI Design & Ethical AI Principles. AI Explainability & Trust. Prototyping AI Interfaces. Hands-on: Create low-fidelity prototype of AI chatbot product.' },
        { week: 7, topic: 'AI Product Monetization & Go-To-Market Strategy', content: 'Business Models for AI Products. AI API Monetization & Subscription Pricing. AI Product Positioning & Market Entry. AI-Powered Growth Hacking. Hands-on: Develop GTM strategy for AI SaaS product.' },
        { week: 8, topic: 'Managing AI Product Risks & Compliance', content: 'Ethical Considerations & AI Regulations. AI Model Interpretability & Transparency. Security & Privacy Challenges. Risk Mitigation in AI Decision-Making. Hands-on: AI risk assessment for voice assistant product.' },
        { week: 9, topic: 'AI Product Deployment & Scaling', content: 'Basics of AI Deployment (Cloud AI, APIs, Edge AI). Managing AI Models in Production. Continuous Model Improvement & Model Drift Detection. AI Product Performance Metrics & KPIs. Hands-on: Define key AI performance metrics.' },
        { week: 10, topic: 'AI in Business & Enterprise Adoption', content: 'AI in Healthcare, Finance, E-Commerce & Other Industries. Enterprise AI Adoption Challenges & Solutions. AI Integration with Existing Systems. ROI Analysis for AI Investments. Hands-on: Build AI impact report for enterprise solution.' },
        { week: 11, topic: 'AI Product Leadership & Cross-Team Collaboration', content: 'Working with AI Engineers, Data Scientists & Stakeholders. AI Product Ownership vs. Engineering Leadership. Aligning AI Product Goals with Business Strategy. Communicating AI Product Value to Executives. Hands-on: Prepare pitch deck for AI product proposal.' },
        { week: 12, topic: 'Capstone Project & Career Preparation', content: 'Resume Optimization for AI PM Roles. AI Product Management Case Studies & Mock Interviews. Building Portfolio with AI Product Roadmaps. Final Capstone: Develop AI Product Strategy, Roadmap & Business Model for AI Startup.' }
      ],
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
      syllabus: [
        { week: 1, topic: 'Introduction to Generative AI & LLMs', content: 'What is Generative AI? Evolution of AI Models. LLMs vs. Traditional ML Models. Generative AI Applications in Industries. AI Ethics, Bias & Responsible AI. Hands-on: Explore different Generative AI models.' },
        { week: 2, topic: 'Fundamentals of Large Language Models (LLMs)', content: 'How LLMs Work: Transformers, Attention Mechanism. Tokenization, Embeddings & Context Windows. Pretraining vs. Fine-Tuning vs. RAG. Hugging Face & OpenAI API Exploration. Hands-on: Experimenting with GPT-4, LLaMA 3, Mistral using APIs.' },
        { week: 3, topic: 'Prompt Engineering & AI-Powered Applications', content: 'Basics of Prompt Engineering. Zero-shot, Few-shot & Chain-of-Thought Prompting. AI-Augmented Creativity: Text Generation, Summarization, Code Generation. Building AI-Powered Writing Assistants. Hands-on: Build ChatGPT-powered writing assistant.' },
        { week: 4, topic: 'Fine-Tuning LLMs for Specific Tasks', content: 'How to Fine-Tune an LLM: Data Preparation & Transfer Learning. Hugging Face Trainer & OpenAI Fine-Tuning API. Case Study: Fine-Tuning for Domain-Specific Chatbots. Limitations & Costs of Fine-Tuning. Hands-on: Fine-tune small-scale LLM for specific industry.' },
        { week: 5, topic: 'Retrieval-Augmented Generation (RAG) & Knowledge Augmentation', content: 'RAG for Enhancing LLM Capabilities. Using Vector Databases (FAISS, Pinecone). Building AI-Powered Q&A System. Leveraging OpenAI + LangChain for RAG. Hands-on: Build RAG-based chatbot for enterprise knowledge base.' },
        { week: 6, topic: 'Multimodal Generative AI (Text, Image, Video, Audio)', content: 'Introduction to Multimodal AI Models (Gemini, GPT-4V, Stable Diffusion). AI-Powered Image Generation (DALL-E, MidJourney, Stable Diffusion). AI-Powered Video & Audio Synthesis (RunwayML, ElevenLabs). Applications of Multimodal AI. Hands-on: Generate AI-powered marketing materials.' },
        { week: 7, topic: 'Agents & Autonomous AI Systems', content: 'AI Agents & Workflow Automation (AutoGPT, BabyAGI, CrewAI). LangChain for Building Autonomous AI Agents. AI Planning & Decision-Making Models. Ethical Considerations in Autonomous AI. Hands-on: Create AI Agent that automates customer support responses.' },
        { week: 8, topic: 'Large-Scale LLM Model Deployment', content: 'Deploying LLMs using OpenAI, Hugging Face, & Google Vertex AI. Using FastAPI, Flask & Streamlit for Model Deployment. Cloud Deployment (AWS Lambda, GCP, Azure AI). Optimizing Inference Speed & Cost. Hands-on: Deploy fine-tuned chatbot as web API.' },
        { week: 9, topic: 'Building AI-Powered Chatbots & Virtual Assistants', content: 'Custom Chatbots using OpenAI API & LangChain. Memory, Personalization & Context Awareness. Deploying Chatbots on WhatsApp, Slack, Discord. Speech-to-Text & Text-to-Speech AI Integration. Hands-on: Build & deploy AI chatbot for customer support.' },
        { week: 10, topic: 'LLMs in Business, Healthcare & Finance', content: 'AI for Business Intelligence & Process Automation. AI in Healthcare (Medical Chatbots, Diagnosis AI). AI for Finance (Fraud Detection, Algorithmic Trading). Ethical AI in Industry. Hands-on: Develop LLM-powered AI tool for industry-specific task.' },
        { week: 11, topic: 'MLOps for Generative AI & Continuous Improvement', content: 'Introduction to MLOps for AI Model Deployment. AI Model Versioning, Monitoring & Scaling. CI/CD Pipelines for AI. Cost Optimization for AI Applications. Hands-on: Set up AI model deployment pipeline with MLOps best practices.' },
        { week: 12, topic: 'Job Preparation, Portfolio Building & Capstone', content: 'Resume Optimization for AI & LLM Careers. AI & LLM Interview Preparation. Building Public AI Portfolio on GitHub & Hugging Face. Capstone Project Presentation. Final Capstone: Build End-to-End AI-Powered Business Solution.' }
      ],
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
      syllabus: [
        { week: 1, topic: 'AI for Product Ideation & Market Research', content: 'ChatGPT/Claude AI/Gemini AI for research & brainstorming. Perplexity AI for market research & insights. Crayon AI for competitive intelligence. Trend Hunter AI for trend discovery. Hands-on: Generate product features based on customer pain points.' },
        { week: 2, topic: 'AI for User Research & Customer Insights', content: 'Dovetail AI for customer feedback analysis. Qualtrics AI for UX & customer experience insights. FullStory AI for digital experience analytics. Hands-on: Identify top pain points from customer support data and predict feature adoption rates.' },
        { week: 3, topic: 'AI for Product Roadmap & Prioritization', content: 'ProductBoard AI for product roadmap planning. Aha! AI for feature prioritization & strategy. Jira AI for automated sprint planning & backlog management. Hands-on: Automatically rank product backlog items by impact score.' },
        { week: 4, topic: 'AI for Data-Driven Decision Making', content: 'Tableau AI/Power BI AI for data visualization & dashboards. ThoughtSpot AI for self-service product analytics. Amplitude AI for behavioral product analytics. Hands-on: Create real-time dashboard tracking feature adoption and user retention.' },
        { week: 5, topic: 'AI for No-Code & Low-Code Prototyping', content: 'Figma AI for UI design & prototyping. Bubble.io AI for no-code app building. Landbot AI for no-code chatbot creation. Hands-on: Build working MVP of customer feedback app and AI chatbot without coding.' },
        { week: 6, topic: 'AI for Automating Product Operations', content: 'n8n for no-code AI workflow automation. LangGraph for low-code AI agent development. Zapier AI for workflow automation. Hands-on: Automate feature tracking, customer feedback processing, and auto-generate release notes.' },
        { week: 7, topic: 'AI for Stakeholder Communication & Collaboration', content: 'Fireflies AI for meeting notes & action items. Notion AI for product documentation & wiki. Tome AI for pitch deck & presentation generation. Hands-on: Generate feature spec document and roadmap update deck.' },
        { week: 8, topic: 'AI for Product Marketing & Launches', content: 'Jasper AI/Copy.ai for product marketing content. AdCreative AI for ad generation. Tidio AI for chatbots & support. Hands-on: Create feature announcement email and high-converting ad banners for product launch.' },
        { week: 9, topic: 'AI Workflow Integration & Advanced Automation', content: 'Integrating multiple AI tools for end-to-end product workflows. Advanced automation scenarios for product teams. AI-powered product analytics and reporting. Hands-on: Build comprehensive AI-powered product management workflow.' },
        { week: 10, topic: 'AI Product Management Best Practices & Future Trends', content: 'Best practices for AI tool adoption in product teams. Future trends in AI-enhanced product management. Building AI-first product culture. Hands-on: Create AI transformation roadmap for product organization.' }
      ],
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

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);
  const [syllabusSearch, setSyllabusSearch] = useState('');
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  const [syllabusView, setSyllabusView] = useState<'timeline' | 'grid' | 'list'>('timeline');

  // Helper functions for syllabus
  const toggleWeekExpansion = (week: number) => {
    setExpandedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    );
  };

  const toggleWeekCompletion = (week: number) => {
    setCompletedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week)
        : [...prev, week]
    );
  };

  const filteredSyllabus = course?.syllabus?.filter(item =>
    item.topic.toLowerCase().includes(syllabusSearch.toLowerCase()) ||
    item.content.toLowerCase().includes(syllabusSearch.toLowerCase())
  ) || [];

  const progressPercentage = course?.syllabus ? 
    (completedWeeks.length / course.syllabus.length) * 100 : 0;

  // Use the courses data from outside the component
  const courses: Course[] = coursesData;

  useEffect(() => {
    // Simulate API call
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        console.log('Current courseId parameter:', courseId);
        console.log('All available courses:', courses.map(c => ({ id: c.id, title: c.title })));
        
        // In a real app, this would be an API call
        // Here we're handling both numeric IDs and slug-based URLs
        const isNumeric = /^\d+$/.test(courseId || '');
        
        let foundCourse;
        if (isNumeric) {
          console.log('Looking for course with numeric ID:', courseId);
          foundCourse = courses.find(c => c.id === Number(courseId));
        } else {
          // If it's not a number, assume it's a slug
          console.log('Looking for course with slug:', courseId);
          
          // More flexible matching - normalize slugs for comparison
          const normalizedSlug = courseId?.toLowerCase().replace(/\s+/g, '-') || '';
          
          foundCourse = courses.find(c => {
            // Generate different slug variations for more flexible matching
            const courseSlug = c.title.toLowerCase().replace(/\s+/g, '-');
            const simplifiedSlug = c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            
            const isMatch = 
              courseSlug === normalizedSlug || 
              simplifiedSlug === normalizedSlug ||
              (normalizedSlug && c.title.toLowerCase().includes(normalizedSlug)) ||
              (normalizedSlug && c.title.toLowerCase().replace(/\s+/g, '') === normalizedSlug.replace(/-/g, ''));
              
            if (isMatch) {
              console.log('Found match for:', c.title, 'with slug:', courseSlug);
            }
            
            return isMatch;
          });
        }
        
        if (foundCourse) {
          console.log('Found course:', foundCourse.title);
          setCourse(foundCourse);
        } else {
          // If still not found, try a less strict matching as fallback
          if (!isNumeric && courseId) {
            console.log('Attempting fallback partial match for:', courseId);
            const partialMatch = courses.find(c => 
              c.title.toLowerCase().includes(courseId.toLowerCase().replace(/-/g, ' ')) ||
              courseId.toLowerCase().includes(c.title.toLowerCase().replace(/\s+/g, ''))
            );
            
            if (partialMatch) {
              console.log('Found partial match:', partialMatch.title);
              setCourse(partialMatch);
              return;
            }
          }
          
          console.error('No course found for ID/slug:', courseId);
          toast.error('Course not found');
          navigate('/courses');
        }
      } catch (error) {
        console.error('Error loading course:', error);
        toast.error('Error loading course details');
        navigate('/courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);



  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Render error state if course not found
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Course Not Found</h1>
        <p className="mb-8">The course you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/courses" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Browse All Courses
        </Link>
      </div>
    );
  }

  // Generate stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="none" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="url(#half-gradient)" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Course Header Section */}
      <div className={`py-16 ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Course image */}
            <div className="md:w-1/3">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full object-cover aspect-video"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/600x400?text=Course+Image";
                  }}
                />
              </div>
              
              {/* Price card */}
              <div className={`mt-6 p-6 rounded-xl ${
                theme === 'dark' 
                  ? 'bg-slate-800 border border-slate-700' 
                  : 'bg-white shadow-lg'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    {course.price}
                  </span>
                  {course.tag && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.tag === 'New' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : course.tag === 'Popular' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {course.tag}
                    </span>
                  )}
                </div>
                
                <a
                  href="https://gontq.courses.store/649688?utm_source=other&utm_medium=tutor-course-referral&utm_campaign=course-overview-webapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 px-4 rounded-lg font-medium transition-colors text-center ${
                    isEnrolled 
                      ? 'bg-green-600 text-white cursor-not-allowed pointer-events-none'
                      : course.enrollmentStatus === 'Open'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-gray-400 cursor-not-allowed text-white pointer-events-none'
                  }`}
                >
                  {isEnrolled 
                    ? 'Enrolled' 
                    : course.enrollmentStatus === 'Open' 
                      ? 'Enroll Now' 
                      : course.enrollmentStatus === 'Coming Soon' 
                        ? 'Coming Soon'
                        : 'Enrollment Closed'
                  }
                </a>
                
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Duration</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Level</span>
                    <span className="font-medium">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Lectures</span>
                    <span className="font-medium">{course.lectures}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Enrolled</span>
                    <span className="font-medium">{course.students.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Course information */}
            <div className="md:w-2/3">
              <nav className="flex mb-4">
                <Link to="/courses" className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Courses
                </Link>
                <span className="mx-2">/</span>
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                  {course.category}
                </span>
              </nav>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex mr-2">
                  {renderStars(course.rating)}
                </div>
                <span className="text-sm mr-4">{course.rating.toFixed(1)} ({course.students} students)</span>
                
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  course.level === 'Beginner' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : course.level === 'Intermediate' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {course.level}
                </span>
              </div>
              
              <p className="mb-6">
                <span className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  Instructor: 
                </span>
                <span className="font-medium ml-1">{course.instructor}</span>
              </p>
              
              <p className={`mb-8 text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                {course.description}
              </p>
              
              {/* Course tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
                <nav className="flex space-x-8">
                  {['overview', 'syllabus', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                        activeTab === tab
                          ? theme === 'dark'
                            ? 'border-indigo-500 text-indigo-400'
                            : 'border-indigo-600 text-indigo-600'
                          : theme === 'dark'
                            ? 'border-transparent text-slate-400 hover:text-slate-300'
                            : 'border-transparent text-slate-600 hover:text-slate-800'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
              
              {/* Tab content */}
              <div>
                {activeTab === 'overview' && (
                  <div className="space-y-12">
                    {/* Course Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`p-4 rounded-xl text-center ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-800/50' 
                            : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
                        }`}
                      >
                        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
                          {course.lectures}
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Lectures
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`p-4 rounded-xl text-center ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-800/50' 
                            : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
                        }`}
                      >
                        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          {course.duration}
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Duration
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`p-4 rounded-xl text-center ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-800/50' 
                            : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
                        }`}
                      >
                        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                          {course.level}
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Level
                        </div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`p-4 rounded-xl text-center ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-800/50' 
                            : 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200'
                        }`}
                      >
                        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>
                          {course.students.toLocaleString()}
                        </div>
                        <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                          Students
                        </div>
                      </motion.div>
                    </div>

                    {/* What you'll learn */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`p-8 rounded-2xl ${
                        theme === 'dark' 
                          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50' 
                          : 'bg-gradient-to-br from-white to-blue-50/50 border border-blue-100 shadow-lg'
                      }`}
                    >
                      <div className="flex items-center mb-6">
                        <div className={`p-3 rounded-xl mr-4 ${
                          theme === 'dark' ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold">What You'll Master</h3>
                      </div>
                    {course.skills && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.skills.map((skill, index) => (
                            <motion.div 
                              key={index} 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                              className={`flex items-center p-4 rounded-xl ${
                                theme === 'dark' 
                                  ? 'bg-slate-700/50 hover:bg-slate-700/80' 
                                  : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-md'
                              } transition-all duration-300 group cursor-pointer`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                theme === 'dark' ? 'bg-indigo-600/30 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
                              } group-hover:scale-110 transition-transform`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                              <span className="font-medium">{skill}</span>
                            </motion.div>
                        ))}
                      </div>
                    )}
                    </motion.div>

                    {/* Key Highlights */}
                    {course.keyHighlights && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className={`p-8 rounded-2xl ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/50' 
                            : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg'
                        }`}
                      >
                        <div className="flex items-center mb-6">
                          <div className={`p-3 rounded-xl mr-4 ${
                            theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                          }`}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold">Course Highlights</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.keyHighlights.map((highlight, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                              className={`flex items-center p-4 rounded-xl ${
                                theme === 'dark' 
                                  ? 'bg-slate-800/60 hover:bg-slate-800/90' 
                                  : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-md'
                              } transition-all duration-300 group cursor-pointer`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                theme === 'dark' ? 'bg-green-600/30 text-green-400' : 'bg-green-100 text-green-600'
                              } group-hover:scale-110 transition-transform`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <span className="font-medium">{highlight}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Why OSOP */}
                    {course.whyOSOP && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className={`p-8 rounded-2xl ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-800/50' 
                            : 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 shadow-lg'
                        }`}
                      >
                        <div className="flex items-center mb-6">
                          <div className={`p-3 rounded-xl mr-4 ${
                            theme === 'dark' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold">Why Choose OSOP?</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {course.whyOSOP.map((reason, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.0 + index * 0.1 }}
                              className={`flex items-center p-4 rounded-xl ${
                                theme === 'dark' 
                                  ? 'bg-slate-800/60 hover:bg-slate-800/90' 
                                  : 'bg-white/80 hover:bg-white shadow-sm hover:shadow-md'
                              } transition-all duration-300 group cursor-pointer`}
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                                theme === 'dark' ? 'bg-yellow-600/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
                              } group-hover:scale-110 transition-transform`}>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                              </div>
                              <span className="font-medium">{reason}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Tools and Certification Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Tools Covered */}
                      {course.toolsCovered && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 }}
                          className={`p-6 rounded-2xl ${
                            theme === 'dark' 
                              ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/50' 
                              : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg'
                          }`}
                        >
                          <div className="flex items-center mb-4">
                            <div className={`p-2 rounded-lg mr-3 ${
                              theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                            }`}>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold">Tools & Technologies</h3>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {course.toolsCovered.map((tool, index) => (
                              <motion.span 
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 + index * 0.1 }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${
                                  theme === 'dark' 
                                    ? 'bg-slate-700/80 text-slate-300 border border-slate-600/50 hover:bg-slate-700 hover:border-blue-500/50' 
                                    : 'bg-white/80 text-blue-700 border border-blue-200 hover:bg-blue-50 hover:border-blue-300 shadow-sm hover:shadow-md'
                                }`}
                              >
                                {tool}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Certification */}
                      {course.certification && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.1 }}
                          className={`p-6 rounded-2xl ${
                            theme === 'dark' 
                              ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/50' 
                              : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg'
                          }`}
                        >
                          <div className="flex items-center mb-4">
                            <div className={`p-2 rounded-lg mr-3 ${
                              theme === 'dark' ? 'bg-green-600/20 text-green-400' : 'bg-green-100 text-green-600'
                            }`}>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            </div>
                            <h3 className="text-xl font-bold">Certification</h3>
                          </div>
                          <p className={`leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-green-800'}`}>
                            {course.certification}
                          </p>
                          {course.placementAssistance && (
                            <div className={`mt-4 p-3 rounded-lg ${
                              theme === 'dark' ? 'bg-slate-800/60' : 'bg-white/60'
                            }`}>
                              <div className="flex items-center">
                                <svg className={`w-4 h-4 mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                                </svg>
                                <span className="text-sm font-medium">Placement Assistance Included</span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Companies Hired */}
                    {course.companiesHired && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 }}
                        className={`p-8 rounded-2xl ${
                          theme === 'dark' 
                            ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/50' 
                            : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 shadow-lg'
                        }`}
                      >
                        <div className="flex items-center mb-6">
                          <div className={`p-3 rounded-xl mr-4 ${
                            theme === 'dark' ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                          }`}>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <h3 className="text-2xl font-bold">Our Alumni Work At</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                          {course.companiesHired.map((company, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.4 + index * 0.1 }}
                              className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer group ${
                                theme === 'dark' 
                                  ? 'bg-slate-800/60 border border-slate-700/50 hover:bg-slate-800/90 hover:border-purple-500/50' 
                                  : 'bg-white/80 border border-purple-200 hover:bg-white hover:border-purple-300 shadow-sm hover:shadow-md'
                              }`}
                            >
                              <span className={`font-medium text-sm transition-colors ${
                                theme === 'dark' ? 'text-slate-300 group-hover:text-purple-400' : 'text-slate-700 group-hover:text-purple-600'
                              }`}>
                                {company}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
                
                {activeTab === 'syllabus' && (
                  <div className="space-y-8">
                    {/* Syllabus Header with Controls */}
                    <div className={`p-6 rounded-2xl ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-slate-700/50' 
                        : 'bg-gradient-to-r from-white to-blue-50/50 border border-blue-100 shadow-lg'
                    }`}>
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                  <div>
                          <h3 className="text-2xl font-bold mb-2">Course Curriculum</h3>
                          <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                            {course?.syllabus?.length || 0} weeks • Comprehensive learning path
                          </p>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="flex-1 max-w-md">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                          </div>
                          <div className={`w-full h-3 rounded-full ${
                            theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                          }`}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progressPercentage}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Search and View Controls */}
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Search curriculum topics..."
                            value={syllabusSearch}
                            onChange={(e) => setSyllabusSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg ${
                              theme === 'dark' 
                                ? 'bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400' 
                                : 'bg-white border border-slate-200 text-slate-800 placeholder-slate-400'
                            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                          />
                          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>

                        {/* View Toggle */}
                        <div className={`flex rounded-lg p-1 ${
                          theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'
                        }`}>
                          {(['timeline', 'grid', 'list'] as const).map((view) => (
                            <button
                              key={view}
                              onClick={() => setSyllabusView(view)}
                              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                syllabusView === view
                                  ? theme === 'dark'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-blue-600 text-white shadow-lg'
                                  : theme === 'dark'
                                    ? 'text-slate-400 hover:text-white hover:bg-slate-600/50'
                                    : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
                              }`}
                            >
                              {view.charAt(0).toUpperCase() + view.slice(1)}
                            </button>
                          ))}
                        </div>

                        {/* Bulk Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setExpandedWeeks(filteredSyllabus.map(item => item.week))}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              theme === 'dark'
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            Expand All
                          </button>
                          <button
                            onClick={() => setExpandedWeeks([])}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              theme === 'dark'
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            Collapse All
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Syllabus Content */}
                    {course?.syllabus ? (
                      <div className={`${
                        syllabusView === 'grid' 
                          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                          : syllabusView === 'list'
                          ? 'space-y-4'
                          : 'space-y-6'
                      }`}>
                        {filteredSyllabus.map((item, index) => (
                          <motion.div
                            key={item.week}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${
                              syllabusView === 'timeline' 
                                ? 'relative pl-8 pb-8'
                                : syllabusView === 'grid'
                                ? 'h-full'
                                : ''
                            }`}
                          >
                            {/* Timeline Line */}
                            {syllabusView === 'timeline' && (
                              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-indigo-600" />
                            )}

                            {/* Timeline Dot */}
                            {syllabusView === 'timeline' && (
                              <div className={`absolute left-0 top-6 w-4 h-4 rounded-full transform -translate-x-1/2 ${
                                completedWeeks.includes(item.week)
                                  ? 'bg-green-500 ring-4 ring-green-500/20'
                                  : 'bg-blue-500 ring-4 ring-blue-500/20'
                              } transition-all duration-300`} />
                            )}

                            <div className={`rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${
                              theme === 'dark' 
                                ? 'bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50' 
                                : 'bg-white border border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
                            } ${expandedWeeks.includes(item.week) ? 'ring-2 ring-blue-500/20' : ''}`}>
                              
                              {/* Week Header */}
                              <div 
                                className={`p-6 cursor-pointer transition-all duration-300 ${
                                  expandedWeeks.includes(item.week)
                                    ? theme === 'dark'
                                      ? 'bg-blue-900/30'
                                      : 'bg-blue-50'
                                    : 'hover:bg-opacity-50'
                                }`}
                                onClick={() => toggleWeekExpansion(item.week)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    {/* Week Number Badge */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${
                                      completedWeeks.includes(item.week)
                                        ? 'bg-green-500 text-white'
                                        : theme === 'dark'
                                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                        : 'bg-blue-100 text-blue-600 border border-blue-200'
                                    }`}>
                                      {completedWeeks.includes(item.week) ? (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                      ) : (
                                        item.week
                                      )}
                                    </div>

                                    <div className="flex-1">
                                      <h4 className="text-lg font-bold mb-1">Week {item.week}</h4>
                                      <h5 className={`font-semibold ${
                                        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                                      }`}>
                                        {item.topic}
                                      </h5>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-2">
                                    {/* Completion Toggle */}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleWeekCompletion(item.week);
                                      }}
                                      className={`p-2 rounded-lg transition-all ${
                                        completedWeeks.includes(item.week)
                                          ? 'bg-green-500 text-white hover:bg-green-600'
                                          : theme === 'dark'
                                          ? 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-green-400'
                                          : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                                      }`}
                                      title={completedWeeks.includes(item.week) ? 'Mark as incomplete' : 'Mark as complete'}
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </button>

                                    {/* Expand/Collapse Icon */}
                                    <motion.div
                                      animate={{ rotate: expandedWeeks.includes(item.week) ? 180 : 0 }}
                                      transition={{ duration: 0.3 }}
                                      className={`p-2 rounded-lg ${
                                        theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                                      }`}
                                    >
                                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </motion.div>
                                  </div>
                                </div>
                              </div>

                              {/* Expandable Content */}
                              <motion.div
                                initial={false}
                                animate={{
                                  height: expandedWeeks.includes(item.week) ? 'auto' : 0,
                                  opacity: expandedWeeks.includes(item.week) ? 1 : 0
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="p-6 pt-0">
                                  <div className={`p-4 rounded-xl ${
                                    theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'
                                  }`}>
                                    <h6 className="font-semibold mb-3 flex items-center">
                                      <svg className={`w-5 h-5 mr-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      Learning Objectives
                                    </h6>
                                    <p className={`leading-relaxed ${
                                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                                    }`}>
                              {item.content}
                            </p>
                          </div>

                                  {/* Additional Features for Expanded View */}
                                  <div className="mt-4 flex flex-wrap gap-3">
                                    <div className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                                      theme === 'dark' ? 'bg-slate-700/50 text-slate-300' : 'bg-white text-slate-600 border border-slate-200'
                                    }`}>
                                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      ~5-7 hours
                                    </div>
                                    <div className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                                      theme === 'dark' ? 'bg-slate-700/50 text-slate-300' : 'bg-white text-slate-600 border border-slate-200'
                                    }`}>
                                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                      Video Lectures
                                    </div>
                                    <div className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                                      theme === 'dark' ? 'bg-slate-700/50 text-slate-300' : 'bg-white text-slate-600 border border-slate-200'
                                    }`}>
                                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      Assignments
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-slate-700' : 'text-slate-300'}`}>
                          📚
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                          Curriculum Coming Soon
                        </h3>
                        <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
                          Detailed syllabus will be available soon.
                        </p>
                      </div>
                    )}

                    {/* Search Results Info */}
                    {syllabusSearch && (
                      <div className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50 border border-blue-200'
                      }`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>
                          {filteredSyllabus.length === 0 
                            ? `No results found for "${syllabusSearch}"`
                            : `Found ${filteredSyllabus.length} result${filteredSyllabus.length === 1 ? '' : 's'} for "${syllabusSearch}"`
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    {/* Reviews Header with Stats */}
                    <div className={`p-8 rounded-2xl ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50' 
                        : 'bg-gradient-to-br from-white to-yellow-50/50 border border-yellow-100 shadow-lg'
                    }`}>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Overall Rating */}
                        <div className="text-center lg:text-left">
                          <div className="flex items-center justify-center lg:justify-start mb-4">
                            <span className="text-5xl font-bold mr-4">{course.rating.toFixed(1)}</span>
                  <div>
                              <div className="flex mb-2">
                                {renderStars(course.rating)}
                              </div>
                              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                Based on {course.students.toLocaleString()} reviews
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div className="lg:col-span-2">
                          <h4 className="font-semibold mb-4">Rating Breakdown</h4>
                          <div className="space-y-3">
                            {[5, 4, 3, 2, 1].map((rating) => {
                              const percentage = rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : rating === 2 ? 1 : 1;
                              return (
                                <div key={rating} className="flex items-center gap-3">
                                  <span className="text-sm font-medium w-8">{rating}★</span>
                                  <div className={`flex-1 h-3 rounded-full ${
                                    theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                                  }`}>
                                    <motion.div
                                      initial={{ width: 0 }}
                                      animate={{ width: `${percentage}%` }}
                                      transition={{ duration: 0.8, delay: rating * 0.1 }}
                                      className={`h-full rounded-full ${
                                        rating >= 4 ? 'bg-green-500' : rating === 3 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                    />
                                  </div>
                                  <span className="text-sm w-12 text-right">{percentage}%</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Filters */}
                    <div className={`p-6 rounded-xl ${
                      theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-slate-200 shadow-sm'
                    }`}>
                      <div className="flex flex-wrap gap-4 items-center">
                        <span className="font-medium">Filter by:</span>
                        <div className="flex flex-wrap gap-2">
                          {['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star', 'Most Recent', 'Most Helpful'].map((filter) => (
                            <button
                              key={filter}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                filter === 'All'
                                  ? theme === 'dark'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-blue-600 text-white'
                                  : theme === 'dark'
                                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {filter}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mock Reviews */}
                    <div className="space-y-6">
                      {[
                        {
                          id: 1,
                          name: "Rajesh Kumar",
                          avatar: "RK",
                          rating: 5,
                          date: "2 weeks ago",
                          title: "Excellent course for beginners!",
                          content: "This C programming course exceeded my expectations. The instructor explains complex concepts in a very simple way. The hands-on projects really helped me understand the practical applications. Highly recommended for anyone starting their programming journey.",
                          helpful: 24,
                          verified: true,
                          progress: "Completed"
                        },
                        {
                          id: 2,
                          name: "Priya Sharma",
                          avatar: "PS",
                          rating: 5,
                          date: "1 month ago",
                          title: "Great foundation for programming",
                          content: "As someone with no prior programming experience, this course was perfect. The step-by-step approach and real-world examples made learning enjoyable. The assignments were challenging but doable.",
                          helpful: 18,
                          verified: true,
                          progress: "Week 12"
                        },
                        {
                          id: 3,
                          name: "Amit Patel",
                          avatar: "AP",
                          rating: 4,
                          date: "3 weeks ago",
                          title: "Good content, could use more examples",
                          content: "The course content is comprehensive and well-structured. However, I would have liked to see more practical examples in some of the advanced topics. Overall, a solid course for learning C programming.",
                          helpful: 12,
                          verified: false,
                          progress: "Week 8"
                        }
                      ].map((review) => (
                        <motion.div
                          key={review.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: review.id * 0.1 }}
                          className={`p-6 rounded-2xl ${
                            theme === 'dark' 
                              ? 'bg-slate-800/60 border border-slate-700/50' 
                              : 'bg-white border border-slate-200 shadow-lg'
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                              review.rating >= 4 ? 'bg-green-500' : review.rating >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}>
                              {review.avatar}
                            </div>

                            <div className="flex-1">
                              {/* Header */}
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-semibold">{review.name}</h5>
                                    {review.verified && (
                                      <div className={`flex items-center px-2 py-1 rounded-full text-xs ${
                                        theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
                                      }`}>
                                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Verified
                                      </div>
                                    )}
                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                      theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                      {review.progress}
                      </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex">
                                      {renderStars(review.rating)}
                                    </div>
                                    <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Review Content */}
                              <h6 className="font-semibold mb-2">{review.title}</h6>
                              <p className={`mb-4 leading-relaxed ${
                                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                              }`}>
                                {review.content}
                              </p>

                              {/* Actions */}
                              <div className="flex items-center gap-4">
                                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark' 
                                    ? 'text-slate-400 hover:text-green-400 hover:bg-slate-700/50' 
                                    : 'text-slate-600 hover:text-green-600 hover:bg-green-50'
                                }`}>
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                  </svg>
                                  Helpful ({review.helpful})
                                </button>
                                
                                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark' 
                                    ? 'text-slate-400 hover:text-red-400 hover:bg-slate-700/50' 
                                    : 'text-slate-600 hover:text-red-600 hover:bg-red-50'
                                }`}>
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4a4 4 0 014-4h5a4 4 0 014 4v4H3zM16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                  </svg>
                                  Reply
                                </button>
                                
                                <button className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                  theme === 'dark' 
                                    ? 'text-slate-400 hover:text-yellow-400 hover:bg-slate-700/50' 
                                    : 'text-slate-600 hover:text-yellow-600 hover:bg-yellow-50'
                                }`}>
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                  </svg>
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Load More Reviews */}
                    <div className="text-center">
                      <button className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-700 text-white hover:bg-slate-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                        Load More Reviews
                      </button>
                    </div>

                    {/* Write Review CTA */}
                    <div className={`p-8 rounded-2xl text-center ${
                      theme === 'dark' 
                        ? 'bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/50' 
                        : 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
                    }`}>
                      <h4 className="text-xl font-bold mb-4">Share Your Experience</h4>
                      <p className={`mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        Help other students by sharing your thoughts about this course
                      </p>
                      <button className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                        theme === 'dark'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        Write a Review
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related courses section - could be implemented later */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Similar Courses</h2>
        <p className="text-center py-8">
          <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>
            More courses related to {course.category} coming soon.
          </span>
        </p>
      </div>
    </div>
  );
};

export default CourseDetailsPage; 
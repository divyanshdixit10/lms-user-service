import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CCppCourseStructure from './CCppCourseStructure';
import CCppVideoLesson from './CCppVideoLesson';
import CCppProgrammingExercises from './CCppProgrammingExercises';
import './CCppStyles.css'; // Import custom styles

// Mock course structure data - will come from API in production
const mockVideos = [
  {
    id: 'v1',
    title: 'Complete C Programming Roadmap (Beginner to Advanced)',
    description: 'A comprehensive guide to learning C programming from scratch, covering basic concepts to advanced topics in software development.',
    duration: 1245, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=HspM4qB8U0s',
    completed: false,
    section: 'C Fundamentals',
    sectionId: 's1',
    order: 1
  },
  {
    id: 'v2',
    title: 'Setting Up C/C++ Development Environment (VSCode, GCC & Make)',
    description: 'Learn how to set up a complete C/C++ development environment with VSCode, GCC compiler, and Make build tool on Windows, Mac, and Linux.',
    duration: 953, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=nYiKufR2LVc',
    completed: false,
    section: 'C Fundamentals',
    sectionId: 's1',
    order: 2
  },
  {
    id: 'v3',
    title: 'C Program Structure: Header Files, Functions & Main Entry Point',
    description: 'Understanding the basic structure of C programs including header files, the main function, code organization, and proper syntax.',
    duration: 1120, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=-K9oyqqcl8s',
    completed: false,
    section: 'C Fundamentals',
    sectionId: 's1',
    order: 3
  },
  {
    id: 'v4',
    title: 'C Data Types, Variables & Memory Management Fundamentals',
    description: 'Explore the various data types in C, how to declare and use variables, understand type limits and proper memory allocation practices.',
    duration: 1045, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=IYd6jH33tY8',
    completed: false,
    section: 'C Fundamentals',
    sectionId: 's1',
    order: 4
  },
  {
    id: 'v5',
    title: 'Input/Output Functions in C: printf, scanf & File Operations',
    description: 'Master the essential input and output functions in C programming including console I/O with printf/scanf and basic file operations.',
    duration: 890, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=WwRSJV9oDF4',
    completed: false,
    section: 'C Fundamentals',
    sectionId: 's1',
    order: 5
  },
  {
    id: 'v6',
    title: 'Conditional Statements: if, else-if, else & Nested Conditionals',
    description: 'Learn how to implement decision-making in C programs using if-else statements, nested conditions, and proper logical flow control.',
    duration: 987, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=ZEULHT823ak',
    completed: false,
    section: 'Control Flow',
    sectionId: 's2',
    order: 6
  },
  {
    id: 'v7',
    title: 'Switch Case Statements & Multi-way Branching in C',
    description: 'Understanding switch-case statements for multi-way branching, when to use them over if-else, and how to implement efficient control flow.',
    duration: 854, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=XUJE3SETgYw',
    completed: false,
    section: 'Control Flow',
    sectionId: 's2',
    order: 7
  },
  {
    id: 'v8',
    title: 'Mastering Loops in C: for, while, do-while & Performance',
    description: 'Comprehensive guide to different loop constructs in C, their applications, performance considerations, and when to use each type.',
    duration: 1076, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=BBRXBQXU3jw',
    completed: false,
    section: 'Control Flow',
    sectionId: 's2',
    order: 8
  },
  {
    id: 'v9',
    title: 'Break & Continue Statements: Loop Control in C',
    description: 'Learn how to use break and continue statements to efficiently control loop execution and implement early termination logic.',
    duration: 765, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=rYaHi01ffsc',
    completed: false,
    section: 'Control Flow',
    sectionId: 's2',
    order: 9
  },
  {
    id: 'v10',
    title: 'Nested Loops & Advanced Control Flow Patterns in C',
    description: 'Master complex control flow with nested loops, combined control structures, and pattern generation for efficient algorithm implementation.',
    duration: 932, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=mGvN0p9GapE',
    completed: false,
    section: 'Control Flow',
    sectionId: 's2',
    order: 10
  },
  {
    id: 'v11',
    title: 'Functions in C: Declaration, Definition & Modular Programming',
    description: 'Learn the basics of functions in C, proper declaration and definition syntax, and how they enable modular programming practices.',
    duration: 1023, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=Qg7Ez51HanM',
    completed: false,
    section: 'Functions',
    sectionId: 's3',
    order: 11
  },
  {
    id: 'v12',
    title: 'Function Parameters & Return Values: Pass by Value vs Reference',
    description: 'Understand parameter passing mechanisms, return values, and efficient data transfer between functions in C programs.',
    duration: 968, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=WEo_XDOvXZ4',
    completed: false,
    section: 'Functions',
    sectionId: 's3',
    order: 12
  },
  {
    id: 'v13',
    title: 'Recursion in C: Implementation, Types & Optimization',
    description: 'Master recursive function implementation, understand different types of recursion, and learn optimization techniques for recursive algorithms.',
    duration: 1145, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=RJjb2cq145k',
    completed: false,
    section: 'Functions',
    sectionId: 's3',
    order: 13
  },
  {
    id: 'v14',
    title: 'Storage Classes in C: auto, static, register & extern',
    description: 'Learn about different storage classes in C, their scope, lifetime, and proper application in various programming scenarios.',
    duration: 875, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=SIERpBmdeEY',
    completed: false,
    section: 'Functions',
    sectionId: 's3',
    order: 14
  },
  {
    id: 'v15',
    title: 'Header Files & Code Organization in C Projects',
    description: 'Master the creation and use of header files to organize C code into modular, maintainable, and reusable components.',
    duration: 1087, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=TBVK2BdbYfU',
    completed: false,
    section: 'Functions',
    sectionId: 's3',
    order: 15
  },
  {
    id: 'v16',
    title: 'Arrays in C: Declaration, Initialization & Operations',
    description: 'Complete guide to arrays in C programming, covering declaration, initialization, access patterns, and common array algorithms.',
    duration: 946, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=bJk8llXVwvo',
    completed: false,
    section: 'Arrays & Strings',
    sectionId: 's4',
    order: 16
  },
  {
    id: 'v17',
    title: 'Multidimensional Arrays: 2D & 3D Arrays Implementation',
    description: 'Learn how to create, manipulate, and efficiently use multidimensional arrays for complex data structures in C programs.',
    duration: 1032, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=TInH3dkQuBg',
    completed: false,
    section: 'Arrays & Strings',
    sectionId: 's4',
    order: 17
  },
  {
    id: 'v18',
    title: 'Strings in C: Character Arrays & String Handling Basics',
    description: 'Master string representation in C using character arrays, learn common string operations, and understand memory management for strings.',
    duration: 1156, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=kw6vjui4LOM',
    completed: false,
    section: 'Arrays & Strings',
    sectionId: 's4',
    order: 18
  },
  {
    id: 'v19',
    title: 'String Functions in C: strcpy, strcat, strcmp & More',
    description: 'Comprehensive guide to string library functions in C for efficient string manipulation, searching, and transformation operations.',
    duration: 986, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=FYBGCkiNt1g',
    completed: false,
    section: 'Arrays & Strings',
    sectionId: 's4',
    order: 19
  },
  {
    id: 'v20',
    title: 'Sorting & Searching Algorithms in C: Implementation & Analysis',
    description: 'Learn and implement common sorting and searching algorithms for arrays in C with time complexity and performance analysis.',
    duration: 1256, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=1cQ43n5QXlE',
    completed: false,
    section: 'Arrays & Strings',
    sectionId: 's4',
    order: 20
  },
  {
    id: 'v21',
    title: 'Pointers in C: Fundamentals, Declaration & Memory Addresses',
    description: 'Master the fundamental concepts of pointers in C, memory addressing, pointer declaration, and basic pointer operations.',
    duration: 1137, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=dOuNSW9Bqkw',
    completed: false,
    section: 'Pointers & Memory',
    sectionId: 's5',
    order: 21
  },
  {
    id: 'v22',
    title: 'Pointers & Arrays: Relationship & Memory Layout in C',
    description: 'Understand the deep connection between arrays and pointers in C, memory layout, and efficient array manipulation using pointers.',
    duration: 1054, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=JUhO2A3NFlE',
    completed: false,
    section: 'Pointers & Memory',
    sectionId: 's5',
    order: 22
  },
  {
    id: 'v23',
    title: 'Dynamic Memory Allocation: malloc, calloc, realloc & free',
    description: 'Learn dynamic memory allocation techniques in C using malloc, calloc, realloc and proper deallocation with free to prevent memory leaks.',
    duration: 1212, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=hg3nbdyk3Xo',
    completed: false,
    section: 'Pointers & Memory',
    sectionId: 's5',
    order: 23
  },
  {
    id: 'v24',
    title: 'Memory Management Best Practices in C Programming',
    description: 'Master best practices for memory management to avoid memory leaks, dangling pointers, double frees, and other common memory bugs.',
    duration: 965, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=50JkN2y453U',
    completed: false,
    section: 'Pointers & Memory',
    sectionId: 's5',
    order: 24
  },
  {
    id: 'v25',
    title: 'Memory Debugging in C: Tools, Techniques & Common Issues',
    description: 'Learn debugging techniques for memory-related issues in C programs using tools like Valgrind, AddressSanitizer, and GDB.',
    duration: 1078, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=S1NbDI5E48k',
    completed: false,
    section: 'Pointers & Memory',
    sectionId: 's5',
    order: 25
  },
  {
    id: 'v26',
    title: 'Structures in C: Defining, Initializing & Accessing Members',
    description: 'Learn how to define, initialize, and use structures to represent complex data with different types in C programs.',
    duration: 932, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=hqG7ncGUWFM',
    completed: false,
    section: 'Structures',
    sectionId: 's6',
    order: 26
  },
  {
    id: 'v27',
    title: 'Nested Structures & Arrays of Structures in C',
    description: 'Master complex data organization in C using nested structures, arrays of structures, and composite data types for real-world applications.',
    duration: 1045, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=XdLr6QP7hwc',
    completed: false,
    section: 'Structures',
    sectionId: 's6',
    order: 27
  },
  {
    id: 'v28',
    title: 'Pointers to Structures & Dynamic Structure Allocation',
    description: 'Learn how to use pointers with structures for efficient memory usage, dynamic allocation of structures, and linked data structures.',
    duration: 897, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=9MIT51WWU_A',
    completed: false,
    section: 'Structures',
    sectionId: 's6',
    order: 28
  },
  {
    id: 'v29',
    title: 'Unions in C: Memory Sharing & Efficient Data Storage',
    description: 'Understand unions, their memory-sharing behavior, and proper application scenarios compared to structures in C programming.',
    duration: 765, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=EEKzIslZ5sY',
    completed: false,
    section: 'Structures',
    sectionId: 's6',
    order: 29
  },
  {
    id: 'v30',
    title: 'Typedef & Enums in C: Creating Custom Types',
    description: 'Master the creation of type aliases with typedef and enumerated types to improve code readability and type safety in C programs.',
    duration: 915, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=TThcNNSGmCI',
    completed: false,
    section: 'Structures',
    sectionId: 's6',
    order: 30
  },
  {
    id: 'v31',
    title: 'File Handling Basics in C: Opening, Reading & Writing Files',
    description: 'Learn the fundamentals of file input/output operations in C, including opening, closing, reading, and writing to files.',
    duration: 986, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=UnKRgXK-ZJw',
    completed: false,
    section: 'File Handling',
    sectionId: 's7',
    order: 31
  },
  {
    id: 'v32',
    title: 'Text File Processing in C: Reading, Writing & Parsing',
    description: 'Master techniques for reading, writing, and parsing text files in C programs with error handling and efficient processing strategies.',
    duration: 1098, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=Z9SlKleTFXI',
    completed: false,
    section: 'File Handling',
    sectionId: 's7',
    order: 32
  },
  {
    id: 'v33',
    title: 'Binary File Operations in C: Efficient Data Storage',
    description: 'Learn how to work with binary files in C for efficient data storage, serialization, and high-performance I/O operations.',
    duration: 1156, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=_m5hVCP2RnI',
    completed: false,
    section: 'File Handling',
    sectionId: 's7',
    order: 33
  },
  {
    id: 'v34',
    title: 'Random Access File Operations in C: fseek & ftell',
    description: 'Master random access file operations using fseek and ftell for non-sequential file reading and writing in C programs.',
    duration: 978, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=l5HlubjFUlg',
    completed: false,
    section: 'File Handling',
    sectionId: 's7',
    order: 34
  },
  {
    id: 'v35',
    title: 'File Error Handling in C: ferror, feof & Exception Handling',
    description: 'Learn proper error detection and handling techniques for file operations in C to create robust and reliable file processing code.',
    duration: 897, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=G7Z_E-z1l4Y',
    completed: false,
    section: 'File Handling',
    sectionId: 's7',
    order: 35
  },
  {
    id: 'v36',
    title: 'Introduction to C++: Evolution from C & Key Differences',
    description: 'Overview of C++ programming language, its evolution from C, key differences, and advantages for modern software development.',
    duration: 1132, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=ylOSx4d3C7A',
    completed: false,
    section: 'C++ Basics',
    sectionId: 's8',
    order: 36
  },
  {
    id: 'v37',
    title: 'Setting Up C++ Development Environment & First Program',
    description: 'Step-by-step guide to setting up a complete C++ development environment with proper compiler, IDE, and build tools configuration.',
    duration: 854, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=h1nlHQoGKV4',
    completed: false,
    section: 'C++ Basics',
    sectionId: 's8',
    order: 37
  },
  {
    id: 'v38',
    title: 'Object-Oriented Programming in C++: Core Concepts',
    description: 'Introduction to OOP concepts in C++ including encapsulation, inheritance, polymorphism, and abstraction with practical examples.',
    duration: 1234, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=pgEGhtPYcic',
    completed: false,
    section: 'C++ Basics',
    sectionId: 's8',
    order: 38
  },
  {
    id: 'v39',
    title: 'C++ I/O Streams: cin, cout & Stream Manipulation',
    description: 'Master C++ stream-based input and output with cin, cout, formatting, and efficient stream manipulation techniques.',
    duration: 965, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=4DcKPDxDIPY',
    completed: false,
    section: 'C++ Basics',
    sectionId: 's8',
    order: 39
  },
  {
    id: 'v40',
    title: 'C++ String Class: Methods, Operations & Performance',
    description: 'Comprehensive guide to the string class in C++, its methods, efficient string manipulation, and performance considerations.',
    duration: 1023, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=7elChkEiGnE',
    completed: false,
    section: 'C++ Basics',
    sectionId: 's8',
    order: 40
  },
  {
    id: 'v41',
    title: 'C++ Classes & Objects: Declaration, Instantiation & Usage',
    description: 'Master class definition, object creation, and fundamental object-oriented programming patterns in C++ with practical examples.',
    duration: 1154, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=_qSSooJHoFA',
    completed: false,
    section: 'Classes & Objects',
    sectionId: 's9',
    order: 41
  },
  {
    id: 'v42',
    title: 'Constructors & Destructors: Object Lifecycle in C++',
    description: 'Understand constructor and destructor implementation for proper object initialization, cleanup, and resource management.',
    duration: 1076, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=I-MxTa6qY6c',
    completed: false,
    section: 'Classes & Objects',
    sectionId: 's9',
    order: 42
  },
  {
    id: 'v43',
    title: 'Access Modifiers in C++: public, private & protected',
    description: 'Learn about access control, encapsulation, and data hiding techniques in C++ classes with proper member visibility management.',
    duration: 986, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=rRaICURDeBI',
    completed: false,
    section: 'Classes & Objects',
    sectionId: 's9',
    order: 43
  },
  {
    id: 'v44',
    title: 'Member Functions & Friend Functions in C++',
    description: 'Master different types of member functions, including regular, static, const methods, and friend functions in C++ classes.',
    duration: 1087, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=5IgSpS-vQbs',
    completed: false,
    section: 'Classes & Objects',
    sectionId: 's9',
    order: 44
  },
  {
    id: 'v45',
    title: 'Static & Constant Members: Class-Level Data in C++',
    description: 'Understanding static members, constant class variables, and their proper usage patterns for shared class data and behavior.',
    duration: 965, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=5Zs-gZZDaTo',
    completed: false,
    section: 'Classes & Objects',
    sectionId: 's9',
    order: 45
  },
  {
    id: 'v46',
    title: 'Inheritance & Polymorphism: OOP Pillars in C++',
    description: 'Master inheritance hierarchies, virtual functions, runtime polymorphism, and proper object-oriented design patterns in C++.',
    duration: 1345, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=sSO1CUB6HPk',
    completed: false,
    section: 'Advanced C++',
    sectionId: 's10',
    order: 46
  },
  {
    id: 'v47',
    title: 'Exception Handling in C++: try, catch & Custom Exceptions',
    description: 'Learn to implement robust error handling with try-catch blocks, exception hierarchies, and proper exception safety in C++.',
    duration: 1078, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=k4BjmyyYakA',
    completed: false,
    section: 'Advanced C++',
    sectionId: 's10',
    order: 47
  },
  {
    id: 'v48',
    title: 'Templates in C++: Generic Programming & Type Safety',
    description: 'Master C++ templates for type-independent, generic code with function templates, class templates, and template specialization.',
    duration: 1187, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=i2R2EFU2DRE',
    completed: false,
    section: 'Advanced C++',
    sectionId: 's10',
    order: 48
  },
  {
    id: 'v49',
    title: 'Standard Template Library (STL): Containers, Algorithms & Iterators',
    description: 'Comprehensive guide to C++ STL components including vectors, maps, algorithms, iterators, and functional programming features.',
    duration: 1323, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=eXyRxTsdkHE',
    completed: false,
    section: 'Advanced C++',
    sectionId: 's10',
    order: 49
  },
  {
    id: 'v50',
    title: 'Modern C++ Features: C++11/14/17/20 Best Practices',
    description: 'Explore modern C++ features and best practices for efficient, safe, and maintainable code using the latest language standards.',
    duration: 1465, // in seconds
    videoUrl: 'https://www.youtube.com/watch?v=sYUSAjjs8k0',
    completed: false,
    section: 'Advanced C++',
    sectionId: 's10',
    order: 50
  }
];

const mockSections = [
  { id: 's1', title: 'C Fundamentals', order: 1 },
  { id: 's2', title: 'Control Flow', order: 2 },
  { id: 's3', title: 'Functions', order: 3 },
  { id: 's4', title: 'Arrays & Strings', order: 4 },
  { id: 's5', title: 'Pointers & Memory', order: 5 },
  { id: 's6', title: 'Structures', order: 6 },
  { id: 's7', title: 'File Handling', order: 7 },
  { id: 's8', title: 'C++ Basics', order: 8 },
  { id: 's9', title: 'Classes & Objects', order: 9 },
  { id: 's10', title: 'Advanced C++', order: 10 }
];

const CCppLearningContainer: React.FC = () => {
  const [videos, setVideos] = useState(mockVideos);
  const [sections, setSections] = useState(mockSections);
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [activeTab, setActiveTab] = useState<'video' | 'exercise'>('video');
  const [isCourseSidebarOpen, setIsCourseSidebarOpen] = useState(true);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [activeVideoNotes, setActiveVideoNotes] = useState('');
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // New state variables for additional learning features
  const [activeLearningFeature, setActiveLearningFeature] = useState<'notes' | 'mcqs' | 'assignments' | 'resources' | 'codeplayground' | 'discussion' | 'certificate'>('notes');
  const [mcqs, setMcqs] = useState<Array<{id: string; question: string; options: string[]; answer: number; userAnswer?: number}>>([
    {
      id: 'mcq1',
      question: 'Which of the following is not a valid data type in C?',
      options: ['int', 'float', 'string', 'char'],
      answer: 2, // string is not a built-in data type in C
    },
    {
      id: 'mcq2',
      question: 'Which operator is used for pointer declaration in C?',
      options: ['&', '*', '->', '.'],
      answer: 1, // *
    },
    {
      id: 'mcq3',
      question: 'What is the output of printf("%d", sizeof(int)); in a typical 32-bit system?',
      options: ['1', '2', '4', '8'],
      answer: 2, // 4 bytes
    }
  ]);
  
  const [assignments, setAssignments] = useState<Array<{id: string; title: string; description: string; dueDate: string; status: 'not_started' | 'in_progress' | 'completed'}>>([ 
    {
      id: 'assignment1',
      title: 'Create a Simple Calculator',
      description: 'Implement a basic calculator program in C that can perform addition, subtraction, multiplication, and division operations.',
      dueDate: '2023-12-15',
      status: 'not_started',
    },
    {
      id: 'assignment2',
      title: 'Student Record Management System',
      description: 'Create a simple student record management system that allows adding, viewing, and searching student records.',
      dueDate: '2023-12-22',
      status: 'not_started',
    }
  ]);
  
  const [resources, setResources] = useState<Array<{id: string; title: string; type: 'pdf' | 'link' | 'code'; url: string}>>([ 
    {
      id: 'resource1',
      title: 'C Programming Language Cheat Sheet',
      type: 'pdf',
      url: '#',
    },
    {
      id: 'resource2',
      title: 'Online C Compiler and Debugger',
      type: 'link',
      url: 'https://www.onlinegdb.com/online_c_compiler',
    },
    {
      id: 'resource3',
      title: 'C Standard Library Reference',
      type: 'link',
      url: 'https://en.cppreference.com/w/c',
    },
    {
      id: 'resource4',
      title: 'Sample Code: Linked List Implementation',
      type: 'code',
      url: '#',
    }
  ]);
  
  // New state variables for enhanced features
  const [userProgress, setUserProgress] = useState<{
    videosWatched: number;
    videosWatchedIds: string[];
    quizzesPassed: number;
    quizzesPassedIds: string[];
    assignmentsCompleted: number;
    assignmentsCompletedIds: string[];
    totalTimeSpent: number; // in minutes
    lastAccessDate: Date;
    streakDays: number;
    weeklyGoalPercentage: number;
    skillLevels: {
      cFundamentals: number; // 0-100
      cppFundamentals: number;
      algorithms: number;
      memoryManagement: number;
      debugging: number;
    };
    badges: {
      id: string;
      name: string;
      description: string;
      icon: string;
      dateEarned: Date;
    }[];
  }>({
    videosWatched: 3,
    videosWatchedIds: ['v1', 'v2', 'v3'],
    quizzesPassed: 2,
    quizzesPassedIds: ['mcq1', 'mcq2'],
    assignmentsCompleted: 1,
    assignmentsCompletedIds: ['assignment1'],
    totalTimeSpent: 186,
    lastAccessDate: new Date(),
    streakDays: 4,
    weeklyGoalPercentage: 65,
    skillLevels: {
      cFundamentals: 42,
      cppFundamentals: 12,
      algorithms: 24,
      memoryManagement: 18,
      debugging: 30
    },
    badges: [
      {
        id: 'b1',
        name: 'First Steps',
        description: 'Completed your first C programming lesson',
        icon: '🏅',
        dateEarned: new Date('2023-09-28')
      },
      {
        id: 'b2',
        name: 'Streak Master',
        description: 'Maintained a 3-day learning streak',
        icon: '🔥',
        dateEarned: new Date('2023-10-01')
      }
    ]
  });

  const [codePlayground, setCodePlayground] = useState<{
    code: string;
    language: 'c' | 'cpp';
    output: string;
    isRunning: boolean;
    theme: 'light' | 'dark' | 'monokai';
    fontSize: number;
    autoComplete: boolean;
    lintEnabled: boolean;
    compileFlags: string;
  }>({
    code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
    language: 'c',
    output: '',
    isRunning: false,
    theme: 'monokai',
    fontSize: 14,
    autoComplete: true,
    lintEnabled: true,
    compileFlags: '-Wall -Wextra -std=c11'
  });

  const [discussions, setDiscussions] = useState<Array<{
    id: string;
    user: string;
    userAvatar: string;
    message: string;
    timestamp: Date;
    likes: number;
    userHasLiked: boolean;
    replies: {
      id: string;
      user: string;
      userAvatar: string;
      message: string;
      timestamp: Date;
      likes: number;
      userHasLiked: boolean;
    }[];
    tags: string[];
  }>>([
    {
      id: 'd1',
      user: 'John D.',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      message: 'I found the explanation of pointers really helpful. Can someone explain how pointer arithmetic works?',
      timestamp: new Date('2023-10-15T09:30:00'),
      likes: 5,
      userHasLiked: false,
      tags: ['pointers', 'c-language'],
      replies: [
        {
          id: 'r1',
          user: 'Sarah K.',
          userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          message: 'Pointer arithmetic is based on the size of the data type. When you add 1 to a pointer, it actually increments by the size of its data type!',
          timestamp: new Date('2023-10-15T10:15:00'),
          likes: 3,
          userHasLiked: false
        },
        {
          id: 'r2',
          user: 'Michael P.',
          userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          message: 'For example, if you have an int pointer p, p+1 will point to the next int in memory, which is actually 4 bytes away (on most systems).',
          timestamp: new Date('2023-10-15T11:22:00'),
          likes: 2,
          userHasLiked: true
        }
      ]
    },
    {
      id: 'd2',
      user: 'Emma L.',
      userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      message: 'How do you debug segmentation faults effectively? I keep running into them when working with pointers.',
      timestamp: new Date('2023-10-18T14:25:00'),
      likes: 8,
      userHasLiked: true,
      tags: ['debugging', 'segfault', 'pointers'],
      replies: [
        {
          id: 'r3',
          user: 'David W.',
          userAvatar: 'https://randomuser.me/api/portraits/men/56.jpg',
          message: 'Try using Valgrind or AddressSanitizer. They\'re amazing tools for catching memory errors. For quick debugging, adding printf statements before suspected problem areas can help too.',
          timestamp: new Date('2023-10-18T15:03:00'),
          likes: 6,
          userHasLiked: false
        }
      ]
    }
  ]);
  
  const [certificateData, setCertificateData] = useState<{
    isEligible: boolean;
    percentComplete: number;
    requiredPercentage: number;
    estimatedCompletion: string;
    skills: { name: string; level: number; }[];
    certificateId: string;
    issueDate: Date | null;
    expireDate: Date | null;
    certificateTemplate: 'standard' | 'premium' | 'mastery';
    linkedInSharable: boolean;
  }>({
    isEligible: false,
    percentComplete: 25,
    requiredPercentage: 80,
    estimatedCompletion: '3 weeks',
    skills: [
      { name: 'C Programming', level: 42 },
      { name: 'C++ Programming', level: 15 },
      { name: 'Algorithm Design', level: 30 },
      { name: 'Memory Management', level: 22 }
    ],
    certificateId: 'CPP-CERT-2023-',
    issueDate: null,
    expireDate: null,
    certificateTemplate: 'standard',
    linkedInSharable: true
  });
  
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  
  // Mark video as completed with enhanced progress tracking
  const handleVideoComplete = (videoId: string) => {
    // Update videos array
    setVideos(videos.map(video => 
      video.id === videoId 
        ? { ...video, completed: true } 
        : video
    ));
    
    // Check if video was already marked as complete
    if (!userProgress.videosWatchedIds.includes(videoId)) {
      // Update user progress
      setUserProgress(prev => {
        const newVideosWatchedIds = [...prev.videosWatchedIds, videoId];
        const newVideosWatched = newVideosWatchedIds.length;
        
        // Calculate progress percentage for certificate
        const progressPercentage = (newVideosWatched / videos.length) * 100;
        
        // Check if a new badge should be earned
        let newBadges = [...prev.badges];
        
        // First video badge
        if (newVideosWatched === 1 && !newBadges.some(b => b.id === 'b1')) {
          newBadges.push({
            id: 'b1',
            name: 'First Steps',
            description: 'Completed your first C programming lesson',
            icon: '🏅',
            dateEarned: new Date()
          });
        }
        
        // 10 videos badge
        if (newVideosWatched === 10 && !newBadges.some(b => b.id === 'b3')) {
          newBadges.push({
            id: 'b3',
            name: 'Dedicated Learner',
            description: 'Completed 10 C/C++ programming lessons',
            icon: '🎓',
            dateEarned: new Date()
          });
        }
        
        // 25 videos badge
        if (newVideosWatched === 25 && !newBadges.some(b => b.id === 'b4')) {
          newBadges.push({
            id: 'b4',
            name: 'Halfway Champion',
            description: 'Completed half of the C/C++ programming course',
            icon: '🏆',
            dateEarned: new Date()
          });
        }
        
        // Update skill levels based on the video section
        const video = videos.find(v => v.id === videoId);
        let updatedSkillLevels = { ...prev.skillLevels };
        
        if (video) {
          if (video.sectionId === 's1' || video.sectionId === 's2' || video.sectionId === 's3') {
            updatedSkillLevels.cFundamentals = Math.min(100, updatedSkillLevels.cFundamentals + 4);
          } else if (video.sectionId === 's4' || video.sectionId === 's5') {
            updatedSkillLevels.memoryManagement = Math.min(100, updatedSkillLevels.memoryManagement + 5);
          } else if (video.sectionId === 's8' || video.sectionId === 's9' || video.sectionId === 's10') {
            updatedSkillLevels.cppFundamentals = Math.min(100, updatedSkillLevels.cppFundamentals + 6);
          }
          
          // Always improve debugging a little
          updatedSkillLevels.debugging = Math.min(100, updatedSkillLevels.debugging + 2);
        }
        
        // Update overall progress for certificate eligibility
        updateCertificateEligibility(progressPercentage);
        
        return {
          ...prev,
          videosWatched: newVideosWatched,
          videosWatchedIds: newVideosWatchedIds,
          lastAccessDate: new Date(),
          skillLevels: updatedSkillLevels,
          badges: newBadges
        };
      });
    }
    
    // Show completion badge temporarily
    setShowCompletionBadge(true);
    setTimeout(() => {
      setShowCompletionBadge(false);
    }, 3000);
  };
  
  // Handle note changes
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveVideoNotes(e.target.value);
  };
  
  // Save notes
  const saveNotes = () => {
    // In a real implementation, this would save to backend
    console.log(`Saving notes for video ${activeVideo.id}:`, activeVideoNotes);
    // Show success message or indicator
  };
  
  // Navigate to next video
  const handleNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    if (currentIndex < videos.length - 1) {
      setActiveVideo(videos[currentIndex + 1]);
    }
  };
  
  // Navigate to previous video
  const handlePrevVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    if (currentIndex > 0) {
      setActiveVideo(videos[currentIndex - 1]);
    }
  };
  
  // New function to update certificate eligibility
  const updateCertificateEligibility = (progressPercentage: number) => {
    setCertificateData(prev => {
      const isNowEligible = progressPercentage >= prev.requiredPercentage;
      
      // If newly eligible, set certificate issue date
      let newIssueDate = prev.issueDate;
      let newExpireDate = prev.expireDate;
      
      if (isNowEligible && !prev.isEligible) {
        const now = new Date();
        newIssueDate = now;
        
        // Set expiration to 2 years from now
        newExpireDate = new Date();
        newExpireDate.setFullYear(newExpireDate.getFullYear() + 2);
        
        // Show certificate modal
        setTimeout(() => {
          setShowCertificateModal(true);
        }, 1000);
      }
      
      // Calculate estimated completion
      let estimatedCompletion = '';
      if (!isNowEligible) {
        const remainingPercentage = prev.requiredPercentage - progressPercentage;
        const weeksEstimate = Math.ceil(remainingPercentage / 10); // Assume 10% progress per week
        estimatedCompletion = weeksEstimate === 1 ? '1 week' : `${weeksEstimate} weeks`;
      }
      
      // Update skills based on user progress
      const updatedSkills = [
        { name: 'C Programming', level: userProgress.skillLevels.cFundamentals },
        { name: 'C++ Programming', level: userProgress.skillLevels.cppFundamentals },
        { name: 'Algorithm Design', level: userProgress.skillLevels.algorithms },
        { name: 'Memory Management', level: userProgress.skillLevels.memoryManagement }
      ];
      
      return {
        ...prev,
        isEligible: isNowEligible,
        percentComplete: Math.round(progressPercentage),
        estimatedCompletion,
        skills: updatedSkills,
        issueDate: newIssueDate,
        expireDate: newExpireDate,
        certificateId: `CPP-CERT-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`
      };
    });
  };
  
  // New enhanced function to download certificate
  const downloadCertificate = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading certificate...', certificateData);
    alert('Your certificate has been generated and is downloading!');
    setShowCertificateModal(false);
    
    // Add badge for certificate
    if (!userProgress.badges.some(b => b.id === 'b5')) {
      setUserProgress(prev => ({
        ...prev,
        badges: [
          ...prev.badges,
          {
            id: 'b5',
            name: 'C/C++ Certified',
            description: 'Earned the C/C++ Programming Masterclass Certificate',
            icon: '🎖️',
            dateEarned: new Date()
          }
        ]
      }));
    }
  };
  
  // New function to share certificate to LinkedIn
  const shareCertificateToLinkedIn = () => {
    // In a real app, this would use LinkedIn's API
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=https://example.com/verify-cert/${certificateData.certificateId}`;
    window.open(shareUrl, '_blank');
  };
  
  // Code Playground Functions
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodePlayground(prev => ({
      ...prev,
      code: e.target.value
    }));
  };
  
  const switchLanguage = (language: 'c' | 'cpp') => {
    setCodePlayground(prev => ({
      ...prev,
      language,
      compileFlags: language === 'c' ? '-Wall -Wextra -std=c11' : '-Wall -Wextra -std=c++17'
    }));
  };
  
  const changeEditorTheme = (theme: 'light' | 'dark' | 'monokai') => {
    setCodePlayground(prev => ({
      ...prev,
      theme
    }));
  };
  
  const changeFontSize = (fontSize: number) => {
    setCodePlayground(prev => ({
      ...prev,
      fontSize
    }));
  };
  
  const toggleAutoComplete = () => {
    setCodePlayground(prev => ({
      ...prev,
      autoComplete: !prev.autoComplete
    }));
  };
  
  const toggleLinting = () => {
    setCodePlayground(prev => ({
      ...prev,
      lintEnabled: !prev.lintEnabled
    }));
  };
  
  const updateCompileFlags = (compileFlags: string) => {
    setCodePlayground(prev => ({
      ...prev,
      compileFlags
    }));
  };
  
  const runCode = () => {
    setCodePlayground(prev => ({
      ...prev,
      isRunning: true
    }));
    
    // Simulate compilation and execution
    setTimeout(() => {
      const language = codePlayground.language;
      let output = '';
      
      // Very simple simulation - in a real application, this would call a backend service
      if (codePlayground.code.includes('printf') || codePlayground.code.includes('cout')) {
        if (codePlayground.code.includes('error')) {
          output = `${language === 'c' ? 'gcc' : 'g++'} error: undefined reference to 'error'\n` +
                   `compilation terminated.`;
        } else {
          // Extract printf content or cout content using a basic regex
          const printfRegex = /printf\s*\(\s*"([^"]*)"/g;
          const coutRegex = /cout\s*<<\s*"([^"]*)"/g;
          
          let printContent = [];
          let match;
          
          if (language === 'c') {
            while ((match = printfRegex.exec(codePlayground.code)) !== null) {
              printContent.push(match[1]);
            }
          } else {
            while ((match = coutRegex.exec(codePlayground.code)) !== null) {
              printContent.push(match[1]);
            }
          }
          
          if (printContent.length > 0) {
            output = printContent.join('\n');
          } else {
            output = 'Program executed successfully with no output.';
          }
        }
      } else {
        output = 'Program executed successfully with no output.';
      }
      
      setCodePlayground(prev => ({
        ...prev,
        isRunning: false,
        output
      }));
    }, 1500);
  };
  
  // New function to add discussion
  const addDiscussion = (message: string, tags: string[] = []) => {
    const newDiscussion = {
      id: `d${discussions.length + 1}`,
      user: 'You',
      userAvatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      message,
      timestamp: new Date(),
      likes: 0,
      userHasLiked: false,
      tags,
      replies: []
    };
    
    setDiscussions([...discussions, newDiscussion]);
  };
  
  // New function to add reply
  const addReply = (discussionId: string, message: string) => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => 
        discussion.id === discussionId
          ? {
              ...discussion,
              replies: [
                ...discussion.replies,
                {
                  id: `r${discussion.replies.length + 1}`,
                  user: 'You',
                  userAvatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
                  message,
                  timestamp: new Date(),
                  likes: 0,
                  userHasLiked: false
                }
              ]
            }
          : discussion
      )
    );
  };
  
  // New function to toggle like on discussion
  const toggleLikeDiscussion = (discussionId: string) => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => 
        discussion.id === discussionId
          ? {
              ...discussion,
              likes: discussion.userHasLiked ? discussion.likes - 1 : discussion.likes + 1,
              userHasLiked: !discussion.userHasLiked
            }
          : discussion
      )
    );
  };
  
  // New function to toggle like on reply
  const toggleLikeReply = (discussionId: string, replyId: string) => {
    setDiscussions(prevDiscussions => 
      prevDiscussions.map(discussion => 
        discussion.id === discussionId
          ? {
              ...discussion,
              replies: discussion.replies.map(reply => 
                reply.id === replyId
                  ? {
                      ...reply,
                      likes: reply.userHasLiked ? reply.likes - 1 : reply.likes + 1,
                      userHasLiked: !reply.userHasLiked
                    }
                  : reply
              )
            }
          : discussion
      )
    );
  };
  
  // New function to filter discussions by tags
  const filterDiscussionsByTag = (tag: string) => {
    return discussions.filter(discussion => 
      discussion.tags.includes(tag)
    );
  };
  
  // Function to format relative time
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  };
  
  // Handle answering MCQs
  const handleMcqAnswer = (mcqId: string, answerIndex: number) => {
    setMcqs(prev => prev.map(mcq => 
      mcq.id === mcqId ? { ...mcq, userAnswer: answerIndex } : mcq
    ));
  };
  
  // Handle updating assignment status
  const handleAssignmentStatusUpdate = (assignmentId: string, status: 'not_started' | 'in_progress' | 'completed') => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId ? { ...assignment, status } : assignment
    ));
  };
  
  // Simulate fetching video titles from YouTube API
  /*
  useEffect(() => {
    // In a real implementation, this would fetch data from YouTube API
    const fetchVideoTitles = () => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        // In a real implementation, update video data from API response
        setIsLoading(false);
      }, 1500);
    };
    
    fetchVideoTitles();
  }, []);
  */
  
  // Calculate course progress
  const completedVideos = videos.filter(video => video.completed).length;
  const totalVideos = videos.length;
  const progressPercentage = Math.round((completedVideos / totalVideos) * 100);
  
  // Get the next video (if exists)
  const getNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    return currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;
  };
  
  // Get the previous video (if exists)
  const getPrevVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    return currentIndex > 0 ? videos[currentIndex - 1] : null;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {/* Header with course info and controls */}
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 p-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Complete C and C++ Programming Masterclass</h2>
            <div className="flex items-center mt-2 text-indigo-100">
              <div className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span>50 Lessons</span>
              </div>
              <div className="flex items-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>19+ Hours</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>Beginner to Advanced</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCourseSidebarOpen(!isCourseSidebarOpen)}
              className="p-2.5 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
              title={isCourseSidebarOpen ? "Hide Course Structure" : "Show Course Structure"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Course Content</span>
            </button>
            
            <button
              onClick={() => setIsFullWidth(!isFullWidth)}
              className="p-2.5 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
              title={isFullWidth ? "Exit Full Width" : "Full Width"}
            >
              {isFullWidth ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H6a1 1 0 01-1-1v-3zm7-1a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-1-1h-3z" clipRule="evenodd" />
                  </svg>
                  <span className="hidden sm:inline">Normal View</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <span className="hidden sm:inline">Full Width</span>
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-indigo-100">Course Progress</span>
            <span className="text-sm font-medium text-indigo-100">{progressPercentage}% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-300 rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="mt-1 text-xs text-indigo-200">
            {completedVideos} of {totalVideos} lessons completed
          </div>
        </div>
      </div>
      
      {/* Main Content Area - Display loading state or content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-10 h-[60vh]">
          <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin mb-4"></div>
          <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">Loading Course Content</h3>
          <p className="text-gray-500 dark:text-gray-400 text-center">Please wait while we prepare your learning experience</p>
        </div>
      ) : (
      <div className="flex flex-col lg:flex-row">
          {/* Main content area with video player and course structure */}
          <div className={`flex-1 ${isCourseSidebarOpen ? 'lg:w-2/3' : ''}`}>
            {activeTab === 'video' ? (
              <CCppVideoLesson
                video={activeVideo}
                onComplete={() => handleVideoComplete(activeVideo.id)}
                onNext={handleNextVideo}
                onPrevious={handlePrevVideo}
                nextVideo={getNextVideo()}
                prevVideo={getPrevVideo()}
              />
            ) : (
              <CCppProgrammingExercises />
            )}
            
            {/* Learning features tabs */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700 mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeLearningFeature === 'notes' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveLearningFeature('notes')}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Notes
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeLearningFeature === 'mcqs' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveLearningFeature('mcqs')}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Quiz
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeLearningFeature === 'assignments' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveLearningFeature('assignments')}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Assignments
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeLearningFeature === 'resources' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveLearningFeature('resources')}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Resources
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeLearningFeature === 'codeplayground' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveLearningFeature('codeplayground')}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    Code Playground
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeLearningFeature === 'discussion' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveLearningFeature('discussion')}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Discussion
                  </div>
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeLearningFeature === 'certificate' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'}`}
                  onClick={() => setActiveLearningFeature('certificate')}
                >
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Certificate
                  </div>
                </button>
              </div>
              
              {/* Notes section */}
              {activeLearningFeature === 'notes' && (
                <div>
                  <textarea
                    className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Take notes on this lesson..."
                    value={activeVideoNotes}
                    onChange={handleNotesChange}
                  ></textarea>
                  <div className="mt-2 flex justify-end">
                    <button
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                      onClick={saveNotes}
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              )}
              
              {/* MCQs section */}
              {activeLearningFeature === 'mcqs' && (
                <div className="space-y-6">
                  {mcqs.map((mcq, index) => (
                    <div key={mcq.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200">
                        {index + 1}. {mcq.question}
                      </h3>
                      <div className="space-y-2">
                        {mcq.options.map((option, optionIndex) => (
                          <div 
                            key={optionIndex}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              mcq.userAnswer === optionIndex
                                ? mcq.userAnswer === mcq.answer
                                  ? 'bg-green-100 dark:bg-green-800/30 border-green-300 dark:border-green-700'
                                  : 'bg-red-100 dark:bg-red-800/30 border-red-300 dark:border-red-700'
                                : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-750'
                            }`}
                            onClick={() => handleMcqAnswer(mcq.id, optionIndex)}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                mcq.userAnswer === optionIndex
                                  ? mcq.userAnswer === mcq.answer
                                    ? 'border-green-500 bg-green-500 text-white'
                                    : 'border-red-500 bg-red-500 text-white'
                                  : 'border-gray-400 dark:border-gray-500'
                              }`}>
                                {mcq.userAnswer === optionIndex && (
                                  mcq.userAnswer === mcq.answer
                                    ? <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414-1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
                                      </svg>
                                )}
                              </div>
                              <span className="text-gray-800 dark:text-gray-200">{option}</span>
                            </div>
                          </div>
                        ))}
          </div>
          
                      {mcq.userAnswer !== undefined && mcq.userAnswer !== mcq.answer && (
                        <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-lg">
                          <p><span className="font-medium">Correct Answer:</span> {mcq.options[mcq.answer]}</p>
                        </div>
            )}
          </div>
                  ))}
                </div>
              )}
              
              {/* Assignments section */}
              {activeLearningFeature === 'assignments' && (
                <div className="space-y-4">
                  {assignments.map(assignment => (
                    <div key={assignment.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{assignment.title}</h3>
                        <div className={`px-2 py-1 text-xs font-medium rounded ${
                          assignment.status === 'completed' 
                            ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300' 
                            : assignment.status === 'in_progress'
                              ? 'bg-yellow-100 dark:bg-yellow-800/30 text-yellow-800 dark:text-yellow-300'
                              : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300'
                        }`}>
                          {assignment.status === 'completed' 
                            ? 'Completed' 
                            : assignment.status === 'in_progress'
                              ? 'In Progress'
                              : 'Not Started'}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{assignment.description}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Due: {assignment.dueDate}
                        </div>
                        <div className="flex gap-2">
                          {assignment.status !== 'completed' && (
                <button 
                              className="px-3 py-1.5 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-550 transition-colors"
                              onClick={() => handleAssignmentStatusUpdate(assignment.id, 'in_progress')}
                >
                              Start
                </button>
                          )}
                          {assignment.status === 'in_progress' && (
                            <button 
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-colors"
                              onClick={() => handleAssignmentStatusUpdate(assignment.id, 'completed')}
                            >
                              Mark as Completed
                            </button>
                          )}
              </div>
                      </div>
                    </div>
                  ))}
            </div>
          )}
              
              {/* Resources section */}
              {activeLearningFeature === 'resources' && (
                <div className="space-y-3">
                  {resources.map(resource => (
                    <a 
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-650 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        resource.type === 'pdf' 
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                          : resource.type === 'link'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                      }`}>
                        {resource.type === 'pdf' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        )}
                        {resource.type === 'link' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                          </svg>
                        )}
                        {resource.type === 'code' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{resource.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{resource.type === 'pdf' ? 'PDF Document' : resource.type === 'link' ? 'External Link' : 'Code Example'}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
      </div>
      
          {/* Course structure sidebar */}
          {isCourseSidebarOpen && (
            <div className="lg:w-1/3 border-l border-gray-200 dark:border-gray-700">
              <CCppCourseStructure 
                videos={videos}
                sections={sections}
                activeVideoId={activeVideo.id}
                onSelectVideo={setActiveVideo}
              />
            </div>
          )}
        </div>
      )}
      
      {/* Completion badge */}
      <AnimatePresence>
        {showCompletionBadge && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 z-50"
          >
            <div className="bg-white/20 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Lesson completed!</p>
              <p className="text-sm text-white/80">Your progress has been saved</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CCppLearningContainer; 
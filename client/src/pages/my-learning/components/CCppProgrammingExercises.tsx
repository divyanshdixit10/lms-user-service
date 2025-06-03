import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExerciseOption {
  id: string;
  text: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  code?: string;
  options?: ExerciseOption[];
  correctOption?: string;
  hint?: string;
  solution?: string;
  completed?: boolean;
  videoId?: string;
}

interface CCppProgrammingExercisesProps {
  videoId?: string;
}

const CCppProgrammingExercises: React.FC<CCppProgrammingExercisesProps> = ({ videoId }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [exerciseResults, setExerciseResults] = useState<Record<string, boolean>>({});

  // Define programming exercises
  const exercises: Exercise[] = [
    {
      id: 'ex1',
      title: 'Hello World Program',
      description: 'Create a simple C program that prints "Hello, World!" to the console.',
      difficulty: 'easy',
      category: 'basics',
      code: `#include <stdio.h>\n\nint main() {\n    // Your code here\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
      completed: true,
      videoId: 'v1' // Associate with Introduction to C Programming video
    },
    {
      id: 'ex2',
      title: 'Variable Declaration and Initialization',
      description: 'Declare and initialize variables of different data types (int, float, char) and print their values.',
      difficulty: 'easy',
      category: 'variables',
      code: `#include <stdio.h>\n\nint main() {\n    // Declare and initialize variables here\n    \n    // Print the variables\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nint main() {\n    int age = 25;\n    float height = 5.9;\n    char grade = 'A';\n    \n    printf("Age: %d\\n", age);\n    printf("Height: %.1f\\n", height);\n    printf("Grade: %c\\n", grade);\n    \n    return 0;\n}`,
      completed: true,
      videoId: 'v2' // Associate with Variables and Data Types video
    },
    {
      id: 'ex3',
      title: 'Sum of Two Numbers',
      description: 'Write a program that takes two integers as input and prints their sum.',
      difficulty: 'easy',
      category: 'operators',
      code: `#include <stdio.h>\n\nint main() {\n    // Declare variables\n    \n    // Get user input\n    \n    // Calculate sum\n    \n    // Print result\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nint main() {\n    int num1, num2, sum;\n    \n    printf("Enter first number: ");\n    scanf("%d", &num1);\n    \n    printf("Enter second number: ");\n    scanf("%d", &num2);\n    \n    sum = num1 + num2;\n    \n    printf("Sum: %d\\n", sum);\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v2' // Associate with Variables and Data Types video
    },
    {
      id: 'ex4',
      title: 'Even or Odd',
      description: 'Write a program that determines if a given number is even or odd.',
      difficulty: 'easy',
      category: 'conditionals',
      code: `#include <stdio.h>\n\nint main() {\n    int number;\n    \n    printf("Enter a number: ");\n    scanf("%d", &number);\n    \n    // Check if even or odd\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nint main() {\n    int number;\n    \n    printf("Enter a number: ");\n    scanf("%d", &number);\n    \n    if (number % 2 == 0) {\n        printf("%d is even.\\n", number);\n    } else {\n        printf("%d is odd.\\n", number);\n    }\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v3' // Associate with Control Flow video
    },
    {
      id: 'ex5',
      title: 'Factorial Calculation',
      description: 'Write a program to calculate the factorial of a number.',
      difficulty: 'medium',
      category: 'loops',
      code: `#include <stdio.h>\n\nint main() {\n    int n, factorial = 1;\n    \n    printf("Enter a positive integer: ");\n    scanf("%d", &n);\n    \n    // Calculate factorial\n    \n    printf("Factorial of %d = %d\\n", n, factorial);\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nint main() {\n    int n, i, factorial = 1;\n    \n    printf("Enter a positive integer: ");\n    scanf("%d", &n);\n    \n    for (i = 1; i <= n; i++) {\n        factorial *= i;\n    }\n    \n    printf("Factorial of %d = %d\\n", n, factorial);\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v3' // Associate with Control Flow video
    },
    {
      id: 'ex6',
      title: 'Fibonacci Series',
      description: 'Generate the Fibonacci series up to n terms.',
      difficulty: 'medium',
      category: 'loops',
      code: `#include <stdio.h>\n\nint main() {\n    int n, i, t1 = 0, t2 = 1, nextTerm;\n    \n    printf("Enter the number of terms: ");\n    scanf("%d", &n);\n    \n    printf("Fibonacci Series: ");\n    \n    // Generate and print the series\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nint main() {\n    int n, i, t1 = 0, t2 = 1, nextTerm;\n    \n    printf("Enter the number of terms: ");\n    scanf("%d", &n);\n    \n    printf("Fibonacci Series: ");\n    \n    for (i = 1; i <= n; i++) {\n        printf("%d, ", t1);\n        nextTerm = t1 + t2;\n        t1 = t2;\n        t2 = nextTerm;\n    }\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v3' // Associate with Control Flow video
    },
    {
      id: 'ex7',
      title: 'Array Operations',
      description: 'Write a program that finds the largest and smallest elements in an array.',
      difficulty: 'medium',
      category: 'arrays',
      code: `#include <stdio.h>\n\nint main() {\n    int arr[10] = {5, 9, 1, 3, 7, 8, 10, 2, 4, 6};\n    int n = 10;\n    int max, min;\n    \n    // Find max and min values\n    \n    printf("Largest element: %d\\n", max);\n    printf("Smallest element: %d\\n", min);\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nint main() {\n    int arr[10] = {5, 9, 1, 3, 7, 8, 10, 2, 4, 6};\n    int n = 10;\n    int max = arr[0], min = arr[0];\n    \n    for (int i = 1; i < n; i++) {\n        if (arr[i] > max) {\n            max = arr[i];\n        }\n        if (arr[i] < min) {\n            min = arr[i];\n        }\n    }\n    \n    printf("Largest element: %d\\n", max);\n    printf("Smallest element: %d\\n", min);\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v5' // Associate with Arrays and Strings video
    },
    {
      id: 'ex8',
      title: 'Pointer Basics',
      description: 'Write a function that swaps two integers using pointers.',
      difficulty: 'medium',
      category: 'pointers',
      code: `#include <stdio.h>\n\n// Define the swap function using pointers\nvoid swap(int *a, int *b) {\n    // Your code here\n}\n\nint main() {\n    int x = 10, y = 20;\n    \n    printf("Before swap: x = %d, y = %d\\n", x, y);\n    \n    swap(&x, &y);\n    \n    printf("After swap: x = %d, y = %d\\n", x, y);\n    \n    return 0;\n}`,
      solution: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    \n    printf("Before swap: x = %d, y = %d\\n", x, y);\n    \n    swap(&x, &y);\n    \n    printf("After swap: x = %d, y = %d\\n", x, y);\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v6' // Associate with Pointers in C video
    },
    {
      id: 'ex9',
      title: 'Simple C++ Class',
      description: 'Create a simple C++ class for a Rectangle with methods to calculate area and perimeter.',
      difficulty: 'hard',
      category: 'c++',
      code: `#include <iostream>\nusing namespace std;\n\n// Define Rectangle class\nclass Rectangle {\n    // Data members\n    \n    // Member functions declaration\n    \n};\n\nint main() {\n    // Create a rectangle object\n    \n    // Calculate and display area and perimeter\n    \n    return 0;\n}`,
      solution: `#include <iostream>\nusing namespace std;\n\nclass Rectangle {\nprivate:\n    double length;\n    double width;\n    \npublic:\n    // Constructor\n    Rectangle(double l, double w) {\n        length = l;\n        width = w;\n    }\n    \n    double area() {\n        return length * width;\n    }\n    \n    double perimeter() {\n        return 2 * (length + width);\n    }\n};\n\nint main() {\n    Rectangle rect(5.0, 3.0);\n    \n    cout << "Area: " << rect.area() << endl;\n    cout << "Perimeter: " << rect.perimeter() << endl;\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v7' // Associate with Introduction to C++ video
    },
    {
      id: 'ex10',
      title: 'C++ Inheritance',
      description: 'Create a base class Shape and a derived class Circle with methods to calculate area.',
      difficulty: 'hard',
      category: 'c++',
      code: `#include <iostream>\nusing namespace std;\n\n// Define Shape base class\n\n// Define Circle derived class\n\nint main() {\n    // Create a circle object\n    \n    // Calculate and display the area\n    \n    return 0;\n}`,
      solution: `#include <iostream>\nusing namespace std;\n\nclass Shape {\nprotected:\n    string name;\n    \npublic:\n    Shape(string n) {\n        name = n;\n    }\n    \n    virtual double area() {\n        return 0.0;\n    }\n    \n    string getName() {\n        return name;\n    }\n};\n\nclass Circle : public Shape {\nprivate:\n    double radius;\n    \npublic:\n    Circle(double r) : Shape("Circle") {\n        radius = r;\n    }\n    \n    double area() override {\n        return 3.14159 * radius * radius;\n    }\n};\n\nint main() {\n    Circle circle(5.0);\n    \n    cout << "Shape: " << circle.getName() << endl;\n    cout << "Area: " << circle.area() << endl;\n    \n    return 0;\n}`,
      completed: false,
      videoId: 'v9' // Associate with Inheritance and Polymorphism video
    }
  ];

  // Filter exercises based on active tab, search query, and videoId
  const filteredExercises = exercises.filter(exercise => {
    // Filter by videoId if provided
    if (videoId && exercise.videoId !== videoId) {
      return false;
    }
    
    // Filter by category
    if (activeTab !== 'all' && exercise.category !== activeTab) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !exercise.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Toggle exercise visibility
  const toggleExercise = (id: string) => {
    if (activeExerciseId === id) {
      setActiveExerciseId(null);
    } else {
      setActiveExerciseId(id);
    }
  };

  // Toggle solution visibility
  const toggleSolution = (id: string) => {
    setShowSolution(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Check exercise answer
  const checkExercise = (id: string) => {
    // For simplicity, just mark it as complete
    // In a real app, this would validate the code
    setExerciseResults(prev => ({
      ...prev,
      [id]: true
    }));
  };

  // Get the categories
  const categories = ['all', ...Array.from(new Set(exercises.map(ex => ex.category)))];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 bg-indigo-50 dark:bg-indigo-900/20 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">C/C++ Programming Exercises</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Practice your C and C++ programming skills with these hands-on exercises. 
          Each exercise includes starter code and hints to help you solve the problem.
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-750">
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  activeTab === category
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Search */}
          <div className="relative flex-grow max-w-md ml-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercises..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Exercise List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredExercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">No exercises match your criteria.</p>
            <button 
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
              }}
              className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredExercises.map((exercise) => (
            <div key={exercise.id} className="border-0">
              <motion.div 
                className={`cursor-pointer ${
                  activeExerciseId === exercise.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/10'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-750'
                }`}
                onClick={() => toggleExercise(exercise.id)}
                initial={false}
                animate={{ backgroundColor: activeExerciseId === exercise.id ? 'rgba(238, 242, 255, 1)' : 'rgba(255, 255, 255, 0)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      exercise.completed 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    }`}>
                      {exercise.completed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white">{exercise.title}</h3>
                    <div className="flex items-center mt-1 gap-2">
                      <span className={`px-2 py-0.5 text-xs rounded ${
                        exercise.difficulty === 'easy' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : exercise.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {exercise.category.charAt(0).toUpperCase() + exercise.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: activeExerciseId === exercise.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </div>
              </motion.div>
              
              <AnimatePresence>
                {activeExerciseId === exercise.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description:</h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{exercise.description}</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code:</h4>
                        <div className="relative">
                          <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                            {exercise.code}
                          </pre>
                          <button 
                            className="absolute top-2 right-2 p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(exercise.code || '');
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-end mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSolution(exercise.id);
                          }}
                          className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                          {showSolution[exercise.id] ? 'Hide Solution' : 'Show Solution'}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            checkExercise(exercise.id);
                          }}
                          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                          disabled={exerciseResults[exercise.id]}
                        >
                          {exerciseResults[exercise.id] ? 'Completed!' : 'Submit Solution'}
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {showSolution[exercise.id] && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 overflow-hidden"
                          >
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Solution:</h4>
                            <div className="relative">
                              <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                                {exercise.solution}
                              </pre>
                              <button 
                                className="absolute top-2 right-2 p-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(exercise.solution || '');
                                }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
      
      {/* Stats Footer */}
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>{exercises.filter(ex => ex.completed).length} of {exercises.length} exercises completed</span>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
            <span>Last completed: 2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCppProgrammingExercises; 
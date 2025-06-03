import React, { useState } from 'react';
import CoursePlayerLayout from './CoursePlayerLayout';

// Sample course data
const sampleCourseSections = [
  {
    id: 'section1',
    title: 'Getting Started with Development',
    topics: [
      {
        id: 'topic1',
        title: 'Introduction to the Course',
        duration: 420, // 7 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: true
      },
      {
        id: 'topic2',
        title: 'Setting Up Your Development Environment',
        duration: 660, // 11 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 'topic3',
        title: 'Core Concepts Overview',
        duration: 540, // 9 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      }
    ]
  },
  {
    id: 'section2',
    title: 'Fundamentals of Programming',
    topics: [
      {
        id: 'topic4',
        title: 'Variables and Data Types',
        duration: 480, // 8 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 'topic5',
        title: 'Control Structures: If/Else',
        duration: 360, // 6 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 'topic6',
        title: 'Working with Loops',
        duration: 420, // 7 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 'topic7',
        title: 'Functions and Methods',
        duration: 510, // 8.5 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      }
    ]
  },
  {
    id: 'section3',
    title: 'Advanced Concepts',
    topics: [
      {
        id: 'topic8',
        title: 'Object-Oriented Programming',
        duration: 720, // 12 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 'topic9',
        title: 'Working with APIs',
        duration: 600, // 10 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      },
      {
        id: 'topic10',
        title: 'Error Handling and Debugging',
        duration: 540, // 9 minutes
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        completed: false
      }
    ]
  }
];

// Sample resources
const sampleResources = [
  {
    id: 'res1',
    title: 'Course Syllabus',
    type: 'pdf',
    url: '#'
  },
  {
    id: 'res2',
    title: 'Development Environment Setup Guide',
    type: 'pdf',
    url: '#'
  },
  {
    id: 'res3',
    title: 'GitHub Repository',
    type: 'link',
    url: 'https://github.com/example/course-repo'
  },
  {
    id: 'res4',
    title: 'Code Samples',
    type: 'code',
    url: '#'
  }
];

const CoursePage: React.FC = () => {
  const [completedTopics, setCompletedTopics] = useState<string[]>(['topic1']);
  const [notes, setNotes] = useState<Array<{id: string; content: string; timestamp: number}>>([
    {
      id: 'topic1-note1',
      content: 'This is an important concept to remember!',
      timestamp: 120
    }
  ]);

  // Mark a topic as completed
  const handleTopicComplete = (topicId: string) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  // Add a note for a topic
  const handleAddNote = (note: {content: string; timestamp: number; topicId: string}) => {
    const newNote = {
      id: `${note.topicId}-note${notes.length + 1}`,
      content: note.content,
      timestamp: note.timestamp
    };
    setNotes([...notes, newNote]);
  };

  // Update the course sections with completion status
  const courseSections = sampleCourseSections.map(section => ({
    ...section,
    topics: section.topics.map(topic => ({
      ...topic,
      completed: completedTopics.includes(topic.id)
    }))
  }));

  return (
    <div className="container mx-auto p-4">
      <CoursePlayerLayout 
        title="Programming Fundamentals Course"
        courseSections={courseSections}
        initialTopicId="topic1"
        onTopicComplete={handleTopicComplete}
        notes={notes}
        resources={sampleResources}
        onAddNote={handleAddNote}
      />
    </div>
  );
};

export default CoursePage; 
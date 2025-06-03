import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Note {
  id: string;
  courseId: string;
  lectureId: string;
  videoTimestamp?: number;
  content: string;
  color: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isFavorite: boolean;
}

interface AdvancedCourseNotesProps {
  courseId: string;
  lectureId: string;
  currentVideoTime?: number;
  onNoteClick?: (timestamp: number) => void;
}

const AdvancedCourseNotes: React.FC<AdvancedCourseNotesProps> = ({
  courseId,
  lectureId,
  currentVideoTime,
  onNoteClick
}) => {
  // Sample notes data - would come from API in production
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 'n1',
      courseId,
      lectureId,
      videoTimestamp: 142,
      content: 'Key concept: The three principles of this framework are modularity, efficiency, and scalability.',
      color: '#4F46E5', // indigo
      tags: ['important', 'concept'],
      createdAt: new Date('2023-05-10T10:30:00'),
      updatedAt: new Date('2023-05-10T10:30:00'),
      isFavorite: true
    },
    {
      id: 'n2',
      courseId,
      lectureId,
      videoTimestamp: 315,
      content: 'Remember to implement error handling as shown in the example to prevent unexpected behavior.',
      color: '#DC2626', // red
      tags: ['code', 'best-practice'],
      createdAt: new Date('2023-05-10T10:45:00'),
      updatedAt: new Date('2023-05-10T10:45:00'),
      isFavorite: false
    },
    {
      id: 'n3',
      courseId,
      lectureId,
      content: 'Look up additional resources on dependency injection patterns.',
      color: '#2563EB', // blue
      tags: ['follow-up'],
      createdAt: new Date('2023-05-10T11:15:00'),
      updatedAt: new Date('2023-05-10T11:15:00'),
      isFavorite: false
    }
  ]);
  
  const [noteContent, setNoteContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [noteColor, setNoteColor] = useState('#4F46E5');
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add a new note
  const handleAddNote = () => {
    if (noteContent.trim() === '') return;
    
    const newNote: Note = {
      id: `n${Date.now()}`,
      courseId,
      lectureId,
      videoTimestamp: includeTimestamp && currentVideoTime ? currentVideoTime : undefined,
      content: noteContent,
      color: noteColor,
      tags: selectedTags,
      createdAt: new Date(),
      updatedAt: new Date(),
      isFavorite: false
    };
    
    setNotes([newNote, ...notes]);
    setNoteContent('');
    setSelectedTags([]);
  };
  
  // Update a note
  const handleUpdateNote = (noteId: string) => {
    if (noteContent.trim() === '') return;
    
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          content: noteContent,
          color: noteColor,
          tags: selectedTags,
          updatedAt: new Date()
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    setNoteContent('');
    setSelectedTags([]);
    setIsEditing(null);
  };
  
  // Delete a note
  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    
    if (isEditing === noteId) {
      setIsEditing(null);
      setNoteContent('');
      setSelectedTags([]);
    }
  };
  
  // Toggle favorite
  const toggleFavorite = (noteId: string) => {
    const updatedNotes = notes.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          isFavorite: !note.isFavorite
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
  };
  
  // Start editing a note
  const startEditing = (note: Note) => {
    setIsEditing(note.id);
    setNoteContent(note.content);
    setSelectedTags(note.tags);
    setNoteColor(note.color);
  };
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Handle note click (e.g., to jump to video timestamp)
  const handleNoteClick = (timestamp?: number) => {
    if (timestamp && onNoteClick) {
      onNoteClick(timestamp);
    }
  };
  
  // Format timestamp MM:SS
  const formatTimestamp = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Get all unique tags from notes
  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));
  
  // Filter notes based on tag and search query
  const filteredNotes = notes.filter(note => {
    let matchesTag = true;
    let matchesSearch = true;
    
    if (filterTag) {
      matchesTag = note.tags.includes(filterTag);
    }
    
    if (searchQuery) {
      matchesSearch = note.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    return matchesTag && matchesSearch;
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notes</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setFilterTag(null)}
            className={`p-1 rounded-full text-xs ${
              !filterTag ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(tag === filterTag ? null : tag)}
              className={`px-2 py-1 rounded-full text-xs ${
                tag === filterTag 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      {/* Note input form */}
      <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <textarea
          value={noteContent}
          onChange={e => setNoteContent(e.target.value)}
          placeholder={isEditing ? "Edit note..." : "Add a new note..."}
          className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={3}
        />
        
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1">
            {['#4F46E5', '#DC2626', '#2563EB', '#16A34A', '#9333EA', '#F59E0B'].map(color => (
              <button
                key={color}
                onClick={() => setNoteColor(color)}
                className={`w-6 h-6 rounded-full ${noteColor === color ? 'ring-2 ring-gray-400 dark:ring-white' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
          
          <div className="flex items-center space-x-1 flex-wrap gap-1">
            {['important', 'concept', 'code', 'question', 'follow-up', 'best-practice'].map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-2 py-0.5 rounded-full text-xs ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
          
          {currentVideoTime !== undefined && (
            <label className="flex items-center ml-auto">
              <input
                type="checkbox"
                checked={includeTimestamp}
                onChange={() => setIncludeTimestamp(!includeTimestamp)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">
                Include timestamp ({formatTimestamp(currentVideoTime)})
              </span>
            </label>
          )}
        </div>
        
        <div className="mt-3 flex justify-end">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(null)}
                className="px-3 py-1 text-xs text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateNote(isEditing)}
                disabled={noteContent.trim() === ''}
                className={`px-3 py-1 rounded text-xs ${
                  noteContent.trim() === ''
                    ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Update Note
              </button>
            </>
          ) : (
            <button
              onClick={handleAddNote}
              disabled={noteContent.trim() === ''}
              className={`px-3 py-1 rounded text-xs ${
                noteContent.trim() === ''
                  ? 'bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              Add Note
            </button>
          )}
        </div>
      </div>
      
      {/* Notes list */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {searchQuery || filterTag ? 'No matching notes found' : 'No notes yet. Add your first note!'}
            </p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg border-l-4"
              style={{ borderLeftColor: note.color, backgroundColor: note.isFavorite ? 'rgba(79, 70, 229, 0.1)' : '#F9FAFB' }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  {note.videoTimestamp !== undefined && (
                    <div 
                      className="inline-block bg-gray-100 dark:bg-gray-700 rounded px-2 py-0.5 text-xs font-mono text-gray-800 dark:text-gray-200 mb-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      onClick={() => handleNoteClick(note.videoTimestamp)}
                    >
                      @ {formatTimestamp(note.videoTimestamp)}
                    </div>
                  )}
                  <p className="text-gray-800 dark:text-gray-200 text-sm whitespace-pre-wrap">
                    {note.content}
                  </p>
                  
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap mt-2 gap-1">
                      {note.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col items-center ml-2">
                  <button
                    onClick={() => toggleFavorite(note.id)}
                    className={`p-1 rounded-full ${note.isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                    aria-label={note.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {note.isFavorite ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => startEditing(note)}
                    className="p-1 rounded-full text-gray-400 hover:text-indigo-500 mt-1"
                    aria-label="Edit note"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="p-1 rounded-full text-gray-400 hover:text-red-500 mt-1"
                    aria-label="Delete note"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdvancedCourseNotes; 
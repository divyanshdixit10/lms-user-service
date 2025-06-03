import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'instructor' | 'ta';
}

interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  videoTimestamp?: number;
  likes: number;
  liked?: boolean;
  replies: Comment[];
}

interface CourseDiscussionsProps {
  courseId: string;
  lectureId: string;
  currentUser: User;
  currentVideoTime?: number;
}

const CourseDiscussions: React.FC<CourseDiscussionsProps> = ({
  courseId,
  lectureId,
  currentUser,
  currentVideoTime
}) => {
  const [discussions, setDiscussions] = useState<Comment[]>([
    {
      id: 'c1',
      user: {
        id: 'u1',
        name: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
        role: 'student'
      },
      content: 'Could someone explain the concept discussed at 12:48? I\'m having trouble understanding how it relates to the previous lecture.',
      timestamp: new Date('2023-09-15T14:23:00'),
      videoTimestamp: 768,
      likes: 5,
      liked: true,
      replies: [
        {
          id: 'r1',
          user: {
            id: 'u2',
            name: 'Dr. Jane Miller',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
            role: 'instructor'
          },
          content: 'Great question, John! This concept builds on what we covered in Module 2. The key insight is that we\'re applying the same principle but in a different context. Does that help clarify things?',
          timestamp: new Date('2023-09-15T15:01:00'),
          likes: 3,
          replies: []
        },
        {
          id: 'r2',
          user: {
            id: 'u3',
            name: 'Alex Wong',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
            role: 'student'
          },
          content: 'I was confused too! I found this helpful resource that explains it in more detail: https://example.com/resource',
          timestamp: new Date('2023-09-15T15:12:00'),
          likes: 2,
          replies: []
        }
      ]
    },
    {
      id: 'c2',
      user: {
        id: 'u4',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80',
        role: 'student'
      },
      content: 'Does anyone have additional examples of implementing this pattern in real-world applications?',
      timestamp: new Date('2023-09-16T10:43:00'),
      likes: 8,
      replies: []
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [filter, setFilter] = useState<'all' | 'timestamp' | 'instructor'>('all');
  const [includeTimestamp, setIncludeTimestamp] = useState(currentVideoTime !== undefined);
  
  // Handle submitting a new comment
  const handleSubmitComment = () => {
    if (newComment.trim() === '') return;
    
    const newCommentObj: Comment = {
      id: `c${Date.now()}`,
      user: currentUser,
      content: newComment,
      timestamp: new Date(),
      videoTimestamp: includeTimestamp && currentVideoTime ? currentVideoTime : undefined,
      likes: 0,
      replies: []
    };
    
    setDiscussions([newCommentObj, ...discussions]);
    setNewComment('');
  };
  
  // Handle submitting a reply
  const handleSubmitReply = (commentId: string) => {
    if (replyContent.trim() === '') return;
    
    const newReply: Comment = {
      id: `r${Date.now()}`,
      user: currentUser,
      content: replyContent,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };
    
    const updatedDiscussions = discussions.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply]
        };
      }
      
      return comment;
    });
    
    setDiscussions(updatedDiscussions);
    setReplyContent('');
    setReplyingTo(null);
  };
  
  // Toggle like on a comment
  const toggleLike = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      // Handle liking a reply
      const updatedDiscussions = discussions.map(comment => {
        if (comment.id === parentId) {
          const updatedReplies = comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
                liked: !reply.liked
              };
            }
            return reply;
          });
          
          return {
            ...comment,
            replies: updatedReplies
          };
        }
        return comment;
      });
      
      setDiscussions(updatedDiscussions);
    } else {
      // Handle liking a top-level comment
      const updatedDiscussions = discussions.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            liked: !comment.liked
          };
        }
        return comment;
      });
      
      setDiscussions(updatedDiscussions);
    }
  };
  
  // Format timestamp for display
  const formatTimestamp = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    }
    
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    
    return date.toLocaleDateString();
  };
  
  // Format video timestamp (MM:SS)
  const formatVideoTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  // Filter discussions
  const filteredDiscussions = discussions.filter(comment => {
    if (filter === 'all') return true;
    if (filter === 'timestamp') return comment.videoTimestamp !== undefined;
    if (filter === 'instructor') {
      return comment.user.role === 'instructor' || 
             comment.replies.some(reply => reply.user.role === 'instructor');
    }
    return true;
  });
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Discussion</h3>
      
      {/* Filters */}
      <div className="flex flex-wrap items-center mb-6 gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'all'
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All Comments
        </button>
        <button
          onClick={() => setFilter('timestamp')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'timestamp'
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          With Timestamps
        </button>
        <button
          onClick={() => setFilter('instructor')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            filter === 'instructor'
              ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          Instructor Responses
        </button>
      </div>
      
      {/* New comment input */}
      <div className="mb-6">
        <div className="flex space-x-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add to the discussion..."
              className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              rows={3}
            />
            
            {currentVideoTime !== undefined && (
              <div className="flex items-center mt-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeTimestamp}
                    onChange={() => setIncludeTimestamp(!includeTimestamp)}
                    className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Include current timestamp ({formatVideoTime(currentVideoTime)})
                  </span>
                </label>
              </div>
            )}
            
            <div className="mt-3 flex justify-end">
              <button
                onClick={handleSubmitComment}
                disabled={newComment.trim() === ''}
                className={`px-4 py-2 rounded-md text-sm ${
                  newComment.trim() === ''
                    ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {filteredDiscussions.length === 0 ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              No discussions yet. Be the first to comment!
            </p>
          </div>
        ) : (
          filteredDiscussions.map(comment => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4"
            >
              <div className="flex space-x-3">
                <img 
                  src={comment.user.avatar} 
                  alt={comment.user.name} 
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {comment.user.name}
                      {comment.user.role === 'instructor' && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          Instructor
                        </span>
                      )}
                      {comment.user.role === 'ta' && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                          TA
                        </span>
                      )}
                    </h4>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  
                  <div className="mt-1 text-gray-800 dark:text-gray-200">
                    {comment.videoTimestamp !== undefined && (
                      <span className="inline-block bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-0.5 rounded text-xs font-mono mb-1 cursor-pointer hover:bg-indigo-200 dark:hover:bg-indigo-800">
                        @ {formatVideoTime(comment.videoTimestamp)}
                      </span>
                    )}
                    <p className="mt-1">{comment.content}</p>
                  </div>
                  
                  <div className="mt-2 flex items-center space-x-4">
                    <button 
                      onClick={() => toggleLike(comment.id)}
                      className={`flex items-center text-sm font-medium ${
                        comment.liked 
                          ? 'text-indigo-600 dark:text-indigo-400' 
                          : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                      }`}
                    >
                      {comment.liked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                      )}
                      {comment.likes}
                    </button>
                    
                    <button 
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Reply
                    </button>
                  </div>
                  
                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="ml-6 mt-4 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="flex space-x-3">
                          <img 
                            src={reply.user.avatar} 
                            alt={reply.user.name} 
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                                {reply.user.name}
                                {reply.user.role === 'instructor' && (
                                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                                    Instructor
                                  </span>
                                )}
                              </h4>
                              <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                {formatTimestamp(reply.timestamp)}
                              </span>
                            </div>
                            
                            <p className="mt-1 text-gray-800 dark:text-gray-200">
                              {reply.content}
                            </p>
                            
                            <div className="mt-2">
                              <button 
                                onClick={() => toggleLike(reply.id, true, comment.id)}
                                className={`flex items-center text-xs font-medium ${
                                  reply.liked 
                                    ? 'text-indigo-600 dark:text-indigo-400' 
                                    : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                                }`}
                              >
                                {reply.liked ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                  </svg>
                                )}
                                {reply.likes}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Reply form */}
                  {replyingTo === comment.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 ml-6"
                    >
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        rows={2}
                      />
                      
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={replyContent.trim() === ''}
                          className={`px-3 py-1 rounded-md text-sm ${
                            replyContent.trim() === ''
                              ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          Reply
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseDiscussions; 
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Post</h1>
      <p className="mb-4">Viewing post with ID: {postId}</p>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <p>This is a placeholder for the BlogPostPage component.</p>
      </div>
    </div>
  );
};

export default BlogPostPage; 
import React from 'react';
import { useParams } from 'react-router-dom';

const CertificatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Certificate</h1>
      <p className="mb-4">Viewing certificate with ID: {id}</p>
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <p>This is a placeholder for the CertificatePage component.</p>
      </div>
    </div>
  );
};

export default CertificatePage; 
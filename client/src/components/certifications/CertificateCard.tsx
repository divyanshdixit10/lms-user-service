import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CertificateCardProps {
  id: string | number;
  title: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  image: string;
  issuer: string;
  skills?: string[];
  onView?: (id: string | number) => void;
  onDownload?: (id: string | number) => void;
  onShare?: (id: string | number) => void;
  status?: 'active' | 'expired' | 'pending';
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  id,
  title,
  issueDate,
  expiryDate,
  credentialId,
  image,
  issuer,
  skills = [],
  onView,
  onDownload,
  onShare,
  status = 'active',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Format date from ISO or string to localized date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };
  
  // Get badge color based on status
  const getBadgeColor = () => {
    switch (status) {
      case 'active':
        return 'badge-success';
      case 'expired':
        return 'badge-error';
      case 'pending':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };
  
  // Get status text
  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'expired':
        return 'Expired';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <div className="perspective-1000">
      <motion.div
        className="card-hover relative w-full h-full transform-style-3d transition-transform duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Front of the card */}
        <div className={`card p-0 absolute w-full h-full backface-hidden ${isFlipped ? 'hidden' : ''}`}>
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full h-48 object-cover rounded-t-lg"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/400x200?text=Certificate";
              }}
            />
            <div className="absolute top-4 right-4">
              <span className={`badge ${getBadgeColor()}`}>{getStatusText()}</span>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h3>
            <p className="text-gray-600 mb-4">Issued by {issuer}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <p><span className="font-medium">Issued:</span> {formatDate(issueDate)}</p>
                {expiryDate && (
                  <p><span className="font-medium">Expires:</span> {formatDate(expiryDate)}</p>
                )}
              </div>
              
              <button
                onClick={() => setIsFlipped(true)}
                className="btn btn-sm btn-ghost"
                title="View details"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              {skills.slice(0, 3).map((skill, index) => (
                <span key={index} className="badge badge-outline-secondary">{skill}</span>
              ))}
              {skills.length > 3 && (
                <span className="badge badge-outline-secondary">+{skills.length - 3} more</span>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => onView?.(id)}
                className="btn btn-primary"
              >
                View Certificate
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onDownload?.(id)}
                  className="btn btn-outline-secondary btn-icon"
                  title="Download"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                
                <button
                  onClick={() => onShare?.(id)}
                  className="btn btn-outline-secondary btn-icon"
                  title="Share"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of the card */}
        <div className={`card absolute w-full h-full backface-hidden rotate-y-180 ${!isFlipped ? 'hidden' : ''}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button
                onClick={() => setIsFlipped(false)}
                className="btn btn-sm btn-ghost"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Certificate Details</h4>
                <div className="text-sm space-y-2">
                  <p><span className="font-medium">Credential ID:</span> {credentialId}</p>
                  <p><span className="font-medium">Issuer:</span> {issuer}</p>
                  <p><span className="font-medium">Issue Date:</span> {formatDate(issueDate)}</p>
                  {expiryDate && (
                    <p><span className="font-medium">Expiry Date:</span> {formatDate(expiryDate)}</p>
                  )}
                  <p><span className="font-medium">Status:</span> <span className={`${
                    status === 'active' ? 'text-success' : 
                    status === 'expired' ? 'text-error' : 
                    'text-warning'
                  }`}>{getStatusText()}</span></p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Skills</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="badge badge-outline-secondary">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Verification</h4>
                <p className="text-sm text-gray-600">
                  This certificate can be verified online using the credential ID and the issuer's verification system.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <button
                    onClick={() => onView?.(id)}
                    className="btn btn-primary"
                  >
                    View Certificate
                  </button>
                  
                  <button
                    onClick={() => window.open(`https://example.com/verify/${credentialId}`, '_blank')}
                    className="btn btn-outline-secondary"
                  >
                    Verify Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CertificateCard; 
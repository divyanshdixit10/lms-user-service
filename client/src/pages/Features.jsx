import React, { useState } from 'react';

// Import components
import { VirtualCampus, VRPairProgramming, SpatialAudioClassroom, DigitalTwin } from '../components/immersive';
import { CredentialSystem } from '../components/blockchain';
import { LearningHub } from '../components/metaverse';
import { DevEnvironment } from '../components/collaborative';

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    { 
      id: 'virtualcampus',
      name: 'Virtual Campus',
      description: 'Navigate a 3D virtual campus with different learning areas',
      icon: '🏙️',
      component: VirtualCampus
    },
    { 
      id: 'vrprogramming',
      name: 'VR Pair Programming',
      description: 'Code together in virtual reality sessions',
      icon: '👓',
      component: VRPairProgramming
    },
    { 
      id: 'spatialaudio',
      name: 'Spatial Audio Classroom',
      description: 'Experience virtual classrooms with realistic audio',
      icon: '🔊',
      component: SpatialAudioClassroom
    },
    { 
      id: 'digitaltwin',
      name: 'Digital Twin',
      description: 'Explore real-world coding environments as digital twins',
      icon: '🏢',
      component: DigitalTwin
    },
    { 
      id: 'blockchain',
      name: 'Blockchain Credentials',
      description: 'Secure your achievements with blockchain verification',
      icon: '🔐',
      component: CredentialSystem
    },
    { 
      id: 'metaverse',
      name: 'Metaverse Learning Hub',
      description: 'Collaborate in a persistent virtual learning world',
      icon: '🌐',
      component: LearningHub
    },
    { 
      id: 'collaborative',
      name: 'Collaborative IDE',
      description: 'Code together in real-time with integrated tools',
      icon: '👥',
      component: DevEnvironment
    }
  ];
  
  const renderFeatureComponent = () => {
    const feature = features.find(f => f.id === activeFeature);
    if (feature) {
      const Component = feature.component;
      return <Component />;
    }
    return null;
  };
  
  const closeFeature = () => {
    setActiveFeature(null);
  };
  
  if (activeFeature) {
    return (
      <div className="min-h-screen">
        <div className="bg-gray-800 text-white p-3 flex items-center">
          <button 
            onClick={closeFeature}
            className="mr-4 hover:bg-gray-700 p-2 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">
            {features.find(f => f.id === activeFeature)?.name}
          </h1>
        </div>
        {renderFeatureComponent()}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Innovative Learning Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our cutting-edge features designed to transform coding education with immersive, AI-powered, and collaborative experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => setActiveFeature(feature.id)}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-bold mb-3 text-gray-800">{feature.name}</h2>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                Explore Feature
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features; 
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Core Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import osopLogo from './assets/images/osop-logo.png';

// Loading components with skeletal UI
const LoadingFallback = () => (
  <div className="animate-pulse w-full">
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <img src={osopLogo} alt="OSOP-CODING Logo" className="w-8 h-8 object-contain" />
        </div>
      </div>
    </div>
  </div>
);

// Lazy load pages with better code splitting
const HomePage = lazy(() => import('./pages/home/HomePage'));
const CoursesPage = lazy(() => import('./pages/courses/CoursesPage.tsx'));
const CourseDetailsPage = lazy(() => import('./pages/courses/CourseDetailsPage'));
const WhatIsOSOPPage = lazy(() => import('./pages/what-is-osop/WhatIsOSOPPage'));
const PlacementPage = lazy(() => import('./pages/placement/PlacementPage'));
const PlacementStatsPage = lazy(() => import('./pages/placement/PlacementStatsPage'));
const HirePage = lazy(() => import('./pages/hire/HirePage'));
const EnquiryPage = lazy(() => import('./pages/enquiry/EnquiryPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
  
  return null;
};

const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  
  // Load essential data and initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading essential data
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsAppReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsAppReady(true);
      }
    };

    initializeApp();
  }, []);

  if (!isAppReady) {
    return <LoadingFallback />;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public Routes - Only keeping the requested pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/what-is-osop" element={<WhatIsOSOPPage />} />
                  <Route path="/placement" element={<PlacementPage />} />
                  <Route path="/placement/stats" element={<PlacementStatsPage />} />
                  <Route path="/hire" element={<HirePage />} />
                  <Route path="/enquiry" element={<EnquiryPage />} />
                  
                  {/* Courses routes */}
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
                  
                  {/* Fallback route */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App; 
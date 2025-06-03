import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

// Core Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AIAssistant from './components/ai/AIAssistant';
import SpecialOfferPopup from './components/SpecialOfferPopup';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import osopLogo from './assets/images/osop-logo.png';

// Import components
import { VirtualCampus, VRPairProgramming, SpatialAudioClassroom, DigitalTwin } from './components/immersive';
import { CredentialSystem } from './components/blockchain';
import { LearningHub } from './components/metaverse';
import { DevEnvironment } from './components/collaborative';
import { CodingCompanion } from './components/ai';

// Add Features import
import Features from './pages/Features';

// Import routes
import checkoutRoutes from './routes/checkoutRoutes';

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

// Analytics setup
const setupAnalytics = () => {
  // Initialize analytics services
  console.log('Analytics initialized');
  
  // Track page views
  return (pathname) => {
    console.log(`Page view: ${pathname}`);
  };
};

// Lazy load pages with better code splitting
const HomePage = lazy(() => import('./pages/home/HomePage'));
const LoginPage = lazy(() => import('./pages/auth/LoginPage.jsx'));
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage.jsx'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const MyLearningPage = lazy(() => import('./pages/my-learning/MyLearningPage'));
const CoursesPage = lazy(() => import('./pages/courses/CoursesPage.tsx'));
const CourseDetailsPage = lazy(() => import('./pages/courses/CourseDetailsPage'));
const CoursePlayerPage = lazy(() => import('./pages/courses/CoursePlayerPage'));
const CertificationsPage = lazy(() => import('./pages/certifications/CertificationsPage'));
const ResumeBuilderPage = lazy(() => import('./pages/career/ResumeBuilderPage'));
const CareerGuidancePage = lazy(() => import('./pages/career/CareerGuidancePage'));
const ForumPage = lazy(() => import('./pages/community/ForumPage'));
const HackathonPage = lazy(() => import('./pages/community/HackathonPage'));
const AIChatbotPage = lazy(() => import('./pages/ai/AIChatbotPage'));
const AIToolsPage = lazy(() => import('./pages/ai/AIToolsPage'));
const CodeAssistantPage = lazy(() => import('./pages/ai/CodeAssistantPage'));
const InterviewPrepPage = lazy(() => import('./pages/career/InterviewPrepPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminCoursesPage = lazy(() => import('./pages/admin/AdminCoursesPage'));
const AdminAnalyticsPage = lazy(() => import('./pages/admin/AdminAnalyticsPage'));
const AdminContentPage = lazy(() => import('./pages/admin/AdminContentPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/profile/SettingsPage'));
const CertificatePage = lazy(() => import('./pages/profile/CertificatePage'));
const LiveClassPage = lazy(() => import('./pages/courses/LiveClassPage'));
const PublicCoursesPage = lazy(() => import('./pages/public/CoursesPage'));
const FeaturesPage = lazy(() => import('./pages/public/FeaturesPage'));
const PricingPage = lazy(() => import('./pages/public/PricingPage'));
const TestimonialsPage = lazy(() => import('./pages/public/TestimonialsPage'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const TeamPage = lazy(() => import('./pages/about/TeamPage'));
const PlacementPage = lazy(() => import('./pages/placement/PlacementPage'));
const PlacementStatsPage = lazy(() => import('./pages/placement/PlacementStatsPage'));
const HirePage = lazy(() => import('./pages/hire/HirePage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const EnquiryPage = lazy(() => import('./pages/enquiry/EnquiryPage'));
const EventsPage = lazy(() => import('./pages/community/EventsPage'));
const BlogPage = lazy(() => import('./pages/public/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/public/BlogPostPage'));
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'));
const MaintenancePage = lazy(() => import('./pages/public/MaintenancePage'));

// Legal Pages
const TermsPage = lazy(() => import('./pages/legal/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/legal/PrivacyPage'));
const CookiePage = lazy(() => import('./pages/legal/CookiePage'));
const RefundPage = lazy(() => import('./pages/legal/RefundPage'));
const SecurityPage = lazy(() => import('./pages/legal/SecurityPage'));

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

// Route tracker for AI context and analytics
const RouteTracker = ({ updateAIContext, trackPageView, setShowOfferPopup }) => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    updateAIContext(pathname);
    trackPageView(pathname);
    
    // Only show popup on homepage and courses pages
    const shouldShowPopupOnRoute = pathname === '/' || pathname.startsWith('/courses');
    if (!shouldShowPopupOnRoute) {
      setShowOfferPopup(false);
    }
  }, [pathname, updateAIContext, trackPageView, setShowOfferPopup]);
  
  return null;
};

const App = () => {
  const [aiContext, setAiContext] = useState('general');
  const [isAppReady, setIsAppReady] = useState(false);
  const trackPageView = setupAnalytics();
  const [activeFeature, setActiveFeature] = useState(null);
  const [showOfferPopup, setShowOfferPopup] = useState(false);
  
  const features = [
    { 
      id: 'immersive',
      name: 'Immersive Learning Platform',
      description: 'Experience a 3D virtual campus with VR pair programming and spatial audio',
      icon: '🏙️'
    },
    { 
      id: 'ai',
      name: 'AI-Powered Coding Companion',
      description: 'Get real-time suggestions and personalized learning paths from AI',
      icon: '🤖'
    },
    { 
      id: 'blockchain',
      name: 'Blockchain-Based Credential System',
      description: 'Secure, verifiable credentials on blockchain with token rewards',
      icon: '🔐'
    },
    { 
      id: 'metaverse',
      name: 'Metaverse Learning Hub',
      description: 'Collaborate in a persistent virtual world with 3D code visualization',
      icon: '🌐'
    },
    { 
      id: 'collaborative',
      name: 'Collaborative Development Environment',
      description: 'Real-time code sharing with integrated communication tools',
      icon: '👥'
    }
  ];
  
  const renderFeatureComponent = () => {
    switch (activeFeature) {
      case 'immersive':
        return <VirtualCampus />;
      case 'ai':
        return <CodingCompanion />;
      case 'blockchain':
        return <CredentialSystem />;
      case 'metaverse':
        return <LearningHub />;
      case 'collaborative':
        return <DevEnvironment />;
      case 'myLearning':
        return <MyLearningPage />;
      default:
        return null;
    }
  };
  
  const closeFeature = () => {
    setActiveFeature(null);
  };

  const handleCloseOfferPopup = () => {
    setShowOfferPopup(false);
    // Mark as seen and store timestamp
    localStorage.setItem('osop-special-offer-seen', 'true');
    localStorage.setItem('osop-special-offer-last-shown', new Date().getTime().toString());
  };
  
  // Load essential data and initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Simulate loading essential data
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsAppReady(true);
        
        // Check if special offer popup should be shown (only on homepage)
        const hasSeenOffer = localStorage.getItem('osop-special-offer-seen');
        const lastShown = localStorage.getItem('osop-special-offer-last-shown');
        const now = new Date().getTime();
        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours
        
        console.log('Popup check:', {
          hasSeenOffer,
          lastShown,
          pathname: window.location.pathname,
          shouldShow: (!hasSeenOffer || (lastShown && (now - parseInt(lastShown)) > oneDayInMs)) && window.location.pathname === '/'
        });
        
        // Show popup if user hasn't seen it or if it's been more than 24 hours
        // Only show on homepage initially
        // Temporarily always show for testing
        if (window.location.pathname === '/') {
          setTimeout(() => {
            console.log('Setting popup to true');
            setShowOfferPopup(true);
          }, 2000); // Show popup 2 seconds after page load
        }
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsAppReady(true);
      }
    };

    initializeApp();
  }, []);

  // Update AI context based on route for personalized assistance
  const updateAIContextByRoute = (pathname) => {
    if (pathname.includes('courses') || pathname.includes('certification')) {
      setAiContext('learning');
    } else if (pathname.includes('career') || pathname.includes('resume') || pathname.includes('interview')) {
      setAiContext('career');
    } else if (pathname.includes('admin')) {
      setAiContext('admin');
    } else {
      setAiContext('general');
    }
  };

  // AI assistant context message based on current route
  const getAIContextMessage = () => {
    switch (aiContext) {
      case 'coding':
        return "Hi there! I'm your coding assistant. Need help with a coding problem or understanding a concept?";
      case 'learning':
        return "Hello! I'm your learning guide. Need help with course materials or recommendations for your learning journey?";
      case 'career':
        return "Hello! I'm your career advisor. Looking for resume help or interview preparation?";
      case 'admin':
        return "Hello admin! Need assistance with platform management or analytics?";
      default:
        return "Hi there! I'm your AI learning assistant. How can I help you today?";
    }
  };

  if (!isAppReady) {
    return <LoadingFallback />;
  }

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
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <RouteTracker 
            updateAIContext={updateAIContextByRoute} 
            trackPageView={trackPageView}
            setShowOfferPopup={setShowOfferPopup}
          />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/testimonials" element={<TestimonialsPage />} />
                  <Route path="/success-stories" element={<SuccessStories />} />
                  <Route path="/explore-courses" element={<PublicCoursesPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/about/team" element={<TeamPage />} />
                  <Route path="/placement" element={<PlacementPage />} />
                  <Route path="/placement/stats" element={<PlacementStatsPage />} />
                  <Route path="/hire" element={<HirePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/enquiry" element={<EnquiryPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:postId" element={<BlogPostPage />} />
                  <Route path="/maintenance" element={<MaintenancePage />} />
                  
                  {/* Legal Pages */}
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/cookies" element={<CookiePage />} />
                  <Route path="/refund" element={<RefundPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  
                  {/* Courses routes (made public) */}
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
                  
                  {/* Checkout routes */}
                  {checkoutRoutes}
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/courses/:courseId/learn" element={
                    <ProtectedRoute>
                      <CoursePlayerPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/courses/:courseId/lecture/:lectureId" element={
                    <ProtectedRoute>
                      <CoursePlayerPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/courses/live/:classId" element={
                    <ProtectedRoute>
                      <LiveClassPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/certifications" element={
                    <ProtectedRoute>
                      <CertificationsPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/career/resume-builder" element={
                    <ProtectedRoute>
                      <ResumeBuilderPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/career/guidance" element={
                    <ProtectedRoute>
                      <CareerGuidancePage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/career/interview-prep" element={
                    <ProtectedRoute>
                      <InterviewPrepPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/community" element={
                    <ProtectedRoute>
                      <ForumPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/community/events" element={
                    <ProtectedRoute>
                      <EventsPage />
                    </ProtectedRoute>
                  } />

                  <Route path="/community/hackathons" element={
                    <ProtectedRoute>
                      <HackathonPage />
                    </ProtectedRoute>
                  } />

                  {/* AI Tools Routes */}
                  <Route path="/ai/chatbot" element={
                    <ProtectedRoute>
                      <AIChatbotPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/ai/tools" element={
                    <ProtectedRoute>
                      <AIToolsPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/ai/code-assistant" element={
                    <ProtectedRoute>
                      <CodeAssistantPage />
                    </ProtectedRoute>
                  } />

                  {/* Profile Routes */}
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/profile/certificates/:id" element={
                    <ProtectedRoute>
                      <CertificatePage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <SettingsPage />
                    </ProtectedRoute>
                  } />

                  {/* Admin Routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/users" element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminUsersPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/courses" element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminCoursesPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/content" element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminContentPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/admin/analytics" element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminAnalyticsPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* My Learning Route */}
                  <Route path="/my-learning" element={
                    <ProtectedRoute>
                      <MyLearningPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* My Learning Course Detail Route */}
                  <Route path="/my-learning/:courseId" element={
                    <ProtectedRoute>
                      <MyLearningPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Fallback route */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <AIAssistant contextMessage={getAIContextMessage()} />
            <SpecialOfferPopup 
              isOpen={showOfferPopup} 
              onClose={handleCloseOfferPopup} 
            />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App; 
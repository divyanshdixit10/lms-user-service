import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

// Add a more complete User type definition
interface User {
  email?: string;
  displayName?: string;
  // Add other user properties as needed
}

interface Course {
  id: number | string;
  title: string;
  category: string;
  level: string;
  duration: string;
  lectures: number;
  price: string;
  instructor: string;
  rating: number;
  students: number;
  description: string;
  image: string;
  tag?: string;
  skills?: string[];
  enrollmentStatus?: 'Open' | 'Closed' | 'Coming Soon';
  syllabus?: {
    week: number;
    topic: string;
    content: string;
  }[];
}

const CheckoutPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  // Fetch course data when component mounts
  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For now, we'll use the mock data from CourseDetailsPage
        // This should be replaced with an actual API call to your backend
        const isNumeric = /^\d+$/.test(courseId || '');
        
        // Mock courses data for demonstration
        const courses: Course[] = [
          {
            id: 1,
            title: 'Learn Agentic-AI from start for beginner',
            category: 'ai-ml',
            level: 'Beginner',
            duration: '31 weeks',
            lectures: 10,
            price: 'Free',
            instructor: 'Vaibhav Jain',
            rating: 4.8,
            students: 1200,
            description: 'Master the fundamentals of Agentic AI and learn how to build intelligent agents from scratch.',
            image: 'https://img.freepik.com/free-photo/ai-technology-brain-background-digital-transformation-concept_53876-124672.jpg',
            enrollmentStatus: 'Open'
          },
          {
            id: 10,
            title: 'Advanced JavaScript',
            category: 'programming',
            level: 'Advanced',
            duration: '12 weeks',
            lectures: 65,
            price: '₹28,000',
            instructor: 'Amit Verma',
            rating: 4.9,
            students: 2120,
            description: 'Deep dive into JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.',
            image: 'https://img.freepik.com/free-photo/person-front-computer-working-html_23-2150040428.jpg',
            enrollmentStatus: 'Open'
          }
        ];
        
        let foundCourse;
        if (isNumeric) {
          foundCourse = courses.find(c => c.id === Number(courseId));
        } else {
          // If it's not a number, assume it's a slug
          foundCourse = courses.find(c => 
            c.title.toLowerCase().replace(/\s+/g, '-') === courseId
          );
        }
        
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          toast.error('Course not found');
          navigate('/courses');
        }
      } catch (error) {
        console.error('Error fetching course:', error);
        toast.error('Error loading course details');
        navigate('/courses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission
      try {
        // Simulate payment processing
        toast.loading('Processing payment...');
        
        // In a real app, this would be an API call to process payment
        // For demo, we'll just wait 2 seconds
        setTimeout(() => {
          toast.dismiss();
          toast.success('Payment successful!');
          // Pass course title to success page
          navigate('/checkout/success', { 
            state: { 
              courseTitle: course?.title 
            } 
          });
        }, 2000);
      } catch (error) {
        console.error('Payment failed:', error);
        toast.error('Payment failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= stepNumber
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`w-24 h-1 ${
                        step > stepNumber
                          ? 'bg-primary-600'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Personal Info</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Payment Details</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Confirmation</span>
            </div>
          </div>

          {/* Course Summary Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={course?.image}
                alt={course?.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {course?.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Instructor: {course?.instructor}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Duration: {course?.duration}
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {course?.price}
                </p>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Personal Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your first name"
                      aria-label="First name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Your last name"
                      aria-label="Last name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Your email address"
                    aria-label="Email address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Your phone number"
                    aria-label="Phone number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Payment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      placeholder="Name as it appears on card"
                      aria-label="Name on card"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/YY"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        placeholder="123"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Course Price</span>
                    <span className="font-medium">{course?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                        {course?.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="ml-auto px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {step === 3 ? 'Complete Purchase' : 'Continue'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 
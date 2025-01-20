import React, { useState, useEffect } from 'react';

interface ApiResponse {
  success: string;
}

// Custom loading spinner component
const LoadingSpinner: React.FC = () => (
  <div className="w-20 h-20 rounded-full border-4 border-gray-600 border-t-green-400 animate-spin" />
);

// SVG Icons as components
const BrainIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);

const BookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.88 5.79a2 2 0 0 0 1.9 1.38l6.01.01-4.87 3.53a2 2 0 0 0-.73 2.24l1.87 5.78-4.86-3.54a2 2 0 0 0-2.34 0L6 21.73l1.87-5.78a2 2 0 0 0-.73-2.24L2.27 10.2l6.01-.01a2 2 0 0 0 1.9-1.38L12 3z"/>
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/backendOn`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json() as ApiResponse;
        setConnectionStatus(data.success);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(`Failed to connect to API: ${errorMessage}`);
      } finally {
        setIsLoading(false);
      }
    };
    checkConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BrainIcon className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold text-white">Memory Mint</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Grow Your Knowledge with</span>
            <span className="block text-green-400">Memory Mint</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The smart flashcard app that helps you remember everything you learn. 
            Powered by spaced repetition and active recall techniques.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10">
                Start Learning
                <ChevronRightIcon className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="bg-green-400/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BrainIcon className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Smart Learning</h3>
            <p className="text-gray-400">
              Our algorithm adapts to your learning pace and optimizes review timing.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="bg-green-400/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BookIcon className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Rich Content</h3>
            <p className="text-gray-400">
              Create flashcards with text, images, and custom formatting.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="bg-green-400/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <SparkleIcon className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Track Progress</h3>
            <p className="text-gray-400">
              Monitor your learning journey with detailed statistics and insights.
            </p>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      <div className="fixed bottom-4 right-4">
        <div className="text-green-400 bg-gray-800 px-4 py-2 rounded-lg">
          {connectionStatus}
        </div>
      </div>
    </div>
  );
};

export default App;

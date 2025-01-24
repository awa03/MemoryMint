import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SettingsButton from '@/components/SettingsButton'
import LoadingSpinner from '@/components/LoadingSpinner'
import BookIcon from '@/components/icons/Book'
import BrainIcon from '@/components/icons/Brain'
import SparkleIcon from '@/components/icons/Brain'
import ChevronRightIcon from '@/components/icons/ChevronRight'
import Navigation from '@/components/Navigation';


interface ApiResponse {
  success: string;
}


/**
 * HomePage component is the main landing page of the Memory Mint application.
 * It checks the connection status with the backend API and displays the appropriate content based on the connection status.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * <HomePage />
 * 
 * @remarks
 * - Displays a loading spinner while checking the connection status.
 * - Shows an error message if the connection to the API fails.
 * - Renders the main content of the homepage including the hero section, features section, and connection status.
 * 
 * @hook
 * - useState: Manages the loading state, connection status, and error state.
 * - useEffect: Checks the connection status with the backend API on component mount.
 * 
 * @dependencies
 * - fetch: Used to make a GET request to the backend API.
 * - import.meta.env.VITE_API_URL: Environment variable for the backend API URL.
 * 
 * @see
 * - LoadingSpinner: Component to display a loading spinner.
 * - Navigation: Component for the navigation bar.
 * - ChevronRightIcon, BrainIcon, BookIcon, SparkleIcon: Icons used in the component.
 */


const HomePage: React.FC = () => {
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
      <Navigation className="w-screen"></Navigation>
      

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
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 md:py-4 md:text-lg md:px-10  active:scale-90 animate duration-1000">
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
          <div className="bg-gray-800 p-6 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1">
            <div className="bg-green-400/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BrainIcon className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Smart Learning</h3>
            <p className="text-gray-400">
              Our algorithm adapts to your learning pace and optimizes review timing.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1">
            <div className="bg-green-400/10 rounded-lg p-3 w-12 h-12 flex items-center justify-center mb-4">
              <BookIcon className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Rich Content</h3>
            <p className="text-gray-400">
              Create flashcards with text, images, and custom formatting.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1">
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

export default HomePage;

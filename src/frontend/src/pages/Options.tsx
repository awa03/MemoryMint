import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from '@/components/Navigation';
import HistoryIcon from '@/components/icons/History'
import FlashCardIcon from '@/components/icons/FlashCard'
import TestIcon from '../components/icons/Test';
import CapIcon from '../components/icons/Cap';


const OptionsPage: React.FC = () => {
  /* const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>(''); */

  return (
    <div className='min-h-screen bg-slate-900'>
      <Navigation className="w-screen"></Navigation>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='grid grid-cols-1 gap-8'>
            <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
            <FlashCardIcon/>Sets<FlashCardIcon />
            </div>
          <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
            <TestIcon/>Tests<TestIcon/>
          </div>
          <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
            <CapIcon/>Classes<CapIcon/>
          </div>
          <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
            <HistoryIcon/>History<HistoryIcon/>
          </div>
      </div>
    </div>
    </div>
  );
};

export default OptionsPage;

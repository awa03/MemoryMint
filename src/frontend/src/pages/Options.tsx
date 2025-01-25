import React, { useState, useEffect } from 'react';
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

          <a href="/sets">
            <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
              <FlashCardIcon/>Sets<FlashCardIcon />
            </div>
          </a>

          <a href="/tests">
          <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
            <TestIcon/>Tests<TestIcon/>
          </div>
          </a>

          <a href="/classes"> 
          <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
            <CapIcon/>Classes<CapIcon/>
          </div>
          </a>

          <a href="/history">
          <div className="bg-gray-800 p-10 rounded-lg shadow-black-50 hover:drop-shadow-2xl shadow-2xl hover:-translate-y-1 text-3xl text-center bold flex items-center justify-center gap-4">
            <HistoryIcon/>History<HistoryIcon/>
          </div>
          </a>

        </div>
      </div>
    </div>
  );
};

export default OptionsPage;

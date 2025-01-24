import React from 'react';
import SettingsButton from '@/components/SettingsButton';
import BrainIcon from '@/components/icons/Brain'


import { useEffect } from 'react'
import { themeChange } from 'theme-change'



const Navigation: React.FC = () => {
  useEffect(() => {
    themeChange(false)
  }, [])
  return (
    <nav className="bg-gray-800 w-screen">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <a href="/">
            <div className="flex items-center justify-start active:scale-150 animate duration-1000">
              <BrainIcon className="h-8 w-8 text-green-400" />
              <span className="ml-2 text-xl font-bold text-white">Memory Mint</span>
            </div>
          </a>
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <a href="options" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg active:scale-90 animate duration-1000">
              Menu
            </a>
            <SettingsButton className="text-white" />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;
